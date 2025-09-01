"use client";

import { useEffect, useRef, useState } from "react";

import { Send, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  text: string;
  sender: "brand" | "creator";
  timestamp: Date;
}

interface BrandMiniChatProps {
  creatorName: string;
  creatorAvatar: string;
  onClose: () => void;
}

export function BrandMiniChat({
  creatorName,
  creatorAvatar,
  onClose,
}: BrandMiniChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi ${creatorName}! We're interested in collaborating with you. Are you available for campaigns?`,
      sender: "brand",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "brand",
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");

      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: "Thank you for reaching out! I'd love to discuss potential collaborations.",
          sender: "creator",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed right-6 bottom-24 z-50 w-80">
      <Card className="border-0 bg-white shadow-2xl dark:bg-slate-800">
        <CardHeader className="border-b border-gray-200 pb-3 dark:border-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-sm font-bold text-white">
                    {creatorAvatar}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white dark:border-slate-800 ${
                    isOnline ? "bg-emerald-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  {creatorName}
                </CardTitle>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-64 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "brand" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    message.sender === "brand"
                      ? "rounded-br-md bg-emerald-500 text-white"
                      : "rounded-bl-md bg-gray-100 text-gray-900 dark:bg-slate-600 dark:text-white"
                  }`}
                >
                  <p className="leading-relaxed">{message.text}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.sender === "brand"
                        ? "text-emerald-100"
                        : "text-gray-500 dark:text-slate-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4 dark:border-slate-600">
            <div className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="max-h-[120px] min-h-[40px] flex-1 resize-none border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                disabled={!newMessage.trim()}
                className="h-auto self-end bg-emerald-600 px-3 py-2 hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-slate-400">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
