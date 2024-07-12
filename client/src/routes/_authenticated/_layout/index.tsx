import { SignOutButton, useSession } from "@clerk/clerk-react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import Hero from "../../../components/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const Route = createFileRoute("/_authenticated/_layout/")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const sess = useSession();

  if (!sess.isSignedIn) return <Navigate to={"/login"} />;

  return (
    <div className="w-screen min-h-[80vh]">
      <Hero />
      <div className="flex flex-col items-center gap-8 mt-20">
        <h1 className="text-4xl font-bold">WHAT WE OFFER</h1>
        <div className="flex gap-4 ">
          <div className="flex flex-col gap-4">
            <Card className="shadow-md">
              <CardHeader className="text-2xl font-semibold">
                Clothings
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-base font-semibold text-wrap max-w-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                  doloremque, quia, voluptas, doloribus, consequuntur, velit
                </p>
                <AspectRatio ratio={1}>
                  <img
                    src="https://avatars.githubusercontent.com/u/81360395?v=4"
                    alt=""
                    className="object-cover w-full rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>
            <Button className="space-x-2">
              <p>Browse now!</p>
              <SquareArrowOutUpRightIcon />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="shadow-md">
              <CardHeader className="text-2xl font-semibold">
                Electronics
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-base font-semibold text-wrap max-w-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                  doloremque, quia, voluptas, doloribus, consequuntur, velit
                </p>
                <AspectRatio ratio={1}>
                  <img
                    src="https://avatars.githubusercontent.com/u/81360395?v=4"
                    alt=""
                    className="object-cover w-full rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>
            <Button className="space-x-2">
              <p>Browse now!</p>
              <SquareArrowOutUpRightIcon />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="shadow-md">
              <CardHeader className="text-2xl font-semibold">Tools</CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-base font-semibold text-wrap max-w-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                  doloremque, quia, voluptas, doloribus, consequuntur, velit
                </p>
                <AspectRatio ratio={1}>
                  <img
                    src="https://avatars.githubusercontent.com/u/81360395?v=4"
                    alt=""
                    className="object-cover w-full rounded-md"
                  />
                </AspectRatio>
              </CardContent>
            </Card>
            <Button className="space-x-2">
              <p>Browse now!</p> <SquareArrowOutUpRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <SignOutButton />
    </div>
  );
}
