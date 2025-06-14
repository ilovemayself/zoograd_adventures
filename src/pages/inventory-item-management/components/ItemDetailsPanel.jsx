import React from 'react';
import Icon from 'components/AppIcon';

const ItemDetailsPanel = ({ item, onClose, onFavorite, isFavorite }) => {
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-text-secondary';
      case 'uncommon': return 'text-success';
      case 'rare': return 'text-secondary';
      case 'epic': return 'text-accent';
      case 'legendary': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getRarityLabel = (rarity) => {
    switch (rarity) {
      case 'common': return 'Обычный';
      case 'uncommon': return 'Необычный';
      case 'rare': return 'Редкий';
      case 'epic': return 'Эпический';
      case 'legendary': return 'Легендарный';
      default: return 'Неизвестный';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUseItem = () => {
    // Simulate item usage
    console.log(`Using item: ${item.name}`);
    // Could trigger item effect or open usage confirmation
  };

  const handleDropItem = () => {
    // Simulate item dropping
    console.log(`Dropping item: ${item.name}`);
    // Could open confirmation dialog
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-end lg:items-center justify-center p-4">
      <div className="bg-surface rounded-t-xl lg:rounded-xl shadow-warm-xl border border-border w-full max-w-md max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${getRarityColor(item.rarity)} bg-opacity-10`}>
              <Icon name={item.icon} className={`w-6 h-6 ${getRarityColor(item.rarity)}`} />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-text-primary">
                {item.name}
              </h2>
              <p className={`text-sm font-caption font-medium ${getRarityColor(item.rarity)}`}>
                {getRarityLabel(item.rarity)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onFavorite}
              className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                isFavorite 
                  ? 'bg-warning text-white' :'bg-background text-text-secondary hover:text-warning hover:bg-warning-50'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon name="Star" className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-background text-text-secondary hover:text-text-primary hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="Close item details"
            >
              <Icon name="X" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Quantity */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-secondary font-caption">Количество:</span>
            <span className="font-caption font-medium text-text-primary">
              {item.quantity} шт.
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-heading font-medium text-text-primary mb-2">
              Описание
            </h3>
            <p className="text-text-secondary font-body leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Usage */}
          <div className="mb-6">
            <h3 className="font-heading font-medium text-text-primary mb-2">
              Применение
            </h3>
            <p className="text-text-secondary font-body">
              {item.usage}
            </p>
          </div>

          {/* Item Stats */}
          <div className="bg-background rounded-lg p-4 mb-6">
            <h3 className="font-heading font-medium text-text-primary mb-3">
              Информация о предмете
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary font-caption">Категория:</span>
                <span className="font-caption text-text-primary capitalize">
                  {item.category === 'tools' && 'Инструменты'}
                  {item.category === 'materials' && 'Материалы'}
                  {item.category === 'potions' && 'Зелья'}
                  {item.category === 'quest' && 'Квестовые'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary font-caption">Получено:</span>
                <span className="font-caption text-text-primary">
                  {formatDate(item.acquiredDate)}
                </span>
              </div>
              {item.isNew && (
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary font-caption">Статус:</span>
                  <span className="font-caption text-accent font-medium">
                    <Icon name="Sparkles" className="w-3 h-3 inline mr-1" />
                    Новый предмет
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {item.category === 'potions' && (
              <button
                onClick={handleUseItem}
                className="w-full btn-primary"
              >
                <Icon name="Zap" className="w-4 h-4 mr-2" />
                Использовать
              </button>
            )}
            
            {item.category === 'tools' && (
              <button
                onClick={handleUseItem}
                className="w-full btn-secondary"
              >
                <Icon name="Wrench" className="w-4 h-4 mr-2" />
                Экипировать
              </button>
            )}
            
            {item.category === 'quest' && (
              <button
                onClick={handleUseItem}
                className="w-full btn-accent"
              >
                <Icon name="Target" className="w-4 h-4 mr-2" />
                Использовать в квесте
              </button>
            )}

            <button
              onClick={handleDropItem}
              className="w-full px-4 py-2 bg-background text-text-secondary border border-border rounded-md font-caption font-medium hover:bg-surface-200 hover:text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              <Icon name="Trash2" className="w-4 h-4 mr-2" />
              Выбросить предмет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPanel;