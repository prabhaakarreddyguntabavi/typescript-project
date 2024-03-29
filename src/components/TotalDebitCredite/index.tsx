import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";

import { ApiStatus } from "../InterfaceDefining";

import {
  CreditContainer,
  HeadingAmount,
  Paragraph,
  CreditImage,
  CreditTextContainer,
  ImageContainer,
  AmountDetailsContainer,
  DebitContainer,
  DebitTextContainer,
  DebitImageContainer,
  DebitHeadingAmount,
  DebitImage,
  LoadingContainer,
} from "./styledComponents";
import FailureCase from "../FailureCase";

const apiStatusConstants: ApiStatus = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

interface DataOutPut {
  sum: number;
  type: string;
}
interface FetchedOutput {
  totals_credit_debit_transactions?: DataOutPut[];
  transaction_totals_admin?: DataOutPut[];
}

interface PropsValue {
  isUserAdmin: boolean;
  callApi: string;
}

interface ApiOutputStatus {
  status: string;
  data: DataOutPut[];
  errorMsg?: string;
}

const TotalDebitCredit = (props: PropsValue): JSX.Element => {
  const { isUserAdmin, callApi } = props;

  const [callBack, updateApi] = useState<string>("");

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: apiStatusConstants.initial,
    data: [],
  });

  useEffect((): void => {
    const jwtToken: string = Cookies.get("jwt_token")!;
    const getLeaderboardData = async (): Promise<void> => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: [],
      });

      let headers: HeadersInit = {};
      let url: string = "";

      if (isUserAdmin) {
        headers = {
          "Content-Type": "application/json",
          "x-hasura-role": "admin",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-user-id": jwtToken,
        };

        url =
          "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin";
      } else {
        headers = {
          "Content-Type": "application/json",
          "x-hasura-role": "user",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-user-id": jwtToken,
        };
        url =
          "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
      }

      const options: RequestInit = {
        method: "GET",
        headers: headers,
      };
      const response: Response = await fetch(url, options);
      const responseData: FetchedOutput = await response.json();

      if (response.ok) {
        if (
          responseData &&
          responseData.totals_credit_debit_transactions &&
          responseData.totals_credit_debit_transactions.length > 0
        ) {
          setApiResponse({
            status: apiStatusConstants.success,
            data: (!isUserAdmin
              ? responseData.totals_credit_debit_transactions
              : responseData.transaction_totals_admin)!,
          });
        } else {
          setApiResponse({
            status: apiStatusConstants.success,
            data: [
              {
                sum: 0,
                type: "credit",
              },
              {
                sum: 0,
                type: "debit",
              },
            ],
          });
        }
      } else {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: [],
          errorMsg: "",
        });
      }
    };

    getLeaderboardData();
  }, [callApi, callBack]);

  const renderSuccessView = (): JSX.Element => {
    return (
      <>
        <CreditContainer>
          <CreditTextContainer>
            <HeadingAmount>
              $ {apiResponse.data[apiResponse.data.length - 2].sum}
            </HeadingAmount>
            <Paragraph>Credit</Paragraph>
          </CreditTextContainer>
          <ImageContainer>
            <CreditImage
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705735242/Group_itp5q8.png"
              alt="group"
            />
          </ImageContainer>
        </CreditContainer>

        <DebitContainer>
          <DebitTextContainer>
            <DebitHeadingAmount>
              $ {apiResponse.data[apiResponse.data.length - 1].sum}
            </DebitHeadingAmount>
            <Paragraph>Debit</Paragraph>
          </DebitTextContainer>
          <DebitImageContainer>
            <DebitImage
              src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705741143/Group_1_x8rnbj.png"
              alt="group"
            />
          </DebitImageContainer>
        </DebitContainer>
      </>
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

  return <AmountDetailsContainer>{renderLeaderboard()}</AmountDetailsContainer>;
};

export default TotalDebitCredit;
