// @ts-nocheck
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type QuoteStore = {
  quote: any
  setQuote: (data: any) => void
  hasHydrated: boolean
  setHasHydrated: () => void
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set) => ({
      quote: null,
      setQuote: (data) => set(() => ({ quote: data })),
      hasHydrated: false,
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'quote-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.()
      },
    },
  ),
)
export const useFavoritesStore = create()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (data) =>
        set((state) => ({
          favorites: [...state.favorites, data],
        })),
      removeFavorite: (data) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.q !== data),
        })),
    }),
    {
      name: 'favorites-storage',
    },
  ),
)

export const useThemeStore = create((set) => ({
  theme: 'dark',
  setTheme: (theme) => {
    set(() => ({ theme }))
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      return { theme: newTheme }
    }),
}))

export const useProgressStore = create(
  persist(
    (set, get) => ({
      progress: [],
      streak: () => {
        const state = get()
        const uniqueDates = Array.from(new Set(state.progress.map((item) => new Date(item.date).toISOString().split('T')[0]))).map((d) => new Date(d))

        uniqueDates.sort((a, b) => a - b)

        let streak = 0
        let maxStreak = 0

        for (let i = 1; i < uniqueDates.length; i++) {
          const prev = uniqueDates[i - 1]
          const curr = uniqueDates[i]
          const diff = (curr - prev) / (1000 * 60 * 60 * 24)

          if (diff === 1) {
            streak++
            maxStreak = Math.max(maxStreak, streak)
          } else if (diff > 1) {
            streak = 1
          }
        }

        return maxStreak
      },
      deleteProgres: (data) => {
        set((state) => {
          const today = new Date()
          const date = new Date(data.date)

          const isToday = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()

          if (isToday) {
            return {
              progress: state.progress.filter((item) => {
                const itemDate = new Date(item.date)
                return !(itemDate.getFullYear() === date.getFullYear() && itemDate.getMonth() === date.getMonth() && itemDate.getDate() === date.getDate())
              }),
            }
          }

          return state
        })
      },

      addProgress: (data) => {
        const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
        set((state) => ({
          progress: [...state.progress, { ...data, date }],
        }))
      },

      importProgress: (datas) => {
        set((state) => {
          const updatedProgress = [...state.progress]

          datas.forEach((obj) => {
            const alreadyExists = state.progress.some((item) => item.date === obj.date)
            if (!alreadyExists) {
              updatedProgress.push(obj)
            }
          })

          return {
            progress: updatedProgress,
          }
        })
      },
    }),
    {
      name: 'progress-storage',
    },
  ),
)
