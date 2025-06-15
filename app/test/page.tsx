"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, ArrowLeft } from "lucide-react"

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
  {
    id: 6,
    question: "Wo wohnen Sie?",
    options: ["Ich wohne in Berlin", "Ich bin wohne Berlin", "Ich wohnt in Berlin", "Ich wohnst Berlin"],
    correct: 0,
    level: "A1",
  },
  {
    id: 7,
    question: "Wie spät ist es?",
    options: ["Es ist halb acht", "Es halb acht", "Es ist acht halb", "Halb acht ist es"],
    correct: 0,
    level: "A1",
  },
  {
    id: 8,
    question: "Was trinken Sie gern?",
    options: ["Ich trinke gern Tee", "Ich trinkt gern Tee", "Ich trinken gern Tee", "Ich trinkst gern Tee"],
    correct: 0,
    level: "A1",
  },
  {
    id: 9,
    question: "Welcher Tag ist heute?",
    options: ["Heute ist Montag", "Heute Montag ist", "Montag ist heute", "Es Montag heute ist"],
    correct: 0,
    level: "A1",
  },
  {
    id: 10,
    question: "Er _____ in einer Bank.",
    options: ["arbeitet", "arbeite", "arbeitest", "arbeiten"],
    correct: 0,
    level: "A2",
  },
  {
    id: 11,
    question: "Möchtest du mit mir _____?",
    options: ["kommen", "kommt", "komme", "kommst"],
    correct: 0,
    level: "A2",
  },
  {
    id: 12,
    question: "Wir haben gestern einen Film _____.",
    options: ["gesehen", "gesehen haben", "sehen", "sieht"],
    correct: 0,
    level: "A2",
  },
  {
    id: 13,
    question: "Sie kann sehr gut _____.",
    options: ["kochen", "kocht", "koch", "gekocht"],
    correct: 0,
    level: "A2",
  },
  {
    id: 14,
    question: "Wenn ich krank bin, _____ ich zum Arzt.",
    options: ["gehe", "ginge", "gegangen", "gehst"],
    correct: 0,
    level: "B1",
  },
  {
    id: 15,
    question: "Ich interessiere mich _____ Geschichte.",
    options: ["für", "an", "über", "auf"],
    correct: 0,
    level: "B1",
  },
  {
    id: 16,
    question: "Obwohl er müde war, _____ er weiter.",
    options: ["arbeitete", "arbeitet", "arbeitest", "arbeiten"],
    correct: 0,
    level: "B1",
  },
  {
    id: 17,
    question: "Ich freue mich _____ das Wochenende.",
    options: ["auf", "über", "an", "für"],
    correct: 0,
    level: "B1",
  },
  {
    id: 18,
    question: "Das Projekt wurde erfolgreich _____ .",
    options: ["abgeschlossen", "abschließen", "abgeschlossen wird", "abschloss"],
    correct: 0,
    level: "B2",
  },
  {
    id: 19,
    question: "Er behauptet, dass er das Problem schon _____ hat.",
    options: ["gelöst", "lösen", "löscht", "löste"],
    correct: 0,
    level: "B2",
  },
  {
    id: 20,
    question: "Trotz des schlechten Wetters gingen wir _____ .",
    options: ["spazieren", "spaziert", "spazieren gehen", "spazier"],
    correct: 0,
    level: "B2",
  },
  {
    id: 21,
    question: "Das ist der Mann, _____ das Auto gestohlen wurde.",
    options: ["dessen", "deren", "wessen", "wo"],
    correct: 0,
    level: "B2",
  },
  {
    id: 22,
    question: "Bevor ich gehe, muss ich noch die E-Mails _____.",
    options: ["lesen", "gelesen", "liest", "las"],
    correct: 0,
    level: "B1",
  },
  {
    id: 23,
    question: "Ich habe keine Zeit, _____ ich viel arbeiten muss.",
    options: ["weil", "denn", "obwohl", "deshalb"],
    correct: 0,
    level: "B1",
  },
  {
    id: 24,
    question: "Er konnte nicht kommen, _____ er krank war.",
    options: ["weil", "dass", "ob", "denn"],
    correct: 0,
    level: "B1",
  },
  {
    id: 25,
    question: "Sie hat das Buch, _____ ich gestern gesucht habe.",
    options: ["das", "die", "welche", "wo"],
    correct: 0,
    level: "B1",
  },
  {
    id: 26,
    question: "Ich habe gestern einen Film _____.",
    options: ["gesehen", "gesehen habe", "sehen", "sieht"],
    correct: 0,
    level: "A2",
  },
  {
    id: 27,
    question: "Er _____ jeden Tag um 6 Uhr auf.",
    options: ["steht", "stehen", "stehtet", "stehst"],
    correct: 0,
    level: "A2",
  },
  {
    id: 28,
    question: "Kannst du mir bitte _____ helfen?",
    options: ["ein bisschen", "ein wenig", "eine bisschen", "ein bisschenes"],
    correct: 0,
    level: "A2",
  },
  {
    id: 29,
    question: "Wir treffen uns _____ dem Kino.",
    options: ["vor", "hinter", "neben", "zwischen"],
    correct: 0,
    level: "A1",
  },
  {
    id: 30,
    question: "Ich mag keinen Kaffee, ich trinke lieber _____ .",
    options: ["Tee", "Wasser", "Milch", "Saft"],
    correct: 0,
    level: "A1",
  },
  {
    id: 31,
    question: "Welcher Tag kommt nach Montag?",
    options: ["Dienstag", "Sonntag", "Freitag", "Donnerstag"],
    correct: 0,
    level: "A1",
  },
  {
    id: 32,
    question: "Das Wetter ist heute sehr _____.",
    options: ["schön", "schlecht", "kalt", "warm"],
    correct: 0,
    level: "A1",
  },
  {
    id: 33,
    question: "Mein Bruder _____ Fußball sehr gern.",
    options: ["spielt", "spielen", "spielst", "spielte"],
    correct: 0,
    level: "A2",
  },
  {
    id: 34,
    question: "Ich habe heute keine Zeit, _____ ich viel zu tun habe.",
    options: ["weil", "obwohl", "wenn", "damit"],
    correct: 0,
    level: "B1",
  },
  {
    id: 35,
    question: "Er arbeitet als _____ in einer Bank.",
    options: ["Manager", "Manger", "Maneger", "Managar"],
    correct: 0,
    level: "A1",
  },
  {
    id: 36,
    question: "Sie _____ gestern im Kino gewesen.",
    options: ["ist", "war", "bist", "waren"],
    correct: 1,
    level: "A2",
  },
  {
    id: 37,
    question: "Wir _____ nächsten Monat in den Urlaub fahren.",
    options: ["werden", "würden", "wollen", "müssen"],
    correct: 0,
    level: "B1",
  },
  {
    id: 38,
    question: "Kannst du mir bitte den Weg zum _____ zeigen?",
    options: ["Bahnhof", "Bahnhofs", "Bahnhöfe", "Bahnhöfen"],
    correct: 0,
    level: "A1",
  },
  {
    id: 39,
    question: "Das ist das Haus, in dem ich _____.",
    options: ["wohne", "wohnt", "wohnst", "wohnen"],
    correct: 0,
    level: "B1",
  },
  {
    id: 40,
    question: "Der Lehrer erklärt die Aufgabe _____.",
    options: ["deutlich", "deutliches", "deutlichen", "deutliche"],
    correct: 0,
    level: "B2",
  },
  {
    id: 41,
    question: "Er hat seine Meinung _____ geändert.",
    options: ["plötzlich", "plötzlich", "plözlich", "plötzich"],
    correct: 0,
    level: "B1",
  },
  {
    id: 42,
    question: "Sie hat das Geschenk mit _____ Freude angenommen.",
    options: ["großer", "groß", "große", "großem"],
    correct: 3,
    level: "B2",
  },
  {
    id: 43,
    question: "Ich bin gestern spät _____ Hause gekommen.",
    options: ["nach", "zu", "in", "an"],
    correct: 0,
    level: "A2",
  },
  {
    id: 44,
    question: "Wir haben das Problem _____ gelöst.",
    options: ["gemeinsam", "gemeintsam", "gemeinssam", "gemeintsam"],
    correct: 0,
    level: "B2",
  },
  {
    id: 45,
    question: "Er spricht sehr gut Deutsch, _____ er erst seit einem Jahr hier lebt.",
    options: ["obwohl", "weil", "denn", "aber"],
    correct: 0,
    level: "B1",
  },
  {
    id: 46,
    question: "Ich freue mich _____ das Wochenende.",
    options: ["auf", "an", "über", "für"],
    correct: 0,
    level: "B1",
  },
  {
    id: 47,
    question: "Das Wetter wird morgen _____ sein.",
    options: ["sonnig", "regnerisch", "kalt", "windig"],
    correct: 0,
    level: "A1",
  },
  {
    id: 48,
    question: "Sie hat gestern eine E-Mail _____.",
    options: ["geschrieben", "geschriebn", "geschrieben hat", "schrieb"],
    correct: 0,
    level: "A2",
  },
  {
    id: 49,
    question: "Das Buch, das ich lese, ist sehr _____.",
    options: ["interessant", "interessante", "interessanter", "interessantes"],
    correct: 0,
    level: "B1",
  },
  {
    id: 50,
    question: "Wenn ich mehr Zeit hätte, _____ ich mehr lernen.",
    options: ["würde", "werde", "will", "wollte"],
    correct: 0,
    level: "B1",
  }
]

