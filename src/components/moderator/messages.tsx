import { useState } from "react";

import {
  Check,
  CheckCheck,
  Mail,
  MoreVertical,
  Phone,
  Search,
  Send,
  Video,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  user: string;
  avatar: string;
  message: string;
  time: string;
  unread: boolean;
  userType: "creator" | "brand" | "user";
  lastMessage: string;
  status: "online" | "offline" | "away";
  unreadCount: number;
}

interface ChatMessage {
  id: number;
  sender: "user" | "moderator";
  message: string;
  time: string;
  status: "sent" | "delivered" | "read";
}

// Mock data - in real app, this would come from props or context
const mockMessages: Message[] = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "SJ",
    message: "Hi, I have questions about verification process",
    time: "10:30 AM",
    unread: true,
    userType: "creator",
    lastMessage: "When will I hear back about my application?",
    status: "online",
    unreadCount: 3,
  },
  {
    id: 2,
    user: "TechCorp Inc.",
    avatar: "TC",
    message: "When will our brand profile be approved?",
    time: "9:45 AM",
    unread: true,
    userType: "brand",
    lastMessage: "We've submitted all required documents",
    status: "away",
    unreadCount: 1,
  },
  {
    id: 3,
    user: "Mike Chen",
    avatar: "MC",
    message: "I reported a video yesterday, any update?",
    time: "Yesterday",
    unread: false,
    userType: "creator",
    lastMessage: "Thank you for your patience",
    status: "offline",
    unreadCount: 0,
  },
  {
    id: 4,
    user: "StyleHub Fashion",
    avatar: "SH",
    message: "Campaign approval timeline?",
    time: "2 days ago",
    unread: false,
    userType: "brand",
    lastMessage: "We're reviewing your campaign proposal",
    status: "online",
    unreadCount: 0,
  },
  {
    id: 5,
    user: "Emma Wilson",
    avatar: "EW",
    message: "Account suspension appeal",
    time: "1 week ago",
    unread: false,
    userType: "creator",
    lastMessage: "Your appeal is under review",
    status: "offline",
    unreadCount: 0,
  },
];

const mockChatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "user",
    message: "Hi, I have questions about verification process",
    time: "10:30 AM",
    status: "read",
  },
  {
    id: 2,
    sender: "moderator",
    message:
      "Hello Sarah! I'd be happy to help you with the verification process. What specific questions do you have?",
    time: "10:32 AM",
    status: "read",
  },
  {
    id: 3,
    sender: "user",
    message:
      "I submitted my application 3 days ago but haven't heard back yet. How long does the review process usually take?",
    time: "10:33 AM",
    status: "read",
  },
  {
    id: 4,
    sender: "moderator",
    message:
      "The standard review time is 5-7 business days. Let me check your application status for you.",
    time: "10:35 AM",
    status: "read",
  },
  {
    id: 5,
    sender: "moderator",
    message:
      "I can see your application is currently under review by our content team. You should receive an email update within 2-3 days.",
    time: "10:36 AM",
    status: "delivered",
  },
  {
    id: 6,
    sender: "user",
    message:
      "Thank you! That's helpful. Is there anything I can do to speed up the process?",
    time: "10:38 AM",
    status: "sent",
  },
];

export function Messages() {
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "creator" | "brand" | "user"
  >("all");

  const filteredMessages = mockMessages.filter((message) => {
    const matchesSearch =
      message.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" || message.userType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    // In real app, this would send the message to the backend
    console.log(`Sending message to ${selectedChat.user}: ${newMessage}`);
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

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "creator":
        return "bg-blue-100 text-blue-800";
      case "brand":
        return "bg-green-100 text-green-800";
      case "user":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] gap-4">
      {/* Messages List */}
      <Card className="w-80 flex-shrink-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Messages</CardTitle>
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 border-b">
              {["all", "creator", "brand", "user"].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "emerald" : "outline"}
                  size="sm"
                  onClick={() =>
                    setFilterType(type as "all" | "creator" | "brand" | "user")
                  }
                  className="rounded-none border-b-0 transition-none first:rounded-tl-md last:rounded-tr-md hover:scale-100 hover:transform-none focus:scale-100 active:scale-100"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="space-y-1">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedChat(message)}
                className={`cursor-pointer p-3 hover:bg-gray-50 ${
                  selectedChat?.id === message.id
                    ? "border-r-2 border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-sm text-white">
                        {message.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(message.status)}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="truncate text-sm font-medium text-gray-900">
                        {message.user}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {message.time}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getUserTypeColor(message.userType)}`}
                      >
                        {message.userType}
                      </Badge>
                      {message.unreadCount > 0 && (
                        <Badge variant="default" className="bg-red-500 text-xs">
                          {message.unreadCount}
                        </Badge>
                      )}
                    </div>

                    <p className="mt-1 truncate text-sm text-gray-600">
                      {message.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex flex-1 flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                      {selectedChat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedChat.user}</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getUserTypeColor(selectedChat.userType)}`}
                      >
                        {selectedChat.userType}
                      </Badge>
                      <span
                        className={`text-xs ${getStatusColor(selectedChat.status).replace("bg-", "text-")}`}
                      >
                        {selectedChat.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="p-2">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {mockChatMessages.map((chatMessage) => (
                  <div
                    key={chatMessage.id}
                    className={`flex ${chatMessage.sender === "moderator" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                        chatMessage.sender === "moderator"
                          ? "bg-gray-100 text-gray-900"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <p className="text-sm">{chatMessage.message}</p>
                      <div
                        className={`mt-2 flex items-center justify-between text-xs ${
                          chatMessage.sender === "moderator"
                            ? "text-gray-500"
                            : "text-blue-100"
                        }`}
                      >
                        <span>{chatMessage.time}</span>
                        <div className="flex items-center space-x-1">
                          {chatMessage.status === "sent" && (
                            <Check className="h-3 w-3" />
                          )}
                          {chatMessage.status === "delivered" && (
                            <CheckCheck className="h-3 w-3" />
                          )}
                          {chatMessage.status === "read" && (
                            <CheckCheck className="h-3 w-3 text-blue-300" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-3">
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
                  variant="emerald"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <Mail className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a message from the list to start chatting
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
