import { Routes, Route } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import { HomePage } from "components/HomePage/HomePage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<HomePage />} />
        <Route path="dashboard" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
