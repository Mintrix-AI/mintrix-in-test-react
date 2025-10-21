import { useState } from "react";
import { Search, Image as ImageIcon, MapPin, Globe, Calendar, Paperclip, Mic, AudioWaveform, MoreHorizontal, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessageBubble from "./MessageBubble";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  query?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
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
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a demo response. The Perplexity clone interface is now matching the exact design with light theme, minimal sidebar, and proper input styling.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
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
    <div className="flex-1 flex flex-col h-screen bg-background">
      {/* Header (only shown when there are messages) */}
      {messages.length > 0 && (
        <header className="border-b border-border bg-background px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Answer</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-4">
              <Share2 className="w-3 h-3 mr-2" />
              Share
            </Button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              <h1 className="text-5xl font-normal mb-16 text-foreground" style={{ fontWeight: 400 }}>
                perplexity
              </h1>
              
              {/* Empty state input */}
              <div className="w-full max-w-2xl">
                <div className="relative bg-background border border-input rounded-xl shadow-sm">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything or @mention a Space"
                    className="w-full px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none rounded-xl"
                  />
                  
                  <div className="flex items-center justify-between px-3 pb-3 pt-2 border-t border-input/50">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Globe className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={handleSend}
                        disabled={!input.trim()}
                      >
                        <AudioWaveform className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Query title */}
              {messages[0]?.query && (
                <h1 className="text-3xl font-semibold text-foreground mb-6">
                  {messages[0].query}
                </h1>
              )}

              {/* Tabs */}
              <div className="flex gap-6 border-b border-border">
                <button className="pb-3 px-1 text-sm font-medium text-foreground border-b-2 border-foreground">
                  Answer
                </button>
                <button className="pb-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Images
                </button>
                <button className="pb-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Sources
                </button>
                <button className="pb-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Steps
                </button>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                </div>
              )}

              {/* Follow-up Input */}
              <div className="mt-8">
                <div className="relative bg-background border border-input rounded-xl">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a follow-up..."
                    className="w-full px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none rounded-xl"
                  />
                  
                  <div className="flex items-center justify-between px-3 pb-2">
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Search className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Globe className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <AudioWaveform className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
