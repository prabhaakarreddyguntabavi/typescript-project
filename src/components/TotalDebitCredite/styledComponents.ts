import styled from "styled-components";

export const CreditContainer = styled.div`
  display: flex;
  width: 39.5%;
  // height: 145px;
  padding: 9px 36px;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #fff;
  margin-top: 24px;
  margin-left: 40px;
  // margin-right: 24px;
  // margin-bottom: 24px;
  // min-height: 176px;
  @media screen and (max-width: 1024px) {
    width: 38%;
  }

  @media screen and (max-width: 768px) {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    // margin-bottom: 10px;
    width: 79%;
    // height: 90px;
    padding: 25px 30px;
    // min-height: 100px;
  }
`;

export const CreditTextContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
`;

export const HeadingAmount = styled.h1`
  color: #16dbaa;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0px;
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

export const Paragraph = styled.p`
  color: #718ebf;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0px;
`;

export const CreditImage = styled.img`
  width: 182.431px;
  height: 161px;
  @media screen and (max-width: 768px) {
    height: 100px;
    width: auto;
  }
  // position: absolute;
  // left: 354.039px;
`;

export const ImageContainer = styled.div`
  width: 182.431px;
  // height: 161px;
  // position: absolute;
  // left: 254.039px;
  aline-self: flex-end;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
`;

export const AmountDetailsContainer = styled.div`
  display: flex;
  // width: 84vw;
  width: 100%;
  //   height: 210px;
  // padding: 12px 25px 8px 20px;
  flex-direction: row;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 25px;
  // background: #fff;
  // margin-top: 32px;

  @media screen and (max-width: 1024px) {
    // width: 84vw;
    padding: 5px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0px;
    // width: 96vw;
    padding: 0px;
    flex-direction: column;
  }
`;

export const DebitContainer = styled.div`
  display: flex;
  width: 39.5%;
  // height: 145px;
  padding: 9px 40px;
  // flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #fff;
  margin-top: 24px;
  margin-left: 20px;
  margin-right: 24px;
  @media screen and (max-width: 1024px) {
    width: 38%;
  }

  @media screen and (max-width: 768px) {
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 79%;
    // height: 90px;
    padding: 25px 30px;
  }
`;

export const DebitTextContainer = styled.div``;

export const DebitImageContainer = styled.div`
  width: 187.807px;
  // height: 154.736px;
  aline-self: flex-end;
  margin-left: auto;
  // position: absolute;
  display: flex;
  justify-content: flex-end;
`;

export const DebitHeadingAmount = styled.h1`
  color: #fe5c73;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 10px;
`;

export const DebitImage = styled.img`
  width: 187.807px;
  height: 154.736px;

  @media screen and (max-width: 768px) {
    width: auto;
    height: 100px;
  }
`;

export const LoadingContainer = styled.div`
  margin: auto;
`;

// export const DebitImage = styled.img``

// export const DebitImage = styled.img``

// export const DebitImage = styled.img``

// export const DebitImage = styled.img``

// export const DebitImage = styled.img``

// export const DebitImage = styled.img``

// export const DebitImage = styled.img``

// export const DebitImage = styled.img``
