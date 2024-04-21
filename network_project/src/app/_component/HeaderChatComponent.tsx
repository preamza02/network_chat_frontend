export default function HeaderChatComponent({ Text }: { Text: string }) {
  var HeaderText: string = Text
  return (
    <div className="bg-[#FFFFFF] w-[100%] h-[75px] m-auto items-center p-[20px] md:pt-[0px] md:hidden">
      <div className="flex m-auto flex-row space-x-[20px]">
        <h1 className="text-[24px] m-auto">{HeaderText}</h1>
      </div>
    </div>
  );
}
