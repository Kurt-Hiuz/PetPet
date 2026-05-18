import classes from './styles/Post.module.css';

import PostHeader from './PostHeader/PostHeader';
import PostMedia from './PostMedia/PostMedia';
import PostCaption from './PostCaption/PostCaption';
import PostActions from './PostActions/PostActions';
import PostFooter from './PostFooter/PostFooter';

export default function Post({ post }) {
    return (
        <article className={classes.post} aria-label={`Пост от ${post.author.userName}`}>
            <PostHeader author={post.author} />
            <PostMedia media={post.media} />
            <PostCaption text={post.caption} />
            <PostActions stats={post.stats} postId={post.id} />
            <PostFooter date={post.createdAt} isOwn={post.isOwn} />
        </article>
    );
}