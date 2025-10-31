import { postsService } from "@/services/posts";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { MoonLoader } from "react-spinners";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      postsService.getAllPosts().then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    const ws = new WebSocket(`ws://${import.meta.env.VITE_API_URL}/ws/posts`);
    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "postCreated") {
        console.log(data.data);
        setPosts((prev) => [data.data, ...prev]);
      }
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b">
        {loading ? (
          <div className="flex items-center gap-2">
            <MoonLoader color="#000" size={10} />
            <span className="text-xs text-neutral-500 dark:text-neutral-500">
              Loading posts...
            </span>
          </div>
        ) : null}
        <span className="text-xs text-neutral-500 dark:text-neutral-500 ml-auto">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </span>
      </div>
      <ScrollArea className="h-[70vh]">
        <div className="flex flex-col gap-3  px-2">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border-b border-neutral-200 dark:border-neutral-800 pb-1"
            >
              <div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
