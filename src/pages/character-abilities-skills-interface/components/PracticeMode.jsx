import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const PracticeMode = ({ ability, character, onClose }) => {
  const [practiceStep, setPracticeStep] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);

  const practiceScenarios = {
    construction: [
      {
        title: 'Ремонт моста',
        description: 'Мост через реку поврежден. Используйте способность быстрого строительства для его восстановления.',
        instruction: 'Нажмите и удерживайте кнопку "Строить" для активации способности',
        successMessage: 'Отлично! Мост восстановлен за рекордное время!',
        tips: 'Совет: Анализируйте материалы перед началом работы'
      },
      {
        title: 'Укрепление сцены',
        description: 'Фестивальная сцена нуждается в укреплении перед выступлениями.',
        instruction: 'Выберите правильную последовательность действий для укрепления',
        successMessage: 'Превосходно! Сцена теперь выдержит любое выступление!',
        tips: 'Совет: Проверьте все соединения дважды'
      }
    ],
    camouflage: [
      {
        title: 'Скрытое наблюдение',
        description: 'Наблюдайте за подозрительным персонажем, не выдавая своего присутствия.',
        instruction: 'Активируйте маскировку и оставайтесь неподвижными',
        successMessage: 'Идеально! Вы остались незамеченными!',
        tips: 'Совет: Выбирайте фон, который лучше всего подходит для маскировки'
      },
      {
        title: 'Избегание конфликта',
        description: 'Группа агрессивных персонажей приближается. Избегите конфронтации.',
        instruction: 'Быстро найдите укрытие и активируйте камуфляж',
        successMessage: 'Отлично! Конфликт успешно избежан!',
        tips: 'Совет: Движение нарушает маскировку'
      }
    ],
    night_vision: [
      {
        title: 'Ночной поиск',
        description: 'В темном складе спрятана важная улика. Найдите её используя ночное зрение.',
        instruction: 'Активируйте ночное зрение и исследуйте помещение',
        successMessage: 'Великолепно! Улика найдена!',
        tips: 'Совет: Ночное зрение работает лучше в полной темноте'
      }
    ],
    scent_tracking: [
      {
        title: 'Поиск по следу',
        description: 'Пропавший житель оставил запаховый след. Проследите его путь.',
        instruction: 'Следуйте по запаховому следу, избегая отвлекающих ароматов',
        successMessage: 'Превосходно! След приведет к цели!',
        tips: 'Совет: Свежие следы легче отследить'
      }
    ]
  };

  const currentScenarios = practiceScenarios[ability.id] || practiceScenarios.construction;
  const currentScenario = currentScenarios[practiceStep] || currentScenarios[0];

  useEffect(() => {
    let timer;
    if (isActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handlePracticeEnd();
    }
    return () => clearTimeout(timer);
  }, [isActive, timeRemaining]);

  const handleStartPractice = () => {
    setIsActive(true);
    setTimeRemaining(30);
    setFeedback('');
  };

  const handlePracticeAction = () => {
    if (!isActive) return;

    const success = Math.random() > 0.3; // 70% success rate
    const points = success ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 30) + 10;
    
    setPracticeScore(prev => prev + points);
    setFeedback(success ? currentScenario.successMessage : 'Попробуйте еще раз! Практика - путь к совершенству.');
    
    if (success && practiceStep < currentScenarios.length - 1) {
      setTimeout(() => {
        setPracticeStep(prev => prev + 1);
        setTimeRemaining(30);
        setFeedback('');
      }, 2000);
    } else if (success) {
      handlePracticeEnd();
    }
  };

  const handlePracticeEnd = () => {
    setIsActive(false);
    setFeedback(`Тренировка завершена! Итоговый счет: ${practiceScore} очков`);
  };

  const handleRestart = () => {
    setPracticeStep(0);
    setPracticeScore(0);
    setIsActive(false);
    setFeedback('');
    setTimeRemaining(30);
  };

  return (
    <div className="dialogue-overlay">
      <div className="bg-surface rounded-xl shadow-warm-xl border border-border max-w-4xl w-full mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <Icon name={ability.icon} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-primary">
                Тренировка: {ability.name}
              </h2>
              <p className="text-text-secondary font-body">
                Персонаж: {character.name}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-background text-text-secondary hover:text-text-primary hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            aria-label="Close practice mode"
          >
            <Icon name="X" className="w-5 h-5" />
          </button>
        </div>

        {/* Practice Area */}
        <div className="p-6">
          {/* Scenario Info */}
          <div className="bg-background rounded-lg p-6 mb-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-heading text-lg font-bold text-primary mb-2">
                  {currentScenario.title}
                </h3>
                <p className="text-text-secondary font-body mb-4">
                  {currentScenario.description}
                </p>
                <div className="bg-primary-50 rounded-lg p-3 border border-primary-200">
                  <p className="text-primary font-caption font-medium">
                    {currentScenario.instruction}
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="ml-6 text-right">
                <div className="bg-surface rounded-lg p-4 border border-border">
                  <div className="mb-3">
                    <p className="text-xs font-caption text-text-secondary">Счет</p>
                    <p className="text-2xl font-bold text-secondary">{practiceScore}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-caption text-text-secondary">Время</p>
                    <p className={`text-lg font-bold ${timeRemaining <= 10 ? 'text-error' : 'text-primary'}`}>
                      {timeRemaining}с
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-caption text-text-secondary">Этап</p>
                    <p className="text-lg font-bold text-accent">
                      {practiceStep + 1}/{currentScenarios.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Action Area */}
            <div className="bg-surface rounded-lg p-6 border border-border">
              <h4 className="font-caption font-bold text-text-primary mb-4">
                Область действий
              </h4>
              
              <div className="space-y-4">
                {!isActive ? (
                  <button
                    onClick={handleStartPractice}
                    className="w-full btn-primary"
                  >
                    <Icon name="Play" className="w-4 h-4 mr-2" />
                    Начать тренировку
                  </button>
                ) : (
                  <button
                    onClick={handlePracticeAction}
                    className="w-full btn-accent animate-pulse-glow"
                    disabled={timeRemaining === 0}
                  >
                    <Icon name={ability.icon} className="w-4 h-4 mr-2" />
                    Использовать {ability.name}
                  </button>
                )}
                
                <button
                  onClick={handleRestart}
                  className="w-full bg-secondary text-white px-4 py-2 rounded-md font-caption font-medium hover:bg-secondary-600 transition-colors duration-200"
                >
                  <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
                  Начать заново
                </button>
              </div>
            </div>

            {/* Tips & Feedback */}
            <div className="bg-surface rounded-lg p-6 border border-border">
              <h4 className="font-caption font-bold text-text-primary mb-4">
                Советы и обратная связь
              </h4>
              
              {feedback && (
                <div className={`rounded-lg p-4 mb-4 ${
                  feedback.includes('Отлично') || feedback.includes('Превосходно') || feedback.includes('Идеально')
                    ? 'bg-success-50 border border-success-200 text-success-700' : feedback.includes('завершена')
                    ? 'bg-primary-50 border border-primary-200 text-primary-700' :'bg-warning-50 border border-warning-200 text-warning-700'
                }`}>
                  <p className="font-caption font-medium">{feedback}</p>
                </div>
              )}
              
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-text-secondary">
                    {currentScenario.tips}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-caption text-text-secondary">Прогресс тренировки</span>
              <span className="text-sm font-caption text-text-primary">
                {practiceStep + 1} из {currentScenarios.length}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${((practiceStep + 1) / currentScenarios.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeMode;