import ChatPreviewInterface from "../_interface/chatPreviewInterface"

export default function ChatPreview({ chatPreviewProps, setSelectedShownChat }: { chatPreviewProps: ChatPreviewInterface, setSelectedShownChat: (value: ChatPreviewInterface) => void }): JSX.Element {
    const name: string = chatPreviewProps.name

    return (
        <div onClick={() => { setSelectedShownChat(chatPreviewProps) }} className="bg-white flex felx-row px-[20px] py-[12px] space-x-[20px] hover:bg-[#D9D9D9A1] focus:bg-[#000000] overflow-hidden">
            <div className="m-auto block grow ">
                <div className="m-auto flex felx-row space-x-[10px]">
                    <p className="text-left mr-auto">{name}</p>
                </div>
            </div>
        </div>
    )
}