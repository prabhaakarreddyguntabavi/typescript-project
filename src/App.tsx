import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TransactionContext from "./context/TransactionContext";

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import TransactionPage from "./components/TransactionPage";
import ProfileDetails from "./components/ProfileDetails";
import Cookies from "js-cookie";

const App = (): JSX.Element => {
  const [selectOption, onChangeSelect] = useState("DASHBOARD");

  const [isUserAdmin, onChangeAdmin] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken === "3") {
      onChangeAdmin(true);
    } else {
      onChangeAdmin(false);
    }
  }, []);

  const [transactionOption, selectTransactionOption] =
    useState("ALLTRANSACTION");

  const onChangeSelectOption = (id: string) => {
    onChangeSelect(id);
  };

  const onChangeTransactionOption = (id: string) => {
    selectTransactionOption(id);
  };

  return (
    <TransactionContext.Provider
      value={{
        selectOption,
        onChangeSelectOption: onChangeSelectOption,
        transactionOption,
        onChangeTransactionOption: onChangeTransactionOption,
        isUserAdmin,
        onChangeAdmin: () => onChangeAdmin,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/profile" element={<ProfileDetails />} />
        </Routes>
      </BrowserRouter>
      //{" "}
    </TransactionContext.Provider>
  );
};

export default App;
