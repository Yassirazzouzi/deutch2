"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Globe, ArrowLeft, CheckCircle } from "lucide-react"

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
      A1: "Anfänger - Sie können einfache Ausdrücke verstehen und verwenden.",
      A2: "Grundkenntnisse - Sie können sich in einfachen Situationen verständigen.",
      B1: "Mittelstufe - Sie können die meisten Situationen des Alltags bewältigen.",
      B2: "Gute Mittelstufe - Sie können komplexe Texte verstehen und sich fließend ausdrücken.",
      C1: "Fortgeschritten - Sie können sich spontan und fließend ausdrücken.",
      C2: "Muttersprachliches Niveau - Sie können praktisch alles verstehen und ausdrücken.",
    }
    return descriptions[level as keyof typeof descriptions]
  }

  if (showResults) {
    const level = calculateLevel()
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length

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
                <Link
                  href="/test"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
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

        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-3xl">Test abgeschlossen!</CardTitle>
              <CardDescription className="text-lg">Hier sind Ihre Ergebnisse</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Ihr Deutschniveau: {level}</h3>
                <p className="text-gray-700">{getLevelDescription(level)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">Richtige Antworten</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {correctAnswers}/{questions.length}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Prozentsatz</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((correctAnswers / questions.length) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.reload()}>Test wiederholen</Button>
                <Link href="/dictionary">
                  <Button variant="outline">Wörterbuch besuchen</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Zur Startseite</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Deutschtest</CardTitle>
              <span className="text-sm text-gray-500">
                Frage {currentQuestion + 1} von {questions.length}
              </span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Niveau: {questions[currentQuestion].level}</div>
              <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                {currentQuestion === questions.length - 1 ? "Test beenden" : "Nächste Frage"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
