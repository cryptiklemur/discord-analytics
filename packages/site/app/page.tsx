"use client";

import type { User } from "@supabase/supabase-js";
import { Bell, Rocket, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactComponent as Discord } from "@/lib/discord.svg";
import { createClient } from "@/lib/supabase/client";

export default function ComingSoonPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Check for current user
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleDiscordSignUp = async () => {
    setIsSigningUp(true);

    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "identify guilds",
      },
    });

    setIsSigningUp(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="glass-strong border-b border-border/50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/discord-analytics-logo.png"
              alt="Discord Analytics"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold font-inter">
              DiscordAnalytics
            </span>
          </div>

          {user && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bell className="w-4 h-4" />
              <span>You'll be notified when we launch!</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Coming Soon
          </div>

          {/* Hero Content */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance font-inter">
            Beautiful Discord Analytics
            <br />
            <span className="text-primary">Are Almost Here</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            We're putting the finishing touches on the most comprehensive
            Discord analytics platform ever built. Get notified the moment we
            launch and be among the first to unlock your community's potential.
          </p>

          {/* Sign Up Section */}
          <div className="glass-strong rounded-xl p-8 max-w-md mx-auto mb-16">
            {user ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-inter">
                  You're on the list!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Thanks for signing up! We'll notify you at{" "}
                  <span className="text-foreground font-medium">
                    {user.email}
                  </span>{" "}
                  when we launch.
                </p>
                <div className="text-sm text-muted-foreground">
                  Signed in as {user.user_metadata?.full_name || user.email}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#5865F2]/20 flex items-center justify-center mx-auto mb-4">
                  <Discord className="w-8 h-8 text-[#5865F2]" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-inter">
                  Get Launch Notifications
                </h3>
                <p className="text-muted-foreground mb-6">
                  Sign in with Discord to be notified when we launch and get
                  early access to your server analytics.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  onClick={handleDiscordSignUp}
                  disabled={isSigningUp}
                >
                  <Discord className="w-5 h-5 mr-2 text-white" />
                  {isSigningUp ? "Connecting..." : "Sign in with Discord"}
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  We'll only use this to notify you about the launch
                </p>
              </div>
            )}
          </div>

          {/* Preview Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="glass text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-inter">Real-Time Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track member growth, engagement, and activity patterns with
                  beautiful real-time dashboards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-chart-2/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-chart-2" />
                </div>
                <CardTitle className="font-inter">Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI-powered insights that help you understand what makes your
                  community thrive.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass text-center">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-chart-3/20 flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle className="font-inter">Growth Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Actionable recommendations and automated reports to help grow
                  your Discord server.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image
              src="/discord-analytics-logo.png"
              alt="Discord Analytics"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-lg font-bold font-inter">
              DiscordAnalytics
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DiscordAnalytics. Coming soon to
            Discord communities everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}
