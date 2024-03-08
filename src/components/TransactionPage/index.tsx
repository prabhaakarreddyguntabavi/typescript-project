import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import { useNavigate, NavigateFunction } from "react-router-dom";

import SideBar from "../SideBar";
import Header from "../Header";
import TransactionContext from "../../context/TransactionContext";
import UpdateTransaction from "../UpdateTransaction";
import DeleteTransaction from "../DeleteTransaction";
import FailureCase from "../FailureCase";

import {
  TransactionHomePage,
  TransactionTotalBodyContainer,
  TransactionsContainer,
  DashTransactionContainer,
  CreditDebitImage,
  TitleParagraph,
  CategoryParagraph,
  DateOfTransactionParagraph,
  EditImage,
  DeleteImage,
  TransactionBodyContainer,
  SelectFilterConditions,
  TransactionSelectFilter,
  SelectAllOption,
  SelectedContainer,
  SelectOption,
  SelectedCreditContainer,
  TransactionName,
  TransactionCategory,
  TransactionDate,
  TransactionAmount,
  CreditAmount,
  DebitAmount,
  LoadingContainer,
  HeadingDashTransactionContainer,
  NoTransactionsFountHeading,
  AddTransactionContainer,
  AddTransactionMainContainer,
  AddTransactionTextContainer,
  HeadingTextContainer,
  AddTransactionHeading,
  AddTransactionParagraph,
  AddTransactionCloseImage,
  LogoutContainer,
  AdminProfileContainer,
  TransactionUserName,
  UserProfileDetails,
  TitleUserParagraph,
  AdminContainer,
  UserContainer,
  EditDeleteContainer,
  TransactionParagraphMobile,
  TextContainer,
} from "./styledComponents";

interface DataValues {
  id: number;
  transaction_name: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  user_id?: number;
}

interface FetchedData {
  transactions: DataValues[];
}
interface ApiOutputStatus {
  status: string;
  data: DataValues[];
  errorMsg?: string;
}

interface ApiStatusValues {
  initial: string;
  inProgress: string;
  success: string;
  failure: string;
}

interface DateValue {
  date: string;
}

interface ConsumerValues {
  selectOption: string;
  onChangeSelectOption: (id: string) => void;
}

interface UserDetail {
  id?: number;
  name: string;
  email?: string;
  country?: string | null;
  date_of_birth?: string | null;
  city?: string | null;
  permanent_address?: string | null;
  postal_code?: string | null;
  present_address?: string | null;
}

interface FetchOutPut {
  users: UserDetail[];
}

