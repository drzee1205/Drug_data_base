'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import PWAInstallPrompt from '@/components/pwa-install-prompt'
import OfflineIndicator from '@/components/offline-indicator'

interface DrugInfo {
  name: string
  dosePerKg: number
  maxDailyDose: number
  frequency: string
  maxSingleDose: number
  unit: string
}

interface DrugOption {
  key: string
  name: string
}

interface DosageResult {
  singleDose: number
  dailyDose: number
}

export default function PediaDoseCalculator() {
  const [age, setAge] = useState<string>('')
  const [ageUnit, setAgeUnit] = useState<string>('years')
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [drugName, setDrugName] = useState<string>('')
  const [indication, setIndication] = useState<string>('')
  const [results, setResults] = useState<DosageResult | null>(null)
  const [selectedDrug, setSelectedDrug] = useState<DrugInfo | null>(null)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [availableDrugs, setAvailableDrugs] = useState<DrugOption[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Fetch available drugs from API
    const fetchDrugs = async () => {
      try {
        const response = await fetch('/api/dosage')
        const result = await response.json()
        
        if (result.success) {
          setAvailableDrugs(result.data.drugs)
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

  const quickDrugs = [
    { key: 'acetaminophen', label: 'Acetaminophen', icon: 'A' },
    { key: 'ibuprofen', label: 'Ibuprofen', icon: 'I' },
    { key: 'amoxicillin', label: 'Amoxicillin', icon: 'Am' },
    { key: 'prednisolone', label: 'Prednisolone', icon: 'P' }
  ]

  const setQuickDrug = (drugKey: string) => {
    setDrugName(drugKey)
    const drug = availableDrugs.find(d => d.key === drugKey)
    if (drug) {
      toast.success(`Selected ${drug.name}`)
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
      setResults({
        singleDose: data.singleDose,
        dailyDose: data.dailyDose
      })
      setSelectedDrug({
        name: data.drug,
        dosePerKg: data.dosePerKg,
        maxDailyDose: 0, // Not needed for display
        frequency: data.frequency,
        maxSingleDose: 0, // Not needed for display
        unit: data.unit
      })
      setShowResults(true)
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
1. Enter patient's age, weight, and height
2. Select medication and indication  
3. Click "Calculate Dose" for results
4. Use quick action buttons for common medications

⚠️ Important:
• All doses are evidence-based pediatric guidelines
• Always verify doses before administration
• Check for contraindications and allergies
• Consult medical guidelines when in doubt

🔧 Technical:
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
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickDrugs.map((drug) => (
            <Button
              key={drug.key}
              variant="outline"
              className="bg-slate-800/50 border-slate-600 hover:bg-slate-700/50 hover:border-blue-400 transition-all duration-200 h-auto py-4"
              onClick={() => setQuickDrug(drug.key)}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {drug.icon}
                </div>
                <span className="text-sm font-medium">{drug.label}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                      <SelectItem key={drug.key} value={drug.key}>
                        {drug.name}
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

        {/* Results Card */}
        {showResults && results && selectedDrug && (
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <span className="text-2xl">📊</span>
                Dosing Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Single Dose</div>
                  <div className="text-2xl font-bold text-green-400">
                    {results.singleDose.toFixed(1)} {selectedDrug.unit}
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Daily Maximum</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {results.dailyDose.toFixed(1)} {selectedDrug.unit}
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Frequency</div>
                  <div className="text-xl font-bold text-cyan-400">
                    {selectedDrug.frequency}
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Weight-based dose</div>
                  <div className="text-xl font-bold text-purple-400">
                    {selectedDrug.dosePerKg} {selectedDrug.unit}/kg
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Patient weight</div>
                  <div className="text-xl font-bold text-orange-400">
                    {weight} kg
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                  <div className="text-slate-300 text-sm font-medium">Medication</div>
                  <div className="text-lg font-bold text-white">
                    {selectedDrug.name}
                  </div>
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
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-300">
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