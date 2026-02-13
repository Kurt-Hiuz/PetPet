import classes from './styles/UserHeader.module.css';

import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

import { faPlus, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

export default function UserHeader({userData}) {
    const user = {
        name: userData?.name ?? "Пустое имя пользователя",
        bio: userData?.bio ?? "Пустое описание пользователя",
        avatar: userData?.avatar ?? "/images/no-img.png",
        pets : Array.isArray(userData?.pets) ? userData.pets : []
    }

    const visiblePetsCount = 3;
    // TODO: сделать проверку на пустой массив животных
    const visiblePets = user.pets.slice(0, visiblePetsCount); // Показываем visiblePetsCount питомца(-ев)
    const hasMore = user.pets.length > visiblePetsCount;

    return (
        <section className={classes.userHeader}>
            <div className={classes.userInfo}>
                {/* Левая колонка — аватарка по центру */}
                <div className={classes.userAvatarWrapper}>
                    <Avatar src={user.avatar} size="large" />
                </div>

                {/* Правая колонка — имя, описание, питомцы */}
                <div className={classes.userInfoRight}>
                    <h1 className={classes.userName}>{user.name}</h1>
                    <p className={classes.userBio}>{user.bio}</p>
                    <div className={classes.pets}>
                        {visiblePets.map((pet) => (
                            <Avatar
                                key={pet.id}
                                src={pet.avatar}
                                alt={pet.name}
                                size="medium"
                                className={classes.petAvatar}
                            />
                        ))}
                        {hasMore && (
                            <Button
                                className={classes.moreButton}
                                icon={<Icon icon={faAngleDoubleRight}/>}
                                aria-label="Ещё питомцы"
                            />
                        )}
                        <Button
                            className={classes.addButton}
                            icon={<Icon icon={faPlus} />}
                            aria-label="Добавить питомца"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}