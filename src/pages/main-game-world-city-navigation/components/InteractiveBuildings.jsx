import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const InteractiveBuildings = ({ 
  districts, 
  currentDistrict, 
  onBuildingClick, 
  timeOfDay 
}) => {
  const [pulsingBuildings, setPulsingBuildings] = useState(new Set());
  const [hoveredBuilding, setHoveredBuilding] = useState(null);

  // Building definitions with positions and interactions
  const buildingData = {
    'town-square': [
      {
        id: 'city-hall',
        name: 'Мэрия',
        icon: 'Building2',
        position: { x: 48, y: 45 },
        available: true,
        hasQuest: true,
        description: 'Административное здание города'
      },
      {
        id: 'fountain',
        name: 'Фонтан',
        icon: 'Waves',
        position: { x: 52, y: 55 },
        available: true,
        hasQuest: false,
        description: 'Центральный фонтан площади'
      },
      {
        id: 'notice-board',
        name: 'Доска объявлений',
        icon: 'FileText',
        position: { x: 55, y: 48 },
        available: true,
        hasQuest: true,
        description: 'Городские объявления и квесты'
      }
    ],
    'residential': [
      {
        id: 'houses',
        name: 'Жилые дома',
        icon: 'Home',
        position: { x: 25, y: 28 },
        available: true,
        hasQuest: false,
        description: 'Дома жителей Зооград'
      },
      {
        id: 'park',
        name: 'Парк',
        icon: 'Trees',
        position: { x: 22, y: 35 },
        available: true,
        hasQuest: true,
        description: 'Городской парк с цветами'
      },
      {
        id: 'playground',
        name: 'Детская площадка',
        icon: 'Gamepad2',
        position: { x: 28, y: 32 },
        available: timeOfDay !== 'night',
        hasQuest: false,
        description: 'Место для игр и отдыха'
      }
    ],
    'business': [
      {
        id: 'shops',
        name: 'Магазины',
        icon: 'Store',
        position: { x: 75, y: 28 },
        available: timeOfDay !== 'night',
        hasQuest: false,
        description: 'Торговые лавки и магазины'
      },
      {
        id: 'workshop',
        name: 'Мастерская',
        icon: 'Wrench',
        position: { x: 78, y: 32 },
        available: true,
        hasQuest: true,
        description: 'Ремонтная мастерская бобра'
      },
      {
        id: 'bank',
        name: 'Банк',
        icon: 'Landmark',
        position: { x: 72, y: 35 },
        available: timeOfDay === 'morning' || timeOfDay === 'afternoon',
        hasQuest: false,
        description: 'Городской банк'
      }
    ],
    'festival-grounds': [
      {
        id: 'stage',
        name: 'Сцена',
        icon: 'Music',
        position: { x: 48, y: 78 },
        available: true,
        hasQuest: true,
        description: 'Главная сцена фестиваля'
      },
      {
        id: 'food-stalls',
        name: 'Торговые палатки',
        icon: 'UtensilsCrossed',
        position: { x: 52, y: 82 },
        available: true,
        hasQuest: false,
        description: 'Палатки с едой и напитками'
      },
      {
        id: 'decoration-area',
        name: 'Зона украшений',
        icon: 'Sparkles',
        position: { x: 55, y: 78 },
        available: true,
        hasQuest: true,
        description: 'Место для фестивальных украшений'
      }
    ],
    'government': [
      {
        id: 'courthouse',
        name: 'Суд',
        icon: 'Scale',
        position: { x: 78, y: 68 },
        available: timeOfDay === 'morning' || timeOfDay === 'afternoon',
        hasQuest: false,
        description: 'Здание суда'
      },
      {
        id: 'police-station',
        name: 'Полицейский участок',
        icon: 'Shield',
        position: { x: 82, y: 72 },
        available: true,
        hasQuest: true,
        description: 'Участок городской полиции'
      },
      {
        id: 'fire-department',
        name: 'Пожарная часть',
        icon: 'Flame',
        position: { x: 85, y: 68 },
        available: true,
        hasQuest: false,
        description: 'Пожарная служба города'
      }
    ]
  };

  // Animate quest buildings
  useEffect(() => {
    const questBuildings = new Set();
    
    Object.values(buildingData).forEach(districtBuildings => {
      districtBuildings.forEach(building => {
        if (building.hasQuest && building.available) {
          questBuildings.add(building.id);
        }
      });
    });
    
    setPulsingBuildings(questBuildings);
  }, [timeOfDay]);

  // Handle building interaction
  const handleBuildingClick = (building) => {
    if (!building.available) return;
    onBuildingClick(building);
  };

  // Get current district buildings
  const currentBuildings = buildingData[currentDistrict] || [];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
      {/* Render buildings for current district */}
      {currentBuildings.map((building) => (
        <div
          key={building.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          style={{
            left: `${building.position.x}%`,
            top: `${building.position.y}%`
          }}
        >
          <button
            onClick={() => handleBuildingClick(building)}
            onMouseEnter={() => setHoveredBuilding(building)}
            onMouseLeave={() => setHoveredBuilding(null)}
            className={`relative w-10 h-10 rounded-lg shadow-warm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
              building.available 
                ? 'bg-surface hover:bg-surface-200 cursor-pointer' :'bg-gray-300 cursor-not-allowed opacity-50'
            } ${
              pulsingBuildings.has(building.id) ? 'animate-pulse-glow' : ''
            }`}
            disabled={!building.available}
            aria-label={`${building.name}: ${building.description}`}
            title={building.name}
          >
            <Icon 
              name={building.icon} 
              className={`w-5 h-5 mx-auto ${
                building.available ? 'text-text-primary' : 'text-gray-500'
              }`} 
            />
            
            {/* Quest indicator */}
            {building.hasQuest && building.available && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse">
                <div className="absolute inset-0 bg-accent rounded-full animate-ping"></div>
              </div>
            )}
            
            {/* Interaction hint */}
            {building.available && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-text-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap font-caption">
                  Нажмите E
                </div>
              </div>
            )}
          </button>
          
          {/* Building tooltip on hover */}
          {hoveredBuilding?.id === building.id && (
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
              <div className="bg-surface border border-border rounded-lg shadow-warm-lg p-3 max-w-48">
                <h4 className="font-caption font-medium text-text-primary mb-1">
                  {building.name}
                </h4>
                <p className="text-xs text-text-secondary">
                  {building.description}
                </p>
                {building.hasQuest && (
                  <div className="flex items-center mt-2 text-xs text-accent">
                    <Icon name="Target" className="w-3 h-3 mr-1" />
                    <span>Доступен квест</span>
                  </div>
                )}
                {!building.available && (
                  <div className="flex items-center mt-2 text-xs text-error">
                    <Icon name="Clock" className="w-3 h-3 mr-1" />
                    <span>Закрыто</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Special effects for certain buildings */}
      {currentDistrict === 'festival-grounds' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Festival lights */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
              style={{
                left: `${45 + Math.random() * 15}%`,
                top: `${75 + Math.random() * 10}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      )}
      
      {/* Construction effects for workshop */}
      {currentDistrict === 'business' && timeOfDay === 'morning' && (
        <div className="absolute" style={{ left: '78%', top: '32%' }}>
          <div className="animate-bounce">
            <Icon name="Hammer" className="w-3 h-3 text-warning" />
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveBuildings;