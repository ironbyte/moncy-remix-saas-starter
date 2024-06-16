import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-black">Welcome to Remix</h1>
        <Button asChild>
          <Link to={"/privacy-policy"}>Privacy Policy</Link>
        </Button>
      </div>
    </div>
  );
}
