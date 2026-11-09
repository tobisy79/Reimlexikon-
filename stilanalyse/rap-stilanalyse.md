# Rap-Stilanalyse: 50 Künstler, 8 Schreib-Archetypen

Systematik zur Ableitung wiederholbarer Schreibmuster für die KI-gestützte Text-Werkstatt.
Begleitdatei für die App: `rap-stile.js` (dieselben 8 Archetypen als Datenobjekte).

## 0. Methode und Grenzen

| Punkt | Festlegung |
|---|---|
| Grundlage | Stilkundliche Einordnung aus veröffentlichten Werken, Interviews und der Hip-Hop-Forschung (u. a. Adam Bradley, *Book of Rhymes*; Martin Connor, *The Musical Artistry of Rap*; Kyle Adams und Mitchell Ohriner zu Flow und Metrik). Keine eigene Korpus-Auszählung in dieser Sitzung. |
| Zahlen | Silben pro Takt, Reimdichte usw. sind **Richtwerte** (typischer Bereich im Kernwerk, bezogen auf einen 4/4-Takt). Einzelne Songs weichen ab. Für harte Zahlen müsste man ein Textkorpus mit Taktmarkierung auszählen (siehe Abschnitt 5). |
| Texte | Es werden **keine Songtexte zitiert**. Die Regeln beschreiben Technik, Struktur und Haltung, nicht Formulierungen. Für die App gilt dasselbe: Die KI soll im Stil schreiben, nie Zeilen echter Songs nachbauen. |
| Sprache | Alle Prompt-Snippets erzeugen **deutsche** Texte. US- und UK-Stile werden auf Deutsch übertragen (Technik und Haltung, nicht englische Slangwörter). |
| Begriffe | **Multi** = Mehrsilbenreim (2+ Silben, Vokale stimmen silbenweise überein). **Kettenreim** = derselbe Reimklang über 3+ Zeilen. **Binnenreim** = Reim innerhalb der Zeile. **Pocket** = Lage der Silben im Beat. **Triolen-Flow** = 3 Silben pro Schlag. |

---

## 1. Phase 1: Auswahl und Epochen

Auswahlkriterien: stilprägend (wird nachgeahmt), technisch oder thematisch eigenständig, Breite über Regionen (US Ost/West/Süd, UK, Deutschland) und Epochen 1990 bis heute. Vier Künstlerinnen sind enthalten. Bewusst knapp: Viele weitere (z. B. Rakim, Ice Cube, Busta Rhymes, Kid Cudi, Shirin David, RAF Camora) wären vertretbar.

### 1.1 Epochen

| ID | Epoche / Schublade | Zeitraum | Kern-Merkmal |
|---|---|---|---|
| E1 | Golden Era US (East/West) | 1991–2000 | Sampling-Beats um 85–100 BPM, Erzählung, Lokalkolorit, Multis werden Standard |
| E2 | South & Alternative US | 1994–2010 | Melodische und rhythmische Experimente, Triolen, Dialekt |
| E3 | Lyrical / Conscious / Abstract | 1998–heute | Dichte, Konzeptalben, Metaphern-Ketten, Gesellschaftskritik |
| E4 | 2000er Mainstream & Street | 2000–2012 | Hook-Fokus, Unternehmer-Persona, klare Strukturen |
| E5 | Trap / Melodic / Drill US | 2010–heute | Hi-Hat-Rolls, Triolen (Migos-Flow), Autotune, Ad-libs, Stimmung vor Inhalt |
| E6 | UK (Grime, Rap, Drill) | 2003–heute | 140 BPM Grime, britischer Slang, Storytelling (Dave), Drill-Sliding-Bass |
| E7 | Deutschrap Pioniere & 2000er | 1991–2008 | Erste deutsche Formen, Battle-Technik, Aggro-Berlin-Straßenrap |
| E8 | Moderner Deutschrap | 2009–heute | Pop-Rap, Cloud, Melodic Street, Boss-Rap, Afro-Trap- und Drill-Einflüsse |

### 1.2 Die 50 Künstler

Archetyp-IDs siehe Phase 3 (A1–A8). Erste Spalte = Hauptarchetyp, zweite = Nebenarchetyp.

