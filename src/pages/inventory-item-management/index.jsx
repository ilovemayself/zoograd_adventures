import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import GameTabNavigation from 'components/ui/GameTabNavigation';
import ItemGrid from './components/ItemGrid';
import ItemDetailsPanel from './components/ItemDetailsPanel';
import CraftingInterface from './components/CraftingInterface';
import FavoritesBar from './components/FavoritesBar';

const InventoryItemManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [showItemDetails, setShowItemDetails] = useState(false);

  const categories = [
    { id: 'all', name: 'Все предметы', icon: 'Package' },
    { id: 'tools', name: 'Инструменты', icon: 'Wrench' },
    { id: 'materials', name: 'Материалы', icon: 'Gem' },
    { id: 'potions', name: 'Зелья', icon: 'Flask' },
    { id: 'quest', name: 'Квестовые', icon: 'ScrollText' }
  ];

  const inventoryItems = [
    {
      id: 1,
      name: 'Молоток строителя',
      description: 'Прочный молоток, принадлежащий бобру-строителю. Идеально подходит для ремонтных работ и строительства.',
      category: 'tools',
      rarity: 'common',
      quantity: 1,
      icon: 'Hammer',
      usage: 'Используется для ремонта сцены и строительных работ',
      isNew: false,
      isFavorite: false,
      acquiredDate: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      name: 'Фестивальный баннер',
      description: 'Красочный баннер для украшения фестиваля. Найден в старом складе после долгих поисков.',
      category: 'quest',
      rarity: 'rare',
      quantity: 1,
      icon: 'Flag',
      usage: 'Ключевой предмет для подготовки к фестивалю',
      isNew: true,
      isFavorite: true,
      acquiredDate: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      name: 'Лечебное зелье',
      description: 'Восстанавливает здоровье и энергию. Сварено опытным алхимиком из редких трав.',
      category: 'potions',
      rarity: 'uncommon',
      quantity: 5,
      icon: 'Heart',
      usage: 'Восстанавливает 50 единиц здоровья',
      isNew: false,
      isFavorite: true,
      acquiredDate: new Date(Date.now() - 172800000)
    },
    {
      id: 4,
      name: 'Магический кристалл',
      description: 'Светящийся кристалл с магическими свойствами. Может использоваться для создания зелий.',
      category: 'materials',
      rarity: 'epic',
      quantity: 3,
      icon: 'Gem',
      usage: 'Ингредиент для создания мощных зелий',
      isNew: false,
      isFavorite: false,
      acquiredDate: new Date(Date.now() - 259200000)
    },
    {
      id: 5,
      name: 'Полевые цветы',
      description: 'Красивые дикие цветы, собранные на лугу. Идеально подходят для украшения фестиваля.',
      category: 'materials',
      rarity: 'common',
      quantity: 15,
      icon: 'Flower',
      usage: 'Материал для создания украшений',
      isNew: false,
      isFavorite: false,
      acquiredDate: new Date(Date.now() - 345600000)
    },
    {
      id: 6,
      name: 'Древний ключ',
      description: 'Старинный ключ, найденный в библиотеке. Возможно, открывает что-то важное.',
      category: 'quest',
      rarity: 'legendary',
      quantity: 1,
      icon: 'Key',
      usage: 'Открывает секретные двери и сундуки',
      isNew: false,
      isFavorite: true,
      acquiredDate: new Date(Date.now() - 432000000)
    },
    {
      id: 7,
      name: 'Хлеб пекаря',
      description: 'Свежий хлеб от местного пекаря. Восстанавливает энергию и поднимает настроение.',
      category: 'potions',
      rarity: 'common',
      quantity: 8,
      icon: 'Cookie',
      usage: 'Восстанавливает 20 единиц энергии',
      isNew: false,
      isFavorite: false,
      acquiredDate: new Date(Date.now() - 518400000)
    },
    {
      id: 8,
      name: 'Золотые монеты',
      description: 'Блестящие золотые монеты - универсальная валюта в Зооград.',
      category: 'materials',
      rarity: 'uncommon',
      quantity: 127,
      icon: 'Coins',
      usage: 'Используется для покупок и торговли',
      isNew: false,
      isFavorite: false,
      acquiredDate: new Date(Date.now() - 604800000)
    },
    {
      id: 9,
      name: 'Зелье невидимости',
      description: 'Экспериментальное зелье, созданное хамелеоном. Эффект непредсказуем.',
      category: 'potions',
      rarity: 'rare',
      quantity: 2,
      icon: 'Eye',
      usage: 'Временно делает невидимым (эффект случайный)',
      isNew: true,
      isFavorite: false,
      acquiredDate: new Date(Date.now() - 7200000)
    },
    {
      id: 10,
      name: 'Почтовые письма',
      description: 'Стопка писем для доставки жителям города. Важная работа почтальона.',
      category: 'quest',
      rarity: 'common',
      quantity: 12,
      icon: 'Mail',
      usage: 'Доставляется различным персонажам',
      isNew: false,
      isFavorite: false,
      acquiredDate: new Date(Date.now() - 691200000)
    }
  ];

  const craftingRecipes = [
    {
      id: 1,
      name: 'Зелье силы',
      description: 'Увеличивает физическую силу на короткое время',
      ingredients: [
        { itemId: 4, name: 'Магический кристалл', required: 1, available: 3 },
        { itemId: 5, name: 'Полевые цветы', required: 3, available: 15 }
      ],
      result: { name: 'Зелье силы', icon: 'Zap', rarity: 'uncommon' },
      successRate: 85,
      craftingTime: '5 минут'
    },
    {
      id: 2,
      name: 'Эликсир удачи',
      description: 'Повышает шансы на успех в различных действиях',
      ingredients: [
        { itemId: 4, name: 'Магический кристалл', required: 2, available: 3 },
        { itemId: 8, name: 'Золотые монеты', required: 10, available: 127 }
      ],
      result: { name: 'Эликсир удачи', icon: 'Star', rarity: 'rare' },
      successRate: 60,
      craftingTime: '10 минут'
    },
    {
      id: 3,
      name: 'Хлеб с травами',
      description: 'Питательный хлеб с лечебными травами',
      ingredients: [
        { itemId: 7, name: 'Хлеб пекаря', required: 2, available: 8 },
        { itemId: 5, name: 'Полевые цветы', required: 5, available: 15 }
      ],
      result: { name: 'Хлеб с травами', icon: 'Cookie', rarity: 'common' },
      successRate: 95,
      craftingTime: '3 минуты'
    }
  ];

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  const handleItemFavorite = (itemId) => {
    setFavoriteItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedItem(null);
    setShowItemDetails(false);
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rarity':
        const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      case 'quantity':
        return b.quantity - a.quantity;
      case 'recent':
      default:
        return b.acquiredDate - a.acquiredDate;
    }
  });

  const favoriteItemsData = inventoryItems.filter(item => 
    favoriteItems.includes(item.id) || item.isFavorite
  );

  useEffect(() => {
    // Initialize favorite items from item data
    const initialFavorites = inventoryItems
      .filter(item => item.isFavorite)
      .map(item => item.id);
    setFavoriteItems(initialFavorites);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <GameTabNavigation />
      
      <div className="lg:ml-60">
        {/* Header */}
        <div className="bg-surface border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-heading text-2xl lg:text-3xl font-bold text-primary">
                Инвентарь
              </h1>
              <p className="text-text-secondary font-body mt-1">
                Управление предметами и создание зелий
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-primary-50 px-3 py-1 rounded-full">
                <span className="text-sm font-caption font-medium text-primary">
                  {inventoryItems.length}/50 предметов
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-background rounded-lg p-1">
            <button
              onClick={() => handleTabChange('inventory')}
              className={`flex-1 px-4 py-2 rounded-md font-caption font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                activeTab === 'inventory' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name="Package" className="w-4 h-4 inline mr-2" />
              Инвентарь
            </button>
            <button
              onClick={() => handleTabChange('crafting')}
              className={`flex-1 px-4 py-2 rounded-md font-caption font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                activeTab === 'crafting' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name="Flask" className="w-4 h-4 inline mr-2" />
              Создание
            </button>
          </div>
        </div>

        {/* Favorites Bar */}
        <FavoritesBar 
          favoriteItems={favoriteItemsData}
          onItemSelect={handleItemSelect}
          onItemFavorite={handleItemFavorite}
        />

        {/* Main Content */}
        <div className="p-4 lg:p-6">
          {activeTab === 'inventory' && (
            <>
              {/* Search and Filters */}
              <div className="mb-6">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Поиск предметов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap font-caption font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-200 border border-border'
                      }`}
                    >
                      <Icon name={category.icon} className="w-4 h-4" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* Sort Options */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary font-caption">Сортировка:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="bg-surface border border-border rounded-md px-3 py-1 text-sm font-caption focus:outline-none focus:ring-2 focus:ring-primary-300"
                    >
                      <option value="recent">По дате получения</option>
                      <option value="name">По названию</option>
                      <option value="rarity">По редкости</option>
                      <option value="quantity">По количеству</option>
                    </select>
                  </div>
                  
                  <span className="text-sm text-text-secondary font-caption">
                    Найдено: {sortedItems.length}
                  </span>
                </div>
              </div>

              {/* Item Grid */}
              <ItemGrid 
                items={sortedItems}
                onItemSelect={handleItemSelect}
                onItemFavorite={handleItemFavorite}
                favoriteItems={favoriteItems}
              />
            </>
          )}

          {activeTab === 'crafting' && (
            <CraftingInterface 
              recipes={craftingRecipes}
              inventoryItems={inventoryItems}
              onItemSelect={handleItemSelect}
            />
          )}
        </div>

        {/* Item Details Panel */}
        {showItemDetails && selectedItem && (
          <ItemDetailsPanel 
            item={selectedItem}
            onClose={() => setShowItemDetails(false)}
            onFavorite={() => handleItemFavorite(selectedItem.id)}
            isFavorite={favoriteItems.includes(selectedItem.id) || selectedItem.isFavorite}
          />
        )}
      </div>
    </div>
  );
};

export default InventoryItemManagement;