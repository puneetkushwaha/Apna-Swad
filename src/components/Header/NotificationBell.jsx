import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, X, ExternalLink, Inbox } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import './NotificationBell.css';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotification();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      await markAsRead(notif._id);
    }
    if (notif.link) {
      navigate(notif.link);
      setIsOpen(false);
    }
  };

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <div 
        className={`action-btn bell-btn ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={22} />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </div>

      {isOpen && (
        <div className="notification-dropdown glass shadow-lg">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-btn">
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-list custom-scrollbar">
            {loading && notifications.length === 0 ? (
              <div className="notification-empty">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="notification-empty">
                <Inbox size={40} strokeWidth={1} />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif._id} 
                  className={`notification-item ${!notif.isRead ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="notification-icon">
                    {notif.type === 'order_placed' && <span className="icon-order">📦</span>}
                    {notif.type === 'status_update' && <span className="icon-status">🚚</span>}
                    {notif.type === 'new_user' && <span className="icon-user">👤</span>}
                    {notif.type === 'system' && <span className="icon-system">⚠️</span>}
                  </div>
                  <div className="notification-content">
                    <p className="notif-title">{notif.title}</p>
                    <p className="notif-message">{notif.message}</p>
                    <span className="notif-time">
                      {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {!notif.isRead && <div className="unread-dot"></div>}
                </div>
              ))
            )}
          </div>
          
          <div className="notification-footer">
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
