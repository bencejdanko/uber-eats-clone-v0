import { BrowserRouter as Router, data, Route, Routes } from "react-router-dom";

import { useAppDispatch } from "./app/hooks";

import * as screens from "./screens";

import { useEffect } from "react";

import { setCustomer } from "./features/customers/auth";
import { setRestaurant } from "./features/restaurants/auth";
import { setCart } from "./features/customers/cart";
import { setFavoriteDishes } from "./features/customers/favorites/dishes";
import { setFavoriteRestaurants } from "./features/customers/favorites/restaurants";

import {
  useCheckCustomerSessionQuery,
  useCheckRestaurantSessionQuery,
  useGetCustomerCartQuery,
  useGetFavoriteDishesQuery,
  useGetFavoriteRestaurantsQuery,
} from "./services/api";

function App() {
  const dispatch = useAppDispatch();
  const { data: customer, error } = useCheckCustomerSessionQuery();
  const { data: restaurant, error: restaurantError } =
    useCheckRestaurantSessionQuery();
  const { data: cart, error: cartError } = useGetCustomerCartQuery({
    id: customer?.id,
  });
  const { data: favoriteDishes } = useGetFavoriteDishesQuery({
    customer_id: customer?.id || "nan",
  });
  const { data: favoriteRestaurants } = useGetFavoriteRestaurantsQuery({
    customer_id: customer?.id || "nan",
  });

  useEffect(() => {
    if (customer) {
      console.log("Customer session active:", customer);
      dispatch(setCustomer(customer));
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

  useEffect(() => {
    if (cart) {
      console.log("Customer cart active:", cart);
      dispatch(setCart(cart));
    } else if (cartError) {
      console.error("No customer cart active:", cartError);
    }
  }, [cart, cartError, dispatch]);

  useEffect(() => {
    if (favoriteDishes) {
      console.log("Favorite dishes active:", favoriteDishes);
      dispatch(setFavoriteDishes(favoriteDishes));
    }
  }, [favoriteDishes]);

  useEffect(() => {
    if (favoriteRestaurants) {
      console.log("Favorite restaurants active:", favoriteRestaurants);
      dispatch(setFavoriteRestaurants(favoriteRestaurants));
    }
  }, [favoriteRestaurants]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<screens.Home />} />

        <Route path="/explore" element={<screens.Explore.Home />} />
        <Route
          path="/explore/restaurants/:id"
          element={<screens.Explore.Restaurant />}
        />

        <Route path="customers" element={<screens.Customer.Home />} />
        <Route
          path="/customers/login"
          element={<screens.Customer.Auth.Login />}
        />
        <Route
          path="/customers/signup"
          element={<screens.Customer.Auth.SignUp />}
        />
        <Route path="/customers/cart" element={<screens.Customer.Cart />} />

        <Route path="/customers/orders" element={<screens.Customer.Orders />} />

        <Route
          path="/customers/favourites"
          element={<screens.Customer.Favorites />}
        />

        <Route path="/restaurants" element={<screens.Restaurant.Home />} />
        <Route
          path="/restaurants/times"
          element={<screens.Restaurant.Times />}
        />
        <Route
          path="/restaurants/dishes"
          element={<screens.Restaurant.Dishes />}
        />
        <Route
          path="/restaurants/gallery"
          element={<screens.Restaurant.Gallery />}
        />
        {/* <Route path="/restaurants/orders" element={<screens.Restaurant.Orders />} /> */}

        <Route
          path="/restaurants/login"
          element={<screens.Restaurant.Auth.Login />}
        />
        <Route
          path="/restaurants/signup"
          element={<screens.Restaurant.Auth.SignUp />}
        />
      </Routes>
    </Router>
  );
}

export default App;
