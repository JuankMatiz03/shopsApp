import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { listCircleOutline, basketOutline } from 'ionicons/icons';

import HomeScreen from './screens/home/homeScreen';
import WishlistScreen from './screens/wishlist/wishlistScreen';
import ProductScreen from './screens/product/productScreen';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import '@ionic/react/css/palettes/dark.always.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/product/:idProduct" component={ProductScreen} />
          <Route exact path="/products" component={HomeScreen} />
          <Route exact path="/wishlist" component={WishlistScreen} />
          <Route exact path="/">
            <Redirect to="/products"/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="products" href="/products">
            <IonIcon aria-hidden="true" icon={basketOutline}/>
            <IonLabel>Products</IonLabel>
          </IonTabButton>
          <IonTabButton tab="wishlist" href="/wishlist">
          <IonIcon aria-hidden="true" icon={listCircleOutline} />
            <IonLabel>Wish list</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
