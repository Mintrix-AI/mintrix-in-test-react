interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  query?: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  if (message.role === "user") {
    return null; // User message is shown as title
  }

  return (
    <div className="animate-fade-in">
      <div className="prose prose-slate max-w-none">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
