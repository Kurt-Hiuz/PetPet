import Post from "../Post/Post";

import classes from './styles/PostFeed.module.css';

export default function PostFeed({postsData}){
    if(!postsData || !postsData.length){
        return(
            <h2>Нет постов</h2>
        );
    }
    
    return(
        <section>
            {postsData.map(
                (post) => 
                    <Post 
                        key={post.imagePath}
                        postData={post}
                    />
            )}
        </section>
    );
}