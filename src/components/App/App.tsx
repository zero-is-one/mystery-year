import { useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import { HomePage } from "components/HomePage/HomePage";
import { GamePage } from "components/GamePage/GamePage";
import { GameResultsPage } from "components/GameResultsPage/GameResultsPage";
import { LoginPage } from "components/LoginPage/LoginPage";
import { SignUpPage } from "components/SignUpPage/SignUpPage";
import { NotFoundPage } from "components/NotFoundPage/NotFoundPage";
import { AccountPage } from "components/AccountPage/AccountPage";
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
        <Route path="/:gameId" element={<ValidateGamePage />} />
        <Route path="/result/:gameResultId" element={<GameResultsPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

const ValidateGamePage = () => {
  let { gameId } = useParams();
  if (!gameId) return <NotFoundPage />;
  if (gameId.length !== 7) return <NotFoundPage />;

  return <GamePage />;
};
