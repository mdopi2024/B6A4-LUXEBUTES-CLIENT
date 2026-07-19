import { LucideIcon } from "lucide-react";

export interface Routes {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

