"use client";

import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Terminal, TypingAnimation } from "@/components/ui/terminal";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-4xl text-foreground">404</h1>
        <p className="text-muted-foreground">Page not found</p>
      </div>

      <Terminal className="h-80 border-zinc-800 bg-zinc-950 text-zinc-100">
        <TypingAnimation className="text-zinc-400" delay={0}>
          lucabecker@localhost ~ %
        </TypingAnimation>

        <TypingAnimation className="text-red-500" delay={1600}>
          Error: Route not found
        </TypingAnimation>
      </Terminal>

      <Button
        asChild
        className="mt-16 flex items-center gap-2 border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 hover:text-zinc-950"
        variant="outline"
      >
        <a href="/">
          <Home className="h-4 w-4" />
          Go home
        </a>
      </Button>
    </div>
  );
}
