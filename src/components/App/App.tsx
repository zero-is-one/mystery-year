import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import { HomePage } from "components/HomePage/HomePage";
import { GamePage } from "components/GamePage/GamePage";
import { LoginPage } from "components/LoginPage/LoginPage";
import { SignUpPage } from "components/SignUpPage/SignUpPage";
import { NotFoundPage } from "components/NotFoundPage/NotFoundPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFirebaseAuth } from "hooks/useFirebase/useFirebase";
import { signInAnonymously } from "firebase/auth";

export const App = () => {
  const authInstance = useFirebaseAuth();
  const [authUser, authLoading] = useAuthState(authInstance);

  useEffect(() => {
    if (authLoading || authUser || !authInstance) return;

    signInAnonymously(authInstance);
  }, [authLoading, authUser, authInstance]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="game/:id" element={<GamePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
