import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import GameTabNavigation from 'components/ui/GameTabNavigation';
import WorldNavigationOverlay from 'components/ui/WorldNavigationOverlay';
import QuestProgressIndicator from 'components/ui/QuestProgressIndicator';
import CityMap from './components/CityMap';
import InteractiveBuildings from './components/InteractiveBuildings';
import NPCCharacters from './components/NPCCharacters';
import WeatherSystem from './components/WeatherSystem';

const MainGameWorldCityNavigation = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  
  // Game state
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [currentDistrict, setCurrentDistrict] = useState('town-square');
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [weatherCondition, setWeatherCondition] = useState('sunny');
  const [isMoving, setIsMoving] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [festivalCountdown, setFestivalCountdown] = useState(72);
  const [gameState, setGameState] = useState({
    playerLevel: 5,
    currentHealth: 85,
    currentEnergy: 70,
    currentMood: 'happy'
  });

  // Character data
  const characterData = {
    name: "Алекс Лисенок",
    species: "Лиса",
    profession: "Исследователь",
    level: 5,
    abilities: ["Быстрое передвижение", "Острый нюх", "Ловкость"],
    avatar: "https://images.unsplash.com/photo-1554456854-55a089fd4cb2?w=100&h=100&fit=crop&crop=face"
  };

  // Districts data
  const districts = [
    {
      id: 'town-square',
      name: 'Городская площадь',
      description: 'Центр города с фонтаном и главными зданиями',
      position: { x: 50, y: 50 },
      buildings: ['city-hall', 'fountain', 'notice-board'],
      npcs: ['mayor-bear', 'postman-rabbit'],
      available: true
    },
    {
      id: 'residential',
      name: 'Жилой район',
      description: 'Уютные домики жителей Зооград',
      position: { x: 25, y: 30 },
      buildings: ['houses', 'park', 'playground'],
      npcs: ['teacher-owl', 'baker-hedgehog'],
      available: true
    },
    {
      id: 'business',
      name: 'Деловой район',
      description: 'Офисы, магазины и мастерские',
      position: { x: 75, y: 30 },
      buildings: ['shops', 'workshop', 'bank'],
      npcs: ['mechanic-beaver', 'shopkeeper-cat'],
      available: true
    },
    {
      id: 'festival-grounds',
      name: 'Фестивальная площадка',
      description: 'Место проведения ежегодного фестиваля',
      position: { x: 50, y: 80 },
      buildings: ['stage', 'food-stalls', 'decoration-area'],
      npcs: ['organizer-elephant', 'musician-bird'],
      available: festivalCountdown > 0
    },
    {
      id: 'government',
      name: 'Правительственный район',
      description: 'Административные здания и службы',
      position: { x: 80, y: 70 },
      buildings: ['courthouse', 'police-station', 'fire-department'],
      npcs: ['judge-lion', 'chief-dog'],
      available: gameState.playerLevel >= 3
    }
  ];

  // Active quests
  const activeQuests = [
    {
      id: 1,
      title: "Найти фестивальный баннер",
      description: "Разыскать пропавший баннер в старом складе",
      priority: "high",
      progress: 60,
      timeRemaining: "2 часа",
      reward: "50 золота, Фестивальный жетон",
      category: "main",
      location: 'business'
    },
    {
      id: 2,
      title: "Собрать декоративные цветы",
      description: "Найти 10 полевых цветов для украшения фестиваля",
      priority: "medium",
      progress: 30,
      timeRemaining: "6 часов",
      reward: "25 золота, Материалы для крафта",
      category: "side",
      location: 'residential'
    }
  ];

  // Handle map click/tap
  const handleMapClick = (event) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    // Find nearest district
    const nearestDistrict = districts.reduce((nearest, district) => {
      const distance = Math.sqrt(
        Math.pow(district.position.x - x, 2) + Math.pow(district.position.y - y, 2)
      );
      return distance < nearest.distance ? { ...district, distance } : nearest;
    }, { distance: Infinity });
    
    if (nearestDistrict.distance < 15 && nearestDistrict.available) {
      moveToPosition(nearestDistrict.position.x, nearestDistrict.position.y);
      setCurrentDistrict(nearestDistrict.id);
    }
  };

  // Move player to position
  const moveToPosition = (x, y) => {
    setIsMoving(true);
    
    // Animate movement
    const startX = playerPosition.x;
    const startY = playerPosition.y;
    const duration = 1000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentX = startX + (x - startX) * progress;
      const currentY = startY + (y - startY) * progress;
      
      setPlayerPosition({ x: currentX, y: currentY });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsMoving(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Handle character interaction
  const handleCharacterInteraction = (character) => {
    setSelectedCharacter(character);
    navigate('/character-interaction-dialogue-system', { 
      state: { character, currentLocation: currentDistrict } 
    });
  };

  // Handle building interaction
  const handleBuildingInteraction = (building) => {
    console.log('Interacting with building:', building);
    // Could open specific building interfaces or mini-games
  };

  // Handle quest click
  const handleQuestClick = (quest) => {
    if (quest.action === 'viewAll') {
      navigate('/quest-task-management-hub');
    } else if (quest.action === 'trackNearest') {
      const questDistrict = districts.find(d => d.id === quest.location);
      if (questDistrict) {
        moveToPosition(questDistrict.position.x, questDistrict.position.y);
        setCurrentDistrict(questDistrict.id);
      }
    } else if (quest.location) {
      const questDistrict = districts.find(d => d.id === quest.location);
      if (questDistrict) {
        moveToPosition(questDistrict.position.x, questDistrict.position.y);
        setCurrentDistrict(questDistrict.id);
      }
    }
  };

  // Time progression
  useEffect(() => {
    const timeProgression = ['morning', 'afternoon', 'evening', 'night'];
    let currentIndex = timeProgression.indexOf(timeOfDay);
    
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % timeProgression.length;
      setTimeOfDay(timeProgression[currentIndex]);
    }, 120000); // 2 minutes per time period

    return () => clearInterval(timer);
  }, [timeOfDay]);

  // Festival countdown
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setFestivalCountdown(prev => Math.max(prev - 1, 0));
    }, 60000); // Decrease every minute

    return () => clearInterval(countdownTimer);
  }, []);

  // Weather changes
  useEffect(() => {
    const weatherOptions = ['sunny', 'cloudy', 'rainy', 'foggy'];
    const weatherTimer = setInterval(() => {
      const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setWeatherCondition(randomWeather);
    }, 300000); // Change every 5 minutes

    return () => clearInterval(weatherTimer);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isMoving) return;
      
      const moveDistance = 5;
      let newX = playerPosition.x;
      let newY = playerPosition.y;
      
      switch (event.key.toLowerCase()) {
        case 'w': case'arrowup':
          newY = Math.max(0, newY - moveDistance);
          break;
        case 's': case'arrowdown':
          newY = Math.min(100, newY + moveDistance);
          break;
        case 'a': case'arrowleft':
          newX = Math.max(0, newX - moveDistance);
          break;
        case 'd': case'arrowright':
          newX = Math.min(100, newX + moveDistance);
          break;
        case 'e':
          // Interact with nearest object
          console.log('Interaction key pressed');
          break;
        case 'm':
          // Toggle mini-map
          console.log('Mini-map toggle');
          break;
      }
      
      if (newX !== playerPosition.x || newY !== playerPosition.y) {
        moveToPosition(newX, newY);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPosition, isMoving]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Main Game World Container */}
      <div className="relative w-full h-screen lg:ml-60">
        {/* City Map */}
        <div 
          ref={mapRef}
          className="absolute inset-0 cursor-pointer select-none"
          onClick={handleMapClick}
          style={{
            background: `linear-gradient(135deg, 
              var(--color-background) 0%, 
              var(--color-surface) 50%, 
              var(--color-background-200) 100%)`
          }}
        >
          {/* Weather System */}
          <WeatherSystem 
            condition={weatherCondition} 
            timeOfDay={timeOfDay}
          />
          
          {/* City Map Component */}
          <CityMap 
            districts={districts}
            currentDistrict={currentDistrict}
            playerPosition={playerPosition}
            timeOfDay={timeOfDay}
            weatherCondition={weatherCondition}
          />
          
          {/* Interactive Buildings */}
          <InteractiveBuildings 
            districts={districts}
            currentDistrict={currentDistrict}
            onBuildingClick={handleBuildingInteraction}
            timeOfDay={timeOfDay}
          />
          
          {/* NPC Characters */}
          <NPCCharacters 
            districts={districts}
            currentDistrict={currentDistrict}
            onCharacterClick={handleCharacterInteraction}
            timeOfDay={timeOfDay}
          />
          
          {/* Player Character */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-natural z-20"
            style={{
              left: `${playerPosition.x}%`,
              top: `${playerPosition.y}%`
            }}
          >
            <div className={`relative ${isMoving ? 'animate-bounce' : ''}`}>
              <div className="w-12 h-12 bg-accent rounded-full shadow-warm-lg flex items-center justify-center border-2 border-white">
                <Icon name="User" className="w-6 h-6 text-white" />
              </div>
              {/* Player name tag */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs font-caption font-medium text-text-primary shadow-warm whitespace-nowrap">
                {characterData.name}
              </div>
              {/* Movement indicator */}
              {isMoving && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* District Labels */}
          {districts.map((district) => (
            <div
              key={district.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${district.position.x}%`,
                top: `${district.position.y - 15}%`
              }}
            >
              <div className={`px-3 py-1 rounded-full text-xs font-caption font-medium shadow-warm ${
                currentDistrict === district.id 
                  ? 'bg-primary text-white' :'bg-surface text-text-primary'
              } ${!district.available ? 'opacity-50' : ''}`}>
                {district.name}
              </div>
            </div>
          ))}
        </div>
        
        {/* World Navigation Overlay */}
        <WorldNavigationOverlay 
          gameState={gameState}
          characterData={characterData}
        />
        
        {/* Quest Progress Indicator */}
        <QuestProgressIndicator 
          activeQuests={activeQuests}
          festivalCountdown={festivalCountdown}
          onQuestClick={handleQuestClick}
        />
        
        {/* Festival Countdown Banner */}
        {festivalCountdown <= 24 && festivalCountdown > 0 && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-100 pointer-events-none">
            <div className="bg-accent text-white px-6 py-3 rounded-lg shadow-warm-lg animate-pulse-glow">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" className="w-5 h-5" />
                <span className="font-heading font-bold">
                  Фестиваль через {festivalCountdown} часов!
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* Interaction Hints */}
        <div className="fixed bottom-32 lg:bottom-8 left-4 z-90 pointer-events-none">
          <div className="bg-surface bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-warm border border-border">
            <div className="space-y-1 text-xs font-caption text-text-secondary">
              <p><kbd className="px-1 py-0.5 bg-background rounded text-text-primary">WASD</kbd> или стрелки - движение</p>
              <p><kbd className="px-1 py-0.5 bg-background rounded text-text-primary">E</kbd> - взаимодействие</p>
              <p><kbd className="px-1 py-0.5 bg-background rounded text-text-primary">M</kbd> - мини-карта</p>
              <p>Нажмите на карту для быстрого перемещения</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Game Tab Navigation */}
      <GameTabNavigation />
    </div>
  );
};

export default MainGameWorldCityNavigation;