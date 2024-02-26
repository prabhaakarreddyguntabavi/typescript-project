import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface ContextValue {
  selectOption: string;
  onChangeSelectOption: (id: string) => any;
  transactionOption: string;
  onChangeTransactionOption: (id: string) => any;
  isUserAdmin: boolean;
  onChangeAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<ContextValue>({
  selectOption: "DASHBOARD",
  onChangeSelectOption: () => {},
  transactionOption: "ALLTRANSACTION",
  onChangeTransactionOption: () => {},
  isUserAdmin: false,
  onChangeAdmin: () => {},
});

const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectOption, onChangeSelect] = useState<string>("DASHBOARD");
  const [isUserAdmin, onChangeAdmin] = useState<boolean>(false);
  const [transactionOption, selectTransactionOption] =
    useState<string>("ALLTRANSACTION");

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    onChangeAdmin(jwtToken === "3");
  }, []);

  const onChangeSelectOption = (id: string) => {
    console.log("stfueueyr8oeyroeyoreytoyerouyeroeytiewryoi");
    console.log(id);
    onChangeSelect(id);
  };

  const onChangeTransactionOption = (id: string) => {
    selectTransactionOption(id);
  };

  return (
    <MyContext.Provider
      value={{
        selectOption,
        onChangeSelectOption,
        transactionOption,
        onChangeTransactionOption,
        isUserAdmin,
        onChangeAdmin,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
