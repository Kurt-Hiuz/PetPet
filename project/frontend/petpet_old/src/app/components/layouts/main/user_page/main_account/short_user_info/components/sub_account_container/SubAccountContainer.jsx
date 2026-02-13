import classes from './styles/SubAccountContainer.module.css'

import cat from './assets/sub_accounts/cat.png';
import dog from './assets/sub_accounts/dog.png';
import hamster from './assets/sub_accounts/hamster.png';

import SubAccountIcon from './sub_accounts_icon/SubAccountIcon';

export default function SubAccountContainer(){
    return (
        <>
            <div className={classes.sub_account_container}>
                <div className={classes.sub_accounts}>
                    <SubAccountIcon img_path={cat}/>
                    <SubAccountIcon img_path={dog}/>
                    <SubAccountIcon img_path={hamster}/>
                    <SubAccountIcon img_path='+'/>
                </div>
            </div>
        </>
    );
}