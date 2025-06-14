import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';

import CharacterPortrait from './components/CharacterPortrait';
import DialogueHistory from './components/DialogueHistory';
import ResponseOptions from './components/ResponseOptions';
import RelationshipIndicator from './components/RelationshipIndicator';
import AbilityPrompts from './components/AbilityPrompts';

const CharacterInteractionDialogueSystem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get character data from navigation state or use default
  const characterData = location.state?.character || {
    id: 'chameleon-architect',
    name: 'Хамелеон Архитектор',
    profession: 'Главный архитектор города',
    species: 'chameleon',
    currentEmotion: 'neutral',
    location: 'Городская ратуша'
  };

  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const [relationshipLevel, setRelationshipLevel] = useState(3);
  const [characterEmotion, setCharacterEmotion] = useState(characterData.currentEmotion);
  const [availableAbilities, setAvailableAbilities] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAbilityPrompt, setShowAbilityPrompt] = useState(false);

  // Character-specific dialogue data
  const dialogueData = {
    'chameleon-architect': {
      greeting: `Добро пожаловать в мою мастерскую! Я работаю над планами нового фестивального павильона. 
Видите эти чертежи? Каждая линия должна быть идеальной, как мои цвета меняются в зависимости от настроения.`,
      responses: [
        {
          id: 1,
          text: "Расскажите о фестивальном павильоне",
          npcReply: `Ах, это будет великолепное сооружение! Павильон должен вмещать всех жителей Зооград. 
Но есть проблема - старые чертежи потеряны, и мне нужна помощь в восстановлении оригинального дизайна.
*цвет кожи меняется на задумчивый синий*`,
          emotion: 'thoughtful',
          relationshipChange: 1,
          type: 'info'
        },
        {
          id: 2,
          text: "Могу ли я помочь с чертежами?",
          npcReply: `О, это было бы замечательно! Мне нужен кто-то с острым глазом для деталей. 
Возможно, вы могли бы использовать свои способности, чтобы найти скрытые элементы в старых планах?
*цвет становится ярко-зеленым от воодушевления*`,
          emotion: 'excited',
          relationshipChange: 2,
          type: 'quest',
          triggersAbility: true
        },
        {
          id: 3,
          text: "Как ваши способности помогают в архитектуре?",
          npcReply: `Мой камуфляж позволяет мне сливаться с окружающей средой и видеть, как здания впишутся в ландшафт. 
Когда я меняю цвет, я чувствую гармонию между природой и архитектурой.
*демонстрирует плавный переход цветов*`,
          emotion: 'proud',
          relationshipChange: 1,
          type: 'ability'
        },
        {
          id: 4,
          text: "У меня есть предмет, который может вам помочь",
          npcReply: `Интересно! Покажите, что у вас есть. В архитектуре каждый инструмент может оказаться полезным.
*цвет меняется на любопытный желтый*`,
          emotion: 'curious',
          relationshipChange: 0,
          type: 'item',
          requiresInventory: true
        }
      ],
      speechPattern: {
        fontFamily: 'var(--font-heading)',
        color: 'text-primary',
        prefix: '*меняет цвет*',
        animationStyle: 'color-shift'
      }
    },
    'beaver-engineer': {
      greeting: `Привет! Я как раз работаю над укреплением моста для фестиваля. 
Эти балки должны выдержать вес всех посетителей. Инженерное дело - это точность и надежность!`,
      responses: [
        {
          id: 1,
          text: "Что случилось с мостом?",
          npcReply: `Старые опоры начали давать трещины. Нужно срочно их заменить до фестиваля. 
У меня есть план, но мне нужны качественные материалы и помощник с хорошими руками.`,
          emotion: 'concerned',
          relationshipChange: 1,
          type: 'info'
        },
        {
          id: 2,
          text: "Я могу помочь с ремонтом",
          npcReply: `Отлично! Мне нужен кто-то, кто может работать под водой. 
Мои зубы и лапы идеально подходят для подводных работ, но дополнительная пара рук не помешает.`,
          emotion: 'happy',
          relationshipChange: 2,
          type: 'quest',
          triggersAbility: true
        }
      ],
      speechPattern: {
        fontFamily: 'var(--font-mono)',
        color: 'text-secondary',
        prefix: '*стучит хвостом*',
        animationStyle: 'construction'
      }
    }
  };

  const currentCharacterData = dialogueData[characterData.id] || dialogueData['chameleon-architect'];

  useEffect(() => {
    // Initialize dialogue
    const initialMessage = {
      id: Date.now(),
      speaker: 'npc',
      text: currentCharacterData.greeting,
      timestamp: new Date(),
      emotion: 'neutral'
    };
    setDialogueHistory([initialMessage]);

    // Set available abilities based on character
    if (characterData.species === 'chameleon') {
      setAvailableAbilities(['camouflage', 'color-vision', 'detail-focus']);
    } else if (characterData.species === 'beaver') {
      setAvailableAbilities(['underwater-work', 'construction', 'wood-cutting']);
    }
  }, [characterData.id]);

  const handleResponseSelect = (response) => {
    setIsTyping(true);
    
    // Add player response to history
    const playerMessage = {
      id: Date.now(),
      speaker: 'player',
      text: response.text,
      timestamp: new Date()
    };

    // Add NPC reply after delay
    setTimeout(() => {
      const npcReply = {
        id: Date.now() + 1,
        speaker: 'npc',
        text: response.npcReply,
        timestamp: new Date(),
        emotion: response.emotion
      };

      setDialogueHistory(prev => [...prev, playerMessage, npcReply]);
      setCharacterEmotion(response.emotion);
      setRelationshipLevel(prev => Math.min(prev + response.relationshipChange, 5));
      setIsTyping(false);

      if (response.triggersAbility) {
        setShowAbilityPrompt(true);
      }
    }, 1500);
  };

  const handleAbilityUse = (abilityId) => {
    setShowAbilityPrompt(false);
    
    const abilityMessage = {
      id: Date.now(),
      speaker: 'system',
      text: `Вы использовали способность: ${abilityId}`,
      timestamp: new Date(),
      type: 'ability'
    };

    setDialogueHistory(prev => [...prev, abilityMessage]);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleCloseDialogue = () => {
    navigate('/main-game-world-city-navigation');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-screen">
        {/* Header with navigation */}
        <div className="flex items-center justify-between p-4 bg-surface border-b border-border">
          <button
            onClick={handleCloseDialogue}
            className="p-2 rounded-lg bg-background hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            aria-label="Закрыть диалог"
          >
            <Icon name="ArrowLeft" className="w-5 h-5 text-text-primary" />
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleNavigation('/inventory-item-management')}
              className="p-2 rounded-lg bg-background hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="Инвентарь"
            >
              <Icon name="Package" className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={() => handleNavigation('/quest-task-management-hub')}
              className="p-2 rounded-lg bg-background hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="Квесты"
            >
              <Icon name="ScrollText" className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Character Portrait - Upper Half */}
        <div className="flex-1 relative bg-gradient-to-b from-primary-50 to-background">
          <CharacterPortrait
            character={characterData}
            emotion={characterEmotion}
            isTyping={isTyping}
            className="h-full"
          />
          
          <RelationshipIndicator
            level={relationshipLevel}
            characterName={characterData.name}
            className="absolute top-4 right-4"
          />
        </div>

        {/* Dialogue Area - Lower Half */}
        <div className="flex-1 flex flex-col bg-surface">
          <DialogueHistory
            messages={dialogueHistory}
            characterSpeechPattern={currentCharacterData.speechPattern}
            className="flex-1 overflow-y-auto p-4"
          />
          
          <ResponseOptions
            responses={currentCharacterData.responses}
            onSelect={handleResponseSelect}
            disabled={isTyping}
            className="p-4 border-t border-border"
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Panel - Character Portrait */}
        <div className="w-1/2 relative bg-gradient-to-br from-primary-50 to-secondary-50">
          <CharacterPortrait
            character={characterData}
            emotion={characterEmotion}
            isTyping={isTyping}
            className="h-full"
            desktop={true}
          />
          
          <RelationshipIndicator
            level={relationshipLevel}
            characterName={characterData.name}
            className="absolute top-6 right-6"
            desktop={true}
          />

          {/* Navigation Controls */}
          <div className="absolute top-6 left-6 flex space-x-2">
            <button
              onClick={handleCloseDialogue}
              className="p-3 rounded-lg bg-surface bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-warm"
              aria-label="Закрыть диалог"
            >
              <Icon name="ArrowLeft" className="w-5 h-5 text-text-primary" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-6 left-6 flex space-x-2">
            <button
              onClick={() => handleNavigation('/inventory-item-management')}
              className="p-3 rounded-lg bg-surface bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-warm"
              aria-label="Инвентарь"
            >
              <Icon name="Package" className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={() => handleNavigation('/quest-task-management-hub')}
              className="p-3 rounded-lg bg-surface bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-warm"
              aria-label="Квесты"
            >
              <Icon name="ScrollText" className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Right Panel - Dialogue */}
        <div className="w-1/2 flex flex-col bg-surface">
          {/* Character Info Header */}
          <div className="p-6 border-b border-border bg-background">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-text-primary">
                  {characterData.name}
                </h2>
                <p className="text-sm text-text-secondary font-caption">
                  {characterData.profession} • {characterData.location}
                </p>
              </div>
            </div>
          </div>

          <DialogueHistory
            messages={dialogueHistory}
            characterSpeechPattern={currentCharacterData.speechPattern}
            className="flex-1 overflow-y-auto p-6"
            desktop={true}
          />
          
          <ResponseOptions
            responses={currentCharacterData.responses}
            onSelect={handleResponseSelect}
            disabled={isTyping}
            className="p-6 border-t border-border"
            desktop={true}
          />
        </div>
      </div>

      {/* Ability Prompts Overlay */}
      {showAbilityPrompt && (
        <AbilityPrompts
          abilities={availableAbilities}
          characterSpecies={characterData.species}
          onUse={handleAbilityUse}
          onClose={() => setShowAbilityPrompt(false)}
        />
      )}
    </div>
  );
};

export default CharacterInteractionDialogueSystem;