import { useCallback } from 'react'
import { useMeetingStore } from '@/store/meetingStore'

/**
 * Appelle l'API locale d'Ollama pour générer 3 suggestions de réponse
 * face à une question/objection détectée dans la transcription.
 */
export function useOllama() {
  const { meetingContext, setSuggestions, setLoadingSuggestions, setError } = useMeetingStore()

  const generateSuggestions = useCallback(
    async (question: string, recentTranscript: string) => {
      setLoadingSuggestions(true)

      try {
        const systemPrompt = buildSystemPrompt(meetingContext)
        const userPrompt = buildUserPrompt(question, recentTranscript)

        const response = await fetch('http://localhost:11434/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama3.1:8b-instruct-q4_K_M',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            stream: false,
            options: {
              temperature: 0.7,
              num_predict: 400,
            },
          }),
        })

        if (!response.ok) {
          throw new Error(`Erreur réseau : ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        const raw = data.message?.content ?? ''
        const suggestions = parseSuggestions(raw)
        
        setSuggestions(suggestions)
      } catch (err) {
        setError(`Erreur Ollama : ${(err as Error).message}. Assurez-vous que l'application Ollama est démarrée.`)
      } finally {
        setLoadingSuggestions(false)
      }
    },
    [meetingContext, setSuggestions, setLoadingSuggestions, setError]
  )

  return { generateSuggestions }
}

// ─── Prompt engineering ────────────────────────────────────────────────────────

function buildSystemPrompt(context: string): string {
  return `Tu es un coach de communication expert qui assiste un professionnel en réunion en temps réel.
${context ? `Contexte de la réunion : ${context}` : ''}

Ton rôle : face à une question ou objection détectée, générer EXACTEMENT 3 suggestions de réponse courtes et percutantes.

Format de réponse OBLIGATOIRE (rien d'autre) :
1. [suggestion 1]
2. [suggestion 2]
3. [suggestion 3]

Chaque suggestion : 1 à 2 phrases max, directe, actionnable, professionnelle.`
}

function buildUserPrompt(question: string, transcript: string): string {
  return `Transcription récente de la conversation :
"${transcript.slice(-800)}"

Question/objection détectée :
"${question}"

Génère 3 suggestions de réponse.`
}

/** Parse la réponse Ollama en tableau de strings */
function parseSuggestions(raw: string): string[] {
  const lines = raw
    .split('\n')
    .map((l) => l.replace(/^\d+\.\s*/, '').trim())
    .filter((l) => l.length > 10)

  return lines.slice(0, 3)
}
