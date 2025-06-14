import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const DialogueInterface = ({ 
  isActive = false, 
  characterName = "Village Elder",
  characterAvatar = null,
  onClose = () => {},
  onInventoryAccess = () => {},
  onRelationshipView = () => {}
}) => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [showInventoryPanel, setShowInventoryPanel] = useState(false);
  const [relationshipLevel, setRelationshipLevel] = useState(3);
  const [conversationHistory, setConversationHistory] = useState([]);

  const dialogueOptions = [
    {
      id: 1,
      text: "Tell me about the upcoming festival.",
      response: "Ah, the Harvest Festival! It\'s our most important celebration. We need help preparing the decorations and gathering supplies.",
      type: "info"
    },
    {
      id: 2,
      text: "What can I do to help?",
      response: "There are several tasks that need attention. Check your quest log for the complete list, but the most urgent is finding the missing festival banner.",
      type: "quest"
    },
    {
      id: 3,
      text: "I have something for you.",
      response: "Oh? What have you brought me? Please, show me what you have.",
      type: "item",
      requiresInventory: true
    },
    {
      id: 4,
      text: "How are you feeling today?",
      response: "I\'m doing well, thank you for asking! Your kindness means a lot to our community.",
      type: "relationship",
      relationshipBonus: 1
    }
  ];

  const handleDialogueChoice = (option) => {
    const newEntry = {
      id: Date.now(),
      playerChoice: option.text,
      npcResponse: option.response,
      timestamp: new Date().toLocaleTimeString()
    };

    setConversationHistory(prev => [...prev, newEntry]);

    if (option.requiresInventory) {
      setShowInventoryPanel(true);
    }

    if (option.relationshipBonus) {
      setRelationshipLevel(prev => Math.min(prev + option.relationshipBonus, 5));
    }

    // Auto-advance dialogue
    setTimeout(() => {
      setCurrentDialogue(prev => (prev + 1) % dialogueOptions.length);
    }, 2000);
  };

  const handleInventoryToggle = () => {
    setShowInventoryPanel(!showInventoryPanel);
    onInventoryAccess();
  };

  const handleRelationshipClick = () => {
    onRelationshipView();
  };

  const handleKeyDown = (event) => {
    if (!isActive) return;

    switch (event.key) {
      case '1': case'2': case'3': case'4':
        event.preventDefault();
        const optionIndex = parseInt(event.key) - 1;
        if (dialogueOptions[optionIndex]) {
          handleDialogueChoice(dialogueOptions[optionIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case 'i': case'I':
        event.preventDefault();
        handleInventoryToggle();
        break;
    }
  };

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isActive, currentDialogue]);

  const getRelationshipColor = (level) => {
    if (level >= 4) return 'text-success';
    if (level >= 3) return 'text-secondary';
    if (level >= 2) return 'text-warning';
    return 'text-text-secondary';
  };

  const getRelationshipLabel = (level) => {
    const labels = ['Stranger', 'Acquaintance', 'Friend', 'Good Friend', 'Close Friend'];
    return labels[level - 1] || 'Unknown';
  };

  if (!isActive) return null;

  return (
    <div className="dialogue-overlay">
      <div className="bg-surface rounded-xl shadow-warm-xl border border-border max-w-4xl w-full mx-4 animate-fade-in">
        {/* Header with Character Info */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-warm">
              {characterAvatar ? (
                <img 
                  src={characterAvatar} 
                  alt={characterName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Icon name="User" className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-text-primary">
                {characterName}
              </h2>
              <button
                onClick={handleRelationshipClick}
                className={`text-sm font-caption ${getRelationshipColor(relationshipLevel)} hover:underline focus:outline-none focus:underline`}
                aria-label={`Relationship level: ${getRelationshipLabel(relationshipLevel)}`}
              >
                {getRelationshipLabel(relationshipLevel)}
                <Icon name="Heart" className={`w-3 h-3 inline ml-1 ${getRelationshipColor(relationshipLevel)}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleInventoryToggle}
              className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                showInventoryPanel 
                  ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary hover:bg-surface-200'
              }`}
              aria-label="Toggle inventory panel"
              title="Inventory (I)"
            >
              <Icon name="Package" className="w-5 h-5" />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-background text-text-secondary hover:text-text-primary hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="Close dialogue"
              title="Close (Esc)"
            >
              <Icon name="X" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main Dialogue Area */}
          <div className="flex-1 p-6">
            {/* Current NPC Response */}
            <div className="bg-background rounded-lg p-4 mb-6 border border-border">
              <p className="text-text-primary font-body leading-relaxed">
                {dialogueOptions[currentDialogue]?.response || "Hello there! How can I help you today?"}
              </p>
            </div>

            {/* Dialogue Options */}
            <div className="space-y-3">
              <h3 className="font-heading font-medium text-text-primary mb-3">
                Choose your response:
              </h3>
              {dialogueOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleDialogueChoice(option)}
                  className="w-full text-left p-4 rounded-lg bg-surface hover:bg-surface-200 border border-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 group"
                  aria-label={`Option ${index + 1}: ${option.text}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-caption font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-text-primary font-body group-hover:text-primary transition-colors duration-200">
                        {option.text}
                      </p>
                      {option.requiresInventory && (
                        <p className="text-xs text-accent mt-1 font-caption">
                          <Icon name="Package" className="w-3 h-3 inline mr-1" />
                          Requires inventory access
                        </p>
                      )}
                      {option.relationshipBonus && (
                        <p className="text-xs text-success mt-1 font-caption">
                          <Icon name="Heart" className="w-3 h-3 inline mr-1" />
                          Improves relationship
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="mt-6 text-xs text-text-secondary font-caption">
              <p>Use number keys (1-4) to select options, I for inventory, Esc to close</p>
            </div>
          </div>

          {/* Inventory Panel (when active) */}
          {showInventoryPanel && (
            <div className="w-80 border-l border-border p-6 bg-background">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-medium text-text-primary">Quick Inventory</h3>
                <button
                  onClick={handleInventoryToggle}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded"
                  aria-label="Close inventory panel"
                >
                  <Icon name="X" className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {/* Sample inventory items */}
                {[
                  { name: 'Health Potion', icon: 'Heart', count: 3 },
                  { name: 'Festival Banner', icon: 'Flag', count: 1 },
                  { name: 'Magic Crystal', icon: 'Gem', count: 2 },
                  { name: 'Ancient Key', icon: 'Key', count: 1 },
                  { name: 'Bread', icon: 'Cookie', count: 5 },
                  { name: 'Gold Coins', icon: 'Coins', count: 25 }
                ].map((item, index) => (
                  <button
                    key={index}
                    className="aspect-square bg-surface rounded-lg border border-border hover:border-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 p-2 relative group"
                    aria-label={`${item.name} (${item.count})`}
                    title={item.name}
                  >
                    <Icon name={item.icon} className="w-6 h-6 text-text-secondary group-hover:text-primary mx-auto" />
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-caption">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
              
              <p className="text-xs text-text-secondary font-caption mt-4">
                Click items to give to {characterName}
              </p>
            </div>
          )}
        </div>

        {/* Conversation History (collapsible) */}
        {conversationHistory.length > 0 && (
          <div className="border-t border-border p-6">
            <details className="group">
              <summary className="cursor-pointer flex items-center justify-between">
                <span className="font-heading font-medium text-text-primary">Conversation History</span>
                <Icon name="ChevronDown" className="w-5 h-5 text-text-secondary group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="mt-4 space-y-4 max-h-64 overflow-y-auto">
                {conversationHistory.map((entry) => (
                  <div key={entry.id} className="border-b border-border pb-3">
                    <p className="text-sm text-accent mb-1 font-caption">
                      <Icon name="User" className="w-3 h-3 inline mr-1" />
                      You: {entry.playerChoice}
                    </p>
                    <p className="text-sm text-text-primary">
                      <Icon name="MessageSquare" className="w-3 h-3 inline mr-1 text-text-secondary" />
                      {characterName}: {entry.npcResponse}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1 font-caption">
                      {entry.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogueInterface;