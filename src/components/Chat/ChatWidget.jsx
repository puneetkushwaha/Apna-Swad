import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/api';
import { MessageCircle, X, Send, User, ChevronRight, MessageSquare, Headphones, ShoppingBag, Truck, CreditCard, HelpCircle, Maximize2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isAI, setIsAI] = useState(true); 
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const quickOptions = [
    { label: 'Suggest Best Sellers', icon: <ShoppingBag size={14} />, query: 'What are your best sellers?' },
    { label: 'Track Order', icon: <Truck size={14} />, query: 'How can I track my order?' },
    { label: 'Talk to Human', icon: <Headphones size={14} />, type: 'whatsapp' },
    { label: 'Pricing & Offers', icon: <CreditCard size={14} />, query: 'Any ongoing offers or discounts?' },
    { label: 'FAQs', icon: <HelpCircle size={14} />, query: 'Frequently asked questions' },
  ];

  useEffect(() => {
    if (location.hash === '#chat') {
      setIsOpen(true);
    }
  }, [location.hash]);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/chat/${user._id}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e, customMsg = null) => {
    if (e) e.preventDefault();
    const messageToSend = customMsg || newMessage;
    if (!messageToSend.trim() || !user) return;

    const userMsg = { message: messageToSend, createdAt: new Date(), isAdmin: false };
    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    
    if (isAI) {
      setIsTyping(true);
      try {
        const res = await api.post('/ai/chat', { 
            message: messageToSend,
            chatHistory: messages.slice(-5) 
        });
        setMessages(prev => [...prev, res.data]);
      } catch (err) {
        setMessages(prev => [...prev, { message: "Connecting you to heritage support...", isAdmin: true }]);
        setIsAI(false);
      } finally {
        setIsTyping(false);
      }
    } else {
      try {
        await api.post('/chat', { message: messageToSend });
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  const handleOptionClick = (option) => {
    if (option.type === 'whatsapp') {
      const promptMsg = { 
        message: "I can connect you with our heritage expert on WhatsApp for personalized assistance. Would you like to proceed?", 
        createdAt: new Date(), 
        isAdmin: true,
        type: 'whatsapp-prompt'
      };
      setMessages(prev => [...prev, promptMsg]);
      return;
    }
    handleSendMessage(null, option.query);
  };

  const renderMessageContent = (msg) => {
    if (msg.type === 'whatsapp-prompt') {
      return (
        <div className="whatsapp-prompt-content">
          <p>{msg.message}</p>
          <button 
            className="elite-connect-btn"
            onClick={() => window.open('https://wa.me/918810905170', '_blank')}
          >
            <Headphones size={16} /> Connect to WhatsApp
          </button>
        </div>
      );
    }
    
    // Simple systematic reply formatter (converts [Text](URL) to links)
    const parts = msg.message.split(/(\[.*?\]\(.*?\))/g);
    return (
      <p>
        {parts.map((part, i) => {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="chat-link">{match[1]}</a>;
          }
          return part;
        })}
      </p>
    );
  };

  return (
    <div className={`chat-widget-wrapper ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <div className="chat-trigger-group">
          <div className="chat-support-badge shadow-premium" onClick={() => setIsOpen(true)} style={{cursor: 'pointer', pointerEvents: 'auto'}}>
            <span className="pulse-dot"></span>
            24/7 Heritage Support
          </div>
          <button className="chat-trigger-btn shadow-premium" onClick={() => setIsOpen(true)}>
            <div className="btn-inner-icon">
              <MessageSquare size={26} />
              <span className="notification-ping"></span>
            </div>
          </button>
        </div>
      )}

      {isOpen && (
        <div className="chat-window-elite shadow-premium">
          <div className="chat-header-elite">
            <div className="header-left">
              <div className="header-avatar-status">
                <div className="avatar-wrapper">
                  <MessageSquare size={20} color="white" />
                </div>
                <div className="status-dot"></div>
              </div>
              <div className="header-info">
                <h3>Apna Swad Support</h3>
                <span>Always Online</span>
              </div>
            </div>
            <div className="header-actions">
              <Maximize2 size={16} className="header-icon" />
              <X size={20} className="header-icon" onClick={() => setIsOpen(false)} />
            </div>
          </div>

          <div className="messages-container-elite">
            {!user ? (
              <div className="chat-login-prompt">
                <p>Namaste! Please sign in to experience our premium concierge.</p>
                <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>Sign In</button>
              </div>
            ) : (
              <>
                <div className="welcome-elite">
                  <p>Handcrafting Heritage Deliciously.</p>
                  <h3>Namaste! 🙏 I'm your Apna Swad guide. How can I sweeten your day?</h3>
                </div>

                <div className="initial-options">
                  {quickOptions.map((opt, i) => (
                    <button key={i} className="elite-option-btn" onClick={() => handleOptionClick(opt)}>
                      <span className="option-icon">{opt.icon}</span>
                      <span className="option-label">{opt.label}</span>
                    </button>
                  ))}
                </div>

                {messages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg-elite ${msg.isAdmin ? 'received' : 'sent'} ${msg.type || ''}`}>
                    <div className="msg-content-elite">
                      {renderMessageContent(msg)}
                      <span className="msg-time">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="chat-msg-elite received">
                    <div className="msg-content-elite typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {user && (
            <div className="chat-footer-elite">
              <form className="chat-input-wrapper-elite" onSubmit={handleSendMessage}>
                <input 
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="elite-send-btn" disabled={!newMessage.trim() || isTyping}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
