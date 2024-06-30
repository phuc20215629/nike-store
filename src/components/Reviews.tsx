import Image from "next/image";
import { FaStar } from "react-icons/fa";

const Reviews = async ({ productId }: { productId: string }) => {
  const reviewRes = await fetch(
    `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
  );
  const reviews = await reviewRes.json();

  return reviews.data.map((review: any) => (
    <div className="flex flex-col gap-4" key={review.id}>
      {/* USER */}
      <div className="flex items-center gap-4 font-medium">
        <Image
          src={review.customer.avatar_url}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{review.customer.display_name}</span>
      </div>
      {/* STARS */}
      <div className="flex gap-2">
        {Array.from({ length: review.rating }).map((_, index) => (
          <FaStar width={16} height={16} key={index} />
        ))}
      </div>
      {/* DESCRIPTION */}
      {review.heading && <p className="font-medium">{review.heading}</p>}
      {review.body && <p className="text-sm">{review.body}</p>}
      <div className="flex flex-row gap-3">
        {review.media.map((media: any) => (
          <Image
            src={media.url}
            key={media.id}
            alt=""
            width={100}
            height={50}
            className="object-cover"
          />
        ))}
      </div>
      <hr />
    </div>
  ));
};

export default Reviews;
