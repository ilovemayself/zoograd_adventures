import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SkillTree = ({ skillTree, abilities, character }) => {
  const [selectedBranch, setSelectedBranch] = useState(0);

  if (!skillTree) return null;

  const getSkillStatus = (skillId) => {
    const ability = abilities.find(a => a.id === skillId);
    if (!ability) return 'locked';
    if (ability.unlocked) return 'unlocked';
    return 'available';
  };

  const getSkillData = (skillId) => {
    return abilities.find(a => a.id === skillId) || {
      id: skillId,
      name: 'Неизвестный навык',
      description: 'Описание недоступно',
      icon: 'Circle',
      level: 0,
      maxLevel: 1,
      unlocked: false
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unlocked': return 'bg-success text-white';
      case 'available': return 'bg-warning text-white';
      case 'locked': return 'bg-border text-text-secondary';
      default: return 'bg-border text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unlocked': return 'CheckCircle';
      case 'available': return 'Clock';
      case 'locked': return 'Lock';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* Skill Tree Header */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Icon name="TreePine" className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary">
              {skillTree.name}
            </h2>
            <p className="text-text-secondary font-body">
              Дерево навыков для {character.name}
            </p>
          </div>
        </div>

        {/* Branch Selection */}
        <div className="flex space-x-2">
          {skillTree.branches.map((branch, index) => (
            <button
              key={index}
              onClick={() => setSelectedBranch(index)}
              className={`px-4 py-2 rounded-lg font-caption font-medium transition-colors duration-200 ${
                selectedBranch === index
                  ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary hover:bg-surface-200'
              }`}
            >
              {branch.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Branch Skills */}
      <div className="bg-surface rounded-lg p-6 border border-border">
        <h3 className="font-heading text-xl font-bold text-primary mb-6">
          {skillTree.branches[selectedBranch].name}
        </h3>

        {/* Skill Tree Visualization */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillTree.branches[selectedBranch].skills.map((skillId, index) => {
              const skill = getSkillData(skillId);
              const status = getSkillStatus(skillId);
              
              return (
                <div key={skillId} className="relative">
                  {/* Connection Lines */}
                  {index > 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-0.5 bg-border"></div>
                  )}
                  
                  {/* Skill Node */}
                  <div className={`card hover:shadow-warm-lg transition-all duration-300 ${
                    status === 'unlocked' ? 'ring-2 ring-success' : 
                    status === 'available' ? 'ring-2 ring-warning' : ''
                  }`}>
                    {/* Skill Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(status)}`}>
                        <Icon name={skill.icon} className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-caption font-bold text-text-primary">
                          {skill.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Icon name={getStatusIcon(status)} className="w-3 h-3 text-text-secondary" />
                          <span className="text-xs font-caption text-text-secondary">
                            {status === 'unlocked' ? 'Изучено' : 
                             status === 'available' ? 'Доступно' : 'Заблокировано'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Description */}
                    <p className="text-sm text-text-secondary font-body mb-4">
                      {skill.description}
                    </p>

                    {/* Skill Progress */}
                    {status === 'unlocked' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-caption text-text-secondary">Прогресс</span>
                          <span className="text-xs font-caption text-text-primary">
                            {skill.level}/{skill.maxLevel}
                          </span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2">
                          <div 
                            className="bg-success h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Prerequisites */}
                    {status === 'locked' && index > 0 && (
                      <div className="bg-error-50 border border-error-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="AlertTriangle" className="w-4 h-4 text-error" />
                          <span className="text-xs font-caption text-error font-medium">
                            Требуется изучить предыдущий навык
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Unlock Requirements */}
                    {status === 'available' && (
                      <div className="bg-warning-50 border border-warning-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="Star" className="w-4 h-4 text-warning" />
                          <span className="text-xs font-caption text-warning font-medium">
                            Требования для изучения:
                          </span>
                        </div>
                        <ul className="text-xs text-warning-700 space-y-1">
                          <li>• Уровень персонажа: {Math.max(character.level + 1, 5)}</li>
                          <li>• Очки навыков: 2</li>
                          <li>• Выполнить специальное задание</li>
                        </ul>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-4">
                      {status === 'unlocked' && (
                        <button className="w-full bg-success text-white px-4 py-2 rounded-md text-sm font-caption font-medium hover:bg-success-600 transition-colors duration-200">
                          <Icon name="CheckCircle" className="w-3 h-3 inline mr-2" />
                          Изучено
                        </button>
                      )}
                      {status === 'available' && (
                        <button className="w-full bg-warning text-white px-4 py-2 rounded-md text-sm font-caption font-medium hover:bg-warning-600 transition-colors duration-200">
                          <Icon name="Plus" className="w-3 h-3 inline mr-2" />
                          Изучить навык
                        </button>
                      )}
                      {status === 'locked' && (
                        <button 
                          className="w-full bg-border text-text-secondary px-4 py-2 rounded-md text-sm font-caption font-medium cursor-not-allowed"
                          disabled
                        >
                          <Icon name="Lock" className="w-3 h-3 inline mr-2" />
                          Заблокировано
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Branch Benefits */}
        <div className="mt-8 bg-background rounded-lg p-4 border border-border">
          <h4 className="font-caption font-bold text-text-primary mb-3">
            Преимущества ветки "{skillTree.branches[selectedBranch].name}"
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" className="w-4 h-4 text-success" />
              <span className="text-sm text-text-secondary">
                Повышенная эффективность связанных способностей
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" className="w-4 h-4 text-primary" />
              <span className="text-sm text-text-secondary">
                Улучшенное взаимодействие с другими персонажами
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" className="w-4 h-4 text-secondary" />
              <span className="text-sm text-text-secondary">
                Доступ к уникальным заданиям
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" className="w-4 h-4 text-accent" />
              <span className="text-sm text-text-secondary">
                Специальные анимации и эффекты
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;