import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const NPCCharacters = ({ 
  districts, 
  currentDistrict, 
  onCharacterClick, 
  timeOfDay 
}) => {
  const [characterPositions, setCharacterPositions] = useState({});
  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  // NPC character data
  const npcData = {
    'mayor-bear': {
      id: 'mayor-bear',
      name: 'Мэр Михаил Медведев',
      species: 'Медведь',
      profession: 'Мэр города',
      avatar: 'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?w=100&h=100&fit=crop',
      personality: 'Серьезный, ответственный',
      schedule: {
        morning: { district: 'town-square', position: { x: 48, y: 45 } },
        afternoon: { district: 'town-square', position: { x: 50, y: 47 } },
        evening: { district: 'residential', position: { x: 25, y: 30 } },
        night: { district: 'residential', position: { x: 25, y: 30 } }
      },
      hasQuest: true,
      questPriority: 'high',
      mood: 'concerned',
      dialogue: 'Нам срочно нужна помощь с подготовкой к фестивалю!'
    },
    'postman-rabbit': {
      id: 'postman-rabbit',
      name: 'Почтальон Петр Кроликов',
      species: 'Кролик',
      profession: 'Почтальон',
      avatar: 'https://images.pixabay.com/photo/2016/03/28/12/35/rabbit-1285540_960_720.jpg',
      personality: 'Быстрый, энергичный',
      schedule: {
        morning: { district: 'town-square', position: { x: 52, y: 48 } },
        afternoon: { district: 'business', position: { x: 75, y: 30 } },
        evening: { district: 'residential', position: { x: 28, y: 32 } },
        night: { district: 'residential', position: { x: 22, y: 35 } }
      },
      hasQuest: true,
      questPriority: 'medium',
      mood: 'hurried',
      dialogue: 'У меня есть важные письма для доставки!'
    },
    'teacher-owl': {
      id: 'teacher-owl',
      name: 'Учительница Ольга Совина',
      species: 'Сова',
      profession: 'Учитель',
      avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
      personality: 'Мудрая, терпеливая',
      schedule: {
        morning: { district: 'residential', position: { x: 28, y: 32 } },
        afternoon: { district: 'residential', position: { x: 25, y: 28 } },
        evening: { district: 'residential', position: { x: 22, y: 35 } },
        night: { district: 'town-square', position: { x: 50, y: 50 } } // Owl active at night
      },
      hasQuest: false,
      questPriority: 'low',
      mood: 'wise',
      dialogue: 'Дети очень взволнованы предстоящим фестивалем.'
    },
    'baker-hedgehog': {
      id: 'baker-hedgehog',
      name: 'Пекарь Елена Ежикова',
      species: 'Ёж',
      profession: 'Пекарь',
      avatar: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=100&h=100&fit=crop',
      personality: 'Добрая, заботливая',
      schedule: {
        morning: { district: 'business', position: { x: 75, y: 28 } },
        afternoon: { district: 'business', position: { x: 72, y: 30 } },
        evening: { district: 'residential', position: { x: 25, y: 30 } },
        night: { district: 'residential', position: { x: 25, y: 30 } }
      },
      hasQuest: true,
      questPriority: 'medium',
      mood: 'busy',
      dialogue: 'Мне нужна помощь с приготовлением угощений для фестиваля!'
    },
    'mechanic-beaver': {
      id: 'mechanic-beaver',
      name: 'Механик Борис Бобров',
      species: 'Бобр',
      profession: 'Механик',
      avatar: 'https://images.pixabay.com/photo/2017/05/25/19/06/beaver-2343684_960_720.jpg',
      personality: 'Трудолюбивый, практичный',
      schedule: {
        morning: { district: 'business', position: { x: 78, y: 32 } },
        afternoon: { district: 'business', position: { x: 78, y: 32 } },
        evening: { district: 'festival-grounds', position: { x: 48, y: 78 } },
        night: { district: 'residential', position: { x: 25, y: 30 } }
      },
      hasQuest: true,
      questPriority: 'high',
      mood: 'focused',
      dialogue: 'Сцена нуждается в срочном ремонте!'
    },
    'organizer-elephant': {
      id: 'organizer-elephant',
      name: 'Организатор Анна Слонова',
      species: 'Слон',
      profession: 'Организатор мероприятий',
      avatar: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=100&h=100&fit=crop',
      personality: 'Организованная, стрессующая',
      schedule: {
        morning: { district: 'festival-grounds', position: { x: 50, y: 80 } },
        afternoon: { district: 'festival-grounds', position: { x: 52, y: 78 } },
        evening: { district: 'festival-grounds', position: { x: 48, y: 82 } },
        night: { district: 'town-square', position: { x: 50, y: 50 } }
      },
      hasQuest: true,
      questPriority: 'high',
      mood: 'stressed',
      dialogue: 'Фестиваль через несколько дней, а мы еще не готовы!'
    }
  };

  // Update character positions based on time of day
  useEffect(() => {
    const newPositions = {};
    
    Object.values(npcData).forEach(character => {
      const schedule = character.schedule[timeOfDay];
      if (schedule) {
        newPositions[character.id] = {
          district: schedule.district,
          position: schedule.position
        };
      }
    });
    
    setCharacterPositions(newPositions);
  }, [timeOfDay]);

  // Get characters in current district
  const getCurrentDistrictCharacters = () => {
    return Object.values(npcData).filter(character => {
      const charPosition = characterPositions[character.id];
      return charPosition && charPosition.district === currentDistrict;
    });
  };

  // Handle character interaction
  const handleCharacterClick = (character) => {
    onCharacterClick(character);
  };

  // Get mood color
  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'text-success';
      case 'concerned': return 'text-warning';
      case 'stressed': return 'text-error';
      case 'busy': return 'text-secondary';
      case 'focused': return 'text-primary';
      case 'hurried': return 'text-accent';
      case 'wise': return 'text-text-primary';
      default: return 'text-text-secondary';
    }
  };

  // Get species icon
  const getSpeciesIcon = (species) => {
    switch (species) {
      case 'Медведь': return 'User';
      case 'Кролик': return 'Rabbit';
      case 'Сова': return 'Eye';
      case 'Ёж': return 'Shield';
      case 'Бобр': return 'Wrench';
      case 'Слон': return 'Users';
      default: return 'User';
    }
  };

  const currentCharacters = getCurrentDistrictCharacters();

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 25 }}>
      {currentCharacters.map((character) => {
        const position = characterPositions[character.id]?.position;
        if (!position) return null;

        return (
          <div
            key={character.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
          >
            <button
              onClick={() => handleCharacterClick(character)}
              onMouseEnter={() => setHoveredCharacter(character)}
              onMouseLeave={() => setHoveredCharacter(null)}
              className="relative group focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-full"
              aria-label={`Поговорить с ${character.name}`}
            >
              {/* Character avatar */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-warm-lg hover:shadow-warm-xl transition-all duration-200 hover:scale-110">
                  {character.avatar ? (
                    <Image
                      src={character.avatar}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface flex items-center justify-center">
                      <Icon 
                        name={getSpeciesIcon(character.species)} 
                        className="w-6 h-6 text-text-primary" 
                      />
                    </div>
                  )}
                </div>
                
                {/* Quest indicator */}
                {character.hasQuest && (
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse ${
                    character.questPriority === 'high' ? 'bg-error' :
                    character.questPriority === 'medium' ? 'bg-warning' : 'bg-success'
                  }`}>
                    <Icon name="AlertCircle" className="w-3 h-3 text-white m-0.5" />
                  </div>
                )}
                
                {/* Mood indicator */}
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getMoodColor(character.mood)} bg-current`}>
                </div>
                
                {/* Animation based on personality */}
                {character.personality.includes('энергичный') && (
                  <div className="absolute inset-0 animate-bounce opacity-50"></div>
                )}
                
                {/* Interaction hint */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-text-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap font-caption">
                    Нажмите для разговора
                  </div>
                </div>
              </div>
              
              {/* Character name tag */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs font-caption font-medium text-text-primary shadow-warm whitespace-nowrap">
                {character.name.split(' ')[0]}
              </div>
            </button>
            
            {/* Character tooltip on hover */}
            {hoveredCharacter?.id === character.id && (
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
                <div className="bg-surface border border-border rounded-lg shadow-warm-lg p-4 max-w-64">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      {character.avatar ? (
                        <Image
                          src={character.avatar}
                          alt={character.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary flex items-center justify-center">
                          <Icon 
                            name={getSpeciesIcon(character.species)} 
                            className="w-4 h-4 text-white" 
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-caption font-medium text-text-primary text-sm">
                        {character.name}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {character.profession}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-text-secondary mb-2 italic">
                    "{character.dialogue}"
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">
                      {character.species} • {character.personality}
                    </span>
                    {character.hasQuest && (
                      <span className={`font-caption font-medium ${
                        character.questPriority === 'high' ? 'text-error' :
                        character.questPriority === 'medium' ? 'text-warning' : 'text-success'
                      }`}>
                        Квест
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Movement trails for active characters */}
      {currentCharacters.filter(char => char.personality.includes('энергичный')).map(character => {
        const position = characterPositions[character.id]?.position;
        if (!position) return null;
        
        return (
          <div
            key={`trail-${character.id}`}
            className="absolute pointer-events-none"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full opacity-30 animate-ping"
                style={{
                  left: `${-5 - i * 3}px`,
                  top: '50%',
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default NPCCharacters;