export default function TestPage() {
  const [mounted, setMounted] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes en secondes
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Timer countdown
  useEffect(() => {
    if (started && !showResults) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setShowResults(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [started, showResults])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!submitted) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    setSubmitted(true)
    setAnswers([...answers, selectedAnswer])
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setSubmitted(false)
    } else {
      setShowResults(true)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  const calculateLevel = () => {
    const correctCount = answers.filter((ans, i) => ans === questions[i].correct).length
    const pct = (correctCount / questions.length) * 100

    if (pct >= 90) return "C2"
    if (pct >= 80) return "C1"
    if (pct >= 70) return "B2"
    if (pct >= 60) return "B1"
    if (pct >= 50) return "A2"
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

  if (!mounted) {
    return null
  }

  if (!started) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Deutsch Sprachtest</h1>
        <h2 className="text-lg mb-6">Dieser Test besteht aus 50 Fragen und dauert 30 Minuten.</h2>
        <p className="mb-8">Teste dein Deutsch-Niveau mit Multiple-Choice-Fragen.</p>
        <Button onClick={() => setStarted(true)} className="mb-6" size="lg">
          Test starten
        </Button>
        <div>
          <Link href="/" legacyBehavior>
            <a className="text-blue-600 underline flex items-center justify-center gap-1">
              <ArrowLeft size={16} /> Zurück zur Startseite
            </a>
          </Link>
        </div>
      </div>
    )
  }

  if (showResults) {
    const level = calculateLevel()
    const correctCount = answers.filter((ans, i) => ans === questions[i].correct).length

    return (
      <div className="max-w-xl mx-auto mt-20 p-6 text-center">
        <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
        <h1 className="text-3xl font-bold mb-2">Test abgeschlossen!</h1>
        <p className="mb-4">
          Du hast {correctCount} von {questions.length} Fragen richtig beantwortet.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Dein Niveau: {level}</h2>
        <p className="mb-6">{getLevelDescription(level)}</p>
        <Button onClick={() => {
          setStarted(false)
          setCurrentQuestion(0)
          setAnswers([])
          setSelectedAnswer(null)
          setSubmitted(false)
          setShowResults(false)
          setTimeLeft(30 * 60)
        }}>
          Test erneut starten
        </Button>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="max-w-xl mx-auto mt-20 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Frage {currentQuestion + 1} / {questions.length}
        </h2>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <Progress value={((currentQuestion) / questions.length) * 100} className="mb-6" />

      <Card>
        <CardHeader>
          <CardTitle>{question.question}</CardTitle>
          <CardDescription>Level: {question.level}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedAnswer?.toString() || undefined} 
            onValueChange={val => handleAnswerSelect(Number(val))}
            disabled={submitted}
          >
            {question.options.map((option, i) => {
              let bgColorClass = "hover:bg-gray-50 dark:hover:bg-gray-800";
              
              if (submitted) {
                // Après soumission, montrer la bonne réponse en vert et la mauvaise sélection en rouge
                if (i === question.correct) {
                  bgColorClass = "bg-green-100 dark:bg-green-800";
                } else if (i === selectedAnswer && i !== question.correct) {
                  bgColorClass = "bg-red-100 dark:bg-red-800";
                }
              } else if (selectedAnswer === i) {
                // Avant soumission, juste surligner la sélection
                bgColorClass = "bg-blue-100 dark:bg-blue-800";
              }

              return (
                <Label
                  key={i}
                  htmlFor={`option-${i}`}
                  className={`block cursor-pointer rounded-md p-3 mb-2 transition-colors duration-200 ${bgColorClass} ${submitted ? 'cursor-not-allowed' : ''}`}
                >
                  <RadioGroupItem 
                    id={`option-${i}`} 
                    value={i.toString()} 
                    className="mr-2"
                    disabled={submitted}
                  />
                  {option}
                </Label>
              )
            })}
          </RadioGroup>

          <div className="mt-4 flex gap-2">
            {!submitted ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Antwort bestätigen
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion === questions.length - 1 ? "Ergebnisse anzeigen" : "Nächste Frage"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}