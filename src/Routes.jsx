import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import GameStartCharacterSelection from "pages/game-start-character-selection";
import InventoryItemManagement from "pages/inventory-item-management";
import QuestTaskManagementHub from "pages/quest-task-management-hub";
import CharacterInteractionDialogueSystem from "pages/character-interaction-dialogue-system";
import MainGameWorldCityNavigation from "pages/main-game-world-city-navigation";
import CharacterAbilitiesSkillsInterface from "pages/character-abilities-skills-interface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<GameStartCharacterSelection />} />
          <Route path="/game-start-character-selection" element={<GameStartCharacterSelection />} />
          <Route path="/inventory-item-management" element={<InventoryItemManagement />} />
          <Route path="/quest-task-management-hub" element={<QuestTaskManagementHub />} />
          <Route path="/character-interaction-dialogue-system" element={<CharacterInteractionDialogueSystem />} />
          <Route path="/main-game-world-city-navigation" element={<MainGameWorldCityNavigation />} />
          <Route path="/character-abilities-skills-interface" element={<CharacterAbilitiesSkillsInterface />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;