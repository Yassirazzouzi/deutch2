import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Brain,
  Globe,
  CheckCircle,
  ArrowRight,
  Shield,
  Building,
  Languages,
  ShoppingCart,
} from "lucide-react"
import logo1 from "@/public/logo1.png"
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div>
                  <img src={logo1.src} alt="DeutschTest Logo"/>
                </div>
                <div>
                  
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
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Übersetzung
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 font-medium">
                Test beginnen
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 mb-8 shadow-sm">
              <Shield className="h-4 w-4 mr-2 text-gray-600" />
              Zertifiziert nach europäischen Standards • Über 50.000 Absolventen
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Professionelle
              <br />
              <span className="text-gray-600">Deutschbewertung</span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Ermitteln Sie Ihr exaktes Deutschniveau mit unserem wissenschaftlich validierten Assessment. Entwickelt in
              Zusammenarbeit mit führenden Sprachinstituten und anerkannt von Bildungseinrichtungen europaweit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/test">
                <Button
                  size="lg"
                  className="bg-gray-600 hover:bg-gray-800 text-white px-10 py-4 text-lg font-medium shadow-lg"
                >
                  Assessment starten
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dictionary">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 hover:border-gray-400 px-10 py-4 text-lg font-medium"
                >
                  Ressourcen erkunden
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm text-gray-600 font-medium">ISO 9001 zertifiziert</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm text-gray-600 font-medium">CEFR-konform</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-sm text-gray-600 font-medium">Datenschutz-zertifiziert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              Warum führende Institutionen uns vertrauen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Unsere Bewertungsplattform wird von Universitäten, Unternehmen und Bildungseinrichtungen in ganz Europa
              für präzise Sprachstandsermittlung eingesetzt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Wissenschaftlich validiert</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Entwickelt mit Linguisten und Sprachforschern führender europäischer Universitäten.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Umfassende Ressourcen</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Zugang zu einer kuratierten Datenbank mit über 100.000 deutschen Begriffen und Phrasen.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Fachbücher</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Kuratierte Sammlung professioneller Deutschlernbücher für alle Niveaustufen.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Languages className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Übersetzungs-service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Professionelle Übersetzungen mit KI-gestützter Technologie und menschlicher Qualitätskontrolle.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Enterprise-Sicherheit</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Höchste Sicherheitsstandards mit Ende-zu-Ende-Verschlüsselung und DSGVO-Konformität.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 " style={{ backgroundColor: '#254D70' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Vertrauen durch Zahlen</h2>
            <p className="text-gray-300 text-lg">Unsere Plattform im Überblick</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-gray-300 font-medium">Zertifizierte Absolventen</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-gray-300 font-medium">Partner-Institutionen</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100,000+</div>
              <div className="text-gray-300 font-medium">Wörterbuch-Einträge</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.2%</div>
              <div className="text-gray-300 font-medium">Bewertungsgenauigkeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-600 mb-4">Was unsere Partner sagen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-gray-600 mr-2" />
                  <span className="font-semibold text-gray-900">Universität München</span>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Die präziseste Deutschbewertung, die wir je verwendet haben. Unsere internationalen Studenten
                  erhalten verlässliche Einstufungen."
                </p>
                <div className="text-sm text-gray-500">Dr. Maria Schmidt, Sprachzentrum</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-gray-600 mr-2" />
                  <span className="font-semibold text-gray-900">Siemens AG</span>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Für unsere internationalen Mitarbeiter ist DeutschTest der Goldstandard. Zuverlässig und
                  professionell."
                </p>
                <div className="text-sm text-gray-500">Thomas Weber, HR Director</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-gray-600 mr-2" />
                  <span className="font-semibold text-gray-900">Goethe-Institut</span>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Eine hervorragende Ergänzung zu unseren Bewertungsverfahren. Wissenschaftlich fundiert und
                  benutzerfreundlich."
                </p>
                <div className="text-sm text-gray-500">Prof. Dr. Klaus Müller, Direktor</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 " style={{ backgroundColor: '#254D70' , marginBottom: '50px'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border border-white-200 shadow-white-xl bg-white">
            <CardContent className="p-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                Bereit für Ihre professionelle Deutschbewertung?
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Starten Sie Ihr wissenschaftlich validiertes Assessment und erhalten Sie ein anerkanntes Zertifikat
                Ihres Deutschniveaus in nur 15 Minuten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/test">
                  <Button
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 text-lg font-medium shadow-lg"
                  >
                    Assessment beginnen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dictionary">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 hover:border-gray-400 px-12 py-4 text-lg font-medium"
                  >
                    Ressourcen ansehen
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Keine Registrierung erforderlich • Sofortige Ergebnisse • Kostenlos
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-600 mb-4">"Lernen ist wie Rudern gegen den Strom. Hört man damit auf, treibt man zurück."
            </h2>
          </div>
          
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center">
                  <Globe className="h-7 w-7 text-gray-900" />
                </div>
                <div>
                  <span className="text-2xl font-bold tracking-tight">DeutschTest</span>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Professional Institute</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Führende Plattform für professionelle Deutschbewertung. Vertraut von Universitäten und Unternehmen
                europaweit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/test" className="hover:text-white transition-colors">
                    Sprachtest
                  </Link>
                </li>
                <li>
                  <Link href="/dictionary" className="hover:text-white transition-colors">
                    Wörterbuch
                  </Link>
                </li>
                <li>
                  <Link href="/books" className="hover:text-white transition-colors">
                    Bücher
                  </Link>
                </li>
                <li>
                  <Link href="/translation" className="hover:text-white transition-colors">
                    Übersetzung
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Unternehmen</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Über uns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kontakt
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Datenschutz
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 DeutschTest Professional Institute. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">ISO 9001:2015 zertifiziert</span>
              <span className="text-gray-400 text-sm">El Azzouzi Yassir</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
