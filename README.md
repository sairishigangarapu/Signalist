# 📈 Signalist

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38b2ac?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **A high-performance financial analytics dashboard leveraging the Next.js 15 App Router and React Server Components (RSC) for sub-second data visualization.**

---

## 🏗 System Architecture

Signalist is built on a **modern hybrid architecture**, utilizing Server-Side Rendering (SSR) for initial layout delivery and Client-Side rendering for real-time market data ingestion.

```mermaid
graph TD
    User[User Client] -->|HTTP Request| CDN[Vercel Edge Network]
    CDN -->|Cached Static Assets| User
    CDN -->|Server Request| AppServer[Next.js 15 App Server]
    
    subgraph "Server Layer (RSC)"
        AppServer -->|Hydration| Layout[Root Layout]
        AppServer -->|SSR| Metadata[SEO & Meta Tags]
    end

    subgraph "Client Layer (Interactive)"
        Layout -->|Render| Dashboard[Dashboard UI]
        Dashboard -->|Fetch| MarketAPI[Market Data Provider]
        MarketAPI -->|Stream| Ingest[Data Ingestion Engine]
        Ingest -->|State Update| GlobalState[React State / Store]
        GlobalState -->|Re-render| Charts[Recharts / Visuals]
        GlobalState -->|Log| ActivityLog[System Event Log]
    end
