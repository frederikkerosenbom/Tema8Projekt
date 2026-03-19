<!--
https://undervisningsmateriale-f2026.netlify.app/diverse/tema-8-markdown-grundregler/

ENKELT LINJE NYT AFSNIT:
En tom linje adskiller to afsnit.
Markdown ignorerer ekstra mellemrum i starten og slutningen af en linje.

OVERSKRIFTER:
# H1

## H2

### H3

#### H4

TEKST OG TYPOGRAFI
Fed: **teksten**
Kursiv: *teksten*
Gennemstregning: ~~teksten~~
inline-kode: `kode`

LISTER:
- Første punkt
- Andet punkt
  - Indrykket underpunkt

1. Første trin
2. Andet trin
3. Tredje trin

LINKS OG BILLEDER:
[Åbn Google](https://google.com)

![En beskrivelse af billedet](https://example.com/billede.jpg)

CITATER:
Citater starter med >
Horisontal linje laves typisk med ---

> Dette er et citat.

---

KODEBLOKKE:
Brug ``` til større kodestykker.
Angiv evt. sprog efter de tre backticks for farvehjælp.
console.log("Hej, verden!");

TYPISKE REGLER AT HUSKE:
1. Undgå at blande tabs/spatser ukontrolleret i begyndelsen af linjer.
2. Brug tom linje før og efter lister, ellers kan formateringen bryde.
3. Hold filnavn og sti simple, og brug understregning/- i filnavne.
4. Én tom linje holder det meste visuelt ryddeligt.

HURTIGT TJEK:
- H1 til Titel, H2 til kapitler, H3 til underkapitler.
- Brug billeder og links med tydelige tekster.
- Brug kodeblokke til eksempler og kommandoer.
- Brug lister til trin, krav og tjeklister.
-->

# Teknisk dokumentation – Base Fertility Clinic

## Om projektet

I Tema 8 har vi arbejdet med dette projekt. Vi har lavet et dynamisk website med HTML, CSS og JavaScript, hvor indholdet bliver hentet fra et REST API.

Sitet består af flere sider, hvor brugeren kan:

- se en liste med indhold
- klikke sig videre til en detaljeside
- bruge filtrering

---

## Links

- GitHub repository: [https://github.com/frederikkerosenbom/Tema8Projekt](https://github.com/frederikkerosenbom/Tema8Projekt)
- GitHub Pages: [https://frederikkerosenbom.github.io/Tema8Projekt/](https://frederikkerosenbom.github.io/Tema8Projekt/)
- Figma: [https://www.figma.com/design/C4DzQbtH6a2NNR5CheipNq/T8-Team-Projekt?node-id=44-81&t=DiUry6a8DoxgwhRk-1](https://www.figma.com/design/C4DzQbtH6a2NNR5CheipNq/T8-Team-Projekt?node-id=44-81&t=DiUry6a8DoxgwhRk-1)
- Trello: [https://trello.com/b/a6Nd2zu4/t8-projekt](https://trello.com/b/a6Nd2zu4/t8-projekt)

---

## Projektstruktur

Projektet er opdelt i HTML-, CSS- og JavaScript-filer.

```bash
project/
├── index.html
├── donorlist.html
├── donordetail.html
├── form.html
├── css/
│   ├── custom.css
│   ├── donorlist-icons.css
│   ├── donorlist.css
│   ├── fonts.css
│   ├── form.css
│   ├── header_footer.css
│   ├── reset.css
│   └── style.css
├── icons/
│   ├── heartFillIcon.svg
│   ├── heartIcon.svg
│   └── kurvIcon.svg
├── images/
│   └── logo.svg
├── js/
│   ├── donorlist.js
│   ├── donordetail.js
│   ├── burger.js
│   ├── global-storage.js
│   └── form.js
```

---

## Filbeskrivelser

- index.html – forsiden
- donorlist – viser en liste med data fra API'et
- donordetails – viser detaljer om en valgt donor
- form.html – indeholder formularen
- CSS-filer – styrer designet
- JavaScript-filer – styrer det dynamiske indhold på de forskellige sider

---

## Hvordan koden fungerer

Vi har opdelt JavaScript, så hver side har sin egen fil.

### donorlist.js

Henter data fra Rest API'et og viser en liste med personer på siden.

#### Flow:

Siden loader
JavaScript kører
Data hentes fra Rest API
Data bliver gennemgået med loop
HTML bliver indsat i DOM'en
Brugeren kan klikke på en person

### donorlistdetails.js

Bruges til detaljesiden. Den læser et id fra URL'en og henter derefter den person fra Rest API'et.
Det gør det muligt at genbruge den samme HTML-side til mange personer. I stedet for at lave én side per person, bruger vi ét id i URL'en til at vise det rigtige indhold.

### form.js

Styrer formularen og validering af inputfelter.
Denne fil bruges til at sikre, at brugeren udfylder formularen korrekt. Det gør formularen mere brugervenlig og mindsker fejl.

---

## Navngivning

Vi har prøvet at navngive vores filer, variabler og funktioner så tydeligt som muligt.

### Eksempler på varialber

```JS
const tabs = document.querySelectorAll(".tab");
const donorTypeInput = document.querySelector("#donorType")

```

### Eksempler på funktioner

```JS
function getDonors() {
  fetch(listURL)
    .then((res) => res.json())
    .then((data) => {
      allDonors = data.users;
      applyFiltersAndSort();
    });
}

function closeAllPanels() {
  closeLikesPanel();
  closeCartPanel();
}
```

---

## Kommentarer i koden

Vi har kommenteret i koden, så vi nemt og hurtigt kan få overblik i koden. Samt forstå og få overblik i andre gruppemedlemmers kode

```JS
/* ============================================
   HENT DONORS FRA API
============================================ */
function getDonors() {
  fetch(listURL)
    .then((res) => res.json())
    .then((data) => {
      allDonors = data.users;
      applyFiltersAndSort();
    });
}

/* ============================================
   FILTER 1: GENDER FRA FORSIDEN
============================================ */
function applyGenderFilter(users) {
  if (gender === "male") {
    donorlistHeader.textContent = "Sæddonor";
    return users.filter((user) => user.gender === "male");
  }

  if (gender === "female") {
    donorlistHeader.textContent = "Ægdonor";
    return users.filter((user) => user.gender === "female");
  }

  donorlistHeader.textContent = "Alle donorer";
  return users;
}
```

---

## Data og JSON-struktur

Vi henter data fra et API i JSON-format.

Et objekt kan fx se sådan ud:
{ "id": 1,
"firstName": "Emily",
"lastName": "Johnson",
"maidenName": "Smith",
"age": 29,
"gender": "female",
"email": "emily.johnson@x.dummyjson.com",
"phone": "+81 965-431-3024",
"username": "emilys",
"password": "emilyspass",
"birthDate": "1996-5-30",
"image": "https://dummyjson.com/icon/emilys/128",
"bloodGroup": "O-",
"height": 193.24,
"weight": 63.16,
"eyeColor": "Green",
"hair": {
"color": "Brown",
"type": "Curly" },
..........
}

### Felter vi bruger

- id – bruges til at sende brugeren videre til detaljesiden
- gender – bruges til at vide om det er til æg donor siden eller sæd donor siden
- height, eyeColor, hair, image, age, Country - bruges til cards

---

## Formular og validering

Vi har lavet en formular, hvor brugeren kan indtaste oplysninger.

HTML-validering:

- required – feltet skal udfyldes
- type="email" – validerer email-format
- type="number" – accepterer kun tal

## Det sikrer, at brugeren ikke kan sende formularen, hvis felterne ikke er udfyldt korrekt.

## Git og branches

### Eksempler på branches

Vi har brugt GitHub til at samarbejde om projektet, hvor vi har arbejdet med branches, så vi ikke sad og ændrede i det samme på samme tid.
Branchene navngav vi med feature først og navnet på den, der lavede branchen til sidst.

- donorlist-cards-fred
- fonts

### Workflow

1. Lave en branch med feature-navn og eget navn til sidst
2. Kode en feature
3. Commit ændringer
4. Pushe til GitHub
5. Merge til main når det virkede

Det gjorde det nemmere at holde styr på, hvem der lavede hvad.

---

## Bæredygtighed

Vi har tænkt bæredygtighed ind i projektet ved at holde løsningen forholdsvis enkel.

Tiltag:

- Bruge få og lette filer
- Undgå tunge frameworks
- Genbruge kode
- Optimere billeder og indhold
- Bruge drop-in kurv, dropdown menu, drop-in filter, for at holde side antallet nede

Et lettere website kræver færre ressourcer at loade og bruge.

---

## Udfordringer undervejs

### Udfordringer vi oplevede:

- Vi oplevede i starten problemer med at finde den rigtige måde at skrive funktionen på til at hente den rigtige data og billederne

### Løsninger:

- Vi forsøgte os frem og da vi ikke kunne finde frem til det spurgte vi om hjælp fra Karsten, hvor vi sammen fandt den korrekte løsning

---

## Mulige forbedringer

Hvis vi skulle arbejde videre med projektet, kunne vi forbedre det ved at tilføje:

## Gruppemedlemmer

- Isabella
- Sara
- Caroline
- Ella
- Frederikke
