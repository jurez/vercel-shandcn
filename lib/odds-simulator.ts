import { create } from "zustand"

interface OddsState {
  markets: Record<string, Market>
  updateOdds: (marketId: string, optionId: string, newOdds: number, trend: "up" | "down" | "neutral" | "fire") => void
  simulateRandomChanges: () => void
}

interface Market {
  id: string
  name: string
  options: Option[]
}

interface Option {
  id: string
  label: string
  odds: number
  trend: "up" | "down" | "neutral" | "fire"
  showAnimation: boolean
}

export const useOddsStore = create<OddsState>((set) => ({
  markets: {
    "1X2": {
      id: "1X2",
      name: "1X2 | Full Time",
      options: [
        { id: "1", label: "1", odds: 2.23, trend: "up", showAnimation: false },
        { id: "X", label: "X", odds: 1.02, trend: "down", showAnimation: false },
        { id: "2", label: "2", odds: 15.4, trend: "fire", showAnimation: false },
      ],
    },
    DoubleChance: {
      id: "DoubleChance",
      name: "Double Chance | Full Time",
      options: [
        { id: "1X", label: "1X", odds: 3.3, trend: "neutral", showAnimation: false },
        { id: "X2", label: "X2", odds: 2.89, trend: "neutral", showAnimation: false },
        { id: "12", label: "12", odds: 14.8, trend: "neutral", showAnimation: false },
      ],
    },
    OverUnder: {
      id: "OverUnder",
      name: "Over/Under | Home Team | Full Time",
      options: [
        { id: "Over0.5", label: "Over 0.5", odds: 2.23, trend: "up", showAnimation: false },
        { id: "Under0.5", label: "Under 0.5", odds: 4.6, trend: "neutral", showAnimation: false },
        { id: "Over1.5", label: "Over 1.5", odds: 1.7, trend: "neutral", showAnimation: false },
        { id: "Under1.5", label: "Under 1.5", odds: 1.02, trend: "down", showAnimation: false },
        { id: "Over2.5", label: "Over 2.5", odds: 3.24, trend: "fire", showAnimation: false },
        { id: "Under2.5", label: "Under 2.5", odds: 1.78, trend: "neutral", showAnimation: false },
        { id: "Over3.5", label: "Over 3.5", odds: 4.0, trend: "neutral", showAnimation: false },
        { id: "Under3.5", label: "Under 3.5", odds: 1.73, trend: "neutral", showAnimation: false },
      ],
    },
  },

  updateOdds: (marketId, optionId, newOdds, trend) => {
    set((state) => {
      const market = state.markets[marketId]
      if (!market) return state

      const updatedOptions = market.options.map((option) => {
        if (option.id === optionId) {
          return { ...option, odds: newOdds, trend, showAnimation: true }
        }
        return option
      })

      return {
        markets: {
          ...state.markets,
          [marketId]: {
            ...market,
            options: updatedOptions,
          },
        },
      }
    })

    // Reset animation after 2.5 seconds
    setTimeout(() => {
      set((state) => {
        const market = state.markets[marketId]
        if (!market) return state

        const updatedOptions = market.options.map((option) => {
          if (option.id === optionId) {
            return { ...option, showAnimation: false }
          }
          return option
        })

        return {
          markets: {
            ...state.markets,
            [marketId]: {
              ...market,
              options: updatedOptions,
            },
          },
        }
      })
    }, 2500)
  },

  simulateRandomChanges: () => {
    set((state) => {
      // Select a random market
      const marketIds = Object.keys(state.markets)
      const randomMarketId = marketIds[Math.floor(Math.random() * marketIds.length)]
      const market = state.markets[randomMarketId]

      // Determine how many odds will change (1-3)
      const changesToMake = Math.floor(Math.random() * 3) + 1
      const indices = new Set<number>()

      // Select random indices to change
      while (indices.size < Math.min(changesToMake, market.options.length)) {
        indices.add(Math.floor(Math.random() * market.options.length))
      }

      // Update the selected options
      const updatedOptions = market.options.map((option, index) => {
        if (indices.has(index)) {
          const change = Math.random() * 0.3 - 0.15
          const newOdds = Number.parseFloat((option.odds + change).toFixed(2))
          const newTrend = change > 0 ? "up" : change < 0 ? "down" : "neutral"

          return {
            ...option,
            odds: newOdds,
            trend: newTrend as "up" | "down" | "neutral" | "fire",
            showAnimation: true,
          }
        }
        return option
      })

      return {
        markets: {
          ...state.markets,
          [randomMarketId]: {
            ...market,
            options: updatedOptions,
          },
        },
      }
    })

    // Reset animations after 2.5 seconds
    setTimeout(() => {
      set((state) => {
        const marketIds = Object.keys(state.markets)
        const updatedMarkets = { ...state.markets }

        marketIds.forEach((marketId) => {
          const market = state.markets[marketId]
          updatedMarkets[marketId] = {
            ...market,
            options: market.options.map((option) => ({
              ...option,
              showAnimation: false,
            })),
          }
        })

        return { markets: updatedMarkets }
      })
    }, 2500)
  },
}))
