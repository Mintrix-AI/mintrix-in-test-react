import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";

interface CalendarViewProps {
  onDateClick: (date: string) => void;
}

const CalendarView = ({ onDateClick }: CalendarViewProps) => {
  const [calendarView, setCalendarView] = useState<"dayGridMonth" | "dayGridWeek" | "dayGridDay">("dayGridMonth");

  // Sample events from localStorage
  const getStoredEvents = () => {
    const events = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("lessonPlan-")) {
        const date = key.replace("lessonPlan-", "");
        events.push({
          title: "📝 Lesson Plan",
          date: date,
          backgroundColor: "hsl(var(--primary))",
          borderColor: "hsl(var(--primary))",
        });
      }
    }
    return events;
  };

  const handleDateClick = (info: any) => {
    const clickedDate = new Date(info.dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Only allow future dates or today
    if (clickedDate >= today) {
      onDateClick(info.dateStr);
    }
  };

  return (
    <div className="h-full w-auto  flex flex-col p-6">
      {/* View Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant={calendarView === "dayGridDay" ? "default" : "outline"}
          size="sm"
          onClick={() => setCalendarView("dayGridDay")}
        >
          Day
        </Button>
        <Button
          variant={calendarView === "dayGridWeek" ? "default" : "outline"}
          size="sm"
          onClick={() => setCalendarView("dayGridWeek")}
        >
          Week
        </Button>
        <Button
          variant={calendarView === "dayGridMonth" ? "default" : "outline"}
          size="sm"
          onClick={() => setCalendarView("dayGridMonth")}
        >
          Month
        </Button>
      </div>

      {/* Calendar */}
      <div className="flex-1 w-full max-w-[1000px] bg-card rounded-lg border border-border p-4 overflow-auto">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={calendarView}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          dateClick={handleDateClick}
          events={getStoredEvents()}
          weekends={false}
          height="100%"
          
          eventDisplay="block"
          dayMaxEvents={3}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "08:00",
            endTime: "17:00",
          }}
          dayCellClassNames={(arg) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const cellDate = new Date(arg.date);
            cellDate.setHours(0, 0, 0, 0);

            // Highlight working days
            if (arg.isToday) return "bg-primary/10";
            if (cellDate >= today && !arg.isOther) return "bg-secondary/30 hover:bg-secondary/50 cursor-pointer";
            return "";
          }}
        />
      </div>
    </div>
  );
};

export default CalendarView;
