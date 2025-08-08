import { NextRequest, NextResponse } from 'next/server'
import { drugDatabase, medicalSystems } from '@/lib/comprehensive-drug-database'
import { extendedDrugDatabase } from '@/lib/extended-drug-database'

// Combine all drug databases
const allDrugs = [...drugDatabase, ...extendedDrugDatabase]

interface DrugInfo {
  id: string
  name: string
  genericName: string
  system: string
  category: string
  indications: string[]
  contraindications: string[]
  warnings: string[]
  adverseEffects: string[]
  interactions: string[]
  monitoring: string[]
  pregnancyCategory: string
  breastfeeding: string
  pediatricUse: string
  dosage: {
    neonatal: {
      dose: string
      frequency: string
      maxDose: string
      notes: string
    }
    infant: {
      dose: string
      frequency: string
      maxDose: string
      notes: string
    }
    child: {
      dose: string
      frequency: string
      maxDose: string
      notes: string
    }
    adolescent: {
      dose: string
      frequency: string
      maxDose: string
      notes: string
    }
  }
  administration: {
    route: string[]
    formulation: string[]
    storage: string
    stability: string
  }
  renalAdjustment: {
    adjustment: string
    monitoring: string
  }
  hepaticAdjustment: {
    adjustment: string
    monitoring: string
  }
  references: string[]
  nelsonPage: string
  evidenceLevel: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { age, weight, drugName, ageGroup } = body

    // Validate required fields
    if (!age || !weight || !drugName) {
      return NextResponse.json(
        { error: 'Missing required fields: age, weight, and drugName are required' },
        { status: 400 }
      )
    }

    // Validate data types
    const ageNum = parseFloat(age)
    const weightNum = parseFloat(weight)

    if (isNaN(ageNum) || isNaN(weightNum) || ageNum <= 0 || weightNum <= 0) {
      return NextResponse.json(
        { error: 'Invalid age or weight values. Both must be positive numbers.' },
        { status: 400 }
      )
    }

    // Check if drug exists in database
    const drug = allDrugs.find(d => d.id === drugName || d.name.toLowerCase().includes(drugName.toLowerCase()))
    if (!drug) {
      return NextResponse.json(
        { error: 'Drug not found in database' },
        { status: 404 }
      )
    }

    // Determine age group for dosage calculation
    let selectedDosage
    if (ageNum <= 0.083) { // ≤ 1 month
      selectedDosage = drug.dosage.neonatal
    } else if (ageNum <= 1) { // > 1 month to 1 year
      selectedDosage = drug.dosage.infant
    } else if (ageNum <= 12) { // > 1 year to 12 years
      selectedDosage = drug.dosage.child
    } else { // > 12 years
      selectedDosage = drug.dosage.adolescent
    }

    // Parse dosage information
    const doseRange = selectedDosage.dose.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/)
    let minDose, maxDose

    if (doseRange) {
      minDose = parseFloat(doseRange[1])
      maxDose = parseFloat(doseRange[2])
    } else {
      // Single dose value
      const singleDose = selectedDosage.dose.match(/(\d+(?:\.\d+)?)/)
      if (singleDose) {
        minDose = maxDose = parseFloat(singleDose[1])
      } else {
        // Handle complex dosing (e.g., "10-15 mg/kg")
        return NextResponse.json({
          success: true,
          data: {
            drug: drug.name,
            dosageInfo: selectedDosage,
            patientWeight: weightNum,
            patientAge: ageNum,
            ageGroup: ageGroup || 'auto',
            calculationType: 'complex',
            notes: 'Complex dosing requires clinical judgment',
            calculationTimestamp: new Date().toISOString()
          }
        })
      }
    }

    // Calculate doses based on weight
    const calculatedMinDose = minDose * weightNum
    const calculatedMaxDose = maxDose * weightNum

    // Parse max dose constraints
    const maxDoseConstraint = selectedDosage.maxDose.match(/(\d+(?:\.\d+)?)/)
    let maxConstraint = null
    if (maxDoseConstraint) {
      maxConstraint = parseFloat(maxDoseConstraint[1])
    }

    // Apply constraints
    const finalMinDose = maxConstraint ? Math.min(calculatedMinDose, maxConstraint) : calculatedMinDose
    const finalMaxDose = maxConstraint ? Math.min(calculatedMaxDose, maxConstraint) : calculatedMaxDose

    // Return calculation results
    return NextResponse.json({
      success: true,
      data: {
        drug: drug.name,
        genericName: drug.genericName,
        system: drug.system,
        category: drug.category,
        dosageRange: {
          min: finalMinDose.toFixed(2),
          max: finalMaxDose.toFixed(2),
          unit: extractUnit(selectedDosage.dose)
        },
        frequency: selectedDosage.frequency,
        maxDailyDose: selectedDosage.maxDose,
        notes: selectedDosage.notes,
        patientWeight: weightNum,
        patientAge: ageNum,
        ageGroup: ageGroup || 'auto',
        indications: drug.indications,
        contraindications: drug.contraindications,
        warnings: drug.warnings,
        monitoring: drug.monitoring,
        renalAdjustment: drug.renalAdjustment,
        hepaticAdjustment: drug.hepaticAdjustment,
        references: drug.references,
        nelsonPage: drug.nelsonPage,
        evidenceLevel: drug.evidenceLevel,
        calculationTimestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Dosage calculation error:', error)
    return NextResponse.json(
      { error: 'Internal server error during dosage calculation' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return available drugs list organized by system
  const drugsBySystem = medicalSystems.map(system => ({
    system: system,
    drugs: allDrugs
      .filter(drug => drug.system === system.id)
      .map(drug => ({
        id: drug.id,
        name: drug.name,
        genericName: drug.genericName,
        category: drug.category
      }))
  }))

  return NextResponse.json({
    success: true,
    data: {
      medicalSystems: medicalSystems,
      drugsBySystem: drugsBySystem,
      totalDrugs: allDrugs.length,
      indications: ['fever', 'pain', 'infection', 'inflammation', 'allergy', 'seizures', 'hypertension', 'asthma', 'diabetes', 'more']
    }
  })
}

// Helper function to extract unit from dose string
function extractUnit(doseString: string): string {
  const unitMatch = doseString.match(/([a-zA-Z\/]+)/)
  return unitMatch ? unitMatch[1] : 'mg'
}