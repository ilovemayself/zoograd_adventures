import React from 'react';
import Icon from 'components/AppIcon';

const FestivalProgress = ({ countdown, totalProgress, urgentCount }) => {
  const formatCountdown = (hours) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.floor((hours - wholeHours) * 60);
    
    if (wholeHours > 24) {
      const days = Math.floor(wholeHours / 24);
      const remainingHours = wholeHours % 24;
      return `${days}д ${remainingHours}ч`;
    }
    
    return `${wholeHours}ч ${minutes}м`;
  };

  const getCountdownColor = (hours) => {
    if (hours <= 12) return 'text-error';
    if (hours <= 24) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="bg-surface border-b border-border shadow-warm sticky top-0 z-50">
      <div className="lg:ml-60">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Festival Countdown */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Calendar" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-caption text-text-secondary">
                    До фестиваля осталось
                  </p>
                  <p className={`font-heading font-bold text-lg ${getCountdownColor(countdown)}`}>
                    {formatCountdown(countdown)}
                  </p>
                </div>
              </div>
              
              {urgentCount > 0 && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-error-50 border border-error-200 rounded-lg">
                  <Icon name="AlertTriangle" className="w-4 h-4 text-error" />
                  <span className="text-sm font-caption font-medium text-error">
                    {urgentCount} срочных
                  </span>
                </div>
              )}
            </div>

            {/* Overall Progress */}
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="flex-1 sm:w-48">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-caption font-medium text-text-primary">
                    Общий прогресс
                  </span>
                  <span className="text-sm font-mono text-text-secondary">
                    {totalProgress}%
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(totalProgress)}`}
                    style={{ width: `${totalProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Trophy" className="w-5 h-5 text-secondary" />
                <span className="text-sm font-caption font-medium text-text-primary">
                  Готовность к фестивалю
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalProgress;