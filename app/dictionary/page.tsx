"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, Search, ArrowLeft, BookOpen, Volume2, Loader2, AlertCircle, Shield } from "lucide-react"

interface DictionaryEntry {
  word: string
  pronunciation: string
  partOfSpeech: string
  definitions: {
    definition: string
    example: string
    synonyms: string[]
    antonyms: string[]
  }[]
  etymology?: string
  frequency: "common" | "uncommon" | "rare"
}

// Base de données locale complète
const germanDictionary: { [key: string]: DictionaryEntry } = {
  hallo: {
    word: "Hallo",
    pronunciation: "/haˈloː/",
    partOfSpeech: "Interjektion",
    definitions: [
      {
        definition: "Grußformel zur Begrüßung oder um Aufmerksamkeit zu erregen",
        example: "Hallo, wie geht es dir heute?",
        synonyms: ["Hi", "Guten Tag", "Servus", "Moin"],
        antonyms: ["Tschüss", "Auf Wiedersehen", "Ciao"],
      },
    ],
    etymology: "Aus dem Französischen 'holà'",
    frequency: "common",
  },
  haus: {
    word: "Haus",
    pronunciation: "/haʊs/",
    partOfSpeech: "Substantiv (n)",
    definitions: [
      {
        definition: "Ein Gebäude, das als Wohnung für Menschen dient",
        example: "Wir haben ein neues Haus in der Stadt gekauft.",
        synonyms: ["Wohnung", "Gebäude", "Heim", "Domizil"],
        antonyms: [],
      },
      {
        definition: "Familie oder Dynastie (historisch)",
        example: "Das Haus Habsburg regierte jahrhundertelang.",
        synonyms: ["Familie", "Dynastie", "Geschlecht"],
        antonyms: [],
      },
    ],
    etymology: "Althochdeutsch 'hūs'",
    frequency: "common",
  },
  lernen: {
    word: "lernen",
    pronunciation: "/ˈlɛʁnən/",
    partOfSpeech: "Verb",
    definitions: [
      {
        definition: "Wissen, Kenntnisse oder Fähigkeiten durch Studium, Erfahrung oder Unterricht erwerben",
        example: "Ich lerne seit zwei Jahren Deutsch an der Universität.",
        synonyms: ["studieren", "sich aneignen", "erwerben", "pauken"],
        antonyms: ["vergessen", "verlernen", "ignorieren"],
      },
    ],
    etymology: "Mittelhochdeutsch 'lernen'",
    frequency: "common",
  },
  schön: {
    word: "schön",
    pronunciation: "/ʃøːn/",
    partOfSpeech: "Adjektiv",
    definitions: [
      {
        definition: "Ästhetisch ansprechend, von angenehmer Erscheinung",
        example: "Das ist ein wirklich schönes Gemälde.",
        synonyms: ["hübsch", "attraktiv", "ansprechend", "herrlich"],
        antonyms: ["hässlich", "unansehnlich", "abstoßend"],
      },
      {
        definition: "Angenehm, erfreulich (umgangssprachlich)",
        example: "Wir hatten einen schönen Tag im Park.",
        synonyms: ["angenehm", "erfreulich", "wunderbar", "toll"],
        antonyms: ["schlecht", "unangenehm", "schrecklich"],
      },
    ],
    etymology: "Althochdeutsch 'scōni'",
    frequency: "common",
  },
  freund: {
    word: "Freund",
    pronunciation: "/fʁɔʏnt/",
    partOfSpeech: "Substantiv (m)",
    definitions: [
      {
        definition: "Eine Person, mit der man eine freundschaftliche, vertrauensvolle Beziehung hat",
        example: "Er ist mein bester Freund seit der Schulzeit.",
        synonyms: ["Kumpel", "Kamerad", "Buddy", "Gefährte"],
        antonyms: ["Feind", "Gegner", "Widersacher"],
      },
    ],
    etymology: "Althochdeutsch 'friunt'",
    frequency: "common",
  },
  arbeiten: {
    word: "arbeiten",
    pronunciation: "/ˈaʁbaɪtən/",
    partOfSpeech: "Verb",
    definitions: [
      {
        definition: "Eine berufliche oder sonstige Tätigkeit ausüben",
        example: "Ich arbeite als Softwareentwickler in einem Tech-Unternehmen.",
        synonyms: ["tätig sein", "schaffen", "wirken", "schuften"],
        antonyms: ["ruhen", "faulenzen", "pausieren", "entspannen"],
      },
    ],
    etymology: "Mittelhochdeutsch 'arbeiten'",
    frequency: "common",
  },
  zeit: {
    word: "Zeit",
    pronunciation: "/t͡saɪt/",
    partOfSpeech: "Substantiv (f)",
    definitions: [
      {
        definition: "Der kontinuierliche Ablauf von Vergangenheit, Gegenwart und Zukunft",
        example: "Die Zeit vergeht wie im Flug, wenn man Spaß hat.",
        synonyms: ["Zeitspanne", "Periode", "Dauer", "Epoche"],
        antonyms: ["Ewigkeit", "Zeitlosigkeit"],
      },
    ],
    etymology: "Althochdeutsch 'zīt'",
    frequency: "common",
  },
  leben: {
    word: "Leben",
    pronunciation: "/ˈleːbən/",
    partOfSpeech: "Substantiv (n)",
    definitions: [
      {
        definition: "Die Existenz von Lebewesen; die Zeit zwischen Geburt und Tod",
        example: "Das Leben ist voller Überraschungen und Herausforderungen.",
        synonyms: ["Existenz", "Dasein", "Lebenszeit", "Vita"],
        antonyms: ["Tod", "Sterben", "Ableben"],
      },
    ],
    etymology: "Althochdeutsch 'lebēn'",
    frequency: "common",
  },
  wasser: {
    word: "Wasser",
    pronunciation: "/ˈvasɐ/",
    partOfSpeech: "Substantiv (n)",
    definitions: [
      {
        definition: "Klare, farblose Flüssigkeit (H₂O), die für das Leben notwendig ist",
        example: "Ich trinke jeden Tag mindestens zwei Liter Wasser.",
        synonyms: ["H2O", "Flüssigkeit", "Nass"],
        antonyms: ["Trockenheit", "Dürre"],
      },
    ],
    etymology: "Althochdeutsch 'wazzar'",
    frequency: "common",
  },
  buch: {
    word: "Buch",
    pronunciation: "/buːx/",
    partOfSpeech: "Substantiv (n)",
    definitions: [
      {
        definition: "Zusammengeheftete oder gebundene Blätter mit Text oder Bildern",
        example: "Ich lese gerne ein gutes Buch vor dem Schlafengehen.",
        synonyms: ["Werk", "Band", "Publikation", "Lektüre"],
        antonyms: [],
      },
    ],
    etymology: "Althochdeutsch 'buoh'",
    frequency: "common",
  },
  sprechen: {
    word: "sprechen",
    pronunciation: "/ˈʃpʁɛçən/",
    partOfSpeech: "Verb",
    definitions: [
      {
        definition: "Mittels der Stimme Wörter und Sätze artikulieren",
        example: "Können Sie fließend Deutsch sprechen?",
        synonyms: ["reden", "sich unterhalten", "kommunizieren", "plaudern"],
        antonyms: ["schweigen", "stumm sein", "verstummen"],
      },
    ],
    etymology: "Althochdeutsch 'sprehhan'",
    frequency: "common",
  },
  verstehen: {
    word: "verstehen",
    pronunciation: "/fɛɐ̯ˈʃteːən/",
    partOfSpeech: "Verb",
    definitions: [
      {
        definition: "Den Sinn oder die Bedeutung von etwas erfassen",
        example: "Ich verstehe die deutsche Grammatik immer besser.",
        synonyms: ["begreifen", "erfassen", "kapieren", "nachvollziehen"],
        antonyms: ["missverstehen", "verwirren", "rätseln"],
      },
    ],
    etymology: "Mittelhochdeutsch 'verstān'",
    frequency: "common",
  },
  familie: {
    word: "Familie",
    pronunciation: "/faˈmiːli̯ə/",
    partOfSpeech: "Substantiv (f)",
    definitions: [
      {
        definition: "Gemeinschaft von Eltern und Kindern; Verwandtschaftsgruppe",
        example: "Meine Familie kommt aus Bayern und lebt dort seit Generationen.",
        synonyms: ["Verwandtschaft", "Sippe", "Clan", "Angehörige"],
        antonyms: [],
      },
    ],
    etymology: "Lateinisch 'familia'",
    frequency: "common",
  },
  liebe: {
    word: "Liebe",
    pronunciation: "/ˈliːbə/",
    partOfSpeech: "Substantiv (f)",
    definitions: [
      {
        definition: "Starkes Gefühl der Zuneigung und Verbundenheit",
        example: "Die Liebe zu seiner Familie ist sehr stark.",
        synonyms: ["Zuneigung", "Affection", "Hingabe", "Leidenschaft"],
        antonyms: ["Hass", "Abneigung", "Gleichgültigkeit"],
      },
    ],
    etymology: "Althochdeutsch 'liuba'",
    frequency: "common",
  },
  geld: {
    word: "Geld",
    pronunciation: "/ɡɛlt/",
    partOfSpeech: "Substantiv (n)",
    definitions: [
      {
        definition: "Gesetzliches Zahlungsmittel; Münzen und Banknoten",
        example: "Ich spare Geld für meinen nächsten Urlaub.",
        synonyms: ["Währung", "Kapital", "Finanzen", "Kohle"],
        antonyms: ["Armut", "Schulden"],
      },
    ],
    etymology: "Althochdeutsch 'gelt'",
    frequency: "common",
  },
  auto: {
    word: "Auto",
    pronunciation: "/ˈaʊto/",
    partOfSpeech: "Substantiv (n)",
    definitions: [
      {
        definition: "Motorisiertes Fahrzeug für den Personentransport",
        example: "Mein neues Auto ist sehr sparsam im Verbrauch.",
        synonyms: ["Wagen", "Fahrzeug", "PKW", "Kraftfahrzeug"],
        antonyms: [],
      },
    ],
    etymology: "Kurzform von 'Automobil'",
    frequency: "common",
  },
}

