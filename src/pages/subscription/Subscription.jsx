import styled from '@emotion/styled';
import React from 'react'
import { SmallContainer } from '../../components/SmallContainer';
import { Colors, Dimensions } from '../../Theme';
import { useTranslation } from 'react-i18next';
import { FlexCenter } from '../../components/FlexCenter';
const Parent = styled(SmallContainer)(({ theme }) => ({

}));
const Container = styled(FlexCenter)(({ theme }) => ({
 height : `calc(100vh - ${Dimensions.navbarHeight} - 20px)` , 
}));
const Title = styled("div")(({ theme }) => ({
    fontSize : "50px" ,
    color : Colors.second  ,  
}));
const Subscription = () => {
    const {t} = useTranslation() ; 
  return (
    <Parent>
        <Container>
            <Title>{t("text.Will_Available_Soon")} ...... </Title>
        </Container>
    </Parent>
  )
}

export default Subscription