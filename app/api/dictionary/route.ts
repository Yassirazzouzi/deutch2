import { NextResponse } from 'next/server'

// Dictionary data locale
const germanDictionary = {
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
}

// Fonction pour rechercher avec Free Dictionary API
async function searchWithFreeDictionary(term: string) {
  try {
    // Essayer d'abord avec l'API Free Dictionary pour l'allemand
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/de/${term}`)
    
    if (!response.ok) {
      throw new Error('No results found')
    }
    
    const data = await response.json()
    const entry = data[0]
    
    const result = {
      word: entry.word,
      pronunciation: entry.phonetic || entry.phonetics?.[0]?.text || "",
      partOfSpeech: entry.meanings?.[0]?.partOfSpeech || "Unbekannt",
      definitions: entry.meanings?.[0]?.definitions?.map((def: any) => ({
        definition: def.definition,
        example: def.example || "",
        synonyms: def.synonyms || [],
        antonyms: def.antonyms || [],
      })) || [],
      etymology: entry.origin || undefined,
      frequency: "rare",
      source: "free-dictionary",
      audio: entry.phonetics?.find((p: any) => p.audio)?.audio || undefined
    }

    return result
  } catch (error) {
    console.error('Free Dictionary API Error:', error)
    throw error
  }
}

// Fonction pour traduire avec MyMemory API (gratuite)
async function translateWithMyMemory(term: string) {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(term)}&langpair=de|en`
    )
    
    if (!response.ok) {
      throw new Error('Translation failed')
    }
    
    const data = await response.json()
    
    const result = {
      word: term,
      pronunciation: "",
      partOfSpeech: "Unbekannt",
      definitions: [
        {
          definition: `Deutsche Bedeutung: ${term}`,
          example: `Beispiel: "${term}" wird in deutschen Sätzen verwendet.`,
          synonyms: [],
          antonyms: [],
        },
        {
          definition: `Englische Übersetzung: ${data.responseData.translatedText}`,
          example: `English: "${data.responseData.translatedText}"`,
          synonyms: [],
          antonyms: [],
        }
      ],
      etymology: undefined,
      frequency: "rare",
      source: "mymemory-translation",
      translation: data.responseData.translatedText
    }

    return result
  } catch (error) {
    console.error('MyMemory API Error:', error)
    throw error
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get('q')
  const useExternal = searchParams.get('external') === 'true'

  if (!term) {
    return NextResponse.json({ error: 'Search term is required' }, { status: 400 })
  }

  // Recherche locale d'abord
  const localResults = Object.values(germanDictionary)
    .filter((entry) => entry.word.toLowerCase().includes(term.toLowerCase()))
    .map(entry => ({ ...entry, source: 'local' }))

  if (localResults.length > 0) {
    return NextResponse.json(localResults)
  }

  // Si pas de résultats locaux et external autorisé
  if (useExternal) {
    try {
      // Essayer d'abord Free Dictionary API
      const dictionaryResult = await searchWithFreeDictionary(term)
      return NextResponse.json([dictionaryResult])
    } catch (error) {
      try {
        // Si Free Dictionary échoue, essayer MyMemory pour la traduction
        const translationResult = await translateWithMyMemory(term)
        return NextResponse.json([translationResult])
      } catch (translationError) {
        return NextResponse.json({ error: 'No matching terms found' }, { status: 404 })
      }
    }
  }

  return NextResponse.json({ error: 'No matching terms found' }, { status: 404 })
}