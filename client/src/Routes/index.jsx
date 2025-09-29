import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Errors";
import Register from "../pages/Register";
import VerifyUser from "../pages/Register/VerifyUser";
import Header from "../Layouts/Header";
import Login from "../pages/Login";
import UpdatePass from "../pages/UserProfile/UpdatePass";
import ForgetPassword from "../pages/Login/ForgetPassword";
import Profile from "../pages/UserProfile/Profile";
import UpdateProfile from "../pages/UserProfile/UpdateProfile";
import DashboardRouter from "../pages/Dashboard/DashboardRouter";
import Users from "../pages/Dashboard/components/users/Users";
import Products from "../pages/Dashboard/components/products/Products";
import DashboardHome from "../pages/Dashboard/components/home/Dashboad-Home";
import Analytics from "../pages/Dashboard/components/analytics/Analytics";
import Sales from "../pages/Dashboard/components/sales/Sales";
import Customers from "../pages/Dashboard/components/customers/Customers";
import Orders from "../pages/Dashboard/components/orders/Orders";
import Carts from "../pages/Cart/Carts";
import Favourites from "../pages/Favourites";
import AuthRoute from "../components/AuthRoute/AuthRoute";
import Checkout from "../pages/Checkout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import ProductDetails from "../pages/products-page/ProductDetails";
import Footer from "../Layouts/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ProductsPage from "../pages/products-page/Products";
import SearchPage from "../pages/SearchPage";
import AuthUser from "../components/AuthRoute/AuthUser";
import About from "../pages/Abouts";
import ContactForm from "../pages/Contacts/ContactForm";

const Index = () => {
  // set your conditional Route or Private Routes
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <ToastContainer position="bottom-right" theme="dark" />
      {/* declare static Components here  Like Header Navbar etc */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        {/* Protecting Dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <AuthRoute>
              <DashboardRouter />
            </AuthRoute>
          }
        >
          <Route path="dash" element={<DashboardHome />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="sales" element={<Sales />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="Orders" element={<Orders />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-user" element={<VerifyUser />} />
        <Route
          path="/checkout"
          element={
            <AuthUser>
              <Checkout />
            </AuthUser>
          }
        />
        <Route path="/profile-user" element={<Profile />} />
        <Route path="/change-pass" element={<UpdatePass />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/forget-pass" element={<ForgetPassword />} />
        <Route path="/cart" element={<Carts />} />
        <Route path="/favourite" element={<Favourites />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/current-product" element={<ProductDetails />} />

        <Route path="*" element={<Error />} />
      </Routes>
      {/* declare static Components here  Like Footer or Dropdown */}
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
