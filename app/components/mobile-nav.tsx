import { useState } from "react";
import { Link } from "@remix-run/react";
import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="flex h-[calc(100vh-8rem)] flex-col space-y-3">
          <Link to="/">Home</Link>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/features">Features</Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
