'use client';

import { AppLogo,  InfoIcon } from '@/assets';
import { Container, Question, OptionsContainer, InfoContainer, Option } from '../../styled-component';

 const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Question>Welcome to Obalande Content Admin</Question>
        <OptionsContainer>
   
          <Option
            alt="manage event"
            text="Manage Events"
            link={'/events'}
            image={AppLogo}
          />

        </OptionsContainer>
        <InfoContainer>
          <InfoIcon />
          This is the backbone of our Site Here we control the events that are to take place
        </InfoContainer>
      </Container>
    </>
  );
};

export default Home