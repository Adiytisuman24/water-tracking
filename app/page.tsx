'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Droplets, Leaf, TrendingUp, Award, Calculator, ChartBar as BarChart3, Lightbulb, Globe } from 'lucide-react';
import { WaterFootprintChart } from '@/components/WaterFootprintChart';
import { ItemSelector } from '@/components/ItemSelector';
import { ConservationTips } from '@/components/ConservationTips';
import { PersonalDashboard } from '@/components/PersonalDashboard';

export default function Home() {
  const [totalFootprint, setTotalFootprint] = useState(0);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [dailyGoal, setDailyGoal] = useState(2000); // liters per day
  const [userName, setUserName] = useState('');

  const handleItemSelect = (item: any, quantity: number) => {
    const newItem = {
      ...item,
      quantity,
      totalWater: item.waterPerUnit * quantity,
      id: `${item.name}-${Date.now()}`
    };
    
    setSelectedItems(prev => [...prev, newItem]);
    setTotalFootprint(prev => prev + newItem.totalWater);
  };

  const removeItem = (itemId: string) => {
    const item = selectedItems.find(i => i.id === itemId);
    if (item) {
      setSelectedItems(prev => prev.filter(i => i.id !== itemId));
      setTotalFootprint(prev => prev - item.totalWater);
    }
  };

  const progressPercentage = Math.min((totalFootprint / dailyGoal) * 100, 100);
  const isOverGoal = totalFootprint > dailyGoal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  AquaTracker
                </h1>
                <p className="text-sm text-gray-600">Water Footprint Calculator</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Globe className="h-3 w-3 mr-1" />
                Saving Water, Saving Earth
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Water Footprint
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Understand the hidden water consumption behind everyday items. Make informed choices to reduce 
            your environmental impact and contribute to water conservation.
          </p>
          
          {/* Daily Progress */}
          <Card className="max-w-md mx-auto mb-8 border-blue-200 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-center">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                Today's Water Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-center mb-2">
                <span className={isOverGoal ? 'text-red-600' : 'text-blue-600'}>
                  {totalFootprint.toLocaleString()}
                </span>
                <span className="text-lg text-gray-500 ml-1">L</span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="mb-2"
                style={{
                  background: isOverGoal ? '#fee2e2' : '#dbeafe'
                }}
              />
              <p className="text-sm text-gray-600">
                Goal: {dailyGoal.toLocaleString()}L per day
                {isOverGoal && (
                  <span className="text-red-600 font-medium ml-2">
                    ({((totalFootprint - dailyGoal) / dailyGoal * 100).toFixed(1)}% over goal)
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm border border-blue-100">
            <TabsTrigger value="calculator" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Tips</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Item Selection */}
              <div className="lg:col-span-2">
                <ItemSelector onItemSelect={handleItemSelect} />
              </div>

              {/* Selected Items Summary */}
              <div className="space-y-4">
                <Card className="border-blue-200 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                      Selected Items
                    </CardTitle>
                    <CardDescription>
                      Your current water footprint calculation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.quantity} {item.unit} × {item.waterPerUnit}L = {item.totalWater.toLocaleString()}L
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      {selectedItems.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Droplets className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No items selected yet</p>
                          <p className="text-sm">Add items to see your water footprint</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <PersonalDashboard 
              selectedItems={selectedItems}
              totalFootprint={totalFootprint}
              dailyGoal={dailyGoal}
            />
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips">
            <ConservationTips currentFootprint={totalFootprint} />
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WaterFootprintChart selectedItems={selectedItems} />
              
              {/* Global Impact */}
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Globe className="h-5 w-5 mr-2" />
                    Global Water Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white/70 p-4 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-green-800 mb-2">Did you know?</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• A cotton t-shirt requires 2,700L of water to produce</li>
                        <li>• 1kg of beef requires 15,415L of water</li>
                        <li>• A smartphone needs 13,000L of water to manufacture</li>
                        <li>• 1L of milk requires 1,000L of water to produce</li>
                      </ul>
                    </div>
                    
                    {totalFootprint > 0 && (
                      <div className="bg-white/70 p-4 rounded-lg border border-green-100">
                        <h4 className="font-semibold text-green-800 mb-2">Your Impact Today</h4>
                        <p className="text-sm text-green-700">
                          Your current selection equals the water consumption of{' '}
                          <span className="font-bold">
                            {(totalFootprint / 150).toFixed(1)} people's daily drinking water
                          </span>{' '}
                          (150L per person per day).
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-blue-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-gray-700">AquaTracker</span>
            </div>
            <p className="text-gray-600 mb-4">
              Every drop counts. Track, understand, and reduce your water footprint for a sustainable future.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <Leaf className="h-4 w-4 mr-1" />
                Eco-Friendly
              </span>
              <span className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                Educational
              </span>
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                Global Impact
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}