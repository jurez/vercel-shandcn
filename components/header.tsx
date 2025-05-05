import Image from "next/image"

export default function Header() {
  return (
    <div className="flex flex-col">
      {/* Main Header */}
      <div className="bg-[#1A1A1A] flex items-center justify-between p-2">
        <div className="flex items-center">
          <Image src="/icons/icon-menu.svg" alt="Menu" width={20} height={20} className="text-gray-400 mr-4" />
          <Image src="/images/betpawa-logo.svg" alt="betPawa Logo" width={89} height={16} className="mt-1" />
        </div>
        <div className="flex items-center gap-3">
          <Image src="/icons/icon-search.svg" alt="Search" width={16} height={16} />
          <div className="flex items-center bg-[#2A2A2A] rounded-md px-3 py-1">
            <span className="text-sm text-gray-300 mr-1">GH₵</span>
            <span className="text-sm font-medium">8892.10</span>
          </div>
          <Image src="/icons/plus-button.svg" alt="Add" width={22} height={22} />
        </div>
      </div>
    </div>
  )
}
