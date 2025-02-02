/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { Steps, Button, message } from "antd";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUploadContentMutation } from "@/redux/api/events";
import {
  IUnverifiedParticipantPayload,
  IVoteParticipant,
  useCreateUnverifiedParticipantMutation,
  useVoteParticipantsMutation,
} from "@/redux/api/participants";
import { toast } from "react-toastify";
import { ACCOUNT_DETAILS } from "@/config";
import { formatPrice } from "@/utils";

const { Step } = Steps;

const Label = styled.p`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const validationSchemaStep1 = Yup.object({
  name: Yup.string().required("Please enter your name"),
  address: Yup.string().required("Please enter your address"),
  phone: Yup.string().required("Please enter your phone number"),
  alias: Yup.string().required("Please enter an alias"),
  avatar: Yup.mixed()
    .required("Please upload an image")
    .test(
      "fileType",
      "Only image files are allowed",
      (value) =>
        value &&
        value instanceof File &&
        value.type &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
    )
    .test(
      "fileSize",
      "File size is too large, maximum 2MB",
      (value) => value && value instanceof File && value.size <= 2 * 1024 * 1024
    ),
});

const validationAmountSchema = Yup.object({
  votes: Yup.number()
    .required("This field is required")
    .typeError("Must be a valid number")
    .positive("Must be greater than 0"),
});

const StepsContent = ({
  currentStep,
  setCurrentStep,
  isEvent = false,
  close,
  dynamicId,
}: {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isEvent?: boolean;
  close: () => void;
  dynamicId: string;
}) => {
  const [uploadContent, { isLoading: isUploading }] =
    useUploadContentMutation();
  const [voteParticpant, { isLoading: isVoting }] =
    useVoteParticipantsMutation();
  const [registerParticipant, { isLoading: isRegistering }] =
    useCreateUnverifiedParticipantMutation();
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("images", file);

    const uploadResponse = await uploadContent(formData).unwrap();

    if (uploadResponse?.success && uploadResponse.data) {
      return uploadResponse.data[0];
    } else {
      toast.error("something went wrong");
    }
  };

  const formik = useFormik({
    initialValues: isEvent
      ? {
          name: "",
          address: "",
          phone: "",
          alias: "",
          avatar: null,
          image: null,
        }
      : { votes: 0, image: null },
    validationSchema:
      currentStep === 0 && isEvent
        ? validationSchemaStep1
        : currentStep === 0 && !isEvent
        ? validationAmountSchema
        : null,
    onSubmit: (values) => {
      if (!values.image) {
        message.error("Please upload a screenshot before submitting.");
        return;
      }

      if (isEvent) {
        handleEventSubmit(values);
      } else {
        handleNonEventSubmit(values);
      }
    },
  });

  const handleEventSubmit = async (values: any) => {
    const image = await uploadImage(values.avatar);
    const proof = await uploadImage(values.image);
    const payload: IUnverifiedParticipantPayload = {
      name: values.name,
      address: values.address,
      phoneNumber: values.phone,
      alias: values.alias,
      image,
      proof,
      eventId: dynamicId,
    };
    registerParticipant(payload)
      .unwrap()
      .then(() => {
        message.success(
          "Participant registered successfully!, Please wait for confirmation"
        );
        close();
        setCurrentStep(0);
      })
      .catch(() => {
        message.error("Error registering participant");
      });
  };

  const handleNonEventSubmit = async (values: any) => {
    const imageUrl = await uploadImage(values.image);
    const payload: IVoteParticipant = {
      numberOfVotes: values.votes,
      proof: imageUrl,
      participantId: dynamicId,
    };
    voteParticpant(payload)
      .unwrap()
      .then(() => {
        message.success(
          "Vote submitted successfully! please wait for confirmation"
        );
        close();
        setCurrentStep(0);
      })
      .catch(() => {
        message.error("Failed to submit vote.");
      });
  };

  const next = () => {
    if (currentStep === 0) {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          setCurrentStep(currentStep + 1);
        } else {
          message.error("Please complete the form correctly.");
        }
      });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const loading = isUploading || isVoting || isRegistering;

  return (
    <div>
      <Steps
        direction="horizontal"
        size="small"
        current={currentStep}
        onChange={(e: number) => {
          formik.validateForm().then((errors) => {
            if (Object.keys(errors).length === 0) {
              setCurrentStep(e);
            }
          });
        }}
        style={{
          display: "flex !important",
          flexDirection: "row",
          marginTop: "10px",
        }}>
        <Step title="Details" />
        <Step title="Upload" />
      </Steps>

      {currentStep === 0 && (
        <form onSubmit={formik.handleSubmit}>
          {isEvent ? (
            <>
              <div>
                <Label>Name</Label>
                <StyledInput
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <p style={{ color: "red" }}>{formik.errors.name}</p>
                )}
              </div>

              <div>
                <Label>Address</Label>
                <StyledInput
                  type="text"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <p style={{ color: "red" }}>{formik.errors.address}</p>
                )}
              </div>

              <div>
                <Label>Phone Number</Label>
                <StyledInput
                  type="text"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p style={{ color: "red" }}>{formik.errors.phone}</p>
                )}
              </div>

              <div>
                <Label>Alias</Label>
                <StyledInput
                  type="text"
                  name="alias"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.alias}
                />
                {formik.touched.alias && formik.errors.alias && (
                  <p style={{ color: "red" }}>{formik.errors.alias}</p>
                )}
              </div>

              <StyledCard>
                <p>Upload a profile picture:</p>
                <FileInputWrapper>
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={(e) =>
                      formik.setFieldValue("avatar", e.target.files[0])
                    }
                  />
                  <label htmlFor="fileUpload">Select Picture</label>
                </FileInputWrapper>
                {formik.values.avatar && (
                  <StyledFileName>{formik.values.avatar.name}</StyledFileName>
                )}
              </StyledCard>
            </>
          ) : (
            <div>
              <Label>Number of Votes</Label>
              <StyledInput
                type="number"
                name="votes"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.votes}
              />
              {formik.touched.votes ||
                (formik.errors.votes && (
                  <p style={{ color: "red" }}>{formik.errors.votes}</p>
                ))}
            </div>
          )}

          <StyledButton type="primary" onClick={next}>
            Next
          </StyledButton>
        </form>
      )}

      {currentStep === 1 && (
        <>
          <StyledCard>
            <BankDetails>
              Transfer {""}
              {formik.values.votes
                ? formatPrice(formik.values.votes * 100)
                : formatPrice(5000)}{" "}
              to
            </BankDetails>
            <AccountNumber>
              {ACCOUNT_DETAILS.bank} <br />
              <span style={{ fontSize: "18px" }}>
                {ACCOUNT_DETAILS.accountNumber}
              </span>
            </AccountNumber>
            <ExpiresText>{ACCOUNT_DETAILS.name}</ExpiresText>
          </StyledCard>

          <form onSubmit={formik.handleSubmit}>
            <StyledCard>
              <p>Upload proof of payment:</p>
              <FileInputWrapper>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={(e) =>
                    formik.setFieldValue("image", e.target.files[0])
                  }
                />
                <label htmlFor="fileUpload">Select Screenshot</label>
              </FileInputWrapper>
              {formik.values.image && (
                <StyledFileName>{formik.values.image.name}</StyledFileName>
              )}
            </StyledCard>

            <StyledButton
              type="primary"
              htmlType="submit"
              disabled={!formik.values.image}
              loading={loading}>
              {loading ? "...Please wait" : "Submit"}
            </StyledButton>
          </form>
        </>
      )}
    </div>
  );
};

const StyledCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

const BankDetails = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const AccountNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ExpiresText = styled.p`
  color: #999;
  font-size: 14px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const FileInputWrapper = styled.div`
  position: relative;
  display: inline-block;

  input[type="file"] {
    opacity: 0;
    position: absolute;
    z-index: -1;
    width: 1px;
    height: 1px;
  }

  label {
    display: inline-block;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.neutral[50]};
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.background.primary};
    }
  }
`;

const StyledFileName = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

export default StepsContent;
