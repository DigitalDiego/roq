import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  apiVersion: "2023-01-26",
  dataset: "production",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

export const fetchUsers = `*[_type == "user"]{
  username,
  password
}`;

export const fetchPosts = `*[_type == "post"] | order(_createdAt desc){
  _id,
  _createdAt,
  user,
  content,
  image
}`;

export const fetchImgs = `*[_type == "post" && image != "null"] | order(_createdAt desc) {
  _id,
  image
}`;
