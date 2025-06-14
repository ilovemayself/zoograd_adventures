import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CharacterPortrait = ({ character }) => {
  if (!character) return null;

  const getBackgroundElements = (background) => {
    switch (background) {
      case 'construction':
        return (
          <div className="absolute inset-0 opacity-10">
            <Icon name="Hammer" className="absolute top-4 right-4 w-8 h-8 text-primary" />
            <Icon name="Wrench" className="absolute bottom-4 left-4 w-6 h-6 text-secondary" />
            <Icon name="HardHat" className="absolute top-1/2 right-8 w-7 h-7 text-accent" />
          </div>
        );
      case 'stealth':
        return (
          <div className="absolute inset-0 opacity-10">
            <Icon name="Eye" className="absolute top-4 right-4 w-8 h-8 text-primary" />
            <Icon name="EyeOff" className="absolute bottom-4 left-4 w-6 h-6 text-secondary" />
            <Icon name="Zap" className="absolute top-1/2 right-8 w-7 h-7 text-accent" />
          </div>
        );
      case 'detective':
        return (
          <div className="absolute inset-0 opacity-10">
            <Icon name="Search" className="absolute top-4 right-4 w-8 h-8 text-primary" />
            <Icon name="FileText" className="absolute bottom-4 left-4 w-6 h-6 text-secondary" />
            <Icon name="Lightbulb" className="absolute top-1/2 right-8 w-7 h-7 text-accent" />
          </div>
        );
      case 'investigation':
        return (
          <div className="absolute inset-0 opacity-10">
            <Icon name="Navigation" className="absolute top-4 right-4 w-8 h-8 text-primary" />
            <Icon name="Brain" className="absolute bottom-4 left-4 w-6 h-6 text-secondary" />
            <Icon name="Target" className="absolute top-1/2 right-8 w-7 h-7 text-accent" />
          </div>
        );
      default:
        return null;
    }
  };

  const experiencePercentage = (character.experience / character.nextLevelExp) * 100;

  return (
    <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 border-b border-border">
      {getBackgroundElements(character.background)}
      
      <div className="relative p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Character Avatar */}
          <div className="relative">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-warm-lg">
              <Image
                src={character.avatar}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-warm">
              <span className="font-caption font-bold text-lg">{character.level}</span>
            </div>
          </div>

          {/* Character Info */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-2">
              {character.name}
            </h2>
            <p className="text-lg text-secondary font-caption font-medium mb-4">
              {character.profession}
            </p>
            
            {/* Experience Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-caption text-text-primary">
                  Опыт: {character.experience} / {character.nextLevelExp}
                </span>
                <span className="text-sm font-caption text-secondary">
                  {Math.round(experiencePercentage)}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-secondary to-accent h-3 rounded-full transition-all duration-500"
                  style={{ width: `${experiencePercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Character Description */}
            <div className="bg-white bg-opacity-80 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-text-primary font-body leading-relaxed">
                {character.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="bg-success-100 rounded-lg p-3">
                  <Icon name="Zap" className="w-6 h-6 text-success mx-auto mb-1" />
                  <p className="text-sm font-caption font-medium text-success">Энергия</p>
                  <p className="text-lg font-bold text-success">85%</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 rounded-lg p-3">
                  <Icon name="Star" className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-sm font-caption font-medium text-primary">Навыки</p>
                  <p className="text-lg font-bold text-primary">{character.level}/10</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-secondary-100 rounded-lg p-3">
                  <Icon name="Award" className="w-6 h-6 text-secondary mx-auto mb-1" />
                  <p className="text-sm font-caption font-medium text-secondary">Репутация</p>
                  <p className="text-lg font-bold text-secondary">Высокая</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPortrait;