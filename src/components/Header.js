import {
    Trophy,
    Settings,
    Calendar,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Save,
  } from 'lucide-react';
  
  const Header = ({
    resetToDefaults,
    setIsManagingDefaults,
    logDay,
    selectedDate,
    isSidebarOpen,
    setIsSidebarOpen,
  }) => {
    return (
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          Task Tracker
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
        </h1>
  
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 focus:outline-none text-sm sm:text-base"
            aria-label="Reset all data"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
  
          <button
            onClick={() => setIsManagingDefaults(true)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 focus:outline-none text-sm sm:text-base"
            aria-label="Manage default tasks"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Manage</span>
          </button>
  
          <button
            onClick={logDay}
            className="flex items-center gap-1 text-green-600 hover:text-green-800 focus:outline-none text-sm sm:text-base"
            aria-label="Log today's tasks"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Log Day</span>
          </button>
  
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{new Date(selectedDate).toLocaleDateString()}</span>
          </div>
  
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    );
  };
  
  export default Header;