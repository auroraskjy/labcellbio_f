import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="p-6 border-b border-border/30 h-15 md:h-21.5 sticky top-0 w-full bg-background">
      <Button variant="ghost">
        {/* <BurgerMenuIcon className="w-4 h-4 md:hidden" /> */}
        <MenuIcon className="w-4 h-4 md:hidden" />
      </Button>
    </header>
  );
}
