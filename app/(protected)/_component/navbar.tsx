"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 justify-between h-min max-w-[700px] w-full bg-gray-50 rounded-md px-4 py-2 shadow-sm">
      <div className="flex gap-2 items-center">
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/setting" ? "default" : "outline"}
        >
          <Link href="/setting">Settings</Link>
        </Button>
      </div>
          <div className="w-10 aspect-square">
              <UserButton />
      </div>
    </nav>
  );
}

export default Navbar;