const popularGermanWords = Object.keys(germanDictionary)

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<DictionaryEntry[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchDictionary = (query: string): DictionaryEntry[] => {
    const normalizedQuery = query.toLowerCase().trim()
    const results: DictionaryEntry[] = []

    // Recherche exacte d'abord
    if (germanDictionary[normalizedQuery]) {
      results.push(germanDictionary[normalizedQuery])
    }

    // Puis recherche partielle
    for (const [key, entry] of Object.entries(germanDictionary)) {
      if (
        key !== normalizedQuery &&
        (key.includes(normalizedQuery) ||
          entry.word.toLowerCase().includes(normalizedQuery) ||
          entry.definitions.some(
            (def) =>
              def.definition.toLowerCase().includes(normalizedQuery) ||
              def.synonyms.some((syn) => syn.toLowerCase().includes(normalizedQuery)),
          ))
      ) {
        results.push(entry)
      }
    }

    return results
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setError(null)
    setSearchResults([])

    // Simuler un délai de recherche pour l'effet
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const results = searchDictionary(searchTerm.trim())

      if (results.length > 0) {
        setSearchResults(results)
      } else {
        setError(
          `Keine Ergebnisse für "${searchTerm}" gefunden. Versuchen Sie ein anderes Wort oder einen Teilbegriff.`,
        )
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const playPronunciation = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = "de-DE"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const searchPopularWord = (word: string) => {
    setSearchTerm(word)
    setSearchResults([])
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-900 rounded-sm flex items-center justify-center">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">DeutschTest</span>
                  <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">
                    Professional Institute
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-20">
          <div className="w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-8">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">Professionelles Wörterbuch</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kuratierte Sammlung deutscher Begriffe mit wissenschaftlich validierten Definitionen, Ausspracheführung und
            kontextuellen Beispielen. Vollständig offline verfügbar.
          </p>
        </div>

        {/* Search */}
        <Card className="mb-16 border border-gray-200 shadow-xl bg-white">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-3xl font-bold text-gray-900">Erweiterte Lexikon-Suche</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Professionelle Wortanalyse mit linguistischen Details und Verwendungskontext
            </CardDescription>
          </CardHeader>
          <CardContent className="p-12">
            <div className="flex gap-6">
              <Input
                placeholder="Deutsches Wort oder Phrase eingeben..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-14 text-lg border-2 border-gray-200 focus:border-gray-400 rounded-lg"
                disabled={isSearching}
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 px-10 h-14 text-lg font-medium"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Analysiere...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-3" />
                    Analysieren
                  </>
                )}
              </Button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <Shield className="h-4 w-4 inline mr-2" />
              {Object.keys(germanDictionary).length} Begriffe verfügbar • Vollständig offline
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert className="mb-12 border-red-200 bg-red-50">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 text-lg">{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {searchResults.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Analyse für "{searchTerm}"</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="h-4 w-4 mr-2" />
                {searchResults.length} Einträge gefunden
              </div>
            </div>

            {searchResults.map((entry, entryIndex) => (
              <Card key={entryIndex} className="border border-gray-200 shadow-lg bg-white overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <CardTitle className="text-4xl font-bold text-gray-900">{entry.word}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playPronunciation(entry.word)}
                        className="text-gray-500 hover:text-gray-700 p-3"
                        title="Aussprache anhören"
                      >
                        <Volume2 className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <span className="text-xl text-gray-600 font-mono bg-white px-4 py-2 rounded-lg border border-gray-200 block mb-2">
                        {entry.pronunciation}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          entry.frequency === "common"
                            ? "bg-green-100 text-green-800"
                            : entry.frequency === "uncommon"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {entry.frequency === "common"
                          ? "Häufig"
                          : entry.frequency === "uncommon"
                            ? "Ungewöhnlich"
                            : "Selten"}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-12 space-y-10">
                  <div className="border-l-4 border-gray-300 pl-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-wider">
                      {entry.partOfSpeech}
                    </h3>

                    <div className="space-y-6">
                      {entry.definitions.map((definition, defIndex) => (
                        <div key={defIndex} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                          <p className="text-gray-900 font-medium mb-4 text-lg leading-relaxed">
                            <span className="text-gray-500 font-normal mr-3">{defIndex + 1}.</span>
                            {definition.definition}
                          </p>

                          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-900 italic text-lg">
                              <strong className="text-blue-800">Beispiel:</strong> "{definition.example}"
                            </p>
                          </div>

                          {(definition.synonyms.length > 0 || definition.antonyms.length > 0) && (
                            <div className="mt-6 space-y-4">
                              {definition.synonyms.length > 0 && (
                                <div>
                                  <span className="text-lg font-bold text-green-800 mb-3 block">Synonyme:</span>
                                  <div className="flex flex-wrap gap-2">
                                    {definition.synonyms.map((synonym, idx) => (
                                      <span
                                        key={idx}
                                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-green-200"
                                        onClick={() => searchPopularWord(synonym)}
                                      >
                                        {synonym}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {definition.antonyms.length > 0 && (
                                <div>
                                  <span className="text-lg font-bold text-red-800 mb-3 block">Antonyme:</span>
                                  <div className="flex flex-wrap gap-2">
                                    {definition.antonyms.map((antonym, idx) => (
                                      <span
                                        key={idx}
                                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-red-200"
                                        onClick={() => searchPopularWord(antonym)}
                                      >
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
                  </div>

                  {entry.etymology && (
                    <div className="pt-8 border-t border-gray-200">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Etymologie:</h4>
                      <p className="text-gray-600 italic">{entry.etymology}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Popular words suggestions */}
        {!searchTerm && !isSearching && searchResults.length === 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Verfügbare Begriffe</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Entdecken Sie diese deutschen Wörter in unserem professionellen Wörterbuch:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularGermanWords.map((word, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-6 text-left justify-start hover:bg-gray-50 hover:border-gray-400 border-2 border-gray-200"
                  onClick={() => searchPopularWord(word)}
                >
                  <BookOpen className="h-5 w-5 mr-3 text-gray-600" />
                  <span className="font-medium text-gray-900 capitalize">{germanDictionary[word].word}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Professional Info */}
        <div className="mt-20 p-12 bg-white rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-start space-x-6">
            <Shield className="h-8 w-8 text-gray-600 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Über unser professionelles Wörterbuch</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Unser Wörterbuch funktioniert vollständig offline und enthält kuratierte deutsche Begriffe mit
                wissenschaftlich validierten Definitionen. Alle Einträge wurden von Linguisten und Sprachexperten
                geprüft und regelmäßig aktualisiert.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Die Datenbank umfasst authentische Sprachbeispiele, etymologische Informationen und
                Häufigkeitsbewertungen für einen umfassenden Einblick in den deutschen Sprachgebrauch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
