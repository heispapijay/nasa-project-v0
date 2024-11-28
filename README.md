<div align="center">
  <br />
   <h1 align="center">NASA Image and Video Search App</h3>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="Vite" />
  </div>

  <div align="center">
    Discover NASA's rich collection of images and videos. Built using React, TypeScript, and Tailwind CSS.
  </div>
</div>

---

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. ⏩ [start](#start)
5. 🔗 [Snippets](#snippets)
6. 🚀 [Future Enhancement](#future-enhancement)

---

## <a name=introduction>🤖 Introduction</a>

This is a web application that enables users to search through NASA's images, videos and podcast audios. The app has features like filtering, pagination, and detailed views of assets, making it easier to explore and discover NASA's assets.

The app emphasizes simplicity and responsiveness, with modern design patterns and robust functionality. 

---

## <a name=tech-stack>⚙️ Tech Stack</a>

- **React**: For building a dynamic and interactive UI.
- **TypeScript**: Ensures type safety and maintainable code.
- **Tailwind CSS**: Simplifies styling with a utility-first CSS framework.
- **Vite**: A fast build tool for optimized development.
- **Jest**: For Testing along side react testing library.

---

## <a name=features>🔋 Features</a>

👉 **Search Functionality**:  
  - Search for images and videos using keywords.  
  - Trigger searches via button click or pressing the Enter key.

👉 **Dynamic Item Cards**:  
  - Displays:
    - A thumbnail (with a default placeholder if unavailable).
    - The title of the media (truncated to fit one line).
    - A badge indicating the media type (Image or Video).  
  - Cards are clickable and navigate to a detailed view.

👉 **Pagination and Filtering**:  
  - Browse through large datasets with pagination.
  - Apply filters to narrow down search results.

👉 **Detailed View**:  
  - View comprehensive information about a selected item.

👉 **Modern UI**:  
  - Responsive and clean design with Tailwind CSS.
  
  and many more, including the latest React features alongside code architecture and reusability

---

## <a name=start>⏩Start</a>

Follow these steps to set up the project locally.

### Prerequisites

- Node.js
- npm or yarn
- Git

### Steps

**Clone the repository**
   ```bash
   git clone https://github.com/heispapijay/nasa-project.git
   cd nasa-project
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NASA_API_KEY=
```
Add the api key you get from [NASA website](https://api.nasa.gov/). website to the `.env` file to be able to use.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

**File Structure**

```typescript
src/
├── components/
│   ├── Button/Button.tsx
│   ├── Filter/Filter.tsx 
│   ├── ItemCard/ItemCard.tsx
│   ├── InputField/InputField.tsx
│   ├── Header.tsx
├── pages/
│   ├── Home
│   ├── SingleDetail
├── services/
│   ├── api.ts
├── App.tsx                       # Root app component
├── main.tsx                      # Entry point for the application
```

## <a name=snippets>🕸️ Snippets</a>

<details>
<summary><code>api.ts</code></summary>

```typescript
import axios from "axios";

const BASE_URL = "https://images-api.nasa.gov/";


export interface MediaAssets {
  data: {
    title: string;
    description: string;
    nasa_id: string;
    media_type: string;
  }[];
  links: { href: string }[];
  href?: string;
}

export interface AssetDetails {
  title: string;
  description: string;
  nasa_id: string;
  media_type: string;
  thumbnail?: string;
  mediaUrls: string[];
}

export const searchAssets = async (
  query: string,
  filter: "image" | "video" | "audio" | "all" = "all"
): Promise<MediaAssets[]> => {
  try {
    const params: { q: string; media_type: string } = {
      q: query,
      media_type: filter === "all" ? "image,video,audio" : filter,
    };

    const response = await axios.get(`${BASE_URL}search`, { params });
    return response.data.collection.items;
  } catch (error) {
    console.error("Error fetching data from NASA API:", error);
    throw new Error("Failed to fetch search results. Please try again.");
  }
};

export const getAssetDetails = async (nasaId: string): Promise<AssetDetails> => {
  try {
    // start by fetching the asset search results
    const searchResponse = await axios.get(`${BASE_URL}search`, {
      params: {
        nasa_id: nasaId,
      },
    });

    const searchItem = searchResponse.data.collection.items[0];

    if (!searchItem) {
      throw new Error(`No asset found in: ${nasaId}`);
    }
    const thumbnail = searchItem.links?.[0]?.href;

    // then, get the asset manifest
    const manifestResponse = await axios.get(`${BASE_URL}asset/${nasaId}`);

    // extract media URLs from the manifest
    const mediaUrls = manifestResponse.data.collection.items.map(
      (item: { href: string }) => item.href
    );

    return {
      title: searchItem.data[0].title,
      description: searchItem.data[0].description,
      nasa_id: searchItem.data[0].nasa_id,
      media_type: searchItem.data[0].media_type,
      thumbnail,
      mediaUrls: mediaUrls,
    };
  } catch (error) {
    console.error("Error fetching asset details:", error);
    throw error;
  }
};
```
</details>

<details>
<summary><code>Layout.tsx for main App</code></summary>

```typescript
import React, { useEffect, useRef } from "react";
import sphere1 from "./assets/1.png";
import sphere2 from "./assets/2.png";
import sphere3 from "./assets/3.png";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const trackerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const moveElements = (e: MouseEvent) => {
      const shapes = document.querySelectorAll<HTMLImageElement>(".shape");
      const tracker = trackerRef.current;

      if (tracker) {
        tracker.style.top = `${e.clientY}px`;
        tracker.style.left = `${e.clientX}px`;
        tracker.style.opacity = "1";
      }

      shapes.forEach((shape) => {
        const shapeOffset = parseFloat(
          shape.getAttribute("data-offset") || "0"
        );

        const offsetX = (window.innerWidth - e.clientX) * shapeOffset;
        const offsetY = (window.innerHeight - e.clientY) * shapeOffset;

        shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`; 
      });
    };

    document.addEventListener("mousemove", moveElements);

    return () => {
      document.removeEventListener("mousemove", moveElements);
    };
  }, []);

  return (
    <div className="relative min-h-screen showcase">
      <div className="border-box"></div>
      <div className="border-box-2"></div>
      {children}
      <img
        src={sphere1}
        alt=""
        className="shape has-in-common sm-hidden"
        data-offset=".05"
      />
      <img
        src={sphere2}
        alt=""
        className="shape shape-md has-in-common sm-hidden"
        data-offset=".025"
      />
      <img
        src={sphere3}
        alt=""
        className="shape shape-lg has-in-common sm-hidden"
        data-offset=".02"
      />
    </div>
  );
};
```
</details>

<details>
<summary><code>Search and Pagination</code></summary>

```typescript
 const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const assets = await searchAssets(query, filter);
      setResults(assets);
      setTotalPages(Math.ceil(assets.length / ITEMS_PER_PAGE));
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = results.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

   const handleFilterChange = (newFilter: "image" | "video" | "audio") => {
     setFilter(newFilter);
   };
```
</details>

---
## <a name=future-enhancement>🚀 Future Enhancement</a>

👉 **Download Assets**:  
  - Allowing users to download assets to their local devices and view anytime.

👉 **Advanced Filtering**:  
  - Allow users to filter results by date range, media type, or collection.

👉 **Favorite Assets**:  
  - Enabling users to save favorite items for them to view later.