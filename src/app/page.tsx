'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { mockUsers, mockNotifications, mockMessages, Notification } from '../lib/mockData';

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(mockUsers[0]); // Default to System Admin
  const [activeTab, setActiveTab] = useState<'NOTIFICATIONS' | 'MESSAGES'>('NOTIFICATIONS');
  const [composerText, setComposerText] = useState('');

  // Filter notifications based on role
  const visibleNotifications = mockNotifications.filter(
    (n) => n.recipientId === currentUser.id || n.recipientId === 'ALL' || currentUser.role === 'ADMIN'
  );

  // Filter messages based on user
  const visibleMessages = mockMessages.filter(
    (m) => m.senderId === currentUser.id || m.recipientId === currentUser.id || currentUser.role === 'ADMIN'
  );

  const simulateAlert = () => {
    // This is where you would call POST /api/alerts/emergency in a real setup
    alert('Simulated: Emergency Alert Broadcasted to Admins!');
  };

  const simulateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;
    alert(`Simulated Action: Message "${composerText}" sent.`);
    setComposerText('');
  };

  return (
    <div className={styles.container}>
      {/* Sidebar - Role Switcher & Controls */}
      <aside className={styles.sidebar}>
        <div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>View As</h2>
          <div className={styles.switchPanel}>
            {mockUsers.map(user => (
              <button
                key={user.id}
                className={styles.roleButton}
                data-active={currentUser.id === user.id}
                onClick={() => setCurrentUser(user)}
              >
                {user.name} ({user.role})
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          {currentUser.role === 'DRIVER' && (
            <button className={`${styles.actionButton} ${styles.urgentButton} animate-urgent`} onClick={simulateAlert} style={{ width: '100%', justifyContent: 'center' }}>
              🚨 Emergency Alert
            </button>
          )}
          {currentUser.role === 'ADMIN' && (
            <button className={styles.actionButton} onClick={() => alert('Broadcast modal opened')} style={{ width: '100%', justifyContent: 'center' }}>
              📢 Broadcast Message
            </button>
          )}
        </div>
      </aside>

      {/* Main Feed */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            {currentUser.name}&apos;s Dashboard
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className={styles.roleButton} 
              data-active={activeTab === 'NOTIFICATIONS'} 
              onClick={() => setActiveTab('NOTIFICATIONS')}
            >
              Notifications
            </button>
            <button 
              className={styles.roleButton} 
              data-active={activeTab === 'MESSAGES'} 
              onClick={() => setActiveTab('MESSAGES')}
            >
              Messages
            </button>
          </div>
        </header>

        <div className={styles.feed}>
          {activeTab === 'NOTIFICATIONS' && visibleNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}

          {activeTab === 'MESSAGES' && visibleMessages.map(msg => (
             <div key={msg.id} className={styles.card}>
               <div className={styles.cardHeader}>
                 <span className={styles.cardTitle}>
                   {mockUsers.find(u => u.id === msg.senderId)?.name} 
                   <span style={{color: 'var(--text-muted)', fontWeight: 'normal'}}> to </span> 
                   {mockUsers.find(u => u.id === msg.recipientId)?.name}
                 </span>
                 <span className={styles.cardMeta}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
               </div>
               <div className={styles.cardBody}>{msg.content}</div>
             </div>
          ))}

          {(activeTab === 'NOTIFICATIONS' && visibleNotifications.length === 0) && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
              No active notifications.
            </div>
          )}
        </div>

        {/* Composer for Messages */}
        {activeTab === 'MESSAGES' && (
          <form className={styles.composer} onSubmit={simulateMessage}>
            <input 
              type="text" 
              className={styles.input} 
              placeholder={`Send a message as ${currentUser.name}...`}
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
            />
            <button type="submit" className={styles.actionButton}>Send</button>
          </form>
        )}
      </main>
    </div>
  );
}

function NotificationCard({ notification }: { notification: Notification }) {
  const isCritical = notification.priority === 'CRITICAL';
  
  return (
    <div className={`${styles.card} ${isCritical ? styles.cardCritical : ''} animate-fade-in`}>
      <div className={styles.cardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className={`${styles.badge} ${styles[`badge${notification.priority.charAt(0) + notification.priority.slice(1).toLowerCase()}`]}`}>
            {notification.type}
          </span>
          <span className={styles.cardTitle}>{notification.title}</span>
        </div>
        <div className={styles.cardMeta}>
          {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <div className={styles.cardBody}>
        {notification.message}
      </div>
    </div>
  );
}
