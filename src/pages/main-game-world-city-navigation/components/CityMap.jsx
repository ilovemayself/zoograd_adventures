import React from 'react';
import Icon from 'components/AppIcon';

const CityMap = ({ 
  districts, 
  currentDistrict, 
  playerPosition, 
  timeOfDay, 
  weatherCondition 
}) => {
  
  const getDistrictStyle = (district) => {
    const baseStyle = "absolute rounded-lg border-2 transition-all duration-300";
    const isActive = currentDistrict === district.id;
    const isAvailable = district.available;
    
    if (!isAvailable) {
      return `${baseStyle} bg-gray-300 border-gray-400 opacity-50`;
    }
    
    if (isActive) {
      return `${baseStyle} bg-primary-100 border-primary shadow-warm-lg`;
    }
    
    return `${baseStyle} bg-surface border-border hover:border-primary-300 hover:shadow-warm`;
  };

  const getDistrictSize = (districtId) => {
    switch (districtId) {
      case 'town-square':
        return { width: '20%', height: '20%' };
      case 'festival-grounds':
        return { width: '25%', height: '15%' };
      default:
        return { width: '18%', height: '18%' };
    }
  };

  const getTimeBasedOpacity = (timeOfDay) => {
    switch (timeOfDay) {
      case 'night':
        return 'opacity-70';
      case 'evening':
        return 'opacity-85';
      default:
        return 'opacity-100';
    }
  };

  const getWeatherOverlay = (weatherCondition) => {
    switch (weatherCondition) {
      case 'rainy':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
            {/* Rain effect */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-400 opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        );
      case 'foggy':
        return (
          <div className="absolute inset-0 bg-gray-200 opacity-30 pointer-events-none"></div>
        );
      case 'cloudy':
        return (
          <div className="absolute inset-0 bg-gray-100 opacity-20 pointer-events-none"></div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 ${getTimeBasedOpacity(timeOfDay)}`}>
      {/* Background terrain */}
      <div className="absolute inset-0">
        {/* Roads */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-400 transform -translate-x-1/2"></div>
        
        {/* River */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-300 opacity-60"></div>
        
        {/* Parks/Green areas */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-green-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-20 h-12 bg-green-300 rounded-lg opacity-40"></div>
      </div>

      {/* District areas */}
      {districts.map((district) => {
        const size = getDistrictSize(district.id);
        return (
          <div
            key={district.id}
            className={getDistrictStyle(district)}
            style={{
              left: `${district.position.x - parseFloat(size.width) / 2}%`,
              top: `${district.position.y - parseFloat(size.height) / 2}%`,
              width: size.width,
              height: size.height
            }}
          >
            {/* District icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Icon 
                  name={getDistrictIcon(district.id)} 
                  className={`w-8 h-8 mx-auto mb-1 ${
                    currentDistrict === district.id ? 'text-primary' : 'text-text-secondary'
                  }`} 
                />
                <div className="text-xs font-caption font-medium text-text-primary">
                  {district.buildings.length}
                </div>
              </div>
            </div>
            
            {/* Activity indicators */}
            {district.npcs.length > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            )}
          </div>
        );
      })}

      {/* Pathfinding visualization */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {/* Example path line - could be dynamic based on player movement */}
        <path
          d={`M ${playerPosition.x}% ${playerPosition.y}% Q ${(playerPosition.x + 50) / 2}% ${(playerPosition.y + 30) / 2}% 50% 50%`}
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
          opacity="0.5"
          className="animate-pulse"
        />
      </svg>

      {/* Weather overlay */}
      {getWeatherOverlay(weatherCondition)}

      {/* Time of day overlay */}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 bg-blue-900 opacity-20 pointer-events-none"></div>
      )}
      {timeOfDay === 'evening' && (
        <div className="absolute inset-0 bg-orange-400 opacity-10 pointer-events-none"></div>
      )}
    </div>
  );
};

const getDistrictIcon = (districtId) => {
  switch (districtId) {
    case 'town-square':
      return 'MapPin';
    case 'residential':
      return 'Home';
    case 'business':
      return 'Building';
    case 'festival-grounds':
      return 'PartyPopper';
    case 'government':
      return 'Landmark';
    default:
      return 'Map';
  }
};

export default CityMap;