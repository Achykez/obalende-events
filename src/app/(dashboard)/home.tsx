'use client';

import { createEvent, InfoIcon, manageEvent } from '@/assets';
import { Container, Question, OptionsContainer, InfoContainer, Option } from './styled-component';

export const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Question>What do you want to do today?</Question>
        <OptionsContainer>
          <Option
            alt="manage event"
            link={'/events/create'}
            text="Create Event"
            image={createEvent}
          />
          <Option
            alt="manage event"
            text="Manage Event"
            link={'/events'}
            image={manageEvent}
          />

        </OptionsContainer>
        <InfoContainer>
          <InfoIcon />
          This is the backbone of our Karoke Event Here we control the events that are to take place
        </InfoContainer>
      </Container>
    </>
  );
};
