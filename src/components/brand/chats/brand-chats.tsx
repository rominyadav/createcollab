"use client";

import { useState } from "react";

import {
  ArrowLeft,
  Building2,
  Check,
  CheckCheck,
  MoreVertical,
  Phone,
  Search,
  Send,
  Shield,
  UserCheck,
  Users,
  Video,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/user-ui/page-header";

interface ChatMessage {
  id: number;
  sender: "brand" | "creator" | "moderator";
  message: string;
  time: string;
  status: "sent" | "delivered" | "read";
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  type: "creator" | "brand_admin" | "moderator" | "support";
  lastMessage: string;
  time: string;
  unreadCount: number;
  status: "online" | "offline" | "away";
  messages: ChatMessage[];
}

interface BrandChatsProps {
  brandId: number;
  creatorId: number;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    type: "creator",
    lastMessage: "I'd love to work on your fashion campaign!",
    time: "2:30 PM",
    unreadCount: 1,
    status: "online",
    messages: [
      {
        id: 1,
        sender: "creator",
        message: "Hi! I saw your fashion campaign and I'm very interested.",
        time: "2:15 PM",
        status: "read",
      },
      {
        id: 2,
        sender: "brand",
        message: "Great! Your profile looks perfect for our campaign.",
        time: "2:20 PM",
        status: "read",
      },
      {
        id: 3,
        sender: "creator",
        message: "I'd love to work on your fashion campaign!",
        time: "2:30 PM",
        status: "sent",
      },
    ],
  },
  {
    id: 2,
    name: "CreateCollab Support",
    avatar: "CC",
    type: "support",
    lastMessage: "Your campaign has been approved and is now live!",
    time: "1:45 PM",
    unreadCount: 0,
    status: "online",
    messages: [
      {
        id: 1,
        sender: "moderator",
        message: "Your campaign has been approved and is now live!",
        time: "1:45 PM",
        status: "sent",
      },
    ],
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "EW",
    type: "creator",
    lastMessage: "When do you need the deliverables?",
    time: "Yesterday",
    unreadCount: 0,
    status: "away",
    messages: [
      {
        id: 1,
        sender: "brand",
        message:
          "Welcome to our campaign! Looking forward to working with you.",
        time: "Yesterday",
        status: "read",
      },
      {
        id: 2,
        sender: "creator",
        message: "Thank you! I'm excited to get started.",
        time: "Yesterday",
        status: "read",
      },
      {
        id: 3,
        sender: "creator",
        message: "When do you need the deliverables?",
        time: "Yesterday",
        status: "sent",
      },
    ],
  },
  {
    id: 4,
    name: "Raj Sharma",
    avatar: "RS",
    type: "creator",
    lastMessage: "The video is ready for review!",
    time: "2 days ago",
    unreadCount: 2,
    status: "online",
    messages: [
      {
        id: 1,
        sender: "creator",
        message: "The video is ready for review!",
        time: "2 days ago",
        status: "sent",
      },
    ],
  },
];

export function BrandChats({ brandId, creatorId }: BrandChatsProps) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredChats = (tabType: string) => {
    let chats = mockChats;

    switch (tabType) {
      case "creators":
        chats = mockChats.filter((chat) => chat.type === "creator");
        break;
      case "admins":
        chats = mockChats.filter((chat) => chat.type === "brand_admin");
        break;
      case "support":
        chats = mockChats.filter(
          (chat) => chat.type === "support" || chat.type === "moderator"
        );
        break;
      default:
        chats = mockChats;
    }

    return chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredChats = getFilteredChats(activeTab);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: Date.now(),
      sender: "brand",
      message: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

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
      case "creator":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "brand_admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "moderator":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "support":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "creator":
        return "🎨";
      case "brand_admin":
        return "🏢";
      case "moderator":
        return "👨💼";
      case "support":
        return "🛠️";
      default:
        return "💬";
    }
  };

  return (
    <div className="pb-20 md:pb-8">
      <PageHeader title="Chats" />

      <div className="flex h-[calc(100vh-180px)]">
        {/* Chat List */}
        <div
          className={`bg-background w-full border-r md:w-80 ${selectedChat ? "hidden md:block" : ""}`}
        >
          {/* Search & Tabs - Desktop */}
          <div className="hidden border-b p-4 md:block">
            <div className="relative mb-4">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted grid w-full grid-cols-4">
                <TabsTrigger
                  value="all"
                  className="flex items-center gap-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <Users className="h-3 w-3" />
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="creators"
                  className="flex items-center gap-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <UserCheck className="h-3 w-3" />
                  Creators
                </TabsTrigger>
                <TabsTrigger
                  value="admins"
                  className="flex items-center gap-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <Building2 className="h-3 w-3" />
                  Admins
                </TabsTrigger>
                <TabsTrigger
                  value="support"
                  className="flex items-center gap-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <Shield className="h-3 w-3" />
                  Support
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Mobile Search & Tabs */}
          <div className="p-4 md:hidden">
            <div className="relative mb-4">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted grid w-full grid-cols-4">
                <TabsTrigger
                  value="all"
                  className="flex items-center gap-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <Users className="h-3 w-3" />
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="creators"
                  className="flex items-center gap-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <UserCheck className="h-3 w-3" />
                  Creators
                </TabsTrigger>
                <TabsTrigger
                  value="admins"
                  className="flex items-center gap-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <Building2 className="h-3 w-3" />
                  Admins
                </TabsTrigger>
                <TabsTrigger
                  value="support"
                  className="flex items-center gap-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                >
                  <Shield className="h-3 w-3" />
                  Support
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="h-full overflow-y-auto">
            {filteredChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 text-4xl">💬</div>
                <h3 className="mb-2 text-lg font-medium">
                  No conversations found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or check other tabs
                </p>
              </div>
            ) : (
              filteredChats.map((chat) => (
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
                          {chat.type.replace("_", " ")}
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
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex-col ${selectedChat ? "flex" : "hidden md:flex"}`}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-gray-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedChat(null)}
                      className="md:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
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
                          {selectedChat.type.replace("_", " ")}
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
                      className={`flex ${message.sender === "brand" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                          message.sender === "brand"
                            ? "bg-emerald-600 text-white"
                            : "border border-gray-200 bg-white text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <div
                          className={`mt-2 flex items-center justify-between text-xs ${
                            message.sender === "brand"
                              ? "text-emerald-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          <span>{message.time}</span>
                          {message.sender === "brand" && (
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
    </div>
  );
}
