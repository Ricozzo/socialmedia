import React from "react";
import { Plus, Users } from "lucide-react";
import { Card, CardContent } from "../../Components/Ui/card";
import { Button } from "../../Components/Ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../Components/Ui/avatar";

interface ProfileCardProps {
  user: {
    username: string;
    profile_picture_url?: string;
  };
  followingCount: number;
}

export function ProfileCard({ user, followingCount }: ProfileCardProps) {
  return (
    <div className="rounded-[0.50rem] shadow-[0_2px_10px_0px_rgba(141,152,76,0.1)]">
      <Card className="bg-[#fdfcf8] border-none shadow-none rounded-[0.50rem] overflow-visible">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-20 w-20 ring-2 ring-[#8d984c]">
              <AvatarImage src={user.profile_picture_url} alt={user.username} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="font-bold text-lg text-foreground">
                {user.username}
              </h2>
              <p className="text-sm text-muted-foreground">
                @{user.username.toLowerCase()}
              </p>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">
                {followingCount} Seguindo
              </span>
            </div>

            <div className="w-full space-y-2">
              <Button className="w-full bg-[#8d984c] hover:bg-[#6c562c] text-primary-foreground gap-2">
                <Plus className="h-4 w-4" />
                Criar Evento
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Users className="h-4 w-4" />
                Ver Seguidores
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
