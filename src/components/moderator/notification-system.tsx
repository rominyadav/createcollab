import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "success",
        title: "Creator Approved",
        message:
          "Sarah Johnson's creator profile has been approved successfully.",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
      },
      {
        id: "2",
        type: "warning",
        title: "Video Reported",
        message:
          "New video reported for inappropriate content. Requires immediate review.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
      },
      {
        id: "3",
        type: "info",
        title: "Brand Profile Pending",
        message: "TechCorp Inc. brand profile is awaiting your review.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: true,
      },
      {
        id: "4",
        type: "error",
        title: "System Alert",
        message:
          "High number of pending reviews detected. Consider increasing moderation staff.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
      },
      {
        id: "5",
        type: "success",
        title: "Campaign Launched",
        message:
          "Summer Fashion Campaign has been successfully launched with 15 creators.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: true,
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Icon name="checkCircle" variant="success" />;
      case "warning":
        return <Icon name="alertCircle" variant="warning" />;
      case "info":
        return <Icon name="info" variant="info" />;
      case "error":
        return <Icon name="xCircle" variant="destructive" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative h-9 w-9 rounded-md"
      >
        <Icon name="bell" size="sm" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs font-bold"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute top-12 right-0 z-50 max-h-[70vh] w-[500px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-slate-600 dark:bg-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-slate-600 dark:bg-slate-700">
            <div className="flex items-center gap-2">
              <Icon name="bell" variant="muted" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <Badge variant="default" className="bg-emerald-600 text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotifications(false)}
                className="h-8 w-8 p-0"
              >
                <Icon name="x" size="sm" />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[calc(70vh-80px)] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Icon
                  name="bell"
                  size="2xl"
                  variant="muted"
                  className="mx-auto mb-3"
                />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 ${notification.read ? "opacity-75" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between">
                          <h4
                            className={`text-sm font-medium ${
                              notification.read
                                ? "text-gray-600 dark:text-gray-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                          >
                            <Icon name="x" size="xs" />
                          </Button>
                        </div>
                        <p
                          className={`mt-1 text-sm ${
                            notification.read
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 px-2 text-xs"
                            >
                              Mark read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-3 text-center dark:border-slate-600 dark:bg-slate-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNotifications([])}
                className="text-xs"
              >
                Clear all notifications
              </Button>
            </div>
          )}
        </div>
      )}

      {/* No backdrop - clean interface */}
    </div>
  );
}
