"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, Search, ArrowLeft, BookOpen, Volume2, Loader2, AlertCircle } from "lucide-react"

interface Phonetic {
  text: string
  audio?: string
}

interface Definition {
  definition: string
  example?: string
  synonyms?: string[]
  antonyms?: string[]
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms?: string[]
  antonyms?: string[]
}

interface DictionaryApiResponse {
  word: string
  phonetic?: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  sourceUrls?: string[]
}

interface ProcessedEntry {
  word: string
  pronunciation: string
  audioUrl?: string
  meanings: {
    partOfSpeech: string
    definitions: {
      definition: string
      example?: string
      synonyms: string[]
      antonyms: string[]
    }[]
    synonyms: string[]
    antonyms: string[]
  }[]
  sourceUrls: string[]
}

// Mots populaires allemands pour suggestions
const popularGermanWords = [
  "Haus",
  "lernen",
  "schön",
  "Freund",
  "arbeiten",
  "Zeit",
  "Leben",
  "Wasser",
  "Buch",
  "sprechen",
  "verstehen",
  "Familie",
]

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<ProcessedEntry[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWordDefinition = async (word: string): Promise<DictionaryApiResponse[]> => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/de/${encodeURIComponent(word)}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Das Wort "${word}" wurde nicht gefunden.`)
      }
      throw new Error(`Fehler beim Abrufen der Definition: ${response.status}`)
    }

    return response.json()
  }

  const processApiResponse = (apiData: DictionaryApiResponse[]): ProcessedEntry[] => {
    return apiData.map((entry) => {
      // Finde die beste Aussprache
      const bestPhonetic = entry.phonetics.find((p) => p.text && p.audio) ||
        entry.phonetics.find((p) => p.text) || { text: entry.phonetic || "" }

      return {
        word: entry.word,
        pronunciation: bestPhonetic.text || entry.phonetic || "",
        audioUrl: bestPhonetic.audio,
        meanings: entry.meanings.map((meaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map((def) => ({
            definition: def.definition,
            example: def.example,
            synonyms: def.synonyms || [],
            antonyms: def.antonyms || [],
          })),
          synonyms: meaning.synonyms || [],
          antonyms: meaning.antonyms || [],
        })),
        sourceUrls: entry.sourceUrls || [],
      }
    })
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setError(null)
    setSearchResults([])

    try {
      const apiData = await fetchWordDefinition(searchTerm.trim())
      const processedResults = processApiResponse(apiData)
      setSearchResults(processedResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein unbekannter Fehler ist aufgetreten.")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const playPronunciation = (audioUrl?: string, word?: string) => {
    if (audioUrl) {
      // Verwende die Audio-URL von der API
      const audio = new Audio(audioUrl)
      audio.play().catch(console.error)
    } else if (word && "speechSynthesis" in window) {
      // Fallback auf Text-to-Speech
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = "de-DE"
      speechSynthesis.speak(utterance)
    }
  }

  const searchPopularWord = (word: string) => {
    setSearchTerm(word)
    setSearchResults([])
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DeutschTest</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Startseite
              </Link>
              <Link href="/test" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Sprachtest
              </Link>
              <Link
                href="/dictionary"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Wörterbuch
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Deutsch Wörterbuch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schlagen Sie deutsche Wörter nach und erhalten Sie detaillierte Definitionen, Aussprache und Beispiele aus
            einer umfassenden Online-Datenbank.
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Wort suchen</CardTitle>
            <CardDescription>Geben Sie ein deutsches Wort ein, um seine Definition zu finden</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Deutsches Wort eingeben..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isSearching}
              />
              <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()}>
                {isSearching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Suche...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Suchen
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Suchergebnisse für "{searchTerm}" ({searchResults.length})
            </h2>
            {searchResults.map((entry, entryIndex) => (
              <Card key={entryIndex} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-3xl text-blue-600">{entry.word}</CardTitle>
                      {(entry.audioUrl || entry.word) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playPronunciation(entry.audioUrl, entry.word)}
                          className="text-gray-500 hover:text-blue-600"
                          title="Aussprache anhören"
                        >
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                    {entry.pronunciation && (
                      <span className="text-lg text-gray-600 font-mono bg-white px-3 py-1 rounded">
                        {entry.pronunciation}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {entry.meanings.map((meaning, meaningIndex) => (
                    <div key={meaningIndex} className="border-l-4 border-blue-200 pl-4">
                      <h3 className="text-lg font-semibold text-purple-600 mb-3">{meaning.partOfSpeech}</h3>

                      <div className="space-y-4">
                        {meaning.definitions.map((definition, defIndex) => (
                          <div key={defIndex} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-800 font-medium mb-2">
                              <span className="text-gray-600 font-normal">{defIndex + 1}.</span> {definition.definition}
                            </p>

                            {definition.example && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600 italic">
                                  <strong>Beispiel:</strong> "{definition.example}"
                                </p>
                              </div>
                            )}

                            {(definition.synonyms.length > 0 || definition.antonyms.length > 0) && (
                              <div className="mt-3 space-y-2">
                                {definition.synonyms.length > 0 && (
                                  <div>
                                    <span className="text-sm font-semibold text-green-700">Synonyme: </span>
                                    <div className="inline-flex flex-wrap gap-1 mt-1">
                                      {definition.synonyms.map((synonym, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                                        >
                                          {synonym}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {definition.antonyms.length > 0 && (
                                  <div>
                                    <span className="text-sm font-semibold text-red-700">Antonyme: </span>
                                    <div className="inline-flex flex-wrap gap-1 mt-1">
                                      {definition.antonyms.map((antonym, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                          {antonym}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {(meaning.synonyms.length > 0 || meaning.antonyms.length > 0) && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          {meaning.synonyms.length > 0 && (
                            <div className="mb-2">
                              <span className="text-sm font-semibold text-blue-700">Weitere Synonyme: </span>
                              <div className="inline-flex flex-wrap gap-1 mt-1">
                                {meaning.synonyms.map((synonym, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs">
                                    {synonym}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {meaning.antonyms.length > 0 && (
                            <div>
                              <span className="text-sm font-semibold text-blue-700">Weitere Antonyme: </span>
                              <div className="inline-flex flex-wrap gap-1 mt-1">
                                {meaning.antonyms.map((antonym, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs">
                                    {antonym}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {entry.sourceUrls.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        <strong>Quellen:</strong>{" "}
                        {entry.sourceUrls.map((url, idx) => (
                          <span key={idx}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {new URL(url).hostname}
                            </a>
                            {idx < entry.sourceUrls.length - 1 && ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Popular words suggestions */}
        {!searchTerm && !isSearching && searchResults.length === 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Beliebte deutsche Wörter</h2>
            <p className="text-gray-600 mb-6">Klicken Sie auf ein Wort, um seine Definition zu suchen:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {popularGermanWords.map((word, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => searchPopularWord(word)}
                >
                  <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                  {word}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* API Info */}
        <div className="mt-16 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Über dieses Wörterbuch</h3>
          <p className="text-gray-600 text-sm">
            Dieses Wörterbuch nutzt die kostenlose Dictionary API, um aktuelle und umfassende Definitionen deutscher
            Wörter bereitzustellen. Die Daten stammen aus verschiedenen vertrauenswürdigen Quellen und werden regelmäßig
            aktualisiert.
          </p>
        </div>
      </div>
    </div>
  )
}
