import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { SubTopic } from "../topics";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Share2, MessageSquare, Heart } from "lucide-react";

interface ContentPanelProps {
  subTopic: SubTopic;
  nextTopicTitle?: string;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function ContentPanel({ subTopic, nextTopicTitle, onNext, onPrev, hasPrev, hasNext }: ContentPanelProps) {
  return (
    <div id="content-panel" className="flex-1 bg-white h-screen overflow-y-auto scroll-smooth">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 mb-20">
        <motion.div
          key={subTopic.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Unit 1
              </span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-500 text-sm font-medium">15 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
            {subTopic.title}
          </h1>

          <div className="prose prose-lg prose-orange max-w-none prose-headings:font-bold prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {subTopic.content.replace(/\\n/g, '\n')}
            </ReactMarkdown>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${
                hasPrev 
                  ? "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300" 
                  : "border-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Previous</p>
                <p className="text-sm font-semibold truncate">Back</p>
              </div>
            </button>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`flex items-center justify-between sm:justify-end gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white transition-all shadow-lg shadow-orange-200 hover:bg-orange-600 ${
                !hasNext && "opacity-50 cursor-not-allowed grayscale"
              }`}
            >
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">Next Unit</p>
                <p className="text-sm font-semibold truncate">{nextTopicTitle || "Complete Course"}</p>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          <div className="mt-20 bg-gray-50 border border-gray-200 rounded-2xl p-8 flex items-start gap-6">
            <div className="bg-orange-500 p-4 rounded-2xl shadow-inner">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Have questions?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Our community is here to help. Join the Discord or start a discussion below to get feedback from other learners and experts.
              </p>
              <button className="text-orange-600 font-bold text-sm hover:underline">
                Join our Discord community &rarr;
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
