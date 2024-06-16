import type { MetaFunction } from "@remix-run/node";

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
      </div>
    </div>
  );
}
