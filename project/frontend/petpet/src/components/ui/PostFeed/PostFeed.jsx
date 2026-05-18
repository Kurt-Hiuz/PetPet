import classes from './styles/PostFeed.module.css';

import Post from "../Post/Post";

// ## Используется в PostFeedContainer
export default function PostFeed({posts}){
    if(!posts || !posts.length){
        return(
            <h2>Нет постов</h2>
        );
    }
    
    return(
        <section className={classes.feed} aria-label="Новостная лента">
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </section>
    );
}