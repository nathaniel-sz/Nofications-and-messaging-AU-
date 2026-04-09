export type Role = 'ADMIN' | 'DRIVER' | 'PASSENGER';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}

export type NotificationType = 'BOOKING' | 'SYSTEM' | 'ALERT';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Notification {
  id: string;
  recipientId: string; // or 'ALL' for broadcasts
  type: NotificationType;
  priority: Priority;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export const mockUsers: User[] = [
  { id: 'admin1', name: 'System Admin', role: 'ADMIN', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
  { id: 'driver1', name: 'John Doe (Driver 5)', role: 'DRIVER', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Driver' },
  { id: 'passenger1', name: 'Alice Smith', role: 'PASSENGER', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
];

export let mockNotifications: Notification[] = [
  {
    id: 'n1',
    recipientId: 'passenger1',
    type: 'BOOKING',
    priority: 'LOW',
    title: 'Booking Confirmed',
    message: 'Your seat (12A) on Bus 5 is confirmed.',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: true,
  },
  {
    id: 'n2',
    recipientId: 'ALL',
    type: 'SYSTEM',
    priority: 'MEDIUM',
    title: 'Delay Notice',
    message: 'Bus 24 to Greenside is delayed by 15 minutes due to heavy traffic.',
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
    read: false,
  },
  {
    id: 'n3',
    recipientId: 'admin1',
    type: 'ALERT',
    priority: 'CRITICAL',
    title: 'EMERGENCY - Driver 5',
    message: 'Bus has a tyre puncture, stopping for 20 mins. Currently at Route KM 42.',
    timestamp: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
    read: false,
  }
];

export let mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'driver1',
    recipientId: 'admin1',
    content: 'Engine temperature looks a bit high today.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
  },
  {
    id: 'm2',
    senderId: 'admin1',
    recipientId: 'driver1',
    content: 'Noted. Keep the AC off when idle and well route a maintenance check tonight.',
    timestamp: new Date(Date.now() - 7000000).toISOString(),
    read: true,
  }
];

export const setMockNotifications = (newNots: Notification[]) => {
  mockNotifications = newNots;
}
export const setMockMessages = (newMsgs: Message[]) => {
  mockMessages = newMsgs;
}
