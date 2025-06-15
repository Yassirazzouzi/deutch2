"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Globe,
  Loader2,
  Search,
  Shield,
  Volume2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { germanDictionary, popularGermanWords } from "@/data/germanDictionary";

const DictionaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const playPronunciation = (text, audioUrl) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      speechSynthesis.speak(utterance);
    }
  };

  const handleSearch = async () => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    if (!trimmedTerm) return;

    setIsSearching(true);
    setError("");
    setSearchResults([]);

    // Recherche locale
    if (germanDictionary[trimmedTerm]) {
      setSearchResults([germanDictionary[trimmedTerm]]);
      setIsSearching(false);
      return;
    }

    try {
      const response = await fetch(`/api/dictionary?q=${encodeURIComponent(trimmedTerm)}&external=true`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      setSearchResults(data);
    } catch (err) {
      setError(`Keine Ergebnisse für "${searchTerm}" gefunden.`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const searchPopularWord = (word) => {
    setSearchTerm(word);
    setTimeout(() => handleSearch(), 100);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <ArrowLeft className="h-4 w-4 mr-2" /> Zurück zur Startseite
          </Link>
        </div>

        <div className="text-center mb-20">
          <div className="w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-8">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Professionelles Wörterbuch
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kuratierte Sammlung deutscher Begriffe mit wissenschaftlich validierten Definitionen,
            Ausspracheführung und kontextuellen Beispielen. Powered by Lingvanex AI.
          </p>
        </div>

        <Card className="mb-16 border border-gray-200 shadow-xl bg-white">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-3xl font-bold text-gray-900">Erweiterte Lexikon-Suche</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Professionelle Wortanalyse mit linguistischen Details und Verwendungskontext via Lingvanex API
            </CardDescription>
          </CardHeader>
          <CardContent className="p-12">
            <div className="flex gap-6 items-center">
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
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" /> Analysiere...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-3" /> Analysieren
                  </>
                )}
              </Button>

              {searchTerm && (
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={resetSearch}
                  title="Zurücksetzen"
                >
                  <XCircle className="h-6 w-6" />
                </Button>
              )}
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <Shield className="h-4 w-4 inline mr-2" />
              {Object.keys(germanDictionary).length} Begriffe lokal verfügbar • Erweitert durch Lingvanex AI
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert className="mb-12 border-red-200 bg-red-50">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800 text-lg">{error}</AlertDescription>
          </Alert>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-8">
            {searchResults.map((entry, index) => (
              <Card key={index} className="border border-gray-200 shadow-lg bg-white">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <CardTitle className="text-4xl font-bold text-gray-900">{entry.word}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playPronunciation(entry.word, entry.audio)}
                        className="text-gray-500 hover:text-gray-700 p-3"
                        title="Aussprache anhören"
                      >
                        <Volume2 className="h-6 w-6" />
                      </Button>
                      {entry.source === "lingvanex" && (
                        <span className="ml-2 text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                          Externe Quelle
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-xl text-gray-600 font-mono bg-white px-4 py-2 rounded-lg border border-gray-200 block mb-2">
                        {entry.pronunciation}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entry.frequency === "common"
                          ? "bg-green-100 text-green-800"
                          : entry.frequency === "uncommon"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
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
                    {entry.definitions.map((definition, idx) => (
                      <div key={idx} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                        <p className="text-gray-900 font-medium mb-4 text-lg leading-relaxed">
                          <span className="text-gray-500 font-normal mr-3">{idx + 1}.</span>
                          {definition.definition}
                        </p>
                        {definition.example && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-900 italic text-lg">
                              <strong className="text-blue-800">Beispiel:</strong> "{definition.example}"
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    {entry.etymology && (
                      <div className="pt-8 border-t border-gray-200">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">Etymologie:</h4>
                        <p className="text-gray-600 italic">{entry.etymology}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
      </div>
    </div>
  );
};

export default DictionaryPage;