| # | Künstler | Region | Epoche | Haupt | Neben |
|---|---|---|---|---|---|
| 1 | Nas | US Ost (Queens) | E1 | A1 | A3 |
| 2 | The Notorious B.I.G. | US Ost (Brooklyn) | E1 | A1 | A4 |
| 3 | 2Pac | US West/Ost | E1 | A3 | A1 |
| 4 | Jay-Z | US Ost (Brooklyn) | E1/E4 | A4 | A1 |
| 5 | Ghostface Killah | US Ost (Staten Island) | E1 | A1 | A7 |
| 6 | Snoop Dogg | US West (Long Beach) | E1 | A4 | A8 |
| 7 | Big Pun | US Ost (Bronx) | E1 | A2 | A1 |
| 8 | Lauryn Hill | US Ost (New Jersey) | E1 | A3 | A8 |
| 9 | André 3000 (OutKast) | US Süd (Atlanta) | E2 | A7 | A3 |
| 10 | Bone Thugs-n-Harmony | US Mittlerer Westen (Cleveland) | E2 | A5 | A2 |
| 11 | Missy Elliott | US Ost/Süd (Virginia) | E2 | A7 | A8 |
| 12 | Lil Wayne | US Süd (New Orleans) | E2 | A7 | A4 |
| 13 | Yasiin Bey (Mos Def) | US Ost (Brooklyn) | E3 | A3 | A7 |
| 14 | Black Thought (The Roots) | US Ost (Philadelphia) | E3 | A2 | A3 |
| 15 | MF DOOM | US Ost (Long Island) | E3 | A7 | A2 |
| 16 | Eminem | US Mittlerer Westen (Detroit) | E3 | A2 | A1 |
| 17 | Lupe Fiasco | US Mittlerer Westen (Chicago) | E3 | A3 | A2 |
| 18 | Kendrick Lamar | US West (Compton) | E3 | A3 | A1 |
| 19 | J. Cole | US Süd (Fayetteville) | E3 | A3 | A1 |
| 20 | 50 Cent | US Ost (Queens) | E4 | A4 | A1 |
| 21 | Kanye West | US Mittlerer Westen (Chicago) | E4 | A4 | A3 |
| 22 | Drake | Kanada (Toronto) | E5 | A5 | A4 |
| 23 | Future | US Süd (Atlanta) | E5 | A5 | A4 |
| 24 | Young Thug | US Süd (Atlanta) | E5 | A5 | A7 |
| 25 | Migos | US Süd (Atlanta) | E5 | A5 | A4 |
| 26 | Travis Scott | US Süd (Houston) | E5 | A5 | – |
| 27 | Nicki Minaj | US Ost (Queens) | E5 | A4 | A2 |
| 28 | Pop Smoke | US Ost (Brooklyn) | E5 | A6 | A4 |
| 29 | Dizzee Rascal | UK (London) | E6 | A6 | A7 |
| 30 | Skepta | UK (London) | E6 | A6 | A4 |
| 31 | Dave | UK (London) | E6 | A3 | A1 |
| 32 | Little Simz | UK (London) | E6 | A3 | A2 |
| 33 | Headie One | UK (London) | E6 | A6 | A5 |
| 34 | Torch (Advanced Chemistry) | DE (Heidelberg) | E7 | A3 | A2 |
| 35 | Die Fantastischen Vier | DE (Stuttgart) | E7 | A8 | A7 |
| 36 | Samy Deluxe | DE (Hamburg) | E7 | A2 | A3 |
| 37 | Kool Savas | DE (Berlin) | E7 | A2 | A4 |
| 38 | Azad | DE (Frankfurt) | E7 | A2 | A6 |
| 39 | Bushido | DE (Berlin) | E7 | A1 | A4 |
| 40 | Sido | DE (Berlin) | E7 | A1 | A8 |
| 41 | Kollegah | DE (Düsseldorf) | E8 | A2 | A4 |
| 42 | Haftbefehl | DE (Offenbach) | E8 | A1 | A6 |
| 43 | Casper | DE (Bielefeld) | E8 | A3 | A8 |
| 44 | Marteria (inkl. Marsimoto) | DE (Rostock) | E8 | A7 | A8 |
| 45 | Cro | DE (Stuttgart) | E8 | A8 | A5 |
| 46 | Peter Fox | DE (Berlin) | E8 | A8 | A7 |
| 47 | Trettmann | DE (Chemnitz/Leipzig) | E8 | A5 | A8 |
| 48 | Ufo361 | DE (Berlin) | E8 | A5 | A4 |
| 49 | Luciano | DE (Berlin) | E8 | A5 | A6 |
| 50 | Apache 207 | DE (Ludwigshafen) | E8 | A8 | A5 |

---

## 2. Phase 2: Einzelanalyse nach vier Dimensionen

Legende Reimdichte: **niedrig** = Endreim, meist 1 Silbe; **mittel** = Endreim plus gelegentliche Binnenreime, 2 Silben; **hoch** = Multis über 2–4 Silben, Binnenreime in den meisten Zeilen; **extrem** = Reimketten über ganze Zeilen und mehrere Takte.
Silben/Takt = typischer Bereich bei Strophen im Kernwerk.

### 2.1 Golden Era US (E1)

| # | Künstler | 1 Reimtechnik | 2 Flow & Metrik | 3 Sprache | 4 Persona & Ton |
|---|---|---|---|---|---|
| 1 | Nas | hoch; Multis 2–3 Silben, Binnenreime, häufige Enjambements über die Taktgrenze | 11–15 Silben/Takt; fließend, Sätze laufen über Taktgrenzen, wenige Pausen | sehr bildhaft, kamerahafte Details (Straßenecke, Gegenstände, Namen), Straßenslang plus gehobene Wörter | Beobachter und Chronist; nachdenklich, ernst, gelegentlich prophetisch |
| 2 | The Notorious B.I.G. | hoch; Multis, Binnenreime auf denselben Vokal, Reime oft hinter der Taktmitte versteckt | 10–14; sehr entspannt in der Pocket, Pausen als Stilmittel, Silben gegen den Beat verschoben | Alltagsdetails, Markennamen, Dialoge mit verstellter Stimme, trockener Witz | charismatischer Erzähler zwischen Hustler und Humorist; souverän, düster-komisch |
| 3 | 2Pac | mittel; meist Endreim 1–2 Silben, Reim folgt der Aussage | 9–13; drängend, emotional getrieben, deutliche Betonungen | direkt, appellativ, wenig verschlüsselt, Anreden ans Publikum | Rebell und Anwalt der Straße; zornig, verletzlich, politisch, auch zärtlich (Mutter, Schwester) |
| 4 | Jay-Z | hoch, aber unauffällig; Doppeldeutigkeiten, Reime oft im Zeilenkern | 10–14; ruhig, gesprächsnah, wechselnde Dichte, gelegentliche Doubletime-Passagen | Geschäfts- und Statusvokabular, Wortspiele mit Doppelbedeutung, Understatement | Unternehmer, der es geschafft hat; kühl, überlegen, selbstironisch |
| 5 | Ghostface Killah | hoch; assoziative Reimketten, Klang vor Logik | 12–16; hektisch, atemlos, Stakkato-Blöcke | hyperdetailliert (Kleidung, Essen, Gegenstände), surreale Bildsprünge, Codewörter | emotionaler Straßen-Erzähler; laut, überdreht, plötzlich verletzlich |
| 6 | Snoop Dogg | niedrig–mittel; Endreime, Wiederholungen, Hook-Denken | 8–11; gedehnt, lässig, singende Betonung, viel Luft | Westcoast-Slang, Wortverlängerungen, Lautmalerei | entspannter Player; cool, ironisch, hedonistisch |
| 7 | Big Pun | extrem; lange Multis, Assonanz-Ketten über ganze Strophen | 14–20; Doubletime, kaum Atempausen, hohe Präzision | technisch, verspielt, Fremdwörter als Reimmaterial | technischer Champion; prahlerisch, humorvoll, kampfeslustig |
| 8 | Lauryn Hill | hoch; Multis, Binnenreime, Wechsel zwischen Rap und Gesang | 10–14; melodisch, rhythmisch flexibel, Gospel- und Reggae-Einflüsse | gebildet, spirituell, biblische und literarische Bezüge | moralische Instanz; selbstbewusst, kritisch, warm |

