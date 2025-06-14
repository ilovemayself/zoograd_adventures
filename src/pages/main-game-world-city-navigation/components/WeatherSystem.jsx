import React from 'react';
import Icon from 'components/AppIcon';

const WeatherSystem = ({ condition, timeOfDay }) => {
  
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return 'Sun';
      case 'cloudy': return 'Cloud';
      case 'rainy': return 'CloudRain';
      case 'foggy': return 'CloudFog';
      default: return 'Sun';
    }
  };

  const getTimeIcon = (timeOfDay) => {
    switch (timeOfDay) {
      case 'morning': return 'Sunrise';
      case 'afternoon': return 'Sun';
      case 'evening': return 'Sunset';
      case 'night': return 'Moon';
      default: return 'Sun';
    }
  };

  const getWeatherEffects = (condition) => {
    switch (condition) {
      case 'rainy':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-8 bg-blue-400 opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `rotate(15deg)`,
                  animationDuration: '0.5s'
                }}
              ></div>
            ))}
          </div>
        );
      
      case 'foggy':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gray-200 opacity-40"></div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white opacity-20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        );
      
      case 'cloudy':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gray-100 opacity-30"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getTimeOverlay = (timeOfDay) => {
    switch (timeOfDay) {
      case 'night':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-blue-900 opacity-40"></div>
            {/* Stars */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              ></div>
            ))}
          </div>
        );
      
      case 'evening':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-200 to-purple-200 opacity-20"></div>
          </div>
        );
      
      case 'morning':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-orange-100 opacity-20"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getWeatherDescription = (condition, timeOfDay) => {
    const weatherDesc = {
      sunny: 'Солнечно',
      cloudy: 'Облачно',
      rainy: 'Дождь',
      foggy: 'Туман'
    };
    
    const timeDesc = {
      morning: 'Утро',
      afternoon: 'День',
      evening: 'Вечер',
      night: 'Ночь'
    };
    
    return `${timeDesc[timeOfDay]}, ${weatherDesc[condition]}`;
  };

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      {/* Time of day overlay */}
      {getTimeOverlay(timeOfDay)}
      
      {/* Weather effects */}
      {getWeatherEffects(condition)}
      
      {/* Weather indicator */}
      <div className="absolute top-4 right-20 bg-surface bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-warm border border-border">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getTimeIcon(timeOfDay)} 
            className="w-4 h-4 text-secondary" 
          />
          <Icon 
            name={getWeatherIcon(condition)} 
            className="w-4 h-4 text-primary" 
          />
          <span className="text-xs font-caption text-text-primary">
            {getWeatherDescription(condition, timeOfDay)}
          </span>
        </div>
      </div>
      
      {/* Special weather warnings */}
      {condition === 'rainy' && (
        <div className="absolute top-16 right-4 bg-warning-50 border border-warning-200 rounded-lg p-2 max-w-48">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" className="w-4 h-4 text-warning flex-shrink-0" />
            <p className="text-xs text-warning-700 font-caption">
              Дождь может затруднить некоторые активности
            </p>
          </div>
        </div>
      )}
      
      {timeOfDay === 'night' && (
        <div className="absolute top-16 right-4 bg-primary-50 border border-primary-200 rounded-lg p-2 max-w-48">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-xs text-primary-700 font-caption">
              Сова получает бонус к способностям ночью
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSystem;