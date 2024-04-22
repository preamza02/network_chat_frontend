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
import { commandInterface } from "@/app/_interface/commandInterface";

const mockChatPreview1: ChatPreviewInterface = {
    name: "1",
    id: "1",
}
const mockChatPreview2: ChatPreviewInterface = {
    name: "2",
    id: "2",
}
const mockChatPreview3: ChatPreviewInterface = {
    name: "3",
    id: "3",
}

const mockMessage1: MessageInterface = {
    content: "22",
    isMine: false
}

const mockMessage2: MessageInterface = {
    content: "225",
    isMine: true
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Chat() {
    const [myUserId, setMyUserId] = useState<string>(`USER_ID_${Math.floor(Math.random() * 100000)}`)
    const [myName, setMyName] = useState<string>("")
    const [isEnterApp, setIsEnterApp] = useState<boolean>(false)
    const [commandWebsocket, setCommandWebsocket] = useState<WebSocket>()
    const [lastestRecivedCommand, setLastestRevievedCommand] = useState<commandInterface>()
    const [isShowGroupChat, setIsShowGroupChat] = useState<boolean>(false)
    const [allUserChat, setAllUserChat] = useState<ChatPreviewInterface[]>([])
    const [allGroupChat, setAllGroupChat] = useState<ChatPreviewInterface[]>([])
    const [allSelectedChat, setAllSelectedChat] = useState<ChatPreviewInterface[]>([])
    const [shownChat, setShownChat] = useState<ChatPreviewInterface[]>([])
    const [chatWebsocket, setChatWebsocket] = useState<WebSocket>()
    const [lastestRecivedMessage, setLastestRevievedMessage] = useState<MessageInterface>()
    const [searchText, setSearchText] = useState<string>("")
    const [selectedShownChat, setSelectedShownChat] = useState<ChatPreviewInterface>()
    const [selectedShownChatName, setSelectedShownChatName] = useState<string>()
    const [shownMessages, setShownMessages] = useState<MessageInterface[]>([])
    const [groupChatOwnerList, setGroupChatOwnerList] = useState<ChatPreviewInterface[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>()

    // const myUserId: string = `USER_ID_${Math.floor(Math.random() * 100000)}`

    useEffect(() => {
        if (isEnterApp) {
            initCommandConnection(myName, myUserId, setCommandWebsocket, setLastestRevievedCommand)
            // console.log(myUserId)
        }
    }, [isEnterApp])

    useEffect(() => {
        if (commandWebsocket !== undefined) {
            // console.log("command server init")
        }
    }, [commandWebsocket])

    useEffect(() => {
        if (lastestRecivedCommand !== undefined) {
            const rapidFunction = async (lastestRecivedCommand: commandInterface) => {
                const commandType: SPEACIAL_COMMAND_ENUNM = lastestRecivedCommand.type
                const tmpCommand: commandInterface = lastestRecivedCommand
                setLastestRevievedCommand(undefined)
                switch (commandType) {
                    case (SPEACIAL_COMMAND_ENUNM.CREATE_USER): {
                        const newChatPreview: ChatPreviewInterface = {
                            id: tmpCommand.idProps,
                            name: tmpCommand.nameProps
                        }
                        // console.log()
                        const newAllUserChat: ChatPreviewInterface[] = [...allUserChat, newChatPreview]
                        setAllUserChat(newAllUserChat)
                        // console.log(groupChatOwnerList.length)
                        if (groupChatOwnerList.length !== 0) {
                            let groupChatOwner: ChatPreviewInterface
                            for (groupChatOwner of groupChatOwnerList) {
                                const commandString: string = `${SPEACIAL_COMMAND_ENUNM.CREATE_GROUP}${groupChatOwner.id} ${groupChatOwner.name} ${tmpCommand.idProps} ${myUserId}`
                                commandWebsocket?.send(JSON.stringify(commandString))
                                // await sleep(100)
                            }
                        }
                        break
                    }
                    case (SPEACIAL_COMMAND_ENUNM.EXIT_USER): {
                        const newAllUserChat: ChatPreviewInterface[] = []
                        let chatPreviewProps: ChatPreviewInterface
                        for (chatPreviewProps of allUserChat) {
                            // console.log(chatPreviewProps.id, tmpCommand.idProps)
                            if (chatPreviewProps.id !== tmpCommand.idProps) {
                                newAllUserChat.push(chatPreviewProps)
                            }
                        }
                        // console.log(newAllUserChat.length)
                        setAllUserChat(newAllUserChat)
                        break
                    }
                    case (SPEACIAL_COMMAND_ENUNM.CREATE_GROUP): {
                        const newChatPreview: ChatPreviewInterface = {
                            id: tmpCommand.idProps,
                            name: tmpCommand.nameProps
                        }
                        // console.log()
                        const newAllGroupChat: ChatPreviewInterface[] = [...allGroupChat, newChatPreview]
                        setAllGroupChat(newAllGroupChat)
                        // console.log("tmpCommand", tmpCommand, myUserId, tmpCommand.otherProps === myUserId)
                        if (tmpCommand.otherProps === myUserId) {
                            const newGroupChatOwnerList: ChatPreviewInterface[] = [...groupChatOwnerList, newChatPreview]
                            // console.log(newGroupChatOwnerList)
                            setGroupChatOwnerList(newGroupChatOwnerList)
                        }
                        break
                    }
                    case (SPEACIAL_COMMAND_ENUNM.DELETE_GROUP): {
                        const newAllGroupChat: ChatPreviewInterface[] = []
                        let chatPreviewProps: ChatPreviewInterface
                        for (chatPreviewProps of allGroupChat) {
                            // console.log(chatPreviewProps.id, tmpCommand.idProps)
                            if (chatPreviewProps.id !== tmpCommand.idProps) {
                                newAllGroupChat.push(chatPreviewProps)
                            }
                        }
                        // console.log(newAllGroupChat.length)
                        setAllGroupChat(newAllGroupChat)
                        break
                    }
                }
            }
            rapidFunction(lastestRecivedCommand)
        }
    }, [lastestRecivedCommand])

    useEffect(() => {
        // console.log("change")
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
        if (selectedShownChat !== undefined) {
            setShownMessages([mockMessage1, mockMessage2])
            setSelectedShownChatName(selectedShownChat.name)
        }
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

                            {(isEnterApp) ?
                                <div>
                                    <div className={`${(isShowGroupChat) ? "bg-[#FF0000]" : "bg-[#00FF00]"} flex flex-grow h-[50px] items-center`} onClick={() => setIsShowGroupChat(!isShowGroupChat)}>
                                        <p className="m-auto select-none">{(isShowGroupChat) ? "GroupChat List" : "ActiveUser"}</p>
                                    </div>
                                    {(isShowGroupChat) ?
                                        <div className="mt-[10px] bg-[#FFFF00] flex flex-grow] h-[50px] items-center"
                                            onClick={() => {
                                                const myGroupId: string = `GROUP_${Math.floor(Math.random() * 100000)}`
                                                const commandString: string = `${SPEACIAL_COMMAND_ENUNM.CREATE_GROUP}${myGroupId} ${myGroupId} * ${myUserId}`
                                                // console.log(commandString)
                                                console.log(myUserId)
                                                commandWebsocket?.send(JSON.stringify(commandString))
                                            }}>
                                            <p className="m-auto select-none">Create Group Chat</p>
                                        </div>
                                        : <></>}
                                </div>
                                :
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
                                <div className="flex m-auto flex-row space-x-[20px] items-center">
                                    {(!isShowGroupChat && selectedShownChat.owner === myUserId) ?
                                        <input className="m-auto h-[50px] bg-[#AAAAAA]" type="text" value={selectedShownChatName}
                                            onChange={(event) => {
                                                setSelectedShownChatName(event.target.value)
                                            }
                                            }
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    if (selectedShownChatName !== selectedShownChat.name)
                                                        // setIsEnterApp(true)
                                                        return
                                                }
                                            }}
                                        /> : <h1 className="text-[24px] m-auto">{selectedShownChat.name}</h1>}
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