### 2.2 South & Alternative US (E2)

| # | Künstler | 1 Reimtechnik | 2 Flow & Metrik | 3 Sprache | 4 Persona & Ton |
|---|---|---|---|---|---|
| 9 | André 3000 | hoch; überraschende Multis, Binnenreime, freie Zeilenlängen | 10–18; ständige Tempowechsel, Triolen, sprunghafte Phrasierung | erfinderisch, absurd, poetisch, Südstaaten-Dialekt | Exzentriker und Philosoph; verspielt, nachdenklich |
| 10 | Bone Thugs-n-Harmony | mittel–hoch; Reime zweitrangig gegenüber Melodie | 14–18; schnelle gesungene Triolen-Flows, mehrstimmig | einfache Wörter, Wiederholung, Mantra-Charakter | Gruppe als Chor; düster, spirituell, melancholisch |
| 11 | Missy Elliott | mittel; Reim als Rhythmusinstrument, Lautmalerei | 8–14; verspielt, Pausen, Sprachfetzen, rückwärts gesprochene Passagen | Kunstwörter, Geräusche, Tanzanweisungen | Entertainerin und Visionärin; frech, humorvoll, selbstbewusst |
| 12 | Lil Wayne | mittel–hoch; Punchlines mit Wortspiel, Reime auf demselben Wort | 9–14; schläfrig-gedehnt bis abgehackt, Freestyle-Charakter | absurde Vergleiche, Doppeldeutigkeiten, Slang aus New Orleans | exzentrischer Star; großspurig, witzig, unberechenbar |

### 2.3 Lyrical / Conscious / Abstract (E3)

| # | Künstler | 1 Reimtechnik | 2 Flow & Metrik | 3 Sprache | 4 Persona & Ton |
|---|---|---|---|---|---|
| 13 | Yasiin Bey (Mos Def) | hoch; Multis, Klangspiele, Alliterationen | 10–14; jazzig, locker, Sprechgesang mit Gesang | gebildet, gesellschaftlich, Bezüge zu Kultur und Geschichte | Intellektueller mit Wärme; reflektiert, humanistisch |
| 14 | Black Thought | extrem; dichte Multis, Binnenreime in fast jeder Zeile | 13–18; konstant, präzise, kann sehr lange Passagen ohne Pause | breiter Wortschatz, Anspielungen auf Geschichte, Sport, Literatur | Meister-Handwerker; kontrolliert, souverän, ernst |
| 15 | MF DOOM | extrem; Reime auf jede zweite Silbe, Assonanz-Ketten, Reime über Wortgrenzen | 11–15; scheinbar beiläufig, Satzgrenzen ignorieren Taktgrenzen | Wortspiele, Zitate aus Comics, Essen, Popkultur, absurde Logik | maskierter Schurke; trocken, ironisch, rätselhaft |
| 16 | Eminem | extrem; lange Multis, Reime innerhalb der Wörter, Reimvokale über Takte gehalten | 12–22; Doubletime bis Triple-Time, abrupte Tempowechsel, präzise Betonungen | provokant, Wortspiele, Alter Egos, Popkultur, Selbstzerlegung | Wütender Außenseiter; aggressiv, schwarzhumorig, verletzlich |
| 17 | Lupe Fiasco | extrem; mehrschichtige Wortspiele, Konzept-Reime | 11–16; ruhig, dicht, lange Sätze | Konzepte, Allegorien, Wissenschaft, Politik | Denker und Kritiker; analytisch, ironisch |
| 18 | Kendrick Lamar | hoch; Multis, Binnenreime, Reim folgt der Figur | 8–18; wechselt Stimme, Tempo und Flow je Figur, auch innerhalb eines Verses | filmische Szenen, Figurenrede, Compton-Slang neben Literatur | Erzähler mit vielen Stimmen; zerrissen, analytisch, wütend, spirituell |
| 19 | J. Cole | hoch; klare Multis, Punchlines am Zeilenende | 10–14; gesprächsnah, gleichmäßig, gut verständlich | direkte Alltagssprache, Storytelling, Selbstreflexion | ehrlicher Bruder; nachdenklich, bodenständig |

### 2.4 2000er Mainstream & Street (E4)

| # | Künstler | 1 Reimtechnik | 2 Flow & Metrik | 3 Sprache | 4 Persona & Ton |
|---|---|---|---|---|---|
| 20 | 50 Cent | niedrig–mittel; einfache Endreime, Hook-Fokus | 8–11; nuschelnd-melodisch, entspannt, Wiederholungen | knapp, drohend, Straßenvokabular, kurze Sätze | unverwundbarer Hustler; kalt, spöttisch |
| 21 | Kanye West | mittel; Wortspiele, Reime oft auf dasselbe Schlüsselwort | 8–13; im Beat sitzend, Pausen, Spoken-Word-Momente | Alltagssprache, Markennamen, Selbstbefragung | Genie mit Zweifeln; großspurig, verletzlich, provokant |

### 2.5 Trap / Melodic / Drill US (E5)

