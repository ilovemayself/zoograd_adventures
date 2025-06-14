import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ResponseOptions = ({ 
  responses = [], 
  onSelect = () => {}, 
  disabled = false, 
  className = '', 
  desktop = false 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (response) => {
    if (disabled) return;
    
    setSelectedOption(response.id);
    setTimeout(() => {
      onSelect(response);
      setSelectedOption(null);
    }, 200);
  };

  const getResponseTypeIcon = (type) => {
    switch (type) {
      case 'quest':
        return 'ScrollText';
      case 'ability':
        return 'Zap';
      case 'item':
        return 'Package';
      case 'info':
        return 'Info';
      default:
        return 'MessageSquare';
    }
  };

  const getResponseTypeColor = (type) => {
    switch (type) {
      case 'quest':
        return 'text-secondary';
      case 'ability':
        return 'text-accent';
      case 'item':
        return 'text-primary';
      case 'info':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getResponseTypeBadge = (type) => {
    switch (type) {
      case 'quest':
        return { text: 'Квест', color: 'bg-secondary-100 text-secondary-700' };
      case 'ability':
        return { text: 'Способность', color: 'bg-accent-100 text-accent-700' };
      case 'item':
        return { text: 'Предмет', color: 'bg-primary-100 text-primary-700' };
      case 'info':
        return { text: 'Информация', color: 'bg-surface-200 text-text-secondary' };
      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="font-heading font-medium text-text-primary mb-2">
          Выберите ответ:
        </h3>
        {disabled && (
          <p className="text-sm text-text-secondary font-caption flex items-center space-x-2">
            <Icon name="Clock" className="w-4 h-4" />
            <span>Персонаж печатает...</span>
          </p>
        )}
      </div>

      <div className="space-y-3">
        {responses.map((response, index) => {
          const badge = getResponseTypeBadge(response.type);
          const isSelected = selectedOption === response.id;
          
          return (
            <button
              key={response.id}
              onClick={() => handleOptionClick(response)}
              disabled={disabled}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 group ${
                disabled 
                  ? 'bg-surface-100 border-border cursor-not-allowed opacity-50' 
                  : isSelected
                    ? 'bg-primary-100 border-primary-300 shadow-warm'
                    : 'bg-surface border-border hover:bg-surface-200 hover:border-primary-200 hover:shadow-warm'
              }`}
              aria-label={`Вариант ${index + 1}: ${response.text}`}
            >
              <div className="flex items-start space-x-3">
                {/* Option Number */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-caption font-medium transition-colors duration-200 ${
                  disabled
                    ? 'bg-surface-200 text-text-tertiary'
                    : isSelected
                      ? 'bg-primary text-white' :'bg-primary-100 text-primary group-hover:bg-primary group-hover:text-white'
                }`}>
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Response Text */}
                  <p className={`font-body mb-2 transition-colors duration-200 ${
                    disabled 
                      ? 'text-text-tertiary' 
                      : isSelected
                        ? 'text-primary-700' :'text-text-primary group-hover:text-primary'
                  } ${desktop ? 'text-base' : 'text-sm'}`}>
                    {response.text}
                  </p>

                  {/* Response Metadata */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Type Badge */}
                      {badge && (
                        <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${badge.color}`}>
                          {badge.text}
                        </span>
                      )}

                      {/* Special Indicators */}
                      {response.requiresInventory && (
                        <div className="flex items-center space-x-1 text-primary">
                          <Icon name="Package" className="w-3 h-3" />
                          <span className="text-xs font-caption">Инвентарь</span>
                        </div>
                      )}

                      {response.triggersAbility && (
                        <div className="flex items-center space-x-1 text-accent">
                          <Icon name="Zap" className="w-3 h-3" />
                          <span className="text-xs font-caption">Способность</span>
                        </div>
                      )}

                      {response.relationshipChange > 0 && (
                        <div className="flex items-center space-x-1 text-success">
                          <Icon name="Heart" className="w-3 h-3" />
                          <span className="text-xs font-caption">+{response.relationshipChange}</span>
                        </div>
                      )}
                    </div>

                    {/* Type Icon */}
                    <Icon 
                      name={getResponseTypeIcon(response.type)} 
                      className={`w-4 h-4 ${getResponseTypeColor(response.type)} ${
                        !disabled && 'group-hover:text-primary'
                      } transition-colors duration-200`} 
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard Shortcuts Hint */}
      {!disabled && (
        <div className="mt-4 text-xs text-text-tertiary font-caption text-center">
          Используйте клавиши 1-{responses.length} для быстрого выбора
        </div>
      )}

      {/* Empty State */}
      {responses.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageSquare" className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
          <p className="text-text-secondary font-caption">
            Нет доступных вариантов ответа
          </p>
        </div>
      )}
    </div>
  );
};

export default ResponseOptions;