import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SettingsPanel = ({ onClose }) => {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    musicEnabled: true,
    voiceEnabled: true,
    animationsEnabled: true,
    language: 'ru',
    difficulty: 'normal',
    autoSave: true,
    notifications: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Save to localStorage
    localStorage.setItem('zoograd-settings', JSON.stringify({
      ...settings,
      [key]: value
    }));
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      soundEnabled: true,
      musicEnabled: true,
      voiceEnabled: true,
      animationsEnabled: true,
      language: 'ru',
      difficulty: 'normal',
      autoSave: true,
      notifications: true
    };
    setSettings(defaultSettings);
    localStorage.setItem('zoograd-settings', JSON.stringify(defaultSettings));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl shadow-warm-xl border border-border max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-xl font-bold text-primary">
            Настройки
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            aria-label="Закрыть настройки"
          >
            <Icon name="X" className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6">
          {/* Audio Settings */}
          <div>
            <h3 className="font-heading font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Volume2" className="w-5 h-5 mr-2 text-secondary" />
              Звук
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-caption text-text-primary">
                  Звуковые эффекты
                </label>
                <button
                  onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    settings.soundEnabled ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    settings.soundEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
                  }`}></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-caption text-text-primary">
                  Музыка
                </label>
                <button
                  onClick={() => handleSettingChange('musicEnabled', !settings.musicEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    settings.musicEnabled ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    settings.musicEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-caption text-text-primary">
                  Озвучка персонажей
                </label>
                <button
                  onClick={() => handleSettingChange('voiceEnabled', !settings.voiceEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    settings.voiceEnabled ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    settings.voiceEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div>
            <h3 className="font-heading font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Monitor" className="w-5 h-5 mr-2 text-secondary" />
              Отображение
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-caption text-text-primary">
                  Анимации
                </label>
                <button
                  onClick={() => handleSettingChange('animationsEnabled', !settings.animationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    settings.animationsEnabled ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    settings.animationsEnabled ? 'transform translate-x-6' : 'transform translate-x-0.5'
                  }`}></div>
                </button>
              </div>

              <div>
                <label className="text-sm font-caption text-text-primary mb-2 block">
                  Язык
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-caption focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  <option value="ru">🇷🇺 Русский</option>
                  <option value="en">🇺🇸 English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Game Settings */}
          <div>
            <h3 className="font-heading font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Gamepad2" className="w-5 h-5 mr-2 text-secondary" />
              Игра
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-caption text-text-primary mb-2 block">
                  Сложность
                </label>
                <select
                  value={settings.difficulty}
                  onChange={(e) => handleSettingChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-caption focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  <option value="easy">Легкая</option>
                  <option value="normal">Обычная</option>
                  <option value="hard">Сложная</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-caption text-text-primary">
                  Автосохранение
                </label>
                <button
                  onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    settings.autoSave ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    settings.autoSave ? 'transform translate-x-6' : 'transform translate-x-0.5'
                  }`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-caption text-text-primary">
                  Уведомления
                </label>
                <button
                  onClick={() => handleSettingChange('notifications', !settings.notifications)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    settings.notifications ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    settings.notifications ? 'transform translate-x-6' : 'transform translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex space-x-3">
            <button
              onClick={handleResetSettings}
              className="flex-1 py-2 px-4 bg-background text-text-secondary border border-border rounded-lg font-caption font-medium hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              Сбросить
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-primary text-white rounded-lg font-caption font-medium hover:bg-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              Готово
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;