import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/hooks/useReviews";
import ReviewCard from "./ReviewCard";

function Reviews({ listingid }) {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", listingid],
    queryFn: () => fetchReviews(listingid),
  });

  if (isLoading)
    return (
      <div className="text-center py-8 text-gray-500">Loading reviews...</div>
    );
  if (!reviews || reviews.length === 0)
    return (
      <div className="text-center py-8 text-gray-400">No reviews yet.</div>
    );

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Reviews</h2>

      <div className="grid grid-cols-1 gap-6 w-full">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default Reviews;
