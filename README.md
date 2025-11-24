# Safe and Cool Routes in Brno

This project focuses on identifying safe and cool routes within the city of Brno. It utilizes various geospatial datasets to analyze and visualize factors that contribute to pedestrian safety and comfort, such as noise levels, tree coverage, and the location of streetlights.

## Datasets

The project incorporates a variety of datasets in GeoJSON and Shapefile formats, including:

*   **Cool Spots:** Locations identified as being cool, likely due to shade or other environmental factors.
*   **Graph Grid:** A grid-based graph of the city, likely used for routing calculations.
*   **Hazard Observations:** Reports of potential hazards for pedestrians.
*   **School Entrances:** The locations of school entrances.
*   **Sidewalks:** The network of sidewalks in Brno.
*   **Pedestrian Crossings:** The locations of pedestrian crossings.
*   **Street Lights:** The locations of street lights.
*   **Trees and Shrubs:** The locations of trees and shrubs, which can provide shade.
*   **Noise Levels:** Noise level data for different areas of the city.

## Project Structure

The repository is organized as follows:

*   `geojson 5 brno.data/`: Contains datasets in GeoJSON format.
*   `shapefile 5 brno.data/`: Contains datasets in Shapefile format.
*   `SafeCoolRoutes_Brno/app/`: Contains a web-based application for visualizing the data and routes.
*   `team data 3 + manual/`: Contains data from the team, including corrected school entrance data.

## Usage

The `SafeCoolRoutes_Brno/app/` directory contains a web application for exploring the data. Open the `index.html` file in a web browser to view the application.


Zde je váš návod převedený do přehledného a formátovaného Markdownu. Je strukturovaný tak, abyste mohli postupovat bod po bodu.

---

# 🗺️ Průvodce projektem: Safe & Cool Routes v Brně
**Technologie:** ArcGIS Online + ArcGIS Experience Builder

> **Důležité upozornění:** Pro tento postup je nutné mít **školní organizational účet** ArcGIS Online. S veřejným (public) účtem nelze publikovat hostované feature vrstvy, které jsou pro tento projekt klíčové.

---

## 0) Co budete potřebovat
Pro splnění zadání si připravte:
* **ArcGIS Online:** Zde nahrajete shapefily, vytvoříte týmová data a sestavíte Web Mapu.
* **ArcGIS Experience Builder (Online):** Nástroj pro tvorbu finální webové aplikace (využijete online verzi integrovanou v ArcGIS, nic neinstalujete).
* **(Volitelně) ArcGIS Pro:** Desktopový software. Pro toto zadání není nezbytný, vše zvládnete v prohlížeči.

---

## 1) Přístup k ArcGIS (Online vs. Desktop)

