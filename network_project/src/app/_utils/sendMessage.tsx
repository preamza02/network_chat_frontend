
export const sendMessage = (conn: WebSocket, currentMessage: string, setCurrentMessage: (value: string) => void) => {
    if (currentMessage !== '') {
        conn.send(currentMessage)
        setCurrentMessage("")
    }
}