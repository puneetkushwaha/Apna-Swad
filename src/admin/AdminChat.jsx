import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Send, User as UserIcon, MessageSquare } from 'lucide-react';

const AdminChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
      const interval = setInterval(() => fetchMessages(selectedUser._id), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  const fetchConversations = async () => {
    try {
      const res = await api.get('/chat/admin/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(res.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await api.get('/chat/${userId}', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const res = await api.post('/chat', {
        receiverId: selectedUser._id,
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

  if (loading) return <div className="admin-loader">Loading Conversations...</div>;

  return (
    <div className="admin-chat-page section">
      <div className="container">
        <h1 className="premium-title">Guest Assistance</h1>
        <p className="premium-subtitle">Manage support requests and chat with your elite customers.</p>
        
        <div className="chat-interface">
          <div className="conversation-sidebar">
            <h3 className="sidebar-title">Active Inquiries</h3>
            <div className="conversation-list">
              {conversations.map(conv => (
                <div 
                  key={conv._id} 
                  className={`conversation-item ${selectedUser?._id === conv._id ? 'active' : ''}`}
                  onClick={() => setSelectedUser(conv.user)}
                >
                  <div className="avatar-small">
                    {conv.user.avatar ? <img src={conv.user.avatar} alt="" /> : <UserIcon size={20} />}
                  </div>
                  <div className="conv-info">
                    <span className="conv-name">{conv.user.name}</span>
                    <span className="conv-preview">{conv.lastMessage}</span>
                  </div>
                </div>
              ))}
              {conversations.length === 0 && <p className="empty-msg">No active chats.</p>}
            </div>
          </div>

          <div className="chat-window">
            {selectedUser ? (
              <>
                <div className="chat-header">
                  <div className="user-meta">
                    <span className="user-name">{selectedUser.name}</span>
                    <span className="user-status">Online</span>
                  </div>
                </div>
                <div className="messages-area">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`message-bubble ${msg.isAdmin ? 'admin' : 'user'}`}>
                      <p>{msg.message}</p>
                      <span className="timestamp">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  ))}
                </div>
                <form className="chat-input-area" onSubmit={handleSendMessage}>
                  <input 
                    placeholder="Provide elite support..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button type="submit" className="send-btn">
                    <Send size={20} />
                  </button>
                </form>
              </>
            ) : (
              <div className="chat-placeholder">
                <MessageSquare size={60} strokeWidth={1} style={{opacity: 0.2, marginBottom: '20px'}} />
                <h3>Select a conversation</h3>
                <p>Welcome your guests with premium support.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
