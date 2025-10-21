import { Bell, Search, User, LogOut, Menu, Home, Compass, GraduationCap, Users, Calendar, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const navigationItems = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Chat", icon: Compass, path: "/chat" },
    { 
      label: "Academics",
      icon: GraduationCap,
      children: [
        { label: "Lesson Plan Generator", icon: GraduationCap, path: "/lesson-plan" },
        { label: "Accounts", icon: Users, path: "/accounts" },
        { label: "Timetable", icon: Calendar, path: "/timetable" },
        { label: "Attendance", icon: ClipboardCheck, path: "/attendance" },
      ]
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-4 md:px-6 gap-4 sticky top-0 z-10">
      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[320px]">
          <SheetHeader>
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-1">
            {navigationItems.map((item, index) => (
              item.children ? (
                <Accordion key={index} type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="text-sm font-medium hover:no-underline hover:bg-sidebar-accent px-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1">
                      <div className="space-y-1 pl-3 mt-1">
                        {item.children.map((child, childIndex) => (
                          <button
                            key={childIndex}
                            onClick={() => handleNavigation(child.path)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                          >
                            <child.icon className="w-4 h-4" />
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students, teachers, staff..."
            className="pl-10 bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
