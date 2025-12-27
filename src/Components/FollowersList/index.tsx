import { Card, CardContent, CardHeader, CardTitle } from "../../Components/Ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/Ui/avatar";
import { ScrollArea } from "../../Components/Ui/scroll-area";
import type { User } from "@/data/mockData";

interface FollowersListProps {
  followers: User[];
}

export function FollowersList({ followers }: FollowersListProps) {
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
            {followers.map((follower) => (
              <div
                key={follower.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={follower.avatar} alt={follower.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {follower.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {follower.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{follower.username}
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
