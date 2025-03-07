import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeContextType } from "./@types/context";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider, ThemeContext } from "./utilities/globalContext";

export default function App() {
  const { darkTheme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <section className={`h-full bg-white ${darkTheme ? "invert" : ""}`}>
      <Router>
        <EntryProvider>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<AllEntries />}></Route>
            <Route path="create" element={<NewEntry />}></Route>
            <Route path="edit/:id" element={<EditEntry />}></Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}
