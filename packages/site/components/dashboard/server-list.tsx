"use client";

import {
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  MoreVertical,
  Plus,
  RefreshCw,
  Settings,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const servers = [
  {
    id: "1",
    name: "Gaming Community",
    icon: "GC",
    iconUrl: null,
    members: 12847,
    messagesDaily: 2847,
    growth: 12.5,
    status: "connected",
    lastSync: "2 minutes ago",
    plan: "Growth",
    permissions: ["read_messages", "manage_channels", "view_audit_log"],
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Tech Support Hub",
    icon: "TS",
    iconUrl: null,
    members: 8234,
    messagesDaily: 1456,
    growth: 8.3,
    status: "connected",
    lastSync: "5 minutes ago",
    plan: "Starter",
    permissions: ["read_messages", "view_audit_log"],
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Creative Studio",
    icon: "CS",
    iconUrl: null,
    members: 3456,
    messagesDaily: 892,
    growth: -2.1,
    status: "error",
    lastSync: "2 hours ago",
    plan: "Personal",
    permissions: ["read_messages"],
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "Study Group",
    icon: "SG",
    iconUrl: null,
    members: 1234,
    messagesDaily: 234,
    growth: 15.7,
    status: "syncing",
    lastSync: "Syncing...",
    plan: "Personal",
    permissions: ["read_messages"],
    color: "bg-orange-500",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "error":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case "syncing":
      return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "connected":
      return (
        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
          Connected
        </Badge>
      );
    case "error":
      return <Badge variant="destructive">Connection Error</Badge>;
    case "syncing":
      return (
        <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          Syncing
        </Badge>
      );
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export function ServerList() {
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  const handleAddServer = () => {
    // Discord OAuth flow would be triggered here
    console.log("Adding new server...");
  };

  const handleServerAction = (serverId: string, action: string) => {
    console.log(`${action} server ${serverId}`);
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="font-inter text-xl">
            Connected Servers
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage Discord servers and their analytics settings
          </p>
        </div>
        <Button onClick={handleAddServer} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Server
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {servers.map((server) => (
          <div
            key={server.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:bg-accent/50 ${
              selectedServer === server.id
                ? "border-primary bg-accent/30"
                : "border-border/50"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Server Icon */}
              <div className="relative">
                <Avatar className="w-16 h-16">
                  {server.iconUrl ? (
                    <AvatarImage src={server.iconUrl || "/placeholder.svg"} />
                  ) : (
                    <AvatarFallback
                      className={`${server.color} text-white font-bold text-lg`}
                    >
                      {server.icon}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute -bottom-1 -right-1">
                  {getStatusIcon(server.status)}
                </div>
              </div>

              {/* Server Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-inter font-semibold text-lg">
                    {server.name}
                  </h3>
                  {getStatusBadge(server.status)}
                  <Badge variant="outline" className="text-xs">
                    {server.plan}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      {server.members.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      {server.messagesDaily.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      daily messages
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp
                      className={`w-4 h-4 ${server.growth >= 0 ? "text-green-500" : "text-red-500"}`}
                    />
                    <span
                      className={`font-medium ${server.growth >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {server.growth >= 0 ? "+" : ""}
                      {server.growth}%
                    </span>
                    <span className="text-muted-foreground">growth</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Last sync: {server.lastSync} • Permissions:{" "}
                  {server.permissions.length} granted
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSelectedServer(
                      selectedServer === server.id ? null : server.id,
                    )
                  }
                >
                  {selectedServer === server.id
                    ? "Hide Details"
                    : "View Details"}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleServerAction(server.id, "settings")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Server Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleServerAction(server.id, "sync")}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Force Sync
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleServerAction(server.id, "remove")}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Server
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedServer === server.id && (
              <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Bot Permissions
                    </h4>
                    <div className="space-y-1">
                      {server.permissions.map((permission) => (
                        <div
                          key={permission}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="capitalize">
                            {permission.replace(/_/g, " ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Data Retention</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>
                        Messages:{" "}
                        {server.plan === "Personal"
                          ? "7 days"
                          : server.plan === "Starter"
                            ? "30 days"
                            : "1 year"}
                      </div>
                      <div>
                        Voice Activity:{" "}
                        {server.plan === "Personal" ? "24 hours" : "30 days"}
                      </div>
                      <div>
                        Member History:{" "}
                        {server.plan === "Personal" ? "30 days" : "Unlimited"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Server CTA */}
        <div className="p-6 border-2 border-dashed border-border/50 rounded-lg text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Add Another Server</h3>
              <p className="text-sm text-muted-foreground">
                Connect more Discord servers to track their analytics
              </p>
            </div>
            <Button onClick={handleAddServer} className="gap-2">
              <Plus className="w-4 h-4" />
              Connect Discord Server
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
