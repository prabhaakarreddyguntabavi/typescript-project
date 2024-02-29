import { useState } from "react";
import Cookies from "js-cookie";
// import ErrorPopup from "../ErrorMessage";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";

import {
  AddTransactionButton,
  AddTransactionInputContainer,
  AddTransactionLabel,
  AddTransactionNameInput,
  SelectTransactionType,
  SelectTransactionOptions,
} from "./styledComponents";

// const apiStatusConstants = {
//   initial: "INITIAL",
//   inProgress: "IN_PROGRESS",
//   success: "SUCCESS",
//   failure: "FAILURE",
// };

const setTimeFormate = (date: any) => {
  const inputDateString = date;
  const inputDate = new Date(inputDateString);

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const hours = String(inputDate.getHours()).padStart(2, "0");
  const minutes = String(inputDate.getMinutes()).padStart(2, "0");
  const seconds = String(inputDate.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

const UpdateTransaction = (props: any) => {
  const { eachTransaction, close, callTransactionsUpdate } = props;

  const [apiResponse, setApiResponse] = useState<any>({
    status: "",
    data: null,
  });

  const [addTransactionStatus, updateTransaction] = useState<string>("");

  // const [errorMessage, updateErrorMessage] = useState(false);

  const [showError, setShowError] = useState<boolean>(false);

  const handleShowError = () => {
    setShowError(true);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const [name, addName] = useState<string>(eachTransaction.transaction_name);
  const [type, addType] = useState<string>(eachTransaction.type);
  const [category, addCategory] = useState<string>(eachTransaction.category);
  const [amount, AddAmount] = useState<number>(eachTransaction.amount);
  const [date, addDate] = useState<string>(eachTransaction.date);

  const AddNameFunction = (event: any) => {
    if (event.target.value.length >= 30) {
      window.alert("Username shouldn't exceed 30 characters");
    } else {
      addName(event.target.value);
    }
  };

  const addTypeFunction = (event: any) => {
    addType(event.target.value);
  };

  const addCategoryFunction = (event: any) => {
    addCategory(event.target.value);
  };

  const AddAmountFunction = (event: any) => {
    AddAmount(event.target.value);
  };

  const addDateFunction = (event: any) => {
    addDate(event.target.value);
  };

  const jwtToken = Cookies.get("jwt_token");

  const getLeaderboardData = async () => {
    updateTransaction("inprogress");

    setApiResponse({
      status: "",
      data: null,
    });

    let headers = {};
    let url = "";

    const body = JSON.stringify({
      id: eachTransaction.id,
      name,
      type,
      category,
      amount,
      date,
    });

    headers = {
      "Content-Type": "application/json",
      "x-hasura-role": "user",
      "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-user-id": jwtToken,
    };
    url = "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

    const options = {
      method: "POST",
      headers: headers,
      body: body,
    };
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (response.ok) {
      callTransactionsUpdate(uuidv4());
      close(false);
      setApiResponse({
        status: "",
        data: responseData.transactions,
        errorMsg: null,
      });
    } else {
      handleShowError();
      setApiResponse({
        status: "",
        data: null,
        errorMsg: responseData.error,
      });
    }
  };

  return (
    <>
      <AddTransactionInputContainer>
        <AddTransactionLabel htmlFor="addtransactionname">
          Transaction Name*
        </AddTransactionLabel>
        <AddTransactionNameInput
          required
          type="text"
          id="addtransactionname"
          value={name}
          onChange={AddNameFunction}
          placeholder="Enter Name"
          maxLength={30}
        />
      </AddTransactionInputContainer>

      <AddTransactionInputContainer>
        <AddTransactionLabel htmlFor="transactionType">
          Transaction Type*
        </AddTransactionLabel>
        <SelectTransactionType
          required
          id="transactionType"
          value={type}
          onChange={addTypeFunction}
        >
          <SelectTransactionOptions value="credit">
            Credit
          </SelectTransactionOptions>
          <SelectTransactionOptions value="debit">
            Debit
          </SelectTransactionOptions>
        </SelectTransactionType>
      </AddTransactionInputContainer>

      <AddTransactionInputContainer>
        <AddTransactionLabel htmlFor="transactionCategory">
          Category*
        </AddTransactionLabel>
        <SelectTransactionType
          required
          // placeholder="Select"
          id="transactionCategory"
          value={category}
          onChange={addCategoryFunction}
        >
          <SelectTransactionOptions value="Shopping">
            Shopping
          </SelectTransactionOptions>
          <SelectTransactionOptions value="Service">
            Service
          </SelectTransactionOptions>
          <SelectTransactionOptions value="Transfer">
            Transfer
          </SelectTransactionOptions>
        </SelectTransactionType>
      </AddTransactionInputContainer>

      <AddTransactionInputContainer>
        <AddTransactionLabel htmlFor="addtransactionamount">
          Amount*
        </AddTransactionLabel>
        <AddTransactionNameInput
          required
          type="number"
          id="addtransactionamount"
          value={amount}
          onChange={AddAmountFunction}
          placeholder="Enter Your Amount"
        />
      </AddTransactionInputContainer>

      <AddTransactionInputContainer>
        <AddTransactionLabel htmlFor="addtransactionamount">
          Date*
        </AddTransactionLabel>
        <AddTransactionNameInput
          readOnly
          required
          type="datetime-local"
          id="addtransactionamount"
          value={setTimeFormate(date)}
          onChange={addDateFunction}
          placeholder="Select Date"
        />
      </AddTransactionInputContainer>

      <AddTransactionButton
        type="button"
        onClick={() => {
          getLeaderboardData();
        }}
        disabled={addTransactionStatus === "inprogress"}
      >
        {addTransactionStatus === "inprogress" ? (
          <ReactLoading
            type={"bars"}
            color={"#ffffff"}
            height={20}
            width={30}
          />
        ) : (
          "Update Transaction "
        )}
      </AddTransactionButton>
      {showError && (
        <p>Please Check All Fields Values</p>
        // <ErrorPopup message={apiResponse.errorMsg} onClose={handleCloseError} />
      )}
    </>
  );
};

export default UpdateTransaction;
