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

  // This function search for assets based on a query and filter
  // It takes a query string and an optional filter parameter.
  // The filter parameter can be "image", "video", "audio", or "all"
  // The default filter is "all"
  // It returns a promise that resolves to an array of MediaAssets
  // If an error occurs, the function throws an error with a message 
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

// This function to get detailed information about a specific asset
// than takes a NASA ID as a parameter and returns a promise that resolves to an AssetDetails object
// it fetches information about the asset from the NASA API

export const getAssetDetails = async (nasaId: string): Promise<AssetDetails> => {
  try {
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

    const manifestResponse = await axios.get(`${BASE_URL}asset/${nasaId}`);
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
