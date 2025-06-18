import React, { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';

interface Tool {
  id: number;
  name: string;
  category: string;
  url: string;
  excerpt: string;
  tags: string[];
  pricing: string;
}

interface CategoryChartProps {
  tools: Tool[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ tools }) => {
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const counts = tools.reduce((acc, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    
    setCategoryData(counts);
  }, [tools]);

  const maxCount = Math.max(...Object.values(categoryData));

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-teal-500',
      'bg-blue-500',
      'bg-cyan-500'
    ];
    
    const categories = Object.keys(categoryData).sort();
    const index = categories.indexOf(category);
    return colors[index % colors.length];
  };

  if (Object.keys(categoryData).length === 0) {
    return null;
  }

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Tools by Category
        </h3>
      </div>
      
      <div className="space-y-4">
        {Object.entries(categoryData)
          .sort(([,a], [,b]) => b - a)
          .map(([category, count]) => (
            <div key={category} className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {category}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                <div
                  className={`h-full ${getCategoryColor(category)} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                  style={{ width: `${(count / maxCount) * 100}%` }}
                >
                  <span className="text-white text-xs font-bold">
                    {count}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryChart;