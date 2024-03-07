import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useState, useEffect } from "react";
import TransactionContext from "../../context/TransactionContext";

import { ProfileDetails } from "../InterfaceDefining";

import {
  SideBarMainContainer,
  LogoImage,
  TextContainer,
  EachTextContainer,
  IconsImage,
  TextParagraph,
  TransactionIconsImage,
  SelectedContainer,
  ProfileContainer,
  ProfileImageContainer,
  ProfileName,
  ProfileEmail,
  ProfileTextContainer,
  YesLogoutButton,
  MobileSideBarClosing,
  PopupClosingContainer,
} from "./styledComponents";

import "./index.css";

interface UserListProps {
  email: string;
  password: string;
  userId: number;
}

interface FetchOutPut {
  users: ProfileDetails[];
}

const userDetails: UserListProps[] = [
  { email: "jane.doe@gmail.com", password: "janedoe@123", userId: 1 },
  { email: "samsmith@gmail.com", password: "samsmith@123", userId: 2 },
  { email: "rahul@gmail.com", password: "rahul@123", userId: 4 },
  { email: "teja@gmail.com", password: "teja@123", userId: 5 },
  { email: "loki@gmail.com", password: "loki@123", userId: 6 },
  { email: "ramesh@gmail.com", password: "ramesh@123", userId: 7 },
  { email: "suresh@gmail.com", password: "suresh@123", userId: 8 },
  { email: "prem@gmail.com", password: "prem@123", userId: 9 },
  { email: "piyush@gmail.com", password: "piyush@123", userId: 10 },
  { email: "isha@gmail.com", password: "isha@123", userId: 12 },
  { email: "seema@gmail.com", password: "seema@123", userId: 14 },
  { email: "arjun@gmail.com", password: "arjun@123", userId: 15 },
  { email: "radha@gmail.com", password: "radha@123", userId: 16 },
  { email: "phani@gmail.com", password: "phani@123", userId: 17 },
  { email: "admin@gmail.com", password: "Admin@123", userId: 3 },
];

interface PropsValue {
  close: () => void;
}

const MobileSideBar = (props: PropsValue): JSX.Element => {
  const { close } = props;

  const jwtToken: string = Cookies.get("jwt_token")!;

  const navigate: NavigateFunction = useNavigate();
  const [apiResponse, setApiResponse] = useState<ProfileDetails>({});

  let loginUser: ProfileDetails = {
    ...userDetails.find((eachUser) => eachUser.userId === parseInt(jwtToken)),
    name: "",
  };
  if (loginUser === undefined) {
    loginUser = { email: "Admin", password: "", userId: 0, name: "Admin" };
  }

  useEffect((): void => {
    if (!jwtToken) {
      navigate("/login");
    } else {
      const getLeaderboardData = async (): Promise<void> => {
        setApiResponse({});

        let headers: HeadersInit = {};
        let url: string = "";

        headers = {
          "Content-Type": "application/json",
          "x-hasura-role": "user",
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-user-id": jwtToken,
        };
        url = "https://bursting-gelding-24.hasura.app/api/rest/profile";

        const options: RequestInit = {
          method: "GET",
          headers: headers,
        };
        const response: Response = await fetch(url, options);
        const responseData: FetchOutPut[] = await response.json();

        if (response.ok) {
          if (Array.isArray(responseData) && responseData.length > 0) {
            setApiResponse(responseData[0].users[0]);
          }
        } else {
          setApiResponse(loginUser);
        }
      };

      getLeaderboardData();
    }
  }, [jwtToken, navigate]);

  const onClickLogout = (): void => {
    navigate("/login");
    Cookies.remove("jwt_token");
  };

  return (
    <TransactionContext.Consumer>
      {(value) => {
        const {
          selectOption,
          onChangeSelectOption,
          onChangeTransactionOption,
        } = value;

        return (
          <SideBarMainContainer>
            <PopupClosingContainer>
              <LogoImage
                src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
                alt="website logo"
              />
              <MobileSideBarClosing
                onClick={() => close()}
                src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706078678/Close_gxeytv.png"
                alt="close"
              />
            </PopupClosingContainer>

            <TextContainer>
              <Link
                className="sidbar-content"
                to="/"
                onClick={() => {
                  onChangeSelectOption("DASHBOARD");
                  onChangeTransactionOption("ALLTRANSACTION");
                }}
              >
                <EachTextContainer>
                  <SelectedContainer
                    selectOption={selectOption === "DASHBOARD"}
                  >
                    {}
                  </SelectedContainer>
                  <IconsImage
                    src={
                      selectOption === "DASHBOARD"
                        ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/home_2_1_xkaadl.png"
                        : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705730106/home_2_m9drn7.png"
                    }
                    alt="dashboard"
                  />
                  <TextParagraph selectOption={selectOption === "DASHBOARD"}>
                    Dashboard
                  </TextParagraph>
                </EachTextContainer>
              </Link>
              <Link
                className="sidbar-content"
                to="/transaction"
                onClick={() => onChangeSelectOption("TRANSACTIONS")}
              >
                <EachTextContainer>
                  <SelectedContainer
                    selectOption={selectOption === "TRANSACTIONS"}
                  ></SelectedContainer>
                  <TransactionIconsImage
                    src={
                      selectOption === "TRANSACTIONS"
                        ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/transfer_1_1_hqx4fr.png"
                        : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912310/transfer_1_e0it36.png"
                    }
                    alt="transactions"
                  />

                  <TextParagraph selectOption={selectOption === "TRANSACTIONS"}>
                    {jwtToken === "3" ? "All Transactions" : "Transactions"}
                  </TextParagraph>
                </EachTextContainer>
              </Link>
              <Link
                className="sidbar-content"
                to="/profile"
                onClick={() => {
                  onChangeSelectOption("PROFILE");
                  onChangeTransactionOption("ALLTRANSACTION");
                }}
              >
                <EachTextContainer>
                  <SelectedContainer
                    selectOption={selectOption === "PROFILE"}
                  ></SelectedContainer>
                  <IconsImage
                    src={
                      selectOption === "PROFILE"
                        ? "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1706070137/user_3_1_1_h8fxdm.png"
                        : "https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705912309/user_3_1_ikruwf.png"
                    }
                    alt="profile"
                  />
                  <TextParagraph selectOption={selectOption === "PROFILE"}>
                    Profile
                  </TextParagraph>
                </EachTextContainer>
              </Link>
            </TextContainer>
            <ProfileContainer>
              <ProfileImageContainer>
                {loginUser.email !== undefined
                  ? loginUser.email[0].toUpperCase()
                  : ""}
              </ProfileImageContainer>
              <ProfileTextContainer>
                <ProfileName>{apiResponse.name}</ProfileName>
                <ProfileEmail>{apiResponse.email}</ProfileEmail>
              </ProfileTextContainer>
              <YesLogoutButton type="button" onClick={onClickLogout}>
                Yes, Logout
              </YesLogoutButton>
            </ProfileContainer>
          </SideBarMainContainer>
        );
      }}
    </TransactionContext.Consumer>
  );
};

export default MobileSideBar;