### 1.1 ArcGIS Online (Nutné)
1.  Zjistěte své **školní přihlašovací údaje** (často SSO nebo `jmeno.prijmeni@skola...`).
2.  Jděte na **[arcgis.com](https://www.arcgis.com)** nebo přímo na portál vaší organizace (např. `https://mendelu.maps.arcgis.com`).
3.  Přihlaste se.
    * *Poznámka:* Musíte být "Member of an organization", abyste mohli tvořit hostované vrstvy.

### 1.2 ArcGIS Pro (Volitelné)
Pokud preferujete práci na desktopu:
1.  V ArcGIS Online klikněte vpravo nahoře na **Profil > My settings / Nastavení**.
2.  Jděte do sekce **Licenses**. Pokud zde vidíte licenci pro ArcGIS Pro, můžete si ho stáhnout.
3.  Stáhněte, nainstalujte a přihlaste se stejným účtem jako do Online verze.

---

## 2) Nahrání Shapefile do ArcGIS Online
Máte složky se soubory (chodníky, veřejné osvětlení, atd.) a potřebujete z nich udělat online vrstvy.

### 2.1 Příprava dat (Zabalení do ZIP)
Pro každý dataset (např. `prechody`):
1.  Ujistěte se, že máte tyto soubory: `*.shp`, `*.shx`, `*.dbf` (ideálně i `*.prj`).
2.  Vyberte tyto soubory a zabalte je do **ZIP archivu**.
    * ⚠️ **Pozor:** Soubory musí být přímo v "kořeni" ZIPu, nesmí být uvnitř další složky.

### 2.2 Publikace jako Hosted Feature Layer
1.  V ArcGIS Online klikněte na **Content (Obsah) > My content**.
2.  Klikněte na **New item → Your device**.
3.  Vyberte připravený ZIP soubor.
4.  V dialogovém okně:
    * Zkontrolujte, zda je typ nastaven na **Shapefile**.
    * ✅ **Nutné:** Zaškrtněte volbu **Add and create a hosted feature layer** (pokud jen přidáte soubor, nepůjde zobrazit v mapě).
5.  Klikněte **Next** a vyplňte:
    * **Title:** např. `Brno_PedestrianCrossings`
    * **Tags:** např. `Brno`, `LBS`, `crossings`
6.  Klikněte **Save / Publish**.

> **Výsledek:** V *My content* uvidíte dva itemy: samotný *Shapefile* (zdroj) a **Feature Layer (hosted)**. Tu druhou budete používat.
> *Tento postup opakujte pro všechny vaše shapefily (chodníky, stromy, VO...).*

---

## 3) Vytvoření editovatelných "týmových" vrstev
Pro data, která budete tvořit sami (rizika, cool spots), si vytvořte prázdné vrstvy.

### 3.1 Založení prázdné vrstvy
1.  V *Content* klikněte na **New item → Feature layer → Define your own layer**.
2.  Vyberte typ geometrie (pro hazardy a vstupy většinou **Points**).
3.  Nastavte atributy (Fields). Pro hazardy například:
    * `type` (Text) – typ rizika
    * `severity` (Integer) – závažnost (1-5)
    * `description` (Text) – popis
4.  Pojmenujte vrstvu (např. `HazardObservations_Brno`) a uložte.

### 3.2 Ruční naplnění dat (Editace)
1.  Otevřete novou vrstvu a klikněte na **Open in Map Viewer**.
2.  V pravém panelu (nebo nahoře) aktivujte **Edit** (ikona tužky).
3.  Klikáním do mapy přidávejte body a vyplňujte jejich atributy.
4.  Průběžně ukládejte (**Save**).

---

## 4) Sestavení Webové Mapy (Web Map)
Toto je "lepidlo", které spojí všechny vrstvy dohromady před vložením do aplikace.

1.  Otevřete **Map Viewer**.
2.  Vlevo klikněte na **Add > Browse layers**.
3.  Přidejte:
    * Všechny vrstvy ze shapefilů (chodníky, zeleň...).
    * Všechny týmové vrstvy (hazardy, cool spots).
4.  **Styling:** Nastavte barvy, symboly a vyskakovací okna (Pop-ups).
5.  Uložte mapu: **Save as** → např. `SafeCoolRoutes - Brno (WebMap)`.
6.  **Sdílení:** Klikněte na **Share** a nastavte minimálně *Organization* (nebo *Everyone*, pokud má být veřejná).

---

## 5) Tvorba aplikace v ArcGIS Experience Builder


### 5.1 Založení Experience
1.  V ArcGIS Online klikněte na ikonu 9 teček (vpravo nahoře) a vyberte **Experience Builder**.
2.  Klikněte na **Create new**.
3.  Vyberte šablonu: Doporučuji **Blank full-screen** nebo šablonu s postranním panelem (Foldable).

### 5.2 Připojení dat
1.  V levém panelu klikněte na záložku **Data**.
2.  Klikněte na **Add data** a vyberte vaši mapu `SafeCoolRoutes - Brno (WebMap)`.

### 5.3 Konfigurace Map Widgetu
1.  Přetáhněte widget **Map** na plátno.
2.  Vpravo v nastavení vyberte vaši mapu.
3.  Zapněte nástroje mapy: *Zoom, Home, Search, Legend, Layer List*.

### 5.4 Struktura aplikace (6 screenů)
Místo vytváření 6 samostatných webových stránek použijte widget **Views Navigation** nebo **Section**:
* **View 1:** Úvod / Home.
* **View 2:** Mapa + "Nejkratší trasa".
* **View 3:** Mapa + "Bezpečná trasa" (využijte widget *Filter* pro zobrazení jen bezpečných prvků).
* **View 4:** Mapa + "Cool trasa" (zobrazení zeleně a stínu).
* **View 5:** Datové vrstvy (Layer list).
* **View 6:** O týmu / Metodika.

### 5.5 Publikace
1.  Klikněte na **Live view** (ikona oka) pro otestování.
2.  Pokud vše funguje, klikněte na **Publish**.
3.  Nastavte sdílení (Share) finální aplikace stejně jako u mapy.

---

## 6) (Volitelné) Úpravy v ArcGIS Pro
Pokud potřebujete pokročilou editaci:
1.  V ArcGIS Pro: **Insert > Connections > Add Folder** (připojení shapefilů).
2.  Upravte data v mapě.
3.  Pro nahrání na Online: **Share > Web Layer > Publish Web Layer**.

---

### Co mohu udělat pro vás nyní?
**Chcete navrhnout konkrétní rozvržení těch 6 obrazovek (Views) pro Experience Builder?** Mohu vám přesně sepsat, jaké widgety (Filter, Text, Legend) dát na kterou obrazovku, abyste splnili logiku "bezpečná" vs. "chladná" trasa.
