import React from 'react';
import Icon from 'components/AppIcon';

const FavoritesBar = ({ favoriteItems, onItemSelect, onItemFavorite }) => {
  if (favoriteItems.length === 0) {
    return (
      <div className="bg-surface border-b border-border p-4">
        <div className="flex items-center justify-center space-x-2 text-text-secondary">
          <Icon name="Star" className="w-4 h-4" />
          <span className="text-sm font-caption">
            Добавьте предметы в избранное для быстрого доступа
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex items-center space-x-3 mb-3">
        <Icon name="Star" className="w-5 h-5 text-warning" />
        <h3 className="font-heading font-medium text-text-primary">
          Избранные предметы
        </h3>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {favoriteItems.slice(0, 8).map((item) => (
          <button
            key={item.id}
            onClick={() => onItemSelect(item)}
            className="flex-shrink-0 relative w-12 h-12 bg-background rounded-lg border border-border hover:border-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 group"
            aria-label={`${item.name} (${item.quantity})`}
            title={item.name}
          >
            <div className="flex items-center justify-center h-full">
              <Icon 
                name={item.icon} 
                className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors duration-200" 
              />
            </div>
            
            {/* Quantity Badge */}
            {item.quantity > 1 && (
              <div className="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-caption font-medium">
                {item.quantity > 99 ? '99+' : item.quantity}
              </div>
            )}

            {/* Remove from Favorites */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onItemFavorite(item.id);
              }}
              className="absolute -top-1 -left-1 w-4 h-4 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:opacity-100"
              aria-label="Remove from favorites"
            >
              <Icon name="X" className="w-2 h-2" />
            </button>
          </button>
        ))}
        
        {favoriteItems.length > 8 && (
          <div className="flex-shrink-0 w-12 h-12 bg-background rounded-lg border border-border flex items-center justify-center">
            <span className="text-xs font-caption text-text-secondary">
              +{favoriteItems.length - 8}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesBar;