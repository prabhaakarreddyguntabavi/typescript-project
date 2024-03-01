import React from "react";

import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";

// import FailureCase from "../FailureCase";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import {
  LoadingContainer,
  NoTransactionsFountHeading,
  GraphPrargraph,
  GraphPrargraphSpan,
  GraphValuesSetting,
  GraphCredite,
  GraphDebit,
  GraphTextParagraph,
  GraphHeaderContainer,
} from "./styledComponents";

const colors = ["#4D78FF", "#FCAA0B"];

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

interface PropsValue {
  callApi: string;
}

interface apiStatus {
  status: string;
  data: [];
  errorMsg?: string;
}

const GenderChart = (props: PropsValue) => {
  const { callApi } = props;

  const [CallGraphApi, updateApi] = useState("");

  const [apiResponse, setApiResponse] = useState<apiStatus>({
    status: apiStatusConstants.initial,
    data: [],
  });

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    const getLeaderboardData = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: [],
      });

      let headers = {};
      let url = "";

      if (jwtToken === "3") {
        headers = {
          "Content-Type": "application/json",
          "x-hasura-role": "admin",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        };

        url =
          "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin";
      } else {
        headers = {
          "Content-Type": "application/json",
          "x-hasura-role": "user",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-user-id": jwtToken,
        };
        url =
          "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";
      }

      const options = {
        method: "GET",
        headers: headers,
      };
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (response.ok) {
        setApiResponse({
          status: apiStatusConstants.success,
          data:
            jwtToken === "3"
              ? responseData.last_7_days_transactions_totals_admin
              : responseData.last_7_days_transactions_credit_debit_totals,
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
  }, [callApi, CallGraphApi]);

  const renderSuccessView = () => {
    const { data } = apiResponse;

    if (data.length !== 0) {
      function calculateDailySums(transactions: any) {
        const dailySums: any = {};
        let totalDailySums = [];

        transactions.forEach((transaction: any) => {
          const date = transaction.date.split("T")[0];

          if (!dailySums[date]) {
            dailySums[date] = {
              debit: 0,
              credit: 0,
              type: transaction.type,
              date: date,
              sum: 0,
            };
          }

          if (transaction.type === "debit") {
            dailySums[date].debit += transaction.sum;
          } else if (transaction.type === "credit") {
            dailySums[date].credit += transaction.sum;
          }

          dailySums[date].sum += transaction.sum;
        });

        totalDailySums = Object.values(dailySums);

        return { dailySums, totalDailySums };
      }

      const { totalDailySums } = calculateDailySums(data);

      const last7Transactions = totalDailySums.slice(0, 7);

      function separateTransactions(last7Transactions: any) {
        const creditTransactions: any = [];
        const debitTransactions: any = [];

        data.forEach((transaction: any) => {
          if (transaction.type === "credit") {
            creditTransactions.push(transaction.sum);
          } else if (transaction.type === "debit") {
            debitTransactions.push(transaction.sum);
          }
        });

        return { creditTransactions, debitTransactions };
      }

      const { creditTransactions, debitTransactions } =
        separateTransactions(last7Transactions);

      const creditTransactionsSum = creditTransactions.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0
      );
      const debitTransactionsSum = debitTransactions.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0
      );

      return (
        <>
          <GraphHeaderContainer>
            <GraphPrargraph>
              <GraphPrargraphSpan> ${debitTransactionsSum}</GraphPrargraphSpan>{" "}
              Debited &
              <GraphPrargraphSpan>
                {" "}
                ${creditTransactionsSum}{" "}
              </GraphPrargraphSpan>{" "}
              Credited in this Week
            </GraphPrargraph>
            <GraphValuesSetting>
              <GraphTextParagraph>
                <GraphCredite></GraphCredite> Credit
              </GraphTextParagraph>
              <GraphTextParagraph>
                <GraphDebit></GraphDebit> Debit
              </GraphTextParagraph>
            </GraphValuesSetting>
          </GraphHeaderContainer>
          <BarChart
            width={window.innerWidth * 0.8}
            height={window.innerWidth * 0.3}
            data={last7Transactions}
            // borderRadius={200}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="credit" fill={"#4D78FF"} shape={<CustomBar />} />
            <Bar dataKey="debit" fill={"#FCAA0B"} shape={<CustomBar />} />
          </BarChart>
        </>
      );
    }
    return (
      <NoTransactionsFountHeading>
        No Transactions Found
      </NoTransactionsFountHeading>
    );
  };

  const renderLoadingView = () => (
    <LoadingContainer data-testid="loader">
      <ReactLoading type={"bars"} color={"#000000"} height={50} width={50} />
    </LoadingContainer>
  );

  const CustomBar = (props: any) => {
    const { x, y, width, height } = props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.fill}
        rx={10}
      />
    );
  };

  const renderFailureView = () => <h1>Failure View</h1>; // <FailureCase updateApi={updateApi} />;

  const renderLeaderboard = () => {
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

  return <>{renderLeaderboard()}</>;
};

export default GenderChart;
