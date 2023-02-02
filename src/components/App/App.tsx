import { Routes, Route } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import { HomePage } from "components/HomePage/HomePage";
import { GamePage } from "components/GamePage/GamePage";
import { LoginPage } from "components/LoginPage/LoginPage";
import { SignUpPage } from "components/SignUpPage/SignUpPage";
import { NotFoundPage } from "components/NotFoundPage/NotFoundPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
