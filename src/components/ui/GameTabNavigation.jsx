import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const GameTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questNotifications, setQuestNotifications] = useState(2);
  const [inventoryBadge, setInventoryBadge] = useState(1);

  const navigationItems = [
    {
      id: 'world',
      label: 'World',
      icon: 'Map',
      path: '/main-game-world-city-navigation',
      badge: 0,
      tooltip: 'Explore the city and interact with characters'
    },
    {
      id: 'quests',
      label: 'Quests',
      icon: 'ScrollText',
      path: '/quest-task-management-hub',
      badge: questNotifications,
      tooltip: 'Manage your active quests and festival preparations'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: 'Package',
      path: '/inventory-item-management',
      badge: inventoryBadge,
      tooltip: 'Manage items and craft potions'
    },
    {
      id: 'abilities',
      label: 'Abilities',
      icon: 'Zap',
      path: '/character-abilities-skills-interface',
      badge: 0,
      tooltip: 'View character skills and abilities'
    }
  ];

  const handleTabClick = (item) => {
    navigate(item.path);
    
    // Clear badges when visiting the screen
    if (item.id === 'quests' && questNotifications > 0) {
      setQuestNotifications(0);
    }
    if (item.id === 'inventory' && inventoryBadge > 0) {
      setInventoryBadge(0);
    }
  };

  const handleKeyDown = (event, item) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(item);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      
      const keyMap = {
        '1': navigationItems[0],
        '2': navigationItems[1],
        '3': navigationItems[2],
        '4': navigationItems[3]
      };
      
      const item = keyMap[event.key];
      if (item) {
        event.preventDefault();
        handleTabClick(item);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [questNotifications, inventoryBadge]);

  // Simulate quest and inventory updates
  useEffect(() => {
    const questTimer = setInterval(() => {
      if (location.pathname !== '/quest-task-management-hub') {
        setQuestNotifications(prev => Math.min(prev + 1, 9));
      }
    }, 30000); // New quest notification every 30 seconds

    const inventoryTimer = setInterval(() => {
      if (location.pathname !== '/inventory-item-management') {
        setInventoryBadge(prev => Math.min(prev + 1, 9));
      }
    }, 45000); // New inventory item every 45 seconds

    return () => {
      clearInterval(questTimer);
      clearInterval(inventoryTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100 safe-area-bottom"
        role="navigation"
        aria-label="Game navigation"
      >
        <div className="flex">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                className={`nav-tab ${isActive ? 'active' : ''}`}
                aria-label={`${item.label}${item.badge > 0 ? ` (${item.badge} notifications)` : ''}`}
                title={item.tooltip}
                role="tab"
                aria-selected={isActive}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    className="nav-tab-icon" 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {item.badge > 0 && (
                    <span className="quest-badge">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="nav-tab-label text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav 
        className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-60 bg-surface border-r border-border z-100 flex-col"
        role="navigation"
        aria-label="Game navigation"
      >
        {/* Logo/Brand Area */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Gamepad2" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-primary">Adventure</h1>
              <p className="text-xs text-text-secondary font-caption">Story Game</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6">
          <div className="space-y-2 px-3">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                  className={`nav-tab w-full ${isActive ? 'active' : ''}`}
                  aria-label={`${item.label}${item.badge > 0 ? ` (${item.badge} notifications)` : ''}`}
                  title={item.tooltip}
                  role="tab"
                  aria-selected={isActive}
                >
                  <div className="relative">
                    <Icon 
                      name={item.icon} 
                      className="nav-tab-icon" 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {item.badge > 0 && (
                      <span className="quest-badge">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-caption font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer/Status Area */}
        <div className="p-6 border-t border-border">
          <div className="character-status">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-caption font-medium text-text-primary truncate">
                  Character Name
                </p>
                <p className="text-xs text-text-secondary">Level 5 Explorer</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GameTabNavigation;