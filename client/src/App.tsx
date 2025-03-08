import { BrowserRouter as Router, Route, Routes, data } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useCheckCustomerSessionQuery } from "./services/api";

import * as screens from "./screens";

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
        <Route path="/" element={<screens.Home />} />

        <Route path="customers" element={<screens.Customer.Home />} />
        <Route path="/customers/login" element={<screens.Customer.Auth.Login />} />
        <Route path="/customers/signup" element={<screens.Customer.Auth.SignUp />} />

        <Route path="/restaurants" element={<screens.Restaurant.Home />} />
        <Route path="/restaurants/login" element={<screens.Restaurant.Auth.Login />} />
        <Route path="/restaurants/signup" element={<screens.Restaurant.Auth.SignUp />} />

      </Routes>
    </Router>
  );
}

export default App;
