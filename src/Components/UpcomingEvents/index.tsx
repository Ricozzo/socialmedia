import { Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/Ui/card";
import { Badge } from "../../Components/Ui/badge";
import type { UpcomingEvent } from "@/data/mockData";

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium text-sm text-foreground leading-tight">
                {event.title}
              </h4>
              {event.isYours && (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs shrink-0">
                  Seu evento
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {event.organizer}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
