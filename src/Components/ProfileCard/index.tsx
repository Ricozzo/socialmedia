import React from "react";
import { Link } from "react-router-dom";
import { Plus, Users, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "../../Components/Ui/card";
import { Button } from "../../Components/Ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../Components/Ui/avatar";

interface ProfileCardProps {
  user: {
    first_name: string;
    username: string;
    profile_picture_url?: string;
  };
  followingCount: number;
}

export function ProfileCard({ user, followingCount }: ProfileCardProps) {
  return (
    <div className="rounded-3xl shadow-[0_4px_20px_rgba(141,152,76,0.15)] transition-all hover:shadow-[0_4px_25px_rgba(141,152,76,0.25)]">
      <Card className="bg-[#fdfcf8] border-none shadow-none rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <Link to={`/profile/${user?.username}`}>
              <Avatar className="h-24 w-24 ring-4 ring-[#8d984c] ring-offset-4 ring-offset-[#fdfcf8] mb-6 shadow-sm">
                <AvatarImage
                  src={user.profile_picture_url}
                  alt={user.username}
                  className="object-cover"
                />
                <AvatarFallback className="bg-[#8d984c] text-white text-3xl font-serif">
                  {user.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="space-y-1 mb-4">
              <h2 className="font-serif text-2xl font-bold text-[#6c562c] tracking-tight">
                {user.first_name}
              </h2>
              <p className="text-sm font-medium text-[#8d984c]/80 italic">
                @{user.username.toLowerCase()}
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#8d984c]/10 rounded-full text-[#8d984c] mb-8">
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {followingCount} Seguindo
              </span>
            </div>

            <div className="w-full space-y-3">
              <Link to={"/events"} className="block w-full">
                <Button className="w-full bg-[#8d984c] hover:bg-[#6c562c] text-white rounded-xl py-6 shadow-md shadow-[#8d984c]/20 transition-all active:scale-[0.98] gap-2">
                  <Plus className="h-5 w-5" />
                  <span className="font-bold">Criar Evento</span>
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="w-full text-[#6c562c] hover:bg-[#8d984c]/5 rounded-xl py-6 gap-2 group"
              >
                <Users className="h-5 w-5 opacity-70" />
                <span className="font-semibold">Ver Seguidores</span>
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
