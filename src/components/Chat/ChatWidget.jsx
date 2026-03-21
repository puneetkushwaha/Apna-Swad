import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/api';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isAI, setIsAI] = useState(true); // AI enabled by default for elite experience
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#chat') {
      setIsOpen(true);
    }
  }, [location.hash]);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(true);
    };
    window.addEventListener('toggleChat', handleToggle);
    return () => window.removeEventListener('toggleChat', handleToggle);
  }, []);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isOpen && user && !isAI) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, user, isAI]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/chat/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const userMsg = { message: newMessage, createdAt: new Date(), isAdmin: false };
    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    
    if (isAI) {
      setIsTyping(true);
      try {
        const res = await api.post('/ai/chat', { message: newMessage }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(prev => [...prev, res.data]);
      } catch (err) {
        setMessages(prev => [...prev, { message: "Concierge is resting. Switching to support...", isAdmin: true }]);
        setIsAI(false);
      } finally {
        setIsTyping(false);
      }
    } else {
      try {
        const res = await api.post('/chat', { message: newMessage }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Human support updates are handled by the fetch interval
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return (
    <div className={`chat-widget-wrapper ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="chat-trigger-btn shadow-premium" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
          <span className="tooltip">Chat with Us</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-window-glass">
          <div className="chat-header-premium">
            <div className="brand-status">
              <div className="brand-logo-small">AS</div>
              <div>
                <h4>{isAI ? 'AI Concierge' : 'Support Heritage'}</h4>
                <p>{isAI ? 'Instant Answers' : "We're online"}</p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button 
                className={`ai-toggle-btn ${isAI ? 'active' : ''}`}
                onClick={() => setIsAI(!isAI)}
                title={isAI ? "Switch to Human Support" : "Switch to AI Concierge"}
              >
                AI
              </button>
              <button className="close-chat-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="messages-container">
            {!user ? (
              <div className="chat-login-prompt">
                <p>Please log in to chat with our elite support team.</p>
                <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>Sign In</button>
              </div>
            ) : (
              <>
                <div className="welcome-chat-text">
                  <p>Namaste! {isAI ? "I'm your AI snack concierge. Ask me for recommendations!" : "How can we assist you with your heritage snacks today?"}</p>
                </div>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg ${msg.isAdmin ? 'received' : 'sent'}`}>
                    <div className="msg-content">
                      <p>{msg.message}</p>
                      <span className="msg-time">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-msg received">
                    <div className="msg-content typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {user && (
            <form className="chat-input-premium" onSubmit={handleSendMessage}>
              <input 
                placeholder={isAI ? "Ask AI for a snack..." : "Type your Query..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="btn-send-chat" disabled={!newMessage.trim() || isTyping}>
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
