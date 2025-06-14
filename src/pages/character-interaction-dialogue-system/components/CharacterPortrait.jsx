import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CharacterPortrait = ({ 
  character, 
  emotion = 'neutral', 
  isTyping = false, 
  className = '', 
  desktop = false 
}) => {
  const [currentColor, setCurrentColor] = useState('#8B4513');
  const [isAnimating, setIsAnimating] = useState(false);

  // Emotion to color mapping for chameleon
  const emotionColors = {
    neutral: '#8B4513',
    happy: '#228B22',
    excited: '#32CD32',
    thoughtful: '#4169E1',
    curious: '#FFD700',
    concerned: '#FF8C00',
    proud: '#9932CC',
    sad: '#696969'
  };

  // Character-specific animations
  const getCharacterAnimation = () => {
    switch (character.species) {
      case 'chameleon':
        return 'animate-pulse-glow';
      case 'beaver':
        return 'animate-bounce';
      case 'owl':
        return 'animate-pulse';
      default:
        return 'animate-fade-in';
    }
  };

  useEffect(() => {
    if (character.species === 'chameleon') {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentColor(emotionColors[emotion] || emotionColors.neutral);
        setIsAnimating(false);
      }, 300);
    }
  }, [emotion, character.species]);

  const getCharacterImage = () => {
    // Mock character images based on species and emotion
    const baseUrl = "https://images.unsplash.com/";
    
    switch (character.species) {
      case 'chameleon':
        return `${baseUrl}photo-1583337130417-3346a1be7dee?w=400&h=600&fit=crop&crop=face`;
      case 'beaver':
        return `${baseUrl}photo-1564349683136-77e08dba1ef7?w=400&h=600&fit=crop&crop=face`;
      case 'owl':
        return `${baseUrl}photo-1551431009-a802eeec77b1?w=400&h=600&fit=crop&crop=face`;
      default:
        return `${baseUrl}photo-1574158622682-e40e69881006?w=400&h=600&fit=crop&crop=face`;
    }
  };

  const getEmotionIcon = () => {
    switch (emotion) {
      case 'happy': case'excited':
        return 'Smile';
      case 'thoughtful':
        return 'Brain';
      case 'curious':
        return 'Eye';
      case 'concerned':
        return 'AlertCircle';
      case 'proud':
        return 'Award';
      case 'sad':
        return 'Frown';
      default:
        return 'User';
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 rounded-lg"></div>
      </div>

      {/* Character Portrait */}
      <div className={`relative ${desktop ? 'w-80 h-96' : 'w-64 h-80'} ${getCharacterAnimation()}`}>
        {/* Main Character Image */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-warm-lg border-4 border-surface">
          <Image
            src={getCharacterImage()}
            alt={character.name}
            className="w-full h-full object-cover"
          />
          
          {/* Chameleon Color Overlay */}
          {character.species === 'chameleon' && (
            <div 
              className={`absolute inset-0 mix-blend-multiply transition-all duration-500 ${
                isAnimating ? 'opacity-0' : 'opacity-30'
              }`}
              style={{ backgroundColor: currentColor }}
            />
          )}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="absolute bottom-4 left-4 bg-surface bg-opacity-90 rounded-full px-3 py-2 flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          )}
        </div>

        {/* Emotion Indicator */}
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-warm border-2 border-surface">
          <Icon 
            name={getEmotionIcon()} 
            className="w-6 h-6 text-white" 
          />
        </div>

        {/* Character Name Plate */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-surface rounded-lg px-4 py-2 shadow-warm border border-border">
          <p className="font-heading font-medium text-text-primary text-center whitespace-nowrap">
            {character.name}
          </p>
          <p className="text-xs text-text-secondary text-center font-caption">
            {character.profession}
          </p>
        </div>

        {/* Species-specific Visual Effects */}
        {character.species === 'chameleon' && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Color-changing particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentColor }}></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: currentColor, animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: currentColor, animationDelay: '1s' }}></div>
          </div>
        )}

        {character.species === 'beaver' && (
          <div className="absolute bottom-8 right-4">
            <Icon name="Hammer" className="w-6 h-6 text-secondary animate-bounce" />
          </div>
        )}

        {character.species === 'owl' && (
          <div className="absolute top-8 left-4">
            <Icon name="Moon" className="w-5 h-5 text-primary animate-pulse" />
          </div>
        )}
      </div>

      {/* Location Context */}
      <div className="absolute bottom-4 left-4 bg-surface bg-opacity-90 rounded-lg px-3 py-2 shadow-warm">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" className="w-4 h-4 text-secondary" />
          <span className="text-sm font-caption text-text-primary">
            {character.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterPortrait;