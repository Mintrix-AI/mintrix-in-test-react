import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Save, ArrowLeft, Edit, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LessonPlanMessage from "./LessonPlanMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatCanvasProps {
  date: string;
  onBack: () => void;
}

const ChatCanvas = ({ date, onBack }: ChatCanvasProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlanDraft, setLessonPlanDraft] = useState("");
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load saved lesson plan from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`lessonPlan-${date}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(parsed.messages || []);
        setLessonPlanDraft(parsed.draft || "");
      } catch (e) {
        console.error("Failed to load saved lesson plan", e);
      }
    } else {
      // Initial AI greeting
      const welcomeMsg: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm here to help you create a lesson plan for ${new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}.\n\nWhat subject and topic would you like to plan for? Please share:\n• Grade level\n• Subject\n• Topic/Unit\n• Learning objectives\n• Duration`,
      };
      setMessages([welcomeMsg]);
    }
  }, [date]);

  // Auto-scroll to bottom
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
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const lessonPlan = generateLessonPlanResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: lessonPlan,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLessonPlanDraft(lessonPlan); // Update the draft panel
      setIsLoading(false);
    }, 1500);
  };

  const generateLessonPlanResponse = (userInput: string) => {
    return `# Lesson Plan: ${userInput}\n\n**Date:** ${new Date(date).toLocaleDateString()}\n\n## Learning Objectives\n• Students will be able to understand the core concepts\n• Students will demonstrate mastery through practical application\n• Students will collaborate effectively with peers\n\n## Materials Needed\n• Textbook (Chapter 5)\n• Worksheets (attached)\n• Whiteboard and markers\n• Multimedia presentation\n• Student notebooks\n\n## Lesson Structure (45 minutes)\n\n### 1. Introduction & Hook (5 min)\n• Attention-grabbing activity or question\n• Connect to prior knowledge\n• State learning objectives clearly\n\n### 2. Direct Instruction (15 min)\n• Present new concept with examples\n• Model problem-solving techniques\n• Check for understanding through questioning\n\n### 3. Guided Practice (15 min)\n• Students work in pairs on structured activities\n• Teacher circulates and provides support\n• Address misconceptions immediately\n\n### 4. Independent Practice (7 min)\n• Students apply learning individually\n• Complete practice problems or short assignment\n• Self-assessment opportunity\n\n### 5. Closure & Review (3 min)\n• Summarize key takeaways\n• Quick formative assessment (exit ticket)\n• Preview next lesson's topic\n\n## Assessment Methods\n**Formative:**\n• Question and answer during lesson\n• Observation during group work\n• Exit ticket analysis\n\n**Summative:**\n• End-of-unit quiz\n• Project presentation\n\n## Differentiation Strategies\n• Advanced learners: Challenge problems\n• Struggling students: Additional scaffolding and peer support\n• ELL support: Visual aids and simplified language\n\n## Homework/Extension\n• Complete practice worksheet (pages 45-46)\n• Read ahead Chapter 6 for next class\n\n---\n\n*You can now refine, expand, or request adjustments to this lesson plan.*`;
  };

  const handleSave = () => {
    const dataToSave = {
      messages,
      draft: lessonPlanDraft,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(`lessonPlan-${date}`, JSON.stringify(dataToSave));
    toast({
      title: "Lesson Plan Saved Successfully",
      description: `Your lesson plan for ${new Date(date).toLocaleDateString()} has been saved.`,
    });
  };

  const handleUpdateMessage = (id: string, newContent: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, content: newContent } : msg))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full w-full ">
      {/* Left Side - Chat Interface */}
      <div className="flex flex-col w-1/2 border-r border-border">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="font-medium text-foreground">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <p className="text-sm text-muted-foreground">AI Lesson Planner</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6 pb-32">
            {messages.map((message) => (
              <LessonPlanMessage
                key={message.id}
                message={message}
                onUpdate={handleUpdateMessage}
              />
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75" />
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150" />
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-background px-6 py-4">
          <div className="flex items-end gap-3 border border-gray-300 shadow-black bg-gray-50 rounded-2xl p-4 bg-card">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your lesson requirements or ask for modifications..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[60px] max-h-[200px]"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="h-10 w-10 rounded-lg flex-shrink-0"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Editable Lesson Plan Draft */}
      <div className="flex flex-col w-1/2 bg-background">
        {/* Draft Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border">
          <h3 className="font-medium text-foreground">Lesson Plan Draft</h3>
          <div className="flex items-center gap-2">
            {isEditingDraft ? (
              <Button
                size="sm"
                onClick={() => setIsEditingDraft(false)}
                className="gap-2"
              >
                <Check className="w-4 h-4" />
                Done Editing
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditingDraft(true)}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
            <Button onClick={handleSave} size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button onClick={handleSave} size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Publish
            </Button>
          </div>
        </div>

        {/* Draft Content */}
        <ScrollArea className="flex-1 px-6 py-4">
          {lessonPlanDraft ? (
            isEditingDraft ? (
              <Textarea
                value={lessonPlanDraft}
                onChange={(e) => setLessonPlanDraft(e.target.value)}
                className="min-h-[calc(100vh-200px)] font-mono text-sm border-0 bg-transparent focus-visible:ring-0 resize-none"
              />
            ) : (
              <div className="prose prose-sm max-w-none">
                {lessonPlanDraft.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-3xl font-bold mb-4 text-foreground">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-2xl font-semibold mt-6 mb-3 text-foreground">{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-xl font-semibold mt-4 mb-2 text-foreground">{line.substring(4)}</h3>;
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={idx} className="font-bold my-2 text-foreground">{line.replace(/\*\*/g, '')}</p>;
                  } else if (line.startsWith('• ')) {
                    return <li key={idx} className="ml-4 my-1 text-foreground">{line.substring(2)}</li>;
                  } else if (line.startsWith('---')) {
                    return <hr key={idx} className="my-6 border-border" />;
                  } else if (line.trim() === '') {
                    return <br key={idx} />;
                  } else {
                    return <p key={idx} className="my-2 text-foreground">{line}</p>;
                  }
                })}
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Start chatting to generate your lesson plan</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ChatCanvas;
