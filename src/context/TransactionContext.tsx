import React from "react";

const TransactionContext = React.createContext({
  selectOption: "DASHBOARD",
  onChangeSelectOption: (id: string) => {},
  transactionOption: "ALLTRANSACTION",
  onChangeTransactionOption: (id: string) => {},
  isUserAdmin: false,
  onChangeAdmin: () => {},
});

export default TransactionContext;
