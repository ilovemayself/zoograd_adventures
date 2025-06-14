import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CharacterCard = ({ character, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onSelect(character);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const getAbilityIcon = (ability) => {
    switch (ability) {
      case 'Маскировка': return 'Eye';
      case 'Строительство': return 'Hammer';
      case 'Ночное зрение': return 'Moon';
      case 'Быстрый бег': return 'Zap';
      case 'Супер-сила': return 'Dumbbell';
      case 'Супер-слух': return 'Ear';
      case 'Прыжки': return 'ArrowUp';
      case 'Память': return 'Brain';
      default: return 'Star';
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300 group ${
        isSelected 
          ? 'border-primary bg-primary-50 shadow-warm-lg transform scale-105' 
          : 'border-border bg-surface hover:border-primary-300 hover:shadow-warm hover:transform hover:scale-102'
      }`}
      aria-label={`Выбрать ${character.name}, ${character.profession}`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-warm">
          <Icon name="Check" className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Character Avatar */}
      <div className="relative mb-3">
        <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full overflow-hidden shadow-warm transition-transform duration-300 ${
          isHovered ? 'transform scale-110' : ''
        }`}>
          <Image
            src={character.avatar}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Ability Badge */}
        <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-warm transition-colors duration-300 ${
          isSelected ? 'bg-primary' : 'bg-secondary'
        }`}>
          <Icon 
            name={getAbilityIcon(character.ability)} 
            className="w-4 h-4 text-white" 
          />
        </div>
      </div>

      {/* Character Info */}
      <div className="text-center">
        <h3 className={`font-heading font-bold text-sm lg:text-base mb-1 transition-colors duration-300 ${
          isSelected ? 'text-primary' : 'text-text-primary group-hover:text-primary'
        }`}>
          {character.name}
        </h3>
        <p className="text-xs text-text-secondary font-caption mb-1">
          {character.profession}
        </p>
        <p className={`text-xs font-caption font-medium transition-colors duration-300 ${
          isSelected ? 'text-secondary' : 'text-text-secondary group-hover:text-secondary'
        }`}>
          {character.ability}
        </p>
      </div>

      {/* Hover Description */}
      {isHovered && !isSelected && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-text-primary text-white text-xs rounded-lg px-3 py-2 shadow-warm-lg z-10 whitespace-nowrap animate-fade-in">
          {character.description}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-text-primary"></div>
        </div>
      )}

      {/* Character Color Accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl transition-opacity duration-300"
        style={{ 
          backgroundColor: character.color,
          opacity: isSelected ? 1 : (isHovered ? 0.7 : 0.3)
        }}
      ></div>
    </button>
  );
};

export default CharacterCard;