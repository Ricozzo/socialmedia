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
import { IEventResponse } from "../../types";

export function EventCard(event: IEventResponse) {
  // Destructuring para facilitar o uso das variáveis
  const { 
    name, 
    description, 
    event_date, 
    address, 
    _id 
  } = event;

  return (
    <Card className="overflow-hidden animate-fade-in border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        
        {/* Header do Criador */}
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            {/* Note: Ajustei aqui pois creator_id na sua interface é um number */}
            <AvatarFallback className="bg-primary text-primary-foreground">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Usuário {event.creator_id}</p>
            <p className="text-sm text-muted-foreground">
              ID do Criador: {event.creator_id}
            </p>
          </div>
        </div>

        {/* Imagem do Evento */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop"
            alt={name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur text-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {event_date}
            </Badge>
            <Badge variant="secondary" className="bg-card/90 backdrop-blur text-foreground">
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
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1">
                <Heart className="h-4 w-4" />
                <span className="text-sm">0</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1">
              <Users className="h-4 w-4" />
              Participar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}