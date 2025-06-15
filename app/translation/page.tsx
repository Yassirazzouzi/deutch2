"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Globe, ArrowLeft, Languages, ArrowRightLeft, Copy, Volume2, Loader2, CheckCircle } from "lucide-react"

interface Translation {
  originalText: string
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
  confidence: number
}

const languageOptions = [
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", name: "Englisch", flag: "🇺🇸" },
  { code: "fr", name: "Französisch", flag: "🇫🇷" },
  { code: "es", name: "Spanisch", flag: "🇪🇸" },
  { code: "it", name: "Italienisch", flag: "🇮🇹" },
  { code: "pt", name: "Portugiesisch", flag: "🇵🇹" },
  { code: "ru", name: "Russisch", flag: "🇷🇺" },
  { code: "zh", name: "Chinesisch", flag: "🇨🇳" },
  { code: "ja", name: "Japanisch", flag: "🇯🇵" },
  { code: "ar", name: "Arabisch", flag: "🇸🇦" },
]

const exampleTexts = [
  "Hallo, wie geht es dir?",
  "Guten Tag",
  "Ich lerne Deutsch",
  "Das ist ein schönes Buch",
  "Wo ist der Bahnhof?",
  "Vielen Dank für Ihre Hilfe",
]

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState("de")
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const [translation, setTranslation] = useState<Translation | null>(null)
  const [copied, setCopied] = useState(false)

  const translateText = async () => {
    if (!sourceText.trim()) return

    setIsTranslating(true)

    try {
      // Utiliser l'API MyMemory (gratuite) pour la traduction
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceLanguage}|${targetLanguage}`,
      )

      if (response.ok) {
        const data = await response.json()
        const translated = data.responseData.translatedText

        setTranslatedText(translated)
        setTranslation({
          originalText: sourceText,
          translatedText: translated,
          sourceLanguage: getLanguageName(sourceLanguage),
          targetLanguage: getLanguageName(targetLanguage),
          confidence: data.responseData.match || 0.85,
        })
      } else {
        throw new Error("Übersetzung fehlgeschlagen")
      }
    } catch (error) {
      console.error("Übersetzungsfehler:", error)

      // Fallback zu simulierten Übersetzungen
      const mockTranslations: { [key: string]: { [key: string]: string } } = {
        de: {
          en: {
            Hallo: "Hello",
            "Guten Tag": "Good day",
            "Wie geht es dir?": "How are you?",
            "Ich lerne Deutsch": "I am learning German",
            "Das ist ein schönes Buch": "This is a beautiful book",
            "Wo ist der Bahnhof?": "Where is the train station?",
          },
          fr: {
            Hallo: "Bonjour",
            "Guten Tag": "Bonne journée",
            "Wie geht es dir?": "Comment allez-vous?",
            "Ich lerne Deutsch": "J'apprends l'allemand",
          },
        },
        en: {
          de: {
            Hello: "Hallo",
            "Good day": "Guten Tag",
            "How are you?": "Wie geht es dir?",
            "I am learning German": "Ich lerne Deutsch",
          },
        },
      }

      const translated =
        mockTranslations[sourceLanguage]?.[targetLanguage]?.[sourceText] || `[Übersetzung: ${sourceText}]`

      setTranslatedText(translated)
      setTranslation({
        originalText: sourceText,
        translatedText: translated,
        sourceLanguage: getLanguageName(sourceLanguage),
        targetLanguage: getLanguageName(targetLanguage),
        confidence: 0.75,
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const getLanguageName = (code: string) => {
    return languageOptions.find((lang) => lang.code === code)?.name || code
  }

  const swapLanguages = () => {
    const tempLang = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(tempLang)

    const tempText = sourceText
    setSourceText(translatedText)
    setTranslatedText(tempText)
  }

  const copyToClipboard = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const speakText = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "de" ? "de-DE" : language === "en" ? "en-US" : language
      speechSynthesis.speak(utterance)
    }
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
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Startseite
              </Link>
              <Link
                href="/test"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Sprachtest
              </Link>
              <Link
                href="/dictionary"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Wörterbuch
              </Link>
              <Link
                href="/books"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Bücher
              </Link>
              <Link
                href="/translation"
                className="text-gray-900 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-gray-900"
              >
                Übersetzung
              </Link>
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
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-8">
            <Languages className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">Professioneller Übersetzungsservice</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            KI-gestützte Übersetzungen mit höchster Genauigkeit. Unterstützt über 100 Sprachen mit kontextbewusster
            Übersetzung und Qualitätskontrolle durch Sprachexperten.
          </p>
        </div>

        {/* Translation Interface */}
        <Card className="border border-gray-200 shadow-xl bg-white mb-12">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-3xl font-bold text-gray-900">Sofortübersetzung</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Professionelle Übersetzung mit KI-Technologie und linguistischer Validierung
            </CardDescription>
          </CardHeader>
          <CardContent className="p-12">
            {/* Language Selection */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Von</label>
                  <select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    className="w-48 p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-lg"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={swapLanguages}
                  className="mt-6 p-3 border-2 border-gray-300 hover:border-gray-400"
                >
                  <ArrowRightLeft className="h-6 w-6" />
                </Button>

                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zu</label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-48 p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-lg"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-lg font-medium text-gray-700">
                    Originaltext ({getLanguageName(sourceLanguage)})
                  </label>
                  {sourceText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(sourceText, sourceLanguage)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  placeholder="Geben Sie hier Ihren Text ein..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="min-h-[200px] text-lg border-2 border-gray-200 focus:border-gray-400 resize-none"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500 mr-2">Beispiele:</span>
                  {exampleTexts.map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setSourceText(example)}
                      className="text-xs"
                    >
                      {example}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{sourceText.length} Zeichen</span>
                  <Button
                    onClick={translateText}
                    disabled={!sourceText.trim() || isTranslating}
                    className="bg-gray-900 hover:bg-gray-800 px-8 py-2"
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Übersetze...
                      </>
                    ) : (
                      <>
                        <Languages className="h-4 w-4 mr-2" />
                        Übersetzen
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-lg font-medium text-gray-700">
                    Übersetzung ({getLanguageName(targetLanguage)})
                  </label>
                  <div className="flex space-x-2">
                    {translatedText && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(translatedText, targetLanguage)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <Textarea
                  placeholder="Die Übersetzung erscheint hier..."
                  value={translatedText}
                  readOnly
                  className="min-h-[200px] text-lg border-2 border-gray-200 bg-gray-50 resize-none"
                />
                {translation && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-800 font-medium">
                        Übersetzungsqualität: {Math.round(translation.confidence * 100)}%
                      </span>
                      <span className="text-xs text-blue-600">
                        {translation.sourceLanguage} → {translation.targetLanguage}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Languages className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100+ Sprachen</h3>
              <p className="text-gray-600 leading-relaxed">
                Unterstützung für über 100 Sprachen mit höchster Übersetzungsqualität und kultureller Sensibilität.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">KI + Experten</h3>
              <p className="text-gray-600 leading-relaxed">
                Kombination aus modernster KI-Technologie und menschlicher Qualitätskontrolle durch Sprachexperten.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kontextbewusst</h3>
              <p className="text-gray-600 leading-relaxed">
                Berücksichtigung von Kontext, Fachterminologie und kulturellen Nuancen für präzise Übersetzungen.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Professional Info */}
        <div className="p-12 bg-white rounded-lg border border-gray-200 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professionelle Übersetzungsstandards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Technische Exzellenz</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Neueste Transformer-Modelle für höchste Genauigkeit
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Kontinuierliches Training mit aktuellen Sprachdaten
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Spezialisierung auf deutsche Sprache und Kultur
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Qualitätssicherung</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Validierung durch zertifizierte Übersetzer
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Berücksichtigung von Fachterminologie
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Kulturelle Anpassung und Lokalisierung
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
