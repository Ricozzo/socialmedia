import React from "react";
import { Calendar, User, MapPin } from "lucide-react";
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
  username?: string;
}

interface UpcomingEventsProps {
  events: Events[];
  currentUserId: string;
}

export function UpcomingEvents({ events, currentUserId }: UpcomingEventsProps) {
  return (
    <Card className="bg-[#fdfcf8] border-none shadow-[0_4px_20px_rgba(141,152,76,0.1)] rounded-[2rem] overflow-hidden">
      <CardHeader className="pb-4 pt-6 px-6">
        <CardTitle className="text-lg font-serif font-bold text-[#6c562c] flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#8d984c]" />
          Próximos Eventos
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-4 pb-6 space-y-3">
        {events.map((event) => {
          const isMyEvent = String(event.creator_id) === String(currentUserId);

          return (
            <div
              key={event.id}
              className="group p-4 rounded-2xl bg-white border border-[#8d984c]/10 hover:border-[#8d984c]/30 hover:shadow-md hover:shadow-[#8d984c]/5 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-[#6c562c] leading-tight group-hover:text-[#8d984c] transition-colors">
                  {event.name}
                </h4>
                {isMyEvent && (
                  <Badge className="bg-[#8d984c]/10 text-[#8d984c] hover:bg-[#8d984c]/20 text-[10px] uppercase tracking-wider font-bold shrink-0 border-none px-2 py-0.5">
                    Seu evento
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                <div className="flex items-center gap-2 text-xs text-[#8d984c]/80 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{event.event_date}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-[#6c562c]/70">
                  <User className="h-3.5 w-3.5" />
                  <span className="italic">
                    Organizado por: <strong className="font-bold not-italic">{isMyEvent ? "Você" : event.username || "Organizador"}</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {events.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-[#8d984c]/60 italic">Nenhum evento planejado para breve...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}