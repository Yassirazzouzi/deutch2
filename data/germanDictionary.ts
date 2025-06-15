// data/germanWords.ts

export const germanDictionary = {
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
        definition:
          "Wissen, Kenntnisse oder Fähigkeiten durch Studium, Erfahrung oder Unterricht erwerben",
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
        definition:
          "Eine Person, mit der man eine freundschaftliche, vertrauensvolle Beziehung hat",
        example: "Er ist mein bester Freund seit der Schulzeit.",
        synonyms: ["Kumpel", "Kamerad", "Buddy", "Gefährte"],
        antonyms: ["Feind", "Gegner", "Widersacher"],
      },
    ],
    etymology: "Althochdeutsch 'friunt'",
    frequency: "common",
  },
};

export const popularGermanWords = Object.keys(germanDictionary);
