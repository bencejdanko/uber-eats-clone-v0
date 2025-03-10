import { BrowserRouter as Router, Route, Routes, data } from "react-router-dom";

import { useAppDispatch } from "./app/hooks";
import { useCheckCustomerSessionQuery } from "./services/api";

import * as screens from "./screens";

import { useEffect } from "react";

import { setCustomer } from "./features/customers/auth";
import { setRestaurant } from "./features/restaurants/auth";

import { useCheckRestaurantSessionQuery } from "./services/api";


function App() {

  const dispatch = useAppDispatch();
  const { data: customer, error } = useCheckCustomerSessionQuery();
  const { data: restaurant, error: restaurantError } = useCheckRestaurantSessionQuery();

  useEffect(() => {
    if (customer) {
      console.log("Customer session active:", customer);
      dispatch(setCustomer(customer))
    } else if (error) {
      console.error("No customer session active:", error);
    }
  }, [customer, dispatch, error]);

  useEffect(() => {
    if (restaurant) {
      console.log("Restaurant session active:", restaurant);
      dispatch(setRestaurant(restaurant));

    } else if (restaurantError) {
      console.error("No restaurant session active:", restaurantError);
    }
  }, [restaurant, restaurantError]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<screens.Home />} />
        <Route path="/explore" element={<screens.Explore />} />

        <Route path="customers" element={<screens.Customer.Home />} />
        <Route path="/customers/login" element={<screens.Customer.Auth.Login />} />
        <Route path="/customers/signup" element={<screens.Customer.Auth.SignUp />} />

        <Route path="/restaurants" element={<screens.Restaurant.Home />} />
        <Route path="/restaurants/times" element={<screens.Restaurant.Times />} />
        <Route path="/restaurants/dishes" element={<screens.Restaurant.Dishes />} />
        <Route path="/restaurants/gallery" element={<screens.Restaurant.Gallery />} />
        {/* <Route path="/restaurants/orders" element={<screens.Restaurant.Orders />} /> */}

        <Route path="/restaurants/login" element={<screens.Restaurant.Auth.Login />} />
        <Route path="/restaurants/signup" element={<screens.Restaurant.Auth.SignUp />} />

      </Routes>
    </Router>
  );
}

export default App;
