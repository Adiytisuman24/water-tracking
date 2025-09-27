'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Utensils, Shirt, Smartphone, Car, Chrome as Home, Coffee } from 'lucide-react';

const waterFootprintData = {
  food: [
    { name: 'Beef (1kg)', waterPerUnit: 15415, unit: 'kg', category: 'Meat', icon: '🥩' },
    { name: 'Pork (1kg)', waterPerUnit: 5988, unit: 'kg', category: 'Meat', icon: '🥓' },
    { name: 'Chicken (1kg)', waterPerUnit: 4325, unit: 'kg', category: 'Meat', icon: '🐔' },
    { name: 'Rice (1kg)', waterPerUnit: 2497, unit: 'kg', category: 'Grains', icon: '🍚' },
    { name: 'Wheat (1kg)', waterPerUnit: 1827, unit: 'kg', category: 'Grains', icon: '🌾' },
    { name: 'Milk (1L)', waterPerUnit: 1000, unit: 'L', category: 'Dairy', icon: '🥛' },
    { name: 'Cheese (1kg)', waterPerUnit: 3178, unit: 'kg', category: 'Dairy', icon: '🧀' },
    { name: 'Eggs (1 dozen)', waterPerUnit: 3265, unit: 'dozen', category: 'Dairy', icon: '🥚' },
    { name: 'Apple (1kg)', waterPerUnit: 822, unit: 'kg', category: 'Fruits', icon: '🍎' },
    { name: 'Orange (1kg)', waterPerUnit: 560, unit: 'kg', category: 'Fruits', icon: '🍊' },
    { name: 'Banana (1kg)', waterPerUnit: 790, unit: 'kg', category: 'Fruits', icon: '🍌' },
    { name: 'Tomato (1kg)', waterPerUnit: 214, unit: 'kg', category: 'Vegetables', icon: '🍅' },
    { name: 'Potato (1kg)', waterPerUnit: 287, unit: 'kg', category: 'Vegetables', icon: '🥔' },
    { name: 'Coffee (1 cup)', waterPerUnit: 140, unit: 'cup', category: 'Beverages', icon: '☕' },
    { name: 'Tea (1 cup)', waterPerUnit: 27, unit: 'cup', category: 'Beverages', icon: '🍵' },
  ],
  clothing: [
    { name: 'Cotton T-shirt', waterPerUnit: 2700, unit: 'piece', category: 'Cotton', icon: '👕' },
    { name: 'Jeans (Cotton)', waterPerUnit: 7600, unit: 'piece', category: 'Cotton', icon: '👖' },
    { name: 'Cotton Dress', waterPerUnit: 2500, unit: 'piece', category: 'Cotton', icon: '👗' },
    { name: 'Leather Shoes', waterPerUnit: 8000, unit: 'pair', category: 'Leather', icon: '👞' },
    { name: 'Wool Sweater', waterPerUnit: 5400, unit: 'piece', category: 'Wool', icon: '🧥' },
    { name: 'Polyester Jacket', waterPerUnit: 1800, unit: 'piece', category: 'Synthetic', icon: '🧥' },
    { name: 'Cotton Underwear', waterPerUnit: 600, unit: 'piece', category: 'Cotton', icon: '🩲' },
    { name: 'Cotton Socks', waterPerUnit: 400, unit: 'pair', category: 'Cotton', icon: '🧦' },
  ],
  electronics: [
    { name: 'Smartphone', waterPerUnit: 13000, unit: 'piece', category: 'Mobile', icon: '📱' },
    { name: 'Laptop Computer', waterPerUnit: 300000, unit: 'piece', category: 'Computing', icon: '💻' },
    { name: 'Tablet', waterPerUnit: 80000, unit: 'piece', category: 'Mobile', icon: '📱' },
    { name: 'Smart TV (55")', waterPerUnit: 180000, unit: 'piece', category: 'Entertainment', icon: '📺' },
    { name: 'Gaming Console', waterPerUnit: 120000, unit: 'piece', category: 'Gaming', icon: '🎮' },
    { name: 'Smartwatch', waterPerUnit: 35000, unit: 'piece', category: 'Wearable', icon: '⌚' },
  ],
  transportation: [
    { name: 'Car (gasoline, 1L)', waterPerUnit: 2.5, unit: 'L fuel', category: 'Vehicle', icon: '🚗' },
    { name: 'Car Manufacturing', waterPerUnit: 400000, unit: 'piece', category: 'Manufacturing', icon: '🏭' },
    { name: 'Bicycle', waterPerUnit: 5000, unit: 'piece', category: 'Eco-friendly', icon: '🚲' },
    { name: 'Bus Ticket (100km)', waterPerUnit: 25, unit: 'trip', category: 'Public Transport', icon: '🚌' },
    { name: 'Flight (1000km)', waterPerUnit: 3700, unit: 'trip', category: 'Air Travel', icon: '✈️' },
  ],
  household: [
    { name: 'Toilet Paper (1 roll)', waterPerUnit: 168, unit: 'roll', category: 'Hygiene', icon: '🧻' },
    { name: 'Paper (A4, 1 sheet)', waterPerUnit: 13, unit: 'sheet', category: 'Office', icon: '📄' },
    { name: 'Plastic Bottle (0.5L)', waterPerUnit: 7, unit: 'bottle', category: 'Container', icon: '🍼' },
    { name: 'Aluminum Can', waterPerUnit: 25, unit: 'can', category: 'Container', icon: '🥤' },
    { name: 'Glass Bottle', waterPerUnit: 5, unit: 'bottle', category: 'Container', icon: '🍾' },
    { name: 'Concrete (1m³)', waterPerUnit: 1000, unit: 'm³', category: 'Construction', icon: '🏗️' },
  ]
};