| # | Künstler | 1 Reimtechnik | 2 Flow & Metrik | 3 Sprache | 4 Persona & Ton |
|---|---|---|---|---|---|
| 22 | Drake | mittel; Punchlines, Wortspiele mit Ortsnamen, Gesangs-Hooks | 8–12; Wechsel Rap und Gesang, ruhiger Sprechton | private Details, Beziehungen, Social-Media-Sprache | erfolgreich und einsam; selbstbewusst, sentimental |
| 23 | Future | niedrig; Wiederholung, Reim auf dasselbe Wort, Klang über Bedeutung | 6–10; Autotune-Melodie, gezogene Vokale | knapp, Drogen- und Luxusvokabular, Ad-libs | getriebener Hedonist; melancholisch, betäubt |
| 24 | Young Thug | mittel; Reime verformt durch Stimme | 6–14; Stimme als Instrument, Silben gedehnt und gequetscht | Kunstwörter, Laute, Fetzen | Freigeist; unberechenbar, verspielt |
| 25 | Migos | mittel; Reim auf Kettenwörter, Wiederholung | 12–16; Triolen-Flow (3 Silben pro Schlag), Ad-libs als Echo | Markennamen, Lautmalerei, kurze Wörter | Crew im Erfolg; feiernd, prahlend |
| 26 | Travis Scott | niedrig; Reim tritt hinter Atmosphäre zurück | 5–10; stark bearbeitete Stimme, wenige Wörter, viel Hall | Stichworte, Bilder, Ad-libs | Rave-Schamane; ekstatisch, düster |
| 27 | Nicki Minaj | hoch; Multis, Punchlines, Stimmwechsel | 10–16; wechselnde Stimmen und Akzente, Doubletime-Passagen | Wortspiele, Popkultur, Alter Egos | Diva mit Biss; dominant, humorvoll, theatralisch |
| 28 | Pop Smoke | niedrig; kurze Endreime, Wiederholung | 7–10; tiefe, raue Stimme, Brooklyn-Drill-Rhythmus | knapp, drohend, Ortsbezüge | Anführer; dominant, kalt |

### 2.6 UK (E6)

| # | Künstler | 1 Reimtechnik | 2 Flow & Metrik | 3 Sprache | 4 Persona & Ton |
|---|---|---|---|---|---|
| 29 | Dizzee Rascal | mittel–hoch; Reime als Stakkato-Schläge | 12–16 bei 140 BPM Halftime; hektisch, kantig | Londoner Slang, Alltag aus der Siedlung | junger Außenseiter; nervös, frech, energisch |
| 30 | Skepta | mittel; klare Endreime, Wiederholung | 10–14 bei 140 BPM; Grime-Energie, harte Betonung | Grime-Slang, kurze Ansagen | Unabhängiger Anführer; selbstbewusst, trotzig |
| 31 | Dave | hoch; Multis, Binnenreime, präzise Pointen | 10–15; ruhig, klavierbegleitet, Steigerung bis zur Wut | Storytelling, Gesellschaftsanalyse, Familiengeschichte | Chronist seiner Generation; ernst, analytisch, empathisch |
| 32 | Little Simz | hoch; Multis, Wortspiele | 10–15; flexibel, oft vor dem Beat, Wechsel aus Ruhe und Dichte | introspektiv, gesellschaftlich, Identität | Selbstbehauptung; klug, verletzlich, entschlossen |
| 33 | Headie One | mittel; Reime auf Kettenwörter, Wiederholung | 8–12; UK-Drill, Pausen auf den Snare-Schlägen | Drill-Slang, verschlüsselt | Überlebender; kühl, nachdenklich |

### 2.7 Deutschrap Pioniere & 2000er (E7)

| # | Künstler | 1 Reimtechnik | 2 Flow & Metrik | 3 Sprache | 4 Persona & Ton |
|---|---|---|---|---|---|
| 34 | Torch | mittel–hoch; frühe deutsche Multis, Binnenreime | 10–13; deutlich, betont, gelegentlich vor dem Beat | hochdeutsch, politisch, historische und kulturelle Bezüge | Lehrer und Kämpfer; ernst, stolz, antirassistisch |
| 35 | Die Fantastischen Vier | mittel; Endreime, Wortspiele, Dialog zwischen MCs | 9–12; leichtfüßig, pophaft, Wechselgesang | Alltagssprache, Schwäbisch-Anklänge, Witz | gut gelaunte Clique; ironisch, unbeschwert |
| 36 | Samy Deluxe | hoch; Multis, Doppeldeutigkeiten, Wortwitz | 11–16; variabel, Doubletime-Passagen | Wortspiele, Reflexion, Hamburg | Wortkünstler mit Haltung; selbstbewusst, reflektiert |
| 37 | Kool Savas | extrem; Kettenreime, lange Multis, Silbenpräzision | 13–20; Doubletime, Stakkato, präzise Betonung | aggressiv, direkt, Battle-Vokabular | König im Battle; arrogant, angriffslustig |
| 38 | Azad | hoch; harte Multis, Reimketten | 12–16; druckvoll, schwer, wenig Pausen | düster, aggressiv, Kampf- und Kriegsbilder | Krieger; wütend, ernst |
| 39 | Bushido | niedrig–mittel; einfache Paarreime, Wiederholung | 8–11; langsam, monoton, betont | einfache Straßensprache, kurze Sätze, Statussymbole | unnahbarer Straßen-Boss; kalt, abgeklärt, provokant |
| 40 | Sido | mittel; Paarreime, Wortwitz | 9–12; locker, sprechend | Berliner Schnauze, Alltag, Provokation mit Augenzwinkern | Provokateur mit Herz; frech, humorvoll, später nachdenklich |

### 2.8 Moderner Deutschrap (E8)

