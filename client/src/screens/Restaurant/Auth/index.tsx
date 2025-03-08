import { Login as LoginScreen } from "./Login";
import { SignUp as SignUpScreen } from "./SignUp";

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

const Login = withLayout(LoginScreen);
const SignUp = withLayout(SignUpScreen);

export { Login, SignUp };
