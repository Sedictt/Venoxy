// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Joseph Venedict G. Tillo",
  title: "Joseph Venedict G. Tillo - CV",
  footer: context { [#emph[Joseph Venedict G. Tillo -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in May 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "us-letter",
  page-top-margin: 0.6in,
  page-bottom-margin: 0.6in,
  page-left-margin: 0.6in,
  page-right-margin: 0.6in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 79, 144),
  colors-headline: rgb(0, 79, 144),
  colors-connections: rgb(0, 79, 144),
  colors-section-titles: rgb(0, 79, 144),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.56em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Raleway",
  typography-font-family-name: "Raleway",
  typography-font-family-headline: "Raleway",
  typography-font-family-connections: "Raleway",
  typography-font-family-section-titles: "Raleway",
  typography-font-size-body: 9.5pt,
  typography-font-size-name: 29pt,
  typography-font-size-headline: 9.5pt,
  typography-font-size-connections: 9.5pt,
  typography-font-size-section-titles: 1.4em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: false,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: false,
  links-underline: false,
  links-show-external-link-icon: false,
  header-alignment: left,
  header-photo-width: 3.2cm,
  header-space-below-name: 0.5cm,
  header-space-below-headline: 0.4cm,
  header-space-below-connections: 0.4cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.4cm,
  section-titles-space-below: 0.25cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.25em,
  sections-space-between-regular-entries: 0.95em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.15cm,
  entries-space-between-columns: 0.09cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0.08cm,
  entries-highlights-bullet:  "•" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0cm,
  entries-highlights-space-above: 0.08cm,
  entries-highlights-space-between-items: 0.08cm,
  entries-highlights-space-between-bullet-and-text: 0.4em,
  date: datetime(
    year: 2026,
    month: 5,
    day: 27,
  ),
)


= Joseph Venedict G. Tillo

  #headline([Multimedia Intern])

#connections(
  [#connection-with-icon("location-dot")[Valenzuela City, Philippines]],
  [#link("mailto:jvtillo10@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[jvtillo10\@gmail.com]]],
  [#link("tel:+63-991-348-7293", icon: false, if-underline: false, if-color: false)[#connection-with-icon("phone")[0991 348 7293]]],
  [#link("https://venoxy.vercel.app/", icon: false, if-underline: false, if-color: false)[#connection-with-icon("link")[venoxy.vercel.app]]],
  [#link("https://linkedin.com/in/joseph-venedict-tillo-322213398", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[joseph-venedict-tillo-322213398]]],
)


== Summary

Creative and detail-oriented Information Technology student with a strong background in graphic design, visual communication, and digital media production. Experienced in designing broadcast overlays, event graphics, and promotional materials for live events, as well as game art, short film production, and web UI\/UX. Adept at translating concepts into compelling visuals using Adobe Creative Suite, Canva, and other design tools. Seeking a graphic design internship to apply and grow creative skills in a professional environment.

== Experience

#regular-entry(
  [
    #strong[Graphics and Broadcast Designer], Gamecon Esports - Itlympics 2026

  ],
  [
    Jan 2026

  ],
  main-column-second-row: [
    - Designed broadcast overlays, event banners, tickets, and promotional graphics for a school-wide esports event.

    - Assisted in live event broadcasting production, ensuring visual consistency across all broadcast materials.

  ],
)

#regular-entry(
  [
    #strong[Game Developer and Game Artist], Rise of the Bakunawa - Itlympics 2026

  ],
  [
    Jan 2026

  ],
  main-column-second-row: [
    - Designed and created all game art assets including character sprites, backgrounds, and UI elements.

    - Contributed to game development and mechanics; won the People's Choice Award at Gamecon.

  ],
)

#regular-entry(
  [
    #strong[Web Developer], iReside Property Management System - PLV Capstone Project

  ],
  [
    Jan 2026 - present

  ],
  main-column-second-row: [
    - Developing a full-stack property and tenant services management platform for Valenzuela City landlords.

    - Responsible for frontend design and UI\/UX implementation using Next.js, React, and Tailwind CSS.

  ],
)

#regular-entry(
  [
    #strong[Web Developer], it's ouR Studio

  ],
  [
    Jan 2025 - Jan 2026

  ],
  main-column-second-row: [
    - Designed and developed a fully functional business website currently in active use by the client.

  ],
)

#regular-entry(
  [
    #strong[Co-Director and Cinematographer], Identity: 404 Not Found - Short Film (IT Film Fest 2025)

  ],
  [
    Jan 2025

  ],
  main-column-second-row: [
    - Co-directed and co-wrote the story and screenplay for a short film that won 2nd Place.

    - Handled all videography and cinematography duties throughout production.

  ],
)

#regular-entry(
  [
    #strong[Film Director and Cinematographer], Our Hands - Short Film

  ],
  [
    Jan 2024

  ],
  main-column-second-row: [
    - Served as director, scriptwriter, storyboard artist, videographer, and editor for the entire production.

  ],
)

== Education

#education-entry(
  [
    #strong[Pamantasan ng Lungsod ng Valenzuela], BS in Information Technology

  ],
  [
    Jan 2023 - present

  ],
  main-column-second-row: [
  ],
)

#education-entry(
  [
    #strong[Datamex College of Saint Adeline], ICT Track

  ],
  [
    Jan 2021 - Jan 2023

  ],
  main-column-second-row: [
  ],
)

#education-entry(
  [
    #strong[Malinta National High School], Junior High School

  ],
  [
    Jan 2017 - Jan 2021

  ],
  main-column-second-row: [
  ],
)

== Skills

#strong[Design and Visual:] Graphic Design, UI\/UX Design, Digital Art, Traditional Art, Storyboarding, Photography, Cinematography

#strong[Tools and Software:] Adobe Creative Suite (Photoshop, Illustrator, Premiere Pro), Canva, Video Editing Software

#strong[Technical:] Web Development, Next.js, React, TypeScript, Tailwind CSS
