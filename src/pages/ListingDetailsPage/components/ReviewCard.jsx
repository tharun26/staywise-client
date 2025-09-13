import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

function ReviewCard({ review }) {
  const avatarUrl =
    review.authorId?.avatarUrl || "https://github.com/shadcn.png";
  const name = review.authorId?.name || "User";
  return (
    <Card className="w-full flex flex-row items-start gap-4 p-5 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <Avatar>
        <img
          src={avatarUrl}
          alt={name}
          className="w-11 h-11 rounded-full object-cover bg-gray-100"
        />
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </span>
          <span className="text-[15px] text-[#f59e42] font-semibold flex items-center">
            ★ {review.rating}
          </span>
        </div>
        <div className="text-gray-700 text-[15px] leading-[1.5] break-words">
          {review.comment ? (
            review.comment
          ) : (
            <span className="italic text-gray-400">No comment provided.</span>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ReviewCard;
