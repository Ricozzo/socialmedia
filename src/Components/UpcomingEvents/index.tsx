import React from "react";
import { Calendar, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/Ui/card";
import { Badge } from "../../Components/Ui/badge";

interface Events {
  id: number | string;
  name: string;
  event_date: string;
  address: string;
  creator_id: string;
  creator_name?: string;
}

interface UpcomingEventsProps {
  events: Events[];
  currentUserId: string;
}

export function UpcomingEvents({ events, currentUserId }: UpcomingEventsProps) {
  return (
    <Card className="overflow-hidden animate-fade-in border-border/50 shadow-sm hover:shadow-md transition-shadow bg-[#fdfcf8]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => {
          const isMyEvent = String(event.creator_id) === String(currentUserId);

          return (
            <div
              key={event.id}
              className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-sm text-foreground leading-tight">
                  {event.name}
                </h4>
                {isMyEvent && (
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs shrink-0 border-none">
                    Seu evento
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {event.event_date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {isMyEvent ? "Você" : event.creator_name || "Organizador"}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
