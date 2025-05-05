"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import OddsMarket from "./odds-market"
import BottomNavigation from "./bottom-navigation"
import Header from "./header"

export default function OddsDisplay() {
  const [activeTab, setActiveTab] = useState("POPULAR")
  const [activeMarkets, setActiveMarkets] = useState<string[]>(["1X2", "DoubleChance", "OverUnder", "BothTeamsToScore"])

  const toggleMarket = (market: string) => {
    setActiveMarkets((prev) => (prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]))
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      {/* Scrollable content with padding for fixed header */}
      <div className="flex-1 overflow-auto pt-[36px] pb-[85px]">
        {/* Sub Header */}
        <header className="bg-[#2C3033] flex items-center justify-between p-4 relative">
          <div className="flex items-center">
            <Image src="/icons/arrow-back.svg" alt="Back" width={7} height={12} className="mr-2" />
            <span>Back</span>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#252A2D] px-4 py-1 rounded-sm">
            <span className="text-white font-medium">12:00 pm Wed 20/07</span>
          </div>
        </header>

        {/* Match Info */}
        <div className="bg-[#2C3033] p-4">
          <h1 className="text-xl font-bold">Atletico Minerio</h1>
          <h1 className="text-xl font-bold">Botafogo</h1>
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-gray-400">
              Football / <span className="underline">Brazil</span> / <span className="underline">Brazil Serie B</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-1">Statistics</span>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/statisticss-0VnSGdpl3XibIXhAtCjyahLZFgpv5r.png"
                alt="Statistics"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#353B40]">
          <button
            className={cn(
              "px-4 py-2 text-sm flex-1 flex items-center justify-center whitespace-nowrap",
              activeTab === "ALL" ? "bg-[#353B40] text-[#9CE800]" : "bg-[#353B40] text-[#AAAEB0]",
            )}
            onClick={() => setActiveTab("ALL")}
          >
            <span className="font-bold">ALL</span> <span className="text-gray-500 ml-1 font-bold">48</span>
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm flex-1 flex items-center justify-center whitespace-nowrap",
              activeTab === "POPULAR"
                ? "bg-[#353B40] text-[#9CE800] border-b-2 border-[#9CE800]"
                : "bg-[#353B40] text-[#AAAEB0]",
            )}
            onClick={() => setActiveTab("POPULAR")}
          >
            <span className="font-bold">POPULAR</span> <span className="text-gray-500 ml-1 font-bold">12</span>
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm flex-1 flex items-center justify-center whitespace-nowrap",
              activeTab === "COMBOS" ? "bg-[#353B40] text-[#9CE800]" : "bg-[#353B40] text-[#AAAEB0]",
            )}
            onClick={() => setActiveTab("COMBOS")}
          >
            <span className="font-bold">COMBOS</span> <span className="text-gray-500 ml-1 font-bold">1</span>
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm flex-1 flex items-center justify-center whitespace-nowrap",
              activeTab === "SPECIALS" ? "bg-[#353B40] text-[#9CE800]" : "bg-[#353B40] text-[#AAAEB0]",
            )}
            onClick={() => setActiveTab("SPECIALS")}
          >
            <span className="font-bold">SPECIALS</span>
          </button>
        </div>

        {/* Markets */}
        <div className="market-container">
          <div
            className="flex items-center justify-between px-3 py-[8px] cursor-pointer bg-[#ffffff] text-black"
            onClick={() => toggleMarket("1X2")}
          >
            <div className="flex items-center">
              {activeMarkets.includes("1X2") ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              <span className="ml-2 font-['Roboto'] font-bold text-[14px] text-[#252A2D]">1X2 | Full Time</span>
              <Image src="/icons/icon-info.svg" alt="Info" width={16} height={16} className="ml-2" />
            </div>
            <div className="flex items-center">
              <Image src="/icons/2-up.svg" alt="2 Up" width={20} height={20} className="mr-2" />
              <div className="bg-[#831AED] rounded-md px-2 py-1 text-xs flex items-center text-white">Best Odds</div>
            </div>
          </div>

          {activeMarkets.includes("1X2") && (
            <OddsMarket
              market="1X2"
              options={[
                { label: "1", initialOdds: 2.23, trend: "up", isPopular: true },
                { label: "X", initialOdds: 1.02, trend: "down", isPopular: false },
                { label: "2", initialOdds: 15.4, trend: "fire", isPopular: false },
              ]}
            />
          )}

          <div
            className="flex items-center justify-between px-3 py-[8px] cursor-pointer bg-[#ffffff] text-black"
            onClick={() => toggleMarket("DoubleChance")}
          >
            <div className="flex items-center">
              {activeMarkets.includes("DoubleChance") ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              <span className="ml-2 font-['Roboto'] font-bold text-[14px] text-[#252A2D]">
                Double Chance | Full Time
              </span>
              <Image src="/icons/icon-info.svg" alt="Info" width={16} height={16} className="ml-2" />
            </div>
          </div>

          {activeMarkets.includes("DoubleChance") && (
            <OddsMarket
              market="DoubleChance"
              options={[
                { label: "1X", initialOdds: 3.3, trend: "neutral", isPopular: false },
                { label: "X2", initialOdds: 2.89, trend: "neutral", isPopular: true },
                { label: "12", initialOdds: 14.8, trend: "neutral", isPopular: false },
              ]}
            />
          )}

          {/* New Both Teams To Score Market */}
          <div
            className="flex items-center justify-between px-3 py-[8px] cursor-pointer bg-[#ffffff] text-black"
            onClick={() => toggleMarket("BothTeamsToScore")}
          >
            <div className="flex items-center">
              {activeMarkets.includes("BothTeamsToScore") ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              <span className="ml-2 font-['Roboto'] font-bold text-[14px] text-[#252A2D]">
                Both Teams To Score | Full Time
              </span>
              <Image src="/icons/icon-info.svg" alt="Info" width={16} height={16} className="ml-2" />
            </div>
          </div>

          {activeMarkets.includes("BothTeamsToScore") && (
            <OddsMarket
              market="BothTeamsToScore"
              options={[
                { label: "Yes", initialOdds: 1.62, trend: "neutral", isPopular: true },
                { label: "No", initialOdds: 2.3, trend: "neutral", isPopular: false },
              ]}
            />
          )}

          <div
            className="flex items-center justify-between px-3 py-[8px] cursor-pointer bg-[#ffffff] text-black"
            onClick={() => toggleMarket("OverUnder")}
          >
            <div className="flex items-center">
              {activeMarkets.includes("OverUnder") ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              <span className="ml-2 font-['Roboto'] font-bold text-[14px] text-[#252A2D]">
                Over/Under | Home Team | Full Time
              </span>
              <Image src="/icons/icon-info.svg" alt="Info" width={16} height={16} className="ml-2" />
            </div>
          </div>

          {activeMarkets.includes("OverUnder") && (
            <div className="grid grid-cols-2 gap-2 p-3 pb-20 bg-[#ffffff]">
              <OddsButton label="Over 0.5" initialOdds={2.23} trend="up" isPopular={true} />
              <OddsButton label="Under 0.5" initialOdds={4.6} trend="neutral" isPopular={false} />
              <OddsButton label="Over 1.5" initialOdds={1.7} trend="neutral" isPopular={false} />
              <OddsButton label="Under 1.5" initialOdds={1.02} trend="down" isPopular={false} />
              <OddsButton label="Over 2.5" initialOdds={3.24} trend="fire" isPopular={false} />
              <OddsButton label="Under 2.5" initialOdds={1.78} trend="neutral" isPopular={false} />
              <OddsButton label="Over 3.5" initialOdds={4.0} trend="neutral" isPopular={false} />
              <OddsButton label="Under 3.5" initialOdds={1.73} trend="neutral" isPopular={false} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom elements */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        {/* Bonus Banner */}
        <div className="bg-[#9CE800] pt-[7px] pb-[7px] px-3 text-left text-[#252A2D] whitespace-nowrap flex items-center font-['Roboto'] font-normal text-[12px]">
          Add 3 legs to your betslip to earn up to a 1000% <span className="font-bold">Win Bonus</span>.
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  )
}

interface OddsButtonProps {
  label: string
  initialOdds: number
  trend: "up" | "down" | "neutral" | "fire"
  isPopular?: boolean
}

export function OddsButton({ label, initialOdds, trend, isPopular = false }: OddsButtonProps) {
  const [odds, setOdds] = useState(initialOdds)
  const [currentTrend, setCurrentTrend] = useState<"up" | "down" | "neutral" | "fire">(trend)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Function to schedule the next odds change
    const scheduleNextChange = () => {
      // Random interval between 10 seconds and 20 seconds
      const nextChangeInterval = Math.floor(Math.random() * 10000) + 10000 // 10-20 seconds

      const timeoutId = setTimeout(() => {
        // 80% chance of changing odds (higher probability since interval is much longer)
        if (Math.random() < 0.8) {
          const change = Math.random() * 0.2 - 0.1
          const newOdds = Number.parseFloat((odds + change).toFixed(2))
          const newTrend = change > 0 ? "up" : change < 0 ? "down" : "neutral"

          setOdds(newOdds)
          setCurrentTrend(newTrend as "up" | "down" | "neutral" | "fire")
          setShowAnimation(true)

          // Reset animation after 8 seconds (reduced from 10 seconds)
          setTimeout(() => {
            setShowAnimation(false)
          }, 8000)
        }

        // Schedule the next change
        scheduleNextChange()
      }, nextChangeInterval)

      return timeoutId
    }

    // Start the first scheduled change
    const timeoutId = scheduleNextChange()

    // Cleanup function
    return () => clearTimeout(timeoutId)
  }, [odds])

  return (
    <div
      className={cn(
        "h-[34px] px-3 bg-[#F4F5F0] flex flex-row items-center justify-between border border-[#E6E7E2] rounded-[4px]",
      )}
    >
      <div className="text-sm text-gray-700">{label}</div>
      <div className="flex items-center">
        {currentTrend === "up" && showAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#4F7600] mr-1"
          >
            ▲
          </motion.div>
        )}
        {currentTrend === "down" && showAnimation && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#CC371B] mr-1"
          >
            ▼
          </motion.div>
        )}
        {currentTrend === "fire" && showAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-orange-500 mr-1"
          >
            🔥
          </motion.div>
        )}
        {isPopular && !showAnimation && (
          <Image src="/icons/popular-flame.svg" alt="Popular" width={16} height={16} className="mr-1" />
        )}
        <span
          className={cn(
            "font-medium text-gray-800",
            showAnimation && currentTrend === "up" && "text-[#4F7600]",
            showAnimation && currentTrend === "down" && "text-[#CC371B]",
            showAnimation && currentTrend === "fire" && "text-orange-500",
          )}
        >
          {odds.toFixed(2)}
        </span>
      </div>
    </div>
  )
}
