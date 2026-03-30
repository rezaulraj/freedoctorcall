import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/home/HomePage";
import Specialties from "./pages/specialties/Specialties";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/specialties" element={<Specialties />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
