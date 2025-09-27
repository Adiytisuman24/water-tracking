'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartBar as BarChart3, ChartPie as PieChartIcon } from 'lucide-react';

interface WaterFootprintChartProps {
  selectedItems: any[];
}

export function WaterFootprintChart({ selectedItems }: WaterFootprintChartProps) {
  // Prepare data for charts
  const categoryData = selectedItems.reduce((acc: any, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = { name: category, value: 0, count: 0 };
    }
    acc[category].value += item.totalWater;
    acc[category].count += 1;
    return acc;
  }, {});

  const pieData = Object.values(categoryData);
  const barData = selectedItems
    .sort((a, b) => b.totalWater - a.totalWater)
    .slice(0, 8)
    .map(item => ({
      name: item.name.length > 20 ? item.name.substring(0, 17) + '...' : item.name,
      water: item.totalWater,
      quantity: item.quantity
    }));

  const COLORS = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#84CC16', // Lime
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">
            Water: {payload[0].value.toLocaleString()}L
          </p>
          {payload[0].payload.quantity && (
            <p className="text-gray-600 text-sm">
              Quantity: {payload[0].payload.quantity}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (selectedItems.length === 0) {
    return (
      <Card className="border-gray-200 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
            Water Footprint Analysis
          </CardTitle>
          <CardDescription>Add items to see detailed analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No data to display</p>
            <p className="text-sm">Start adding items to see your water footprint breakdown</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Breakdown - Pie Chart */}
      <Card className="border-blue-200 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChartIcon className="h-5 w-5 text-blue-500 mr-2" />
            Water Usage by Category
          </CardTitle>
          <CardDescription>
            Distribution of water consumption across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value.toLocaleString()}L`, 'Water Usage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {pieData.map((entry: any, index) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name} ({entry.count} items)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Items - Bar Chart */}
      <Card className="border-green-200 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
            Highest Water Consuming Items
          </CardTitle>
          <CardDescription>
            Your selected items ranked by water consumption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="water" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}