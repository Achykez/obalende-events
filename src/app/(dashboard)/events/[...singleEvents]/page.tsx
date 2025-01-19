"use client";
import { Header } from "@/components";
import styled from "styled-components";
import { DatePicker } from "antd";
import { FileUploader } from "@/components/fileUploader";

export default function CreateEditEvents({
  params: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleEvents: [pageName, eventsId],
  },
}: {
  params: { singleEvents: string[] };
}) {
  const isEdit = pageName === "edit";
  return (
    <Wrapper>
      <Header title="Create Events" websiteUrl="Upload Details for Karoke Event" />
      <CreateWrapper>
        <Container>
          <FormContainer>
            <Title>{isEdit ? "Edit Event" : "Create New Event"}</Title>
            <FormContent>
              <SectionItem>
                <FormItem>
                  <Label>Event Name</Label>
                  <FormInput placeholder="Name of event" />
                </FormItem>
                <FormItem>
                  <Label>Description</Label>
                  <FormTextArea
                    placeholder="Enter description for event"
                    name="description"
                    // value={values.description}
                    // onChange={handleChange}
                  />
                </FormItem>
                <Flex>
                  <FormItem>
                    <Label>Start Date</Label>
                    <StyledDatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      // onChange={(date) => setFieldValue('startDate', date)}
                      // value={values.startDate}
                      // defaultValue={dayjs(data?.items?.eventEndTime)}
                    />
                  </FormItem>
                  <FormItem>
                    <Label>End Date</Label>
                    <StyledDatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      // onChange={(date) => setFieldValue("endDate", date)}
                      // value={values.endDate}
                    />
                  </FormItem>
                </Flex>
                <FormItem>
                  <Label>Upload Event Image</Label>
                  <FileUploader
                    imageLink={true}
                    onSuccess={(url) => console.log(url)}
                    // onEditImageUrl={values.imageUrl}
                    // onSuccess={(url) => setFieldValue("imageUrl", url)}
                    // imgDimension="1440 X 720"
                    // onImageLinkChange={handleChange("imageHyperlinkUrl")}
                  />
                </FormItem>
              </SectionItem>
            </FormContent>
          </FormContainer>
        </Container>
      </CreateWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
    height: 100vh;
`

const CreateWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gray[30]};
  @media (min-width: 768px) {
    padding: 32px 80px 32px 52px;
  }
`;

const Container = styled.div`
  margin-top: 40px;
  width: 100%;

  box-shadow: 0px 2px 4px 0px rgba(33, 41, 39, 0.04);
  background: ${({ theme }) => theme.colors.gray[30]};
`;

const FormContainer = styled.form``;

const FormItem = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const FormContent = styled.div`
  padding: 0px 24px;
`;

const Title = styled.div`
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray[70]};
  border-left: 0.5px solid ${({ theme }) => theme.colors.gray[70]};
  height: 56px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.background.gray};
  border-radius: 16px 16px 0px 0px;
  color: ${({ theme }) => theme.colors.neutral[800]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) => getTextStyle({ weight: weights.Medium, variant: variants.BODY_BIG })};
`;

const Label = styled.p`
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.neutral[800]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Medium, variant: variants.BODY_MEDIUM })};
`;

const FormInput = styled.input`
  margin-top: 8px;
  border-radius: 16px;
  height: 48px;
  padding: 12px 16px;

  width: 100%;
  background: ${({ theme }) => theme.colors.neutral[50]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};

  color: ${({ theme }) => theme.colors.neutral[800]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_MEDIUM })};
`;

const SectionItem = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  background: ${({ theme }) => theme.colors.background.light};
  padding: 16px;
  margin-top: 32px;
  span {
    display: flex;
    justify-content: space-between;
    div {
      width: 49%;
    }
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 8px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral[50]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  padding: 12px 16px 64px 16px;

  color: 1px solid ${({ theme }) => theme.colors.neutral[500]};

  ${({
    theme: {
      typography: { variants, weights, getTextStyle },
    },
  }) =>
    getTextStyle({ weight: weights.Regular, variant: variants.BODY_MEDIUM })};
`;

const StyledDatePicker = styled(DatePicker)`
  height: 48px;
  flex: 1;
  margin-top: 10px !important;
  width: 100%;
  border-radius: 8px !important;
  background: ${({ theme }) => theme.colors.neutral[50]} !important;

  // Responsive styles for the pop-up calendar
  .ant-picker-dropdown {
    max-width: 100vw;
    width: auto !important;
    padding: 8px;
    border-radius: 16px;
  }

  .ant-picker-panel {
    min-width: 280px;
    max-width: 100%; // Ensure it fits smaller screens
  }

  .ant-picker-cell-inner {
    font-size: 14px; // Adjust font size for better visibility on smaller screens
  }

  @media (max-width: 768px) {
    .ant-picker-dropdown {
      top: auto !important;
      bottom: 0 !important; // Pin it to the bottom for smaller screens
    }
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }
`;
