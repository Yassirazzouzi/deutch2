"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, ArrowLeft, ShoppingCart, Star, BookOpen, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Book {
  id: number
  title: string
  author: string
  level: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  description: string
  category: string
  image: string
  bestseller?: boolean
  new?: boolean
}

const books: Book[] = [
  {
    id: 1,
    title: "Deutsche Grammatik für Fortgeschrittene",
    author: "Prof. Dr. Hans Müller",
    level: "B2-C1",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 324,
    description: "Umfassendes Grammatikbuch für fortgeschrittene Deutschlerner mit praktischen Übungen und Beispielen.",
    category: "Grammatik",
    image: "/placeholder.svg?height=300&width=200",
    bestseller: true,
  },
  {
    id: 2,
    title: "Business Deutsch: Kommunikation im Beruf",
    author: "Dr. Maria Schmidt",
    level: "B1-B2",
    price: 34.99,
    rating: 4.9,
    reviews: 156,
    description: "Speziell für Geschäftskommunikation entwickelt. Ideal für internationale Fachkräfte.",
    category: "Business",
    image: "/placeholder.svg?height=300&width=200",
    new: true,
  },
  {
    id: 3,
    title: "Deutsche Literatur verstehen",
    author: "Prof. Klaus Weber",
    level: "C1-C2",
    price: 42.99,
    rating: 4.7,
    reviews: 89,
    description: "Einführung in die deutsche Literatur mit Textanalysen und kulturellem Kontext.",
    category: "Literatur",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 4,
    title: "Deutsch für Anfänger: Grundlagen",
    author: "Anna Hoffmann",
    level: "A1-A2",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.6,
    reviews: 567,
    description: "Perfekter Einstieg in die deutsche Sprache mit strukturiertem Lernansatz.",
    category: "Grundlagen",
    image: "/placeholder.svg?height=300&width=200",
    bestseller: true,
  },
  {
    id: 5,
    title: "Deutsche Phonetik und Aussprache",
    author: "Dr. Thomas Bauer",
    level: "A2-B2",
    price: 27.99,
    rating: 4.5,
    reviews: 203,
    description: "Systematisches Training der deutschen Aussprache mit Audio-Materialien.",
    category: "Phonetik",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 6,
    title: "Wissenschaftliches Schreiben auf Deutsch",
    author: "Prof. Dr. Lisa Wagner",
    level: "C1-C2",
    price: 38.99,
    rating: 4.8,
    reviews: 142,
    description: "Leitfaden für akademisches Schreiben und wissenschaftliche Arbeiten auf Deutsch.",
    category: "Akademisch",
    image: "/placeholder.svg?height=300&width=200",
    new: true,
  },
]

const categories = ["Alle", "Grammatik", "Business", "Literatur", "Grundlagen", "Phonetik", "Akademisch"]
const levels = ["Alle", "A1-A2", "A2-B2", "B1-B2", "B2-C1", "C1-C2"]

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle")
  const [selectedLevel, setSelectedLevel] = useState("Alle")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<number[]>([])

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "Alle" || book.category === selectedCategory
    const matchesLevel = selectedLevel === "Alle" || book.level === selectedLevel
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesLevel && matchesSearch
  })

  const addToCart = (bookId: number) => {
    setCart([...cart, bookId])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, bookId) => {
      const book = books.find((b) => b.id === bookId)
      return total + (book?.price || 0)
    }, 0)
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
                className="text-gray-900 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors border-b-2 border-gray-900"
              >
                Bücher
              </Link>
              <Link
                href="/translation"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Übersetzung
              </Link>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Warenkorb
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-gray-900 text-white">{cart.length}</Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
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
            <BookOpen className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">Professionelle Deutschbücher</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kuratierte Sammlung hochwertiger Deutschlernbücher von renommierten Autoren und Verlagen. Alle Bücher sind
            von Sprachexperten geprüft und für verschiedene Lernniveaus geeignet.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12 space-y-6">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Suche</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Titel oder Autor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("Alle")
                      setSelectedLevel("Alle")
                      setSearchTerm("")
                    }}
                    className="w-full"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter zurücksetzen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shopping Cart Summary */}
        {cart.length > 0 && (
          <Card className="mb-8 border-2 border-gray-900 bg-gray-50">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Warenkorb ({cart.length} {cart.length === 1 ? "Artikel" : "Artikel"})
                  </h3>
                  <p className="text-gray-600">Gesamtpreis: €{getTotalPrice().toFixed(2)}</p>
                </div>
                <Button className="bg-gray-900 hover:bg-gray-800">Zur Kasse</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white overflow-hidden"
            >
              <div className="relative">
                <img src={book.image || "/placeholder.svg"} alt={book.title} className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {book.bestseller && <Badge className="bg-yellow-500 text-yellow-900">Bestseller</Badge>}
                  {book.new && <Badge className="bg-green-500 text-green-900">Neu</Badge>}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white">
                    {book.level}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {book.category}
                  </Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {book.rating} ({book.reviews})
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{book.title}</CardTitle>
                <CardDescription className="text-gray-600">von {book.author}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{book.description}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">€{book.price.toFixed(2)}</span>
                    {book.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">€{book.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <Button
                    onClick={() => addToCart(book.id)}
                    disabled={cart.includes(book.id)}
                    className="bg-gray-900 hover:bg-gray-800"
                  >
                    {cart.includes(book.id) ? (
                      "Im Warenkorb"
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Kaufen
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-16 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Keine Bücher gefunden</h3>
              <p className="text-gray-600 mb-6">Versuchen Sie andere Suchkriterien oder Filter-Einstellungen.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("Alle")
                  setSelectedLevel("Alle")
                  setSearchTerm("")
                }}
              >
                Alle Bücher anzeigen
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Professional Info */}
        <div className="mt-20 p-12 bg-white rounded-lg border border-gray-200 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Warum unsere Bücher?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-gray-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expertenkuratiert</h4>
                <p className="text-gray-600">Alle Bücher werden von Sprachexperten und Pädagogen ausgewählt.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-gray-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Höchste Qualität</h4>
                <p className="text-gray-600">Nur Bücher von renommierten Verlagen und bewährten Autoren.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-gray-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Schnelle Lieferung</h4>
                <p className="text-gray-600">Kostenloser Versand ab €50 und Express-Lieferung verfügbar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
