import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, Sparkles, Edit, Check } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface LessonPlanMessageProps {
  message: Message;
  onUpdate: (id: string, content: string) => void;
}

const LessonPlanMessage = ({ message, onUpdate }: LessonPlanMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const handleSave = () => {
    onUpdate(message.id, editContent);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-4">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {message.role === "user" ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-foreground" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-foreground">
            {message.role === "user" ? "You" : "AI Assistant"}
          </span>
        </div>

        {message.role === "assistant" && isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[200px] bg-card border-border"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} className="gap-2">
                <Check className="w-4 h-4" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(message.content);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <div className="text-foreground whitespace-pre-wrap bg-card rounded-lg p-4 border border-border">
              {message.content}
            </div>
            {message.role === "assistant" && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlanMessage;
