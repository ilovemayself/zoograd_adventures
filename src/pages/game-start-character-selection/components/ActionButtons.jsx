import React from 'react';
import Icon from 'components/AppIcon';

const ActionButtons = ({ 
  selectedCharacter, 
  hasGameState, 
  isLoading, 
  onStartNewGame, 
  onContinueGame 
}) => {
  return (
    <div className="max-w-md mx-auto px-4 space-y-4">
      {/* Start New Game Button */}
      <button
        onClick={onStartNewGame}
        disabled={!selectedCharacter || isLoading}
        className={`w-full py-4 px-6 rounded-xl font-heading font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
          selectedCharacter && !isLoading
            ? 'bg-primary text-white hover:bg-primary-600 shadow-warm-lg hover:shadow-warm-xl transform hover:scale-105'
            : 'bg-border text-text-tertiary cursor-not-allowed'
        }`}
        aria-label={selectedCharacter ? 'Начать новую игру' : 'Сначала выберите персонажа'}
      >
        <div className="flex items-center justify-center space-x-3">
          {isLoading ? (
            <>
              <Icon name="Loader" className="w-6 h-6 animate-spin" />
              <span>Загрузка...</span>
            </>
          ) : (
            <>
              <Icon name="Play" className="w-6 h-6" />
              <span>Начать новую игру</span>
            </>
          )}
        </div>
      </button>

      {/* Continue Game Button */}
      {hasGameState && (
        <button
          onClick={onContinueGame}
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-xl font-heading font-medium text-base bg-secondary text-white hover:bg-secondary-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-300 shadow-warm hover:shadow-warm-lg transform hover:scale-105"
          aria-label="Продолжить игру"
        >
          <div className="flex items-center justify-center space-x-3">
            <Icon name="RotateCcw" className="w-5 h-5" />
            <span>Продолжить игру</span>
          </div>
        </button>
      )}

      {/* Quick Start Options */}
      <div className="grid grid-cols-2 gap-3">
        <button
          className="py-3 px-4 rounded-lg font-caption font-medium text-sm bg-surface text-text-primary hover:bg-surface-200 border border-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label="Обучение"
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="BookOpen" className="w-4 h-4" />
            <span>Обучение</span>
          </div>
        </button>

        <button
          className="py-3 px-4 rounded-lg font-caption font-medium text-sm bg-surface text-text-primary hover:bg-surface-200 border border-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
          aria-label="Достижения"
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Trophy" className="w-4 h-4" />
            <span>Достижения</span>
          </div>
        </button>
      </div>

      {/* Character Selection Hint */}
      {!selectedCharacter && (
        <div className="text-center p-4 bg-warning-50 border border-warning-200 rounded-lg">
          <Icon name="Info" className="w-5 h-5 text-warning mx-auto mb-2" />
          <p className="text-sm text-warning-700 font-caption">
            Выберите персонажа выше, чтобы начать игру
          </p>
        </div>
      )}

      {/* Selected Character Preview */}
      {selectedCharacter && (
        <div className="text-center p-4 bg-success-50 border border-success-200 rounded-lg">
          <Icon name="CheckCircle" className="w-5 h-5 text-success mx-auto mb-2" />
          <p className="text-sm text-success-700 font-caption">
            Выбран: <strong>{selectedCharacter.name}</strong> ({selectedCharacter.profession})
          </p>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;