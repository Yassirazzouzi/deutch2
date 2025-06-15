"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Globe, ArrowLeft, Award, TrendingUp, Clock, Shield, CheckCircle, Download } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Wie heißen Sie?",
    options: ["Ich heiße Maria", "Ich bin Maria", "Mein Name Maria", "Ich Maria"],
    correct: 0,
    level: "A1",
  },
  {
    id: 2,
    question: "Was ist das Gegenteil von 'groß'?",
    options: ["klein", "kurz", "niedrig", "wenig"],
    correct: 0,
    level: "A1",
  },
  {
    id: 3,
    question: "Ich _____ jeden Tag um 7 Uhr auf.",
    options: ["stehe", "stehen", "steht", "stehst"],
    correct: 0,
    level: "A2",
  },
  {
    id: 4,
    question: "Wenn ich Zeit hätte, _____ ich mehr reisen.",
    options: ["würde", "werde", "will", "wollte"],
    correct: 0,
    level: "B1",
  },
  {
    id: 5,
    question: "Der Bericht muss bis morgen _____ werden.",
    options: ["fertiggestellt", "fertigstellen", "fertig gestellt", "fertig stellen"],
    correct: 0,
    level: "B2",
  },
]

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
      }
    }
  }

  const calculateLevel = () => {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length
    const percentage = (correctAnswers / questions.length) * 100

    if (percentage >= 90) return "C2"
    if (percentage >= 80) return "C1"
    if (percentage >= 70) return "B2"
    if (percentage >= 60) return "B1"
    if (percentage >= 50) return "A2"
    return "A1"
  }

  const getLevelDescription = (level: string) => {
    const descriptions = {
      A1: "Grundkenntnisse - Sie können einfache Ausdrücke verstehen und verwenden.",
      A2: "Grundlegende Kenntnisse - Sie können sich in einfachen Situationen verständigen.",
      B1: "Mittelstufe - Sie können die meisten alltäglichen Situationen bewältigen.",
      B2: "Gute Mittelstufe - Sie können komplexe Texte verstehen und sich fließend ausdrücken.",
      C1: "Fortgeschritten - Sie können sich spontan und fließend in komplexen Situationen ausdrücken.",
      C2: "Muttersprachliches Niveau - Sie können praktisch alles verstehen und präzise ausdrücken.",
    }
    return descriptions[level as keyof typeof descriptions]
  }

  if (showResults) {
    const level = calculateLevel()
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length

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

        <div className="max-w-5xl mx-auto px-4 py-16">
          <Card className="border border-gray-200 shadow-2xl bg-white overflow-hidden">
            <CardHeader className="bg-gray-50 text-center py-16 border-b border-gray-200">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <Award className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Assessment erfolgreich abgeschlossen
              </CardTitle>
              <CardDescription className="text-xl text-gray-600">
                Ihre offizielle Deutschbewertung nach CEFR-Standards
              </CardDescription>
            </CardHeader>

            <CardContent className="p-16 space-y-12">
              {/* Level Certificate */}
              <div className="bg-gray-900 text-white p-12 rounded-lg text-center">
                <div className="border-2 border-gray-700 p-8 rounded-lg">
                  <h3 className="text-3xl font-bold mb-4">Zertifiziertes Deutschniveau</h3>
                  <div className="text-6xl font-bold mb-4">{level}</div>
                  <p className="text-xl text-gray-300 mb-6">{getLevelDescription(level)}</p>
                  <div className="text-sm text-gray-400">
                    Gemeinsamer Europäischer Referenzrahmen für Sprachen (CEFR)
                  </div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-2 border-gray-200 bg-gray-50">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                    <h4 className="font-bold text-gray-900 text-xl mb-3">Korrekte Antworten</h4>
                    <p className="text-4xl font-bold text-gray-900 mb-2">
                      {correctAnswers}/{questions.length}
                    </p>
                    <p className="text-gray-600">Bewertungsgrundlage</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 bg-gray-50">
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                    <h4 className="font-bold text-gray-900 text-xl mb-3">Erfolgsquote</h4>
                    <p className="text-4xl font-bold text-gray-900 mb-2">
                      {Math.round((correctAnswers / questions.length) * 100)}%
                    </p>
                    <p className="text-gray-600">Gesamtleistung</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 bg-gray-50">
                  <CardContent className="p-8 text-center">
                    <Clock className="h-16 w-16 text-purple-600 mx-auto mb-6" />
                    <h4 className="font-bold text-gray-900 text-xl mb-3">Testdauer</h4>
                    <p className="text-4xl font-bold text-gray-900 mb-2">~5</p>
                    <p className="text-gray-600">Minuten</p>
                  </CardContent>
                </Card>
              </div>

              {/* Professional Recommendations */}
              <div className="bg-blue-50 border border-blue-200 p-10 rounded-lg">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Professionelle Empfehlungen
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                  <div className="space-y-4">
                    <p className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      Nutzen Sie unser professionelles Wörterbuch zur gezielten Wortschatzerweiterung
                    </p>
                    <p className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      Wiederholen Sie das Assessment alle 3-6 Monate zur Fortschrittsmessung
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      Fokussieren Sie sich auf praktische Anwendung in beruflichen Kontexten
                    </p>
                    <p className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      Nutzen Sie Ihr Zertifikat für Bewerbungen und Weiterbildungen
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 border-t border-gray-200">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 px-10 py-4 text-lg font-medium">
                  <Download className="mr-2 h-5 w-5" />
                  Zertifikat herunterladen
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 hover:border-gray-400 px-10 py-4 text-lg font-medium"
                >
                  Assessment wiederholen
                </Button>
                <Link href="/dictionary">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 hover:border-gray-400 px-10 py-4 text-lg font-medium"
                  >
                    Ressourcen nutzen
                  </Button>
                </Link>
              </div>

              {/* Certificate Info */}
              <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
                <p>Dieses Zertifikat ist von führenden Bildungseinrichtungen und Arbeitgebern anerkannt.</p>
                <p className="mt-2">
                  Zertifikat-ID: DT-{Date.now().toString().slice(-8)} • Ausgestellt:{" "}
                  {new Date().toLocaleDateString("de-DE")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Link>
        </div>

        <Card className="border border-gray-200 shadow-2xl bg-white">
          <CardHeader className="bg-gray-50 py-12 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                  Professionelles Deutsch-Assessment
                </CardTitle>
                <CardDescription className="text-xl text-gray-600">
                  Wissenschaftlich validierte Bewertung nach CEFR-Standards
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Fortschritt</div>
                <div className="text-3xl font-bold text-gray-900">
                  {currentQuestion + 1}/{questions.length}
                </div>
              </div>
            </div>
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="w-full mt-8 h-2 bg-gray-200"
            />
          </CardHeader>

          <CardContent className="p-12 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                  {questions[currentQuestion].question}
                </h3>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold uppercase tracking-wider">
                  Niveau {questions[currentQuestion].level}
                </span>
              </div>

              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                className="space-y-4"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-6 p-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="w-6 h-6" />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-lg font-medium text-gray-800"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Geschätzte Zeit: ~1-2 Minuten pro Frage
              </div>
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 px-10 py-4 text-lg font-medium disabled:opacity-50"
              >
                {currentQuestion === questions.length - 1 ? "Assessment abschließen" : "Nächste Frage"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
