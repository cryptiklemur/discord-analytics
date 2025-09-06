import {
  Bell,
  Calendar,
  ChevronDown,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const servers = [
  {
    id: "1",
    name: "Gaming Community",
    icon: "GC",
    members: "12,847",
    status: "online",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Tech Support Hub",
    icon: "TS",
    members: "8,234",
    status: "online",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Creative Studio",
    icon: "CS",
    members: "3,456",
    status: "online",
    color: "bg-purple-500",
  },
];

export function DashboardHeader() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-3 hover:bg-accent/50 transition-colors"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    GC
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div className="text-left">
                  <div className="font-inter font-semibold text-sm">
                    Gaming Community
                  </div>
                  <div className="text-xs text-muted-foreground">
                    12,847 members
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  YOUR SERVERS
                </div>
                {servers.map((server) => (
                  <DropdownMenuItem
                    key={server.id}
                    className="p-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="relative">
                        <div
                          className={`w-10 h-10 ${server.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}
                        >
                          {server.icon}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{server.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {server.members} members
                        </div>
                      </div>
                      {server.id === "1" && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3">
                <Plus className="w-4 h-4 mr-3" />
                <span className="font-medium">Add Server</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <Settings className="w-4 h-4 mr-3" />
                <span className="font-medium">Server Settings</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select defaultValue="7d">
            <SelectTrigger className="w-32 h-9 bg-background/50">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Today</SelectItem>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search analytics..."
              className="pl-10 w-64 bg-background/50 border-border/50 focus:bg-background transition-colors"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent/50"
          >
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-3 hover:bg-accent/50 transition-colors"
              >
                <Avatar className="w-8 h-8 border-2 border-border/50">
                  <AvatarImage src="/placeholder-user.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="font-medium text-sm">John Doe</div>
                  <div className="text-xs text-muted-foreground">
                    Personal Plan
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <div className="flex items-center gap-3 p-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder-user.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-xs text-muted-foreground">
                      john@example.com
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>
                Billing & Usage
                <Badge variant="outline" className="ml-auto text-xs">
                  Personal
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
