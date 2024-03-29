import { useNavigate } from "react-router-dom";

import {
  NotFoundContainer,
  NotFoundImage,
  NotFoundHeading,
  NotFoundParagraph,
  BackToHomePage,
} from "./styledComponents";

const text: string = "we're sorry, the page you requested could not be found";

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  const onBackToHomePage = (): void => {
    navigate("/");
  };

  return (
    <NotFoundContainer>
      <NotFoundImage
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <NotFoundHeading>Page Not Found</NotFoundHeading>
      <NotFoundParagraph>{text}</NotFoundParagraph>
      <BackToHomePage type="button" onClick={onBackToHomePage}>
        Back To HomePage
      </BackToHomePage>
    </NotFoundContainer>
  );
};

export default NotFound;
