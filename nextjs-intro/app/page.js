import Link from "next/link"; // does not trigger a full page reload
import Header from "@/components/header"; // @ refers to the root folder
// this component function is executed on the server side
export default function Home() {
  return (
    <main>
      <Header/>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About page</Link></p>
    </main>
  );
}
