import React from 'react';
import Icon from 'components/AppIcon';

const QuestFilters = ({ activeFilter, onFilterChange, questCounts }) => {
  const filters = [
    {
      id: 'all',
      label: 'Все',
      icon: 'List',
      count: questCounts.all,
      color: 'text-text-primary'
    },
    {
      id: 'main',
      label: 'Основные',
      icon: 'Star',
      count: questCounts.main,
      color: 'text-primary'
    },
    {
      id: 'side',
      label: 'Побочные',
      icon: 'Circle',
      count: questCounts.side,
      color: 'text-secondary'
    },
    {
      id: 'festival',
      label: 'Фестиваль',
      icon: 'Calendar',
      count: questCounts.festival,
      color: 'text-accent'
    },
    {
      id: 'character',
      label: 'Персонажи',
      icon: 'Users',
      count: questCounts.character,
      color: 'text-success'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-caption font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
            activeFilter === filter.id
              ? 'bg-primary text-white shadow-warm'
              : 'bg-surface text-text-primary hover:bg-surface-200'
          }`}
          aria-label={`Фильтр: ${filter.label} (${filter.count} квестов)`}
        >
          <Icon 
            name={filter.icon} 
            className={`w-4 h-4 ${
              activeFilter === filter.id ? 'text-white' : filter.color
            }`} 
          />
          <span>{filter.label}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeFilter === filter.id
              ? 'bg-white bg-opacity-20 text-white' :'bg-background text-text-secondary'
          }`}>
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QuestFilters;