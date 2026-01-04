import React from "react";
import { Heart, Share2, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "../../Components/Ui/card";
import { Button } from "../../Components/Ui/button";
import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../Components/Ui/avatar";
import { Badge } from "../../Components/Ui/badge";

interface EventCardProps {
  id: number | string;
  username: string;
  profile_picture_url?: string;
  name: string;
  description: string;
  event_date: string;
  address: string;
  event_photo_url: string;
}

export function EventCard({
  id,
  username,
  profile_picture_url,
  name,
  description,
  event_date,
  address,
  event_photo_url,
}: EventCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-[0_4px_20px_rgba(141,152,76,0.12)] rounded-[2.5rem] bg-[#fdfcf8] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(141,152,76,0.18)]">
      <CardContent className="p-0">
        <div className="flex items-center gap-3 p-5">
          <Avatar className="h-12 w-12 ring-2 ring-[#8d984c] ring-offset-2 ring-offset-[#fdfcf8] shadow-sm">
            <AvatarImage
              src={profile_picture_url}
              alt={username}
              className="object-cover"
            />
            <AvatarFallback className="bg-[#8d984c] text-white font-bold">
              {username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-bold text-[#6c562c] leading-none tracking-tight">
              @{username.toLowerCase()}
            </p>
            <span className="text-[10px] text-[#8d984c] font-bold uppercase tracking-widest mt-1 opacity-70">
              Organizador
            </span>
          </div>
        </div>

        <div>
          <div className="relative aspect-[16/9] overflow-hidden shadow-md">
            <img
              src={event_photo_url}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <Badge className="bg-[#fdfcf8]/90 backdrop-blur-md text-[#6c562c] border-none px-3 py-1.5 rounded-full shadow-sm">
                <Calendar className="mr-1.5 h-3.5 w-3.5 text-[#8d984c]" />
                <span className="text-xs font-bold">{event_date}</span>
              </Badge>
              <Badge className="bg-[#fdfcf8]/90 backdrop-blur-md text-[#6c562c] border-none px-3 py-1.5 rounded-full shadow-sm">
                <MapPin className="mr-1.5 h-3.5 w-3.5 text-[#8d984c]" />
                <span className="text-xs font-bold truncate max-w-[140px]">
                  {address}
                </span>
              </Badge>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Link to={`/events/${id}`}>
              <h3 className="font-serif text-2xl font-bold text-[#6c562c] leading-tight transition-colors group-hover:text-[#8d984c]">
                {name}
              </h3>
            </Link>
            <p className="text-[#8d984c]/90 text-sm leading-relaxed line-clamp-3 font-medium">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-[#8d984c]/10">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#8d984c] hover:bg-[#8d984c]/10 hover:text-[#6c562c] rounded-full px-3 transition-all"
              >
                <Heart className="h-5 w-5 mr-1.5 transition-transform active:scale-150" />
                <span className="font-bold text-sm">0</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#8d984c] hover:bg-[#8d984c]/10 rounded-full px-3"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Button className="bg-[#8d984c] hover:bg-[#6c562c] text-white rounded-full shadow-lg shadow-[#8d984c]/20 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-bold">Participar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard;
