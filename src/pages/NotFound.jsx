import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/game-start-character-selection');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <Icon name="MapPin" className="w-24 h-24 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-4xl font-bold text-primary mb-2">404</h1>
          <h2 className="font-heading text-xl text-text-primary mb-4">Страница не найдена</h2>
          <p className="text-text-secondary font-body">
            Похоже, вы заблудились в Зооград! Эта страница не существует.
          </p>
        </div>
        
        <button
          onClick={handleGoHome}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Icon name="Home" className="w-5 h-5" />
          <span>Вернуться в игру</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;