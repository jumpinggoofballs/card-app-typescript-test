import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryContext } from "./utilities/globalContext";
import { EntryContextType } from './@types/context'

export default function App() {
  const { darkTheme } = useContext(EntryContext) as EntryContextType

  return (
    <section className={`h-full bg-white ${ darkTheme ? "invert" : "" }`}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<AllEntries />}></Route>
          <Route path="create" element={<NewEntry />}></Route>
          <Route path="edit/:id" element={<EditEntry />}></Route>
        </Routes>
      </Router>
    </section>
  );
}
