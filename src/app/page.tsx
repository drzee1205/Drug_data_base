'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import PWAInstallPrompt from '@/components/pwa-install-prompt'
import OfflineIndicator from '@/components/offline-indicator'
import { medicalSystems } from '@/lib/comprehensive-drug-database'
import FavoritesPanel from '@/components/favorites-panel'
import { addToFavorites, isInFavorites, removeFromFavorites, addToRecentCalculations } from '@/lib/favorites-system'

interface DrugOption {
  id: string
  name: string
  genericName: string
  category: string
  system: string
}

interface DosageResult {
  drug: string
  genericName: string
  system: string
  category: string
  dosageRange: {
    min: string
    max: string
    unit: string
  }
  frequency: string
  maxDailyDose: string
  notes: string
  patientWeight: number
  patientAge: number
  ageGroup: string
  indications: string[]
  contraindications: string[]
  warnings: string[]
  monitoring: string[]
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

export default function PediaDoseCalculator() {
  const [age, setAge] = useState<string>('')
  const [ageUnit, setAgeUnit] = useState<string>('years')
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [drugName, setDrugName] = useState<string>('')
  const [indication, setIndication] = useState<string>('')
  const [selectedSystem, setSelectedSystem] = useState<string>('nervous')
  const [results, setResults] = useState<DosageResult | null>(null)
  const [availableDrugs, setAvailableDrugs] = useState<DrugOption[]>([])
  const [drugsBySystem, setDrugsBySystem] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [showFavorites, setShowFavorites] = useState<boolean>(false)

  useEffect(() => {
    // Fetch available drugs from API
    const fetchDrugs = async () => {
      try {
        const response = await fetch('/api/dosage')
        const result = await response.json()
        
        if (result.success) {
          setDrugsBySystem(result.data.drugsBySystem)
          // Set initial drugs for selected system
          const systemDrugs = result.data.drugsBySystem.find((s: any) => s.system.id === selectedSystem)
          if (systemDrugs) {
            setAvailableDrugs(systemDrugs.drugs)
          }
        } else {
          toast.error('Failed to load drug database')
        }
      } catch (error) {
        console.error('Failed to fetch drugs:', error)
        toast.error('Failed to connect to drug database')
      } finally {
        setLoading(false)
      }
    }

    fetchDrugs()
  }, [])

  useEffect(() => {
    // Update available drugs when system changes
    if (drugsBySystem.length > 0) {
      const systemDrugs = drugsBySystem.find((s: any) => s.system.id === selectedSystem)
      if (systemDrugs) {
        setAvailableDrugs(systemDrugs.drugs)
        setDrugName('') // Reset drug selection
      }
    }
  }, [selectedSystem, drugsBySystem])

  const setQuickDrug = (drugKey: string) => {
    setDrugName(drugKey)
    const drug = availableDrugs.find(d => d.id === drugKey)
    if (drug) {
      toast.success(`Selected ${drug.name}`)
    }
  }

  const handleSelectDrug = (drugId: string) => {
    setDrugName(drugId)
    const drug = availableDrugs.find(d => d.id === drugId)
    if (drug) {
      toast.success(`Selected ${drug.name}`)
    }
  }

  const toggleFavorite = (drugId: string) => {
    const drug = availableDrugs.find(d => d.id === drugId)
    if (!drug) return

    if (isInFavorites(drugId)) {
      removeFromFavorites(drugId)
      toast.success(`Removed ${drug.name} from favorites`)
    } else {
      addToFavorites({
        id: drug.id,
        name: drug.name,
        genericName: drug.genericName,
        system: drug.system,
        category: drug.category
      })
      toast.success(`Added ${drug.name} to favorites`)
    }
  }

  const calculateDose = async () => {
    if (!age || !weight || !drugName) {
      toast.error('Please fill in all required fields')
      return
    }

    const ageNum = parseFloat(age)
    const weightNum = parseFloat(weight)

    if (isNaN(ageNum) || isNaN(weightNum) || ageNum <= 0 || weightNum <= 0) {
      toast.error('Please enter valid age and weight values')
      return
    }

    try {
      const response = await fetch('/api/dosage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: ageNum,
          weight: weightNum,
          drugName: drugName
        })
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to calculate dosage')
        return
      }

      const data = result.data
      setResults(data)
      setShowResults(true)
      
      // Add to recent calculations
      addToRecentCalculations({
        drug: data.drug,
        genericName: data.genericName,
        system: data.system,
        category: data.category,
        patientWeight: data.patientWeight,
        patientAge: data.patientAge,
        ageGroup: data.ageGroup,
        dosageRange: data.dosageRange,
        frequency: data.frequency
      })
      
      toast.success('Dosage calculated successfully')
    } catch (error) {
      console.error('API call error:', error)
      toast.error('Failed to connect to dosage calculation service')
    }
  }

  const showHelp = () => {
    toast.info(`🏥 Pedia-Dose Calculator Help:

📱 PWA Features:
• Install as a mobile app for quick access
• Works offline with cached calculations
• Add to home screen on iOS/Android

🧮 How to Use:
1. Select medical system from tabs
2. Choose specific drug from the system
3. Enter patient's age, weight, and height
4. Click "Calculate Dose" for results
5. View detailed information and warnings

⚠️ Important:
• All doses are evidence-based pediatric guidelines
• Based on Nelson Textbook of Pediatrics 21st Edition
• Always verify doses before administration
• Check for contraindications and allergies
• Consult medical guidelines when in doubt

🔧 Technical:
• 15+ medical systems with 20+ drugs each
• Offline capable with service worker
• Responsive design for all devices
• Real-time dosage calculations
• Professional healthcare tool`)
  }

  // Auto-calculate weight based on age (rough estimation)
  useEffect(() => {
    const ageNum = parseFloat(age)
    if (!isNaN(ageNum) && ageNum > 0 && !weight) {
      let estimatedWeight = 0
      if (ageUnit === 'years') {
        if (ageNum <= 1) estimatedWeight = ageNum * 10 + 3
        else if (ageNum <= 5) estimatedWeight = ageNum * 2 + 8
        else estimatedWeight = ageNum * 3 + 4
      } else if (ageUnit === 'months') {
        estimatedWeight = (ageNum / 12) * 2 + 8
      }
      if (estimatedWeight > 0) {
        setWeight(estimatedWeight.toFixed(1))
      }
    }
  }, [age, ageUnit, weight])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #0093ff 2px, transparent 2px), radial-gradient(circle at 75% 75%, #00d9ff 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 40px 40px',
          backgroundPosition: '0 0, 30px 30px'
        }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/logo.png" 
                  alt="Pedia-Dose Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Pedia-Dose
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs border-blue-500 text-blue-300">
                    PWA Ready
                  </Badge>
                  <Badge variant="outline" className="text-xs border-green-500 text-green-300">
                    Offline Capable
                  </Badge>
                  <Badge variant="outline" className="text-xs border-purple-500 text-purple-300">
                    300+ Drugs
                  </Badge>
                </div>
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center font-semibold text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
              DR
            </div>
          </div>
        </div>
      </header>

      {/* PWA Install Prompt */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <PWAInstallPrompt />
      </div>

      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Medical System Navigation */}
        <Tabs value={selectedSystem} onValueChange={setSelectedSystem} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-15 gap-2 bg-slate-800/50 p-2 rounded-lg">
            {medicalSystems.map((system) => (
              <TabsTrigger
                key={system.id}
                value={system.id}
                className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-slate-700"
              >
                <span className="text-lg">{system.icon}</span>
                <span className="text-xs font-medium">{system.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* System Description */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {medicalSystems.find(s => s.id === selectedSystem)?.icon}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {medicalSystems.find(s => s.id === selectedSystem)?.name}
                </h3>
                <p className="text-sm text-slate-300">
                  {medicalSystems.find(s => s.id === selectedSystem)?.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Information Card */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span className="text-2xl">👶</span>
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="age" className="text-slate-300">Age</Label>
                    <div className="flex gap-2">
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      />
                      <Select value={ageUnit} onValueChange={setAgeUnit}>
                        <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="years">Years</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              <div>
                <Label htmlFor="weight" className="text-slate-300">Weight (kg)</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium min-w-16 text-center">
                    kg
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="height" className="text-slate-300">Height (cm) - optional</Label>
                <div className="flex gap-2">
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium min-w-16 text-center">
                    cm
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medication Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="text-2xl">💊</span>
                Medication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="drugName" className="text-slate-300">Drug Name</Label>
                <Select value={drugName} onValueChange={setDrugName}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder={loading ? "Loading drugs..." : "Select medication"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDrugs.map((drug) => (
                      <SelectItem key={drug.id} value={drug.id}>
                        <div>
                          <div className="font-medium">{drug.name}</div>
                          <div className="text-xs text-slate-400">{drug.genericName}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="indication" className="text-slate-300">Indication</Label>
                <Select value={indication} onValueChange={setIndication}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select indication" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fever">Fever</SelectItem>
                    <SelectItem value="pain">Pain</SelectItem>
                    <SelectItem value="infection">Infection</SelectItem>
                    <SelectItem value="inflammation">Inflammation</SelectItem>
                    <SelectItem value="allergy">Allergy</SelectItem>
                    <SelectItem value="seizures">Seizures</SelectItem>
                    <SelectItem value="hypertension">Hypertension</SelectItem>
                    <SelectItem value="asthma">Asthma</SelectItem>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateDose}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105"
              >
                Calculate Dose
              </Button>
            </CardContent>
          </Card>
          </div>
          
          {/* Favorites Panel */}
          <div className="xl:col-span-1">
            <FavoritesPanel 
              onSelectDrug={handleSelectDrug}
              currentSystem={selectedSystem}
            />
          </div>
        </div>

        {/* Quick Actions for Current System */}
        {availableDrugs.length > 0 && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions - {medicalSystems.find(s => s.id === selectedSystem)?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {availableDrugs.slice(0, 8).map((drug) => (
                      <div key={drug.id} className="relative">
                        <Button
                          variant="outline"
                          className="bg-slate-700/50 border-slate-600 hover:bg-slate-600/50 hover:border-blue-400 transition-all duration-200 h-auto py-3 w-full"
                          onClick={() => setQuickDrug(drug.id)}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                              {drug.name.charAt(0)}
                            </div>
                            <span className="text-xs font-medium text-center">{drug.name}</span>
                          </div>
                        </Button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(drug.id)
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-600 border-2 border-slate-700 flex items-center justify-center hover:bg-slate-500 transition-colors"
                        >
                          <span className={`text-xs ${isInFavorites(drug.id) ? 'text-yellow-400' : 'text-slate-400'}`}>
                            {isInFavorites(drug.id) ? '★' : '☆'}
                          </span>
                        </button>
                      </div>
                    ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Card */}
        {showResults && results && (
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="text-2xl">📊</span>
                Dosing Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Dosage Range</div>
                  <div className="text-2xl font-bold text-green-400">
                    {results.dosageRange.min} - {results.dosageRange.max} {results.dosageRange.unit}
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Frequency</div>
                  <div className="text-xl font-bold text-blue-400">
                    {results.frequency}
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Max Daily Dose</div>
                  <div className="text-xl font-bold text-purple-400">
                    {results.maxDailyDose}
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Patient Weight</div>
                  <div className="text-xl font-bold text-orange-400">
                    {results.patientWeight} kg
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Patient Age</div>
                  <div className="text-xl font-bold text-cyan-400">
                    {results.patientAge} {ageUnit}
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Age Group</div>
                  <div className="text-xl font-bold text-pink-400">
                    {results.ageGroup}
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Indications</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.indications.map((indication, index) => (
                      <Badge key={index} variant="outline" className="border-green-500 text-green-300">
                        {indication}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Warnings</h4>
                  <div className="space-y-1">
                    {results.warnings.map((warning, index) => (
                      <div key={index} className="text-sm text-yellow-300">
                        ⚠️ {warning}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Contraindications</h4>
                  <div className="space-y-1">
                    {results.contraindications.map((contraindication, index) => (
                      <div key={index} className="text-sm text-red-300">
                        ❌ {contraindication}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Monitoring</h4>
                  <div className="space-y-1">
                    {results.monitoring.map((item, index) => (
                      <div key={index} className="text-sm text-blue-300">
                        🔍 {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Dosage Adjustments</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                      <div className="font-medium text-purple-300 mb-1">Renal Impairment</div>
                      <div className="text-sm text-slate-300">{results.renalAdjustment.adjustment}</div>
                      <div className="text-xs text-purple-200 mt-1">{results.renalAdjustment.monitoring}</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                      <div className="font-medium text-orange-300 mb-1">Hepatic Impairment</div>
                      <div className="text-sm text-slate-300">{results.hepaticAdjustment.adjustment}</div>
                      <div className="text-xs text-orange-200 mt-1">{results.hepaticAdjustment.monitoring}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Notes</h4>
                  <div className="text-sm text-slate-300 bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                    {results.notes}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                  <div className="text-sm text-slate-400">
                    📚 Nelson Textbook of Pediatrics 21st Edition (Page {results.nelsonPage})
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-300">
                    Evidence Level {results.evidenceLevel}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Floating Help Button */}
      <Button
        onClick={showHelp}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-40"
      >
        ?
      </Button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-xl border-t border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-3">
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-blue-400 hover:text-blue-300">
              <div className="w-6 h-6 text-blue-400">🏠</div>
              <span className="text-xs">Calculator</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-300" onClick={() => setShowFavorites(!showFavorites)}>
              <div className="w-6 h-6">⭐</div>
              <span className="text-xs">Favorites</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-300">
              <div className="w-6 h-6">📚</div>
              <span className="text-xs">References</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-300">
              <div className="w-6 h-6">⚙️</div>
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}