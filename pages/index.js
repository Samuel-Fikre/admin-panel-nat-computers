import {useSession} from "next-auth/react"
import Nav from "@/components/nav"
import Layout from "@/components/Layout"



export default function Home() {
  const {data:session} = useSession();
  return <Layout>
    <div className="text-red-600 flex justify-between">
      <h2>
      Hello, <b>{session?.user?.name}</b>
      
      </h2>
    <div className="flex bg-gray-300 gap-1 text-black rounded-lg">
      <img src={session?.user?.image} alt="" className="w-6 h-6"></img>
      <span className="px-2">
        {session?.user?.name}
      </span>
    </div>
    </div>
    
  </Layout>
}