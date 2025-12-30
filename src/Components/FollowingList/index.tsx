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
}

interface FollowingListProps {
  following: Following[];
}

export function FollowingList({ following }: FollowingListProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Pessoas que você segue
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px]">
          <div className="space-y-1 px-4 pb-4">
            {following.map((following) => (
              <div
                key={following.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={following.profile_picture_url}
                    alt={following.username}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {following.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {following.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{following.username.toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
