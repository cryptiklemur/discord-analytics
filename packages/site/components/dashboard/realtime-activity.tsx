import {
  Headphones,
  MessageSquare,
  Mic,
  TrendingUp,
  Users,
  Volume2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentJoins = [
  {
    name: "Alex Chen",
    avatar: "/placeholder-user.png",
    time: "2m ago",
    status: "online",
  },
  {
    name: "Sarah Johnson",
    avatar: "/placeholder-user.png",
    time: "5m ago",
    status: "online",
  },
  {
    name: "Mike Rodriguez",
    avatar: "/placeholder-user.png",
    time: "8m ago",
    status: "idle",
  },
  {
    name: "Emma Wilson",
    avatar: "/placeholder-user.png",
    time: "12m ago",
    status: "online",
  },
  {
    name: "David Kim",
    avatar: "/placeholder-user.png",
    time: "15m ago",
    status: "dnd",
  },
];

const voiceChannels = [
  { name: "General Voice", users: 8, active: true, activity: "high" },
  { name: "Gaming Lounge", users: 12, active: true, activity: "high" },
  { name: "Study Hall", users: 3, active: true, activity: "low" },
  { name: "Music Room", users: 5, active: true, activity: "medium" },
  { name: "AFK Channel", users: 2, active: true, activity: "low" },
];

const liveStats = {
  onlineNow: 1456,
  inVoice: 28,
  streaming: 3,
  messagesPerMin: 23,
  peakToday: 1847,
};

const messageActivity = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  messages: Math.floor(Math.random() * 40) + 10,
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "idle":
      return "bg-yellow-500";
    case "dnd":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getActivityColor = (activity: string) => {
  switch (activity) {
    case "high":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "low":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export function RealtimeActivity() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-inter text-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Live Activity Feed
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time community engagement
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">
                {liveStats.onlineNow.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Users className="w-3 h-3" />
                Online Now
              </div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">
                {liveStats.inVoice}
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Mic className="w-3 h-3" />
                In Voice
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {liveStats.messagesPerMin}
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <MessageSquare className="w-3 h-3" />
                Messages/min
              </div>
            </div>
            <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-400">
                {liveStats.streaming}
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Volume2 className="w-3 h-3" />
                Streaming
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            Voice Channels
          </h4>
          <div className="space-y-2">
            {voiceChannels.map((channel) => (
              <div
                key={channel.name}
                className="flex items-center justify-between p-2 bg-muted/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{channel.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`text-xs ${getActivityColor(channel.activity)}`}
                  >
                    {channel.activity}
                  </div>
                  <Badge
                    variant={channel.active ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {channel.users} users
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Recent Joins
          </h4>
          <div className="space-y-3">
            {recentJoins.map((user) => (
              <div
                key={user.name}
                className="flex items-center gap-3 p-2 bg-muted/20 rounded-lg"
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-background`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {user.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.time}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs capitalize">
                  {user.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Message Activity (Last 20 min)
          </h4>
          <div className="flex items-end gap-1 h-16 bg-muted/20 rounded-lg p-2">
            {messageActivity.map((data, i) => (
              <div
                key={i}
                className="bg-blue-500/60 rounded-sm flex-1 transition-all duration-300 hover:bg-blue-500/80"
                style={{ height: `${(data.messages / 50) * 100}%` }}
                title={`${data.messages} messages`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>20m ago</span>
            <span>Peak: {liveStats.peakToday} today</span>
            <span>Now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
