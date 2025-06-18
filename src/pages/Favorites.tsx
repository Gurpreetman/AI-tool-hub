import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import ToolCard from '../components/ToolCard';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            My Favorite AI Tools
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your curated collection of the best AI tools. Keep track of the tools you love most.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Tools</span>
        </Link>
        
        <div className="text-gray-600 dark:text-gray-400">
          {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Start exploring AI tools and click the heart icon to add them to your favorites collection.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            <span>Discover Tools</span>
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(tool => (
            <div key={tool.id} className="animate-fadeIn">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;