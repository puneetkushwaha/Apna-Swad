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

  const faqOptions = [
    { label: "Talk to Human", type: "whatsapp", icon: <Headphones size={14} /> },
    { label: "Suggest Best Sellers", query: "What are your best sellers?", icon: <ShoppingBag size={14} /> },
    { label: "Track my order", query: "How can I track my order status?", icon: <Truck size={14} /> },
    { label: "What exactly is Thekua?", query: "What exactly is Shuddh Swad Thekua?" },
    { label: "How do I place an order?", query: "How do I place an order on the website?" },
    { label: "How many pieces are there?", query: "How many pieces of Thekua are there in a pack?" },
    { label: "What is the shelf-life of Thekua?", query: "What is the shelf-life or expiry of Shuddh Swad Thekua?" },
    { label: "How long does delivery take?", query: "How long does it take for the orders to be delivered?" },
    { label: "What is your return policy?", query: "What is your return and refund policy?" },
    { label: "Are your snacks hygienic and safe?", query: "Are Shuddh Swad snacks hygienic, safe and authenticated?" },
    { label: "What ingredients do you use?", query: "What are the ingredients in Shuddh Swad Thekua?" },
    { label: "What varieties do you sell?", query: "What varieties and flavours of Thekua do you sell?" },
    { label: "Can I gift these to friends?", query: "Can I gift Shuddh Swad snacks to my friends or family?" },
    { label: "What payment methods do you accept?", query: "What payment methods do you accept?", icon: <CreditCard size={14} /> },
    { label: "What are the delivery charges?", query: "What are the shipping and delivery charges?" },
    { label: "Why don't you sell on Instagram?", query: "Why don't you sell your snacks on Instagram directly?" },
    { label: "How to get free Thekua?", query: "Tell me about the Chhat Puja exclusive offer for free thekua." },
    { label: "How can I contact you?", query: "How can I contact Apna Swad if I have more questions?" },
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
    if (!messageToSend.trim()) return;

    if (!user) {
        window.location.href = '/login';
        return;
    }

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

  const handleFaqClick = (faq) => {
    if (faq.type === 'whatsapp') {
      const promptMsg = { 
        message: "I can connect you with our heritage expert on WhatsApp for personalized assistance. Would you like to proceed?", 
        createdAt: new Date(), 
        isAdmin: true,
        type: 'whatsapp-prompt'
      };
      setMessages(prev => [...prev, promptMsg]);
      return;
    }
    handleSendMessage(null, faq.query);
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
        <div className="chat-window-elite dash-active shadow-premium">
          <div className="chat-header-modern">
            <div className="header-top">
              <h3>Chat with us</h3>
              <X size={24} className="close-btn-modern" onClick={() => setIsOpen(false)} />
            </div>
            <p className="header-sub">👋 Hi, message us with any questions. We're happy to help!</p>
          </div>

          <div className="chat-content-scroller">
            <div className="chat-dashboard-view">
              {messages.length === 0 && (
                <div className="quick-input-card shadow-sm" onClick={() => messagesEndRef.current?.scrollIntoView()}>
                  <span>Write message</span>
                  <Send size={18} className="input-placeholder-icon" />
                </div>
              )}

              {messages.length > 0 && (
                <div className="messages-list-real">
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
                </div>
              )}

              <div className="instant-answers-section">
                <h4 className="section-label">Instant answers</h4>
                <div className="faq-list">
                  {faqOptions.map((faq, i) => (
                    <button key={i} className="faq-card-btn" onClick={() => handleFaqClick(faq)}>
                      <div className="faq-label-group">
                        {faq.icon && <span className="faq-icon-mini">{faq.icon}</span>}
                        <span>{faq.label}</span>
                      </div>
                      <ChevronRight size={16} className="faq-arrow" />
                    </button>
                  ))}
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="chat-footer-modern">
            <form className="chat-input-modern-form" onSubmit={handleSendMessage}>
              <input 
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                autoFocus={messages.length > 0}
              />
              <button type="submit" className="modern-send-btn" disabled={!newMessage.trim() || isTyping}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
