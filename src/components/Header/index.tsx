import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";

import { IoMdMenu } from "react-icons/io";

import TransctionContext from "../../context/TransactionContext";
import { IoAddCircleOutline } from "react-icons/io5";

import {
  HeaderMainContainer,
  AddTransactionButton,
  ButtonImage,
  ButtonText,
  AddTransctionButton,
  AddTransctionContainer,
  AddTransctionMainContainer,
  AddTransctionTextContainer,
  HeadingTextContainer,
  AddTransctionHeading,
  AddTransctionParagraph,
  AddTransctionCloseImage,
  AddTransctionInputContainer,
  AddTransctionLabel,
  AddTransctionNameInput,
  SelectTransctionType,
  SelectTransctionOptions,
  MobileLogoImage,
  MobileHeaderProfile,
  MobilePopupContainer,
  MobileParagraph,
  MobileAddTransactions,
  ErrorMessageParagraph,
  NotificationMessage,
  PopupContainer,
} from "./styledComponents";

import "./index.css";
import MobileSideBar from "../MobileSideBar";

interface PropsValue {
  updateApi: (id: string) => void;
}

const Header = (props: PropsValue): JSX.Element => {
  const jwtToken: string = Cookies.get("jwt_token")!;

  const getCurrentDateTime = (): string => {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: string = String(now.getMonth() + 1).padStart(2, "0");
    const day: string = String(now.getDate()).padStart(2, "0");
    const hours: string = String(now.getHours()).padStart(2, "0");
    const minutes: string = String(now.getMinutes()).padStart(2, "0");
    const seconds: string = String(now.getSeconds()).padStart(2, "0");
    const dateTimeString: string = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return dateTimeString;
  };

  const [addTransctionStatus, updateTransction] = useState<string>("");

  const [name, addName] = useState<string>("");
  const [type, addType] = useState<string>("credit");
  const [category, addCategory] = useState<string>("Shopping");
  const [amount, addAmount] = useState<number>();
  const [date, addDate] = useState<string>(getCurrentDateTime());
  const [errorMessage, updateErrorMessage] = useState<string>("");

  const AddNameFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value.length >= 30) {
      window.alert("Username shouldn't exceed 30 characters");
    } else {
      addName(event.target.value);
    }
  };

  const addAmountFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    addAmount(parseInt(event.target.value));
  };

  const addDateFunction = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    addDate(event.target.value);
  };

  useEffect((): void => {
    addDate(getCurrentDateTime());
  }, [date]);

  const updateValues = (): void => {
    addName("");
    addType("credit");
    addCategory("Shopping");
    addAmount(undefined);
    addDate("");
  };

  const getLeaderboardData = async (close: () => void): Promise<void> => {
    updateTransction("inprogress");
    updateErrorMessage("");

    let headers: HeadersInit = {};
    let url: string = "";

    if (
      name !== undefined &&
      type !== "" &&
      category !== "" &&
      amount !== undefined &&
      date !== undefined
    ) {
      const body: string = JSON.stringify({
        name,
        type: type.toLowerCase(),
        category,
        amount,
        date,
        user_id: jwtToken,
      });

      headers = {
        "Content-Type": "application/json",
        "x-hasura-role": "user",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-user-id": jwtToken,
      };
      url = "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

      const options: RequestInit = {
        method: "POST",
        headers: headers,
        body: body,
      };
      const response: Response = await fetch(url, options);

      if (response.ok) {
        const { updateApi } = props;
        updateApi(uuidv4());
        updateTransction("");
        updateValues();
        close();
      } else {
        updateTransction("");
      }
    } else {
      updateErrorMessage("Please Fill All Fields");
      updateTransction("");
    }
  };

  const renderSuccessView = (): JSX.Element => {
    return (
      <>
        <Popup
          modal
          trigger={
            <PopupContainer>
              <AddTransactionButton disabled={jwtToken === "3"} type="button">
                <ButtonImage
                  src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705727508/plus_ndqvby.png"
                  alt="plus"
                />{" "}
                Add Transaction
              </AddTransactionButton>
              <MobileAddTransactions type="button" disabled={jwtToken === "3"}>
                <IoAddCircleOutline className="add-icon" />
              </MobileAddTransactions>
            </PopupContainer>
          }
        >
          {/* @ts-ignore */}
          {(close) => (
            <AddTransctionMainContainer>
              <AddTransctionContainer>
                <AddTransctionTextContainer>
                  <HeadingTextContainer>
                    <AddTransctionHeading>Add Transaction</AddTransctionHeading>
                    <AddTransctionParagraph>
                      Lorem ipsum dolor sit amet, consectetur
                    </AddTransctionParagraph>
                  </HeadingTextContainer>
                  <AddTransctionCloseImage
                    onClick={() => {
                      close();
                      updateValues();
                    }}
                    src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                    alt="close"
                  />
                </AddTransctionTextContainer>

                <AddTransctionInputContainer>
                  <AddTransctionLabel htmlFor="addtransctionname">
                    Transaction Name*
                    <NotificationMessage>
                      (Max 30 Characters*)
                    </NotificationMessage>
                  </AddTransctionLabel>
                  <AddTransctionNameInput
                    required
                    type="text"
                    id="addtransctionname"
                    value={name}
                    onChange={AddNameFunction}
                    placeholder="Enter Name"
                    maxLength={30}
                  />
                </AddTransctionInputContainer>

                <AddTransctionInputContainer>
                  <AddTransctionLabel htmlFor="transctionType">
                    Transaction Type*
                  </AddTransctionLabel>
                  <SelectTransctionType
                    required
                    id="transctionType"
                    value={type}
                    onChange={(event) => addType(event.target.value)}
                  >
                    <SelectTransctionOptions value="credit">
                      Credit
                    </SelectTransctionOptions>
                    <SelectTransctionOptions value="debit">
                      Debit
                    </SelectTransctionOptions>
                  </SelectTransctionType>
                </AddTransctionInputContainer>

                <AddTransctionInputContainer>
                  <AddTransctionLabel htmlFor="transctionCategory">
                    Category*
                  </AddTransctionLabel>
                  <SelectTransctionType
                    required
                    id="transctionCategory"
                    value={category}
                    onChange={(event) => addCategory(event.target.value)}
                  >
                    <SelectTransctionOptions value="Shopping">
                      Shopping
                    </SelectTransctionOptions>
                    <SelectTransctionOptions value="Service">
                      Service
                    </SelectTransctionOptions>
                    <SelectTransctionOptions value="Transfer">
                      Transfer
                    </SelectTransctionOptions>
                  </SelectTransctionType>
                </AddTransctionInputContainer>

                <AddTransctionInputContainer>
                  <AddTransctionLabel htmlFor="addtransctionamount">
                    Amount*
                  </AddTransctionLabel>
                  <AddTransctionNameInput
                    required
                    type="number"
                    id="addtransctionamount"
                    value={amount}
                    onChange={addAmountFunction}
                    placeholder="Enter Your Amount"
                  />
                </AddTransctionInputContainer>

                <AddTransctionInputContainer>
                  <AddTransctionLabel htmlFor="addtransctionamount">
                    Date*
                  </AddTransctionLabel>
                  <AddTransctionNameInput
                    className="date-time-field"
                    required
                    type="datetime-local"
                    readOnly
                    id="addtransctionamount"
                    value={date}
                    onChange={addDateFunction}
                    placeholder="Select Date"
                  />
                </AddTransctionInputContainer>

                <AddTransctionButton
                  type="submit"
                  onClick={() => {
                    getLeaderboardData(close);
                  }}
                  disabled={addTransctionStatus === "inprogress"}
                >
                  {addTransctionStatus === "inprogress" ? (
                    <ReactLoading
                      type={"bars"}
                      color={"#ffffff"}
                      height={20}
                      width={30}
                    />
                  ) : (
                    "Add Transaction "
                  )}
                </AddTransctionButton>
                <ErrorMessageParagraph>{errorMessage}</ErrorMessageParagraph>
              </AddTransctionContainer>
            </AddTransctionMainContainer>
          )}
        </Popup>
      </>
    );
  };

  return (
    <TransctionContext.Consumer>
      {(value) => {
        const { selectOption } = value;
        return (
          <HeaderMainContainer>
            <Popup
              modal
              trigger={
                <MobileHeaderProfile>
                  <MobileParagraph>
                    <IoMdMenu />
                  </MobileParagraph>
                </MobileHeaderProfile>
              }
            >
              {/* @ts-ignore */}
              {(close) => (
                <MobilePopupContainer>
                  <MobileSideBar close={close} />
                </MobilePopupContainer>
              )}
            </Popup>
            <MobileLogoImage
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
              alt="logo"
            />
            <ButtonText>
              {selectOption.charAt(0).toUpperCase() +
                selectOption.slice(1).toLowerCase()}
            </ButtonText>
            {renderSuccessView()}
          </HeaderMainContainer>
        );
      }}
    </TransctionContext.Consumer>
  );
};

export default Header;
