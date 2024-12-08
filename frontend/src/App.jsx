import React from "react";
import { Navbar } from "./components/shared/Navbar.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/auth/Login.jsx";
import { Signup } from "./components/auth/Signup.jsx";
import { Home } from "./components/Home.jsx";
import { Jobs } from "./components/Jobs.jsx";
import { Browse } from "./components/Browse.jsx";
import { Profile } from "./components/Profile.jsx";
import { JobDescription } from "./components/JobDescription.jsx";
import { Companies } from "./components/admin/Companies.jsx";
import { CreateCompany } from "./components/admin/CreateCompany.jsx";
import { SetupCompany } from "./components/admin/SetupCompany.jsx";
import { AdminJobs } from "./components/admin/AdminJobs.jsx";
import { PostJob } from "./components/admin/PostJob.jsx";
import { UpdateJob } from "./components/admin/UpdateJob.jsx";
import { Applicants } from "./components/admin/Applicants.jsx";
import { ProtectedRoute } from "./components/admin/ProtectedRoute.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CreateCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <SetupCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id",
    element: (
      <ProtectedRoute>
        <UpdateJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
