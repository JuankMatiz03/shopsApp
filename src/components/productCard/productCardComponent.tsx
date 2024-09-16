/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/reducers/wishlistSlice';
import { ProductCardProps } from '../../models/productCardProps';
import { 
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonIcon, 
    IonImg,
    IonToast,
} from '@ionic/react';
import { balloonOutline, starOutline } from 'ionicons/icons';
import { RootState } from '../../store/store';
import { productCardStyle } from './productCardStyles';

/**
 * ProductCardComponent
 * @param param0 product 
 * @returns Product Card Component
 */
const ProductCardComponent: React.FC<ProductCardProps> = ({ product, isDetail }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    /**
     * handleAddToWishlist
     */
    const handleAddToWishlist = () => {
        const productExists = wishlist.some(item => item.id === product.id);

        if (!productExists) {
            dispatch(addProduct(product));
            setToastMessage('Product added to Wish List');
        } else {
            setToastMessage('Product already in Wish List');
        }

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <>
            <IonCard css={productCardStyle}>
                <IonImg 
                    src={product.images[0]}
                    alt={product.title} 
                />
                <IonCardHeader>
                    <IonCardTitle>{product.title}</IonCardTitle>
                    <IonCardSubtitle>Price: ${product.price.toFixed(2)}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className='ion-margin'>
                    <p>{product.description}</p>
                    <IonButton expand="full" onClick={handleAddToWishlist}>
                        Add to Wishlist 
                        <IonIcon  
                            color='warning'
                            className="ion-margin-start" 
                            aria-hidden="true" 
                            icon={starOutline} 
                        />
                    </IonButton>
                    {!isDetail &&
                        <IonButton expand="full" color="warning" routerLink={`/product/${product.id}`}>
                            View detail 
                            <IonIcon 
                                color='danger' 
                                className="ion-margin-start" 
                                aria-hidden="true" 
                                icon={balloonOutline} 
                            />
                        </IonButton>
                    }
                </IonCardContent>
            </IonCard>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={3000}
                position="top"
                color={toastMessage.includes('added') ? 'success' : 'warning'}
            />
        </>
    );
};

export default ProductCardComponent;
