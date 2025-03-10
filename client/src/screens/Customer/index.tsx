import { Home as HomeScreen } from "./Home";
import { Cart as CartScreen } from "./Cart";
import { Orders as OrdersScreen } from "./Orders";
import { Favorites as FavoritesScreen } from "./Favorites";
import { Layout } from "./Layout";

function withLayout(Component: React.ComponentType) {
    return function WrappedComponent(props: any) {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
}

import * as Auth from "./Auth";

const Home = withLayout(HomeScreen);
const Cart = withLayout(CartScreen);
const Orders = withLayout(OrdersScreen);
const Favorites = withLayout(FavoritesScreen);

export { Home, Cart, Orders, Favorites, Auth };
