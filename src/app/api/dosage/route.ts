import { NextRequest, NextResponse } from 'next/server'

interface DrugInfo {
  name: string
  dosePerKg: number
  maxDailyDose: number
  frequency: string
  maxSingleDose: number
  unit: string
}

const drugDatabase: Record<string, DrugInfo> = {
  acetaminophen: {
    name: "Acetaminophen (Paracetamol)",
    dosePerKg: 15,
    maxDailyDose: 90,
    frequency: "every 4-6 hours",
    maxSingleDose: 1000,
    unit: "mg"
  },
  ibuprofen: {
    name: "Ibuprofen",
    dosePerKg: 10,
    maxDailyDose: 40,
    frequency: "every 6-8 hours",
    maxSingleDose: 800,
    unit: "mg"
  },
  amoxicillin: {
    name: "Amoxicillin",
    dosePerKg: 45,
    maxDailyDose: 3000,
    frequency: "twice daily",
    maxSingleDose: 1000,
    unit: "mg"
  },
  prednisolone: {
    name: "Prednisolone",
    dosePerKg: 1,
    maxDailyDose: 60,
    frequency: "once daily",
    maxSingleDose: 60,
    unit: "mg"
  },
  salbutamol: {
    name: "Salbutamol",
    dosePerKg: 0.15,
    maxDailyDose: 32,
    frequency: "every 4-6 hours",
    maxSingleDose: 8,
    unit: "mg"
  },
  loratadine: {
    name: "Loratadine",
    dosePerKg: 0.2,
    maxDailyDose: 10,
    frequency: "once daily",
    maxSingleDose: 10,
    unit: "mg"
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { age, weight, drugName } = body

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
    const drug = drugDatabase[drugName]
    if (!drug) {
      return NextResponse.json(
        { error: 'Drug not found in database' },
        { status: 404 }
      )
    }

    // Calculate doses
    const singleDose = Math.min(drug.dosePerKg * weightNum, drug.maxSingleDose)
    const dailyDose = Math.min(drug.maxDailyDose * weightNum, drug.maxSingleDose * 4)

    // Return calculation results
    return NextResponse.json({
      success: true,
      data: {
        drug: drug.name,
        singleDose: parseFloat(singleDose.toFixed(1)),
        dailyDose: parseFloat(dailyDose.toFixed(1)),
        frequency: drug.frequency,
        dosePerKg: drug.dosePerKg,
        unit: drug.unit,
        patientWeight: weightNum,
        patientAge: ageNum,
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
  // Return available drugs list
  return NextResponse.json({
    success: true,
    data: {
      drugs: Object.keys(drugDatabase).map(key => ({
        key,
        name: drugDatabase[key].name
      })),
      indications: ['fever', 'pain', 'infection', 'inflammation', 'allergy']
    }
  })
}