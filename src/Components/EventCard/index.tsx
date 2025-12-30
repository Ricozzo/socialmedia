import React from "react";
import { Heart, Share2, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "../../Components/Ui/card";
import { Button } from "../../Components/Ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../Components/Ui/avatar";
import { Badge } from "../../Components/Ui/badge";

interface EventCardProps {
  username: string;
  profile_picture_url?: string;
  name: string;
  description: string;
  event_date: string;
  address: string;
  event_photo_url: string;
}

export function EventCard({
  username,
  profile_picture_url,
  name,
  description,
  event_date,
  address,
  event_photo_url,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden animate-fade-in border-border/50 shadow-sm hover:shadow-md transition-shadow bg-[#fdfcf8]">
      <CardContent className="p-0">
        {/* Header do Criador */}
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-16 w-16 ring-2 ring-[#8d984c]">
            <AvatarImage src={profile_picture_url} alt={username} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-foreground">@{username}</p>
          </div>
        </div>

        {/* Imagem do Evento */}
        <div className="relative aspect-[2/1] overflow-hidden">
          <img
            src={event_photo_url}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge
              variant="secondary"
              className="bg-card/90 backdrop-blur text-foreground"
            >
              <Calendar className="mr-1 h-3 w-3" />
              {event_date}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-card/90 backdrop-blur text-foreground"
            >
              <MapPin className="mr-1 h-3 w-3" />
              {address}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-bold text-lg text-foreground">{name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary gap-1"
              >
                <Heart className="h-4 w-4" />
                <span className="text-sm">0</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary gap-1"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="sm"
              className="bg-[#8d984c] hover:bg-[#6c562c] text-primary-foreground gap-1"
            >
              <Users className="h-4 w-4 bg-[#8d984c] hover:bg-[#6c562c]" />
              Participar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCard;
