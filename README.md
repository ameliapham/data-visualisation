![Screenshot 2025-06-06 at 04 23 31](https://github.com/user-attachments/assets/383424ac-8728-4034-9ec6-9872c1216038)

![React](https://img.shields.io/badge/React-18.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![Three.js](https://img.shields.io/badge/Three.js-Latest-green)

# Entertainment Evolution Visualization
A beautiful 3D data visualization project built with React Three Fiber that displays the evolution of entertainment consumption across different countries and years.

**Live Demo:** [Experience it here](https://amelia-data-visualisation.vercel.app/)

## ✨ Key Features
- **Interactive 3D Visualization** - Explore data in immersive 3D space
- **Country Selection** - Filter data by different countries
- **Timeline View** - See entertainment evolution over years
- **Water Effect** - Liquid-like visualization for data representation
- **Smooth Controls** - Camera controls with damping and shake effects
- **Performance Optimized** - Smooth 60fps rendering

## 🛠️ Technical Stack
- **Frontend Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js + React Three Fiber
- **3D Components**: React Three Drei
- **UI Library**: Material-UI (MUI)
- **Styling**: TSS-React with MUI
- **State Management**: Custom hooks
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 🚀 Getting Started

### Prerequisites
- Node.js ≥18.0.0
- Yarn package manager

### Installation  
`yarn install`

### Development  
`yarn dev`

### Build for Production  
`yarn build`

## 🎨 How It Works

### Data Visualization Concept

The project visualizes entertainment data through:

- **Glass Cubes**: Transparent containers representing time periods
- **Water Levels**: Liquid effects showing data proportions
  - 🔵 **Blue Water**: Non-screen entertainment percentage
  - 🩷 **Pink Water**: Screen-based entertainment percentage
- **Timeline Layout**: Cubes arranged chronologically
- **3D Environment**: Immersive space with proper lighting and shadows

### Key Components

1. **Cube Component**: Creates transparent glass containers
2. **Water Component**: Renders liquid levels based on data percentages
3. **Controls Component**: Provides country selection and legend
4. **Camera System**: Smooth navigation with orbit controls and camera shake

## 📖 Learning Resources
- [Three.js Documentation](https://threejs.org/docs/)
- Simon's course ThreeJS
- [React Three Fiber Documentation](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [React Three Drei Components](https://github.com/pmndrs/drei)

## 👨‍💻 Author
### Amélia Pham (Huong)

- [GitHub](https://github.com/ameliapham)
- [Email](pham@ameliart.fr)