| # | Künstler | 1 Reimtechnik | 2 Flow & Metrik | 3 Sprache | 4 Persona & Ton |
|---|---|---|---|---|---|
| 41 | Kollegah | extrem; sehr lange Multis (4+ Silben), Reimketten über 4–8 Zeilen, Punchlines | 12–18; gleichmäßig, Doubletime-Passagen, hohe Silbenpräzision | gehobenes Vokabular, Fremdwörter, Vergleiche, Boss-Bilder | Boss mit Überlegenheitsgestus; arrogant, ironisch, theatralisch |
| 42 | Haftbefehl | mittel–hoch; Reime über Mehrsprachigkeit, Lautmalerei | 9–14; abgehackt, Stakkato, Ausrufe | Mischsprache (Deutsch mit türkischen, arabischen, kurdischen Wörtern), Neuschöpfungen, Ortsbezüge | Straßen-Chronist aus Offenbach; rau, melancholisch, getrieben |
| 43 | Casper | mittel; freie Reime, Bilder vor Reimen | 9–14; heiser, emotional, Steigerung, Indie-Einflüsse | Bilder aus Jugend, Provinz, Erinnerung | Melancholiker; verletzlich, sehnsüchtig, hymnisch |
| 44 | Marteria / Marsimoto | hoch; überraschende Multis, Wortspiele | 10–14; locker, groovig (Marsimoto mit hochgepitchter Stimme) | fantasievoll, Natur, Rostock, Absurdes | Abenteurer und Fantast; humorvoll, nachdenklich |
| 45 | Cro | mittel; Endreime, Wiederholungen, Ohrwurm-Hooks | 8–12; Sprechgesang, Wechsel Rap und Gesang | einfach, positiv, Jugendsprache, Englisch-Einsprengsel | Sonnenkind; locker, verliebt, optimistisch |
| 46 | Peter Fox | mittel; Paarreime, Wortwitz | 8–11; Dancehall-Sprechgesang, sehr rhythmisch | Berliner Alltag, Bilder aus der Großstadt, Sozialbeobachtung | Großstadt-Beobachter; ironisch, warm, kritisch |
| 47 | Trettmann | niedrig–mittel; Klang und Melodie vor Reim | 6–10; Autotune-Melodie, Dancehall-Wurzeln | Erinnerungen, Herkunft (Karl-Marx-Stadt), Nacht, Stadt | nostalgischer Romantiker; melancholisch, ruhig |
| 48 | Ufo361 | niedrig; Wiederholung, englische Einsprengsel | 6–10; Cloud-Rap, Ad-libs, gezogene Silben | Markennamen, Status, Anglizismen | cooler Aufsteiger; distanziert, selbstverliebt |
| 49 | Luciano | niedrig–mittel; einfache Endreime, Ad-libs | 7–11; melodischer Straßenrap, Drill- und Afro-Einflüsse | Berliner Straßenslang, Gruppen-Bezug | Crew-Anführer; selbstbewusst, entspannt |
| 50 | Apache 207 | niedrig–mittel; einfache Paarreime, Hooks | 7–10; gesungen, 80er-Synthie-Pop, langsamer Sprechgesang | Nostalgie, Liebe, Kleinstadt | melancholischer Romantiker mit Sonnenbrille; cool, sehnsüchtig |

### 2.9 Querschnitt: Was die Epochen trennt

| Parameter | E1 Golden Era | E3 Lyrical | E5 Trap | E7 Deutsch früh | E8 Deutsch modern |
|---|---|---|---|---|---|
| Ø Silben/Takt | 10–14 | 11–18 | 6–12 | 9–16 | 6–14 (stark gestreut) |
| Reimlänge | 2–3 Silben | 2–5 Silben | 1–2 Silben, Wiederholung | 1–3 Silben | 1–5 Silben (Kollegah vs. Cloud) |
| Binnenreime | häufig | sehr häufig | selten | Battle: häufig | stilabhängig |
| Enjambement | häufig | sehr häufig | selten | selten | selten |
| Hook-Anteil | mittel | niedrig | sehr hoch | mittel | hoch |
| Gesang | selten | gelegentlich | Standard | selten | häufig |

---

## 3. Phase 3: Acht Schreib-Archetypen

Silbenwerte gelten für 4/4 bei rund 90 BPM. Die App passt den Rahmen über BPM und Flow selbst an; die Werte hier sind die Wunschwerte des Stils.

### Übersicht

| ID | Archetyp | Vertreter (Auswahl) | Silben/Takt | Reimsilben | Reimdichte | Schema | Flow in der App |
|---|---|---|---|---|---|---|---|
| A1 | Der cineastische Street-Narrator | Nas, Biggie, Ghostface, Bushido, Sido, Haftbefehl | 10–14 | 2–3 | hoch | AABB, Kettenreim | normal |
| A2 | Der Reimakrobat (Battle-Technik) | Big Pun, Eminem, Black Thought, Kool Savas, Kollegah, Samy Deluxe, Azad | 13–18 | 3–4 | extrem | Kettenreim (AAAA) | double |
| A3 | Der Conscious-Analytiker | 2Pac, Lauryn Hill, Yasiin Bey, Kendrick, J. Cole, Lupe, Dave, Little Simz, Torch, Casper | 10–14 | 2–3 | hoch | AABB, ABAB | normal |
| A4 | Der Boss / Hustler | Jay-Z, 50 Cent, Kanye, Nicki Minaj, Snoop | 9–13 | 2 | mittel | AABB | normal |
| A5 | Der Melodic-Trap-Atmosphäriker | Future, Young Thug, Migos, Travis Scott, Drake, Ufo361, Luciano, Trettmann | 6–10 | 1–2 | niedrig | Monoreim, AABB | entspannt |
| A6 | Der Drill- und Grime-Frontmann | Pop Smoke, Headie One, Skepta, Dizzee Rascal | 8–12 | 2 | mittel | AABB, Monoreim | normal |
| A7 | Der exzentrische Wortkünstler | MF DOOM, André 3000, Missy Elliott, Lil Wayne, Marteria | 10–15 | 2–4 | hoch | frei, AABB | normal |
| A8 | Der Pop-Rap-Erzähler | Fanta 4, Cro, Peter Fox, Apache 207 | 8–11 | 2 | mittel | AABB | entspannt |

---

### A1 · Der cineastische Street-Narrator (à la 90s Eastcoast)

**Vertreter:** Nas, The Notorious B.I.G., Ghostface Killah, Bushido, Sido, Haftbefehl; teils Kendrick Lamar, Dave.

**Formales Regelwerk**

| Parameter | Wert |
|---|---|
| Silben pro Takt | 10–14 |
| Reim | Endreim auf 2–3 Silben, zusätzlich 1 Binnenreim pro 2 Zeilen |
| Schema | AABB oder Kettenreim über 4 Zeilen |
| Enjambement | erlaubt, bis zu 1 pro 4 Zeilen |
| Struktur | Szene etablieren (Ort, Zeit, Licht) → Figur → Handlung → Wendung → Nachklang |
| Perspektive | 1. Person oder Erzähler mit Kamerablick, Präsens |

