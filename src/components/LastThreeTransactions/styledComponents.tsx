import styled from "styled-components";

interface ParagraphProps {
  isAdmin: boolean;
}

export const TransactionsContainer = styled.div`
  display: flex;
  width: 90%;
  //   height: 210px;
  padding: 12px 25px 8px 20px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #fff;
  margin-left: 40px;
  // margin-top: 32px;

  @media screen and (max-width: 1024px) {
    width: 84vw;
    padding: 5px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 10px;
    margin-top: 0px;
    width: 96vw;
    padding: 0px;
  }
`;
export const UserContainer = styled.div<ParagraphProps>`
  display: flex;
  align-items: center;
  width: 20vw; // ${(props) => (props.isAdmin ? "15vw" : "15vw")};
  @media screen and (max-width: 768px) {
    // overflow: hidden;
    width: 36vw; //${(props) => (props.isAdmin ? "15vw" : "36vw")};
  }
`;

export const AdminContainer = styled.div<ParagraphProps>`
  display: flex;
  align-items: center;
  width: 20vw; // ${(props) => (props.isAdmin ? "15vw" : "15vw")};

  @media screen and (max-width: 768px) {
    // overflow: hidden;
    width: 36vw; // ${(props) => (props.isAdmin ? "15vw" : "36vw")};
  }
`;

export const DachTransactionContainer = styled.div<ParagraphProps>`
  width: 75vw;
  height: 58px;
  flex-shrink: 0;
  border-bottom: ${(props) => (props.isAdmin ? "" : "1px solid #e2e2e2")};
  // margin-left: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1024px) {
    width: 80vw;
    margin-left: 10px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 4px;
    width: 96vw;
    height: 70px;
  }
`;

export const CrediteDebitImage = styled.img<ParagraphProps>`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  padding-right: ${(props: any) => (props.isAdmin ? "10px" : "16px")};
  @media screen and (max-width: 768px) {
    display: block;
    // ${(props: any) => (props.isAdmin ? "none" : "block")};
  }
`;

export const EditImage = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-right: 20px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-right: 8px;
  }
`;

export const DeleteImage = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  cursor: pointer;
`;

export const TitleParagraph = styled.p`
  width: 15vw;
  color: #505887;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  // margin-right: 80px;
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const CategaryParagraph = styled.p<ParagraphProps>`
  color: #505887;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  // margin-right: 96px;
  width: ${(props: any) => (props.isAdmin ? "22vw" : "20vw")};
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: ${(props: any) => (props.isAdmin ? "28vw" : "20vw")};
  }
`;

export const DateOfTransactionParagraph = styled.p`
  color: #505887;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  // margin-right: 101px;
  width: 20vw;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LoadingContainer = styled.div`
  margin: auto;
`;

export const DebitAmount = styled.p<ParagraphProps>`
  color: #fe5c73;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: ${(props: any) => (props.isAdmin ? "15vw" : "10vw")};
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    width: 15vw;
  }

  @media screen and (max-width: 768px) {
    width: 20vw;
  }
`;

export const CrediteAmount = styled.p<ParagraphProps>`
  color: #16dbaa;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: start;
  width: ${(props: any) => (props.isAdmin ? "15vw" : "10vw")};
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    width: 15vw;
  }

  @media screen and (max-width: 768px) {
    width: 20vw;
  }
`;

export const NoTransactionsFountHeading = styled.h1`
  margin: auto;
`;

export const LogoutContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  background: rgba(52, 64, 84, 0.7);
  backdrop-filter: blur(8px);
`;

export const AddTransactionMainContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  background: rgba(52, 64, 84, 0.7);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0px;
  left: 0px;
`;

export const AddTransactionContainer = styled.div`
  width: 466px;
  min-height: 700px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #fff;
  margin: auto;
  aline-self: center;
  @media screen and (max-width: 768px) {
    width: 95vw;
  }
`;

export const AddTransactionTextContainer = styled.div`
  display: flex;
`;

export const HeadingTextContainer = styled.div`
  margin-top: 32px;
  margin-left: 24px;
  margin-bottom: 20px;
`;

export const AddTransactionHeading = styled.h1`
  color: #333b69;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 140% */
`;

export const AddTransactionParagraph = styled.p`
  width: 289px;
  color: #505887;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  margin-top: 8px;
`;

export const AddTransactionCloseImage = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-left: auto;
  margin-top: 24px;
  margin-right: 24px;
  cursor: pointer;
`;

export const AdminProfileContainer = styled.p<ParagraphProps>`
  color: #505887;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background-color: red;
  text-align: center;
  height: 25px;
  padding-top: 5px;
  width: 30px;
  border-radius: 30px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  // margin-right: 10px;
  display: ${(props) => (props.isAdmin ? "none" : "block")};
`;

export const UserProfileDetails = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: 100vw;
  @media screen and (max-width: 768px) {
    width: 40vw;
  }
`;

export const TitleUserParagraph = styled.p`
  width: 153px;
  color: #505887;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  // margin-right: 89px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const EditDeleteContainer = styled.div<ParagraphProps>`
  width: 61px;
  @media screen and (max-width: 1350px) {
    width: 61px;
    display: ${(props) => (props.isAdmin ? "none" : "block")};
  }
`;

export const TransactionParagraphMobile = styled.p`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    font-size: 12px;
    margin-top: 0px;
    color: #bfbfbf;
    font-weight: 400;
    font-weight: bold;
  }
`;
export const FailureContainer = styled.div``;

export const TextContainer = styled.div``;
