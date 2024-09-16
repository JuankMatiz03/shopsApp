import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeProduct, addProductBack } from '../../store/reducers/wishlistSlice';
import { 
    IonButton,
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonIcon, 
    IonItem,
    IonList, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonToast 
} from '@ionic/react';
import { balloonOutline, trashOutline } from 'ionicons/icons';
import { NoProductsStyle } from './wishlistScreenStyles';

/**
 * WishlistScreen
 * @returns WishlistScreen
 */
const WishlistScreen: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [removedProduct, setRemovedProduct] = useState<any>(null); 
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const dispatch = useDispatch();

    /**
     * handle Remove product
     * @param productId id product
     */
    const handleRemove = (productId: number) => {
        const productToRemove = wishlist.find(item => item.id === productId);
        if (productToRemove) {
            dispatch(removeProduct({ id: productId }));
            setRemovedProduct(productToRemove);
            setToastMessage('Product removed from wishlist');
            setShowToast(true);
        }
    };

    /**
     * handleUndo product
     */
    const handleUndo = () => {
        if (removedProduct) {
            dispatch(addProductBack(removedProduct)); 
            setRemovedProduct(null);
            setToastMessage('Product restored to wishlist');
            setShowToast(false);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Wish List
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {wishlist.length > 0 ? (
                    <IonList>
                        {wishlist.map((product) => (
                            <IonItem key={product.id}>
                                <p>{product.title}</p>
                                <IonButtons>
                                    <IonButton color={'clear'} routerLink={`/product/${product.id}`}>
                                        <IonIcon 
                                            color='warning' 
                                            className="ion-margin-start" 
                                            aria-hidden="true" 
                                            icon={balloonOutline} 
                                        />
                                    </IonButton>
                                    <IonButton color={'clear'} onClick={() => handleRemove(product.id)}>
                                        <IonIcon 
                                            color='danger' 
                                            className="ion-margin-start" 
                                            aria-hidden="true" 
                                            icon={trashOutline} 
                                        />
                                    </IonButton>
                                </IonButtons>
                            </IonItem>
                        ))}
                    </IonList>
                ) : (
                    <NoProductsStyle>
                        <h2>No Products Found</h2>
                        <p>Add A Product To Your Wish List</p>
                    </NoProductsStyle>
                )}
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    position="top"
                    color={toastMessage.includes('restored') ? 'success' : 'warning'}
                    buttons={[
                        {
                            text: 'Undo',
                            role: 'cancel',
                            handler: handleUndo
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default WishlistScreen;
