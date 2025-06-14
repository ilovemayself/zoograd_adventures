import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const QuestDetails = ({ quest, onClose, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('objectives');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'hard': return 'text-error';
      case 'medium': return 'text-warning';
      case 'easy': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'hard': return 'Сложно';
      case 'medium': return 'Средне';
      case 'easy': return 'Легко';
      default: return 'Неизвестно';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="dialogue-overlay" onClick={onClose}>
      <div 
        className="bg-surface rounded-xl shadow-warm-xl border border-border max-w-2xl w-full mx-4 animate-fade-in max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image 
                src={quest.questGiver.avatar}
                alt={quest.questGiver.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-text-primary">
                {quest.title}
              </h2>
              <p className="text-text-secondary font-caption">
                {quest.questGiver.name} • {quest.questGiver.profession}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-background text-text-secondary hover:text-text-primary hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            aria-label="Закрыть детали квеста"
          >
            <Icon name="X" className="w-5 h-5" />
          </button>
        </div>

        {/* Quest Info Bar */}
        <div className="px-6 py-4 bg-background border-b border-border flex-shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Target" className="w-4 h-4 text-primary" />
              <div>
                <p className="text-text-secondary font-caption">Прогресс</p>
                <p className="font-medium text-text-primary">{quest.progress}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-text-secondary font-caption">Время</p>
                <p className="font-medium text-text-primary">{quest.timeRemaining}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" className={`w-4 h-4 ${getDifficultyColor(quest.difficulty)}`} />
              <div>
                <p className="text-text-secondary font-caption">Сложность</p>
                <p className={`font-medium ${getDifficultyColor(quest.difficulty)}`}>
                  {getDifficultyLabel(quest.difficulty)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" className="w-4 h-4 text-accent" />
              <div>
                <p className="text-text-secondary font-caption">Локация</p>
                <button
                  onClick={onNavigate}
                  className="font-medium text-accent hover:text-accent-600 transition-colors duration-200 focus:outline-none focus:underline"
                >
                  {quest.location}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="w-full bg-border rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(quest.progress)}`}
              style={{ width: `${quest.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border flex-shrink-0">
          {[
            { id: 'objectives', label: 'Задачи', icon: 'CheckSquare' },
            { id: 'description', label: 'Описание', icon: 'FileText' },
            { id: 'rewards', label: 'Награды', icon: 'Gift' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 flex items-center justify-center space-x-2 font-caption font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface-200'
              }`}
            >
              <Icon name={tab.icon} className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'objectives' && (
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-text-primary mb-4">
                Список задач ({quest.objectives.filter(obj => obj.completed).length}/{quest.objectives.length})
              </h3>
              {quest.objectives.map((objective) => (
                <div 
                  key={objective.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors duration-200 ${
                    objective.completed 
                      ? 'bg-success-50 border-success-200' :'bg-background border-border'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    objective.completed 
                      ? 'bg-success text-white' :'bg-border text-text-secondary'
                  }`}>
                    {objective.completed ? (
                      <Icon name="Check" className="w-3 h-3" />
                    ) : (
                      <span className="text-xs font-mono">{objective.id}</span>
                    )}
                  </div>
                  <p className={`font-body ${
                    objective.completed 
                      ? 'text-success-700 line-through' :'text-text-primary'
                  }`}>
                    {objective.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'description' && (
            <div>
              <h3 className="font-heading font-medium text-text-primary mb-4">
                Подробное описание
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-text-primary font-body leading-relaxed mb-4">
                  {quest.description}
                </p>
                <div className="bg-background rounded-lg p-4 border border-border">
                  <h4 className="font-heading font-medium text-text-primary mb-2">
                    Дополнительная информация
                  </h4>
                  <ul className="space-y-2 text-sm text-text-secondary font-body">
                    <li>• Предполагаемое время выполнения: {quest.estimatedTime}</li>
                    <li>• Уровень сложности: {getDifficultyLabel(quest.difficulty)}</li>
                    <li>• Категория: {quest.category}</li>
                    {quest.isUrgent && (
                      <li className="text-error">• ⚠️ Срочное задание!</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div>
              <h3 className="font-heading font-medium text-text-primary mb-4">
                Награды за выполнение
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quest.rewards.map((reward, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-background rounded-lg border border-border"
                  >
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="Gift" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-caption font-medium text-text-primary">
                        {reward}
                      </p>
                      <p className="text-xs text-text-secondary">
                        Награда {index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-caption font-medium text-accent mb-1">
                      Дополнительные бонусы
                    </h4>
                    <p className="text-sm text-accent-700 font-body">
                      Выполнение этого квеста может улучшить ваши отношения с {quest.questGiver.name} 
                      и повысить репутацию в городе.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-6 border-t border-border flex-shrink-0">
          <button
            onClick={onNavigate}
            className="btn-primary flex items-center space-x-2"
          >
            <Icon name="Navigation" className="w-4 h-4" />
            <span>Перейти к локации</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-surface text-text-primary rounded-lg font-caption font-medium hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestDetails;