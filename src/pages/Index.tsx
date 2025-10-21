import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <ChatInterface />
    </div>
  );
};

export default Index;
