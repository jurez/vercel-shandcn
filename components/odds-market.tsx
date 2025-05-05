"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Create a module-level counter to track odds changes across all markets
// This is a simple approach that works within the constraints of modifying only this file
let globalChangingOddsCount = 0
const MAX_CHANGING_ODDS = 5

interface OddsMarketProps {
  market: string
  options: {
    label: string
    initialOdds: number
    trend: "up" | "down" | "neutral" | "fire"
    isPopular?: boolean
  }[]
  // Add a prop to control grid layout for different markets
  gridLayout?: "grid-cols-2" | "grid-cols-3" | "grid-cols-4"
}

export default function OddsMarket({ market, options, gridLayout }: OddsMarketProps) {
  // Ensure only one option is marked as popular
  const validatedOptions = (() => {
    let foundPopular = false
    return options.map((option) => {
      if (option.isPopular && !foundPopular) {
        foundPopular = true
        return option
      }
      return { ...option, isPopular: false }
    })
  })()

  const [oddsData, setOddsData] = useState(
    validatedOptions.map((option) => ({
      ...option,
      odds: option.initialOdds,
      showAnimation: false,
      currentTrend: option.trend,
      isPopular: option.isPopular || false,
    })),
  )

  useEffect(() => {
    // Function to schedule the next odds change
    const scheduleNextChange = () => {
      // Fixed interval of 12 seconds as requested
      const nextChangeInterval = 12000 // 12 seconds

      const timeoutId = setTimeout(() => {
        // Calculate how many odds we can change based on the global limit
        const availableSlots = MAX_CHANGING_ODDS - globalChangingOddsCount

        if (availableSlots <= 0) {
          // If we've reached the global limit, don't change any odds
          // Just schedule the next attempt
          scheduleNextChange()
          return
        }

        // Determine how many odds will change (1-2), but limited by available slots
        const maxChanges = Math.min(2, availableSlots)
        const changesToMake = Math.random() < 0.75 ? 1 : Math.min(2, maxChanges)

        if (changesToMake <= 0) {
          // If we can't change any odds, just schedule the next attempt
          scheduleNextChange()
          return
        }

        const indices = new Set<number>()

        // Select random indices to change
        while (indices.size < Math.min(changesToMake, options.length)) {
          indices.add(Math.floor(Math.random() * options.length))
        }

        // Update the global counter
        globalChangingOddsCount += indices.size

        setOddsData((prev) =>
          prev.map((item, index) => {
            if (indices.has(index)) {
              const change = Math.random() * 0.3 - 0.15
              const newOdds = Number.parseFloat((item.odds + change).toFixed(2))
              const newTrend = change > 0 ? "up" : change < 0 ? "down" : "neutral"

              return {
                ...item,
                odds: newOdds,
                currentTrend: newTrend as "up" | "down" | "neutral" | "fire",
                showAnimation: true,
              }
            }
            return item
          }),
        )

        // Reset animations after 6 seconds as requested
        setTimeout(() => {
          // Decrease the global counter when animations end
          globalChangingOddsCount -= indices.size

          // Ensure the counter never goes below 0 (defensive programming)
          if (globalChangingOddsCount < 0) globalChangingOddsCount = 0

          setOddsData((prev) =>
            prev.map((item) => ({
              ...item,
              showAnimation: false,
            })),
          )
        }, 6000)

        // Schedule the next change
        scheduleNextChange()
      }, nextChangeInterval)

      return timeoutId
    }

    // Start the first scheduled change
    const timeoutId = scheduleNextChange()

    // Cleanup function
    return () => {
      clearTimeout(timeoutId)
      // When component unmounts, make sure to reset any odds this component was tracking
      // This is an approximation since we don't know exactly which ones were changing
      globalChangingOddsCount = Math.max(0, globalChangingOddsCount - 2)
    }
  }, [options.length])

  // Determine grid layout based on props or number of options
  const determineGridCols = () => {
    if (gridLayout) return gridLayout
    return options.length === 2 ? "grid-cols-2" : "grid-cols-3"
  }

  const gridCols = determineGridCols()

  return (
    <div className={`grid ${gridCols} gap-4 px-3 py-[10px] bg-[#ffffff] border-b border-[#E6E7E2]`}>
      {oddsData.map((option, index) => (
        <div
          key={`${market}-${option.label}`}
          className={cn(
            "h-[36px] px-3 bg-[#F4F5F0] flex flex-row items-center justify-between border border-[#E6E7E2] rounded-[4px]",
          )}
        >
          <div className="text-sm text-gray-700">{option.label}</div>
          <div className="flex items-center">
            {option.currentTrend === "up" && option.showAnimation && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#4F7600] mr-1"
              >
                ▲
              </motion.div>
            )}
            {option.currentTrend === "down" && option.showAnimation && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#CC371B] mr-1"
              >
                ▼
              </motion.div>
            )}
            {option.currentTrend === "fire" && option.showAnimation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-orange-500 mr-1"
              >
                🔥
              </motion.div>
            )}
            {option.isPopular && !option.showAnimation && (
              <Image src="/icons/popular-flame.svg" alt="Popular" width={16} height={16} className="mr-1" />
            )}
            <span
              className={cn(
                "font-medium text-gray-800",
                option.showAnimation && option.currentTrend === "up" && "text-[#4F7600]",
                option.showAnimation && option.currentTrend === "down" && "text-[#CC371B]",
                option.showAnimation && option.currentTrend === "fire" && "text-orange-500",
              )}
            >
              {option.odds.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
