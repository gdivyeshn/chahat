import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = React.lazy(() => import("../../pages/Login"));
const AdminLayout = React.lazy(() => import("../../components/AdminLayout"));
const Dashboard = React.lazy(() => import("../../pages/Dashboard"));
const AdminProducts = React.lazy(() => import("../../pages/AdminProducts"));
const AddProduct = React.lazy(() => import("../../pages/AddProduct"));
const AdminBlogs = React.lazy(() => import("../../pages/AdminBlogs"));
const AddBlog = React.lazy(() => import("../../pages/AddBlog"));
const AdminCategories = React.lazy(() => import("../../pages/AdminCategories"));
const AdminLeads = React.lazy(() => import("../../pages/AdminLeads"));
const AddLead = React.lazy(() => import("../../pages/AddLead"));
const AdminSubscribeLeads = React.lazy(() =>
  import("../../pages/AdminSubscribeLeads")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
      </div>
    ),
  },
  {
    path: "super_admin",
    children: [
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
    ],
  },
]);

export default router;
