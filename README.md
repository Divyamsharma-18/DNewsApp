<div align="center">
  <a href="https://its-dnewsapp.netlify.app/">
    <img src="https://cdn-icons-png.flaticon.com/512/2965/2965879.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">DNewsApp</h3>

  <p align="center">
    A next-generation news aggregator built for speed, clarity, and global reach.
    <br />
    <a href="https://its-dnewsapp.netlify.app/"><strong>Explore the Live Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Divyamsharma-18/DNewsApp/issues">Report Bug</a>
    ·
    <a href="https://github.com/Divyamsharma-18/DNewsApp/issues">Request Feature</a>
  </p>
</div>

<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

</div>

---

## 📋 Table of Contents

1. [About The Project](#about-the-project)
2. [Key Features](#key-features)
3. [Technical Architecture](#technical-architecture)
4. [Getting Started](#getting-started)
5. [Roadmap](#roadmap)
6. [Contact](#contact)

---

## ⚡ About The Project

**DNewsApp** redefines how users consume daily information. Moving away from cluttered, ad-heavy news sites, this application provides a minimalist, focus-driven interface that aggregates headlines from the world's most trusted sources.

Built with the **T3 stack philosophy** in mind (Type-Safe, Performant), DNewsApp ensures that staying updated is seamless, whether you are reading in **English** or **German**.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **🌍 Multi-Language Support** | **New:** Toggle instantly between English and German content streams for a localized reading experience. |
| **🔥 Real-Time Feeds** | Instant integration with NewsAPI to fetch breaking news as it happens. |
| **📱 Adaptive UI** | A "Glassmorphism" inspired design that adapts perfectly to any screen size using Tailwind CSS. |
| **⚡ Blazing Fast** | Powered by Vite, ensuring near-instant load times and HMR (Hot Module Replacement). |
| **🗂 Smart Categories** | Filter effortlessly between Tech, Business, Sports, Health, and Entertainment. |

---

## 🏗 Technical Architecture

The project is structured to ensure scalability and maintainability.

```bash
DNewsApp/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components (Navbar, NewsCard, Spinner)
│   ├── assets/          # Images and global styles
│   ├── App.tsx          # Main Layout & Routing Logic
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # TypeScript declarations
├── tailwind.config.ts   # Design token configuration
└── package.json         # Dependency manifest
````

-----

## 🛠️ Getting Started

Follow these steps to set up the environment locally.

### Prerequisites

  * **Node.js** (v16+) or **Bun** (v1.0+)
  * **NewsAPI Key** (Get it for free at [newsapi.org](https://newsapi.org))

### Installation

1.  **Clone the Repo**

    ```sh
    git clone [https://github.com/Divyamsharma-18/DNewsApp.git](https://github.com/Divyamsharma-18/DNewsApp.git)
    ```

2.  **Install Dependencies** (I recommend using Bun for speed)

    ```sh
    cd DNewsApp
    bun install 
    # or npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:

    ```env
    VITE_NEWS_API_KEY=your_secret_key_here
    ```

4.  **Ignition**

    ```sh
    bun dev
    # or npm run dev
    ```

-----

## 🔮 Roadmap & Future Improvements

  - [ ] **Expanded Localization**: Add support for Spanish and French news sources.
  - [ ] **Dark Mode Toggle**: Implement system-preference detection for dark mode.
  - [ ] **Search Functionality**: Allow users to search for specific keywords or topics.
  - [ ] **Bookmarks**: Use LocalStorage to save "Read Later" articles.

-----

## 📞 Contact

**Divyam Sharma**

* **GitHub:** [@Divyamsharma-18](https://github.com/Divyamsharma-18)
* **Project Link:** [https://github.com/Divyamsharma-18/DNewsApp](https://github.com/Divyamsharma-18/DNewsApp)

<div align="center">
  <h4>Built with ❤️ by Divyam Sharma</h4>
</div>

<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/e4036dde-3aca-448e-94cb-cd7440886d86" />

<div align="center">
  <h2>German Version</h2>
</div>

<img width="1919" height="1076" alt="Image" src="https://github.com/user-attachments/assets/07200d3e-5a0b-450b-95bd-e3003dad2efa" />
