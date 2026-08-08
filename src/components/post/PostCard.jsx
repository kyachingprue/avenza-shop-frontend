import { useNavigate } from "react-router";

const PostCard = ({ post }) => {
  const { user, title, shortDescription, product, engagement, tags } = post;
  const navigate = useNavigate();

  return (
    <article className="group w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-100 sm:h-64">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
          {product.category}
        </span>

        {/* Discount */}
        {product.discount > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Author */}
        <div className="mb-4 flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.name}
              </p>

              {user.verified && (
                <span className="text-xs text-blue-500">✓</span>
              )}
            </div>

            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
          {shortDescription}
        </p>

        {/* Product Information */}
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500">{product.brand}</p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${product.price}
              </span>

              <span className="text-sm text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>

              <span className="text-sm font-semibold text-gray-900">
                {product.rating}
              </span>
            </div>

            <p className="text-xs text-gray-500">
              {product.reviewCount} reviews
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>♡ {engagement.likes}</span>
            <span>💬 {engagement.comments}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/posts/details?id=${post.id}`)}
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600"
          >
            Read More
          </button>
        </div>
      </div>
    </article>
  )
};

export default PostCard;
