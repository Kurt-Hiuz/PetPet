import classes from '../../styles/SizeTable.module.css';

export default function SizeTable({ data }) {
    return (
        <div className={classes.size_table}>
            <p className={classes.material}>
                <strong>Материал:</strong> {data.material}
            </p>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Размер</th>
                        <th>Обхват груди, см</th>
                        <th>Длина, см</th>
                    </tr>
                </thead>
                <tbody>
                    {data.sizes.map((s) => (
                        <tr key={s.size}>
                            <td>{s.size}</td>
                            <td>{s.chest}</td>
                            <td>{s.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}