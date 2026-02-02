import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 font-headline text-2xl font-extrabold", className)}>
      <Image
        src="https://i.postimg.cc/GmZDxSq8/Final-Logo-Of-SCA.jpg"
        alt="Krishna Group Logo"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="text-foreground">Krishna Group</span>
    </div>
  );
};
