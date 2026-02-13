const mockPosts = [
    { 
        id: 1,
        headerData: {
            avatarSrc: "/images/user_profile_test/user-avatar.jpg",
            userName: "His Majesty",
            petsName: "Kotleta"
        },
        imagePath: "/images/posts_test/cat.jpg", 
        descriptionData: {
            text: "Моя Котлетка вышла погулять)",
            
        }
    },
    { 
        id: 2, 
        title: "Как я нашёл друга", 
        content: "Был в приюте..." 
    },
];

export const getPosts = async ({userId, limit, sortBy}) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = 
}