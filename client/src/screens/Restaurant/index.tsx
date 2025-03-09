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

import * as Auth from "./Auth";

const Home = withLayout(HomeScreen);

export { Home, Auth };