**Vokabel- und Ton-Filter**

| Erlaubt / erwünscht | Meiden |
|---|---|
| konkrete Substantive (Treppenhaus, Neonlicht, Bushaltestelle), Uhrzeiten, Wetter, Gerüche, Markennamen sparsam, Straßenslang dosiert | abstrakte Moral ohne Bild, Belehrungen, Fantasie-Elemente, Abwertung von Gruppen |
| Ton: ernst, beobachtend, melancholisch; trockener Humor erlaubt | Ton: albern, übertrieben fröhlich |

**Prompt-Snippet**

```text
STIL: Cineastischer Street-Narrator.
- Erzähle eine Szene wie ein Film: Jede Zeile enthält mindestens ein konkretes, sichtbares Detail (Ort, Gegenstand, Licht, Geräusch).
- Präsens, Ich-Perspektive oder Erzähler mit Kamerablick. Kein Fazit, keine Moral am Ende, das Bild spricht.
- Endreime auf 2–3 Silben, zusätzlich ein Binnenreim in jeder zweiten Zeile. Sätze dürfen über das Zeilenende laufen (höchstens einmal pro 4 Zeilen).
- Aufbau über die Zeilen: Ort → Figur → Handlung → Wendung → Nachklang.
- Straßensprache sparsam und glaubwürdig, keine Klischee-Häufung. Keine Abwertung von Gruppen.
```

---

### A2 · Der Reimakrobat (mathematisch-komplexe Battle-Technik)

**Vertreter:** Big Pun, Eminem, Black Thought, Kool Savas, Kollegah, Samy Deluxe, Azad; teils Nicki Minaj, MF DOOM.

**Formales Regelwerk**

| Parameter | Wert |
|---|---|
| Silben pro Takt | 13–18 (Double-Time) |
| Reim | Multis auf 3–4 Silben am Zeilenende, dazu derselbe Vokalklang 1–2 Mal in der Zeile |
| Schema | Kettenreim: ein Reimklang über 4 Zeilen, dann Wechsel |
| Punchline | jede 2. Zeile endet mit Pointe (Doppeldeutigkeit, Vergleich, Übertreibung) |
| Enjambement | selten; Pointen stehen am Zeilenende |
| Struktur | Ansage → Steigerung → Doppeldeutigkeit → Höhepunkt in Zeile 4/8 |

**Vokabel- und Ton-Filter**

| Erlaubt / erwünscht | Meiden |
|---|---|
| Fremdwörter und Fachbegriffe als Reimmaterial, Vergleiche („wie …“), Zahlen, Wortspiele mit Doppelbedeutung | Füllwörter („yeah“, „ja“) zum Silbenfüllen, Reime auf dasselbe Wort, Beleidigungen über Herkunft, Geschlecht, Behinderung, Sexualität |
| Ton: überlegen, arrogant, ironisch, angriffslustig | Ton: unsicher, weinerlich |

**Prompt-Snippet**

```text
STIL: Reimakrobat (Battle-Technik).
- Jede Zeile endet auf einen Mehrsilbenreim über die letzten 3–4 Silben; alle Vokale dieser Silben stimmen überein.
- Derselbe Vokalklang taucht zusätzlich 1–2 Mal innerhalb der Zeile auf (Binnenreim).
- Kettenreim: 4 Zeilen teilen denselben Reimklang, danach ein neuer.
- Jede zweite Zeile endet mit einer Punchline: Doppeldeutigkeit, überraschender Vergleich oder Übertreibung.
- Hohe Silbendichte, aber jedes Wort trägt Bedeutung. Keine Füllwörter, kein Reimwort doppelt.
- Angriffslustig und selbstbewusst, Angriffe zielen auf Können, nie auf Herkunft, Geschlecht, Körper oder Sexualität.
```

---

### A3 · Der Conscious-Analytiker

**Vertreter:** 2Pac (politische Seite), Lauryn Hill, Yasiin Bey, Kendrick Lamar, J. Cole, Lupe Fiasco, Dave, Little Simz, Torch, Casper.

**Formales Regelwerk**

| Parameter | Wert |
|---|---|
| Silben pro Takt | 10–14 |
| Reim | Endreim 2–3 Silben, Binnenreime frei; Bedeutung geht vor Reim |
| Schema | AABB oder ABAB |
| Enjambement | häufig erwünscht (bis zu 1 pro 2 Zeilen) |
| Struktur | persönliche Beobachtung → gesellschaftlicher Zusammenhang → Widerspruch → offene Frage oder Haltung |
| Stilmittel | Perspektivwechsel, rhetorische Frage, Metapher, die über 2–4 Zeilen trägt |

**Vokabel- und Ton-Filter**

| Erlaubt / erwünscht | Meiden |
|---|---|
| konkrete Erfahrung plus Begriff (Miete, Schicht, Herkunft, Schule), Metaphern, Zahlen und Fakten in Maßen | Parolen ohne Bild, Predigtton, Verschwörungserzählungen, Schuldzuweisung an ganze Gruppen |
| Ton: nachdenklich, ernst, empathisch, wütend mit Begründung | Ton: zynisch ohne Gegenbild |

**Prompt-Snippet**

```text
STIL: Conscious-Analytiker.
- Starte bei einer persönlichen, konkreten Beobachtung und weite sie Zeile für Zeile zur gesellschaftlichen Frage.
- Eine tragende Metapher läuft über mindestens 2 Zeilen.
- Endreime auf 2–3 Silben; die Aussage hat Vorrang, kein Wort nur wegen des Reims.
- Sätze dürfen über Zeilenenden laufen. Höchstens eine rhetorische Frage pro 4 Zeilen.
- Keine Parolen, keine Predigt, keine Pauschalurteile über Gruppen. Ende offen oder mit klarer Haltung, nicht mit Belehrung.
```

