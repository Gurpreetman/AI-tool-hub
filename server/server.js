import express from 'express';
import cors from 'cors';
import { aiTools } from './data/tools.js';

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory favorites storage
let favorites = [];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/tools', (req, res) => {
  try {
    const { category } = req.query;
    
    if (category) {
      const filteredTools = aiTools.filter(tool => 
        tool.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(filteredTools);
    }
    
    res.json(aiTools);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

app.post('/api/favorites', (req, res) => {
  try {
    const { toolId } = req.body;
    
    if (!toolId) {
      return res.status(400).json({ error: 'Tool ID is required' });
    }
    
    // Check if tool exists
    const tool = aiTools.find(t => t.id === toolId);
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    
    // Check if already in favorites
    const existingFavorite = favorites.find(fav => fav.id === toolId);
    if (existingFavorite) {
      return res.status(409).json({ error: 'Tool is already in favorites' });
    }
    
    // Add to favorites
    favorites.push(tool);
    res.status(201).json({ message: 'Tool added to favorites', tool });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

app.get('/api/favorites', (req, res) => {
  try {
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

app.delete('/api/favorites/:id', (req, res) => {
  try {
    const toolId = parseInt(req.params.id);
    const initialLength = favorites.length;
    
    favorites = favorites.filter(fav => fav.id !== toolId);
    
    if (favorites.length === initialLength) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    
    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});