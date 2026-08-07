import classes from '../../styles/FoodDetails.module.css';

export default function FoodDetails({ data }) {
    return (
        <div className={classes.food_details}>
            <p><strong>Состав:</strong></p>
            <div className={classes.ingredients_list}>
                {data.ingredients.map((ingredient, idx) => (
                    <span key={idx} className={classes.ingredient}>{ingredient}</span>
                ))}
            </div>
            <p><strong>Вес:</strong> {data.weight}</p>
            <p><strong>Производитель:</strong> {data.manufacturer}</p>
            <p><strong>Страна:</strong> {data.country}</p>
        </div>
    );
}