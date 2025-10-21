import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingChatbot = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/dashboard/admin/chat")}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default FloatingChatbot;
