/* =====================================================================
   Rap-Stile: 8 Schreib-Archetypen für die Text-Werkstatt des Reimfinders
   Quelle und Begründung: rap-stilanalyse.md (Richtwerte, keine Korpus-Auszählung)
   Einbau: Objekt per id wählen, `prompt` an TW_SYSTEM anhängen, `app` setzt die Regler.
   ===================================================================== */
const RAP_STILE = [
  {
    id: "A1", name: "Cineastischer Street-Narrator",
    vertreter: ["Nas", "The Notorious B.I.G.", "Ghostface Killah", "Bushido", "Sido", "Haftbefehl"],
    epochen: ["E1", "E7", "E8"],
    regeln: { silbenProTakt: [10, 14], reimsilben: [2, 3], reimdichte: "hoch", binnenreimeProZeile: 0.5, enjambementMaxPro4: 1, schema: ["AABB", "AAAA"], perspektive: "Ich oder Kamerablick, Präsens" },
    struktur: ["Ort etablieren", "Figur", "Handlung", "Wendung", "Nachklang"],
    vokabular: { erwuenscht: ["konkrete Substantive", "Uhrzeiten", "Wetter", "Gerüche", "Licht", "Straßenslang dosiert"], meiden: ["abstrakte Moral", "Belehrung", "Fantasie-Elemente", "Abwertung von Gruppen"] },
    ton: ["ernst", "beobachtend", "melancholisch", "trocken-humorvoll"],
    app: { reimsilben: 2, flow: "normal", schema: "AABB", binnenreime: true, bpm: 90 },
    prompt: `STIL: Cineastischer Street-Narrator.
- Erzähle eine Szene wie ein Film: Jede Zeile enthält mindestens ein konkretes, sichtbares Detail (Ort, Gegenstand, Licht, Geräusch).
- Präsens, Ich-Perspektive oder Erzähler mit Kamerablick. Kein Fazit, keine Moral am Ende, das Bild spricht.
- Endreime auf 2–3 Silben, zusätzlich ein Binnenreim in jeder zweiten Zeile. Sätze dürfen über das Zeilenende laufen (höchstens einmal pro 4 Zeilen).
- Aufbau über die Zeilen: Ort → Figur → Handlung → Wendung → Nachklang.
- Straßensprache sparsam und glaubwürdig, keine Klischee-Häufung. Keine Abwertung von Gruppen.`
  },
  {
    id: "A2", name: "Reimakrobat (Battle-Technik)",
    vertreter: ["Big Pun", "Eminem", "Black Thought", "Kool Savas", "Kollegah", "Samy Deluxe", "Azad"],
    epochen: ["E1", "E3", "E7", "E8"],
    regeln: { silbenProTakt: [13, 18], reimsilben: [3, 4], reimdichte: "extrem", binnenreimeProZeile: 1.5, enjambementMaxPro4: 0, schema: ["AAAA"], punchlineJedeNteZeile: 2 },
    struktur: ["Ansage", "Steigerung", "Doppeldeutigkeit", "Höhepunkt in Zeile 4 und 8"],
    vokabular: { erwuenscht: ["Fremdwörter als Reimmaterial", "Vergleiche", "Zahlen", "Doppeldeutigkeiten"], meiden: ["Füllwörter", "Reimwort doppelt", "Beleidigung von Herkunft, Geschlecht, Körper, Sexualität"] },
    ton: ["überlegen", "arrogant", "ironisch", "angriffslustig"],
    app: { reimsilben: 4, flow: "double", schema: "AAAA", binnenreime: true, bpm: 90 },
    prompt: `STIL: Reimakrobat (Battle-Technik).
- Jede Zeile endet auf einen Mehrsilbenreim über die letzten 3–4 Silben; alle Vokale dieser Silben stimmen überein.
- Derselbe Vokalklang taucht zusätzlich 1–2 Mal innerhalb der Zeile auf (Binnenreim).
- Kettenreim: 4 Zeilen teilen denselben Reimklang, danach ein neuer.
- Jede zweite Zeile endet mit einer Punchline: Doppeldeutigkeit, überraschender Vergleich oder Übertreibung.
- Hohe Silbendichte, aber jedes Wort trägt Bedeutung. Keine Füllwörter, kein Reimwort doppelt.
- Angriffslustig und selbstbewusst, Angriffe zielen auf Können, nie auf Herkunft, Geschlecht, Körper oder Sexualität.`
  },
  {
    id: "A3", name: "Conscious-Analytiker",
    vertreter: ["2Pac", "Lauryn Hill", "Yasiin Bey", "Kendrick Lamar", "J. Cole", "Lupe Fiasco", "Dave", "Little Simz", "Torch", "Casper"],
    epochen: ["E1", "E3", "E6", "E7", "E8"],
    regeln: { silbenProTakt: [10, 14], reimsilben: [2, 3], reimdichte: "hoch", binnenreimeProZeile: 0.5, enjambementMaxPro4: 2, schema: ["AABB", "ABAB"], metapherMinZeilen: 2 },
    struktur: ["persönliche Beobachtung", "gesellschaftlicher Zusammenhang", "Widerspruch", "offene Frage oder Haltung"],
    vokabular: { erwuenscht: ["konkrete Erfahrung plus Begriff", "tragende Metapher", "Fakten in Maßen"], meiden: ["Parolen", "Predigtton", "Verschwörungserzählungen", "Pauschalurteile über Gruppen"] },
    ton: ["nachdenklich", "ernst", "empathisch", "begründet wütend"],
    app: { reimsilben: 3, flow: "normal", schema: "ABAB", binnenreime: true, bpm: 88 },
    prompt: `STIL: Conscious-Analytiker.
- Starte bei einer persönlichen, konkreten Beobachtung und weite sie Zeile für Zeile zur gesellschaftlichen Frage.
- Eine tragende Metapher läuft über mindestens 2 Zeilen.
- Endreime auf 2–3 Silben; die Aussage hat Vorrang, kein Wort nur wegen des Reims.
- Sätze dürfen über Zeilenenden laufen. Höchstens eine rhetorische Frage pro 4 Zeilen.
- Keine Parolen, keine Predigt, keine Pauschalurteile über Gruppen. Ende offen oder mit klarer Haltung, nicht mit Belehrung.`
  },
  {
    id: "A4", name: "Boss / Hustler",
    vertreter: ["Jay-Z", "50 Cent", "Kanye West", "Nicki Minaj", "Snoop Dogg"],
    epochen: ["E1", "E4", "E5"],
    regeln: { silbenProTakt: [9, 13], reimsilben: [2, 2], reimdichte: "mittel", binnenreimeProZeile: 0.25, enjambementMaxPro4: 1, schema: ["AABB"], doppeldeutigkeitPro4: 1 },
    struktur: ["früher", "Aufstieg", "Statusbeweis", "Ansage an Konkurrenz"],
    vokabular: { erwuenscht: ["Geschäftsvokabular", "Statussymbole sparsam", "früher/heute-Vergleiche"], meiden: ["Markenlisten ohne Pointe", "Prahlen ohne Witz"] },
    ton: ["ruhig", "souverän", "kühl", "selbstironisch"],
    app: { reimsilben: 2, flow: "normal", schema: "AABB", binnenreime: false, bpm: 92 },
    prompt: `STIL: Boss / Hustler.
- Erzähle vom Aufstieg: früher → heute. Jeder Statusbeweis ist ein Bild, keine Markenliste.
- Ruhiger Ton, kurze Sätze, bewusste Pausen (lieber 9–11 Silben als 14).
- Endreime auf 2 Silben, dazu mindestens eine Doppeldeutigkeit pro 4 Zeilen (Geld- oder Geschäftsbegriff mit zweiter Bedeutung).
- Zeile 1 und 5 sind zitierfähige One-Liner.
- Überlegen, nicht laut. Selbstironie ist erlaubt, Herabwürdigung anderer Menschen nicht.`
  },
  {
    id: "A5", name: "Melodic-Trap-Atmosphäriker",
    vertreter: ["Future", "Young Thug", "Migos", "Travis Scott", "Drake", "Ufo361", "Luciano", "Trettmann"],
    epochen: ["E5", "E8"],
    regeln: { silbenProTakt: [6, 10], reimsilben: [1, 2], reimdichte: "niedrig", binnenreimeProZeile: 0, enjambementMaxPro4: 0, schema: ["MONO", "AABB"], adlibsMaxProZeile: 1, offeneVokaleAmEnde: true },
    struktur: ["Stimmung", "Wiederholung", "kleine Variation"],
    vokabular: { erwuenscht: ["kurze Wörter", "Anglizismen dosiert", "Nacht", "Licht", "Tempo", "Gefühl"], meiden: ["Schachtelsätze", "Fachwörter", "Konsonantenhäufung am Zeilenende"] },
    ton: ["melancholisch", "hedonistisch", "entrückt", "cool"],
    app: { reimsilben: 2, flow: "entspannt", schema: "MONO", binnenreime: false, bpm: 70, hinweis: "Trap 130–150 BPM im Halftime-Gefühl, daher 65–75 eintragen" },
    prompt: `STIL: Melodic Trap.
- Wenige, kurze Wörter pro Zeile (6–10 Silben). Zeilenenden auf offenen, singbaren Vokalen.
- Endreime auf 1–2 Silben; Monoreim über 4 Zeilen ist erwünscht, Wiederholung als Stilmittel erlaubt.
- Stimmung vor Handlung: Nacht, Licht, Tempo, Gefühl. Kein Erzählbogen nötig.
- Optional ein Ad-lib pro Zeile in Klammern am Ende, z. B. (yeah), (ey), höchstens 1 pro Zeile.
- Ton entrückt und melancholisch-cool. Keine verherrlichenden Drogendetails, wenn "jugendfrei" aktiv ist.`
  },
  {
    id: "A6", name: "Drill- und Grime-Frontmann",
    vertreter: ["Pop Smoke", "Headie One", "Skepta", "Dizzee Rascal"],
    epochen: ["E5", "E6"],
    regeln: { silbenProTakt: [8, 12], reimsilben: [2, 2], reimdichte: "mittel", binnenreimeProZeile: 0.25, enjambementMaxPro4: 0, schema: ["AABB", "MONO"], pauseAufZaehlzeit: 3, harteKonsonantenAmEnde: true },
    struktur: ["Ansage", "Ort/Crew", "Behauptung", "Abschluss mit Pause"],
    vokabular: { erwuenscht: ["Ortsnamen", "Crew-Bezug", "kurze Imperative", "Slang dosiert"], meiden: ["Gewaltanleitungen", "echte Personen", "Waffen-Details"] },
    ton: ["kalt", "dominant", "knapp"],
    app: { reimsilben: 2, flow: "normal", schema: "AABB", binnenreime: false, bpm: 71, hinweis: "Drill/Grime 140–145 BPM im Halftime-Gefühl, daher um 70 eintragen" },
    prompt: `STIL: Drill / Grime.
- Kurze, harte Sätze; Imperative erlaubt. 8–12 Silben, jede Zeile mit einer hörbaren Pause in der Mitte.
- Endreime auf 2 Silben, harte Konsonanten am Zeilenende (k, t, ck, tz).
- Ort und Crew verankern, Haltung statt Geschichte.
- Keine echten Personen, keine Gewaltanleitungen. Wenn "jugendfrei": Stärke durch Haltung und Erfolg ausdrücken, nicht durch Gewalt.`
  },
  {
    id: "A7", name: "Exzentrischer Wortkünstler",
    vertreter: ["MF DOOM", "André 3000", "Missy Elliott", "Lil Wayne", "Marteria"],
    epochen: ["E2", "E3", "E8"],
    regeln: { silbenProTakt: [10, 15], reimsilben: [2, 4], reimdichte: "hoch", binnenreimeProZeile: 1, enjambementMaxPro4: 2, schema: ["AABB", "frei"], neuschoepfungenPro4: 1, reimeUeberWortgrenzen: true },
    struktur: ["Bild", "überraschende Verknüpfung", "Absurdität", "Rückkehr zum Ausgangsbild"],
    vokabular: { erwuenscht: ["Alltagsgegenstände in absurden Rollen", "Essen", "Comics", "Tiere", "Kunstwörter"], meiden: ["Geld/Auto-Klischees ohne Brechung", "Pathos"] },
    ton: ["verspielt", "trocken-ironisch", "rätselhaft"],
    app: { reimsilben: 3, flow: "normal", schema: "AABB", binnenreime: true, bpm: 90 },
    prompt: `STIL: Exzentrischer Wortkünstler.
- Assoziativ: Jede Zeile springt von einem Bild zu einem überraschenden, aber klanglich verbundenen nächsten Bild.
- Reime über Wortgrenzen hinweg (z. B. ein Wort reimt auf zwei Wörter), Assonanz-Ketten über 2–4 Silben.
- Höchstens eine Wortneuschöpfung pro 4 Zeilen. Alltagsgegenstände in absurden Rollen.
- Trockener Humor, kein Pathos. Am Ende zum Ausgangsbild zurückkehren.`
  },
  {
    id: "A8", name: "Pop-Rap-Erzähler",
    vertreter: ["Die Fantastischen Vier", "Cro", "Peter Fox", "Apache 207"],
    epochen: ["E7", "E8"],
    regeln: { silbenProTakt: [8, 11], reimsilben: [2, 2], reimdichte: "mittel", binnenreimeProZeile: 0.25, enjambementMaxPro4: 1, schema: ["AABB"], hookJedeNteZeile: 4 },
    struktur: ["Alltagsszene", "Gefühl", "Wendung mit Augenzwinkern", "Hook-Zeile"],
    vokabular: { erwuenscht: ["Alltagssprache", "Sommer", "Stadt", "Freundschaft", "Liebe", "Nostalgie"], meiden: ["Kraftausdrücke", "komplexe Fremdwörter", "Gewalt"] },
    ton: ["warm", "positiv", "ironisch", "nostalgisch"],
    app: { reimsilben: 2, flow: "entspannt", schema: "AABB", binnenreime: false, bpm: 96 },
    prompt: `STIL: Pop-Rap-Erzähler.
- Einfache, klare Sprache und Alltagsbilder. 8–11 Silben pro Zeile, gut mitsingbar.
- Saubere Endreime auf 2 Silben, Paarreim (AABB).
- Warm und leicht ironisch: Gefühl zeigen, dann mit einem Augenzwinkern brechen.
- Jede vierte Zeile soll als Hook funktionieren (kurz, einprägsam, wiederholbar).
- Keine Kraftausdrücke, keine Gewalt.`
  }
];

