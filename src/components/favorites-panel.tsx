'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Star, 
  Clock, 
  Trash2, 
  Heart, 
  HeartOff, 
  Calculator,
  TrendingUp,
  User
} from 'lucide-react'
import { 
  FavoriteDrug, 
  RecentCalculation, 
  getUserPreferences, 
  removeFromFavorites, 
  clearRecentCalculations,
  addToFavorites,
  isInFavorites,
  getUserStats
} from '@/lib/favorites-system'
import { toast } from 'sonner'

interface FavoritesPanelProps {
  onSelectDrug?: (drugId: string) => void
  currentSystem?: string
}

export default function FavoritesPanel({ onSelectDrug, currentSystem }: FavoritesPanelProps) {
  const [favorites, setFavorites] = useState<FavoriteDrug[]>([])
  const [recentCalculations, setRecentCalculations] = useState<RecentCalculation[]>([])
  const [stats, setStats] = useState({
    totalFavorites: 0,
    totalRecentCalculations: 0,
    mostUsedSystem: null as string | null,
    mostUsedDrug: null as string | null
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const preferences = getUserPreferences()
    setFavorites(preferences.favoriteDrugs)
    setRecentCalculations(preferences.recentCalculations)
    setStats(getUserStats())
  }

  const handleRemoveFavorite = (drugId: string, drugName: string) => {
    removeFromFavorites(drugId)
    loadData()
    toast.success(`Removed ${drugName} from favorites`)
  }

  const handleClearRecent = () => {
    clearRecentCalculations()
    loadData()
    toast.success('Cleared recent calculations')
  }

  const handleSelectDrug = (drugId: string) => {
    if (onSelectDrug) {
      onSelectDrug(drugId)
    }
  }

  const handleAddToFavorites = (calculation: RecentCalculation) => {
    if (!isInFavorites(calculation.drug)) {
      addToFavorites({
        id: calculation.drug.toLowerCase().replace(/\s+/g, '_'),
        name: calculation.drug,
        genericName: calculation.genericName,
        system: calculation.system,
        category: calculation.category
      })
      loadData()
      toast.success(`Added ${calculation.drug} to favorites`)
    } else {
      toast.info(`${calculation.drug} is already in favorites`)
    }
  }

  const filteredFavorites = currentSystem 
    ? favorites.filter(fav => fav.system === currentSystem)
    : favorites

  const filteredRecent = currentSystem
    ? recentCalculations.filter(calc => calc.system === currentSystem)
    : recentCalculations

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>My Drugs</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Badge variant="outline" className="text-xs border-blue-500 text-blue-300">
              {stats.totalFavorites} Favorites
            </Badge>
            <Badge variant="outline" className="text-xs border-green-500 text-green-300">
              {stats.totalRecentCalculations} Recent
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Recent</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="mt-4">
            <ScrollArea className="h-64">
              {filteredFavorites.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <HeartOff className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No favorite drugs yet</p>
                  <p className="text-sm">Click the heart icon to add drugs to favorites</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFavorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-white">{favorite.name}</div>
                        <div className="text-sm text-slate-400">{favorite.genericName}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {favorite.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSelectDrug(favorite.id)}
                          className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                        >
                          <Calculator className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveFavorite(favorite.id, favorite.name)}
                          className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                        >
                          <HeartOff className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent" className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-slate-300">Recent Calculations</h3>
              {filteredRecent.length > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClearRecent}
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <ScrollArea className="h-64">
              {filteredRecent.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent calculations</p>
                  <p className="text-sm">Your dosage calculations will appear here</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredRecent.map((calculation) => (
                    <div
                      key={calculation.id}
                      className="p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-white">{calculation.drug}</div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSelectDrug(calculation.drug.toLowerCase().replace(/\s+/g, '_'))}
                            className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                          >
                            <Calculator className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddToFavorites(calculation)}
                            className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-white"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-slate-400 space-y-1">
                        <div>Patient: {calculation.patientAge}y, {calculation.patientWeight}kg</div>
                        <div>Dose: {calculation.calculatedDose.min}-{calculation.calculatedDose.max} {calculation.calculatedDose.unit}</div>
                        <div>Frequency: {calculation.frequency}</div>
                        <div className="text-xs text-slate-500">
                          {new Date(calculation.calculatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.totalFavorites}</div>
                  <div className="text-sm text-slate-400">Favorite Drugs</div>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.totalRecentCalculations}</div>
                  <div className="text-sm text-slate-400">Calculations</div>
                </div>
              </div>
              
              {stats.mostUsedSystem && (
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-slate-300">Most Used System</span>
                  </div>
                  <div className="text-lg font-semibold text-white capitalize">
                    {stats.mostUsedSystem.replace('_', ' ')}
                  </div>
                </div>
              )}
              
              {stats.mostUsedDrug && (
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-slate-300">Most Used Drug</span>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {stats.mostUsedDrug}
                  </div>
                </div>
              )}
              
              {!stats.mostUsedSystem && !stats.mostUsedDrug && (
                <div className="text-center py-8 text-slate-400">
                  <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No statistics yet</p>
                  <p className="text-sm">Start calculating doses to see your usage patterns</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}