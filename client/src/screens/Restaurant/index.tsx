import { Home as HomeScreen } from "./Home";
import { Dishes as DishesScreen } from "./Dishes";
import { Times as TimesScreen } from "./Times";
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
const Dishes = withLayout(DishesScreen);
const Times = withLayout(TimesScreen);

export { Home, Dishes, Times, Auth };
