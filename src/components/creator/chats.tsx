"use client";

import { useState } from "react";

import {
  Check,
  CheckCheck,
  MoreVertical,
  Phone,
  Search,
  Send,
  Video,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: number;
  sender: "creator" | "brand" | "moderator";
  message: string;
  time: string;
  status: "sent" | "delivered" | "read";
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  type: "brand" | "moderator" | "support";
  lastMessage: string;
  time: string;
  unreadCount: number;
  status: "online" | "offline" | "away";
  messages: ChatMessage[];
}

interface ChatsProps {
  creatorId: number;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "StyleHub Fashion",
    avatar: "SH",
    type: "brand",
    lastMessage: "Great work on the campaign! Looking forward to the next one.",
    time: "2:30 PM",
    unreadCount: 0,
    status: "online",
    messages: [
      {
        id: 1,
        sender: "brand",
        message: "Hi! We loved your application for our summer campaign.",
        time: "2:15 PM",
        status: "read",
      },
      {
        id: 2,
        sender: "creator",
        message: "Thank you! I'm excited to work with your brand.",
        time: "2:20 PM",
        status: "read",
      },
      {
        id: 3,
        sender: "brand",
        message: "Great work on the campaign! Looking forward to the next one.",
        time: "2:30 PM",
        status: "delivered",
      },
    ],
  },
  {
    id: 2,
    name: "Support Team",
    avatar: "ST",
    type: "support",
    lastMessage: "Your verification documents have been approved!",
    time: "1:45 PM",
    unreadCount: 1,
    status: "online",
    messages: [
      {
        id: 1,
        sender: "moderator",
        message: "Hello! We're reviewing your verification documents.",
        time: "1:30 PM",
        status: "read",
      },
      {
        id: 2,
        sender: "creator",
        message: "Thank you! How long does the review process usually take?",
        time: "1:35 PM",
        status: "read",
      },
      {
        id: 3,
        sender: "moderator",
        message: "Your verification documents have been approved!",
        time: "1:45 PM",
        status: "sent",
      },
    ],
  },
  {
    id: 3,
    name: "TechCorp Inc.",
    avatar: "TC",
    type: "brand",
    lastMessage: "Can you share the analytics for the review video?",
    time: "Yesterday",
    unreadCount: 2,
    status: "away",
    messages: [
      {
        id: 1,
        sender: "brand",
        message: "Hi! Your tech review was fantastic!",
        time: "Yesterday",
        status: "read",
      },
      {
        id: 2,
        sender: "creator",
        message: "Thank you! I'm glad you liked it.",
        time: "Yesterday",
        status: "read",
      },
      {
        id: 3,
        sender: "brand",
        message: "Can you share the analytics for the review video?",
        time: "Yesterday",
        status: "sent",
      },
    ],
  },
];

export function Chats({ creatorId }: ChatsProps) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: Date.now(),
      sender: "creator",
      message: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    // Update the selected chat with new message
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, message],
      lastMessage: newMessage,
      time: message.time,
    };

    setSelectedChat(updatedChat);
    setNewMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "brand":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "moderator":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "support":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "brand":
        return "🏢";
      case "moderator":
        return "👨‍💼";
      case "support":
        return "🛠️";
      default:
        return "💬";
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
        <h1 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
          Chats
        </h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex h-[calc(100vh-180px)]">
        {/* Chat List */}
        <div className="w-full border-r border-gray-200 bg-white md:w-80 dark:border-slate-600 dark:bg-slate-800">
          <div className="h-full overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer border-b border-gray-100 p-4 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700 ${
                  selectedChat?.id === chat.id
                    ? "border-r-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(chat.status)}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="truncate font-medium text-gray-900 dark:text-white">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {chat.time}
                      </span>
                    </div>

                    <div className="mb-2 flex items-center gap-2">
                      <Badge
                        className={getTypeColor(chat.type)}
                        variant="outline"
                      >
                        <span className="mr-1">{getTypeIcon(chat.type)}</span>
                        {chat.type}
                      </Badge>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>

                    <p className="truncate text-sm text-gray-600 dark:text-gray-400">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden flex-1 flex-col md:flex">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {selectedChat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {selectedChat.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={getTypeColor(selectedChat.type)}
                          variant="outline"
                        >
                          <span className="mr-1">
                            {getTypeIcon(selectedChat.type)}
                          </span>
                          {selectedChat.type}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedChat.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-900">
                <div className="space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "creator" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                          message.sender === "creator"
                            ? "bg-emerald-600 text-white"
                            : "border border-gray-200 bg-white text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <div
                          className={`mt-2 flex items-center justify-between text-xs ${
                            message.sender === "creator"
                              ? "text-emerald-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          <span>{message.time}</span>
                          {message.sender === "creator" && (
                            <div className="flex items-center">
                              {message.status === "sent" && (
                                <Check className="h-3 w-3" />
                              )}
                              {message.status === "delivered" && (
                                <CheckCheck className="h-3 w-3" />
                              )}
                              {message.status === "read" && (
                                <CheckCheck className="h-3 w-3 text-emerald-300" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-slate-900">
              <div className="text-center">
                <div className="mb-4 text-4xl">💬</div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  Select a conversation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Chat View */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 bg-white md:hidden dark:bg-slate-800">
          {/* Mobile Chat Header */}
          <div className="border-b border-gray-200 p-4 dark:border-slate-600">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedChat(null)}
              >
                ←
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-sm text-white">
                  {selectedChat.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {selectedChat.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedChat.status}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Messages */}
          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <div className="space-y-4">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "creator" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      message.sender === "creator"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-slate-700 dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <div
                      className={`mt-1 text-xs ${
                        message.sender === "creator"
                          ? "text-emerald-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Message Input */}
          <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
