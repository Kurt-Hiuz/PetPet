import classes from './styles/PostHeader.module.css'

export default function PostHeader({header_data}){
    return <div className={classes.names_container}>
        <p>{header_data.user_name}#{header_data.pet_name}</p>
    </div>
}