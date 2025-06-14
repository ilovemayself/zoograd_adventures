import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import GameTabNavigation from 'components/ui/GameTabNavigation';
import QuestCard from './components/QuestCard';
import QuestDetails from './components/QuestDetails';
import QuestFilters from './components/QuestFilters';
import FestivalProgress from './components/FestivalProgress';

const QuestTaskManagementHub = () => {
  const navigate = useNavigate();
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);
  const [festivalCountdown, setFestivalCountdown] = useState(72);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock quest data
  const questsData = [
    {
      id: 1,
      title: "Найти пропавший фестивальный баннер",
      description: "Старый баннер исчез из склада. Нужно найти его до начала фестиваля.",
      questGiver: {
        name: "Мэр Медведев",
        avatar: "https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        profession: "Мэр города"
      },
      category: "main",
      priority: "high",
      progress: 60,
      timeRemaining: "2 часа",
      location: "Старый склад",
      rewards: ["50 золотых", "Фестивальный жетон", "+2 репутация"],
      objectives: [
        { id: 1, text: "Поговорить с мэром", completed: true },
        { id: 2, text: "Найти ключи от склада", completed: true },
        { id: 3, text: "Обыскать склад", completed: false },
        { id: 4, text: "Вернуть баннер мэру", completed: false }
      ],
      isUrgent: true,
      estimatedTime: "30 минут",
      difficulty: "medium"
    },
    {
      id: 2,
      title: "Собрать декоративные цветы",
      description: "Нужно собрать 10 полевых цветов для украшения фестиваля.",
      questGiver: {
        name: "Флорист Зайцева",
        avatar: "https://images.pixabay.com/photo/2016/11/21/12/42/beard-1845166_150.jpg",
        profession: "Флорист"
      },
      category: "side",
      priority: "medium",
      progress: 30,
      timeRemaining: "6 часов",
      location: "Луг за городом",
      rewards: ["25 золотых", "Материалы для крафта"],
      objectives: [
        { id: 1, text: "Найти луг с цветами", completed: true },
        { id: 2, text: "Собрать 3/10 цветов", completed: false },
        { id: 3, text: "Вернуться к флористу", completed: false }
      ],
      isUrgent: false,
      estimatedTime: "45 минут",
      difficulty: "easy"
    },
    {
      id: 3,
      title: "Помочь пекарю",
      description: "Пекарь просит помочь с приготовлением праздничных угощений.",
      questGiver: {
        name: "Пекарь Кот",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        profession: "Пекарь"
      },
      category: "side",
      priority: "low",
      progress: 80,
      timeRemaining: "12 часов",
      location: "Пекарня",
      rewards: ["Еда", "Рецепт", "+1 дружба"],
      objectives: [
        { id: 1, text: "Принести муку", completed: true },
        { id: 2, text: "Помочь замесить тесто", completed: true },
        { id: 3, text: "Украсить пироги", completed: false }
      ],
      isUrgent: false,
      estimatedTime: "20 минут",
      difficulty: "easy"
    },
    {
      id: 4,
      title: "Починить сцену",
      description: "Деревянная сцена для выступлений нуждается в ремонте.",
      questGiver: {
        name: "Строитель Бобр",
        avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=150&h=150&fit=crop&crop=face",
        profession: "Строитель"
      },
      category: "main",
      priority: "high",
      progress: 10,
      timeRemaining: "4 часа",
      location: "Центральная площадь",
      rewards: ["100 золотых", "+3 репутация"],
      objectives: [
        { id: 1, text: "Осмотреть повреждения", completed: true },
        { id: 2, text: "Найти материалы", completed: false },
        { id: 3, text: "Починить доски", completed: false },
        { id: 4, text: "Проверить безопасность", completed: false }
      ],
      isUrgent: true,
      estimatedTime: "60 минут",
      difficulty: "hard"
    },
    {
      id: 5,
      title: "Доставить почту",
      description: "Почтальон заболел, нужно доставить важные письма жителям.",
      questGiver: {
        name: "Сова Мудрая",
        avatar: "https://images.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_150.jpg",
        profession: "Начальник почты"
      },
      category: "character",
      priority: "medium",
      progress: 50,
      timeRemaining: "8 часов",
      location: "Почтовое отделение",
      rewards: ["30 золотых", "Карта города"],
      objectives: [
        { id: 1, text: "Получить письма", completed: true },
        { id: 2, text: "Доставить 2/5 писем", completed: false },
        { id: 3, text: "Вернуться в почту", completed: false }
      ],
      isUrgent: false,
      estimatedTime: "40 минут",
      difficulty: "medium"
    },
    {
      id: 6,
      title: "Найти потерянного котёнка",
      description: "Маленький котёнок потерялся в парке. Его хозяйка очень переживает.",
      questGiver: {
        name: "Бабушка Ежиха",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        profession: "Пенсионерка"
      },
      category: "festival",
      priority: "low",
      progress: 0,
      timeRemaining: "24 часа",
      location: "Городской парк",
      rewards: ["15 золотых", "Благодарность"],
      objectives: [
        { id: 1, text: "Поговорить с хозяйкой", completed: false },
        { id: 2, text: "Обыскать парк", completed: false },
        { id: 3, text: "Вернуть котёнка", completed: false }
      ],
      isUrgent: false,
      estimatedTime: "25 минут",
      difficulty: "easy"
    }
  ];

  const completedQuests = [
    {
      id: 101,
      title: "Организовать репетицию хора",
      questGiver: {
        name: "Дирижёр Соловей",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face",
        profession: "Дирижёр"
      },
      category: "festival",
      completedAt: "Вчера",
      rewards: ["40 золотых", "Музыкальная нота"],
      relationshipImpact: "+2 дружба с Соловьём"
    },
    {
      id: 102,
      title: "Убрать мусор с улиц",
      questGiver: {
        name: "Дворник Крот",
        avatar: "https://images.pixabay.com/photo/2016/11/18/19/07/happy-1836445_150.jpg",
        profession: "Дворник"
      },
      category: "side",
      completedAt: "2 дня назад",
      rewards: ["20 золотых", "Чистые улицы"],
      relationshipImpact: "+1 репутация в городе"
    }
  ];

  // Filter quests based on active filter and search
  const filteredQuests = questsData.filter(quest => {
    const matchesFilter = activeFilter === 'all' || quest.category === activeFilter;
    const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quest.questGiver.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort quests by priority and urgency
  const sortedQuests = [...filteredQuests].sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
  };

  const handleCloseDetails = () => {
    setSelectedQuest(null);
  };

  const handleNavigateToLocation = (location) => {
    navigate('/main-game-world-city-navigation', { state: { targetLocation: location } });
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Festival countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setFestivalCountdown(prev => Math.max(prev - 0.1, 0));
    }, 6000); // Decrease every 6 seconds for demo

    return () => clearInterval(timer);
  }, []);

  const urgentQuests = questsData.filter(quest => quest.isUrgent);
  const totalProgress = Math.round(
    questsData.reduce((sum, quest) => sum + quest.progress, 0) / questsData.length
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Festival Progress Header */}
      <FestivalProgress 
        countdown={festivalCountdown}
        totalProgress={totalProgress}
        urgentCount={urgentQuests.length}
      />

      {/* Main Content */}
      <div className="lg:ml-60 pb-20 lg:pb-4">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Квесты и задания
            </h1>
            <p className="text-text-secondary font-body">
              Управляйте своими приключениями и помогайте жителям Зооград
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Поиск квестов..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className={`px-4 py-2 rounded-lg font-caption font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                  showCompleted 
                    ? 'bg-primary text-white' :'bg-surface text-text-primary hover:bg-surface-200'
                }`}
              >
                <Icon name="CheckCircle" className="w-4 h-4 inline mr-2" />
                Завершённые
              </button>
            </div>

            <QuestFilters 
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              questCounts={{
                all: questsData.length,
                main: questsData.filter(q => q.category === 'main').length,
                side: questsData.filter(q => q.category === 'side').length,
                festival: questsData.filter(q => q.category === 'festival').length,
                character: questsData.filter(q => q.category === 'character').length
              }}
            />
          </div>

          {/* Quest Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Active Quests */}
            {!showCompleted && (
              <>
                {sortedQuests.length > 0 ? (
                  sortedQuests.map(quest => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onClick={() => handleQuestClick(quest)}
                      onNavigate={() => handleNavigateToLocation(quest.location)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Icon name="Search" className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-medium text-text-primary mb-2">
                      Квесты не найдены
                    </h3>
                    <p className="text-text-secondary font-body">
                      Попробуйте изменить фильтры или поисковый запрос
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Completed Quests */}
            {showCompleted && (
              <>
                <div className="col-span-full mb-4">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
                    Завершённые квесты
                  </h2>
                  <p className="text-text-secondary font-body">
                    Ваши достижения и награды
                  </p>
                </div>
                
                {completedQuests.map(quest => (
                  <div key={quest.id} className="card">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={quest.questGiver.avatar}
                          alt={quest.questGiver.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="CheckCircle" className="w-5 h-5 text-success" />
                          <h3 className="font-heading font-medium text-text-primary">
                            {quest.title}
                          </h3>
                        </div>
                        <p className="text-sm text-text-secondary font-body mb-2">
                          {quest.questGiver.name} • {quest.completedAt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {quest.rewards.map((reward, index) => (
                            <span key={index} className="px-2 py-1 bg-success-50 text-success text-xs rounded-full font-caption">
                              {reward}
                            </span>
                          ))}
                        </div>
                        {quest.relationshipImpact && (
                          <p className="text-xs text-secondary font-caption">
                            <Icon name="Heart" className="w-3 h-3 inline mr-1" />
                            {quest.relationshipImpact}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Quick Actions */}
          {!showCompleted && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/main-game-world-city-navigation')}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Icon name="Map" className="w-4 h-4" />
                <span>Открыть карту</span>
              </button>
              <button
                onClick={() => navigate('/inventory-item-management')}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Icon name="Package" className="w-4 h-4" />
                <span>Инвентарь</span>
              </button>
              <button
                onClick={() => navigate('/character-abilities-skills-interface')}
                className="btn-accent flex items-center justify-center space-x-2"
              >
                <Icon name="Zap" className="w-4 h-4" />
                <span>Способности</span>
              </button>
              <button
                onClick={() => setActiveFilter('main')}
                className="bg-surface text-text-primary px-4 py-2 rounded-lg font-caption font-medium hover:bg-surface-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 flex items-center justify-center space-x-2"
              >
                <Icon name="Star" className="w-4 h-4" />
                <span>Главные</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quest Details Modal */}
      {selectedQuest && (
        <QuestDetails
          quest={selectedQuest}
          onClose={handleCloseDetails}
          onNavigate={() => handleNavigateToLocation(selectedQuest.location)}
        />
      )}

      {/* Navigation */}
      <GameTabNavigation />
    </div>
  );
};

export default QuestTaskManagementHub;