---

### A4 · Der Boss / Hustler

**Vertreter:** Jay-Z, 50 Cent, Kanye West, Nicki Minaj, Snoop Dogg; im Deutschrap Anteile bei Bushido und Kollegah.

**Formales Regelwerk**

| Parameter | Wert |
|---|---|
| Silben pro Takt | 9–13, mit bewussten Pausen |
| Reim | Endreim 2 Silben, Doppeldeutigkeiten wichtiger als Reimlänge |
| Schema | AABB |
| Struktur | Ausgangslage (früher) → Aufstieg → Statusbeweis → Ansage an Konkurrenz |
| Stilmittel | Understatement, Wortspiel mit Geld- und Geschäftsbegriffen, kurze Sätze |
| Hook-Tauglichkeit | Zeile 1 und 5 sollen zitierfähig sein |

**Vokabel- und Ton-Filter**

| Erlaubt / erwünscht | Meiden |
|---|---|
| Geschäftsvokabular (Deal, Bilanz, Anteil), Statussymbole sparsam, Vergleiche „früher/heute“ | Aufzählungen von Marken ohne Pointe, Prahlen ohne Witz |
| Ton: ruhig, souverän, kühl, selbstironisch | Ton: hektisch, unsicher |

**Prompt-Snippet**

```text
STIL: Boss / Hustler.
- Erzähle vom Aufstieg: früher → heute. Jeder Statusbeweis ist ein Bild, keine Markenliste.
- Ruhiger Ton, kurze Sätze, bewusste Pausen (lieber 9–11 Silben als 14).
- Endreime auf 2 Silben, dazu mindestens eine Doppeldeutigkeit pro 4 Zeilen (Geld- oder Geschäftsbegriff mit zweiter Bedeutung).
- Zeile 1 und 5 sind zitierfähige One-Liner.
- Überlegen, nicht laut. Selbstironie ist erlaubt, Herabwürdigung anderer Menschen nicht.
```

---

### A5 · Der Melodic-Trap-Atmosphäriker

**Vertreter:** Future, Young Thug, Migos, Travis Scott, Drake; Ufo361, Luciano, Trettmann.

**Formales Regelwerk**

| Parameter | Wert |
|---|---|
| Silben pro Takt | 6–10 (Triolen-Variante wie Migos: 12–15) |
| Reim | Endreim 1–2 Silben, Wiederholung desselben Reimworts erlaubt, Assonanz genügt |
| Schema | Monoreim über 4–8 Zeilen oder AABB |
| Struktur | Stimmung → Wiederholung → kleine Variation; Hook-Logik statt Erzählbogen |
| Stilmittel | Ad-libs in Klammern am Zeilenende, gedehnte Vokale, Wiederholung als Mantra |
| Gesang | Zeilen sollen singbar sein: offene Vokale am Zeilenende (a, o, e, ei) |

**Vokabel- und Ton-Filter**

| Erlaubt / erwünscht | Meiden |
|---|---|
| kurze Wörter, Anglizismen dosiert, Nacht, Licht, Geschwindigkeit, Gefühl | lange Schachtelsätze, Fachwörter, viele Konsonanten am Zeilenende |
| Ton: melancholisch, hedonistisch, entrückt, cool | Ton: belehrend, technisch-angeberisch |

**Prompt-Snippet**

```text
STIL: Melodic Trap.
- Wenige, kurze Wörter pro Zeile (6–10 Silben). Zeilenenden auf offenen, singbaren Vokalen.
- Endreime auf 1–2 Silben; Monoreim über 4 Zeilen ist erwünscht, Wiederholung als Stilmittel erlaubt.
- Stimmung vor Handlung: Nacht, Licht, Tempo, Gefühl. Kein Erzählbogen nötig.
- Optional ein Ad-lib pro Zeile in Klammern am Ende, z. B. (yeah), (ey), höchstens 1 pro Zeile.
- Ton entrückt und melancholisch-cool. Keine verherrlichenden Drogendetails, wenn "jugendfrei" aktiv ist.
```

---

### A6 · Der Drill- und Grime-Frontmann

**Vertreter:** Pop Smoke, Headie One, Skepta, Dizzee Rascal; Anteile bei Haftbefehl, Luciano, Azad.

**Formales Regelwerk**

| Parameter | Wert |
|---|---|
| Silben pro Takt | 8–12 (Drill 140–145 BPM im Halftime-Gefühl; Grime 140 BPM) |
| Reim | Endreim 2 Silben, Wiederholung desselben Reimworts in 2 Zeilen erlaubt |
| Schema | AABB oder Monoreim |
| Struktur | Ansage → Ort/Crew → Drohung oder Behauptung → Abschluss mit Pause |
| Stilmittel | Pause auf Zählzeit 3 (Snare), harte Konsonanten, Call-and-Response |

**Vokabel- und Ton-Filter**

| Erlaubt / erwünscht | Meiden |
|---|---|
| Ortsnamen, Crew-Bezug, kurze Imperative, Slang dosiert | konkrete Gewaltanleitungen, Bezug auf echte Personen, Waffen-Details; bei "jugendfrei" keine Gewaltbilder |
| Ton: kalt, dominant, knapp | Ton: verspielt, sentimental |

**Prompt-Snippet**

```text
STIL: Drill / Grime.
- Kurze, harte Sätze; Imperative erlaubt. 8–12 Silben, jede Zeile mit einer hörbaren Pause in der Mitte.
- Endreime auf 2 Silben, harte Konsonanten am Zeilenende (k, t, ck, tz).
- Ort und Crew verankern, Haltung statt Geschichte.
- Keine echten Personen, keine Gewaltanleitungen. Wenn "jugendfrei": Stärke durch Haltung und Erfolg ausdrücken, nicht durch Gewalt.
```

---

### A7 · Der exzentrische Wortkünstler

**Vertreter:** MF DOOM, André 3000, Missy Elliott, Lil Wayne, Marteria/Marsimoto; Anteile bei Ghostface, Young Thug, Die Fantastischen Vier.

**Formales Regelwerk**

