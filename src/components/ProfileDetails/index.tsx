import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import SideBar from "../SideBar";
import Header from "../Header";
import TransactionContext from "../../context/TransactionContext";
import FailureCase from "../FailureCase";

import {
  ProfileHomePage,
  ProfileTotalBodyContainer,
  LoadingContainer,
  ProfileDetailsContainer,
  ProfileContainer,
  ProfileImage,
  ProfileImageContainer,
  AddTransactionNameInput,
  AddTransactionLabel,
  AddTransactionInputContainer,
  DetailsContainer,
} from "./styledComponents";

interface apiStatusValues {
  initial: string;
  inProgress: string;
  success: string;
  failure: string;
}

interface ProfileDetailsValues {
  name?: string;
  email?: string;
  date_of_birth?: string;
  present_address?: string;
  permanent_address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

interface ApiOutputStatus {
  status: string;
  data: ProfileDetailsValues;
  errorMsg?: string;
}

const apiStatusConstants: apiStatusValues = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ProfileDetails = (): JSX.Element => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  const [apiResponse, setApiResponse] = useState<ApiOutputStatus>({
    status: apiStatusConstants.initial,
    data: {},
  });

  const [failedCaseCallApi, failedCaseLastThreeTransactions] =
    useState<string>("");

  useEffect((): void => {
    if (!jwtToken) {
      navigate("/login");
    } else {
      const getLeaderboardData = async (): Promise<void> => {
        setApiResponse({
          status: apiStatusConstants.inProgress,
          data: {},
        });

        let headers = {};
        let url = "";

        headers = {
          "Content-Type": "application/json",
          "x-hasura-role": "user",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-user-id": jwtToken,
        };
        url = "https://bursting-gelding-24.hasura.app/api/rest/profile";

        const options = {
          method: "GET",
          headers: headers,
        };
        const response = await fetch(url, options);
        const responseData = await response.json();

        console.log("Profile");
        console.log(responseData.users[0]);

        if (response.ok) {
          setApiResponse({
            status: apiStatusConstants.success,
            data: responseData.users[0],
          });
        } else {
          setApiResponse({
            status: apiStatusConstants.failure,
            data: {},
            errorMsg: "",
          });
        }
      };

      getLeaderboardData();
    }
  }, [jwtToken, navigate, failedCaseCallApi]);

  const renderSuccessView = (): JSX.Element => {
    const { data } = apiResponse;

    return (
      <>
        <ProfileImageContainer>
          <ProfileImage>
            {data?.name ? data.name[0].toUpperCase() : ""}
          </ProfileImage>
        </ProfileImageContainer>
        <DetailsContainer>
          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionname">
              Your Name
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="addtransactionname"
              value={data.name}
              // onChange={onChangePas}
              placeholder="Your Name"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionname">
              User Name
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="addtransactionname"
              value={data.name}
              // onChange={onChangePas}
              placeholder="User Name"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionname">
              Email
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="email"
              id="addtransactionname"
              value={data.email}
              // onChange={onChangePas}
              placeholder="Email"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionname">
              Password
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="password"
              id="addtransactionname"
              value={data.email}
              // onChange={onChangePas}
              placeholder="Password"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionamount">
              Date of Birth
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="date"
              id="addtransactionamount"
              value={data.date_of_birth}
              // onChange={onChangePas}
              placeholder="Date of Birth"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionname">
              Present Address
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="addtransactionname"
              value={data.present_address}
              // onChange={onChangePas}
              placeholder="Present Address"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionname">
              Permanent Address
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="addtransactionname"
              value={data.permanent_address}
              // onChange={onChangePas}
              placeholder="Permanent Address"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionamount">
              City
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="addtransactionamount"
              value={data.city}
              // onChange={onChangePas}
              placeholder="City"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionamount">
              Postal Code
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="number"
              id="addtransactionamount"
              value={data.postal_code}
              // onChange={onChangePas}
              placeholder="Postal Code"
              readOnly={true}
            />
          </AddTransactionInputContainer>

          <AddTransactionInputContainer>
            <AddTransactionLabel htmlFor="addtransactionamount">
              Country
            </AddTransactionLabel>
            <AddTransactionNameInput
              type="text"
              id="addtransactionamount"
              value={data.country}
              readOnly={true}
              // onChange={onChangePas}
              placeholder="Country"
            />
          </AddTransactionInputContainer>
        </DetailsContainer>
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
    <div className="no-search-result">
      <FailureCase updateApi={failedCaseLastThreeTransactions} />
    </div>
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
      {(value) => {
        const { selectOption, onChangeSelectOption } = value;

        if (selectOption !== "PROFILE") {
          onChangeSelectOption("PROFILE");
        }

        return (
          <ProfileHomePage>
            <SideBar />
            <ProfileTotalBodyContainer>
              <Header updateApi={() => {}} />
              <ProfileDetailsContainer>
                <ProfileContainer>{renderLeaderboard()}</ProfileContainer>
              </ProfileDetailsContainer>
            </ProfileTotalBodyContainer>
          </ProfileHomePage>
        );
      }}
    </TransactionContext.Consumer>
  );
};

export default ProfileDetails;
