export const CIVIC_CATEGORIES = {
  public_lighting: {
    labels: { en:"Public lighting", it:"Illuminazione pubblica", es:"Alumbrado público", fr:"Éclairage public", de:"Öffentliche Beleuchtung" },
    recipients: { en:"Municipality – Public lighting office", it:"Comune – Ufficio illuminazione pubblica", es:"Ayuntamiento – Oficina de alumbrado público", fr:"Mairie – Service de l’éclairage public", de:"Stadtverwaltung – Straßenbeleuchtung" },
    examples: [
      "A public streetlight is broken or switched off.",
      "The street is dark because public lighting is not working.",
      "Un lampione pubblico è spento o guasto.",
      "La strada è buia perché l'illuminazione pubblica non funziona.",
      "Una farola pública está apagada o averiada.",
      "Un lampadaire public est en panne.",
      "Eine Straßenlaterne ist ausgefallen."
    ]
  },
  roads: {
    labels: { en:"Roads and maintenance", it:"Strade e manutenzione", es:"Calles y mantenimiento", fr:"Voirie et entretien", de:"Straßen und Instandhaltung" },
    recipients: { en:"Municipality – Roads office", it:"Comune – Ufficio strade", es:"Ayuntamiento – Oficina de vías", fr:"Mairie – Service de la voirie", de:"Stadtverwaltung – Straßenbauamt" },
    examples: [
      "There is a dangerous pothole in the road.",
      "The pavement or road surface is damaged.",
      "C'è una buca pericolosa sulla strada.",
      "L'asfalto è danneggiato.",
      "Hay un bache peligroso en la calle.",
      "La chaussée est endommagée.",
      "Auf der Straße befindet sich ein gefährliches Schlagloch."
    ]
  },
  waste: {
    labels: { en:"Waste and sanitation", it:"Rifiuti e igiene urbana", es:"Residuos y limpieza urbana", fr:"Déchets et propreté urbaine", de:"Abfall und Stadtreinigung" },
    recipients: { en:"Municipality – Waste office", it:"Comune – Ufficio rifiuti", es:"Ayuntamiento – Oficina de residuos", fr:"Mairie – Service des déchets", de:"Stadtverwaltung – Abfallwirtschaft" },
    examples: [
      "Waste has been abandoned in a public area.",
      "Rubbish has not been collected.",
      "Ci sono rifiuti abbandonati in uno spazio pubblico.",
      "La raccolta dei rifiuti non è stata effettuata.",
      "Hay basura abandonada en una zona pública.",
      "Des déchets ont été abandonnés dans un espace public.",
      "Im öffentlichen Raum wurde Müll abgeladen."
    ]
  },
  drains: {
    labels: { en:"Drains and road safety", it:"Tombini e sicurezza stradale", es:"Alcantarillado y seguridad vial", fr:"Regards et sécurité routière", de:"Entwässerung und Verkehrssicherheit" },
    recipients: { en:"Municipality – Public works office", it:"Comune – Ufficio lavori pubblici", es:"Ayuntamiento – Oficina de obras públicas", fr:"Mairie – Service des travaux publics", de:"Stadtverwaltung – Tiefbauamt" },
    examples: [
      "A manhole cover is open, broken or dangerous.",
      "A drain is blocked and creates a safety risk.",
      "Un tombino è aperto, rotto o pericoloso.",
      "Uno scarico stradale è ostruito.",
      "Una tapa de alcantarilla está abierta o rota.",
      "Une plaque d'égout est ouverte ou endommagée.",
      "Ein Kanaldeckel ist offen oder beschädigt."
    ]
  },
  green_spaces: {
    labels: { en:"Parks and green spaces", it:"Verde pubblico", es:"Parques y zonas verdes", fr:"Parcs et espaces verts", de:"Parks und Grünflächen" },
    recipients: { en:"Municipality – Parks office", it:"Comune – Ufficio verde pubblico", es:"Ayuntamiento – Oficina de parques", fr:"Mairie – Service des espaces verts", de:"Stadtverwaltung – Grünflächenamt" },
    examples: [
      "A tree or branch in a public park is dangerous.",
      "Public green space is damaged or not maintained.",
      "Un albero o un ramo in area pubblica è pericoloso.",
      "Il verde pubblico non viene mantenuto.",
      "Un árbol en una zona pública supone un peligro.",
      "Un arbre dans un espace public présente un danger.",
      "Ein Baum oder Ast im öffentlichen Raum ist gefährlich."
    ]
  },
  not_civic: {
    labels: { en:"Not a civic issue", it:"Non è una segnalazione civica", es:"No es un problema cívico", fr:"Ce n’est pas un problème civique", de:"Kein kommunales Anliegen" },
    recipients: { en:"", it:"", es:"", fr:"", de:"" },
    examples: [
      "This is a personal opinion or a private conversation.",
      "This text does not describe a public service or public-space problem.",
      "Questa è un'opinione personale o una conversazione privata.",
      "Il testo non descrive un problema relativo a un servizio o spazio pubblico.",
      "Este texto es una opinión personal.",
      "Ce texte exprime une opinion personnelle.",
      "Dieser Text ist eine persönliche Meinung."
    ]
  }
};
