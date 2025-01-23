"use client";
import { Button, Header } from "@/components";
import styled from "styled-components";
import { DatePicker } from "antd";
import { FileUploader } from "@/components/fileUploader";
import { Formik, Field, Form } from "formik";
import dayjs from "dayjs";
import { useCreateEventMutation } from "@/redux/api/events";
import { validationSchema } from "./validator";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CreateEditEvents({
  params: {
    singleEvents: [pageName, eventsId],
  },
}: {
  params: { singleEvents: string[] };
}) {
  const isEdit = pageName === "edit";
  const router = useRouter();

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const onSubmit = (values: any) => {

    console.log(values);
    
    const formattedValues = {
      ...values,
      startTime: values.startTime
        ? dayjs(values.endTime).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        : null,
      endTime: values.endTime
        ? dayjs(values.endTime).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        : null,
    };
    createEvent(formattedValues)
      .unwrap()
      .then(() => {
        toast.success("Event created successfully!");
        router.push(`/events`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Wrapper>
      <Header
        title="Create Events"
        websiteUrl="Upload Details for Karoke Event"
      />
      <CreateWrapper>
        <Container>
          <Formik
            initialValues={{
              name: "",
              description: "",
              startTime: null,
              endDate: null,
              image: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleSubmit,
            }) => (
              <FormContainer as={Form} onSubmit={handleSubmit}>
                <Title>{isEdit ? "Edit Event" : "Create New Event"}</Title>
                <FormContent>
                  <SectionItem>
                    <FormItem>
                      <Label>Event Name</Label>
                      <FormInput
                        name="name"
                        placeholder="Name of event"
                        value={values.name}
                        onChange={handleChange}
                      />
                      {touched.name && errors.name && (
                        <Error>{String(errors.name)}</Error>
                      )}
                    </FormItem>
                    <FormItem>
                      <Label>Description</Label>
                      <FormTextArea
                        name="description"
                        placeholder="Enter description for event"
                        value={values.description}
                        onChange={handleChange}
                      />
                      {touched.description && errors.description && (
                        <Error>
                          {typeof errors.description === "string"
                            ? errors.description
                            : ""}
                        </Error>
                      )}
                    </FormItem>
                    <Flex>
                      <FormItem>
                        <Label>Start Date</Label>
                        <StyledDatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          value={
                            values.startTime ? dayjs(values.startTime) : null
                          }
                          onChange={(date) => setFieldValue("startTime", date)}
                        />
                        {touched.startTime && errors.startTime && (
                          <Error>{String(errors.startTime)}</Error>
                        )}
                      </FormItem>
                      <FormItem>
                        <Label>End Date</Label>
                        <StyledDatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          value={values.endTime ? dayjs(values.endTime) : null}
                          onChange={(date) => setFieldValue("endTime", date)}
                        />
                        {touched.endDate && errors.endTime && (
                          <Error>{String(errors.endTime)}</Error>
                        )}
                      </FormItem>
                    </Flex>
                    <FormItem>
                      <Label>Upload Event Image</Label>
                      <FileUploader
                        imageLink={true}
                        onSuccess={(url) => setFieldValue("image", url)}
                      />
                      {touched.image && errors.image && (
                        <Error>{String(errors.image)}</Error>
                      )}
                    </FormItem>
                  </SectionItem>
                </FormContent>
                <ButtonWrapper>
                  <SubmitButton text="Submit" type="submit" />
                </ButtonWrapper>
              </FormContainer>
            )}
          </Formik>
        </Container>
      </CreateWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
`;

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
  margin-bottom: 16px;
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
`;

const Label = styled.p`
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const FormInput = styled.input`
  margin-top: 8px;
  border-radius: 16px;
  height: 48px;
  padding: 12px 16px;
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral[50]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FormTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 8px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral[50]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.text.primary};

`;

const StyledDatePicker = styled(DatePicker)`
  height: 48px;
  margin-top: 10px !important;
  width: 100%;
  border-radius: 8px !important;
  background: ${({ theme }) => theme.colors.neutral[50]} !important;
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
`;

const SectionItem = styled.div`
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral[100]};
  margin-top: 32px;
  border-radius: 16px;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  max-width: 300px;
  // Button background
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.tertiary}; // Button text color: ;
  @media (max-width: 768px) {
    height: 48px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
`;