const apiStatusConstants: ApiStatusValues = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const TransactionPage = (): JSX.Element => {
  const jwtToken = Cookies.get("jwt_token");
  const navigate: NavigateFunction = useNavigate();

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: apiStatusConstants.initial,
    data: [],
  });

  const [allProfileDetails, setProfileDetailsApiResponse] = useState<
    UserDetail[]
  >([]);

  const [filterOption, onChangeFilter] = useState<string>("alltransactions");

  const [callApi, updateApi] = useState<string>("");

  const DateFormate = (date: string): string => {
    const inputDateString: string = date;
    const inputDate: Date = new Date(inputDateString);

    const day: number = inputDate.getDate();
    const monthNames: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month: string = monthNames[inputDate.getMonth()];
    const hours: number = inputDate.getHours();
    const minutes: number = inputDate.getMinutes();
    const ampm: string = hours >= 12 ? "PM" : "AM";

    const formattedDate: string = `${day} ${month}, ${
      hours % 12
    }:${minutes} ${ampm}`;

    return formattedDate;
  };

  useEffect((): void => {
    if (!jwtToken) {
      navigate("/login");
    } else {
      const getLeaderboardData = async (): Promise<void> => {
        setApiResponse({
          status: apiStatusConstants.inProgress,
          data: [],
        });

        let headers: HeadersInit = {};
        let url: string = "";

        if (jwtToken === "3") {
          headers = {
            "Content-Type": "application/json",
            "x-hasura-role": "admin",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-user-id": jwtToken,
          };

          url =
            "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
        } else {
          headers = {
            "Content-Type": "application/json",
            "x-hasura-role": "user",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-user-id": jwtToken,
          };
          url =
            "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
        }

        if (jwtToken === "3") {
          const options = {
            method: "GET",
            headers: headers,
          };
          const allProfileDetails: Response = await fetch(
            "https://bursting-gelding-24.hasura.app/api/rest/profile",
            options
          );
          const outPut: FetchOutPut = await allProfileDetails.json();

          setProfileDetailsApiResponse(outPut.users);
        }

        const limit: number = 1000;
        const offset: number = 0;

        const queryParams: string = `?limit=${limit}&offset=${offset}`;
        const finalUrl: string = `${url}${queryParams}`;

        const options: RequestInit = {
          method: "GET",
          headers: headers,
        };
        const response: Response = await fetch(finalUrl, options);
        const responseData: FetchedData = await response.json();

        if (response.ok) {
          setApiResponse({
            status: apiStatusConstants.success,
            data: [...responseData.transactions].sort(
              (a: DateValue, b: DateValue) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            ),
          });
        } else {
          setApiResponse({
            status: apiStatusConstants.failure,
            data: [],
            errorMsg: "",
          });
        }
      };

      getLeaderboardData();
    }
  }, [navigate, jwtToken, callApi]);

  const callTransactionsUpdate = (id: string): void => {
    updateApi(id);
  };

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;

    let transactionsData = data;
    if (filterOption !== "alltransactions") {
      transactionsData = data.filter(
        (eachTransactionData) =>
          eachTransactionData.type.toUpperCase() === filterOption.toUpperCase()
      );
    }

    if (transactionsData.length !== 0) {
      return (
        <>
          <HeadingDashTransactionContainer>
            {jwtToken === "3" ? (
              <TransactionUserName>User Name</TransactionUserName>
            ) : (
              ""
            )}
            <TransactionName isAdmin={jwtToken === "3"}>
              Transaction Name
            </TransactionName>
            <TransactionCategory isAdmin={jwtToken === "3"}>
              Category
            </TransactionCategory>
            <TransactionDate isAdmin={jwtToken === "3"}>Date</TransactionDate>
            <TransactionAmount isAdmin={jwtToken === "3"}>
              Amount
            </TransactionAmount>
          </HeadingDashTransactionContainer>

          {transactionsData.map(
            (eachTransaction: DataValues, index: number) => {
              let user: UserDetail | undefined;

              if (allProfileDetails === undefined) {
                user = { name: "Admin" };
              } else {
                user = allProfileDetails.find(
                  (findUser: UserDetail) =>
                    findUser.id === eachTransaction.user_id
                );
              }

              return (
                <DashTransactionContainer
                  length={transactionsData.length - 1 === index}
                  key={eachTransaction.id}
                >
                  {jwtToken === "3" ? (
                    <AdminContainer isAdmin={jwtToken === "3"}>
                      {eachTransaction.type === "credit" ? (
                        <CreditDebitImage
                          isAdmin={jwtToken === "3"}
                          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_1_idrnjp.png"
                          alt="image"
                        />
                      ) : (
                        <CreditDebitImage
                          isAdmin={jwtToken === "3"}
                          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_oztkbu.png"
                          alt="image"
                        />
                      )}

                      <UserProfileDetails>
                        <AdminProfileContainer isAdmin={jwtToken === "3"}>
                          {user !== undefined ? user.name[0].toUpperCase() : ""}
                        </AdminProfileContainer>
                        <TitleUserParagraph>
                          {user !== undefined ? user.name : ""}
                        </TitleUserParagraph>
                      </UserProfileDetails>
                    </AdminContainer>
                  ) : (
                    ""
                  )}

                  <UserContainer isAdmin={jwtToken === "3"}>
                    {jwtToken !== "3" ? (
                      <>
                        {" "}
                        {eachTransaction.type === "credit" ? (
                          <CreditDebitImage
                            isAdmin={jwtToken === "3"}
                            src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_1_idrnjp.png"
                            alt="image"
                          />
                        ) : (
                          <CreditDebitImage
                            isAdmin={jwtToken === "3"}
                            src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706182841/Group_73_oztkbu.png"
                            alt="image"
                          />
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    <TextContainer>
                      <TitleParagraph>
                        {eachTransaction.transaction_name}
                      </TitleParagraph>
                      <TransactionParagraphMobile>
                        {DateFormate(eachTransaction.date)}
                      </TransactionParagraphMobile>
                    </TextContainer>
                  </UserContainer>
                  <CategoryParagraph isAdmin={jwtToken === "3"}>
                    {eachTransaction.category}
                  </CategoryParagraph>
                  <DateOfTransactionParagraph>
                    {DateFormate(eachTransaction.date)}
                  </DateOfTransactionParagraph>

                  {eachTransaction.type === "credit" ? (
                    <CreditAmount isAdmin={jwtToken === "3"}>
                      +${eachTransaction.amount}
                    </CreditAmount>
                  ) : (
                    <DebitAmount isAdmin={jwtToken === "3"}>
                      -${eachTransaction.amount}
                    </DebitAmount>
                  )}
                  <EditDeleteContainer isAdmin={jwtToken === "3"}>
                    {jwtToken === "3" ? (
                      ""
                    ) : (
                      <>
                        <Popup
                          modal
                          trigger={
                            <EditImage
                              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/pencil-02_lbbupq.png"
                              alt="edit"
                            />
                          }
                        >
                          {/* @ts-ignore */}
                          {(close) => (
                            <AddTransactionMainContainer>
                              <AddTransactionContainer>
                                <AddTransactionTextContainer>
                                  <HeadingTextContainer>
                                    <AddTransactionHeading>
                                      Update Transaction
                                    </AddTransactionHeading>
                                    <AddTransactionParagraph>
                                      You can update your transaction here
                                    </AddTransactionParagraph>
                                  </HeadingTextContainer>
                                  <AddTransactionCloseImage
                                    onClick={() => close()}
                                    src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                                    alt="close"
                                  />
                                </AddTransactionTextContainer>
                                <UpdateTransaction
                                  eachTransaction={eachTransaction}
                                  close={close}
                                  callTransactionsUpdate={
                                    callTransactionsUpdate
                                  }
                                />
                              </AddTransactionContainer>
                            </AddTransactionMainContainer>
                          )}
                        </Popup>

                        <Popup
                          modal
                          trigger={
                            <DeleteImage
                              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/trash-01_uaykhq.png"
                              alt="delete"
                            />
                          }
                        >
                          {/* @ts-ignore */}
                          {(close) => (
                            <LogoutContainer>
                              <DeleteTransaction
                                id={eachTransaction.id}
                                close={close}
                                callTransactionsUpdate={callTransactionsUpdate}
                              />
                            </LogoutContainer>
                          )}
                        </Popup>
                      </>
                    )}
                  </EditDeleteContainer>
                </DashTransactionContainer>
              );
            }
          )}
        </>
      );
    }
    return (
      <NoTransactionsFountHeading>
        No Transactions Found
      </NoTransactionsFountHeading>
    );
  };

  const renderLoadingView = (): JSX.Element => (
    <LoadingContainer data-testid="loader">
      <ReactLoading type={"bars"} color={"#000000"} height={50} width={50} />
    </LoadingContainer>
  );

  const renderFailureView = (): JSX.Element => (
    <FailureCase updateApi={updateApi} />
  );

  const renderLeaderboard = (): JSX.Element | null => {
    const { status } = apiResponse;
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <TransactionContext.Consumer>
      {(value: ConsumerValues) => {
        const { selectOption, onChangeSelectOption } = value;

        if (selectOption !== "TRANSACTIONS") {
          onChangeSelectOption("TRANSACTIONS");
        }

        return (
          <TransactionHomePage>
            <SideBar />
            <TransactionTotalBodyContainer>
              <Header updateApi={updateApi} />
              <SelectFilterConditions>
                <TransactionSelectFilter
                  onClick={() => {
                    onChangeFilter("alltransactions");
                  }}
                >
                  <SelectAllOption
                    transactionOption={filterOption === "alltransactions"}
                  >
                    All Transaction
                  </SelectAllOption>
                  <SelectedContainer
                    transactionOption={filterOption === "alltransactions"}
                  ></SelectedContainer>
                </TransactionSelectFilter>

                <TransactionSelectFilter
                  onClick={() => {
                    onChangeFilter("credit");
                  }}
                >
                  <SelectOption transactionOption={filterOption === "credit"}>
                    Credit
                  </SelectOption>
                  <SelectedCreditContainer
                    transactionOption={filterOption === "credit"}
                  ></SelectedCreditContainer>
                </TransactionSelectFilter>

                <TransactionSelectFilter
                  onClick={() => {
                    onChangeFilter("debit");
                  }}
                >
                  <SelectOption transactionOption={filterOption === "debit"}>
                    Debit
                  </SelectOption>
                  <SelectedCreditContainer
                    transactionOption={filterOption === "debit"}
                  ></SelectedCreditContainer>
                </TransactionSelectFilter>
              </SelectFilterConditions>
              <TransactionBodyContainer>
                <TransactionsContainer>
                  {renderLeaderboard()}
                </TransactionsContainer>
              </TransactionBodyContainer>
            </TransactionTotalBodyContainer>
          </TransactionHomePage>
        );
      }}
    </TransactionContext.Consumer>
  );
};

export default TransactionPage;
