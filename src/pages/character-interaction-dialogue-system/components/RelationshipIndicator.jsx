import React from 'react';
import Icon from 'components/AppIcon';

const RelationshipIndicator = ({ 
  level = 1, 
  characterName = '', 
  className = '', 
  desktop = false 
}) => {
  const maxLevel = 5;
  
  const getRelationshipData = (level) => {
    const relationships = [
      { 
        label: 'Незнакомец', 
        color: 'text-text-tertiary', 
        bgColor: 'bg-surface-200',
        description: 'Вы только познакомились'
      },
      { 
        label: 'Знакомый', 
        color: 'text-warning', 
        bgColor: 'bg-warning-100',
        description: 'Начальное знакомство'
      },
      { 
        label: 'Друг', 
        color: 'text-secondary', 
        bgColor: 'bg-secondary-100',
        description: 'Дружеские отношения'
      },
      { 
        label: 'Хороший друг', 
        color: 'text-primary', 
        bgColor: 'bg-primary-100',
        description: 'Крепкая дружба'
      },
      { 
        label: 'Близкий друг', 
        color: 'text-success', 
        bgColor: 'bg-success-100',
        description: 'Очень близкие отношения'
      }
    ];
    
    return relationships[Math.max(0, Math.min(level - 1, relationships.length - 1))];
  };

  const relationshipData = getRelationshipData(level);

  const renderHearts = () => {
    return Array.from({ length: maxLevel }, (_, index) => {
      const isFilled = index < level;
      return (
        <Icon
          key={index}
          name={isFilled ? "Heart" : "Heart"}
          className={`w-4 h-4 transition-colors duration-300 ${
            isFilled 
              ? relationshipData.color 
              : 'text-border'
          }`}
          fill={isFilled ? "currentColor" : "none"}
        />
      );
    });
  };

  return (
    <div className={`${className}`}>
      <div className={`${relationshipData.bgColor} rounded-lg p-3 shadow-warm border border-border ${
        desktop ? 'min-w-[200px]' : 'min-w-[160px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name="Users" className="w-4 h-4 text-text-secondary" />
            <span className="text-sm font-caption font-medium text-text-primary">
              Отношения
            </span>
          </div>
          <span className="text-xs font-mono text-text-secondary">
            {level}/{maxLevel}
          </span>
        </div>

        {/* Character Name */}
        {characterName && (
          <p className="text-xs text-text-secondary font-caption mb-2 truncate">
            с {characterName}
          </p>
        )}

        {/* Hearts Display */}
        <div className="flex items-center space-x-1 mb-2">
          {renderHearts()}
        </div>

        {/* Relationship Level */}
        <div className="text-center">
          <p className={`text-sm font-caption font-medium ${relationshipData.color}`}>
            {relationshipData.label}
          </p>
          <p className="text-xs text-text-tertiary font-caption">
            {relationshipData.description}
          </p>
        </div>

        {/* Progress to Next Level */}
        {level < maxLevel && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-text-secondary font-caption mb-1">
              <span>До следующего уровня</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-border rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  relationshipData.color.replace('text-', 'bg-')
                }`}
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
        )}

        {/* Max Level Indicator */}
        {level === maxLevel && (
          <div className="mt-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-success">
              <Icon name="Award" className="w-3 h-3" />
              <span className="text-xs font-caption font-medium">
                Максимальный уровень
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Relationship Benefits Tooltip (Desktop) */}
      {desktop && (
        <div className="mt-2 bg-surface rounded-lg p-2 border border-border text-xs">
          <p className="text-text-secondary font-caption mb-1">
            <strong>Преимущества:</strong>
          </p>
          <ul className="text-text-tertiary font-caption space-y-1">
            {level >= 2 && <li>• Скидки в магазинах</li>}
            {level >= 3 && <li>• Дополнительные квесты</li>}
            {level >= 4 && <li>• Особые способности</li>}
            {level >= 5 && <li>• Эксклюзивные предметы</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RelationshipIndicator;