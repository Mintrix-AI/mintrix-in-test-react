// ...existing code...
import { useState } from "react";
import {
  Home,
  Plus,
  Bell,
  User,
  Download,
  Sparkles,
  Library,
  GraduationCap,
  Users,
  Calendar,
  ClipboardCheck,
  UserCheck,
  BookOpen,
  DollarSign,
  MessageSquare,
  Bus,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "../../public/Logo_black.png";

type SidebarSection = "home" | "discover" | "spaces" | "library" | "reports" | null;

// import role based config
import sidebarConfig from "./sidebarConfig.json";

const ICON_MAP: Record<string, any> = {
  Home,
  Plus,
  Bell,
  User,
  Download,
  Sparkles,
  Library,
  GraduationCap,
  Users,
  Calendar,
  ClipboardCheck,
  UserCheck,
  BookOpen,
  DollarSign,
  MessageSquare,
  Bus,
  BarChart3,
  Settings,
};

const Sidebar = () => {
  const [hoveredSection, setHoveredSection] = useState<SidebarSection>(null);
  const navigate = useNavigate();

  // determine user type from localStorage (key: userType)
  const rawType = typeof window !== "undefined" ? localStorage.getItem("userType") : null;
  // normalize to known keys: admin, teacher, student, parent
  const userType = rawType
    ? rawType.toLowerCase().replace(/s$/, "") === "students"
      ? "student"
      : rawType.toLowerCase()
    : "admin"; // default to admin

  // pick config, fallback to admin
  const roleConfig: any = (sidebarConfig as any)[userType] || (sidebarConfig as any)["admin"];

  const categories = roleConfig.categories || [];
  const recentSearches = roleConfig.recentSearches || [];
  const mainNav = roleConfig.mainNav || [];

  return (
    <div className="hidden md:flex h-screen">
      {/* Icon Sidebar - Hidden on Mobile */}
      <aside className="w-[72px] h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center justify-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={logo} className="w-7 h-7 text-foreground" />
          </div>
        </div>

        {/* New Record Button */}
        

        {/* Main Navigation Icons */}
        <nav className="flex-1 px-2">
          <div className="space-y-1">
            {mainNav.map((item: any) => {
              const Icon = ICON_MAP[item.icon] || Home;
              // use the item's key as the hoveredSection value so expandable content matches
              const key = item.key as SidebarSection;
              return (
                <button
                  key={item.key}
                  onMouseEnter={() => setHoveredSection(key)}
                  className={`w-full h-14 flex flex-col items-center justify-center gap-1 rounded-lg transition-colors ${
                    hoveredSection === key
                      ? "text-foreground bg-sidebar-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="text-[11px]">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="px-2 pb-4 space-y-1">
          <button className="w-full h-14 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors">
            <Bell className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[11px]">Notifications</span>
          </button>
          <button className="w-full h-14 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs">Profile</span>
          </button>
          <button className="w-full h-12 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors relative">
            <Settings className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-xs">Settings</span>
          </button>
          <button className="w-full h-12 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg transition-colors relative">
            <Download className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-xs">Export</span>
            <div className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </div>
      </aside>

      {/* Expandable Content Sidebar */}
      <aside
        className={`h-screen bg-sidebar border-r border-sidebar-border transition-all duration-200 overflow-hidden ${
          hoveredSection ? "w-80" : "w-0"
        }`}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="w-80 p-4 animate-fade-in">
          {/* Dashboard Content */}
          {hoveredSection === "home" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Dashboard
                </h2>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {categories.map((category) => (
                  <a key={category.label} href={category.link}>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-sidebar-accent rounded-lg transition-colors">
                      <category.icon className="w-4 h-4" strokeWidth={1.5} />
                      {category.label}
                    </button>
                  </a>
                ))}
                <div className="pt-2 mt-2 border-t border-sidebar-border space-y-1">
                  <button
                    onClick={() => navigate("/students")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                  >
                    <Users className="w-4 h-4" strokeWidth={1.5} />
                    Students
                  </button>
                  <button
                    onClick={() => navigate("/library")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                  >
                    <Library className="w-4 h-4" strokeWidth={1.5} />
                    Library
                  </button>
                  <button
                    onClick={() => navigate("/transport")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                  >
                    <Bus className="w-4 h-4" strokeWidth={1.5} />
                    Transport
                  </button>
                  <button
                    onClick={() => navigate("/staff")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                  >
                    <Users className="w-4 h-4" strokeWidth={1.5} />
                    Staff
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Teachers Content */}
          {hoveredSection === "discover" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Teachers
                </h2>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Manage teacher profiles and assignments
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-sidebar-accent rounded-lg">
                    Teacher Directory
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-sidebar-accent rounded-lg">
                    Subject Assignments
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-sidebar-accent rounded-lg">
                    Performance Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Content */}
          {hoveredSection === "spaces" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Attendance
                </h2>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Track student and staff attendance
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
                <div className="space-y-1 mt-4">
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-sidebar-accent rounded-lg">
                    Daily Attendance
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-sidebar-accent rounded-lg">
                    Attendance Reports
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reports Content */}
          {hoveredSection === "reports" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Reports
                </h2>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto">
                {recentSearches.map((search, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg truncate"
                  >
                    {search}
                  </button>
                ))}
                <button className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-sidebar-accent rounded-lg font-medium">
                  View All Reports
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;