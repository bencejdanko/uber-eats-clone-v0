import { BrowserRouter as Router, Route, Routes, data } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useCheckCustomerSessionQuery } from "./services/api";

import { Home } from "./screens";
import * as customerScreens from "./screens/Customer";
import * as restaurantScreens from "./screens/Restaurant";
import { useEffect } from "react";
import { setCustomer } from "./features/auth";


function App() {

  const dispatch = useAppDispatch();
  const { data: customer, error } = useCheckCustomerSessionQuery();

  useEffect(() => {
    if (customer) {
      console.log("Customer session active:", customer);
      dispatch(setCustomer(customer))
    } else if (error) {
      console.error("No customer session active:", error);
    }
  }, [customer, dispatch, error]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="customers" element={<customerScreens.Home />} />
        <Route path="/customers/login" element={<customerScreens.Login />} />
        <Route path="/customers/signup" element={<customerScreens.SignUp />} />

        <Route path="/restaurants" element={<restaurantScreens.Home />} />
        <Route path="/restaurants/signup" element={<restaurantScreens.SignUp />} />
        <Route path="/restaurants/login" element={<restaurantScreens.Login />} />
      </Routes>
    </Router>
  );
}

export default App;
