import UserHeader from '../../ui/UserHeader/UserHeader';

export default function Profile(){

    const userData = {
        name: "His Majesty",
        bio: "Мамочка трёх ангелочков Меня сложно найти, легко потерять и невозможно забыть Великолепнейший мужчина этого мира",
        avatar: "/images/user_profile_test/user-avatar.jpg",
        pets: [
            { id: 1, name: "Барсик", avatar: "/images/user_profile_test/pet1.png" },
            { id: 2, name: "Люся", avatar: "/images/user_profile_test/pet2.png" },
            { id: 3, name: "Тимоша", avatar: "/images/user_profile_test/pet3.png" },
            { id: 4, name: "Антоша", avatar: "/images/user_profile_test/pet4.png" }
        ],
    };

    return(
        <>
            <UserHeader userData={userData}/>
        </>
    );
}