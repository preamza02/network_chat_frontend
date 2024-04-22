import MessageInterface from "../_interface/messageInterface"
import ChatBubble from "../_component/chatBubble"
export const createMessageListBody = (messageList: MessageInterface[]): JSX.Element[] => {
    return messageList.map((messageProps) => <ChatBubble key={messageProps.content} messageProps={messageProps}></ChatBubble>)
}