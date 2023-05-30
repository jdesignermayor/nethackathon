import "./App.css";
import { useEffect, useState } from "react";
import { Route, useLocation, Link, Router } from "wouter";
import { useAuthStore } from "./store/auth";

import Navbar from "./components/Navbar";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import InboxPage from "./pages/landing/InboxPage";

import supabase from "../supabaseClient";
import AdminNestedLayout from "./pages/dashboard/AdminNestedLayout";
import HomeAmin from "./pages/dashboard/HomeAdmin";
import Progress from "./pages/dashboard/Progress";
import Awards from "./pages/dashboard/Awards";
import Goals from "./pages/dashboard/Goals";

function App() {
  const [location, setLocation] = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || (event === "INITIAL_SESSION" && session)) {
        const { data: dataUser } = await supabase
          .from("tbl_users")
          .select("id,email,uid,provider")
          .eq("uid", session.user.id)
          .single();

        if (dataUser) {
          await setAuth({
            session,
            user: dataUser,
          });

          setLocation("/dashboard");
        }
      } else if (event === "SIGNED_OUT") {
        console.log("SIGNED_OUT");
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Router>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <AdminNestedLayout base="/dashboard">
          <Route path="/" component={HomeAmin} />
          <Route path="/goals" component={Goals} />
          <Route path="/progress" component={Progress} />
          <Route path="/awards" component={Awards} />
        </AdminNestedLayout>
        <Route path="/" component={InboxPage} />
      </Router>
    </>
  );
}

export default App;
