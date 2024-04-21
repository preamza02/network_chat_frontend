"use client"
import { ChatProvider } from "./_context/ChatContext";


import Chat from "./_component/home/Chat";

export default function Home() {

  return (
    <main className="bg-[#FAF8ED]">
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </main>
  )
}
