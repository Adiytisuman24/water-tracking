'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, Target, TrendingDown, Award, Droplets, Calendar } from 'lucide-react';

interface PersonalDashboardProps {
  selectedItems: any[];
  totalFootprint: number;
  dailyGoal: number;
}

export function PersonalDashboard({ selectedItems, totalFootprint, dailyGoal }: PersonalDashboardProps) {
  // Calculate statistics
  const averagePerItem = selectedItems.length > 0 ? totalFootprint / selectedItems.length : 0;
  const goalProgress = Math.min((totalFootprint / dailyGoal) * 100, 100);
  const isOverGoal = totalFootprint > dailyGoal;
  
  // Efficiency rating based on goal progress
  const getEfficiencyRating = () => {
    if (totalFootprint === 0) return { rating: 'Not Started', color: 'gray', level: 0 };
    if (goalProgress <= 50) return { rating: 'Excellent', color: 'green', level: 5 };
    if (goalProgress <= 75) return { rating: 'Good', color: 'blue', level: 4 };
    if (goalProgress <= 100) return { rating: 'Fair', color: 'yellow', level: 3 };
    if (goalProgress <= 125) return { rating: 'Needs Improvement', color: 'orange', level: 2 };
    return { rating: 'Critical', color: 'red', level: 1 };
  };

  const efficiency = getEfficiencyRating();

  // Calculate category breakdown
  const categoryBreakdown = selectedItems.reduce((acc: any, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = { total: 0, count: 0 };
    }
    acc[category].total += item.totalWater;
    acc[category].count += 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryBreakdown)
    .sort(([,a]: any, [,b]: any) => b.total - a.total)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
              <Droplets className="h-4 w-4 mr-1" />
              Total Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {totalFootprint.toLocaleString()}
              <span className="text-sm font-normal text-blue-600 ml-1">L</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Water consumed today</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {goalProgress.toFixed(1)}
              <span className="text-sm font-normal text-green-600 ml-1">%</span>
            </div>
            <Progress 
              value={goalProgress} 
              className="mt-2 h-2"
              style={{ background: isOverGoal ? '#fecaca' : '#dcfce7' }}
            />
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center">
              <User className="h-4 w-4 mr-1" />
              Items Tracked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {selectedItems.length}
              <span className="text-sm font-normal text-purple-600 ml-1">items</span>
            </div>
            <p className="text-xs text-purple-600 mt-1">
              Avg: {averagePerItem.toLocaleString(undefined, { maximumFractionDigits: 0 })}L per item
            </p>
          </CardContent>
        </Card>

        <Card className={`border-${efficiency.color}-200 bg-gradient-to-br from-${efficiency.color}-50 to-${efficiency.color}-100`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm font-medium text-${efficiency.color}-700 flex items-center`}>
              <Award className="h-4 w-4 mr-1" />
              Efficiency Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-lg font-bold text-${efficiency.color}-900 mb-1`}>
              {efficiency.rating}
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full mr-1 ${
                    i < efficiency.level 
                      ? `bg-${efficiency.color}-500` 
                      : `bg-${efficiency.color}-200`
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Analysis */}
        <Card className="border-gray-200 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 text-gray-500 mr-2" />
              Category Analysis
            </CardTitle>
            <CardDescription>
              Your water consumption by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topCategories.length > 0 ? (
              <div className="space-y-4">
                {topCategories.map(([category, data]: any, index) => {
                  const percentage = (data.total / totalFootprint) * 100;
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">{category}</span>
                        <div className="text-right">
                          <span className="font-semibold text-gray-900">
                            {data.total.toLocaleString()}L
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({data.count} items)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={percentage} className="flex-1 h-2" />
                        <span className="text-sm text-gray-600 w-12">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <TrendingDown className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No items added yet</p>
                <p className="text-sm">Add items to see category breakdown</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Award className="h-5 w-5 mr-2" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription className="text-orange-600">
              Ways to reduce your water footprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {totalFootprint === 0 ? (
                <p className="text-orange-700">
                  Start adding items to get personalized recommendations!
                </p>
              ) : (
                <>
                  {isOverGoal && (
                    <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 font-medium">
                        ⚠️ You're {((totalFootprint - dailyGoal) / dailyGoal * 100).toFixed(1)}% over your daily goal
                      </p>
                      <p className="text-xs text-red-700 mt-1">
                        Consider reducing high-impact items or choosing alternatives
                      </p>
                    </div>
                  )}
                  
                  {selectedItems.some(item => item.category === 'Meat') && (
                    <div className="p-3 bg-green-100 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        🌱 Try Meatless Monday
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Replacing beef with chicken once a week can save 10,000L+ of water
                      </p>
                    </div>
                  )}
                  
                  {selectedItems.some(item => item.category === 'Cotton') && (
                    <div className="p-3 bg-blue-100 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">
                        👕 Consider sustainable fabrics
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Organic cotton or recycled materials use significantly less water
                      </p>
                    </div>
                  )}
                  
                  <div className="p-3 bg-purple-100 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-800 font-medium">
                      💡 Daily Tip
                    </p>
                    <p className="text-xs text-purple-700 mt-1">
                      Every small change counts. Keep track of your daily usage to identify patterns
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Items */}
      {selectedItems.length > 0 && (
        <Card className="border-gray-200 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              Today's Items
            </CardTitle>
            <CardDescription>
              Items you've tracked today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {selectedItems.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    {item.quantity} {item.unit} × {item.waterPerUnit}L = {' '}
                    <span className="font-semibold text-blue-600">
                      {item.totalWater.toLocaleString()}L
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}