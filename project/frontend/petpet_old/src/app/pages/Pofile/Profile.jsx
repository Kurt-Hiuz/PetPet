import ShortUserInfo from "../../components/layouts/main/user_page/main_account/short_user_info/ShortUserInfo";
import NewPostBtn from "../../components/layouts/main/user_page/new_post_btn/NewPostBtn";
import NewsFeed from "../../general/components/news/news_feed/NewsFeed";
import Post from "../../general/components/news/post/Post"

import user_data from '../../general/components/news/post/test_data/test_post_data.json' with { type: "json" };

export default function Profile(){
    return (
        <>
            <ShortUserInfo/>
            <NewPostBtn/>
            <NewsFeed>
                {user_data.map(post_data => (
                        <Post key={post_data.id} post_data={post_data}/>
                ))}
            </NewsFeed>
        </>
    );
}