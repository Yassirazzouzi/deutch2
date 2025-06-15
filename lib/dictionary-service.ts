// Service de dictionnaire avec données locales
export interface LocalDictionaryEntry {
  word: string
  pronunciation: string
  partOfSpeech: string
  definition: string
  example: string
  synonyms: string[]
  antonyms: string[]
}

export const localGermanDictionary: { [key: string]: LocalDictionaryEntry } = {
  hallo: {
    word: "Hallo",
    pronunciation: "/haˈloː/",
    partOfSpeech: "Interjektion",
    definition: "Grußformel zur Begrüßung",
    example: "Hallo, wie geht es dir?",
    synonyms: ["Hi", "Guten Tag", "Servus"],
    antonyms: ["Tschüss", "Auf Wiedersehen"],
  },
  haus: {
    word: "Haus",
    pronunciation: "/haʊs/",
    partOfSpeech: "Substantiv (n)",
    definition: "Ein Gebäude, das als Wohnung für Menschen dient",
    example: "Wir haben ein neues Haus gekauft.",
    synonyms: ["Wohnung", "Gebäude", "Heim"],
    antonyms: [],
  },
  lernen: {
    word: "lernen",
    pronunciation: "/ˈlɛʁnən/",
    partOfSpeech: "Verb",
    definition: "Wissen oder Fähigkeiten durch Studium erwerben",
    example: "Ich lerne Deutsch seit zwei Jahren.",
    synonyms: ["studieren", "sich aneignen", "erwerben"],
    antonyms: ["vergessen", "verlernen"],
  },
  schön: {
    word: "schön",
    pronunciation: "/ʃøːn/",
    partOfSpeech: "Adjektiv",
    definition: "Ästhetisch ansprechend, von angenehmer Erscheinung",
    example: "Das ist ein schönes Bild.",
    synonyms: ["hübsch", "attraktiv", "ansprechend"],
    antonyms: ["hässlich", "unansehnlich"],
  },
  freund: {
    word: "Freund",
    pronunciation: "/fʁɔʏnt/",
    partOfSpeech: "Substantiv (m)",
    definition: "Eine Person, mit der man eine freundschaftliche Beziehung hat",
    example: "Er ist mein bester Freund.",
    synonyms: ["Kumpel", "Kamerad", "Buddy"],
    antonyms: ["Feind", "Gegner"],
  },
  arbeiten: {
    word: "arbeiten",
    pronunciation: "/ˈaʁbaɪtən/",
    partOfSpeech: "Verb",
    definition: "Eine berufliche oder sonstige Tätigkeit ausüben",
    example: "Ich arbeite in einem Büro.",
    synonyms: ["tätig sein", "schaffen", "wirken"],
    antonyms: ["ruhen", "faulenzen", "pausieren"],
  },
  zeit: {
    word: "Zeit",
    pronunciation: "/t͡saɪt/",
    partOfSpeech: "Substantiv (f)",
    definition: "Der kontinuierliche Ablauf von Vergangenheit, Gegenwart und Zukunft",
    example: "Wir haben keine Zeit zu verlieren.",
    synonyms: ["Zeitspanne", "Periode", "Dauer"],
    antonyms: ["Ewigkeit", "Zeitlosigkeit"],
  },
  leben: {
    word: "Leben",
    pronunciation: "/ˈleːbən/",
    partOfSpeech: "Substantiv (n)",
    definition: "Die Existenz von Lebewesen; die Zeit zwischen Geburt und Tod",
    example: "Das Leben ist schön.",
    synonyms: ["Existenz", "Dasein", "Lebenszeit"],
    antonyms: ["Tod", "Sterben"],
  },
  wasser: {
    word: "Wasser",
    pronunciation: "/ˈvasɐ/",
    partOfSpeech: "Substantiv (n)",
    definition: "Klare, farblose Flüssigkeit, die für das Leben notwendig ist",
    example: "Ich trinke jeden Tag viel Wasser.",
    synonyms: ["H2O", "Flüssigkeit"],
    antonyms: ["Trockenheit", "Dürre"],
  },
  buch: {
    word: "Buch",
    pronunciation: "/buːx/",
    partOfSpeech: "Substantiv (n)",
    definition: "Zusammengeheftete oder gebundene Blätter mit Text oder Bildern",
    example: "Ich lese gerne ein gutes Buch.",
    synonyms: ["Werk", "Band", "Publikation"],
    antonyms: [],
  },
  sprechen: {
    word: "sprechen",
    pronunciation: "/ˈʃpʁɛçən/",
    partOfSpeech: "Verb",
    definition: "Mittels der Stimme Wörter und Sätze artikulieren",
    example: "Können Sie Deutsch sprechen?",
    synonyms: ["reden", "sich unterhalten", "kommunizieren"],
    antonyms: ["schweigen", "stumm sein"],
  },
}

export function getLocalDefinition(word: string): LocalDictionaryEntry | null {
  const normalizedWord = word.toLowerCase().trim()
  return localGermanDictionary[normalizedWord] || null
}

export function searchLocalDictionary(query: string): LocalDictionaryEntry[] {
  const normalizedQuery = query.toLowerCase().trim()
  const results: LocalDictionaryEntry[] = []

  for (const [key, entry] of Object.entries(localGermanDictionary)) {
    if (
      key.includes(normalizedQuery) ||
      entry.word.toLowerCase().includes(normalizedQuery) ||
      entry.definition.toLowerCase().includes(normalizedQuery)
    ) {
      results.push(entry)
    }
  }

  return results
}
