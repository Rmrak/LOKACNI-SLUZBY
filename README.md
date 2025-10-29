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