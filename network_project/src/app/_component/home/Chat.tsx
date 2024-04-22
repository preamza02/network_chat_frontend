"use client"
import { useEffect, useState } from "react";

// import Maginifying from "@/app/_static/Magnifying.png"

import ChatPreviewInterface from "@/app/_interface/chatPreviewInterface";
import MessageInterface from "@/app/_interface/messageInterface";
import { SPEACIAL_COMMAND_ENUNM } from "@/app/_enum/speacial_command";

import ChatPreview from "../Chatpreview";

import { OnChangeSearch } from "@/app/_utils/onChangeSearch";
import filterChatSearchBar from "@/app/_utils/filterChatSearchBar";
import { createMessageListBody } from "@/app/_utils/createMessageListBody";
import { initCommandConnection } from "@/app/_utils/InitCommandConnection";

const mockChatPreview1: ChatPreviewInterface = {
    name: "1",
    id: "",
}
const mockChatPreview2: ChatPreviewInterface = {
    name: "2",
    id: "",
}
const mockChatPreview3: ChatPreviewInterface = {
    name: "3",
    id: "",
}

const mockMessage1: MessageInterface = {
    content: "22",
    isMine: false
}

const mockMessage2: MessageInterface = {
    content: "225",
    isMine: true
}

export default function Chat() {
    const [myName, setMyName] = useState<string>("")
    const [isEnterApp, setIsEnterApp] = useState<boolean>(false)
    const [commandWebsocket, setCommandWebsocket] = useState<WebSocket>()
    const [lastestRecivedCommand, setLastestRevievedCommand] = useState<string>()
    const [isShowGroupChat, setIsShowGroupChat] = useState<boolean>(false)
    const [allUserChat, setAllUserChat] = useState<ChatPreviewInterface[]>([])
    const [allGroupChat, setAllGroupChat] = useState<ChatPreviewInterface[]>([])
    const [allSelectedChat, setAllSelectedChat] = useState<ChatPreviewInterface[]>([])
    const [shownChat, setShownChat] = useState<ChatPreviewInterface[]>([])
    const [chatWebsocket, setChatWebsocket] = useState<WebSocket>()
    const [lastestRecivedMessage, setLastestRevievedMessage] = useState<string>()
    const [searchText, setSearchText] = useState<string>("")
    const [selectedShownChat, setSelectedShownChat] = useState<ChatPreviewInterface>()
    const [shownMessages, setShownMessages] = useState<MessageInterface[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>()

    const myUserId: string = `USER_ID_${Math.floor(Math.random() * 100000)}`

    useEffect(() => {
        if (isEnterApp) {
            initCommandConnection(myName, myUserId, setCommandWebsocket, setLastestRevievedCommand)
            console.log(myUserId)
        }
    }, [isEnterApp])

    useEffect(() => {
        if (commandWebsocket !== undefined) {
            setAllUserChat([mockChatPreview1, mockChatPreview2])
            setAllGroupChat([mockChatPreview3])
            console.log("command server init")
        }
    }, [commandWebsocket])

    useEffect(() => {
        if (lastestRecivedCommand !== undefined && lastestRecivedCommand !== "") {
            const commandString: string = lastestRecivedCommand
            setLastestRevievedCommand("")
            if (commandString.includes(SPEACIAL_COMMAND_ENUNM.NEW_USER)) {

            } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.RENAME_GROUP)) {

            } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.CREATE_GROUP)) {

            } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.DELETE_GROUP)) {

            } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.RENAME_GROUP)) {

            } else {

            }
        }
    }, [lastestRecivedCommand])

    useEffect(() => {
        if (isShowGroupChat) {
            setAllSelectedChat(allGroupChat)
        } else {
            setAllSelectedChat(allUserChat)
        }
    }, [isShowGroupChat, allGroupChat, allUserChat])

    useEffect(() => {
        setShownChat(filterChatSearchBar(allSelectedChat, searchText))
    }, [allSelectedChat, searchText])

    useEffect(() => {
        setShownMessages([mockMessage1, mockMessage2])
    }, [selectedShownChat])

    const sendMessage = () => {
        if (currentMessage !== '') {
            // conn.send(currentMessage)
            setCurrentMessage("")
        }
    }


    return (
        <div className="h-[100vh]">
            <div className="flex flex-row items-top grow h-full">
                <div className={`md:flex md:flex-col h-inherit flex-grow md:float-left md:max-w-[400px] outline-8 border-solid border-r-2 md:p-[30px] md:pr-[10px]`}>
                    <div className="mb-[20px] flex flex-col">
                        <div className="p-[10px] flex flex-row items-center space-x-[10px]">
                            <h1>NAME : </h1>
                            {(!isEnterApp) ?
                                <input name="message" className="h-[50px] bg-[#D9D9D9CC] outline-none my-auto flex-grow p-[10px] rounded-[15px]" type="text" placeholder="Enter Your Name and click enter" value={myName}
                                    onChange={(event) => {
                                        setMyName(event.target.value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            if (myName !== "")
                                                setIsEnterApp(true)
                                            return
                                        }
                                    }}
                                /> :
                                <div className="">
                                    <p className="">{myName}</p>
                                </div>}
                        </div>
                        <div>

                            {(isEnterApp) ? <div className={`${(isShowGroupChat) ? "bg-[#FF0000]" : "bg-[#00FF00]"} flex flex-grow h-[50px] items-center`} onClick={() => setIsShowGroupChat(!isShowGroupChat)}>
                                <p className="m-auto select-none">{(isShowGroupChat) ? "GroupChat" : "ActiveUser"}</p>
                            </div> :
                                <div className="items-center m-auto h-[50px] flex">
                                    <p className="text-center m-auto">Click enter</p>
                                </div>}
                        </div>
                    </div>
                    <div>
                        <div className="p-[10px] md:px-[0px] md:pt-[0px]">
                            <div className="flex flex-row space-x-[10px] m-auto bg-[#D9D9D9] py-[2px] px-[20px] rounded-[5px]">
                                <input onChange={(event) => OnChangeSearch(event, setSearchText)} className="bg-[#D9D9D9] outline-none" type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-[10px]">
                        {(shownChat !== undefined) ? (
                            <ul className="flex flex-col-reverse">
                                {shownChat.map((ChatPreviewProps: ChatPreviewInterface) => <ChatPreview key={ChatPreviewProps.id} chatPreviewProps={ChatPreviewProps} setSelectedShownChat={setSelectedShownChat}></ChatPreview>)}
                            </ul>
                        ) : (<></>)
                        }
                    </div>
                </div>
                <div className={`
        flex-col flex items-top md:flex-col md:float-right flex-grow   my-[0px] md:p-[10px] space-y-[10px]`}>
                    {(selectedShownChat !== undefined) ? (
                        <>
                            <div className="bg-[#FFFFFF] w-[100%] h-[75px] m-auto items-center py-[12px] px-[20px] md:px-[0px]">
                                <div className="flex m-auto flex-row space-x-[20px]">
                                    <h1 className="text-[24px] m-auto">{selectedShownChat.name}</h1>
                                </div>
                            </div>
                            <div className="h-[100px] bg-[#D9D9D9] flex-grow flex-col p-[10px] justify-items-end overflow-y-scroll ">
                                <div className="space-y-[5px] mt-auto flex flex-col">
                                    {createMessageListBody(shownMessages)}
                                </div>
                            </div>
                            <div className="pl-[15px] h-[75px] bg-white flex flex-row space-x-[15px] items-center">
                                <input name="message" className="h-[50px] bg-[#D9D9D9CC] outline-none my-auto flex-grow p-[10px] rounded-[15px]" type="text" placeholder="Typing a message..." value={currentMessage}
                                    onChange={(event) => {
                                        setCurrentMessage(event.target.value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            sendMessage()
                                            return
                                        }
                                    }}
                                />
                                <p></p>
                            </div>
                        </>
                    ) : (<></>)
                    }
                </div>
            </div >
        </div >
    )
}
