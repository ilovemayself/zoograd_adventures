import React from 'react';
import Icon from 'components/AppIcon';

const ItemGrid = ({ items, onItemSelect, onItemFavorite, favoriteItems }) => {
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-text-secondary';
      case 'uncommon': return 'border-success';
      case 'rare': return 'border-secondary';
      case 'epic': return 'border-accent';
      case 'legendary': return 'border-warning';
      default: return 'border-border';
    }
  };

  const getRarityBg = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-surface';
      case 'uncommon': return 'bg-success-50';
      case 'rare': return 'bg-secondary-50';
      case 'epic': return 'bg-accent-50';
      case 'legendary': return 'bg-warning-50';
      default: return 'bg-surface';
    }
  };

  const handleItemClick = (item) => {
    onItemSelect(item);
  };

  const handleFavoriteClick = (e, itemId) => {
    e.stopPropagation();
    onItemFavorite(itemId);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Package" className="w-16 h-16 text-text-secondary mx-auto mb-4" />
        <h3 className="font-heading text-lg font-medium text-text-primary mb-2">
          Предметы не найдены
        </h3>
        <p className="text-text-secondary font-body">
          Попробуйте изменить фильтры или поисковый запрос
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
      {items.map((item) => {
        const isFavorite = favoriteItems.includes(item.id) || item.isFavorite;
        
        return (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`relative aspect-square rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-warm-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${getRarityColor(item.rarity)} ${getRarityBg(item.rarity)} group`}
            role="button"
            tabIndex={0}
            aria-label={`${item.name} (${item.quantity})`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemClick(item);
              }
            }}
          >
            {/* New Item Indicator */}
            {item.isNew && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse z-10"></div>
            )}

            {/* Favorite Button */}
            <button
              onClick={(e) => handleFavoriteClick(e, item.id)}
              className={`absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 z-10 ${
                isFavorite 
                  ? 'bg-warning text-white' :'bg-black bg-opacity-20 text-white opacity-0 group-hover:opacity-100'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon name={isFavorite ? 'Star' : 'Star'} className="w-3 h-3" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>

            {/* Item Icon */}
            <div className="flex items-center justify-center h-full p-2">
              <Icon 
                name={item.icon} 
                className="w-8 h-8 text-text-primary group-hover:text-primary transition-colors duration-200" 
              />
            </div>

            {/* Quantity Badge */}
            {item.quantity > 1 && (
              <div className="absolute bottom-1 right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption font-medium">
                {item.quantity > 99 ? '99+' : item.quantity}
              </div>
            )}

            {/* Item Name Tooltip on Hover (Desktop) */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 hidden lg:block">
              {item.name}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-text-primary"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemGrid;