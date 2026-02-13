import classes from './styles/Post.module.css';

import PostHeader from './PostHeader/PostHeader';
import PostDescription from './PostDescription/PostDescription';

export default function Post({postData}){
    return(
        <article className={classes.post}>
            <PostHeader headerData={postData.headerData}/>
            <img src={postData.imagePath} alt="Картинка поста" />
            <PostDescription descriptionData={postData.descriptionData}/>
        </article>
    );
}