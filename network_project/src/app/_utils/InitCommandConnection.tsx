import { conenctRoomSocket } from "../api/connectRoomSocket"
import { SPEACIAL_COMMAND_ENUNM } from "../_enum/speacial_command"
import { commandInterface } from "../_interface/commandInterface"
export const initCommandConnection = (
    userName: string,
    userId: string,
    setCommandWebsocket: (value: WebSocket) => void,
    setLastestRevievedCommand: (value: string) => void
): void => {
    const newCommandWebSocket: WebSocket = conenctRoomSocket("command", userName, userId)
    newCommandWebSocket.onopen = () => { newCommandWebSocket.send(`${SPEACIAL_COMMAND_ENUNM.NEW_USER}${userId}</>${userName}`) }
    newCommandWebSocket.onclose = () => { newCommandWebSocket.send(`${SPEACIAL_COMMAND_ENUNM.EXIT_USER}${userId}</>${userName}`) }
    newCommandWebSocket.onmessage = (message) => {
        const commandString: string = message.data
        let recivedCommand: commandInterface
        if (commandString.includes(SPEACIAL_COMMAND_ENUNM.NEW_USER)) {
            recivedCommand = {
                type: SPEACIAL_COMMAND_ENUNM.NEW_USER

            }
        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.RENAME_GROUP)) {

        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.CREATE_GROUP)) {

        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.DELETE_GROUP)) {

        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.RENAME_GROUP)) {

        } else {

        }
        setLastestRevievedCommand(commandString)
    }
    setCommandWebsocket(newCommandWebSocket)
}