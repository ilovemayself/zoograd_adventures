import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AbilityCard = ({ ability, onSelect, onPractice, isSelected }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getLevelColor = (level, maxLevel) => {
    const percentage = (level / maxLevel) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-secondary';
    if (percentage >= 40) return 'text-warning';
    return 'text-error';
  };

  const getEffectivenessColor = (effectiveness) => {
    if (effectiveness >= 90) return 'bg-success';
    if (effectiveness >= 70) return 'bg-secondary';
    if (effectiveness >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const formatCooldown = (seconds) => {
    if (seconds === 0) return 'Без перезарядки';
    if (seconds < 60) return `${seconds}с`;
    return `${Math.floor(seconds / 60)}м`;
  };

  return (
    <div 
      className={`card transition-all duration-300 hover:shadow-warm-lg cursor-pointer ${
        isSelected ? 'ring-2 ring-primary shadow-warm-lg' : ''
      } ${!ability.unlocked ? 'opacity-60' : ''}`}
      onClick={() => onSelect(ability)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            ability.unlocked ? 'bg-primary text-white' : 'bg-border text-text-secondary'
          }`}>
            <Icon name={ability.icon} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-text-primary">
              {ability.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-caption font-medium ${getLevelColor(ability.level, ability.maxLevel)}`}>
                Уровень {ability.level}/{ability.maxLevel}
              </span>
              {!ability.unlocked && (
                <Icon name="Lock" className="w-3 h-3 text-text-secondary" />
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          className="text-text-secondary hover:text-text-primary transition-colors duration-200"
          aria-label="Toggle details"
        >
          <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-text-secondary font-body text-sm mb-4 leading-relaxed">
        {ability.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-caption text-text-secondary">Прогресс</span>
          <span className="text-xs font-caption text-text-primary">
            {ability.level}/{ability.maxLevel}
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              ability.unlocked ? 'bg-primary' : 'bg-text-secondary'
            }`}
            style={{ width: `${(ability.level / ability.maxLevel) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Clock" className="w-3 h-3 text-text-secondary" />
            <span className="text-xs font-caption text-text-secondary">Перезарядка</span>
          </div>
          <p className="text-sm font-medium text-text-primary">
            {formatCooldown(ability.cooldown)}
          </p>
        </div>
        
        <div className="bg-background rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Target" className="w-3 h-3 text-text-secondary" />
            <span className="text-xs font-caption text-text-secondary">Эффективность</span>
          </div>
          <p className="text-sm font-medium text-text-primary">
            {ability.effectiveness}%
          </p>
        </div>
      </div>

      {/* Effectiveness Bar */}
      <div className="mb-4">
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getEffectivenessColor(ability.effectiveness)}`}
            style={{ width: `${ability.effectiveness}%` }}
          ></div>
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertCircle" className="w-3 h-3 text-text-secondary" />
          <span className="text-xs font-caption text-text-secondary">Требования</span>
        </div>
        <p className="text-xs text-text-primary bg-background rounded px-2 py-1">
          {ability.requirements}
        </p>
      </div>

      {/* Detailed Usage (Expandable) */}
      {showDetails && (
        <div className="border-t border-border pt-4 animate-fade-in">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BookOpen" className="w-3 h-3 text-text-secondary" />
            <span className="text-xs font-caption text-text-secondary">Применение</span>
          </div>
          <div className="bg-background rounded-lg p-3">
            <p className="text-xs text-text-primary leading-relaxed whitespace-pre-line">
              {ability.usage}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4">
        {ability.unlocked && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPractice(ability);
            }}
            className="flex-1 bg-secondary text-white px-3 py-2 rounded-md text-sm font-caption font-medium hover:bg-secondary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-300"
          >
            <Icon name="Play" className="w-3 h-3 inline mr-1" />
            Тренировка
          </button>
        )}
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(ability);
          }}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-caption font-medium transition-colors duration-200 focus:outline-none focus:ring-2 ${
            ability.unlocked
              ? 'bg-primary text-white hover:bg-primary-600 focus:ring-primary-300' :'bg-border text-text-secondary cursor-not-allowed'
          }`}
          disabled={!ability.unlocked}
        >
          <Icon name="Info" className="w-3 h-3 inline mr-1" />
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default AbilityCard;