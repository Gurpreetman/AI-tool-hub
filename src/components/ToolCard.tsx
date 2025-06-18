import React, { useState } from 'react';
import { Heart, ExternalLink, Tag, DollarSign, Loader2 } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import Confetti from 'react-confetti';

interface Tool {
  id: number;
  name: string;
  category: string;
  url: string;
  excerpt: string;
  tags: string[];
  pricing: string;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { addToFavorites, removeFromFavorites, isFavorite, loading } = useFavorites();
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFavoriteClick = async () => {
    setError(null);
    
    if (isFavorite(tool.id)) {
      const success = await removeFromFavorites(tool.id);
      if (!success) {
        setError('Failed to remove from favorites');
      }
    } else {
      const success = await addToFavorites(tool);
      if (success) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        setError('Failed to add to favorites');
      }
    }
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing.toLowerCase()) {
      case 'free':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'freemium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'paid':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 rounded-full">
                {tool.category}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full flex items-center space-x-1 ${getPricingColor(tool.pricing)}`}>
                <DollarSign className="h-3 w-3" />
                <span>{tool.pricing}</span>
              </span>
            </div>
          </div>
          
          <button
            onClick={handleFavoriteClick}
            disabled={loading}
            className={`p-2 rounded-full transition-all duration-300 ${
              isFavorite(tool.id)
                ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400'
            }`}
            aria-label={isFavorite(tool.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Heart className={`h-5 w-5 ${isFavorite(tool.id) ? 'fill-current' : ''}`} />
            )}
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {tool.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md"
            >
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300"
        >
          <span>Visit Tool</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </>
  );
};

export default ToolCard;