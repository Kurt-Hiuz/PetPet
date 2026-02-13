import PostHeader from './components/header/PostHeader'
import PostMain from './components/main/PostMain'
import PostSociety from './components/society/PostSociety'

import classes from './styles/Post.module.css'

export default function Post({post_data}){
    return <section className={classes.post}>
        <PostHeader header_data={post_data.header}/>
        <PostMain main_data={post_data.main}/>
        <PostSociety society_data={post_data.society}/>
    </section>
}