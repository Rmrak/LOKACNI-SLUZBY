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



Začnu rovnou konkrétním postupem, krok po kroku, ať to podle toho můžete klikat. Budu předpokládat, že máte školní organizational účet ArcGIS Online (ne veřejný / „public“). Bez něj nejde publikovat shapefily jako hosted vrstvy. 
ArcGIS
+2
ArcGIS
+2

0) Co vlastně potřebujete

Pro vaše zadání („Safe & Cool Routes v Brně“ – bezpečné a chladné pěší trasy) budete potřebovat: 

summary

ArcGIS Online – nahrajete shapefily, vytvoříte týmová data a webovou mapu.

ArcGIS Experience Builder (online) – z webové mapy uděláte finální webovou appku.

(Volitelně) ArcGIS Pro – pokud chcete data víc upravovat na desktopu, ale není nutné, shapefily můžete publikovat přímo z ArcGIS Online.

1) Jak se dostat k ArcGIS (ArcGIS Online + případně ArcGIS Pro)
1.1 ArcGIS Online

Zjistěte u školy, jaký máte organizational login (často něco jako jmeno.prijmeni@… + přihlášení přes školní SSO).

Jděte na: https://www.arcgis.com nebo rovnou portál vaší organizace (často https://<nazev>.maps.arcgis.com).

Přihlaste se jako organizational account (ne public/free). Jen organizational účet může publikovat hosted feature layers. 
support.esri.com

Tím máte webové prostředí připravené.

1.2 (Volitelné) Stažení ArcGIS Pro

Pokud chcete desktop:

Vpravo nahoře klik na profil > My settings / Nastavení.

Sekce Licenses – uvidíte, jestli máte ArcGIS Pro přidělené.

Tam bývá tlačítko Download ArcGIS Pro – stáhnout, nainstalovat, přihlásit se stejným účtem jako do ArcGIS Online.
(Když tam Pro nevidíte, musíte poprosit správce / vyučujícího, aby vám ho přiřadil.)

Ale dobrá zpráva: na vaše zadání vystačíte jen s ArcGIS Online, není nutné Pro.

2) Přidání shapefile do ArcGIS Online (bez desktopu)

Máte složky se shapefily (např. přechody, chodníky, VO atd.). Cíl: z každého udělat hostovanou feature vrstvu.

2.1 Připrav shapefile

Pro každý dataset:

Ujistěte se, že máte minimálně soubory:
*.shp, *.shx, *.dbf, ideálně i *.prj. 
ArcGIS

Všechny soubory zabal do ZIP.

Pozor: soubory musí být v kořeni ZIPu, ne ve vnořeném adresáři (tj. uvnitř ZIPu hned data.shp, ne brno/data.shp). 
ArcGIS

2.2 Nahrání shapefile jako hosted feature layer

V ArcGIS Online klikni nahoře na Content / Obsah.

Záložka My content.

Klikni New item → Your device.

Vyber ten ZIP se shapefile.

V dialogu zkontroluj:

typ je Shapefile,

zaškrtni volbu Add and create a hosted feature layer (ne jen přidat soubor). 
ArcGIS
+1

Dej Next, vyplň:

název vrstvy (např. Brno_PedestrianCrossings),

složku,

tags (např. Brno, LBS, crossings),

krátký popis.

Klikni Save / Publish.

Výsledek:

v My content uvidíš dva itemy:

shapefile (soubor),

Feature Layer (hosted) – tu budete používat v mapě + Experience Builderu. 
learn.arcgis.com

Totéž zopakuj pro všechny shapefily (chodníky, VO, stromy, přechody…).

3) Vytvoření týmových vrstev (ručně editovatelných)

Týmová data (hazardy, cool spots, vstupy do škol) si můžete v ArcGIS Online vytvořit jako prázdné hosted feature vrsty a pak je vyklikat v mapě.

3.1 Vytvoření prázdné feature vrstvy

Content > My content > New item.

Místo „Your device“ vyber Feature layer → Define your own layer nebo šablonu „Points“. 
ArcGIS

Vyber typ geometrie:

Points pro hazardy, cool spots, školní vchody.

Nastav prostorový rozsah (extent) na oblast Brna.

V dalším kroku přidej atributy (fields), např.:

type (Text) – typ rizika / typu cool spotu,

severity (Integer) – závažnost,

shade_quality (Integer) – kvalita stínu,

school_name (Text) – název školy.

Pojmenuj vrstvy např.:

HazardObservations_Brno,

CoolSpots_Brno,

SchoolEntrances_Brno.

Po uložení máš prázdné hosted vrstvy připravené k editaci.

3.2 Ruční editace v Map Vieweru

Na item page vrstvy klikni Open in Map Viewer.

Vpravo nebo nahoře zapni Edit (ikona tužky).

Přímo v mapě klikáním přidávej body, vyplňuj atributy v panelu vpravo.

Nezapomeň Save.

Takhle si ručně naklikáte týmová data – přesně to, co píšete, že zvládnete.

4) Sestavení webové mapy (podklad pro Experience Builder)

Teď dáte všechny vrstvy dohromady.

