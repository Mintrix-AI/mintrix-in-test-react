import { useState } from "react";
import { Save, Send, FileText, BookOpen, Calendar as CalendarIcon, Menu, Maximize2, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const LessonPlanGenerator = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI lesson plan assistant. I can help you create comprehensive lesson plans. What subject and grade level would you like to plan for today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const planContent = `# Lesson Plan: Introduction to ${input}\n\n## Learning Objectives\n- Students will understand the key concepts of ${input}\n- Students will be able to apply the knowledge in practical scenarios\n- Students will demonstrate comprehension through assessment\n\n## Materials Needed\n- Textbook\n- Worksheets\n- Digital resources\n- Interactive whiteboard\n\n## Lesson Procedure\n\n### 1. Introduction (10 minutes)\n- Engage students with a hook activity\n- Present learning objectives\n- Activate prior knowledge\n\n### 2. Direct Instruction (20 minutes)\n- Present key concepts\n- Demonstrate examples\n- Use visual aids and multimedia\n\n### 3. Guided Practice (15 minutes)\n- Work through examples together\n- Address questions and misconceptions\n- Provide scaffolded support\n\n### 4. Independent Practice (10 minutes)\n- Students work on individual tasks\n- Monitor progress and provide feedback\n\n### 5. Closure (5 minutes)\n- Review key concepts\n- Preview next lesson\n- Assign homework\n\n## Assessment\n- **Formative:** Class discussion, exit tickets\n- **Summative:** Quiz, project presentation\n\n## Differentiation\n- Advanced learners: Extension activities\n- Struggling learners: Additional support materials\n- ELL students: Visual aids and vocabulary support`;
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've created a comprehensive lesson plan for ${input}. You can see the full plan on the right side. Would you like me to modify any section?`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setLessonPlan(planContent);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Lesson plan saved as draft",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Published",
      description: "Lesson plan published successfully",
    });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={`flex flex-col h-full bg-background ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Top Navbar with Action Icons */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Lesson Plan Generator</h1>
          </div>
          
          <TooltipProvider>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleSave}>
                    <Save className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save Draft</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handlePublish}>
                    <Send className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Publish</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Drafts</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <BookOpen className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Syllabus</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <CalendarIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Calendar</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Full Screen</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </header>

      {/* Resizable Split View */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup 
          direction="horizontal" 
          className="h-full hidden md:flex"
        >
          {/* Left Panel - Chat */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1 px-4">
                <div className="py-8 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground max-w-[85%] rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-border bg-background p-4">
                <div className="relative flex items-end gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your lesson plan requirements..."
                    className="min-h-[52px] max-h-[200px] resize-none pr-12"
                    rows={1}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="absolute right-2 bottom-2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Lesson Plan Result */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="flex flex-col h-full bg-muted/30">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
                <h2 className="text-sm font-semibold text-foreground">Lesson Plan</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleEditing}
                  className="h-8"
                >
                  {isEditing ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Done
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-6">
                  {lessonPlan ? (
                    isEditing ? (
                      <Textarea
                        value={lessonPlan}
                        onChange={(e) => setLessonPlan(e.target.value)}
                        className="min-h-[600px] font-mono text-sm"
                      />
                    ) : (
                      <div className="prose prose-slate max-w-none">
                        <div className="whitespace-pre-wrap text-foreground">{lessonPlan}</div>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <p className="text-sm">Start a conversation to generate a lesson plan</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Mobile View - Stacked Layout */}
        <div className="flex flex-col h-full md:hidden">
          <ScrollArea className="flex-1 px-4">
            <div className="py-8 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground max-w-[85%] rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Show lesson plan in mobile view */}
              {lessonPlan && (
                <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Generated Lesson Plan</h3>
                    <Button variant="ghost" size="sm" onClick={toggleEditing}>
                      {isEditing ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>
                  </div>
                  {isEditing ? (
                    <Textarea
                      value={lessonPlan}
                      onChange={(e) => setLessonPlan(e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                    />
                  ) : (
                    <div className="prose prose-slate max-w-none">
                      <div className="whitespace-pre-wrap text-sm text-foreground">{lessonPlan}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border bg-background p-4">
            <div className="relative flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your lesson plan requirements..."
                className="min-h-[52px] max-h-[200px] resize-none pr-12"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="absolute right-2 bottom-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default LessonPlanGenerator;
