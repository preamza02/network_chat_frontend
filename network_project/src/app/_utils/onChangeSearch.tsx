import ChatPreviewInterface from "../_interface/chatPreviewInterface"
export const OnChangeSearch = (event: any, setSearchText: any): void => {
    const searchText: string = event.currentTarget.value
    setSearchText(searchText)
}