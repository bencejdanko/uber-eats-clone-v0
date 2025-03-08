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

const Home = withLayout(HomeScreen);

import * as Customer from "./Customer";
import * as Restaurant from "./Restaurant";

export { Home, Customer, Restaurant };
