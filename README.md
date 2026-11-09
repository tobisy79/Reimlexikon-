# Reimfinder

Deutsche Reime nach Lauten, nicht nach Buchstaben, dazu eine Text-Werkstatt für Rap-Zeilen mit KI.

**Online öffnen:** https://tobisy79.github.io/Reimlexikon-/

- `index.html` / `reimfinder.html`: die Seite (eine Datei, läuft komplett im Browser).
- `lexikon-de.json.gz`: voller Wortschatz (rund 704.000 Wörter mit Lautschrift). Online unter „Lexikon laden“ → „oder per URL“ → „Laden“; danach bleibt er im Browser gespeichert.
- `LIESMICH.md`: ausführliche Anleitung.
- `build_lexikon.mjs`: baut das Lexikon neu.
- `namen_kuratiert.txt`: handverlesene Namen für die Gruppe „Berühmte Namen“ (weitere stammen aus Pantheon 2.0).
- `stilanalyse/`: Stilanalyse von 50 Rappern (8 Stil-Archetypen), Grundlage der Stil-Auswahl.

Ein API-Schlüssel für die KI wird nur im eigenen Browser gehalten und nie in dieses Repository geschrieben.

Daten: Wiktionary-Lautschrift über ipa-dict und FrequencyWords, Lizenz CC BY-SA.
