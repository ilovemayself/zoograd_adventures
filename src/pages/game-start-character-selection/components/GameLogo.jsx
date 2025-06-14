import React from 'react';
import Icon from 'components/AppIcon';

const GameLogo = () => {
  return (
    <div className="text-center">
      {/* Main Logo */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          {/* Logo Background Circle */}
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary to-primary-600 rounded-full shadow-warm-lg flex items-center justify-center">
            <Icon name="Castle" className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full shadow-warm animate-pulse">
            <Icon name="Star" className="w-4 h-4 text-white m-1" />
          </div>
          <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-accent rounded-full shadow-warm animate-pulse delay-500">
            <Icon name="Heart" className="w-2 h-2 text-white m-1" />
          </div>
        </div>
      </div>

      {/* Game Title */}
      <h1 className="font-heading text-4xl lg:text-6xl font-bold text-primary mb-2 text-shadow-warm">
        Зооград
      </h1>
      <h2 className="font-heading text-xl lg:text-2xl font-medium text-secondary mb-4">
        Приключения
      </h2>

      {/* Subtitle */}
      <p className="text-text-secondary font-body text-sm lg:text-base max-w-md mx-auto leading-relaxed">
        Добро пожаловать в удивительный город, где животные живут как люди и каждый день полон приключений!
      </p>

      {/* Decorative Border */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary"></div>
        <Icon name="Sparkles" className="w-5 h-5 text-accent animate-pulse" />
        <div className="w-16 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary"></div>
        <Icon name="Sparkles" className="w-5 h-5 text-accent animate-pulse delay-300" />
        <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary"></div>
      </div>

      {/* Version Info */}
      <div className="mt-4 text-xs text-text-tertiary font-caption">
        Версия 1.0.0 • Бета
      </div>
    </div>
  );
};

export default GameLogo;