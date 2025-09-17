import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchReview,
  createReview,
  deleteReview,
  editReview,
} from "@/hooks/useReviews";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { toast } from "sonner";

export default function ReviewDialog({ open, setOpen, booking }) {
  const { data: review, isLoading } = useQuery({
    queryKey: ["review", booking._id],
    queryFn: () => fetchReview(booking._id),
    enabled: open,
  });

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(review?.rating ? review.rating : 0);

  useEffect(() => {
    review && review.length > 0 && setComment(review[0].comment);
    review && review.length > 0 && setRating(review[0].rating);
  }, [review]);

  const queryClient = useQueryClient();

  const createAReview = useMutation({
    mutationFn: (newReview) => createReview(newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
      toast.success("Review created successfully!", {
        duration: 3000,
      });
    },
  });

  const editAReview = useMutation({
    mutationFn: (reviewPayload) => editReview(reviewPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
      toast.success("Review edited successfully!", {
        duration: 3000,
      });
    },
  });

  const deleteAReview = useMutation({
    mutationFn: (reviewid) => deleteReview(reviewid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review"] });
      toast.success("Review deleted successfully!", {
        duration: 3000,
      });
    },
  });

  const handleSubmit = () => {
    const reviewData = {
      listingId: booking.listingId._id,
      bookingId: booking._id,
      rating: rating,
      comment: comment,
    };
    createAReview.mutate(reviewData);
    setOpen(false);
  };

  const handleEdit = () => {
    const reviewData = {
      listingId: booking.listingId._id,
      bookingId: booking._id,
      rating: rating,
      comment: comment,
    };
    editAReview.mutate({ reviewData, reviewId: review[0]._id });
    setOpen(false);
  };
  const handleDelete = () => {
    deleteAReview.mutate(review[0]._id);
    setComment("");
    setRating(0);
    setOpen(false);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add or Edit Review</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-gray-500">
              Your rating
            </span>
            <Rating
              value={rating}
              onChange={setRating}
              style={{ maxWidth: 120 }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium text-gray-500">
              Your review
            </span>
            <textarea
              className="border rounded-xl p-3 min-h-[80px] text-base text-gray-900"
              placeholder="Share your experience..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-end ">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {review && review.length > 0 ? (
            <Button variant="destructive" onClick={handleDelete}>
              Delete Review
            </Button>
          ) : null}
          {review && review.length > 0 ? (
            <Button onClick={handleEdit} className="bg-blue-600 text-white">
              Edit Review
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-blue-600 text-white">
              Submit Review
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
