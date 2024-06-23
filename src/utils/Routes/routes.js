import * as React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

const Login = React.lazy(() => import("../../adminPages/Login"));
const AdminLayout = React.lazy(() => import("../../layouts/AdminLayout"));
const Dashboard = React.lazy(() => import("../../adminPages/Dashboard"));
const AdminProducts = React.lazy(() =>
  import("../../adminPages/AdminProducts")
);
const AddProduct = React.lazy(() => import("../../adminPages/AddProduct"));
const AdminBlogs = React.lazy(() => import("../../adminPages/AdminBlogs"));
const AddBlog = React.lazy(() => import("../../adminPages/AddBlog"));
const AdminCategories = React.lazy(() =>
  import("../../adminPages/AdminCategories")
);
const AdminLeads = React.lazy(() => import("../../adminPages/AdminLeads"));
const AddLead = React.lazy(() => import("../../adminPages/AddLead"));
const AdminSubscribeLeads = React.lazy(() =>
  import("../../adminPages/AdminSubscribeLeads")
);
const WebLayout = React.lazy(() => import("../../layouts/WebLayout"));
const Home = React.lazy(() => import("../../pages/Home"));
const AboutUs = React.lazy(() => import("../../pages/AboutUs"));
const Namkeen = React.lazy(() => import("../../pages/Namkeen"));
const Blogs = React.lazy(() => import("../../pages/Blogs"));
const BlogDetails = React.lazy(() => import("../../pages/BlogDetails"));
const ContactUs = React.lazy(() => import("../../pages/ContactUs"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "namkeen", element: <Namkeen /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blog-details", element: <BlogDetails /> },
      { path: "contact-us", element: <ContactUs /> },
    ],
  },
  {
    path: "super_admin",
    children: [
      { path: "", element: <Navigate to="/super_admin/login" replace /> },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: <AdminLayout />,
        children: [
          { path: "", element: <Dashboard /> },
          {
            path: "product",
            children: [
              { path: "", element: <AdminProducts /> },
              { path: "add-product", element: <AddProduct /> },
              { path: "edit-product", element: <AddProduct /> },
            ],
          },
          {
            path: "blog",
            children: [
              { path: "", element: <AdminBlogs /> },
              { path: "add-blog", element: <AddBlog /> },
              { path: "edit-blog", element: <AddBlog /> },
            ],
          },
          { path: "category", element: <AdminCategories /> },
          {
            path: "lead",
            children: [
              { path: "", element: <AdminLeads /> },
              { path: "add-lead", element: <AddLead /> },
              { path: "edit-lead", element: <AddLead /> },
            ],
          },
          { path: "subscribe-lead", element: <AdminSubscribeLeads /> },
        ],
      },
      { path: "*", element: <Navigate to="/super_admin/login" replace /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
