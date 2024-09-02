import { useSession } from "next-auth/react";
import Image from "next/image";
import Layout from "@/components/Layout";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-red-600 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg">
          <Image
            src={session?.user?.image}
            alt=""
            width={24} // Adjust width as needed
            height={24} // Adjust height as needed
            className="rounded-full"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
