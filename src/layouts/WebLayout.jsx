import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { BlogAPI, ProductAPI } from "../API";
import LogoLoadingScreen from "../components/LogoLoadingScreen";
import FloatNotification from "../components/FloatNotification";

const Context = createContext({
  recantProducts: [],
  recantBlogs: [],
  showNotification: {
    show: false,
    status: "",
    title: "",
    message: <></>,
  },
  setShowNotification: () => {},
});

const WebLayout = () => {
  const [recantProducts, setRecantProducts] = useState([]);
  const [recantBlogs, setRecantBlogs] = useState([]);
  const [showNotification, setShowNotification] = useState({
    show: false,
    status: "",
    title: "",
    message: <></>,
  });
  const [loading, setLoading] = useState({
    recantProducts: true,
    recantBlogs: true,
  });
  let ignore = false;
  const getRecantProducts = () => {
    setLoading((v) => ({ ...v, recantProducts: true }));
    fetch(ProductAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limit: 5 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") setRecantProducts(data.data);
        setLoading((v) => ({ ...v, recantProducts: false }));
      });
  };
  const getRecantBlogs = () => {
    setLoading((v) => ({ ...v, recantBlogs: true }));
    fetch(BlogAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limit: 10 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") setRecantBlogs(data.data);
        setLoading((v) => ({ ...v, recantBlogs: false }));
      });
  };
  useEffect(() => {
    if (!ignore) {
      getRecantProducts();
      getRecantBlogs();
    }

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <Context.Provider
      value={{
        recantProducts,
        recantBlogs,
        setShowNotification,
        showNotification,
      }}
    >
      {loading.recantProducts || loading.recantBlogs ? (
        <LogoLoadingScreen />
      ) : (
        <div className="min-h-screen flex flex-col justify-between bg-[#FBFBFB]">
          <div>
            <Header />
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
      <FloatNotification
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </Context.Provider>
  );
};

export default WebLayout;

export const ContextStore = () => {
  return useContext(Context);
};