interface ItemSelectorProps {
  onItemSelect: (item: any, quantity: number) => void;
}

export function ItemSelector({ onItemSelect }: ItemSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  const categories = [
    { id: 'food', label: 'Food & Drinks', icon: Utensils, color: 'from-orange-500 to-red-500' },
    { id: 'clothing', label: 'Clothing', icon: Shirt, color: 'from-purple-500 to-pink-500' },
    { id: 'electronics', label: 'Electronics', icon: Smartphone, color: 'from-blue-500 to-indigo-500' },
    { id: 'transportation', label: 'Transportation', icon: Car, color: 'from-green-500 to-teal-500' },
    { id: 'household', label: 'Household', icon: Home, color: 'from-yellow-500 to-orange-500' },
  ];

  const filteredItems = waterFootprintData[selectedCategory as keyof typeof waterFootprintData]?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleQuantityChange = (itemName: string, quantity: string) => {
    const numQuantity = parseFloat(quantity) || 0;
    setQuantities(prev => ({ ...prev, [itemName]: numQuantity }));
  };

  const handleAddItem = (item: any) => {
    const quantity = quantities[item.name] || 1;
    onItemSelect(item, quantity);
    setQuantities(prev => ({ ...prev, [item.name]: 1 }));
  };

  return (
    <Card className="border-blue-200 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="h-5 w-5 text-blue-500 mr-2" />
          Add Items to Calculate
        </CardTitle>
        <CardDescription>
          Select items from different categories to calculate your water footprint
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <IconComponent className="h-5 w-5 mx-auto mb-1" />
                <span className="text-xs font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {filteredItems.map((item) => (
            <div key={item.name} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600">
                  Water footprint: <span className="font-semibold text-blue-600">
                    {item.waterPerUnit.toLocaleString()}L per {item.unit}
                  </span>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Qty"
                  value={quantities[item.name] || ''}
                  onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                  className="flex-1 text-sm"
                  min="0"
                  step="0.1"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">{item.unit}</span>
                <Button
                  onClick={() => handleAddItem(item)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={!quantities[item.name] || quantities[item.name] <= 0}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No items found</p>
            <p className="text-sm">Try adjusting your search or select a different category</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}