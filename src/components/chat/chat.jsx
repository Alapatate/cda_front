import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { messageService } from "@/services/message";
import { useAuth } from "@/contexts/authContext";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    try {
      messageService.getAllMessages().then((data) => {
        setMessages(data);
      });
    } catch (error) {
      console.error(error);
    }
    const ws = new WebSocket(
      `ws://${import.meta.env.VITE_API_URL}/ws/messages`
    );
    ws.onopen = () => {
      console.log("WebSocket connected to messages ws");
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected from messages ws");
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "messageCreated") {
        console.log(data.data);
        setMessages((prev) => [...prev, data.data]);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    try {
      messageService.sendMessage(input, user.data.displayName);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border bg-background/50 dark:bg-input/20 backdrop-blur rounded-xl shadow-sm w-full   flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center gap-3">
        <Avatar>
          <AvatarFallback>CDA</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">CDA chat</span>
          <span className="text-xs text-muted-foreground">
            Chat with the CDA team
          </span>
        </div>
      </div>

      <ScrollArea id="chat-scroll-area" className="flex-1 p-4 h-[50vh]">
        <div className="space-y-4 h-[50vh]">
          {messages.map((message, index) => {
            const isSelf = message.sender === user.data.displayName;
            return (
              <div
                key={index}
                className={`flex items-end gap-3 ${
                  isSelf ? "justify-end" : "justify-start"
                }`}
              >
                {!isSelf && (
                  <Avatar className="size-7">
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                    isSelf
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  }`}
                >
                  <p className="leading-relaxed wrap-break-word">
                    {message.content}
                  </p>
                  <span
                    className={`mt-1 block text-[10px] opacity-70 ${
                      isSelf
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.sender}
                  </span>
                </div>
                {isSelf && (
                  <Avatar className="size-7">
                    <AvatarFallback className="text-sm">
                      {user.data.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type your message..."
            className="h-11"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button className="h-11 px-5" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
