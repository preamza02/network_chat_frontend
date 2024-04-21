import { useState } from "react";

// import Maginifying from "@/app/_static/Magnifying.png"

import ChatPreviewInterface from "./_interface/chatPreviewInterface";
import Chat from "./_component/home/chat";

import HeaderChatComponent from "./_component/HeaderChatComponent";

import { OnChangeSearch } from "./_utils/onChangeSearch";

export default function Home() {

  return (
    <main className="">
      <Chat />
    </main>
  )
}
