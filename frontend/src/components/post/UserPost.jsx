import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Loading from "../common/Loading";
import { getCatalogPosts } from "../../lib/catalog";
import { fallbackPosts } from "../../data/catalog-fallbacks";

const UserPost = ({ active = true }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showingSamples, setShowingSamples] = useState(false);

  useEffect(() => {
    if (!active) return undefined

    const controller = new AbortController();
    const fetchPosts = async () => {
      try {
        const catalog = await getCatalogPosts({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setPosts(catalog.length ? catalog : fallbackPosts);
          setShowingSamples(catalog.length === 0);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          console.error('Unable to load posts; showing sample stories:', requestError);
          setPosts(fallbackPosts);
          setShowingSamples(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchPosts();
    return () => controller.abort();
  }, [active]);

  if (loading) return <Loading />;

  return (
    <div>
      <h3 className="pt-10 text-black text-start font-semibold px-14 text-4xl">
        All Posts
      </h3>

      {showingSamples && (
        <p className="mx-auto max-w-3xl rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4 text-center text-sm leading-6 text-cyan-950">
          These are sample stories. Community posts will appear here when the catalog is available.
        </p>
      )}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.id} post={post} isSample={showingSamples} />
        ))}
      </div>
    </div>
  )
};

export default UserPost;
