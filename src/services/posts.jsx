export const postsService = {
  getAllPosts: async () => {
    const response = await fetch(
      `http://${import.meta.env.VITE_API_URL}/api/posts/all`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data.data;
  },
};
