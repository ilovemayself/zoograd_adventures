import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const QuestCard = ({ quest, onClick, onNavigate }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-error bg-error-50';
      case 'medium': return 'border-warning bg-warning-50';
      case 'low': return 'border-success bg-success-50';
      default: return 'border-border bg-surface';
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'main': return 'bg-primary text-white';
      case 'side': return 'bg-secondary text-white';
      case 'festival': return 'bg-accent text-white';
      case 'character': return 'bg-success text-white';
      default: return 'bg-surface text-text-primary';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'main': return 'Основной';
      case 'side': return 'Побочный';
      case 'festival': return 'Фестиваль';
      case 'character': return 'Персонаж';
      default: return 'Квест';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const formatTimeRemaining = (timeStr) => {
    if (!timeStr) return 'Без ограничений';
    const hours = parseInt(timeStr);
    if (hours <= 1) return `${timeStr} (Срочно!)`;
    if (hours <= 4) return `${timeStr} (Скоро)`;
    return timeStr;
  };

  return (
    <div 
      className={`card cursor-pointer transition-all duration-200 hover:shadow-warm-md hover:-translate-y-1 ${
        quest.isUrgent ? 'ring-2 ring-error animate-pulse-glow' : ''
      } ${getPriorityColor(quest.priority)}`}
      onClick={onClick}
    >
      {/* Quest Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image 
              src={quest.questGiver.avatar}
              alt={quest.questGiver.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-medium text-text-primary truncate">
              {quest.title}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {quest.questGiver.name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Icon 
            name={getPriorityIcon(quest.priority)} 
            className={`w-4 h-4 ${
              quest.priority === 'high' ? 'text-error' :
              quest.priority === 'medium' ? 'text-warning' : 'text-success'
            }`} 
          />
          {quest.isUrgent && (
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Quest Description */}
      <p className="text-sm text-text-secondary font-body mb-4 line-clamp-2">
        {quest.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-caption font-medium text-text-primary">
            Прогресс
          </span>
          <span className="text-sm font-mono text-text-secondary">
            {quest.progress}%
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(quest.progress)}`}
            style={{ width: `${quest.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Quest Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" className="w-4 h-4 text-text-secondary" />
            <span className="text-text-secondary font-body">{quest.location}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
            className="text-primary hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:underline"
            aria-label="Перейти к локации"
          >
            <Icon name="Navigation" className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" className="w-4 h-4 text-text-secondary" />
          <span className="text-text-secondary font-body">
            {formatTimeRemaining(quest.timeRemaining)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Zap" className="w-4 h-4 text-text-secondary" />
          <span className="text-text-secondary font-body">
            ~{quest.estimatedTime}
          </span>
        </div>
      </div>

      {/* Category and Rewards */}
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getCategoryColor(quest.category)}`}>
          {getCategoryLabel(quest.category)}
        </span>
        
        <div className="flex items-center space-x-1">
          <Icon name="Gift" className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary font-caption">
            {quest.rewards[0]}
          </span>
          {quest.rewards.length > 1 && (
            <span className="text-xs text-text-secondary">
              +{quest.rewards.length - 1}
            </span>
          )}
        </div>
      </div>

      {/* Objectives Preview */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-caption font-medium text-text-primary">
            Задачи ({quest.objectives.filter(obj => obj.completed).length}/{quest.objectives.length})
          </span>
          <Icon name="ChevronRight" className="w-4 h-4 text-text-secondary" />
        </div>
      </div>
    </div>
  );
};

export default QuestCard;