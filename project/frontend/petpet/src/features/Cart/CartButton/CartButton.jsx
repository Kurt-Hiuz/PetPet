import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import classes from './styles/CartButton.module.css';

import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';
import Modal from '@ui/ModalTrigger/Modal/Modal';

import CartBadge from '../CartBadge/CartBadge';
import CartModal from '../CartModal/CartModal';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function CartButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    
    // Используем location.key - меняется при ЛЮБОЙ навигации
    // Это закрывает модалку даже при переходе на тот же URL
    useEffect(() => {
        setIsModalOpen(false);
    }, [location.key]);
    
    return (
        <>
            <div className={classes.wrapper}>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    ariaLabel="Открыть корзину"
                >
                    <Icon icon={faShoppingCart} size="lg" />
                    <CartBadge />
                </Button>
            </div>
            
            {isModalOpen && (
                <Modal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    size="xlarge"
                >
                    <CartModal />
                </Modal>
            )}
        </>
    );
}