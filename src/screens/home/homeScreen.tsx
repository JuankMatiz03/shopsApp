import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../services/api';
import { AppDispatch, RootState } from '../../store/store';
import ProductCard from '../../components/productCard/productCardComponent';
import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { ProductModel } from '../../models/productModel';
import LoadingComponent from '../../components/loading/loadingComponent';
import { NoProductsStyle } from './homeScreenStyles';

/**
 * HomeScreen
 * @returns HomeScreen
 */
const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ProductModel[]>([]);
  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  /**
   * useEffect for fetchProducts
   */
  useEffect(() => {
      dispatch(fetchProducts());
      setResults(products);
  }, []);

  /**
   * useEffect for searchTerm
   */
  useEffect(() => {
    if (searchTerm === '') {
      setResults(products);
      return;
    }

    const filteredProducts = products.filter(product => 
      product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
    );

    setResults(filteredProducts);
  }, [searchTerm]);

  if (status === 'loading') return <LoadingComponent />;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <IonSearchbar 
                className="ion-no-border"
                value={searchTerm} 
                onIonInput={(e: any) => setSearchTerm(e.target.value)} 
                debounce={300}
              />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              {results.length > 0 ? (
                results.map((product) => (
                  <IonCol size="12" sizeMd="6" sizeLg="4" key={product.id}>
                    <ProductCard isDetail={false} product={product} />
                  </IonCol>
                ))
              ) : (
                <IonCol size="12">
                  <NoProductsStyle>
                    <h2>No Products Found</h2>
                    <p>It looks like there are no products matching your search.</p>
                  </NoProductsStyle>
                </IonCol>
              )}
            </IonRow>
        </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomeScreen;
