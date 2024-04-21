// contexts/ChatContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
    username: string;
    chatType: "group" | "private";
    setUsername: (username: string) => void;
    setChatType: (chatType: "group" | "private") => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ProviderProps> = ({ children }) => {
    const [username, setUsername] = useState<string>("Anonymous");
    const [chatType, setChatType] = useState<"group" | "private">("private");

    const value = {
        username,
        chatType,
        setUsername,
        setChatType,
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
