/**
 * Notification store for managing UI notifications
 * Store de notificações para gerenciar notificações da UI
 */

import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number; // in milliseconds, 0 = no auto-dismiss
  timestamp: string;
}

interface NotificationState {
  notifications: Notification[];

  // Actions
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  clearByType: (type: Notification['type']) => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date().toISOString(),
      duration: notification.duration ?? 5000, // default 5 seconds
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-dismiss if duration is set
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, newNotification.duration);
    }

    return id;
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () =>
    set({
      notifications: [],
    }),

  clearByType: (type) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.type !== type),
    })),
}));

// Helper functions to quickly add notifications
export const notify = {
  success: (title: string, message?: string, duration?: number) => {
    return useNotificationStore
      .getState()
      .addNotification({ type: 'success', title, message, duration });
  },
  error: (title: string, message?: string, duration?: number) => {
    return useNotificationStore
      .getState()
      .addNotification({ type: 'error', title, message, duration });
  },
  warning: (title: string, message?: string, duration?: number) => {
    return useNotificationStore
      .getState()
      .addNotification({ type: 'warning', title, message, duration });
  },
  info: (title: string, message?: string, duration?: number) => {
    return useNotificationStore
      .getState()
      .addNotification({ type: 'info', title, message, duration });
  },
};
