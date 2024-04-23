import MessageInterface from "../_interface/messageInterface";
import { MESSAGE_ENUNM } from "../_enum/speacial_message";
import { SPEACIAL_COMMAND_ENUNM } from "../_enum/speacial_command";
import { conenctRoomSocket } from "../api/connectRoomSocket";
export const initMessageConnection = (
    roomId: string,
    userName: string,
    userId: string,
    setMessageWebsocket: (value: WebSocket) => void,
    setLastestRevievedMessage: (value: MessageInterface) => void
): void => {
    const newMeesageWebsocker: WebSocket = conenctRoomSocket(roomId, userName, userId)
    newMeesageWebsocker.onmessage = (message) => {
        const commandString: string = message.data
        let recivedMessaage: MessageInterface = {} as MessageInterface
        if (commandString.includes(SPEACIAL_COMMAND_ENUNM.NEW_USER)) {
            const decomposeCommand: string[] = commandString.replace(SPEACIAL_COMMAND_ENUNM.NEW_USER, "").replace(")", "").trim().split(" ")
            if (decomposeCommand[0] !== userId) {
                recivedMessaage = {
                    content: `----<[${decomposeCommand[1]}] [ID:${decomposeCommand[0]}] has enter room>----`,
                    isMine: false
                }
            }
        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.EXIT_USER)) {
            console.log(commandString)
            const decomposeCommand: string[] = commandString.replace(SPEACIAL_COMMAND_ENUNM.EXIT_USER, "").replace(")", "").trim().split(" ")
            if (decomposeCommand[0] !== userId) {
                recivedMessaage = {
                    content: `----<[ID:${decomposeCommand[0]}] has left room>----`,
                    isMine: false
                }
            }
        } else if (commandString.includes(MESSAGE_ENUNM.USER_SEND)) {
            const decomposeCommand: string[] = commandString.replace(MESSAGE_ENUNM.USER_SEND, "").trim().split("!!!")
            recivedMessaage = {
                content: `[${decomposeCommand[1]}] : ${decomposeCommand[2]}`,
                isMine: decomposeCommand[0] === userId
            }
        }
        if (recivedMessaage !== {} as MessageInterface) {
            setLastestRevievedMessage(recivedMessaage)
        }
    }

    setMessageWebsocket(newMeesageWebsocker)
}