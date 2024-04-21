import ChatPreviewInterface from "../_interface/chatPreviewInterface";

export default function filterChatSearchBar(allSelectedChat: ChatPreviewInterface[], searchText: string): ChatPreviewInterface[] {
    let newFilterChatPreview: ChatPreviewInterface[] = []
    let chatPreview: ChatPreviewInterface
    for (chatPreview of allSelectedChat) {
        if (chatPreview.name.includes(searchText)) {
            newFilterChatPreview.push(chatPreview)
        }
    }
    return newFilterChatPreview
}