import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconLogout,
  IconTerminal2,
} from "@tabler/icons-react";
import { Info, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function Navigation() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Apps",
      icon: (
        <LayoutGrid className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/apps",
    },

    {
      title: "About",
      icon: (
        <Info className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/about",
    },
  ];
  const { logout, user } = useAuth();
  return (
    user && (
      <>
        <div className="fixed bottom-4 left-0 right-0 flex items-end justify-center pointer-events-none z-50">
          <div className="pointer-events-auto flex items-center gap-4">
            <FloatingDock items={links} />
          </div>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {user.data.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button className="" onClick={logout} variant="outline">
            <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          </Button>
        </div>
      </>
    )
  );
}
