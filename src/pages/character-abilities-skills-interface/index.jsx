import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import GameTabNavigation from 'components/ui/GameTabNavigation';
import CharacterPortrait from './components/CharacterPortrait';
import AbilityCard from './components/AbilityCard';
import SkillTree from './components/SkillTree';
import PracticeMode from './components/PracticeMode';

const CharacterAbilitiesSkillsInterface = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState('beaver');
  const [activeTab, setActiveTab] = useState('abilities');
  const [practiceMode, setPracticeMode] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState(null);

  const characters = [
    {
      id: 'beaver',
      name: 'Борис Бобров',
      profession: 'Инженер-строитель',
      avatar: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=face',
      background: 'construction',
      level: 8,
      experience: 2450,
      nextLevelExp: 3000,
      description: `Опытный строитель с природным талантом к возведению прочных конструкций. Борис может быстро оценить структурную целостность зданий и создать временные укрепления из подручных материалов.
Его зубы постоянно растут, что делает его идеальным для работы с деревом.`
    },
    {
      id: 'chameleon',
      name: 'Хамелеон Хамелеонов',
      profession: 'Мастер маскировки',
      avatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=face',
      background: 'stealth',
      level: 6,
      experience: 1800,
      nextLevelExp: 2500,
      description: `Эксперт по скрытности и наблюдению. Может изменять цвет кожи для идеальной маскировки в любой среде. Его независимо движущиеся глаза позволяют следить за несколькими целями одновременно.
Эмоциональное состояние отражается в цветовых изменениях.`
    },
    {
      id: 'owl',
      name: 'Сова Совова',
      profession: 'Ночной детектив',
      avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=face',
      background: 'detective',
      level: 9,
      experience: 3200,
      nextLevelExp: 4000,
      description: `Мудрый детектив с исключительным ночным зрением и острым слухом. Может поворачивать голову на 270 градусов для полного обзора места происшествия.
Специализируется на расследовании сложных дел в темное время суток.`
    },
    {
      id: 'fox',
      name: 'Лиса Лисицына',
      profession: 'Следователь',
      avatar: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&h=400&fit=crop&crop=face',
      background: 'investigation',
      level: 7,
      experience: 2100,
      nextLevelExp: 2800,
      description: `Хитрая и умная следователь с отличным обонянием для поиска улик. Может проследить запаховые следы даже через несколько дней после события.
Обладает природной способностью к дедукции и анализу.`
    }
  ];

  const abilities = {
    beaver: [
      {
        id: 'construction',
        name: 'Быстрое строительство',
        description: 'Возводит временные конструкции из доступных материалов за короткое время',
        icon: 'Hammer',
        level: 3,
        maxLevel: 5,
        cooldown: 300,
        requirements: 'Деревянные материалы',
        effectiveness: 85,
        unlocked: true,
        usage: `Используйте эту способность для:
• Ремонта поврежденных мостов и зданий
• Создания временных укрытий
• Строительства сценических конструкций для фестиваля`
      },
      {
        id: 'wood_analysis',
        name: 'Анализ древесины',
        description: 'Определяет качество и прочность деревянных конструкций одним взглядом',
        icon: 'Search',
        level: 2,
        maxLevel: 3,
        cooldown: 60,
        requirements: 'Деревянные объекты',
        effectiveness: 90,
        unlocked: true,
        usage: `Полезно для:
• Оценки безопасности старых зданий
• Выбора лучших материалов для строительства
• Обнаружения скрытых дефектов в конструкциях`
      },
      {
        id: 'dam_building',
        name: 'Строительство плотин',
        description: 'Создает водные заграждения для управления потоками воды',
        icon: 'Waves',
        level: 1,
        maxLevel: 4,
        cooldown: 600,
        requirements: 'Доступ к воде, строительные материалы',
        effectiveness: 70,
        unlocked: false,
        usage: `Мастерская способность для:
• Предотвращения наводнений
• Создания водных препятствий
• Управления ирригационными системами`
      }
    ],
    chameleon: [
      {
        id: 'camouflage',
        name: 'Идеальная маскировка',
        description: 'Становится практически невидимым, сливаясь с окружающей средой',
        icon: 'Eye',
        level: 4,
        maxLevel: 5,
        cooldown: 180,
        requirements: 'Статичное положение',
        effectiveness: 95,
        unlocked: true,
        usage: `Используйте для:
• Скрытного наблюдения за подозрительными персонажами
• Избегания конфликтных ситуаций
• Получения секретной информации`
      },
      {
        id: 'emotion_reading',
        name: 'Чтение эмоций',
        description: 'Изменение цвета кожи отражает эмоциональное состояние окружающих',
        icon: 'Heart',
        level: 3,
        maxLevel: 4,
        cooldown: 120,
        requirements: 'Близкий контакт с персонажем',
        effectiveness: 80,
        unlocked: true,
        usage: `Помогает в:
• Определении лжи во время допросов
• Понимании истинных намерений персонажей
• Разрешении конфликтов между жителями`
      },
      {
        id: 'independent_vision',
        name: 'Независимое зрение',
        description: 'Каждый глаз может фокусироваться на разных объектах одновременно',
        icon: 'Focus',
        level: 2,
        maxLevel: 3,
        cooldown: 90,
        requirements: 'Открытое пространство',
        effectiveness: 75,
        unlocked: false,
        usage: `Идеально для:
• Одновременного наблюдения за несколькими подозреваемыми
• Контроля периметра во время операций
• Поиска скрытых предметов в сложных локациях`
      }
    ],
    owl: [
      {
        id: 'night_vision',
        name: 'Ночное зрение',
        description: 'Видит в полной темноте как днем, обнаруживает мельчайшие детали',
        icon: 'Moon',
        level: 5,
        maxLevel: 5,
        cooldown: 0,
        requirements: 'Темное время суток',
        effectiveness: 100,
        unlocked: true,
        usage: `Незаменимо для:
• Ночных расследований и патрулирования
• Поиска улик в темных помещениях
• Обнаружения ночной активности подозрительных персонажей`
      },
      {
        id: 'enhanced_hearing',
        name: 'Острый слух',
        description: 'Слышит звуки на большом расстоянии и определяет их источник',
        icon: 'Ear',
        level: 4,
        maxLevel: 5,
        cooldown: 60,
        requirements: 'Тихая обстановка',
        effectiveness: 90,
        unlocked: true,
        usage: `Используйте для:
• Подслушивания важных разговоров
• Обнаружения скрытых механизмов и ловушек
• Отслеживания движения в соседних помещениях`
      },
      {
        id: 'head_rotation',
        name: 'Поворот головы на 270°',
        description: 'Поворачивает голову почти на полный круг для полного обзора',
        icon: 'RotateCcw',
        level: 3,
        maxLevel: 4,
        cooldown: 30,
        requirements: 'Свободное пространство вокруг',
        effectiveness: 85,
        unlocked: true,
        usage: `Полезно для:
• Осмотра места происшествия без изменения позиции
• Наблюдения за несколькими направлениями одновременно
• Обнаружения засад и скрытых угроз`
      }
    ],
    fox: [
      {
        id: 'scent_tracking',
        name: 'Следование по запаху',
        description: 'Отслеживает запаховые следы даже через несколько дней',
        icon: 'Navigation',
        level: 4,
        maxLevel: 5,
        cooldown: 240,
        requirements: 'Свежий запаховый след',
        effectiveness: 88,
        unlocked: true,
        usage: `Используйте для:
• Поиска пропавших предметов и персонажей
• Отслеживания подозреваемых по городу
• Обнаружения скрытых тайников и секретных проходов`
      },
      {
        id: 'deduction',
        name: 'Дедуктивное мышление',
        description: 'Быстро анализирует улики и делает логические выводы',
        icon: 'Brain',
        level: 3,
        maxLevel: 4,
        cooldown: 180,
        requirements: 'Достаточное количество улик',
        effectiveness: 82,
        unlocked: true,
        usage: `Помогает в:
• Решении сложных головоломок и загадок
• Связывании разрозненных фактов в единую картину
• Предсказании действий подозреваемых`
      },
      {
        id: 'social_manipulation',
        name: 'Социальная хитрость',
        description: 'Умело манипулирует разговором для получения нужной информации',
        icon: 'MessageCircle',
        level: 2,
        maxLevel: 3,
        cooldown: 300,
        requirements: 'Диалог с персонажем',
        effectiveness: 75,
        unlocked: false,
        usage: `Эффективно для:
• Получения секретной информации от свидетелей
• Разоблачения лжи и противоречий в показаниях
• Убеждения персонажей в сотрудничестве`
      }
    ]
  };

  const skillTrees = {
    beaver: {
      name: 'Мастер строительства',
      branches: [
        {
          name: 'Деревообработка',
          skills: ['wood_analysis', 'construction', 'advanced_carpentry']
        },
        {
          name: 'Гидротехника',
          skills: ['dam_building', 'water_management', 'flood_control']
        }
      ]
    },
    chameleon: {
      name: 'Искусство маскировки',
      branches: [
        {
          name: 'Скрытность',
          skills: ['camouflage', 'stealth_movement', 'shadow_blend']
        },
        {
          name: 'Восприятие',
          skills: ['emotion_reading', 'independent_vision', 'aura_detection']
        }
      ]
    },
    owl: {
      name: 'Ночной страж',
      branches: [
        {
          name: 'Сенсорика',
          skills: ['night_vision', 'enhanced_hearing', 'motion_detection']
        },
        {
          name: 'Наблюдение',
          skills: ['head_rotation', 'aerial_view', 'pattern_recognition']
        }
      ]
    },
    fox: {
      name: 'Детектив-следопыт',
      branches: [
        {
          name: 'Расследование',
          skills: ['scent_tracking', 'deduction', 'evidence_analysis']
        },
        {
          name: 'Социальные навыки',
          skills: ['social_manipulation', 'interrogation', 'network_building']
        }
      ]
    }
  };

  const currentCharacter = characters.find(char => char.id === selectedCharacter);
  const currentAbilities = abilities[selectedCharacter] || [];
  const currentSkillTree = skillTrees[selectedCharacter];

  const handleCharacterSelect = (characterId) => {
    setSelectedCharacter(characterId);
    setSelectedAbility(null);
  };

  const handleAbilitySelect = (ability) => {
    setSelectedAbility(ability);
  };

  const handlePracticeMode = (ability) => {
    setSelectedAbility(ability);
    setPracticeMode(true);
  };

  const tabs = [
    { id: 'abilities', name: 'Способности', icon: 'Zap' },
    { id: 'skills', name: 'Навыки', icon: 'TreePine' },
    { id: 'combinations', name: 'Комбинации', icon: 'Link' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <GameTabNavigation />
      
      {/* Main Content */}
      <div className="lg:ml-60 pb-20 lg:pb-4">
        {/* Header */}
        <div className="bg-surface border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                Способности персонажей
              </h1>
              <p className="text-text-secondary font-body mt-1">
                Изучайте и развивайте уникальные навыки животных-профессионалов
              </p>
            </div>
            
            <button
              onClick={() => setPracticeMode(!practiceMode)}
              className={`btn-secondary ${practiceMode ? 'bg-accent hover:bg-accent-600' : ''}`}
            >
              <Icon name="Play" className="w-4 h-4 mr-2" />
              {practiceMode ? 'Выйти из тренировки' : 'Режим тренировки'}
            </button>
          </div>
        </div>

        {/* Character Selection */}
        <div className="p-4 lg:p-6 border-b border-border bg-surface-50">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {characters.map((character) => (
              <button
                key={character.id}
                onClick={() => handleCharacterSelect(character.id)}
                className={`flex-shrink-0 p-3 rounded-lg border transition-all duration-200 ${
                  selectedCharacter === character.id
                    ? 'border-primary bg-primary-50 shadow-warm'
                    : 'border-border bg-surface hover:border-primary-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={character.avatar}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-caption font-medium text-text-primary">
                      {character.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {character.profession}
                    </p>
                    <p className="text-xs text-secondary">
                      Уровень {character.level}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Character Portrait */}
        <CharacterPortrait character={currentCharacter} />

        {/* Tab Navigation */}
        <div className="border-b border-border bg-surface">
          <div className="flex space-x-1 p-4 lg:p-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-caption font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface-200'
                }`}
              >
                <Icon name={tab.icon} className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          {activeTab === 'abilities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAbilities.map((ability) => (
                <AbilityCard
                  key={ability.id}
                  ability={ability}
                  onSelect={handleAbilitySelect}
                  onPractice={handlePracticeMode}
                  isSelected={selectedAbility?.id === ability.id}
                />
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <SkillTree
              skillTree={currentSkillTree}
              abilities={currentAbilities}
              character={currentCharacter}
            />
          )}

          {activeTab === 'combinations' && (
            <div className="space-y-6">
              <div className="bg-surface rounded-lg p-6 border border-border">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">
                  Комбинации способностей
                </h3>
                <p className="text-text-secondary font-body mb-6">
                  Некоторые задачи требуют совместного использования способностей разных персонажей
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Hammer" className="w-5 h-5 text-primary" />
                      <Icon name="Plus" className="w-3 h-3 text-text-secondary" />
                      <Icon name="Eye" className="w-5 h-5 text-secondary" />
                      <span className="font-caption font-medium text-text-primary ml-2">
                        Скрытое строительство
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Бобр + Хамелеон: Строительство конструкций незаметно для окружающих
                    </p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-4 border border-border">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="Moon" className="w-5 h-5 text-primary" />
                      <Icon name="Plus" className="w-3 h-3 text-text-secondary" />
                      <Icon name="Navigation" className="w-5 h-5 text-secondary" />
                      <span className="font-caption font-medium text-text-primary ml-2">
                        Ночное расследование
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Сова + Лиса: Идеальная комбинация для ночных операций
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Practice Mode Modal */}
        {practiceMode && selectedAbility && (
          <PracticeMode
            ability={selectedAbility}
            character={currentCharacter}
            onClose={() => setPracticeMode(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterAbilitiesSkillsInterface;