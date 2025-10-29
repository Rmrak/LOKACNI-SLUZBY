### Project Goal and Requirements

The project assignment is to create a Location-Based Service (LBS) for the citizens of Brno. The goal is to solve a specific problem for them. Based on the application, the chosen problem is finding **safe and cool pedestrian routes**.

The main requirements from the project assignment document are:
*   **Data:** Use at least 5 official city datasets, 3 datasets from other sources, and 3 datasets created by the team.
*   **Application:** A web or mobile application with at least 6 screens, designed for citizens.
*   **Final Deliverables:** The final submission should include an ArcGIS Online map, a web app (potentially built with ArcGIS Experience Builder), a Figma design, and a presentation.

### What Has Been Completed

*   **Functional Web Application:** A web application has been developed (`SafeCoolRoutes_Brno/app/index.html`). It's built with HTML, JavaScript, and the Leaflet.js library for maps.
*   **Core Functionality:** The application allows users to:
    *   Set a start and destination on a map of Brno.
    *   Calculate a route based on three different modes:
        1.  **Shortest:** The most direct path.
        2.  **Safer:** A route that tries to avoid hazards and stay in well-lit areas.
        3.  **More Shade:** A route that prioritizes paths near "cool spots" and greenery.
    *   Toggle the visibility of various data layers on the map (e.g., hazards, cool spots, schools, street lights).
*   **Data Integration:** The project successfully integrates a wide range of datasets as required:
    *   **City Data:** It is configured to load live data for street lights, greenery, pedestrian crossings, and more from Brno's official data portal.
    *   **Team Data:** It uses team-created datasets for `HazardObservations`, `CoolSpots`, and `SchoolEntrances`.
*   **Routing Algorithm:** A routing engine using Dijkstra's algorithm is implemented in JavaScript to find the best path through a pre-defined grid network of Brno (`Graph_Grid_Brno.json`).

### What Is Missing or Incomplete

*   **Deviation from Required Technology:** The biggest gap is the technology used. The assignment specifies using **ArcGIS Online** and **Experience Builder** for the final web application, but the current implementation is a custom application using **Leaflet.js**.
*   **Figma Design & Presentation:** There are no Figma design files or a final PowerPoint presentation in the repository, which are listed as required deliverables.
*   **"6 Screens" Requirement:** The application is a single-page interface. While it's interactive, it may not meet the "at least 6 screens" requirement, depending on how strictly that is interpreted.
*   **Data Accuracy Issue:** A document in the project (`teamData.md`) notes that the team's initial data for school entrances was inaccurate. A file named `SchoolEntrances_Brno_corrected.geojson` exists, but the application is still using the original, potentially inaccurate `SchoolEntrances_Brno.geojson` file.

### Overall Summary

The project is a strong proof-of-concept that successfully tackles the problem of finding better pedestrian routes in Brno. The web application is functional and demonstrates a good understanding of geospatial data and routing algorithms.

However, it does not currently meet several key requirements for the final submission, most notably the use of ArcGIS technologies. The project is in a good state as a custom-built prototype, but it would require significant changes to align with the final deliverables specified in the project assignment.
