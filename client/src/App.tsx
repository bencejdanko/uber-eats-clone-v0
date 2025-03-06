import { BrowserRouter as Router, Route, Routes, data } from "react-router-dom";

import { useAppDispatch } from "./app/hooks";
import { useCheckSessionQuery } from "./services/deliveryEats";

import { Home } from "./screens";
import * as customer from "./screens/Customer";
import * as restaurant from "./screens/Restaurant";
import { useEffect } from "react";
import { setUser } from "./features/auth";


function App() {

  const dispatch = useAppDispatch();
  const { data: user, error } = useCheckSessionQuery();

  useEffect(() => {
    if (user) {
      console.log("A user session is active. User: ", user);
      dispatch(setUser(user))
    } else if (error) {
      console.error("No session active:", error);
    }
  }, [user, dispatch, error]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="customers" element={<customer.Home />} />
        <Route path="/customers/login" element={<customer.Login />} />
        <Route path="/customers/signup" element={<customer.SignUp />} />

        <Route path="/restaurants" element={<restaurant.Home />} />
        <Route path="/restaurants/signup" element={<restaurant.SignUp />} />
        <Route path="/restaurants/login" element={<restaurant.Login />} />
      </Routes>
    </Router>
  );
}

export default App;
