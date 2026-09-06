import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ApiKeys {
  groq: string
}

interface MeetingState {
  // Session
  isListening: boolean
  isClickThrough: boolean

  // Whisper Model State
  isModelReady: boolean
  modelProgress: number

  // Transcription
  transcript: string[]

  // Suggestions IA
  suggestions: string[]
  loadingSuggestions: boolean

  // Config (persistée dans localStorage d'Electron)
  apiKeys: ApiKeys
  meetingContext: string

  // Erreur
  error: string | null

  // Actions
  setListening: (v: boolean) => void
  setClickThrough: (v: boolean) => void
  setModelReady: (v: boolean) => void
  setModelProgress: (v: number) => void
  appendTranscript: (line: string) => void
  clearTranscript: () => void
  setSuggestions: (s: string[]) => void
  setLoadingSuggestions: (v: boolean) => void
  setApiKeys: (keys: ApiKeys) => void
  setMeetingContext: (ctx: string) => void
  setError: (msg: string) => void
  clearError: () => void
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set) => ({
      isListening: false,
      isClickThrough: false,
      isModelReady: false,
      modelProgress: 0,
      transcript: [],
      suggestions: [],
      loadingSuggestions: false,
      apiKeys: { groq: '' }, // gardé pour compatibilité de type
      meetingContext: '',
      error: null,

      setListening: (v) => set({ isListening: v }),
      setClickThrough: (v) => set({ isClickThrough: v }),
      setModelReady: (v) => set({ isModelReady: v }),
      setModelProgress: (v) => set({ modelProgress: v }),

      appendTranscript: (line) =>
        set((s) => ({
          transcript: [...s.transcript.slice(-50), line],
        })),

      clearTranscript: () => set({ transcript: [], suggestions: [] }),

      setSuggestions: (suggestions) => set({ suggestions }),
      setLoadingSuggestions: (v) => set({ loadingSuggestions: v }),

      setApiKeys: (keys) => set({ apiKeys: keys }),
      setMeetingContext: (ctx) => set({ meetingContext: ctx }),

      setError: (msg) => set({ error: msg }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'ai-copilot-storage',
      partialize: (s) => ({ meetingContext: s.meetingContext }),
    }
  )
)
