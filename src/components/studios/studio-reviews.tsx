import { MessageSquareTextIcon, StarIcon } from 'lucide-react';
import { cn } from 'cn';
import type { Review } from '@/lib/studios';

const Stars = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
                key={i}
                className={cn('size-4', i < Math.round(rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30')}
            />
        ))}
    </div>
);

const formatReviewDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

const StudioReviews = ({ reviews = [], rating }: { reviews?: Review[]; rating?: number }) => {
    if (reviews.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center">
                <MessageSquareTextIcon className="size-8 text-muted-foreground" />
                <p className="font-medium">No reviews yet</p>
                <p className="text-sm text-muted-foreground">Book this space and be the first to share your experience.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {rating !== undefined && (
                <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold tracking-tight">{rating.toFixed(1)}</span>
                    <div className="space-y-1">
                        <Stars rating={rating} />
                        <p className="text-sm text-muted-foreground">
                            Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>
                </div>
            )}

            <ul className="grid gap-4 sm:grid-cols-2">
                {reviews.map(({ name, rating, comment, date }) => (
                    <li key={`${name}-${date}`} className="flex flex-col gap-3 rounded-2xl border bg-card p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                                {name.charAt(0).toUpperCase()}
                            </span>
                            <div>
                                <p className="font-medium">{name}</p>
                                <p className="text-xs text-muted-foreground">{formatReviewDate(date)}</p>
                            </div>
                        </div>
                        <Stars rating={rating} />
                        <p className="text-sm leading-relaxed text-muted-foreground">{comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudioReviews;
