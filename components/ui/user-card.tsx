import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
import { User } from "@/schema";

  
  export default function UserCard(user: User) {
    const fallback =
      user.username?.slice(0, 2).toUpperCase() ?? "U";
  
    return (
      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
  
          <div>
            {user.username && <CardTitle>{user.username}</CardTitle>}
            {user.email && (
              <p className="text-sm text-muted-foreground">{user.email}</p>
            )}
          </div>
        </CardHeader>
  
        <CardContent className="flex flex-col gap-2 text-sm">
  
          {user.abuseCount !== undefined && (
            <p>
              <strong>Abuse Count:</strong> {user.abuseCount}
            </p>
          )}
  
          {user.isShadowBanned && (
            <p className="text-yellow-600">
              <strong>Shadow Banned</strong>
            </p>
          )}
  
          {user.IsBanned && (
            <p className="text-red-600">
              <strong>Banned</strong>
            </p>
          )}
  
          {user.createdAt && (
            <p>
              <strong>Joined:</strong>{" "}
              {user.createdAt.toDateString()}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }