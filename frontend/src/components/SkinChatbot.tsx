import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, User, Sparkles } from 'lucide-react';
import { analysisAPI } from '../services/api';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

interface SkinChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const starterPrompts = [
  'My skin feels dry and dull. What routine should I follow?',
  'How do I reduce acne marks safely?',
  'Which ingredients should sensitive skin avoid?',
];

export default function SkinChatbot({ isOpen, onClose }: SkinChatbotProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi, I am your AI skin assistant. Tell me your skin concern, skin type, and any products you use.',
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isSending]);

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const response = await analysisAPI.chat(trimmed, messages);
      setMessages([...nextMessages, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: 'Sorry, I could not reach the AI service right now. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-dark-900/60 px-4 py-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="AI skin analysis chat"
            className="flex h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-dark-900 sm:h-[720px]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between border-b border-primary-100 px-5 py-4 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/40">
                  <Sparkles className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-dark-900 dark:text-background">AI Skin Analysis</h2>
                  <p className="text-xs text-dark-500 dark:text-dark-400">Powered by Gemini</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-dark-500 transition hover:bg-dark-100 hover:text-dark-900 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-background"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const isUser = message.role === 'user';
                  return (
                    <div key={`${message.role}-${index}`} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      {!isUser && (
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/40">
                          <Bot className="h-4 w-4 text-primary-600 dark:text-primary-300" />
                        </div>
                      )}
                      <div
                        className={`max-w-[82%] whitespace-pre-line rounded-xl px-4 py-3 text-sm leading-relaxed ${
                          isUser
                            ? 'bg-primary-600 text-white'
                            : 'bg-dark-50 text-dark-800 dark:bg-dark-800 dark:text-dark-100'
                        }`}
                      >
                        {message.content}
                      </div>
                      {isUser && (
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900/40">
                          <User className="h-4 w-4 text-secondary-600 dark:text-secondary-300" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {isSending && (
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/40">
                      <Bot className="h-4 w-4 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div className="rounded-xl bg-dark-50 px-4 py-3 text-sm text-dark-600 dark:bg-dark-800 dark:text-dark-300">
                      Thinking...
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-primary-100 px-5 py-4 dark:border-dark-700">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="shrink-0 rounded-full border border-primary-200 px-3 py-1.5 text-xs font-medium text-primary-700 transition hover:bg-primary-50 dark:border-primary-800 dark:text-primary-300 dark:hover:bg-primary-900/30"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form
                className="flex gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about acne, dryness, routine, ingredients..."
                  className="min-w-0 flex-1 rounded-lg border border-primary-200 bg-white px-4 py-3 text-sm text-dark-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-dark-700 dark:bg-dark-800 dark:text-background dark:focus:border-primary-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white shadow-md transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  {isSending ? (
                    <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
