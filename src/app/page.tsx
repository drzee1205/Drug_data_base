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
import SplashScreen from '@/components/splash-screen'
import { medicalSystems, drugDatabase } from '@/lib/comprehensive-drug-database'
import { Home, Calculator, Pill, Settings, Menu, ChevronDown, ArrowLeft } from 'lucide-react'
import { addToFavorites, isInFavorites, removeFromFavorites, addToRecentCalculations } from '@/lib/favorites-system'



type PageView = 'dashboard' | 'calculator' | 'drugDetail' | 'settings'

export default function PediaDoseApp() {
  const [showSplash, setShowSplash] = useState<boolean>(true)
  const [currentView, setCurrentView] = useState<PageView>('dashboard')
  const [age, setAge] = useState<string>('')
  const [ageUnit, setAgeUnit] = useState<string>('months')
  const [weight, setWeight] = useState<string>('')
  const [drugName, setDrugName] = useState<string>('')
  const [selectedDrug, setSelectedDrug] = useState<any>(null)
  const [calculationResult, setCalculationResult] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const availableDrugs = drugDatabase.slice(0, 20) // Get first 20 drugs for demo

  useEffect(() => {
    // Set default drug for demo
    if (availableDrugs.length > 0 && !selectedDrug) {
      setSelectedDrug(availableDrugs[0])
    }
  }, [availableDrugs, selectedDrug])

  const calculateDosage = () => {
    if (!weight || !age || !selectedDrug) {
      toast.error('Please fill in all required fields')
      return
    }

    const weightNum = parseFloat(weight)
    const ageNum = parseFloat(age)

    if (isNaN(weightNum) || isNaN(ageNum) || weightNum <= 0 || ageNum <= 0) {
      toast.error('Please enter valid age and weight values')
      return
    }

    // Simple calculation for demo - in real app, use the API
    const dosagePerKg = 5 // mg/kg as example
    const totalDosage = weightNum * dosagePerKg
    
    setCalculationResult({
      recommendedDosage: `${dosagePerKg}mg/kg`,
      totalDosage: `${totalDosage}mg`,
      frequency: 'Every 6 hours',
      medication: selectedDrug.name
    })
    
    toast.success('Dosage calculated successfully')
  }

  const selectDrug = (drug: any) => {
    setSelectedDrug(drug)
    toast.success(`Selected ${drug.name}`)
  }

  const navigateToDetail = (drug: any) => {
    setSelectedDrug(drug)
    setCurrentView('drugDetail')
  }



  // Auto-calculate weight based on age (rough estimation)
  useEffect(() => {
    const ageNum = parseFloat(age)
    if (!isNaN(ageNum) && ageNum > 0 && !weight) {
      let estimatedWeight = 0
      if (ageUnit === 'months') {
        if (ageNum <= 12) estimatedWeight = (ageNum / 12) * 10 + 3
        else estimatedWeight = (ageNum / 12) * 2 + 8
      }
      if (estimatedWeight > 0) {
        setWeight(estimatedWeight.toFixed(1))
      }
    }
  }, [age, ageUnit, weight])

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Dr. Anya Sharma</h2>
      </div>

      {/* Action Cards */}
      <div className="space-y-4 px-6">
        <Button
          onClick={() => setCurrentView('calculator')}
          className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg font-medium"
        >
          Calculate Dosage
        </Button>
        
        <Button
          onClick={() => setCurrentView('drugDetail')}
          className="w-full h-16 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-lg font-medium"
        >
          Drug Information
        </Button>
        
        <Button
          onClick={() => setCurrentView('settings')}
          className="w-full h-16 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-lg font-medium"
        >
          Patient Records
        </Button>
      </div>
    </div>
  )

  const renderCalculator = () => (
    <div className="space-y-6 px-6 py-4">
      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <Input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full h-14 px-4 text-base bg-gray-100 border-gray-200 rounded-xl placeholder-gray-500"
          />
        </div>
        
        <div>
          <Input
            type="number"
            placeholder="Age (months)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full h-14 px-4 text-base bg-gray-100 border-gray-200 rounded-xl placeholder-gray-500"
          />
        </div>
      </div>

      {/* Medication Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Medication</h3>
        
        <Select value={selectedDrug?.id || ''} onValueChange={(value) => {
          const drug = availableDrugs.find(d => d.id === value)
          if (drug) selectDrug(drug)
        }}>
          <SelectTrigger className="w-full h-14 px-4 text-base bg-gray-100 border-gray-200 rounded-xl">
            <SelectValue placeholder="Select Medication" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent>
            {availableDrugs.map((drug) => (
              <SelectItem key={drug.id} value={drug.id}>
                {drug.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dosage Results */}
      {calculationResult && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Dosage</h3>
          
          <div className="space-y-3 text-center">
            <div>
              <p className="text-base text-gray-600">Recommended Dosage: {calculationResult.recommendedDosage}</p>
            </div>
            <div>
              <p className="text-base text-gray-600">Total Dosage: {calculationResult.totalDosage}</p>
            </div>
            <div>
              <p className="text-base text-gray-600">Frequency: {calculationResult.frequency}</p>
            </div>
          </div>
        </div>
      )}

      {/* Calculate Button */}
      <div className="pt-8">
        <Button
          onClick={calculateDosage}
          className="w-full h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg font-medium"
        >
          Calculate
        </Button>
      </div>
    </div>
  )

  const renderDrugDetail = () => (
    <div className="px-6 py-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => setCurrentView('dashboard')}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">Dosage Details</h2>
      </div>

      {selectedDrug && (
        <div className="space-y-6">
          {/* Dosage Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Dosage Information</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Medication</span>
                <span className="font-medium text-gray-900">{selectedDrug.name}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Dosage</span>
                <span className="font-medium text-gray-900">{selectedDrug.dosage.child.dose}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Frequency</span>
                <span className="font-medium text-gray-900">{selectedDrug.dosage.child.frequency}</span>
              </div>
            </div>
          </div>

          {/* Administration */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Administration</h3>
            <p className="text-gray-600 leading-relaxed">
              {selectedDrug.dosage.child.notes || 'Administer orally with or without food. Shake well before use. Use a calibrated measuring device to ensure accurate dosing.'}
            </p>
          </div>

          {/* Side Effects */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Side Effects</h3>
            <p className="text-gray-600 leading-relaxed">
              {selectedDrug.adverseEffects.join(', ')}. Seek medical attention if severe allergic reactions occur.
            </p>
          </div>

          {/* Storage */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Storage</h3>
            <p className="text-gray-600 leading-relaxed">
              {selectedDrug.administration.storage}. Keep out of reach of children. Discard any unused portion after 14 days.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const renderSettings = () => (
    <div className="px-6 py-4">
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => setCurrentView('dashboard')}
          variant="ghost"
          size="sm"
          className="p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-xl">
          <h3 className="font-medium text-gray-900 mb-2">App Version</h3>
          <p className="text-gray-600">Pedia-Dose v1.0.0</p>
        </div>
        
        <div className="p-4 bg-gray-100 rounded-xl">
          <h3 className="font-medium text-gray-900 mb-2">Database</h3>
          <p className="text-gray-600">Nelson Textbook of Pediatrics 21st Edition</p>
        </div>
        
        <div className="p-4 bg-gray-100 rounded-xl">
          <h3 className="font-medium text-gray-900 mb-2">Last Updated</h3>
          <p className="text-gray-600">January 2024</p>
        </div>
      </div>
    </div>
  )

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      <OfflineIndicator />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Paedia-Dose</h1>
          <div className="flex items-center gap-4">
            {currentView !== 'dashboard' && (
              <Button
                onClick={() => setCurrentView('settings')}
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <Settings className="h-5 w-5" />
              </Button>
            )}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'calculator' && renderCalculator()}
        {currentView === 'drugDetail' && renderDrugDetail()}
        {currentView === 'settings' && renderSettings()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          <Button
            onClick={() => setCurrentView('dashboard')}
            variant="ghost"
            className={`flex flex-col items-center gap-1 py-3 px-4 ${currentView === 'dashboard' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
          
          <Button
            onClick={() => setCurrentView('calculator')}
            variant="ghost"
            className={`flex flex-col items-center gap-1 py-3 px-4 ${currentView === 'calculator' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            <Calculator className="h-5 w-5" />
            <span className="text-xs">Dosage</span>
          </Button>
          
          <Button
            onClick={() => setCurrentView('drugDetail')}
            variant="ghost"
            className={`flex flex-col items-center gap-1 py-3 px-4 ${currentView === 'drugDetail' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            <Pill className="h-5 w-5" />
            <span className="text-xs">Drug Detail</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}