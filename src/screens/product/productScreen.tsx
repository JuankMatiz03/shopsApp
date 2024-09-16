/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/productCard/productCardComponent';
import { 
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonToast,
} from '@ionic/react';
import { ProductModel } from '../../models/productModel';
import { fetchProductById } from '../../services/api';
import LoadingComponent from '../../components/loading/loadingComponent';

/**
 * ProductScreen
 * @returns screen product
 */
const ProductScreen: React.FC = () => {
    const { idProduct } = useParams<{ idProduct: string }>();
    const [products, setProducts] = useState<ProductModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (idProduct) {
            fetchProductById(Number(idProduct)).then((pdts: ProductModel) => {
                setProducts(pdts);
                setLoading(false);
            });
        }
    }, [idProduct]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{products?.title || "Product Details"}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {loading ? (
                    <LoadingComponent />
                ) : (
                    products && (
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" sizeMd="6" sizeLg="4" key={products.id}>
                                <ProductCard isDetail={true} product={products} />
                            </IonCol>
                        </IonRow>
                    )
                )}
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    position="top"
                    color={toastMessage.includes('added') ? 'success' : 'warning'}
                />
            </IonContent>
        </IonPage>
    );
};

export default ProductScreen;
