import { NextRequest, NextResponse } from 'next/server';

interface ConservationTip {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  waterSaved: string;
  applicableFootprint?: number; // minimum footprint where this tip is relevant
}

const conservationTips: ConservationTip[] = [
  // Food & Diet Tips
  {
    id: 'reduce_meat_consumption',
    title: 'Reduce Meat Consumption',
    description: 'Replace beef with chicken or plant-based proteins 2-3 times per week. Beef has one of the highest water footprints among all foods.',
    category: 'Food & Diet',
    impact: 'High',
    difficulty: 'Easy',
    waterSaved: '10,000L+ per week',
    applicableFootprint: 5000
  },
  {
    id: 'buy_local_seasonal',
    title: 'Buy Local & Seasonal Produce',
    description: 'Choose locally grown, seasonal produce to reduce transportation and processing water footprint.',
    category: 'Food & Diet',
    impact: 'Medium',
    difficulty: 'Easy',
    waterSaved: '500L+ per week'
  },
  {
    id: 'minimize_food_waste',
    title: 'Minimize Food Waste',
    description: 'Plan meals carefully and use leftovers creatively to avoid wasting the water embedded in food production.',
    category: 'Food & Diet',
    impact: 'High',
    difficulty: 'Medium',
    waterSaved: '1,000L+ per week'
  },
  
  // Clothing & Fashion Tips
  {
    id: 'buy_quality_clothing',
    title: 'Buy Quality Over Quantity',
    description: 'Invest in durable, well-made clothing that lasts longer instead of frequently buying fast fashion items.',
    category: 'Clothing & Fashion',
    impact: 'High',
    difficulty: 'Medium',
    waterSaved: '2,000L+ per avoided purchase'
  },
  {
    id: 'sustainable_fabrics',
    title: 'Choose Sustainable Fabrics',
    description: 'Opt for organic cotton, hemp, bamboo, or recycled materials which typically require less water to produce.',
    category: 'Clothing & Fashion',
    impact: 'Medium',
    difficulty: 'Easy',
    waterSaved: '1,500L+ per garment'
  },
  {
    id: 'second_hand_shopping',
    title: 'Second-Hand Shopping',
    description: 'Buy vintage, thrift, or second-hand clothing to completely avoid the water footprint of new production.',
    category: 'Clothing & Fashion',
    impact: 'High',
    difficulty: 'Easy',
    waterSaved: '2,700L+ per cotton item'
  },
  
  // Electronics & Technology Tips
  {
    id: 'extend_device_lifespan',
    title: 'Extend Device Lifespan',
    description: 'Use protective cases, regular maintenance, and avoid unnecessary upgrades to keep electronics longer.',
    category: 'Electronics & Technology',
    impact: 'High',
    difficulty: 'Easy',
    waterSaved: '13,000L+ per phone year',
    applicableFootprint: 10000
  },
  {
    id: 'buy_refurbished',
    title: 'Buy Refurbished Electronics',
    description: 'Choose certified refurbished devices over new ones to avoid the water footprint of manufacturing.',
    category: 'Electronics & Technology',
    impact: 'High',
    difficulty: 'Easy',
    waterSaved: '50,000L+ per laptop'
  },
  {
    id: 'proper_recycling',
    title: 'Proper Electronic Recycling',
    description: 'Recycle old electronics through certified e-waste programs to recover materials for new products.',
    category: 'Electronics & Technology',
    impact: 'Medium',
    difficulty: 'Easy',
    waterSaved: '5,000L+ per device'
  },
  
  // Daily Habits Tips
  {
    id: 'shorter_showers',
    title: 'Take Shorter Showers',
    description: 'Reduce shower time by 2-3 minutes to save both direct water use and the energy needed to heat water.',
    category: 'Daily Habits',
    impact: 'Medium',
    difficulty: 'Easy',
    waterSaved: '40L+ per shower'
  },
  {
    id: 'fix_leaks',
    title: 'Fix Leaks Immediately',
    description: 'Repair dripping faucets and running toilets promptly to prevent continuous water waste.',
    category: 'Daily Habits',
    impact: 'High',
    difficulty: 'Medium',
    waterSaved: '3,000L+ per month'
  },
  {
    id: 'full_load_washing',
    title: 'Full Load Washing',
    description: 'Only run dishwashers and washing machines when you have full loads to maximize water efficiency.',
    category: 'Daily Habits',
    impact: 'Medium',
    difficulty: 'Easy',
    waterSaved: '50L+ per load'
  }
];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const footprint = url.searchParams.get('footprint');
    
    let filteredTips = conservationTips;
    
    // Filter by category if specified
    if (category) {
      filteredTips = filteredTips.filter(tip => 
        tip.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Filter by applicable footprint if specified
    if (footprint) {
      const currentFootprint = parseInt(footprint);
      filteredTips = filteredTips.filter(tip => 
        !tip.applicableFootprint || currentFootprint >= tip.applicableFootprint
      );
    }
    
    // Group tips by category
    const tipsByCategory = filteredTips.reduce((acc: any, tip) => {
      if (!acc[tip.category]) {
        acc[tip.category] = [];
      }
      acc[tip.category].push(tip);
      return acc;
    }, {});
    
    return NextResponse.json({
      tips: filteredTips,
      tipsByCategory,
      totalTips: filteredTips.length,
      categories: Object.keys(tipsByCategory)
    });
  } catch (error) {
    console.error('Error retrieving conservation tips:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userFootprint, categories } = await request.json();
    
    // Get personalized recommendations based on user's current footprint
    let personalizedTips = conservationTips;
    
    // Filter tips relevant to user's footprint level
    if (userFootprint) {
      personalizedTips = personalizedTips.filter(tip => 
        !tip.applicableFootprint || userFootprint >= tip.applicableFootprint
      );
    }
    
    // Filter by relevant categories if specified
    if (categories && categories.length > 0) {
      personalizedTips = personalizedTips.filter(tip => 
        categories.some((cat: string) => tip.category.toLowerCase().includes(cat.toLowerCase()))
      );
    }
    
    // Sort by impact (High -> Medium -> Low)
    const impactOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    personalizedTips.sort((a, b) => 
      impactOrder[b.impact] - impactOrder[a.impact]
    );
    
    // Calculate potential water savings
    const totalPotentialSavings = personalizedTips.reduce((total, tip) => {
      const savingsMatch = tip.waterSaved.match(/(\d+,?\d*)/);
      if (savingsMatch) {
        const savings = parseInt(savingsMatch[1].replace(',', ''));
        return total + savings;
      }
      return total;
    }, 0);
    
    return NextResponse.json({
      personalizedTips: personalizedTips.slice(0, 8), // Return top 8 recommendations
      totalPotentialSavings,
      recommendations: {
        immediate: personalizedTips.filter(tip => tip.difficulty === 'Easy').slice(0, 3),
        shortTerm: personalizedTips.filter(tip => tip.difficulty === 'Medium').slice(0, 3),
        longTerm: personalizedTips.filter(tip => tip.difficulty === 'Hard').slice(0, 2)
      }
    });
  } catch (error) {
    console.error('Error generating personalized tips:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}