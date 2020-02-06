import React from "react";

import async from "../components/Async";

import { Briefcase, Sliders, Users } from "react-feather";
import Home from "../pages/Home";

interface IRoutesChildren {
  path: string;
  name: string;
  component: any;
}

export interface IRoutes {
  id: string;
  path: string;
  icon: any;
  header?: string;
  badge?: string;
  component?: any;
  containsHome?: boolean;
  children: IRoutesChildren[] | null;
}

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Projects components
const ProjectsOverview = async(() => import("../pages/projects/Overview"));
const ProjectsLinkageAnalysis = async(() =>
  import("../pages/projects/LinkageAnalysis")
);

const homeRoutes: IRoutes = {
  id: "Home",
  path: "/",
  icon: <Sliders />,
  component: Home,
  children: null
};

const authRoutes: IRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

const projectsRoutes: IRoutes = {
  id: "프로젝트",
  path: "/projects",
  icon: <Briefcase />,
  containsHome: true,
  children: [
    {
      path: "/projects/overview",
      name: "데이터",
      component: ProjectsOverview
    },
    {
      path: "/projects/linkage-analysis",
      name: "연관 분석",
      component: ProjectsLinkageAnalysis
    }
  ]
};

export const dashboard = [homeRoutes, projectsRoutes];

export const auth = [authRoutes];

export default [projectsRoutes];
