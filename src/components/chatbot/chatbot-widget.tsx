'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chat, type ChatMessage } from '@/ai/flows/chatbot-flow';
import { useUser } from '@/firebase';

type Message = ChatMessage;

export function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                { role: 'model', content: [{ text: 'Hello buddy, How can I help you?' }] },
            ]);
        }
    }, [isOpen, messages.length]);


    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: [{ text: input }] };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages;
            const responseText = await chat(input, history, { name: user?.displayName, isLoggedIn: !!user });
            const botMessage: Message = { role: 'model', content: [{ text: responseText }] };
            setMessages([...newMessages, botMessage]);
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage: Message = {
                role: 'model',
                content: [{ text: 'Sorry, I encountered an error. Please try again.' }],
            };
            setMessages([...newMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    size="icon"
                    className="rounded-full h-16 w-16 bg-primary shadow-lg hover:bg-primary/90 transition-transform hover:scale-110"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
                </Button>
            </div>

            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50">
                    <Card className="w-80 h-[28rem] flex flex-col shadow-2xl animate-in fade-in-20 slide-in-from-bottom-5">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2 font-headline">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                Krishna AI
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'flex items-end gap-2',
                                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    {msg.role === 'model' && (
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div
                                        className={cn(
                                            'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                                            msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                        )}
                                    >
                                        {msg.content[0].text}
                                    </div>
                                     {msg.role === 'user' && (
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={user?.photoURL ?? ''} />
                                            <AvatarFallback>
                                                {user?.displayName?.charAt(0) ?? 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                     )}
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex items-end gap-2 justify-start">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted rounded-lg px-3 py-2 flex items-center">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </CardContent>
                        <CardFooter>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex w-full items-center space-x-2"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask a question..."
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}
