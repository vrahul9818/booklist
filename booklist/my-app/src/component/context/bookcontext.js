import React, { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [selectedBook, setSelectedBook] = useState([]);

  return (
    <DataContext.Provider value={{ selectedBook, setSelectedBook}}>
      {props.children}
    </DataContext.Provider>
  );
};