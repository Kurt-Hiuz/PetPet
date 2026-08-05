import { useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams();

    return (
        <p>Страничка товара ID={id}</p>
    );
}