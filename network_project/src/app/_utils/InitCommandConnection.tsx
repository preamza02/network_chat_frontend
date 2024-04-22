import { conenctRoomSocket } from "../api/connectRoomSocket"
import { SPEACIAL_COMMAND_ENUNM } from "../_enum/speacial_command"
import { commandInterface } from "../_interface/commandInterface"
export const initCommandConnection = (
    userName: string,
    userId: string,
    setCommandWebsocket: (value: WebSocket) => void,
    setLastestRevievedCommand: (value: commandInterface) => void
): void => {
    const newCommandWebSocket: WebSocket = conenctRoomSocket("command", userName, userId)
    // console.log("init COMMAND WEBSOCKER")
    newCommandWebSocket.onopen = () => {
        console.log("open connection command")
    }
    newCommandWebSocket.onclose = () => {
        console.log("close connection command")
    }
    newCommandWebSocket.onmessage = (message) => {
        const commandString: string = message.data
        console.log(commandString)
        let recivedCommand: commandInterface = {
            type: SPEACIAL_COMMAND_ENUNM.NO,
            nameProps: "",
            idProps: ""
        }
        if (commandString.includes(SPEACIAL_COMMAND_ENUNM.NEW_USER)) {
            const decomposeCommand: string[] = commandString.replace(SPEACIAL_COMMAND_ENUNM.NEW_USER, "").replace(")", "").trim().split(" ")
            if (decomposeCommand[0] !== userId) {
                recivedCommand = {
                    type: SPEACIAL_COMMAND_ENUNM.CREATE_USER,
                    nameProps: decomposeCommand[1],
                    idProps: decomposeCommand[0]
                }
                const sendCommand: string = `${SPEACIAL_COMMAND_ENUNM.CREATE_USER}${userId} ${userName} ${decomposeCommand[0]}`
                newCommandWebSocket.send(JSON.stringify(sendCommand))
            }
        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.CREATE_USER)) {
            const decomposeCommand: string[] = commandString.replace(SPEACIAL_COMMAND_ENUNM.CREATE_USER, "").trim().split(" ")
            // console.log(commandString.trim().replace("/&quot;/ig", '"');
            // const tmpRecivedCommand = JSON.parse(commandString.trim().replace("'", '"'))
            console.log(userId, decomposeCommand[2])
            if (decomposeCommand[2] === userId) {
                recivedCommand = {
                    type: SPEACIAL_COMMAND_ENUNM.CREATE_USER,
                    nameProps: decomposeCommand[1],
                    idProps: decomposeCommand[0]
                }
            }
        }
        else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.EXIT_USER)) {
            const decomposeCommand: string[] = commandString.replace(SPEACIAL_COMMAND_ENUNM.EXIT_USER, "").replace(")", "").trim().split(" ")
            recivedCommand = {
                type: SPEACIAL_COMMAND_ENUNM.EXIT_USER,
                nameProps: decomposeCommand[1],
                idProps: decomposeCommand[0],
            }
            // console.log(recivedCommand)
        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.RENAME_GROUP)) {

        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.CREATE_GROUP)) {
            const decomposeCommand: string[] = commandString.replace(SPEACIAL_COMMAND_ENUNM.CREATE_GROUP, "").trim().split(" ")
            // console.log(userId, decomposeCommand[2])
            if (decomposeCommand[2] === userId || decomposeCommand[2] === "*") {
                recivedCommand = {
                    type: SPEACIAL_COMMAND_ENUNM.CREATE_GROUP,
                    nameProps: decomposeCommand[1],
                    idProps: decomposeCommand[0],
                    otherProps: decomposeCommand[3]
                }
            }

        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.DELETE_GROUP)) {

        } else if (commandString.includes(SPEACIAL_COMMAND_ENUNM.RENAME_GROUP)) {

        } else {

        }
        if (recivedCommand !== undefined) {
            setLastestRevievedCommand(recivedCommand)
        }
    }
    setCommandWebsocket(newCommandWebSocket)
}