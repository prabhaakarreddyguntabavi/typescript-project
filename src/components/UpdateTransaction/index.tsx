import { useState } from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";

import {
  AddTransactionButton,
  AddTransactionInputContainer,
  AddTransactionLabel,
  AddTransactionNameInput,
  SelectTransactionType,
  SelectTransactionOptions,
  ErrorMessage,
} from "./styledComponents";

const setTimeFormate = (date: string): string => {
  const inputDateString: string = date;
  const inputDate: Date = new Date(inputDateString);

  const year: number = inputDate.getFullYear();
  const month: string = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day: string = String(inputDate.getDate()).padStart(2, "0");

  const hours: string = String(inputDate.getHours()).padStart(2, "0");
  const minutes: string = String(inputDate.getMinutes()).padStart(2, "0");
  const seconds: string = String(inputDate.getSeconds()).padStart(2, "0");

  const formattedDateTime: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

interface EachTransction {
  transaction_name: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  id: number;
  user_id?: number;
}

interface PropsValues {
  eachTransaction: EachTransction;
  close: () => void;
  callTransactionsUpdate: (id: string) => void;
}

interface DataValues {
  id: string;
  transaction_name: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  user_id: string;
}
interface ApiOutputStatus {
  status: string;
  data: DataValues[];
  errorMsg?: string;
}

const UpdateTransaction = (props: PropsValues): JSX.Element => {
  const { eachTransaction, close, callTransactionsUpdate }: PropsValues = props;

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: "",
    data: [],
    errorMsg: undefined,
  });

  const [addTransactionStatus, updateTransaction] = useState<string>("");

  const [name, addName] = useState<string>(eachTransaction.transaction_name);
  const [type, addType] = useState<string>(eachTransaction.type);
  const [category, addCategory] = useState<string>(eachTransaction.category);
  const [amount, AddAmount] = useState<number>(eachTransaction.amount);
  const [date, addDate] = useState<string>(eachTransaction.date);

  const AddNameFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value.length >= 30) {
      window.alert("Username shouldn't exceed 30 characters");
    } else {
      addName(event.target.value);
    }
  };

  const AddAmountFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    AddAmount(parseInt(event.target.value));
  };

  const addDateFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    addDate(event.target.value);
  };

  const jwtToken: string = Cookies.get("jwt_token")!;

  const getLeaderboardData = async (): Promise<void> => {
    updateTransaction("inprogress");

    setApiResponse({
      status: "",
      data: [],
    });

    let headers: HeadersInit = {};
    let url: string = "";

    const body: string = JSON.stringify({
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

    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: body,
    };
    const response: Response = await fetch(url, options);

    if (response.ok) {
      callTransactionsUpdate(uuidv4());
      close();
      setApiResponse({
        status: "",
        data: [],
        errorMsg: "",
      });
    } else {
      setApiResponse({
        status: "",
        data: [],
        errorMsg: "Details are in correct",
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
          onChange={(event) => addType(event.target.value)}
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
          onChange={(event) => addCategory(event.target.value)}
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
      {apiResponse.errorMsg !== undefined && (
        <ErrorMessage>Invalid Field Responses*</ErrorMessage>
      )}
    </>
  );
};

export default UpdateTransaction;
