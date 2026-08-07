import classes from './styles/ProductReviews.module.css';

import ReviewItem from './ReviewItem';

import { pluralizeReviews } from '@utils/pluralize';

/**
 * @param {Object} props
 * @param {Array} props.reviews - Массив отзывов
 */
export default function ProductReviews({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <section className={classes.reviews_section}>
                <h2>Отзывы</h2>
                <p className={classes.empty}>Пока нет отзывов. Будьте первым!</p>
            </section>
        );
    }
    
    return (
        <section className={classes.reviews_section}>
            <h2>{reviews.length} {pluralizeReviews(reviews.length)}</h2>
            <div className={classes.reviews_list}>
                {reviews.map(review => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </section>
    );
}