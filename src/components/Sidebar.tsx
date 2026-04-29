import React from "react";
import { ChevronDown, ChevronRight, BookOpen, GraduationCap, Zap, Brain, Shield } from "lucide-react";
import { Topic, TOPICS } from "../topics";
import { motion, AnimatePresence } from "motion/react";

interface SidebarProps {
  activeSubTopicId: string;
  onSelectSubTopic: (id: string) => void;
}

const getIcon = (topicId: string) => {
  switch (topicId) {
    case "foundations": return <BookOpen className="w-4 h-4" />;
    case "tabular-methods": return <Zap className="w-4 h-4" />;
    case "deep-rl": return <Brain className="w-4 h-4" />;
    case "policy-gradients": return <Shield className="w-4 h-4" />;
    default: return <GraduationCap className="w-4 h-4" />;
  }
};

export default function Sidebar({ activeSubTopicId, onSelectSubTopic }: SidebarProps) {
  const [expandedTopics, setExpandedTopics] = React.useState<Record<string, boolean>>({
    foundations: true,
    "tabular-methods": true,
    "deep-rl": true,
    "policy-gradients": true
  });

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div id="sidebar" className="w-72 h-screen border-r border-gray-200 bg-gray-50 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">RL Masterclass</h1>
        </div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Reinforcement Learning</p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-4">
        {TOPICS.map((topic) => (
          <div key={topic.id} className="mb-2">
            <button
              onClick={() => toggleTopic(topic.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-white hover:text-gray-900 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
                  {getIcon(topic.id)}
                </span>
                {topic.title}
              </div>
              {expandedTopics[topic.id] ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {expandedTopics[topic.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 ml-4 border-l border-gray-200">
                    {topic.subTopics.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onSelectSubTopic(sub.id)}
                        className={`w-full text-left px-6 py-1.5 text-sm transition-all relative ${
                          activeSubTopicId === sub.id
                            ? "text-orange-600 font-medium bg-orange-50/50"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                        }`}
                      >
                        {activeSubTopicId === sub.id && (
                          <motion.div
                            layoutId="activeSubTopic"
                            className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-500"
                          />
                        )}
                        {sub.title}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-gray-600">Course Progress</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div className="bg-orange-500 h-1.5 rounded-full w-1/3" />
          </div>
          <span className="text-[10px] text-gray-400">3 of 9 units completed</span>
        </div>
      </div>
    </div>
  );
}
