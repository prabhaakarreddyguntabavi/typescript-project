// import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import TransactionContext from "./context/TransactionContext";

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import TransactionPage from "./components/TransactionPage";
import ProfileDetails from "./components/ProfileDetails";
// import Cookies from "js-cookie";

const App = (): JSX.Element => {
  // const onChangeTransactionOption = (id: any) => {
  //   selectTransactionOption(id);
  // };

  return (
    // <TransactionContext.Provider
    //   value={{
    //     selectOption,
    //     onChangeSelectOption: () => onChangeSelectOption, // Pass the function without invoking it
    //     transactionOption,
    //     selectTransactionOption: () => selectTransactionOption, // Provide a default empty function
    //     isUserAdmin,
    //     onChangeAdmin: () => onChangeAdmin, // Provide a default empty function
    //   }}
    // >
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/profile" element={<ProfileDetails />} />
      </Routes>
    </BrowserRouter>
    // </TransactionContext.Provider>
  );
};

export default App;
