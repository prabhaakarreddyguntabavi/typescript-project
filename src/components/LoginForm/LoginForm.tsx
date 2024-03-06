import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import {
  LoginLabel,
  EmailInput,
  PasswordInput,
  LoginContainer,
  LoginFormContainer,
  InputContainer,
  LoginButton,
  ErrorMessageParagraph,
  LogoImage,
} from "./styledComponents";

interface UserListProps {
  email: string;
  password: string;
  userId: number;
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

export const LoginForm = (): JSX.Element => {
  const [emailId, onChangeEmail] = useState<string>("");
  const [password, onChangePassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userDict, setEmailDict] = useState<UserListProps>({
    email: "",
    password: "",
    userId: 0,
  });
  const navigate = useNavigate();

  const onEnterEmailId = (): void => {
    if (emailId !== "") {
      const emailDict: UserListProps | undefined = userDetails.find(
        (eachId) => eachId.email === emailId
      );

      setEmailDict(emailDict || { email: "", password: "", userId: 0 });
    }
  };

  const onChangeEmailID = (event: React.ChangeEvent<HTMLInputElement>): void =>
    onChangeEmail(event.target.value);

  const onChangePas = (event: React.ChangeEvent<HTMLInputElement>): void =>
    onChangePassword(event.target.value);

  const onLoginField = (): void => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(emailId)) {
      setErrorMessage("Please Enter Email");
    } else if (password === "") {
      setErrorMessage("Please Enter Password");
    } else if (userDict.email !== emailId || userDict.password !== password) {
      setErrorMessage("Please Enter Valid Email or Password");
    } else if (userDict.email === emailId || userDict.password === password) {
      setErrorMessage("");
      Cookies.set("jwt_token", userDict.userId.toString(), {
        expires: 30,
      });
      navigate("/");
    }
  };

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    navigate("/");
  }

  return (
    <LoginContainer>
      <LoginFormContainer>
        <LogoImage
          src="https://res.cloudinary.com/dwdq2ofjm/image/upload/v1705580146/Frame_507_ba197a.png"
          alt="website logo"
        />
        <InputContainer>
          <LoginLabel htmlFor="emailId">Email</LoginLabel>
          <EmailInput
            type="email"
            id="emailId"
            value={emailId}
            onChange={onChangeEmailID}
            onBlur={() => onEnterEmailId()}
            placeholder="Email"
          />
        </InputContainer>
        <InputContainer>
          <LoginLabel htmlFor="password">PASSWORD</LoginLabel>
          <PasswordInput
            type="password"
            id="password"
            value={password}
            onChange={onChangePas}
            placeholder="Password"
          />
        </InputContainer>
        <LoginButton type="button" onClick={onLoginField}>
          Login
        </LoginButton>
        {errorMessage && (
          <ErrorMessageParagraph>*{errorMessage}</ErrorMessageParagraph>
        )}
      </LoginFormContainer>
    </LoginContainer>
  );
};
