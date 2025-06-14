import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CraftingInterface = ({ recipes, inventoryItems, onItemSelect }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [craftingInProgress, setCraftingInProgress] = useState(false);
  const [craftingProgress, setCraftingProgress] = useState(0);
  const [craftingResult, setCraftingResult] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setCraftingResult(null);
  };

  const handleCraftItem = async (recipe) => {
    setCraftingInProgress(true);
    setCraftingProgress(0);
    
    // Simulate crafting progress
    const progressInterval = setInterval(() => {
      setCraftingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setCraftingInProgress(false);
          
          // Simulate success/failure based on success rate
          const isSuccess = Math.random() * 100 <= recipe.successRate;
          setCraftingResult({
            success: isSuccess,
            item: recipe.result,
            message: isSuccess 
              ? `Успешно создано: ${recipe.result.name}!`
              : 'Создание не удалось. Попробуйте еще раз.'
          });
          
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const canCraftRecipe = (recipe) => {
    return recipe.ingredients.every(ingredient => 
      ingredient.available >= ingredient.required
    );
  };

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

  const getSuccessRateColor = (rate) => {
    if (rate >= 80) return 'text-success';
    if (rate >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Crafting Header */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Flask" className="w-8 h-8 text-secondary" />
          <div>
            <h2 className="font-heading text-xl font-bold text-text-primary">
              Алхимическая лаборатория
            </h2>
            <p className="text-text-secondary font-body">
              Создавайте зелья и полезные предметы из собранных материалов
            </p>
          </div>
        </div>
        
        {craftingInProgress && (
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-caption font-medium text-text-primary">
                Создание в процессе...
              </span>
              <span className="font-caption text-text-secondary">
                {Math.round(craftingProgress)}%
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-secondary h-2 rounded-full transition-all duration-100"
                style={{ width: `${craftingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {craftingResult && (
          <div className={`rounded-lg p-4 ${craftingResult.success ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'}`}>
            <div className="flex items-center space-x-2">
              <Icon 
                name={craftingResult.success ? 'CheckCircle' : 'XCircle'} 
                className={`w-5 h-5 ${craftingResult.success ? 'text-success' : 'text-error'}`} 
              />
              <span className={`font-caption font-medium ${craftingResult.success ? 'text-success' : 'text-error'}`}>
                {craftingResult.message}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recipes.map((recipe) => {
          const canCraft = canCraftRecipe(recipe);
          const isSelected = selectedRecipe?.id === recipe.id;
          
          return (
            <div
              key={recipe.id}
              onClick={() => handleRecipeSelect(recipe)}
              className={`bg-surface rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-warm-md ${
                isSelected 
                  ? 'border-primary shadow-warm' 
                  : canCraft 
                    ? 'border-border hover:border-primary-300' :'border-border opacity-60'
              }`}
            >
              <div className="p-6">
                {/* Recipe Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                      <Icon name={recipe.result.icon} className={`w-6 h-6 ${getRarityColor(recipe.result.rarity)}`} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-text-primary">
                        {recipe.name}
                      </h3>
                      <p className={`text-sm font-caption ${getRarityColor(recipe.result.rarity)}`}>
                        {recipe.result.rarity === 'common' && 'Обычное'}
                        {recipe.result.rarity === 'uncommon' && 'Необычное'}
                        {recipe.result.rarity === 'rare' && 'Редкое'}
                        {recipe.result.rarity === 'epic' && 'Эпическое'}
                        {recipe.result.rarity === 'legendary' && 'Легендарное'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-caption font-medium ${getSuccessRateColor(recipe.successRate)}`}>
                      {recipe.successRate}%
                    </div>
                    <div className="text-xs text-text-secondary">
                      успех
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary font-body text-sm mb-4">
                  {recipe.description}
                </p>

                {/* Ingredients */}
                <div className="mb-4">
                  <h4 className="font-caption font-medium text-text-primary mb-2">
                    Ингредиенты:
                  </h4>
                  <div className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => {
                      const hasEnough = ingredient.available >= ingredient.required;
                      
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-body text-text-secondary">
                            {ingredient.name}
                          </span>
                          <span className={`text-sm font-caption font-medium ${
                            hasEnough ? 'text-success' : 'text-error'
                          }`}>
                            {ingredient.available}/{ingredient.required}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Crafting Info */}
                <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" className="w-3 h-3" />
                    <span>{recipe.craftingTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" className="w-3 h-3" />
                    <span>Алхимия</span>
                  </div>
                </div>

                {/* Craft Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCraftItem(recipe);
                  }}
                  disabled={!canCraft || craftingInProgress}
                  className={`w-full px-4 py-2 rounded-md font-caption font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    canCraft && !craftingInProgress
                      ? 'bg-primary text-white hover:bg-primary-600' :'bg-border text-text-secondary cursor-not-allowed'
                  }`}
                >
                  {craftingInProgress ? (
                    <>
                      <Icon name="Loader" className="w-4 h-4 mr-2 animate-spin" />
                      Создание...
                    </>
                  ) : canCraft ? (
                    <>
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Создать
                    </>
                  ) : (
                    <>
                      <Icon name="Lock" className="w-4 h-4 mr-2" />
                      Недостаточно материалов
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Crafting Tips */}
      <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-200">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading font-medium text-text-primary mb-2">
              Советы по алхимии
            </h3>
            <ul className="text-sm text-text-secondary font-body space-y-1">
              <li>• Более редкие ингредиенты увеличивают шанс успеха</li>
              <li>• Некоторые зелья имеют случайные эффекты</li>
              <li>• Неудачное создание не тратит все ингредиенты</li>
              <li>• Экспериментируйте с разными комбинациями</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftingInterface;