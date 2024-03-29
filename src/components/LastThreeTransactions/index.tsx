import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import { useNavigate, NavigateFunction } from "react-router-dom";

import UpdateTransaction from "../UpdateTransaction";
import DeleteTransaction from "../DeleteTransaction";
import FailureCase from "../FailureCase";

import { ApiStatus, TransctionProps } from "../InterfaceDefining";

import {
  TransactionsContainer,
  DachTransactionContainer,
  CrediteDebitImage,
  TitleParagraph,
  CategaryParagraph,
  DateOfTransactionParagraph,
  EditImage,
  DeleteImage,
  CrediteAmount,
  DebitAmount,
  LoadingContainer,
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
  UserProfileDetails,
  TitleUserParagraph,
  AdminContainer,
  UserContainer,
  EditDeleteContainer,
  TransactionParagraphMobile,
  FailureContainer,
  TextContainer,
} from "./styledComponents";

interface PropsValue {
  callApi: string;
  lastThreeTransactions: (id: string) => void;
}

interface Short {
  id: number;
}

interface FetchedData {
  transactions: TransctionProps[];
}

export interface ApiStatusAndData {
  status: string;
  data: TransctionProps[];
  errorMsg?: string;
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

const apiStatusConstants: ApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const TransactionPage = (props: PropsValue): JSX.Element => {
  const { callApi, lastThreeTransactions }: PropsValue = props;
  const [failedCaseCallApi, failedCaseLastThreeTransactions] =
    useState<string>("");

  const jwtToken: string = Cookies.get("jwt_token")!;
  const navigate: NavigateFunction = useNavigate();

  const [apiResponse, setApiResponse] = useState<ApiStatusAndData>({
    status: apiStatusConstants.initial,
    data: [],
  });

  const [allProfileDetails, setProfileDetailsApiResponse] = useState<
    UserDetail[]
  >([]);

  const callTransactionsUpdate = (id: string): void => {
    lastThreeTransactions(id);
  };

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
          const options: RequestInit = {
            method: "GET",
            headers: headers,
          };
          const allProfileDetails = await fetch(
            "https://bursting-gelding-24.hasura.app/api/rest/profile",
            options
          );
          const outPut: FetchOutPut = await allProfileDetails.json();

          setProfileDetailsApiResponse(outPut.users);
        }

        const limit: number = 10000;
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
          const ListOfTransactions: TransctionProps[] =
            responseData.transactions.sort((a: Short, b: Short) => b.id - a.id);

          setApiResponse({
            status: apiStatusConstants.success,
            data: ListOfTransactions.slice(0, 3),
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
  }, [navigate, jwtToken, callApi, failedCaseCallApi]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;
    let transactionsData: TransctionProps[] = data;

    if (transactionsData.length !== 0) {
      return (
        <>
          {transactionsData.map(
            (eachTransaction: TransctionProps, index: number) => {
              let user: UserDetail | undefined;

              if (allProfileDetails === undefined) {
                user = { name: "" };
              } else {
                user = allProfileDetails.find(
                  (findUser: UserDetail) =>
                    findUser.id === eachTransaction.user_id
                );
              }

              return (
                <DachTransactionContainer
                  isAdmin={transactionsData.length - 1 === index}
                  key={eachTransaction.id}
                >
                  {jwtToken === "3" ? (
                    <AdminContainer isAdmin={jwtToken === "3"}>
                      {eachTransaction.type === "credit" ? (
                        <CrediteDebitImage
                          isAdmin={jwtToken === "3"}
                          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706166669/Ellipse_21_bdfznp.png"
                          alt="image"
                        />
                      ) : (
                        <CrediteDebitImage
                          isAdmin={jwtToken === "3"}
                          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/Group_328_hbywun.png"
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
                          <CrediteDebitImage
                            isAdmin={jwtToken === "3"}
                            src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706166669/Ellipse_21_bdfznp.png"
                            alt="image"
                          />
                        ) : (
                          <CrediteDebitImage
                            isAdmin={jwtToken === "3"}
                            src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705900717/Group_328_hbywun.png"
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
                  <CategaryParagraph isAdmin={jwtToken === "3"}>
                    {eachTransaction.category}
                  </CategaryParagraph>
                  <DateOfTransactionParagraph>
                    {DateFormate(eachTransaction.date)}
                  </DateOfTransactionParagraph>

                  {eachTransaction.type === "credit" ? (
                    <CrediteAmount isAdmin={jwtToken === "3"}>
                      +${eachTransaction.amount}
                    </CrediteAmount>
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
                                id={eachTransaction.id.toString()}
                                close={close}
                                callTransactionsUpdate={callTransactionsUpdate}
                              />
                            </LogoutContainer>
                          )}
                        </Popup>
                      </>
                    )}
                  </EditDeleteContainer>
                </DachTransactionContainer>
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
    <LoadingContainer
      className="products-loader-container"
      data-testid="loader"
    >
      <ReactLoading type={"bars"} color={"#000000"} height={50} width={50} />
    </LoadingContainer>
  );

  const renderFailureView = (): JSX.Element => (
    <FailureContainer>
      <FailureCase updateApi={failedCaseLastThreeTransactions} />
    </FailureContainer>
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

  return <TransactionsContainer>{renderLeaderboard()}</TransactionsContainer>;
};

export default TransactionPage;
