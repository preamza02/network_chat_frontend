import { useState } from "react";

import Maginifying from "@/app/_static/Magnifying.png"

import ChatPreviewInterface from "./_interface/chatPreviewInterface";

import HeaderChatComponent from "./_component/HeaderChatComponent";

import { OnChangeSearch } from "./_utils/onChangeSearch";

export default function Home() {
  const [allChat, setAllChat] = useState<ChatPreviewInterface[]>([])
  const [showUser, SetShowUser] = useState<ChatPreviewInterface[]>([])
  return (
    <div className="h-[calc(100vh-64px)]">
      <div className="flex flex-row items-top grow h-full">
        <div className={`md:flex md:flex-col h-inherit flex-grow md:float-left md:max-w-[400px] outline-8 border-solid border-r-2 md:p-[30px] md:pr-[10px]`}>
          <div>
            <HeaderChatComponent Text="Chats"></HeaderChatComponent>
            <div className="p-[10px] md:px-[0px] md:pt-[0px]">
              <div className="flex flex-row space-x-[10px] m-auto bg-[#D9D9D9] py-[2px] px-[20px] rounded-[5px]">
                <img src={Maginifying.src} alt="Maginifying" className="w-[12px] h-[12px] my-auto" />
                <input onChange={(event) => OnChangeSearch(event, allChat, SetShowUser)} className="bg-[#D9D9D9] outline-none" type="text" placeholder="Search" />
              </div>
            </div>
          </div>
          <div className="space-y-[10px]">
            {(showUser !== undefined) ? (
              <ul className="flex flex-col-reverse">
                {/* {showUser.map((ChatHistoryUser: ChatHistoryUserInterface) => <ChatPreview ChatHistoryUser={ChatHistoryUser} setUserId={setTargetUserId} key={String(ChatHistoryUser.Id)} />)} */}
              </ul>
            ) : (<></>)
            }
          </div>
        </div>
        <div className={`flex-col flex items-top md:flex-col md:float-right flex-grow   my-[0px] md:p-[10px] space-y-[10px]`}>
          {/* {(selectedChatHistory !== undefined) ? (
            <>
              <div className="border-solid border-b-2 border-[#D9D9D9a1]">
                <HeaderChatHistory Text={selectedChatHistory.Name} ImgSrc={selectedChatHistory.Picture}></HeaderChatHistory>
              </div>
              <div className="h-[100px] bg-[#D9D9D9] flex-grow flex-col p-[10px] justify-items-end overflow-y-scroll ">
                <div className="space-y-[5px] mt-auto flex flex-col">
                  {chatHistoryBody}
                </div>
              </div>
              <div className="pl-[15px] h-[75px] bg-white flex flex-row space-x-[15px] items-center">
                <img src={PlusIcon.src} alt="Maginifying" className="w-[24px] h-[24px] my-auto" />
                <input name="message" className="h-[50px] bg-[#D9D9D9CC] outline-none my-auto flex-grow p-[10px] rounded-[15px]" type="text" placeholder="Typing a message..." value={currentMessage}
                  onChange={(event) => {
                    setCurrentMessage(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      sendMessage()
                    }
                  }}
                />
                <img src={ImageLogo.src} alt="Maginifying" className="w-[24px] h-[24px] my-auto" />
                <p></p>
              </div>
            </>
          ) : (<></>)
          } */}
        </div>
      </div >
    </div >
  )
}
