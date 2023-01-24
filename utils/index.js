import sanityClient from "@sanity/client";
import axios from "axios";

export const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  apiVersion: "2023-01-24",
  dataset: "production",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

export const baseUrl = "https://bing-image-search1.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
    },
  });

  return data;
};

export const fetchPosts = `*[_type == "post"]`;
