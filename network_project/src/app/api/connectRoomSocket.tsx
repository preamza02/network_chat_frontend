import { WEBSOCKET_URL } from "../_constants/env";

export const conenctRoomSocket = (roomId: string, userName: string, userId: string) => {
    const ws = new WebSocket(
        `${WEBSOCKET_URL}/ws/${roomId}?userId=${userId}&username=${userName}`
    )
    return ws;
}