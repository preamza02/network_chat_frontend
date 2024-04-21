import MessageInterface from "../_interface/messageInterface"

export default function ChatBubble({ messageProps }: { messageProps: MessageInterface }) {
    const IsOtherPersonMessage: boolean = !messageProps.isMine
    const BgColor: string = ((IsOtherPersonMessage) ? "bg-[#FFFFFF]" : "bg-[#FF8A00]")
    const ItemsAlign: string = ((IsOtherPersonMessage) ? "items-start" : "items-end")
    const Margin: string = ((IsOtherPersonMessage) ? "mr-auto" : "ml-auto")
    return (
        <div className={`flex flex-grow justify-items-end`}>
            <div className={`${Margin} flex flex-col ${ItemsAlign} ${BgColor} rounded-[10px] px-[15px] p-[5px] w-fit`}>
                <div>
                    <p>{messageProps.content}</p>
                </div>
            </div>
        </div>
    )
}