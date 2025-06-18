import React, { createContext, useContext, useState, useEffect } from 'react';

interface Tool {
  id: number;
  name: string;
  category: string;
  url: string;
  excerpt: string;
  tags: string[];
  pricing: string;
}

interface FavoritesContextType {
  favorites: Tool[];
  addToFavorites: (tool: Tool) => Promise<boolean>;
  removeFromFavorites: (toolId: number) => Promise<boolean>;
  isFavorite: (toolId: number) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch favorites on mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const addToFavorites = async (tool: Tool): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toolId: tool.id }),
      });

      if (response.ok) {
        setFavorites(prev => [...prev, tool]);
        return true;
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      console.error('Failed to add favorite:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (toolId: number): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/favorites/${toolId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavorites(prev => prev.filter(fav => fav.id !== toolId));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (toolId: number): boolean => {
    return favorites.some(fav => fav.id === toolId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};