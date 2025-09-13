import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/hooks/useReviews";

function ReviewCard({ review }) {
  const avatarUrl =
    review.authorId?.avatarUrl || "https://github.com/shadcn.png";
  const name = review.authorId?.name || "User";

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem",
        padding: "0.75rem 1rem",
        background: "#fff",
        minWidth: 220,
        maxWidth: 300,
        height: 80,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <img
        src={avatarUrl}
        alt={name}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          objectFit: "cover",
          background: "#f3f4f6",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
          <span
            style={{
              fontSize: 13,
              color: "#f59e42",
              fontWeight: 600,
              marginLeft: 8,
            }}
          >
            ★ {review.rating}
          </span>
        </div>
        <div
          style={{
            color: "#374151",
            fontSize: 14,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {review.comment}
        </div>
      </div>
    </div>
  );
}

function Reviews({ listingid }) {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", listingid],
    queryFn: () => fetchReviews(listingid),
  });

  if (isLoading) return <div>Loading reviews...</div>;
  if (!reviews || reviews.length === 0) return <div>No reviews yet.</div>;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "1.5rem",
        padding: "2rem 1.5rem",
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.03)",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default Reviews;
