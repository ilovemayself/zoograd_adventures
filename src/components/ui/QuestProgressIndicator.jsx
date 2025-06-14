import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const QuestProgressIndicator = ({ 
  activeQuests = [],
  festivalCountdown = 72,
  onQuestClick = () => {},
  onExpandToggle = () => {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [urgentQuests, setUrgentQuests] = useState([]);
  const [completedToday, setCompletedToday] = useState(2);

  // Sample quest data
  const defaultQuests = [
    {
      id: 1,
      title: "Find the Festival Banner",
      description: "Locate the missing festival banner in the old storage room",
      priority: "high",
      progress: 60,
      timeRemaining: "2 hours",
      reward: "50 Gold, Festival Token",
      category: "main"
    },
    {
      id: 2,
      title: "Gather Decorative Flowers",
      description: "Collect 10 wildflowers from the meadow for festival decorations",
      priority: "medium",
      progress: 30,
      timeRemaining: "6 hours",
      reward: "25 Gold, Crafting Materials",
      category: "side"
    },
    {
      id: 3,
      title: "Help the Baker",
      description: "Assist with preparing festival treats for the celebration",
      priority: "low",
      progress: 80,
      timeRemaining: "12 hours",
      reward: "Food Items, Recipe",
      category: "side"
    },
    {
      id: 4,
      title: "Repair the Stage",
      description: "Fix the wooden stage where performances will take place",
      priority: "high",
      progress: 10,
      timeRemaining: "4 hours",
      reward: "100 Gold, Reputation",
      category: "main"
    }
  ];

  const quests = activeQuests.length > 0 ? activeQuests : defaultQuests;

  useEffect(() => {
    // Filter urgent quests (high priority or low time remaining)
    const urgent = quests.filter(quest => 
      quest.priority === 'high' || 
      (quest.timeRemaining && parseInt(quest.timeRemaining) <= 4)
    );
    setUrgentQuests(urgent);
  }, [quests]);

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
    onExpandToggle(!isExpanded);
  };

  const handleQuestClick = (quest) => {
    onQuestClick(quest);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const formatTimeRemaining = (timeStr) => {
    if (!timeStr) return 'No limit';
    const hours = parseInt(timeStr);
    if (hours <= 1) return `${timeStr} (Urgent!)`;
    if (hours <= 4) return `${timeStr} (Soon)`;
    return timeStr;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="fixed bottom-20 lg:bottom-4 right-4 z-90 pointer-events-auto">
      {/* Compact Indicator */}
      <div className="bg-surface rounded-lg shadow-warm-lg border border-border overflow-hidden">
        {/* Header */}
        <button
          onClick={handleToggleExpanded}
          className="w-full p-4 flex items-center justify-between hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label={`Quest progress. ${urgentQuests.length} urgent quests. ${isExpanded ? 'Collapse' : 'Expand'} details`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Target" className="w-6 h-6 text-secondary" />
              {urgentQuests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-caption">
                  {urgentQuests.length}
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="font-caption font-medium text-text-primary">
                Active Quests
              </p>
              <p className="text-xs text-text-secondary">
                {quests.length} active • {completedToday} completed today
              </p>
            </div>
          </div>
          <Icon 
            name={isExpanded ? "ChevronDown" : "ChevronUp"} 
            className="w-4 h-4 text-text-secondary" 
          />
        </button>

        {/* Festival Countdown */}
        <div className="px-4 pb-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" className="w-4 h-4 text-accent" />
            <span className="text-sm font-caption text-text-primary">
              Festival in: 
              <span className="font-medium text-accent ml-1">
                {festivalCountdown}h
              </span>
            </span>
          </div>
        </div>

        {/* Expanded Quest List */}
        {isExpanded && (
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 space-y-3">
              {quests.map((quest) => (
                <button
                  key={quest.id}
                  onClick={() => handleQuestClick(quest)}
                  className="w-full text-left p-3 rounded-lg bg-background hover:bg-surface-200 border border-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 group"
                  aria-label={`Quest: ${quest.title}. ${quest.progress}% complete. Priority: ${quest.priority}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getPriorityIcon(quest.priority)} 
                        className={`w-4 h-4 ${getPriorityColor(quest.priority)}`} 
                      />
                      <span className="font-caption font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                        {quest.title}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary font-mono">
                      {quest.progress}%
                    </span>
                  </div>
                  
                  <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                    {quest.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-border rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(quest.progress)}`}
                      style={{ width: `${quest.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">
                      <Icon name="Clock" className="w-3 h-3 inline mr-1" />
                      {formatTimeRemaining(quest.timeRemaining)}
                    </span>
                    <span className="text-secondary font-caption">
                      <Icon name="Gift" className="w-3 h-3 inline mr-1" />
                      {quest.reward.split(',')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="border-t border-border p-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onQuestClick({ action: 'viewAll' })}
                  className="px-3 py-2 bg-primary text-white rounded-md text-xs font-caption font-medium hover:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  View All Quests
                </button>
                <button
                  onClick={() => onQuestClick({ action: 'trackNearest' })}
                  className="px-3 py-2 bg-secondary text-white rounded-md text-xs font-caption font-medium hover:bg-secondary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-300"
                >
                  Track Nearest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Urgent Quest Alert (when collapsed) */}
        {!isExpanded && urgentQuests.length > 0 && (
          <div className="px-4 pb-4">
            <div className="bg-error-50 border border-error-200 rounded-lg p-2">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" className="w-4 h-4 text-error flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-caption font-medium text-error">
                    {urgentQuests.length} urgent quest{urgentQuests.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-error-700 truncate">
                    {urgentQuests[0].title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Quick Quest Access */}
      <button
        onClick={() => onQuestClick({ action: 'quickAccess' })}
        className="mt-2 w-12 h-12 bg-accent text-white rounded-full shadow-warm-lg hover:bg-accent-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-300 flex items-center justify-center"
        aria-label="Quick quest actions"
        title="Quick Actions"
      >
        <Icon name="Zap" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuestProgressIndicator;