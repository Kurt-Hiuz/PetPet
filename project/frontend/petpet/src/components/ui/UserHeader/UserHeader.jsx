import classes from './styles/UserHeader.module.css';

import Avatar from '@ui/Avatar/Avatar';
import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';

import PetSwitcher from '@ui/PetSwitcher/PetSwitcher';

import { IMAGES, DETAILS } from '@config/assetsConfig';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function UserHeader({userData}) {
    const user = {
        name: userData?.name ?? DETAILS.NO_NAME,
        bio: userData?.bio ?? DETAILS.NO_DESCRIPTION,
        avatar: userData?.avatar ?? IMAGES.NO_IMG,
        pets : Array.isArray(userData?.pets) ? userData.pets : []
    }

    return (
        <section className={classes.userHeader}>
            <div className={classes.userInfo}>
                <div className={classes.userAvatarWrapper}>
                    <Avatar src={user.avatar} size="large" />
                </div>

                <div className={classes.userInfoRight}>
                    <h1 className={classes.userName}>{user.name}</h1>
                    <p className={classes.userBio}>{user.bio}</p>

                    <div className={classes.pets}>
                        <PetSwitcher 
                            pets={user.pets} 
                            visibleCount={3} 
                            avatarSize="medium" 
                        />
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