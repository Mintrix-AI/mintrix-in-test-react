import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Search, ImageIcon, MapPin, Globe, Calendar, Paperclip, Mic, MoreHorizontal, Bookmark, Share2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MessageBubble from "@/components/MessageBubble";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  query?: string;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      query: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I understand you asked about: "${input}". As an admin assistant, I can help you with school management tasks, reports, and queries. I can provide information on admissions, fees, attendance, teacher performance, and other school-related queries.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-background">
      {/* Header - only show when there are messages */}
      {messages.length > 0 && (
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Answer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="default" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <ScrollArea className="flex-1">
        {messages.length === 0 ? (
          // Empty State - Perplexity Style
          <div className="h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-3xl">
              <h1 className="text-5xl font-semibold text-center mb-12 tracking-tight">
                Admin Assistant
              </h1>
              
              <div className="relative">
                <div className="flex items-start gap-3 border rounded-2xl p-4 bg-background shadow-sm">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything or mention a topic..."
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[60px] text-base p-0"
                  />
                </div>
                
                <div className="flex items-center justify-between mt-3 px-2">
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 text-primary"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <MapPin className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Globe className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Calendar className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={handleSend}
                      size="icon"
                      className="h-9 w-9 rounded-lg bg-primary"
                      disabled={!input.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-6 gap-3 max-w-3xl flex-wrap mx-auto">
                  <Button className="text-[12px] hover:bg-primary">Student report</Button>

                  <Button variant="outline" className="text-[12px] hover:bg-primary">students details</Button>

                  <Button variant="outline" className="text-[12px] hover:bg-primary">Admission </Button>

                  <Button variant="outline" className="text-[12px] hover:bg-primary">Fees and finance</Button>
                  <Button variant="outline" className="text-[12px] hover:bg-primary">Staff report</Button>

                  <Button variant="outline" className="text-[12px] hover:bg-primary">Teachers KPI Report</Button>

                  <Button variant="outline" className="text-[12px] hover:bg-primary">Daily Report</Button>

                  <Button variant="outline" className="text-[12px] hover:bg-primary">Parents details</Button>

                  
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Chat View - Perplexity Style with Multiple Q&A Sections
          <div className="max-w-4xl mx-auto px-4 py-8 pb-32 space-y-12">
            {messages.reduce((acc: JSX.Element[], message, index) => {
              if (message.role === "user") {
                const nextMessage = messages[index + 1];
                acc.push(
                  <div key={message.id} className="space-y-6">
                    {/* Query Title */}
                    <h2 className="text-3xl font-semibold">{message.query}</h2>
                    
                    {/* Tabs */}
                    <div className="flex items-center gap-6 border-b">
                      <button className="flex items-center gap-2 pb-3 border-b-2 border-primary font-medium">
                        <Sparkles className="h-4 w-4" />
                        Answer
                      </button>
                      <button className="flex items-center gap-2 pb-3 text-muted-foreground hover:text-foreground">
                        <ImageIcon className="h-4 w-4" />
                        Images
                      </button>
                      <button className="flex items-center gap-2 pb-3 text-muted-foreground hover:text-foreground">
                        Sources
                      </button>
                    </div>

                    {/* Answer Content */}
                    {nextMessage && nextMessage.role === "assistant" && (
                      <MessageBubble message={nextMessage} />
                    )}
                    
                    {/* Loading state */}
                    {index === messages.length - 1 && isLoading && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75" />
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150" />
                      </div>
                    )}
                  </div>
                );
              }
              return acc;
            }, [])}

            {/* Follow-up Input */}
            <div className="mt-8 pt-6 border-t">
              <div ref={scrollRef} />
              <div className="relative">
                <div className="flex items-start gap-3 border rounded-2xl p-4 bg-background">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a follow-up..."
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                  />
                </div>
                
                <div className="flex items-center justify-between mt-3 px-2">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <MapPin className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Globe className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Calendar className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={handleSend}
                      size="icon"
                      className="h-9 w-9 rounded-lg"
                      disabled={!input.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatPage;
