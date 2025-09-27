import { NextRequest, NextResponse } from 'next/server';

// Water footprint database (this could be moved to a proper database)
const waterFootprintDB = {
  // Food items (L per kg unless specified)
  'beef': 15415,
  'pork': 5988,
  'chicken': 4325,
  'rice': 2497,
  'wheat': 1827,
  'milk': 1000, // per liter
  'cheese': 3178,
  'apple': 822,
  'orange': 560,
  'banana': 790,
  'tomato': 214,
  'potato': 287,
  'coffee': 140, // per cup
  'tea': 27, // per cup
  
  // Clothing items (L per piece)
  'cotton_tshirt': 2700,
  'jeans': 7600,
  'cotton_dress': 2500,
  'leather_shoes': 8000,
  'wool_sweater': 5400,
  
  // Electronics (L per piece)
  'smartphone': 13000,
  'laptop': 300000,
  'tablet': 80000,
  'smart_tv': 180000,
  
  // Transportation (L per unit)
  'car_fuel': 2.5, // per liter
  'car_manufacturing': 400000, // per car
  'bicycle': 5000,
  
  // Household items
  'toilet_paper': 168, // per roll
  'paper_sheet': 13, // per sheet
  'plastic_bottle': 7, // per bottle
};

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items data' },
        { status: 400 }
      );
    }
    
    let totalWaterFootprint = 0;
    const calculatedItems = [];
    
    for (const item of items) {
      const { name, quantity, unit } = item;
      
      // Normalize item name for lookup
      const normalizedName = name.toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w_]/g, '');
      
      const waterPerUnit = waterFootprintDB[normalizedName as keyof typeof waterFootprintDB];
      
      if (waterPerUnit) {
        const itemWaterFootprint = waterPerUnit * quantity;
        totalWaterFootprint += itemWaterFootprint;
        
        calculatedItems.push({
          name,
          quantity,
          unit,
          waterPerUnit,
          totalWater: itemWaterFootprint
        });
      } else {
        // If item not found in database, return an estimated value or error
        calculatedItems.push({
          name,
          quantity,
          unit,
          waterPerUnit: 0,
          totalWater: 0,
          error: 'Item not found in database'
        });
      }
    }
    
    // Calculate additional metrics
    const averagePerItem = calculatedItems.length > 0 ? totalWaterFootprint / calculatedItems.length : 0;
    const dailyRecommendation = 2000; // L per day (example recommendation)
    const weeklyRecommendation = dailyRecommendation * 7;
    
    const response = {
      totalWaterFootprint,
      averagePerItem,
      itemCount: calculatedItems.length,
      items: calculatedItems,
      recommendations: {
        daily: dailyRecommendation,
        weekly: weeklyRecommendation,
        status: totalWaterFootprint > dailyRecommendation ? 'above_recommendation' : 'within_recommendation'
      },
      insights: {
        equivalentDrinkingWater: Math.round(totalWaterFootprint / 2), // assuming 2L drinking water per day
        equivalentShowers: Math.round(totalWaterFootprint / 150), // assuming 150L per shower
        carbonFootprintEquivalent: Math.round(totalWaterFootprint * 0.0003) // rough estimate in kg CO2
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error calculating water footprint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for retrieving available items
export async function GET() {
  try {
    const availableItems = Object.keys(waterFootprintDB).map(key => ({
      id: key,
      name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      waterPerUnit: waterFootprintDB[key as keyof typeof waterFootprintDB]
    }));
    
    return NextResponse.json({
      items: availableItems,
      categories: {
        food: availableItems.filter(item => 
          ['beef', 'pork', 'chicken', 'rice', 'wheat', 'milk', 'cheese', 'apple', 'orange', 'banana', 'tomato', 'potato', 'coffee', 'tea'].includes(item.id)
        ),
        clothing: availableItems.filter(item => 
          ['cotton_tshirt', 'jeans', 'cotton_dress', 'leather_shoes', 'wool_sweater'].includes(item.id)
        ),
        electronics: availableItems.filter(item => 
          ['smartphone', 'laptop', 'tablet', 'smart_tv'].includes(item.id)
        ),
        transportation: availableItems.filter(item => 
          ['car_fuel', 'car_manufacturing', 'bicycle'].includes(item.id)
        ),
        household: availableItems.filter(item => 
          ['toilet_paper', 'paper_sheet', 'plastic_bottle'].includes(item.id)
        )
      }
    });
  } catch (error) {
    console.error('Error retrieving items:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}