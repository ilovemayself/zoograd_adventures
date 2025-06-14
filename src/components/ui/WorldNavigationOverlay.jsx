import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const WorldNavigationOverlay = ({ gameState = {}, characterData = {} }) => {
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [characterHealth, setCharacterHealth] = useState(85);
  const [characterEnergy, setCharacterEnergy] = useState(70);
  const [currentLocation, setCurrentLocation] = useState('Town Square');
  const [timeOfDay, setTimeOfDay] = useState('Morning');

  const handleMiniMapToggle = () => {
    setShowMiniMap(!showMiniMap);
  };

  const handleStatusClick = () => {
    // Could open character details panel
    console.log('Character status clicked');
  };

  const handleLocationClick = () => {
    // Could open location details or fast travel
    console.log('Location clicked');
  };

  // Simulate time progression
  useEffect(() => {
    const timeProgression = ['Morning', 'Afternoon', 'Evening', 'Night'];
    let currentIndex = 0;
    
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % timeProgression.length;
      setTimeOfDay(timeProgression[currentIndex]);
    }, 60000); // Change every minute for demo

    return () => clearInterval(timer);
  }, []);

  // Simulate character status changes
  useEffect(() => {
    const statusTimer = setInterval(() => {
      setCharacterHealth(prev => Math.max(prev - Math.random() * 2, 20));
      setCharacterEnergy(prev => Math.max(prev - Math.random() * 3, 10));
    }, 10000);

    return () => clearInterval(statusTimer);
  }, []);

  const getHealthColor = (health) => {
    if (health > 60) return 'text-success';
    if (health > 30) return 'text-warning';
    return 'text-error';
  };

  const getEnergyColor = (energy) => {
    if (energy > 50) return 'text-primary';
    if (energy > 25) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-90">
      {/* Character Status - Top Left */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <button
          onClick={handleStatusClick}
          className="character-status hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label="Character status"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-warm">
              <Icon name="User" className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Heart" className={`w-4 h-4 ${getHealthColor(characterHealth)}`} />
                <span className={`text-sm font-caption font-medium ${getHealthColor(characterHealth)}`}>
                  {Math.round(characterHealth)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" className={`w-4 h-4 ${getEnergyColor(characterEnergy)}`} />
                <span className={`text-sm font-caption font-medium ${getEnergyColor(characterEnergy)}`}>
                  {Math.round(characterEnergy)}%
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Location & Time - Top Center */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <button
          onClick={handleLocationClick}
          className="character-status hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label={`Current location: ${currentLocation}, Time: ${timeOfDay}`}
        >
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" className="w-5 h-5 text-primary" />
            <div className="text-center">
              <p className="text-sm font-caption font-medium text-text-primary">
                {currentLocation}
              </p>
              <p className="text-xs text-text-secondary">
                {timeOfDay}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Mini Map Toggle - Top Right */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <button
          onClick={handleMiniMapToggle}
          className={`mini-map-toggle ${showMiniMap ? 'bg-primary-600' : ''}`}
          aria-label={showMiniMap ? 'Hide mini map' : 'Show mini map'}
          aria-pressed={showMiniMap}
        >
          <Icon name="Map" className="w-6 h-6" />
        </button>
      </div>

      {/* Mini Map Panel */}
      {showMiniMap && (
        <div className="absolute top-20 right-4 pointer-events-auto animate-fade-in">
          <div className="bg-surface rounded-lg shadow-warm-lg border border-border p-4 w-64">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-medium text-text-primary">City Map</h3>
              <button
                onClick={handleMiniMapToggle}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded"
                aria-label="Close mini map"
              >
                <Icon name="X" className="w-4 h-4" />
              </button>
            </div>
            
            {/* Simplified Map Representation */}
            <div className="bg-background rounded border border-border h-32 relative overflow-hidden">
              <div className="absolute inset-2 grid grid-cols-3 gap-1">
                {/* Map locations */}
                <div className="bg-primary-200 rounded flex items-center justify-center">
                  <Icon name="Home" className="w-3 h-3 text-primary" />
                </div>
                <div className="bg-secondary-200 rounded flex items-center justify-center relative">
                  <Icon name="MapPin" className="w-3 h-3 text-secondary" />
                  {/* Current location indicator */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                </div>
                <div className="bg-success-200 rounded flex items-center justify-center">
                  <Icon name="Trees" className="w-3 h-3 text-success" />
                </div>
                <div className="bg-warning-200 rounded flex items-center justify-center">
                  <Icon name="Store" className="w-3 h-3 text-warning" />
                </div>
                <div className="bg-accent-200 rounded flex items-center justify-center">
                  <Icon name="Castle" className="w-3 h-3 text-accent" />
                </div>
                <div className="bg-primary-200 rounded flex items-center justify-center">
                  <Icon name="Waves" className="w-3 h-3 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-text-secondary font-caption">
              <p>Click locations to fast travel</p>
            </div>
          </div>
        </div>
      )}

      {/* Interaction Hints - Bottom Center (when applicable) */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="character-status animate-pulse-glow">
          <div className="flex items-center space-x-2">
            <Icon name="Hand" className="w-4 h-4 text-accent" />
            <span className="text-sm font-caption font-medium text-text-primary">
              Press E to interact
            </span>
          </div>
        </div>
      </div>

      {/* Quest Objective Reminder - Right Side */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto">
        <div className="character-status max-w-xs">
          <div className="flex items-start space-x-2">
            <Icon name="Target" className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-caption font-medium text-text-primary mb-1">
                Current Objective
              </p>
              <p className="text-xs text-text-secondary">
                Find the festival organizer in the town square
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldNavigationOverlay;