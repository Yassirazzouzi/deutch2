import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Brain, Globe, Users } from "lucide-react"

export default function HomePage() {
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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Testen Sie Ihr <span className="text-blue-600">Deutsch</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Entdecken Sie Ihr Deutschniveau mit unserem umfassenden Sprachtest und erweitern Sie Ihren Wortschatz mit
            unserem integrierten Wörterbuch.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/test">
                <Button size="lg" className="w-full sm:w-auto">
                  Test starten
                </Button>
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/dictionary">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Wörterbuch öffnen
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="text-center">
                <Brain className="h-12 w-12 text-blue-600 mx-auto" />
                <CardTitle>Sprachniveau-Test</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Bestimmen Sie Ihr Deutschniveau von A1 bis C2 mit unserem präzisen Test.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-green-600 mx-auto" />
                <CardTitle>Wörterbuch</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Schlagen Sie deutsche Wörter nach und erhalten Sie detaillierte Definitionen.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto" />
                <CardTitle>Personalisiert</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Erhalten Sie personalisierte Empfehlungen basierend auf Ihren Ergebnissen.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Globe className="h-12 w-12 text-orange-600 mx-auto" />
                <CardTitle>Kostenlos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Alle unsere Tools sind völlig kostenlos und ohne Registrierung nutzbar.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Bereit, Ihr Deutsch zu testen?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Beginnen Sie jetzt mit unserem kostenlosen Deutschtest und entdecken Sie Ihr wahres Sprachniveau.
            </p>
            <div className="mt-8">
              <Link href="/test">
                <Button size="lg" className="px-8 py-3">
                  Jetzt Test beginnen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
