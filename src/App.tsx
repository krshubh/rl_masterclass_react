import React from "react";
import Sidebar from "./components/Sidebar";
import ContentPanel from "./components/ContentPanel";
import { TOPICS } from "./topics";
import { Menu, X } from "lucide-react";

export default function App() {
  const [activeSubTopicId, setActiveSubTopicId] = React.useState<string>(TOPICS[0].subTopics[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const allSubTopics = TOPICS.flatMap(t => t.subTopics);
  const currentIndex = allSubTopics.findIndex(s => s.id === activeSubTopicId);
  const activeSubTopic = allSubTopics[currentIndex];

  const handleNext = () => {
    if (currentIndex < allSubTopics.length - 1) {
      setActiveSubTopicId(allSubTopics[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveSubTopicId(allSubTopics[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const selectSubTopic = (id: string) => {
    setActiveSubTopicId(id);
    setIsSidebarOpen(false);
  };

  const nextTopicTitle = currentIndex < allSubTopics.length - 1 ? allSubTopics[currentIndex + 1].title : undefined;

  return (
    <div className="flex h-screen w-full bg-white font-sans text-gray-900 overflow-hidden relative">
      {/* Mobile Overlay - positioned behind the sidebar but above the main content */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden cursor-pointer" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar Container - higher z-index to stay above the overlay and remain clear */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 lg:relative lg:z-0 lg:flex
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        transition-transform duration-300 ease-in-out
      `}
      >
        <Sidebar activeSubTopicId={activeSubTopicId} onSelectSubTopic={selectSubTopic} />
      </div>

      <main className="flex-1 h-full flex flex-col min-w-0">
        <header className="lg:hidden h-16 border-b border-gray-100 flex items-center px-6 bg-white shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 -ml-2 mr-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">RL Masterclass</h1>
        </header>

        <ContentPanel
          subTopic={activeSubTopic}
          nextTopicTitle={nextTopicTitle}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < allSubTopics.length - 1}
        />
      </main>
    </div>
  );
}
