import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import CharacterCard from './components/CharacterCard';
import GameLogo from './components/GameLogo';
import ActionButtons from './components/ActionButtons';
import SettingsPanel from './components/SettingsPanel';

const GameStartCharacterSelection = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCharacterIntro, setShowCharacterIntro] = useState(false);

  // Mock character data
  const characters = [
    {
      id: 1,
      name: "Хамелеон Хома",
      profession: "Детектив",
      ability: "Маскировка",
      description: "Может становиться невидимым для расследования дел",
      avatar: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=face",
      color: "#22C55E",
      personality: "Осторожный и наблюдательный",
      voicePattern: "Говорит тихо и загадочно"
    },
    {
      id: 2,
      name: "Бобр Борис",
      profession: "Строитель",
      ability: "Строительство",
      description: "Мастер по ремонту и строительству",
      avatar: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop&crop=face",
      color: "#8B4513",
      personality: "Трудолюбивый и надежный",
      voicePattern: "Говорит четко и по делу"
    },
    {
      id: 3,
      name: "Сова София",
      profession: "Библиотекарь",
      ability: "Ночное зрение",
      description: "Видит в темноте и знает все секреты",
      avatar: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop&crop=face",
      color: "#6366F1",
      personality: "Мудрая и терпеливая",
      voicePattern: "Говорит медленно и обдуманно"
    },
    {
      id: 4,
      name: "Лиса Лариса",
      profession: "Почтальон",
      ability: "Быстрый бег",
      description: "Самая быстрая доставка в городе",
      avatar: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=400&fit=crop&crop=face",
      color: "#F97316",
      personality: "Энергичная и дружелюбная",
      voicePattern: "Говорит быстро и весело"
    },
    {
      id: 5,
      name: "Медведь Михаил",
      profession: "Повар",
      ability: "Супер-сила",
      description: "Готовит лучшие блюда и поднимает тяжести",
      avatar: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop&crop=face",
      color: "#DC2626",
      personality: "Добрый и гостеприимный",
      voicePattern: "Говорит громко и сердечно"
    },
    {
      id: 6,
      name: "Кот Константин",
      profession: "Музыкант",
      ability: "Супер-слух",
      description: "Слышит самые тихие звуки и играет на всех инструментах",
      avatar: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face",
      color: "#8B5CF6",
      personality: "Артистичный и чувствительный",
      voicePattern: "Говорит мелодично"
    },
    {
      id: 7,
      name: "Заяц Захар",
      profession: "Курьер",
      ability: "Прыжки",
      description: "Прыгает выше всех и доставляет срочные посылки",
      avatar: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop&crop=face",
      color: "#10B981",
      personality: "Нервный но надежный",
      voicePattern: "Говорит быстро и заикается"
    },
    {
      id: 8,
      name: "Слон Семен",
      profession: "Мэр",
      ability: "Память",
      description: "Помнит все и управляет городом",
      avatar: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=400&fit=crop&crop=face",
      color: "#6B7280",
      personality: "Мудрый и справедливый",
      voicePattern: "Говорит торжественно"
    }
  ];

  // Check for saved game
  useEffect(() => {
    const savedGame = localStorage.getItem('zoograd-save');
    if (savedGame) {
      try {
        setGameState(JSON.parse(savedGame));
      } catch (error) {
        console.error('Error loading saved game:', error);
      }
    }
  }, []);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setShowCharacterIntro(true);
    
    // Play character intro animation
    setTimeout(() => {
      setShowCharacterIntro(false);
    }, 3000);
  };

  const handleStartNewGame = () => {
    if (!selectedCharacter) {
      alert('Пожалуйста, выберите персонажа!');
      return;
    }

    setIsLoading(true);
    
    // Create new game state
    const newGameState = {
      selectedCharacter,
      startTime: new Date().toISOString(),
      progress: {
        level: 1,
        experience: 0,
        completedQuests: [],
        inventory: [],
        relationships: {}
      }
    };

    // Save game state
    localStorage.setItem('zoograd-save', JSON.stringify(newGameState));

    setTimeout(() => {
      navigate('/main-game-world-city-navigation');
    }, 2000);
  };

  const handleContinueGame = () => {
    if (!gameState) return;
    
    setIsLoading(true);
    setTimeout(() => {
      navigate('/main-game-world-city-navigation');
    }, 1000);
  };

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-200 to-background-300 relative overflow-hidden">
      {/* Background Cityscape */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary-200 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-16 h-32 bg-primary-300 rounded-t-lg transform -skew-x-12"></div>
        <div className="absolute bottom-0 left-1/2 w-20 h-40 bg-secondary-300 rounded-t-lg"></div>
        <div className="absolute bottom-0 right-1/4 w-12 h-28 bg-accent-300 rounded-t-lg transform skew-x-12"></div>
      </div>

      {/* Settings Button */}
      <button
        onClick={handleSettings}
        className="absolute top-4 right-4 z-20 p-3 bg-surface rounded-full shadow-warm hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
        aria-label="Настройки"
      >
        <Icon name="Settings" className="w-6 h-6 text-text-secondary" />
      </button>

      {/* Language Selector */}
      <div className="absolute top-4 left-4 z-20">
        <select className="bg-surface border border-border rounded-lg px-3 py-2 text-sm font-caption focus:outline-none focus:ring-2 focus:ring-primary-300">
          <option value="ru">🇷🇺 Русский</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Game Logo */}
        <div className="pt-8 pb-4">
          <GameLogo />
        </div>

        {/* Character Selection */}
        <div className="flex-1 px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-center text-primary mb-2">
              Выберите своего спутника
            </h2>
            <p className="text-center text-text-secondary font-body mb-8">
              Каждый персонаж обладает уникальными способностями для решения задач в Зооград
            </p>

            {/* Character Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-8">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacter?.id === character.id}
                  onSelect={handleCharacterSelect}
                />
              ))}
            </div>

            {/* Selected Character Details */}
            {selectedCharacter && (
              <div className="bg-surface rounded-xl shadow-warm-lg border border-border p-6 mb-8 animate-fade-in">
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-warm">
                    <Image
                      src={selectedCharacter.avatar}
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="font-heading text-xl font-bold text-primary mb-2">
                      {selectedCharacter.name}
                    </h3>
                    <p className="text-secondary font-caption font-medium mb-2">
                      {selectedCharacter.profession} • {selectedCharacter.ability}
                    </p>
                    <p className="text-text-secondary font-body mb-2">
                      {selectedCharacter.description}
                    </p>
                    <div className="text-sm text-text-secondary">
                      <p><strong>Характер:</strong> {selectedCharacter.personality}</p>
                      <p><strong>Речь:</strong> {selectedCharacter.voicePattern}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pb-8 safe-area-bottom">
          <ActionButtons
            selectedCharacter={selectedCharacter}
            hasGameState={!!gameState}
            isLoading={isLoading}
            onStartNewGame={handleStartNewGame}
            onContinueGame={handleContinueGame}
          />
        </div>
      </div>

      {/* Character Intro Modal */}
      {showCharacterIntro && selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl shadow-warm-xl border border-border p-8 max-w-md w-full text-center animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-warm-lg">
              <Image
                src={selectedCharacter.avatar}
                alt={selectedCharacter.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">
              {selectedCharacter.name}
            </h3>
            <p className="text-text-primary font-body mb-4">
              "Привет! Я {selectedCharacter.name}, {selectedCharacter.profession.toLowerCase()} Зооград. 
              Моя особая способность - {selectedCharacter.ability.toLowerCase()}. 
              Вместе мы спасем фестиваль!"
            </p>
            <div className="flex justify-center">
              <div className="animate-pulse">
                <Icon name="Volume2" className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 animate-spin">
              <Icon name="Loader" className="w-full h-full text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold text-primary mb-2">
              Загрузка приключения...
            </h3>
            <p className="text-text-secondary font-body">
              Подготавливаем мир Зооград для вас
            </p>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel onClose={handleCloseSettings} />
      )}
    </div>
  );
};

export default GameStartCharacterSelection;