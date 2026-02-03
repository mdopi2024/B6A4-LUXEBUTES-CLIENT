"use client";

import { Menu } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
}: Navbar1Props) => {
  const { data } = authClient.useSession();
  const router = useRouter();

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <section className="sticky top-0 z-50 shadow-md">
      <div className="">
        {/* Desktop Menu */}
        <nav className="hidden mx-auto px-6 py-3 items-center bg-[#0F766E] justify-between lg:flex">
          {/* Logo */}
          <Link href="/" className="flex justify-center items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="/laxelogo.png"
              className="w-12 h-12 rounded-full border-2 border-[#FBBF24]"
              alt="LuxeBites logo"
            />
            <h1 className="text-2xl font-bold text-white">LuxeBites</h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex justify-center items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div>
            {data?.session ? (
              <button
                onClick={handleLogOut}
                className="border-2 border-[#FBBF24] text-white px-4 py-2 hover:bg-[#FBBF24] hover:text-black hover:font-semibold rounded-md transition-all"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3 font-semibold">
                <Link
                  href={auth.login.url}
                  className="border-2 border-[#FBBF24] text-white hover:bg-[#FBBF24] hover:text-black rounded-md px-4 py-2 transition-all"
                >
                  {auth.login.title}
                </Link>
                <Link
                  href={auth.signup.url}
                  className="rounded-md px-4 py-2 bg-[#FBBF24] text-black hover:bg-[#FBBF24]/90 transition-all"
                >
                  {auth.signup.title}
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block py-3 px-4 bg-[#0F766E] lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/laxelogo.png"
                className="h-10 w-10 rounded-full border-2 border-[#FBBF24]"
                alt="LuxeBites logo"
              />
              <h1 className="text-xl font-bold text-white">LuxeBites</h1>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-[#FBBF24] text-[#FBBF24] hover:bg-[#FBBF24] hover:text-black">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-[#F0FDFA]">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <img
                        src="/laxelogo.png"
                        className="h-10 w-10 rounded-full border-2 border-[#0F766E]"
                        alt="LuxeBites logo"
                      />
                      <span className="text-[#0F766E]">LuxeBites</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  {/* Mobile Navigation Links */}
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-3"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* Mobile Auth Buttons */}
                  <div>
                    {data?.session ? (
                      <div className="flex justify-end">
                        <button
                          onClick={handleLogOut}
                          className="border-2 border-[#0F766E] text-[#0F766E] px-4 py-2 hover:bg-[#0F766E] hover:text-white font-semibold rounded-md transition-all w-full"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Button asChild variant="outline" className="border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild className="bg-[#FBBF24] text-black hover:bg-[#FBBF24]/90">
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className="
            bg-transparent 
            text-white
            hover:bg-[#FBBF24] 
            hover:text-black 
            focus:bg-[#FBBF24] 
            focus:text-black
            data-[active=true]:bg-[#FBBF24] 
            data-[active=true]:text-black
            rounded-md 
            px-4 
            py-2
            font-medium
            transition-all
          "
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b border-teal-200">
        <AccordionTrigger className="text-base py-3 font-semibold text-[#0F766E] hover:no-underline hover:text-[#FBBF24]">
          {item.title}
        </AccordionTrigger>
      </AccordionItem>
    );
  }

  return (
    <Link 
      key={item.title} 
      href={item.url} 
      className="text-base font-semibold text-[#0F766E] hover:text-[#FBBF24] py-2 transition-colors"
    >
      {item.title}
    </Link>
  );
};

export { Navbar1 };