import React from 'react'
import styled from '@emotion/styled';
import { FlexDiv } from '../../components/FlexDiv';
import { Colors } from '../../Theme';
import Commercial_Registration from "../../assets/images/Commercial Registration.svg"
import adminImage from "../../assets/images/admin.png"
import editProfile from "../../assets/icons/editProfile.svg"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const DataDivContainer = styled("div")(({ theme }) => ({
  position: "relative",
  width: '364px',
  borderRadius: '10px',
  backgroundColor: '#fff',
  padding: "20px",
  height: "fit-content",
  [theme.breakpoints.down('800')]: {
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  border: `1px solid ${Colors.gold}`,
}));
const PhotoAndName = styled(FlexDiv)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  [theme.breakpoints.down('800')]: {
    justifyContent: "center",
  },
}));

const Division = styled("div")(({ theme }) => ({
  width: "241px",
  height: "1px",
  backgroundColor: Colors.grayDC,
  margin: "20px auto"
}));
const Part = styled("div")(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-start",
  marginBottom: "10px",
  [theme.breakpoints.down('800')]: {
    textAlign: "center",
  },
}));
const P1 = styled("div")(({ theme }) => ({
  fontSize: "18px",
  color: Colors.second
}));
const P2 = styled("div")(({ theme }) => ({
  color: Colors.gray_l,
  fontSize: "14px"
}));
const CommercialRegistrationImgDiv = styled("div")(({ theme }) => ({
  width: '100%',
  height: '139px',
  border: `2px solid ${Colors.gold}`,
  borderRadius: '10px',
}));
const AvailableMission = styled("div")(({ theme }) => ({
  width: '100%',
  height: '62px',
  padding: '10px 45px',
  borderRadius: '10px',
  backgroundColor: Colors.bgBL,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  [theme.breakpoints.down('500')]: {
    padding: '10px',
  },
}));
const TotalBalance = styled("div")(({ theme }) => ({
  marginTop: "20px",
  width: '100%',
  height: '131px',
  padding: '20px  60px',
  borderRadius: '10px',
  backgroundColor: Colors.lightMain,
  border: `1px solid ${Colors.main}}`,
  textAlign: "center",
}));

const Price = styled("p")(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 500,
  lineHeight: '67px',
  color: Colors.main,
  [theme.breakpoints.down('500')]: {
    fontSize: '20px',
  },
  textAlign: "center",
}));
const Section = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: theme.direction === "ltr" ? "20px" : "0px",
  marginLeft: theme.direction === "rtl" ? "20px" : "0px",
  "&.company": {
    flexDirection: "column",
    [theme.breakpoints.down('1200')]: {
      display: "none",
    },
  },
}));
const EditIcon = styled("div")(({ theme }) => ({
  position: "absolute",
  left: theme.direction === "rtl" ? "20px" : "auto",
  right: theme.direction === "ltr" ? "20px" : "auto",
  top: "20px",
  cursor: "pointer",
}));
const EditImg = styled("img")(({ theme }) => ({

}));
const DataDiv = ({ profileData }) => {
  const navigate = useNavigate()
  const handleEditProfile = () => {
    navigate("/userDashboard/editProfile")
  }
  const { t } = useTranslation();
  return (
    <>
      <DataDivContainer>
        <EditIcon onClick={handleEditProfile}>
          <EditImg src={editProfile} />
        </EditIcon>
        <PhotoAndName>
          <Section>
            <img src={profileData.image} style={{ width: "65px", height: "65px", borderRadius: "50%" }} alt="admin" />
          </Section>
          <div>
            <div>{profileData.name}</div>
            <div>{profileData.phone}</div>
          </div>
        </PhotoAndName>
        <Division />
        <Part>
          <P1 style={{ wordWrap: "break-word", overflowWrap: "break-word" }} >{profileData.url}</P1>
          <P2 > {t("text.CompanyWebsite")} </P2>
        </Part>
        <Part>
          <P1>{profileData.CommercialRegistrationNo}</P1>
          <P2> {t("text.CommercialRegistrationNo")} </P2>
        </Part>
        <CommercialRegistrationImgDiv>
          <img
            src={profileData.CommercialRegistrationImage}
            style={{ width: "100%", height: "100%", borderRadius: '10px', }}
            alt="CommercialRegistrationImage"
          />
        </CommercialRegistrationImgDiv>
        <AvailableMission>
          <div style={{ padding: "0 20px", fontSize: "32px", fontWeight: "bold" }}>{profileData.newMission}</div>
          <div style={{ fontSize: "18px", color: Colors.gray }}>{t("text.AvailableMissions")}</div>
        </AvailableMission>
        <TotalBalance>
          <Price>{profileData.wallet} {t("text.SAR")}</Price>
          <p style={{ textAlign: "center", fontSize: "12px", color: Colors.second }}>{t("text.totalBalance")}</p>
        </TotalBalance>
      </DataDivContainer>
    </>
  )
}

export default DataDiv