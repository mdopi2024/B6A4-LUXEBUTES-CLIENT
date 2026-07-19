import { LucideIcon } from "lucide-react";

export type Routes = {
    title: string;
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
    }[];
};

