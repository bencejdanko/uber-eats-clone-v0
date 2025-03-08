import { Home as HomeScreen } from "./Home";
import { Explore as ExploreScreen } from "./Explore";
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

const Home = withLayout(HomeScreen);
const Explore = withLayout(ExploreScreen);

import * as Customer from "./Customer";
import * as Restaurant from "./Restaurant";

export { Home, Explore, Customer, Restaurant };
