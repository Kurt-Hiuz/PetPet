import classes from './styles/Profile.module.css';

import UserHeader from '../../ui/UserHeader/UserHeader';
import Button from '../../ui/Button/Button';
import PostFeed from '../../ui/PostFeed/PostFeed';
import Icon from '../../ui/Icon/Icon';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Profile(){

    const userData = {
        id: 'user_123',
        name: "His Majesty",
        bio: "Мамочка трёх ангелочков Меня сложно найти, легко потерять и невозможно забыть Великолепнейший мужчина этого мира",
        avatar: "/images/user_profile_test/user-avatar.jpg",
        pets: [
            { id: 1, name: "Котлетка", avatar: "/images/user_profile_test/pet1.png" },
            { id: 2, name: "Дима Б. Пикми", avatar: "/images/user_profile_test/pet2.png" },
            { id: 3, name: "Табурет", avatar: "/images/user_profile_test/pet3.png" },
            { id: 4, name: "Антоша", avatar: "/images/user_profile_test/pet4.png" },
            { id: 5, name: "Ксюша", avatar: "/images/user_profile_test/pet5.png" }
        ],
    };

    const userPosts = [
    {
        "id": "post_001",
        "author": {
            "avatar": "/images/user_profile_test/user-avatar.jpg",
            "userName": "His Majesty",
            "petName": "Котлетка"
        },
        "media": [
                    {
                        "type": "image",
                        "url": "images/posts_test/cat.jpg",
                        "alt": "Котлетка"
                    },
                    {
                        "type": "image",
                        "url": "images/posts_test/cat.jpg",
                        "alt": "Котлетка"
                    }
        ],
        "caption": "Моя Котлетка вышла погулять!",
        "stats": {
            "likes": 456,
            "hearts": 15,
            "comments": 21348,
            "reposts": 2
        },
        "createdAt": "2024-05-19T10:30:00Z",
        "isOwn": true
    },
    {
        "id": "post_002",
        "author": {
            "avatar": "/images/user_profile_test/user-avatar.jpg",
            "userName": "His Majesty",
            "petName": "Табурет"
        },
        "media": [
            {
                "type": "image",
                "url": "images/posts_test/dog.jpg",
                "alt": "Табурет спит"
            },
            {
                "type": "image",
                "url": "images/posts_test/dog.jpg",
                "alt": "Табурет спит"
            },
            {
                "type": "image",
                "url": "images/posts_test/dog.jpg",
                "alt": "Табурет спит"
            }
        ],
        "caption": "",
        "stats": {
            "likes": 128,
            "hearts": 8149,
            "comments": 24,
            "reposts": 12
        },
        "createdAt": "2024-05-18T18:15:00Z",
        "isOwn": true
    }
]

    const handleCreatePost = () => {
        console.log('Открыть модалку создания поста');
        // TODO: открыть модальное окно или перейти на /create-post
    };

    return(
        <>
            <UserHeader userData={userData}/>
            <div className={classes.profileContainer}>
                <Button variant="creation" fullWidth={true} onClick={handleCreatePost}>
                    <Icon icon={faPlus} />
                    <span>Что у вас нового?</span>
                </Button>
        
                {userPosts.length > 0 ? (
                    <PostFeed posts={userPosts} />
                        ) : (
                    <div className={classes.emptyState}>
                        <p>У вас пока нет публикаций</p>
                    </div>
                )}
            </div>
        </>
    );
}