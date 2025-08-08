// Favorites and Recent Calculations System
// Local storage-based system for tracking user preferences and history

export interface FavoriteDrug {
  id: string
  name: string
  genericName: string
  system: string
  category: string
  addedAt: string
}

export interface RecentCalculation {
  id: string
  drug: string
  genericName: string
  system: string
  category: string
  patientWeight: number
  patientAge: number
  ageGroup: string
  calculatedDose: {
    min: string
    max: string
    unit: string
  }
  frequency: string
  calculatedAt: string
}

export interface UserPreferences {
  favoriteDrugs: FavoriteDrug[]
  recentCalculations: RecentCalculation[]
  defaultSystem: string
  defaultAgeUnit: string
}

const STORAGE_KEY = 'pedia-dose-preferences'

// Default preferences
const defaultPreferences: UserPreferences = {
  favoriteDrugs: [],
  recentCalculations: [],
  defaultSystem: 'nervous',
  defaultAgeUnit: 'years'
}

// Get user preferences from localStorage
export function getUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return defaultPreferences
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        ...defaultPreferences,
        ...parsed
      }
    }
  } catch (error) {
    console.error('Error loading preferences:', error)
  }
  
  return defaultPreferences
}

// Save user preferences to localStorage
export function saveUserPreferences(preferences: UserPreferences): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  } catch (error) {
    console.error('Error saving preferences:', error)
  }
}

// Add drug to favorites
export function addToFavorites(drug: {
  id: string
  name: string
  genericName: string
  system: string
  category: string
}): void {
  const preferences = getUserPreferences()
  
  // Check if already in favorites
  const existingIndex = preferences.favoriteDrugs.findIndex(fav => fav.id === drug.id)
  if (existingIndex !== -1) {
    return // Already in favorites
  }
  
  preferences.favoriteDrugs.push({
    ...drug,
    addedAt: new Date().toISOString()
  })
  
  saveUserPreferences(preferences)
}

// Remove drug from favorites
export function removeFromFavorites(drugId: string): void {
  const preferences = getUserPreferences()
  preferences.favoriteDrugs = preferences.favoriteDrugs.filter(fav => fav.id !== drugId)
  saveUserPreferences(preferences)
}

// Check if drug is in favorites
export function isInFavorites(drugId: string): boolean {
  const preferences = getUserPreferences()
  return preferences.favoriteDrugs.some(fav => fav.id === drugId)
}

// Add calculation to recent history
export function addToRecentCalculations(calculation: {
  drug: string
  genericName: string
  system: string
  category: string
  patientWeight: number
  patientAge: number
  ageGroup: string
  dosageRange: {
    min: string
    max: string
    unit: string
  }
  frequency: string
}): void {
  const preferences = getUserPreferences()
  
  const newCalculation: RecentCalculation = {
    id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...calculation,
    calculatedDose: calculation.dosageRange,
    calculatedAt: new Date().toISOString()
  }
  
  // Add to beginning of array
  preferences.recentCalculations.unshift(newCalculation)
  
  // Keep only last 20 calculations
  preferences.recentCalculations = preferences.recentCalculations.slice(0, 20)
  
  saveUserPreferences(preferences)
}

// Clear recent calculations
export function clearRecentCalculations(): void {
  const preferences = getUserPreferences()
  preferences.recentCalculations = []
  saveUserPreferences(preferences)
}

// Get favorite drugs by system
export function getFavoriteDrugsBySystem(systemId: string): FavoriteDrug[] {
  const preferences = getUserPreferences()
  return preferences.favoriteDrugs.filter(fav => fav.system === systemId)
}

// Get recent calculations by system
export function getRecentCalculationsBySystem(systemId: string): RecentCalculation[] {
  const preferences = getUserPreferences()
  return preferences.recentCalculations.filter(calc => calc.system === systemId)
}

// Set default system
export function setDefaultSystem(systemId: string): void {
  const preferences = getUserPreferences()
  preferences.defaultSystem = systemId
  saveUserPreferences(preferences)
}

// Set default age unit
export function setDefaultAgeUnit(unit: string): void {
  const preferences = getUserPreferences()
  preferences.defaultAgeUnit = unit
  saveUserPreferences(preferences)
}

// Get statistics
export function getUserStats(): {
  totalFavorites: number
  totalRecentCalculations: number
  mostUsedSystem: string | null
  mostUsedDrug: string | null
} {
  const preferences = getUserPreferences()
  
  const systemCounts = preferences.recentCalculations.reduce((acc, calc) => {
    acc[calc.system] = (acc[calc.system] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const drugCounts = preferences.recentCalculations.reduce((acc, calc) => {
    acc[calc.drug] = (acc[calc.drug] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const mostUsedSystem = Object.entries(systemCounts).reduce((a, b) => 
    systemCounts[a[0]] > systemCounts[b[0]] ? a : b
  )?.[0] || null
  
  const mostUsedDrug = Object.entries(drugCounts).reduce((a, b) => 
    drugCounts[a[0]] > drugCounts[b[0]] ? a : b
  )?.[0] || null
  
  return {
    totalFavorites: preferences.favoriteDrugs.length,
    totalRecentCalculations: preferences.recentCalculations.length,
    mostUsedSystem,
    mostUsedDrug
  }
}