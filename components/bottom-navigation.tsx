import Image from "next/image"

export default function BottomNavigation() {
  return (
    <div className="grid grid-cols-5 bg-[#252A2D] border-t border-gray-800">
      <button className="flex flex-col items-center justify-center py-3">
        <Image src="/icons/icon-menu.svg" alt="Menu" width={24} height={24} />
        <span className="font-['Roboto'] font-normal text-[12px] mt-1 text-[#8E9398]">Menu</span>
      </button>
      <button className="flex flex-col items-center justify-center py-3">
        <Image src="/icons/icon-sports-new.svg" alt="Sports" width={24} height={24} />
        <span className="font-['Roboto'] font-normal text-[12px] mt-1 text-[#8E9398]">Sports</span>
      </button>
      <button className="flex flex-col items-center justify-center py-3">
        <div className="relative">
          <div className="absolute w-16 h-16 -top-2 -left-2 rounded-full border-4 border-[#353B40]"></div>
          <div className="w-12 h-12 bg-[#252A2D] rounded-full flex flex-col items-center justify-center">
            <Image src="/icons/icon-content.svg" alt="Betslip" width={20} height={20} />
            <span className="font-['Roboto'] font-normal text-[10px] mt-0.5 text-[#8E9398]">Betslip</span>
          </div>
        </div>
      </button>
      <button className="flex flex-col items-center justify-center py-3">
        <Image src="/icons/icon-ball.svg" alt="My Bets" width={24} height={24} />
        <span className="font-['Roboto'] font-normal text-[12px] mt-1 text-[#8E9398]">My Bets</span>
      </button>
      <button className="flex flex-col items-center justify-center py-3">
        <Image src="/icons/icon-account.svg" alt="Account" width={24} height={24} />
        <span className="font-['Roboto'] font-normal text-[12px] mt-1 text-[#8E9398]">Account</span>
      </button>
    </div>
  )
}
