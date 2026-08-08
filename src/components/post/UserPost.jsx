import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const UserPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/posts.json");

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPost();
  }, []);

  return (
    <div>
      <h3 className="py-10 text-black text-center font-semibold text-4xl">
        All Posts: {posts.length}
      </h3>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
};

export default UserPost;
