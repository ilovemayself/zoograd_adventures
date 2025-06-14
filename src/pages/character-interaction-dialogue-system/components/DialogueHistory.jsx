import React, { useEffect, useRef } from 'react';
import Icon from 'components/AppIcon';

const DialogueHistory = ({ 
  messages = [], 
  characterSpeechPattern = {}, 
  className = '', 
  desktop = false 
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageStyle = (speaker, type) => {
    switch (speaker) {
      case 'npc':
        return {
          container: 'bg-primary-50 border-l-4 border-primary',
          text: `${characterSpeechPattern.color || 'text-text-primary'}`,
          font: characterSpeechPattern.fontFamily || 'var(--font-body)'
        };
      case 'player':
        return {
          container: 'bg-secondary-50 border-l-4 border-secondary ml-8',
          text: 'text-text-primary',
          font: 'var(--font-body)'
        };
      case 'system':
        return {
          container: 'bg-accent-50 border border-accent-200 rounded-lg',
          text: 'text-accent-700',
          font: 'var(--font-caption)'
        };
      default:
        return {
          container: 'bg-surface border border-border',
          text: 'text-text-primary',
          font: 'var(--font-body)'
        };
    }
  };

  const getSpeakerIcon = (speaker, type) => {
    switch (speaker) {
      case 'npc':
        return 'MessageCircle';
      case 'player':
        return 'User';
      case 'system':
        return 'Zap';
      default:
        return 'MessageSquare';
    }
  };

  const getSpeakerLabel = (speaker) => {
    switch (speaker) {
      case 'npc':
        return 'НПС';
      case 'player':
        return 'Вы';
      case 'system':
        return 'Система';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className={`${className}`}>
      <div className="space-y-4">
        {messages.map((message) => {
          const style = getMessageStyle(message.speaker, message.type);
          
          return (
            <div
              key={message.id}
              className={`p-4 rounded-lg ${style.container} animate-fade-in`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getSpeakerIcon(message.speaker, message.type)} 
                    className="w-4 h-4 text-text-secondary" 
                  />
                  <span className="text-sm font-caption font-medium text-text-secondary">
                    {getSpeakerLabel(message.speaker)}
                  </span>
                  {message.emotion && (
                    <span className="text-xs text-text-tertiary font-caption">
                      • {message.emotion}
                    </span>
                  )}
                </div>
                <span className="text-xs text-text-tertiary font-mono">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>

              {/* Message Content */}
              <div 
                className={`${style.text} leading-relaxed`}
                style={{ fontFamily: style.font }}
              >
                {/* Character Speech Pattern Prefix */}
                {message.speaker === 'npc' && characterSpeechPattern.prefix && (
                  <span className="text-text-tertiary text-sm italic mr-2">
                    {characterSpeechPattern.prefix}
                  </span>
                )}
                
                <p className={desktop ? 'text-base' : 'text-sm'}>
                  {message.text}
                </p>
              </div>

              {/* Special Message Types */}
              {message.type === 'quest' && (
                <div className="mt-3 flex items-center space-x-2 text-secondary">
                  <Icon name="ScrollText" className="w-4 h-4" />
                  <span className="text-sm font-caption">Новый квест доступен</span>
                </div>
              )}

              {message.type === 'ability' && (
                <div className="mt-3 flex items-center space-x-2 text-accent">
                  <Icon name="Zap" className="w-4 h-4" />
                  <span className="text-sm font-caption">Способность активирована</span>
                </div>
              )}

              {message.type === 'item' && (
                <div className="mt-3 flex items-center space-x-2 text-primary">
                  <Icon name="Package" className="w-4 h-4" />
                  <span className="text-sm font-caption">Предмет передан</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Icon name="MessageCircle" className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
            <p className="text-text-secondary font-caption">
              Начните разговор с персонажем
            </p>
          </div>
        )}
      </div>
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default DialogueHistory;