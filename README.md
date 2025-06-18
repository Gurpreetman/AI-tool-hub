# AI Tools Discovery App

A beautiful, full-stack web application for discovering and managing AI tools. Built with React, TypeScript, Express.js, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Browse AI Tools**: Discover a curated collection of AI tools across different categories
- **Advanced Filtering**: Filter tools by category and search by name, description, or tags
- **Favorites Management**: Save your favorite tools and manage your collection
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Real-time Updates**: Instant feedback with loading states and error handling

### Bonus Features
- **🌙 Dark Mode**: Toggle between light and dark themes with system preference detection
- **📊 Category Chart**: Visual representation of tools distribution across categories
- **🔍 Smart Search**: Search across tool names, descriptions, and tags
- **🎉 Confetti Animation**: Celebratory animation when adding tools to favorites
- **✨ Smooth Animations**: Fade-in animations and hover effects for premium feel

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Confetti** for celebrations

### Backend
- **Node.js** with Express.js
- **CORS** for cross-origin requests
- **In-memory storage** for favorites (resets on restart)

### All Tools Page
- Grid layout with beautiful tool cards
- Search and filter functionality
- Category chart visualization
- Responsive design

### Favorites Page
- Curated collection of saved tools
- Remove favorites functionality
- Empty state with call-to-action

### Dark Mode
- System preference detection
- Smooth theme transitions
- Consistent design across all components

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-tool-hub
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Start the development servers**
   
   **Option 1: Run both servers with one command**
   ```bash
   npm run dev:full
   ```
   
   **Option 2: Run servers separately**
   ```bash
   # Terminal 1 - Backend server
   npm run dev:server
   
   # Terminal 2 - Frontend server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📡 API Endpoints

### Tools
- `GET /api/tools` - Get all AI tools
- `GET /api/tools?category=Writing` - Filter tools by category

### Favorites
- `GET /api/favorites` - Get all favorite tools
- `POST /api/favorites` - Add a tool to favorites
  ```json
  {
    "toolId": 1
  }
  ```
- `DELETE /api/favorites/:id` - Remove a tool from favorites

## 🙏 Acknowledgments

- AI tools data curated from popular AI platforms
- Icons provided by Lucide React
- Styling powered by Tailwind CSS
- Confetti animations by react-confetti

---