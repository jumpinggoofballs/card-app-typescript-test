import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Entry, EntryContextType, ThemeContextType } from "../@types/context";

export const EntryContext = createContext<EntryContextType | null>(null);

export const EntryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const initState = async () => {
    const data = await axios.get<Entry[]>("http://localhost:3001/get/");
    const initialStateBody = data.data;
    setEntries(initialStateBody);
  };

  useEffect(() => {
    initState();
  }, []);

  const saveEntry = async (entry: Entry) => {
    const requestData = await axios.post<Entry>("http://localhost:3001/create/", entry);
    const newEntry = requestData.data;
    setEntries([...entries, newEntry]);
  };

  const updateEntry = async (id: string, entry: Entry) => {
    await axios.put<Entry>(`http://localhost:3001/update/${id}`, entry);
    setEntries((entries) => {
      const entryIndex = entries.findIndex((obj) => obj.id == id);
      entries[entryIndex] = entry;
      return entries;
    });
  };
  const deleteEntry = async (id: string) => {
    await axios.delete<Entry>(`http://localhost:3001/delete/${id}`);
    setEntries((e) => e.filter((entry) => entry.id != id));
  };

  return (
    <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry }}>{children}</EntryContext.Provider>
  );
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const changeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return <ThemeContext.Provider value={{ darkTheme, changeTheme }}>{children}</ThemeContext.Provider>;
};
