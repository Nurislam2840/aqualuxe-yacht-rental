import { useState } from 'react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'agent', text: 'Hi there! 👋 Welcome to AquaLuxe. How can we help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'agent', text: 'Thank you for your message! Our team will get back to you shortly. 😊' }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-navy dark:bg-gold text-white dark:text-navy w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] bg-white dark:bg-darkCard rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up">
          <div className="bg-navy p-4">
            <h3 className="text-white font-bold">AquaLuxe Support</h3>
            <p className="text-gray-300 text-xs">Usually replies within minutes</p>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-lightGray dark:bg-darkBg">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.from === 'user' 
                    ? 'bg-gold text-navy rounded-br-none' 
                    : 'bg-white dark:bg-darkCard text-navy dark:text-white rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-white dark:bg-darkCard border-t border-gray-100 dark:border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-lightGray dark:bg-darkBg text-navy dark:text-white px-3 py-2 rounded-lg outline-none text-sm"
            />
            <button onClick={handleSend} className="bg-navy dark:bg-gold text-white dark:text-navy px-3 rounded-lg text-sm font-bold">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;