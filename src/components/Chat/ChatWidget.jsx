import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
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
      console.log('Chat toggle event received');
      setIsOpen(true);
    };
    window.addEventListener('toggleChat', handleToggle);
    return () => window.removeEventListener('toggleChat', handleToggle);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isOpen && user) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${apiUrl}/chat/${user._id}`, {
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

    try {
      const res = await axios.post(`${apiUrl}/chat`, {
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
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
                <h4>Support Heritage</h4>
                <p>We're online</p>
              </div>
            </div>
            <button className="close-chat-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
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
                  <p>Namaste! How can we assist you with your heritage snacks today?</p>
                </div>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg ${msg.isAdmin ? 'received' : 'sent'}`}>
                    <div className="msg-content">
                      <p>{msg.message}</p>
                      <span className="msg-time">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {user && (
            <form className="chat-input-premium" onSubmit={handleSendMessage}>
              <input 
                placeholder="Type your Query..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="btn-send-chat" disabled={!newMessage.trim()}>
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