| Parameter | Wert |
|---|---|
| Silben pro Takt | 10–15, Tempowechsel innerhalb der Strophe erwünscht |
| Reim | Assonanz-Ketten, Reime über Wortgrenzen hinweg, 2–4 Silben |
| Schema | frei; mindestens jede 2. Zeile reimt am Ende |
| Struktur | assoziativ: Bild → überraschende Verknüpfung → Absurdität → Rückkehr zum Ausgangsbild |
| Stilmittel | Wortneuschöpfungen (1 pro 4 Zeilen), Lautmalerei, Alter Ego, Popkultur-Anspielungen |

**Vokabel- und Ton-Filter**

| Erlaubt / erwünscht | Meiden |
|---|---|
| Alltagsgegenstände in absurden Rollen, Essen, Comics, Tiere, Kunstwörter | Klischee-Bilder (Geld, Autos) ohne Brechung, Pathos |
| Ton: verspielt, trocken-ironisch, rätselhaft | Ton: ernst-predigend |

**Prompt-Snippet**

```text
STIL: Exzentrischer Wortkünstler.
- Assoziativ: Jede Zeile springt von einem Bild zu einem überraschenden, aber klanglich verbundenen nächsten Bild.
- Reime über Wortgrenzen hinweg (z. B. ein Wort reimt auf zwei Wörter), Assonanz-Ketten über 2–4 Silben.
- Höchstens eine Wortneuschöpfung pro 4 Zeilen. Alltagsgegenstände in absurden Rollen.
- Trockener Humor, kein Pathos. Am Ende zum Ausgangsbild zurückkehren.
```

---

### A8 · Der Pop-Rap-Erzähler

**Vertreter:** Die Fantastischen Vier, Cro, Peter Fox, Apache 207; Anteile bei Sido, Marteria, Trettmann, Snoop.

**Formales Regelwerk**

| Parameter | Wert |
|---|---|
| Silben pro Takt | 8–11 |
| Reim | Endreim 2 Silben, sauber und gut hörbar |
| Schema | AABB |
| Struktur | Alltagsszene → Gefühl → Wendung mit Augenzwinkern → hooktaugliche Zeile |
| Stilmittel | Wiederholungen, einfache Bilder, direkte Anrede, mitsingbare Zeilen |

**Vokabel- und Ton-Filter**

| Erlaubt / erwünscht | Meiden |
|---|---|
| Alltagssprache, Sommer, Stadt, Freundschaft, Liebe, Nostalgie, leichte Ironie | Kraftausdrücke, komplexe Fremdwörter, Gewalt |
| Ton: warm, positiv, ironisch, nostalgisch | Ton: aggressiv, düster |

**Prompt-Snippet**

```text
STIL: Pop-Rap-Erzähler.
- Einfache, klare Sprache und Alltagsbilder. 8–11 Silben pro Zeile, gut mitsingbar.
- Saubere Endreime auf 2 Silben, Paarreim (AABB).
- Warm und leicht ironisch: Gefühl zeigen, dann mit einem Augenzwinkern brechen.
- Jede vierte Zeile soll als Hook funktionieren (kurz, einprägsam, wiederholbar).
- Keine Kraftausdrücke, keine Gewalt.
```

---

## 4. Integration in die App

### 4.1 Zuordnung zu den Feldern der Text-Werkstatt

| Archetyp | Zeilen | Reimsilben (`twK`) | Flow (`twFlow`) | Reimschema (`twScheme`) | Binnenreime | BPM-Empfehlung |
|---|---|---|---|---|---|---|
| A1 Street-Narrator | 8/16 | 2 | normal | AABB | an | 85–95 |
| A2 Reimakrobat | 8/16 | 4 | double | AAAA | an | 85–95 |
| A3 Conscious | 8/16 | 3 | normal | ABAB | an | 80–95 |
| A4 Boss/Hustler | 8 | 2 | normal | AABB | aus | 85–100 |
| A5 Melodic Trap | 8 | 2 | entspannt | MONO | aus | 130–150 (Halftime: 65–75 eintragen) |
| A6 Drill/Grime | 8 | 2 | normal | AABB | aus | 140–145 (Halftime: 70–72 eintragen) |
| A7 Wortkünstler | 8 | 3 | normal | AABB | an | 85–95 |
| A8 Pop-Rap | 8 | 2 | entspannt | AABB | aus | 90–105 |

### 4.2 Einbau in den Prompt

Die Datei `rap-stile.js` enthält für jeden Archetyp ein Objekt mit `prompt`. Im System-Prompt der Text-Werkstatt (`TW_SYSTEM`) wird dieser Text als zusätzlicher Abschnitt angehängt; die Werte aus `app` setzen die Regler. Beispiel:

```js
const stil = RAP_STILE.find((s) => s.id === "A2");
const system = TW_SYSTEM + "\n\n" + stil.prompt;
// Regler setzen
setRadio("twK", stil.app.reimsilben);
setRadio("twFlow", stil.app.flow);
$("twScheme").value = stil.app.schema;
$("twBinnen").checked = stil.app.binnenreime;
```

Die lokale Reimprüfung bleibt unverändert und gilt für alle Stile. Für A5 und A6 kann die Mindestpunktzahl beim Reim etwas niedriger liegen (Assonanz genügt), für A2 höher.

---

## 5. Wie man die Richtwerte belastbar macht

1. Korpus: 20–40 Strophen pro Archetyp mit Taktmarkierung (Zeile = Takt), aus legal zugänglichen Quellen, nur zur Auszählung, nicht zur Weitergabe.
2. Pro Zeile automatisch zählen: Silben (über die Aussprache des Reimfinders), Länge des Endreims in Silben, Zahl der Binnenreime (gleiche Vokalfolge innerhalb der Zeile), Satzgrenze am Zeilenende ja/nein.
3. Median und Interquartilsabstand je Archetyp in `rap-stile.js` eintragen.
4. Generierte Texte gegen dieselben Kennzahlen prüfen: So lässt sich messen, ob ein Stil getroffen wird.
