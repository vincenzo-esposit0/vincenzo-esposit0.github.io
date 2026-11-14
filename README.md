<div align="center">

<img src="assets/logo.svg" alt="Vincenzo Esposito" width="120">

# Vincenzo Esposito

**Software Engineer · Cybersecurity Specialist**

Sito personale con profilo, esperienze, progetti, collaborazioni e certificazioni. Disponibile in italiano e in inglese, con tema chiaro e scuro.

[**🌐 Vedi il sito live**](https://esposito-vincenzo.it/)

![HTML5](https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-3.13-0ae448?logo=greensock&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis-1.2-111111)
![Deploy](https://img.shields.io/badge/deploy-GitHub_Pages-222222?logo=github&logoColor=white)

</div>

---

## Il sito

Una sola pagina, organizzata in sezioni:

| Sezione | Contenuto |
|---|---|
| **Home** | Logo animato, presentazione e ritratto con anello a gradiente e inclinazione 3D |
| **Chi sono** | Ruolo attuale, formazione, specializzazione, certificazioni Google e interessi |
| **Esperienza** | Timeline del percorso professionale che si riempie con lo scroll |
| **Formazione** | Lauree e diploma, con tesi e progetto d'esame |
| **Progetti** | Emulatore Flipper Zero in evidenza, con scena animata allo scroll, e altri progetti accademici e personali |
| **Lavori** | Siti realizzati per clienti e collaborazioni |
| **Competenze** | Stack tecnico per area e certificazioni |
| **Contatti** | Ritratto in pixel art con scena animata allo scroll e link a email, LinkedIn e GitHub |

## Caratteristiche

- **Nessuna build**: HTML, CSS e JavaScript statici, pubblicati così come sono.
- **Bilingue IT/EN**: il testo italiano è nell'HTML, quello inglese in un dizionario in `script.js`. La lingua si sceglie con il selettore o con `?lang=en`, e la scelta viene ricordata.
- **Tema chiaro e scuro**: segue le impostazioni del sistema e si può cambiare con un pulsante. Il tema viene applicato prima del primo disegno della pagina, quindi non si vede nessun lampo bianco.
- **Design "liquid glass"**: card in vetro smerigliato con un riflesso che segue il puntatore.
- **Animazioni con GSAP**: intro della home, titoli che compaiono lettera per lettera, comparse a cascata e testo "fantasma" in parallasse. Le comparse partono subito anche quando il browser ripristina la posizione di scroll.
- **Scroll fluido con Lenis** su mouse e trackpad. Su touch resta lo scroll nativo.
- **Accessibile**: con `prefers-reduced-motion` animazioni, scroll fluido ed effetti vengono disattivati e i contenuti sono subito visibili.
- **Responsive**, dagli smartphone da 320 px ai monitor desktop.
- **Leggero**: immagini in WebP, librerie servite dal sito stesso (nessuna CDN esterna), circa 480 KB trasferiti al primo caricamento.

## Tecnologie

- HTML5, CSS3 (custom properties, `color-mix`, `backdrop-filter`, `@property`) e JavaScript senza framework
- [GSAP 3.13](https://gsap.com/) con ScrollTrigger e SplitText per le animazioni
- [Lenis 1.2](https://lenis.darkroom.engineering/) per lo scroll fluido
- [GitHub Pages](https://pages.github.com/) per la pubblicazione, con dominio personalizzato

## Avvio in locale

Non serve installare nulla: basta un qualsiasi server statico.

```bash
git clone https://github.com/vincenzo-esposit0/vincenzo-esposit0.github.io.git
cd vincenzo-esposit0.github.io
python3 -m http.server 8123
```

Il sito è disponibile su **http://localhost:8123/**.

## Struttura del progetto

```
vincenzo-esposit0.github.io/
├── assets/
│   ├── certificates/       # Certificati (PDF e immagini) collegati dal sito
│   ├── logos/              # Loghi di aziende, università e progetti
│   ├── vendor/             # GSAP e Lenis, serviti in locale
│   ├── favicon.svg
│   ├── flipper.webp        # Flipper Zero in pixel art
│   └── vincenzo-pixel.jpg  # Ritratto in pixel art della sezione Contatti
├── index.html              # Contenuti della pagina (testi in italiano)
├── styles.css              # Stili, temi e layout responsive
├── script.js               # Navigazione, traduzioni EN, tema, scene allo scroll
├── motion.js               # Animazioni GSAP e scroll fluido Lenis
├── CNAME                   # Dominio personalizzato per GitHub Pages
└── LICENSE
```

## Personalizzazione

### Testi e traduzioni
I testi italiani si modificano direttamente in `index.html`. Ogni elemento traducibile ha un attributo `data-i18n` con una chiave, e la versione inglese della stessa chiave si trova nell'oggetto `en` all'inizio di [`script.js`](script.js). Per aggiungere un testo tradotto:

1. aggiungi in `index.html` l'elemento con `data-i18n="nuova.chiave"` e il testo italiano;
2. aggiungi in `script.js` la riga `'nuova.chiave': 'English text',`.

Se la chiave inglese manca, viene mostrato il testo italiano.

### Animazioni
Tutte le animazioni GSAP e lo scroll fluido sono in [`motion.js`](motion.js). Se GSAP non si carica, `script.js` usa un sistema di comparse più semplice, quindi il sito resta comunque utilizzabile. Le scene allo scroll del Flipper e dei Contatti sono in `script.js` e non dipendono da GSAP.

### Colori
I colori dei due temi sono variabili CSS definite in cima a [`styles.css`](styles.css) (`--accent`, `--grad`, `--glass-bg`, …). I colori dei pannelli della sezione Lavori sono impostati direttamente su ogni card, con `--brand-a` e `--brand-b` in `index.html`.

### Cache del browser
I file CSS e JS sono collegati con un parametro di versione, ad esempio `styles.css?v=2026-11-14.20`. Dopo una modifica conviene aggiornarlo in `index.html`, così i visitatori ricevono subito la nuova versione.

## Deploy

Il sito è pubblicato con **GitHub Pages** dal branch `main`, senza passaggi di build: a ogni push GitHub pubblica la nuova versione in pochi minuti.

| Impostazione | Valore |
|---|---|
| Sorgente | Branch `main`, cartella `/` (root) |
| Dominio | `esposito-vincenzo.it` (file `CNAME`) |
| HTTPS | Forzato, con certificato Let's Encrypt gestito da GitHub |
| DNS | Record A e AAAA verso GitHub Pages, `www` in CNAME verso `vincenzo-esposit0.github.io` |

Il file `.nojekyll` disattiva l'elaborazione Jekyll, quindi i file vengono serviti così come sono.

### Progetti sotto lo stesso dominio
I siti GitHub Pages degli altri repository ereditano il dominio di questo sito e sono raggiungibili come sottocartelle:

- [esposito-vincenzo.it/Unisa-SpinOffs/](https://esposito-vincenzo.it/Unisa-SpinOffs/)
- [esposito-vincenzo.it/flipper-zero-firmware-hub/](https://esposito-vincenzo.it/flipper-zero-firmware-hub/)
- [esposito-vincenzo.it/AvatarMarket/](https://esposito-vincenzo.it/AvatarMarket/)

Per questo il dominio deve restare configurato su questo repository: spostarlo altrove renderebbe irraggiungibili anche questi indirizzi.

## Licenza

© 2026 Vincenzo Esposito. Tutti i diritti riservati. Codice, testi, design e immagini non possono essere copiati o riutilizzati senza autorizzazione. Vedi [LICENSE](LICENSE).

I nomi e i loghi di aziende, università ed enti appartengono ai rispettivi titolari. GSAP e Lenis sono distribuiti con le rispettive licenze.
