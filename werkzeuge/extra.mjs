// Baut out/extra.json.gz: Orte (GeoNames + Liste), Vornamen (Stadt Köln), Redewendungen + Synonyme (OpenThesaurus)
import fs from "node:fs"; import zlib from "node:zlib";
import { IPA, G2P } from "./core.mjs";
const SP = "/tmp/claude-0/-home-user/7ca5be93-23ec-59fa-9399-b1e168aa0294/scratchpad";
const DL = "/tmp/claude-0/-home-user-reimlexikon-/7ca5be93-23ec-59fa-9399-b1e168aa0294/scratchpad/dl2";
const L = JSON.parse(zlib.gunzipSync(fs.readFileSync(SP + "/out/lexikon-de.json.gz")).toString("utf8"));
const lex = new Map();
for (const e of L.eintraege) if (!lex.has(e[0])) lex.set(e[0], e);
for (const e of L.eintraege) { const l = e[0].toLowerCase(); if (!lex.has(l)) lex.set(l, e); }
const look = (w) => lex.get(w) || lex.get(w.toLowerCase()) || lex.get(w[0].toUpperCase() + w.slice(1).toLowerCase());
const freqOf = (w) => { const e = look(w); return e ? e[4] || 0 : 0; };

function wordIpa(tok, allowG2P) {
  const e = look(tok);
  if (e) {
    const vs = e[1].split("|");
    if (vs.length === 1) return { ipa: vs[0], g: false };
    const g = (G2P.word(tok) || "").replace(/[ˈˌ.]/g, "");
    const dist = (a, b) => { const d = Array.from({ length: b.length + 1 }, (_, i) => i); for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = t; } } return d[b.length]; };
    vs.sort((a, b) => dist(a.replace(/[ˈˌ.]/g, ""), g) - dist(b.replace(/[ˈˌ.]/g, ""), g));
    return { ipa: vs[0], g: false };
  }
  if (!allowG2P) return null;
  const g = G2P.word(tok); return g ? { ipa: g, g: true } : null;
}
function phraseIpa(text, allowG2P) {
  const toks = text.replace(/[.,!?;:"„“]/g, " ").split(/[\s\-]+/).filter(Boolean);
  if (!toks.length || toks.some((t) => /\d/.test(t))) return null;
  const parts = []; let guessed = 0;
  for (const t of toks) { const r = wordIpa(t, allowG2P); if (!r) return null; if (r.g) guessed++; parts.push(r.ipa.replace(/[\/\[\]]/g, "")); }
  const full = parts.map((p, i) => (i < parts.length - 1 ? p.replace(/ˈ/g, "ˌ") : p)).join(".");
  const P = IPA.parse(full), last = IPA.parse(parts[parts.length - 1]);
  if (!P.S || !last.S) return null;
  return { ipa: P.norm, last: last.norm, lastWord: toks[toks.length - 1], guessed, toks };
}
const rows = new Map(); // key -> row
const fame = (x) => Math.max(1, Math.min(100, Math.round(x)));
function add(name, desc, f, kind, allowG2P = true) {
  const key = kind + ":" + name.toLowerCase();
  if (rows.has(key)) return;
  const r = phraseIpa(name, allowG2P); if (!r) return;
  rows.set(key, [name, r.ipa, desc + (r.guessed ? " · Aussprache geschätzt" : ""), r.toks.length > 1 ? r.last : "", fame(f), r.lastWord, kind]);
}

// ---------- Orte
const LISTE = fs.readFileSync(SP + "/tools/laender.txt", "utf8").trim().split("|");
for (const n of LISTE) add(n, "Land, Region oder bekannter Ort", 85, "orte");
const BL = { "01": "Baden-Württemberg", "02": "Bayern", "03": "Bremen", "04": "Hamburg", "05": "Hessen", "06": "Niedersachsen", "07": "Nordrhein-Westfalen", "08": "Rheinland-Pfalz", "09": "Saarland", "10": "Schleswig-Holstein", "11": "Brandenburg", "12": "Mecklenburg-Vorpommern", "13": "Sachsen", "14": "Sachsen-Anhalt", "15": "Thüringen", "16": "Berlin" };
const EXO = { Vienna: "Wien", Munich: "München", Zurich: "Zürich", Geneva: "Genf", Nuremberg: "Nürnberg", Cologne: "Köln", Hanover: "Hannover", Brunswick: "Braunschweig", Lucerne: "Luzern", Berne: "Bern", "Frankfurt am Main": "Frankfurt" };
const C = JSON.parse(fs.readFileSync(DL + "/cities.json", "utf8")).filter((c) => ["DE", "AT", "CH"].includes(c.cc) && (c.pop || 0) >= 5000).sort((a, b) => b.pop - a.pop);
let nOrte = 0;
for (const c of C) {
  let name = EXO[c.name] || c.name;
  if (/[^A-Za-zÄÖÜäöüßéèàç .\-']/.test(name)) continue;
  const land = c.cc === "DE" ? (BL[c.adm] ? BL[c.adm] : "Deutschland") : c.cc === "AT" ? "Österreich" : "Schweiz";
  const art = c.fc === "PPLX" ? "Stadtteil" : (c.pop >= 100000 ? "Großstadt" : "Ort");
  const d = `${art} in ${land}, ${c.pop.toLocaleString("de-DE")} Einw.`;
  const f = 20 * Math.log10(c.pop / 300);
  const before = rows.size;
  add(name, d, f, "orte");
  const short = name.replace(/\s+(am|an der|an den|im|in der|ob der|vor der|bei|\(.*)\b.*$/, "");
  if (short !== name && short.length > 2) add(short, d, f, "orte");
  if (rows.size > before) nOrte++;
}
// ---------- Vornamen (Stadt Köln, 2010–2018)
const VN = JSON.parse(fs.readFileSync(DL + "/baby-names-cologne/package/dist/data.json", "utf8"));
const vc = new Map();
for (const r of VN) { const o = vc.get(r.name) || { n: 0, g: {} }; o.n += r.count; o.g[r.gender] = (o.g[r.gender] || 0) + r.count; vc.set(r.name, o); }
let nVn = 0;
for (const [name, o] of [...vc].sort((a, b) => b[1].n - a[1].n)) {
  if (o.n < 10 || !/^[A-ZÄÖÜ][a-zäöüßéèëï\-]+$/.test(name)) continue;
  const g = (o.g.female || 0) > (o.g.male || 0) * 3 ? "weiblich" : (o.g.male || 0) > (o.g.female || 0) * 3 ? "männlich" : "weiblich und männlich";
  const b = rows.size; add(name, `Vorname, ${g}`, 15 * Math.log10(o.n) + 20, "vornamen"); if (rows.size > b) nVn++;
}
// ---------- OpenThesaurus: Redewendungen und Synonyme
const OT = fs.readFileSync(DL + "/germansynonyms/package/openthesaurus.txt", "utf8").split("\n").filter((l) => l && !l.startsWith("#"));
const BAD = /fachspr|veraltet|Plural|zool|botan|med\.|medizin|lat\.|Chemie|Biologie|Schach|Jura|juristisch|Recht|Technik|techn\.|selten|regional|österr|schweiz|historisch|Amtsdeutsch|Bürokratie|Militär|Tiermedizin|Physik|Mathematik|Pharmazie|Linguistik|Philosophie|Religion|Seemannssprache|Jägersprache|Musik|Sport|derb|vulgär|abwertend|Schimpfwort|Diskriminierung/i;
const thes = []; let nRw = 0;
const clean = (s) => s.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
for (const line of OT) {
  const terms = line.split(";");
  const singles = terms.filter((t) => !/\(/.test(t) || /\(ugs\.\)/.test(t)).map(clean).filter((t) => t && !t.includes(" ") && /^[A-Za-zÄÖÜäöüß\-]+$/.test(t));
  const ts = [...new Set(terms.map(clean).filter((t) => t && t.split(" ").length <= 3 && !/[\d\/…]/.test(t)))];
  if (ts.length >= 2) thes.push(ts.join(";"));
  for (const raw of terms) {
    const ann = (raw.match(/\(([^)]*)\)/g) || []).join(" ");
    if (BAD.test(ann)) continue;
    const t = clean(raw);
    const ws = t.split(" ");
    if (ws.length < 2 || ws.length > 6 || /[\d\/…+&=]/.test(t) || /^[A-ZÄÖÜ]/.test(ws[0]) && ws.every((w) => /^[A-ZÄÖÜ]/.test(w))) continue;
    if (/^(etwas|jemand|jemanden|jemandem|jemandes|sich|ein|eine|einen|der|die|das)$/.test(ws[ws.length - 1]) && ws.length === 2) continue;
    const minF = Math.min(...ws.filter((w) => !/^(etwas|jemand\w*|sich)$/.test(w)).map(freqOf));
    if (!(minF >= 30)) continue;
    const verbEnd = /^[a-zäöü].*(en|ern|eln|n)$/.test(ws[ws.length - 1]);
    if (ws.length === 2 && !verbEnd && !/ugs/.test(ann)) continue;
    const sim = singles.filter((s) => s.toLowerCase() !== t.toLowerCase()).sort((a, b) => freqOf(b) - freqOf(a))[0];
    const d = (sim ? "bedeutet etwa: " + sim : "Redewendung") + (/ugs/.test(ann) ? " · umgangssprachlich" : "");
    const b = rows.size; add(t, d, 20 * Math.log10(minF + 1), "redewendungen", false); if (rows.size > b) nRw++;
  }
}
const all = [...rows.values()];
console.log({ orte: nOrte, liste: LISTE.length, vornamen: nVn, redewendungen: nRw, thes: thes.length, rows: all.length });
for (const k of ["orte", "vornamen", "redewendungen"]) console.log(k, all.filter((r) => r[6] === k).slice(0, 12).map((r) => r[0] + " " + r[1] + " [" + r[2] + "]").join("\n  "));
const rnd = all.filter((r) => r[6] === "redewendungen"); for (let i = 0; i < 25; i++) console.log("  ~", rnd[(i * 977) % rnd.length].slice(0, 3).join(" | "));
const json = JSON.stringify({ quellen: "GeoNames (CC BY 4.0), Stadt Köln Vornamen (CC BY 3.0), OpenThesaurus (LGPL)", rows: all, thes: thes.join("\n") });
fs.writeFileSync(SP + "/out/extra.json.gz", zlib.gzipSync(json, { level: 9 }));
console.log("json", json.length, "gz", fs.statSync(SP + "/out/extra.json.gz").size);
