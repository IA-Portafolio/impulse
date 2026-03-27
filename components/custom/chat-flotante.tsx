"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const CHAT_HISTORY_KEY = 'impulse_chat_history';

const INITIAL_MESSAGE: Message = {
    id: '1',
    content: 'Hello! I am the virtual assistant for Impulse Rentals. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
};

const ChatFlotante: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load saved messages on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CHAT_HISTORY_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.length > 0) {
                    setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
                }
            }
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        try {
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages.slice(-50)));
        } catch { /* ignore */ }
    }, [messages]);

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const sendMessage = async () => {
        const text = inputValue.trim();
        if (!text || isTyping) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            content: text,
            sender: 'user',
            timestamp: new Date(),
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInputValue('');
        setIsTyping(true);

        const botMsgId = (Date.now() + 1).toString();

        // Add empty bot message for streaming
        setMessages(prev => [...prev, { id: botMsgId, content: '', sender: 'bot', timestamp: new Date() }]);

        try {
            // Send conversation history (last 20 messages for context)
            const history = updatedMessages.slice(-20).map(m => ({
                sender: m.sender,
                content: m.content,
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history }),
            });

            if (!response.ok) throw new Error('API error');

            const reader = response.body!.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                fullText += decoder.decode(value, { stream: true });
                const currentText = fullText;
                setMessages(prev =>
                    prev.map(m => m.id === botMsgId ? { ...m, content: currentText } : m)
                );
            }

            if (!fullText) throw new Error('Empty response');
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev =>
                prev.map(m =>
                    m.id === botMsgId
                        ? { ...m, content: 'Sorry, an error occurred. Please try again later.' }
                        : m
                )
            );
        } finally {
            setIsTyping(false);
        }
    };

    const resetConversation = () => {
        const initial = { ...INITIAL_MESSAGE, id: Date.now().toString(), timestamp: new Date() };
        setMessages([initial]);
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify([initial]));
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-14 w-14 rounded-full p-0",
                    "bg-gradient-to-r from-[#ff0054] to-[#fbe40b]",
                    "hover:shadow-lg hover:shadow-[#ff0054]/50 transition-all duration-300",
                    "flex items-center justify-center"
                )}
                aria-label="Chat de atención al cliente"
            >
                {isOpen ? <X className="h-6 w-6 text-[#fefefe]" /> : <MessageCircle className="h-6 w-6 text-[#fefefe]" />}
            </Button>

            {isOpen && (
                <Card className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] shadow-xl border border-[#ff0054]/30 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-4 text-[#fefefe] font-bebas flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image src="/logo-sin-texto.png" alt="Impulse Rentals Logo" fill className="object-contain" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">Impulse Assistant</h3>
                            <p className="text-sm opacity-90">We are here to help you</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={resetConversation}
                                className="h-8 w-8 rounded-full hover:bg-[#fefefe]/10"
                                title="Reset conversation"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                </svg>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-[#fefefe]/10">
                                <X className="h-4 w-4 text-[#fefefe]" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="h-[400px] overflow-y-auto p-4 bg-[#fefefe]/5">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex flex-col max-w-[80%] rounded-lg p-3",
                                        message.sender === "user"
                                            ? "ml-auto bg-[#ff0054] text-[#fefefe]"
                                            : "mr-auto bg-[#fefefe] text-[#060404]"
                                    )}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {message.sender === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                        <span className="text-xs opacity-75">
                                            {message.sender === "bot" ? "Asistente" : "Tú"} • {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex max-w-[80%] rounded-lg p-3 mr-auto bg-[#fefefe] text-[#060404]">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-[#ff0054] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-[#ff0054] rounded-full animate-bounce" style={{ animationDelay: '250ms' }} />
                                        <div className="w-2 h-2 bg-[#ff0054] rounded-full animate-bounce" style={{ animationDelay: '500ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input */}
                    <CardFooter className="p-2 bg-[#fefefe] border-t border-[#ff0054]/20">
                        <div className="flex w-full gap-2">
                            <Input
                                ref={inputRef}
                                placeholder="Write your message..."
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && inputValue.trim()) { e.preventDefault(); sendMessage(); } }}
                                className="flex-1 border-[#ff0054]/30 focus-visible:ring-[#ff0054]"
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-[#ff0054] hover:bg-[#ff0054]/90 text-[#fefefe]"
                                size="icon"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default ChatFlotante;
