import { WEBSOCKET_URL } from "../_constants/env";

export const conenctRoomSocket = (roomId: string, userName: string, userId: string) => {
    console.log("userName", userName)
    const ws = new WebSocket(
        `${WEBSOCKET_URL}/ws/${roomId}?user_id=${userId}&user_name=${userName}`
    )
    return ws;
}