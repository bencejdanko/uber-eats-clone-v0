import { Restaurant as RestaurantScreen } from "./Restaurant";
import { Home as HomeScreen } from "./Home";
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

const Restaurant = withLayout(RestaurantScreen);
const Home = withLayout(HomeScreen);

export { Restaurant, Home };