Otevři Map Viewer (tlačítko „Map“ nebo „Map viewer“ v horním menu).

Vlevo klikni Add > Browse layers.

Vyber:

hostované vrstvy ze shapefilů (chodníky, přechody, VO, zeleň…),

týmové vrstvy (HazardObservations_Brno, CoolSpots_Brno, SchoolEntrances_Brno).

Nastav stylování:

barvy a symboly (např. hazardy červeně, cool spots modře, školy ikonka 🏫),

pop-upy (co se zobrazí po kliknutí na prvek).

Nastav výchozí zoom na Brno.

Klikni Save > Save as:

název třeba SafeCoolRoutes - Brno (WebMap),

krátký popis.

Na stránce mapy klikni Share:

minimálně Organization (ať to vidí vyučující),

případně Everyone (public) pokud má být appka veřejná.

Tato webová mapa bude zdroj pro Experience Builder (Map widget používá web map/web scene jako data source). 
ArcGIS
+1

5) Zprovoznění ArcGIS Experience Builder (online)

Experience Builder je součást ArcGIS Online, online verze má nejnovější funkce a nic se neinstaluje. Developer Edition (ke stažení) je hlavně na custom widgety / vlastní server – na projekt ho nepotřebujete. 
ArcGIS
+2
ArcGIS
+2

5.1 Otevření Experience Builderu

V ArcGIS Online klikni na „waffle“ (App Launcher – 9 teček) vpravo nahoře.

Najdi Experience Builder a otevři ho (většinou se otevře nové okno).

5.2 Vytvoření nové „Experience“

Klikni Create new.

Vyber šablonu:

pro projekt doporučuju Blank full-screen nebo nějaký dvousloupcový layout (mapa + panel).

Šablonu otevři → dostaneš se do „builder“ prostředí.

5.3 Přidání dat (web mapy)

V levém panelu najdi záložku Data.

Klikni Add data → Add data from ArcGIS.

Najdi svou web mapu SafeCoolRoutes - Brno (WebMap) a přidej ji.

5.4 Map widget (hlavní mapa)

V levém panelu Widgets přetáhni na plátno widget Map.

Vpravo se otevře nastavení mapy:

Select map → vyber svou web mapu.

Initial view → dej buď default z mapy, nebo nastav custom zoom na Brno. 
ArcGIS
+1

Zapni v Map widgetu nástroje:

Zoom, Home, Search (vyhledávání adres), Legend, Layer list, Measure – podle potřeby.

5.5 „Obrazovky“ / „sezony“ pro těch 6 screenů

Potřebujete min. 6 „bildovek“ pro zadání:

V panelu Outline / Pages:

Můžete mít více Pages, nebo

jednu Page a v ní widget Section / Views Navigation s více „views“ (každý view = jiný „screen“).

Typické dělení:

View 1: Úvod (co aplikace dělá).

View 2: Mapa + vysvětlení „Nejkratší trasa“.

View 3: Mapa + „Bezpečnější“ trasa (filtrování / přepínání vrstev).

View 4: Mapa + „Více ve stínu“.

View 5: Vrstvy & data – krátký popis použitých datasetů.

View 6: O týmu / metodice / omezeních.

Každý view může mít textové widgety, tlačítka a stejnou mapu (jen jinak nakonfigurované widgety / filtry).

5.6 Další užitečné widgety

Legend – legenda vrstev z mapy.

Layer List – možnost zapínat / vypínat jednotlivé vrstvy (chodníky, hazardy, VO, zeleň…).

Filter – např. filtrovat hazardy podle závažnosti, cool spots podle kvality stínu.

Info / Text – vysvětlení, návod, popis projektu.

Widgety můžete propojovat přes Actions (např. klik na prvek v mapě → zobrazí detail ve widgetu Feature Info).

5.7 Test a publikace

Vpravo nahoře klikni na Live view – otestuj aplikaci (zoom, vrstvy, filtry).

Pokud vše vypadá OK, klikni Publish.

Až se publikuje, máš tlačítko View / Open – tím se otevře finální URL.

U aplikace klikni Share:

nastav Organization nebo Everyone (public) podle zadání.

Tento odkaz pak dáte do odevzdání (spolu s mapou, popisem, prezentací atd.).

6) (Volitelné) Když chceš upravovat data v ArcGIS Pro

Pokud byste někdy potřebovali víc pokročilé úpravy:

V ArcGIS Pro:

New Project → Map.

V tlačítku Insert > Connections > Add Folder připoj složku se shapefily.

Přetáhni shapefily do mapy.

Po úpravách:

Share > Web Layer > Publish Web Layer, typ: Feature,

cílový portál = váš ArcGIS Online,

po publish se vytvoří hosted feature layer viditelná v ArcGIS Online.

Ale pro váš aktuální projekt klidně zůstaňte čistě v ArcGIS Online + Experience Builderu a máte splněné technologie ze zadání. 

summary

Pokud chcete, v dalším kroku vám můžu navrhnout konkrétní strukturu těch 6 screenů (co kam napsat, jaké widgety použít pro „bezpečnější“ vs. „víc ve stínu“ trasy) přímo podle vašich vrstev