/* Die 50 Künstler mit Epoche und Archetyp (Haupt, Neben) */
const RAP_KUENSTLER = [
  ["Nas", "US", "E1", "A1", "A3"], ["The Notorious B.I.G.", "US", "E1", "A1", "A4"], ["2Pac", "US", "E1", "A3", "A1"],
  ["Jay-Z", "US", "E1", "A4", "A1"], ["Ghostface Killah", "US", "E1", "A1", "A7"], ["Snoop Dogg", "US", "E1", "A4", "A8"],
  ["Big Pun", "US", "E1", "A2", "A1"], ["Lauryn Hill", "US", "E1", "A3", "A8"], ["André 3000", "US", "E2", "A7", "A3"],
  ["Bone Thugs-n-Harmony", "US", "E2", "A5", "A2"], ["Missy Elliott", "US", "E2", "A7", "A8"], ["Lil Wayne", "US", "E2", "A7", "A4"],
  ["Yasiin Bey", "US", "E3", "A3", "A7"], ["Black Thought", "US", "E3", "A2", "A3"], ["MF DOOM", "US", "E3", "A7", "A2"],
  ["Eminem", "US", "E3", "A2", "A1"], ["Lupe Fiasco", "US", "E3", "A3", "A2"], ["Kendrick Lamar", "US", "E3", "A3", "A1"],
  ["J. Cole", "US", "E3", "A3", "A1"], ["50 Cent", "US", "E4", "A4", "A1"], ["Kanye West", "US", "E4", "A4", "A3"],
  ["Drake", "CA", "E5", "A5", "A4"], ["Future", "US", "E5", "A5", "A4"], ["Young Thug", "US", "E5", "A5", "A7"],
  ["Migos", "US", "E5", "A5", "A4"], ["Travis Scott", "US", "E5", "A5", null], ["Nicki Minaj", "US", "E5", "A4", "A2"],
  ["Pop Smoke", "US", "E5", "A6", "A4"], ["Dizzee Rascal", "UK", "E6", "A6", "A7"], ["Skepta", "UK", "E6", "A6", "A4"],
  ["Dave", "UK", "E6", "A3", "A1"], ["Little Simz", "UK", "E6", "A3", "A2"], ["Headie One", "UK", "E6", "A6", "A5"],
  ["Torch", "DE", "E7", "A3", "A2"], ["Die Fantastischen Vier", "DE", "E7", "A8", "A7"], ["Samy Deluxe", "DE", "E7", "A2", "A3"],
  ["Kool Savas", "DE", "E7", "A2", "A4"], ["Azad", "DE", "E7", "A2", "A6"], ["Bushido", "DE", "E7", "A1", "A4"],
  ["Sido", "DE", "E7", "A1", "A8"], ["Kollegah", "DE", "E8", "A2", "A4"], ["Haftbefehl", "DE", "E8", "A1", "A6"],
  ["Casper", "DE", "E8", "A3", "A8"], ["Marteria", "DE", "E8", "A7", "A8"], ["Cro", "DE", "E8", "A8", "A5"],
  ["Peter Fox", "DE", "E8", "A8", "A7"], ["Trettmann", "DE", "E8", "A5", "A8"], ["Ufo361", "DE", "E8", "A5", "A4"],
  ["Luciano", "DE", "E8", "A5", "A6"], ["Apache 207", "DE", "E8", "A8", "A5"]
].map(([name, region, epoche, haupt, neben]) => ({ name, region, epoche, haupt, neben }));

if (typeof module !== "undefined") module.exports = { RAP_STILE, RAP_KUENSTLER };
