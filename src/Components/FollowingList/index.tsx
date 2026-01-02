import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/Ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../Components/Ui/avatar";
import { ScrollArea } from "../../Components/Ui/scroll-area";

interface Following {
  id: number | string;
  username: string;
  profile_picture_url?: string;
  first_name: string;
  last_name: string;
}

interface FollowingListProps {
  following: Following[];
}

export function FollowingList({ following }: FollowingListProps) {
  return (
    <Card className="bg-[#fdfcf8] border-none shadow-[0_4px_20px_rgba(141,152,76,0.1)] rounded-[2rem] overflow-hidden">
      <CardHeader className="pb-4 pt-6 px-6">
        <CardTitle className="text-lg font-serif font-bold text-[#6c562c] tracking-tight">
          Pessoas que você segue
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="space-y-1 px-4 pb-6">
            {following.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#8d984c]/5 transition-all duration-200 cursor-pointer group"
              >
                <Avatar className="h-10 w-10 ring-2 ring-[#8d984c]/30 group-hover:ring-[#8d984c] transition-all">
                  <AvatarImage
                    src={user.profile_picture_url}
                    alt={user.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-[#8d984c]/10 text-[#8d984c] text-xs font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#6c562c] truncate group-hover:text-[#8d984c] transition-colors">
                    {`${user.first_name} ${user.last_name}`}
                  </p>
                  <p className="text-xs text-[#8d984c]/70 italic truncate">
                    @{user.username.toLowerCase()}
                  </p>
                </div>

                <div className="h-2 w-2 rounded-full bg-[#8d984c]/20 group-hover:bg-[#8d984c] transition-all" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
