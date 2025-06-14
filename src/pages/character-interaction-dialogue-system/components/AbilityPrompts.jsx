import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const AbilityPrompts = ({ 
  abilities = [], 
  characterSpecies = 'chameleon', 
  onUse = () => {}, 
  onClose = () => {} 
}) => {
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ability definitions by species
  const abilityDefinitions = {
    chameleon: {
      'camouflage': {
        name: 'Камуфляж',
        description: 'Слиться с окружением для незаметного наблюдения',
        icon: 'Eye',
        color: 'text-primary',
        bgColor: 'bg-primary-100',
        cooldown: 30,
        energyCost: 20
      },
      'color-vision': {
        name: 'Цветовое зрение',
        description: 'Увидеть скрытые детали и подсказки',
        icon: 'Palette',
        color: 'text-secondary',
        bgColor: 'bg-secondary-100',
        cooldown: 15,
        energyCost: 10
      },
      'detail-focus': {
        name: 'Фокус на деталях',
        description: 'Обнаружить мелкие важные элементы',
        icon: 'Search',
        color: 'text-accent',
        bgColor: 'bg-accent-100',
        cooldown: 20,
        energyCost: 15
      }
    },
    beaver: {
      'underwater-work': {
        name: 'Подводная работа',
        description: 'Работать под водой без ограничений',
        icon: 'Waves',
        color: 'text-primary',
        bgColor: 'bg-primary-100',
        cooldown: 45,
        energyCost: 30
      },
      'construction': {
        name: 'Строительство',
        description: 'Быстро построить или отремонтировать',
        icon: 'Hammer',
        color: 'text-secondary',
        bgColor: 'bg-secondary-100',
        cooldown: 60,
        energyCost: 40
      },
      'wood-cutting': {
        name: 'Рубка дерева',
        description: 'Эффективно обработать древесину',
        icon: 'TreePine',
        color: 'text-success',
        bgColor: 'bg-success-100',
        cooldown: 25,
        energyCost: 20
      }
    },
    owl: {
      'night-vision': {
        name: 'Ночное зрение',
        description: 'Видеть в полной темноте',
        icon: 'Moon',
        color: 'text-primary',
        bgColor: 'bg-primary-100',
        cooldown: 0,
        energyCost: 5
      },
      'wisdom': {
        name: 'Мудрость',
        description: 'Получить дополнительную информацию',
        icon: 'Brain',
        color: 'text-secondary',
        bgColor: 'bg-secondary-100',
        cooldown: 30,
        energyCost: 25
      },
      'silent-flight': {
        name: 'Бесшумный полёт',
        description: 'Перемещаться незаметно',
        icon: 'Feather',
        color: 'text-accent',
        bgColor: 'bg-accent-100',
        cooldown: 40,
        energyCost: 30
      }
    }
  };

  const availableAbilities = abilities.map(abilityId => ({
    id: abilityId,
    ...abilityDefinitions[characterSpecies]?.[abilityId]
  })).filter(ability => ability.name);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAbilitySelect = (ability) => {
    setSelectedAbility(ability.id);
    setTimeout(() => {
      onUse(ability.id);
      setSelectedAbility(null);
    }, 500);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case '1': case'2': case'3':
        event.preventDefault();
        const index = parseInt(event.key) - 1;
        if (availableAbilities[index]) {
          handleAbilitySelect(availableAbilities[index]);
        }
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableAbilities]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-modal flex items-center justify-center p-4">
      <div className={`bg-surface rounded-xl shadow-warm-xl border border-border max-w-md w-full animate-fade-in ${
        isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      } transition-all duration-300`}>
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg text-text-primary">
                  Использовать способность
                </h2>
                <p className="text-sm text-text-secondary font-caption">
                  Выберите способность для активации
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-background hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="Закрыть"
            >
              <Icon name="X" className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Abilities List */}
        <div className="p-6">
          <div className="space-y-3">
            {availableAbilities.map((ability, index) => (
              <button
                key={ability.id}
                onClick={() => handleAbilitySelect(ability)}
                disabled={selectedAbility === ability.id}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 group ${
                  selectedAbility === ability.id
                    ? 'bg-primary-100 border-primary-300 scale-95'
                    : `${ability.bgColor} border-border hover:border-primary-200 hover:shadow-warm`
                }`}
                aria-label={`Способность ${index + 1}: ${ability.name}`}
              >
                <div className="flex items-start space-x-4">
                  {/* Ability Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedAbility === ability.id ? 'bg-primary' : ability.bgColor
                  } transition-colors duration-200`}>
                    <Icon 
                      name={ability.icon} 
                      className={`w-6 h-6 ${
                        selectedAbility === ability.id ? 'text-white' : ability.color
                      } transition-colors duration-200`} 
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Ability Name */}
                    <h3 className={`font-caption font-medium mb-1 transition-colors duration-200 ${
                      selectedAbility === ability.id ? 'text-primary-700' : 'text-text-primary group-hover:text-primary'
                    }`}>
                      {ability.name}
                    </h3>

                    {/* Ability Description */}
                    <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                      {ability.description}
                    </p>

                    {/* Ability Stats */}
                    <div className="flex items-center space-x-4 text-xs text-text-tertiary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" className="w-3 h-3" />
                        <span>{ability.cooldown}с</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" className="w-3 h-3" />
                        <span>{ability.energyCost} энергии</span>
                      </div>
                    </div>
                  </div>

                  {/* Keyboard Shortcut */}
                  <div className="flex-shrink-0">
                    <span className="w-6 h-6 bg-surface-200 rounded text-xs font-mono flex items-center justify-center text-text-secondary">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Loading State */}
                {selectedAbility === ability.id && (
                  <div className="mt-3 flex items-center space-x-2 text-primary">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-caption">Активация...</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Empty State */}
          {availableAbilities.length === 0 && (
            <div className="text-center py-8">
              <Icon name="AlertCircle" className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary font-caption">
                Нет доступных способностей
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-background rounded-b-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-tertiary font-caption">
              Используйте клавиши 1-{availableAbilities.length} или Esc для отмены
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-surface hover:bg-surface-200 text-text-secondary rounded-lg text-sm font-caption transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbilityPrompts;