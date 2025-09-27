'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Leaf, Heart, Shield, Star, ChevronRight, Heater as Water, Recycle } from 'lucide-react';

interface ConservationTipsProps {
  currentFootprint: number;
}

export function ConservationTips({ currentFootprint }: ConservationTipsProps) {
  const tips = [
    {
      category: 'Food & Diet',
      icon: '🥗',
      color: 'green',
      tips: [
        {
          title: 'Reduce Meat Consumption',
          description: 'Replace beef with chicken or plant-based proteins 2-3 times per week',
          impact: 'High',
          waterSaved: '10,000L+ per week',
          difficulty: 'Easy'
        },
        {
          title: 'Buy Local & Seasonal',
          description: 'Choose locally grown, seasonal produce to reduce transportation water footprint',
          impact: 'Medium',
          waterSaved: '500L+ per week',
          difficulty: 'Easy'
        },
        {
          title: 'Minimize Food Waste',
          description: 'Plan meals and use leftovers to avoid wasting the water used in food production',
          impact: 'High',
          waterSaved: '1,000L+ per week',
          difficulty: 'Medium'
        },
        {
          title: 'Choose Water-Efficient Crops',
          description: 'Opt for rice alternatives like quinoa, or choose drought-resistant varieties',
          impact: 'Medium',
          waterSaved: '800L+ per meal',
          difficulty: 'Easy'
        }
      ]
    },
    {
      category: 'Clothing & Fashion',
      icon: '👕',
      color: 'purple',
      tips: [
        {
          title: 'Buy Quality Over Quantity',
          description: 'Invest in durable clothing that lasts longer instead of fast fashion',
          impact: 'High',
          waterSaved: '2,000L+ per item',
          difficulty: 'Medium'
        },
        {
          title: 'Choose Sustainable Fabrics',
          description: 'Opt for organic cotton, hemp, or recycled materials',
          impact: 'Medium',
          waterSaved: '1,500L+ per item',
          difficulty: 'Easy'
        },
        {
          title: 'Wash Clothes Less Frequently',
          description: 'Wash only when necessary and use cold water to extend garment life',
          impact: 'Low',
          waterSaved: '100L+ per wash',
          difficulty: 'Easy'
        },
        {
          title: 'Second-Hand Shopping',
          description: 'Buy vintage or second-hand clothing to avoid new production water costs',
          impact: 'High',
          waterSaved: '2,700L+ per item',
          difficulty: 'Easy'
        }
      ]
    },
    {
      category: 'Electronics & Technology',
      icon: '📱',
      color: 'blue',
      tips: [
        {
          title: 'Extend Device Lifespan',
          description: 'Use protective cases and proper maintenance to keep devices longer',
          impact: 'High',
          waterSaved: '13,000L+ per phone',
          difficulty: 'Easy'
        },
        {
          title: 'Buy Refurbished',
          description: 'Choose certified refurbished electronics over new ones',
          impact: 'High',
          waterSaved: '50,000L+ per laptop',
          difficulty: 'Easy'
        },
        {
          title: 'Proper Recycling',
          description: 'Recycle old electronics properly to recover materials for new products',
          impact: 'Medium',
          waterSaved: '5,000L+ per device',
          difficulty: 'Easy'
        },
        {
          title: 'Cloud Storage Optimization',
          description: 'Delete unnecessary files and use efficient cloud storage practices',
          impact: 'Low',
          waterSaved: '10L+ per GB',
          difficulty: 'Easy'
        }
      ]
    },
    {
      category: 'Daily Habits',
      icon: '🏠',
      color: 'orange',
      tips: [
        {
          title: 'Shorter Showers',
          description: 'Reduce shower time by 2-3 minutes to save both direct and indirect water',
          impact: 'Medium',
          waterSaved: '40L+ per shower',
          difficulty: 'Easy'
        },
        {
          title: 'Fix Leaks Immediately',
          description: 'Repair dripping taps and running toilets to prevent water waste',
          impact: 'High',
          waterSaved: '3,000L+ per month',
          difficulty: 'Medium'
        },
        {
          title: 'Full Load Washing',
          description: 'Only run dishwashers and washing machines with full loads',
          impact: 'Medium',
          waterSaved: '50L+ per load',
          difficulty: 'Easy'
        },
        {
          title: 'Collect Rainwater',
          description: 'Use rainwater for garden irrigation and non-potable uses',
          impact: 'Low',
          waterSaved: '100L+ per week',
          difficulty: 'Hard'
        }
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-700">
            <Lightbulb className="h-6 w-6 mr-2" />
            Water Conservation Tips
          </CardTitle>
          <CardDescription className="text-blue-600">
            Practical ways to reduce your water footprint and help conserve our planet's most precious resource
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentFootprint > 0 ? (
            <div className="bg-white/70 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800">
                <strong>Your current footprint:</strong> {currentFootprint.toLocaleString()}L
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Implementing these tips could help you reduce your daily water footprint by up to 50%
              </p>
            </div>
          ) : (
            <div className="bg-white/70 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800">
                Start tracking your water footprint to get personalized conservation recommendations!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips by Category */}
      <div className="space-y-8">
        {tips.map((category) => (
          <div key={category.category}>
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{category.icon}</span>
              <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.tips.map((tip, index) => (
                <Card key={index} className="border-gray-200 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-gray-900 leading-tight">
                        {tip.title}
                      </CardTitle>
                      <div className="flex flex-col space-y-1 ml-2">
                        <Badge className={`text-xs px-2 py-0 ${getImpactColor(tip.impact)}`}>
                          {tip.impact} Impact
                        </Badge>
                        <Badge className={`text-xs px-2 py-0 ${getDifficultyColor(tip.difficulty)}`}>
                          {tip.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3 text-sm">
                      {tip.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-600">
                        <Water className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">
                          Saves: {tip.waterSaved}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Items */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <Star className="h-5 w-5 mr-2" />
            Quick Action Items
          </CardTitle>
          <CardDescription className="text-green-600">
            Start with these simple changes today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-800">This Week</h4>
              </div>
              <p className="text-sm text-green-700">
                Replace one meat meal with a plant-based alternative
              </p>
            </div>
            
            <div className="bg-white/70 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-800">This Month</h4>
              </div>
              <p className="text-sm text-green-700">
                Buy one item second-hand instead of new
              </p>
            </div>
            
            <div className="bg-white/70 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-800">This Year</h4>
              </div>
              <p className="text-sm text-green-700">
                Extend your smartphone's life by one year
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Resources */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Recycle className="h-5 w-5 mr-2" />
            Learn More
          </CardTitle>
          <CardDescription className="text-purple-600">
            Deepen your understanding of water conservation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-white/70 p-3 rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-1">Virtual Water Concept</h5>
              <p className="text-sm text-purple-700">
                Learn about the hidden water embedded in products and services we consume daily
              </p>
            </div>
            
            <div className="bg-white/70 p-3 rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-1">Water Scarcity Impact</h5>
              <p className="text-sm text-purple-700">
                Understand how water stress affects communities and ecosystems worldwide
              </p>
            </div>
            
            <div className="bg-white/70 p-3 rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-1">Sustainable Lifestyle</h5>
              <p className="text-sm text-purple-700">
                Discover how small changes in daily habits can create significant environmental impact
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}