/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { Button, Header } from "@/components";
import styled from "styled-components";
import { DatePicker, Spin } from "antd";
import { FileUploader } from "@/components/fileUploader";
import { EventsResponse, useUploadContentMutation } from "@/redux/api/events";
import {
  useCreateParticipantMutation,
  useGetSingleParticpantQuery,
  useUpdateParticipantMutation,
} from "@/redux/api/participants";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IValues {
  name: string;
  phoneNumber: string;
  image: string | File;
  alias: string;
  address: string;
}

export default function CreateEditParticipants({
  params: {
    singleParticipants: [pageName, dynamicId],
  },
}: {
  params: { singleParticipants: string[] };
}) {
  const isEdit = pageName === "edit";
  const router = useRouter();
  const editId = useMemo(() => (isEdit ? dynamicId : ""), [isEdit, dynamicId]);
  const [deleteModal, setDeleteModal] = useState<EventsResponse | null>(null);

  const [uploadContent, { isLoading: isUploading }] =
    useUploadContentMutation();
  const [createParticipants, { isLoading: isCreating, isSuccess: isCreated }] =
    useCreateParticipantMutation();
  const [updateParticipants, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateParticipantMutation();
  const { data, isLoading: isGettingParticipants } =
    useGetSingleParticpantQuery(editId, {
      skip: !isEdit,
    });

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

  const handleParticipantSubmit = async (formData: IValues) => {
    try {
      const image =
        typeof formData.image === "object" 
          ? await uploadImage(formData.image)
          : formData.image.trim() !== ""
          ? formData.image
          : null;

      if (isEdit) {
        const response = await updateParticipants({
          ...formData,
          id: editId,
          eventId: data.data.eventId,
          ...(image ? { image: image as string } : undefined),
        }).unwrap();

        if (!response.success) {
          toast.error("Failed to update participant");
        } else {
          toast.success("Participant updated successfully");
        }
      } else {
        const response = await createParticipants({
          ...formData,
          eventId: dynamicId,
          ...(image ? { image: image } : undefined),
        }).unwrap();

        if (!response.success) {
          toast.error("Failed to create participant");
        } else {
          toast.success("Participant added successfully");
          router.back();
        }
      }
    } catch (error) {
      console.error("Error submitting participant data:", error);
      toast.error("An error occurred while submitting participant data.");
    }
  };

  const { values, setFieldValue, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        name: data?.data?.name ?? "",
        alias: data?.data?.alias ?? "",
        phoneNumber: data?.data?.phoneNumber ?? "",
        address: data?.data?.address ?? "",
        image: data?.data?.image ?? "",
      },
      enableReinitialize: true,
      onSubmit: handleParticipantSubmit,
    });

  useEffect(() => {
    if (isCreated || isUpdated) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreated, isUpdated]);

  return (
    <Wrapper>
      <Spin size="large" spinning={isGettingParticipants}>
        <Header
          title={isEdit ? "Edit Participant" : "Add Participant"}
          websiteUrl="Event"
        />
        <CreateWrapper>
          <Container>
            <FormContainer onSubmit={handleSubmit}>
              <Title>
                {isEdit ? "Edit Participant" : "Add New Participant"}
              </Title>
              <FormContent>
                <SectionItem>
                  <FormItem>
                    <Label>Participant Name</Label>
                    <FormInput
                      name="name"
                      placeholder="Name of participant"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </FormItem>
                  <FormItem>
                    <Label>Alias (AKA)</Label>
                    <FormInput
                      name="alias"
                      placeholder=" Alias of participant"
                      value={values.alias}
                      onChange={handleChange}
                    />
                  </FormItem>
                  <FormItem>
                    <Label>Address</Label>
                    <FormInput
                      name="address"
                      placeholder="Address of participant"
                      value={values.address}
                      onChange={handleChange}
                    />
                  </FormItem>
                  <FormItem>
                    <Label>Phone Number</Label>
                    <FormInput
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter phone number"
                      value={values.phoneNumber}
                      onChange={handleChange}
                    />
                  </FormItem>
                  <FormItem>
                    <Label>Upload Participant Image (optional)</Label>
                    <FileUploader
                      imageLink={true}
                      onSuccess={(url) => setFieldValue("image", url)}
                      onEditImageUrl={
                        typeof values.image === "string" && values.image
                      }
                      date={data?.data.createdAt ?? ""}
                    />
                  </FormItem>
                </SectionItem>
              </FormContent>
              <ButtonWrapper>
                <SubmitButton
                  isLoading={isCreating || isUploading || isUpdating}
                  text="Submit"
                  type="submit"
                />
              </ButtonWrapper>
            </FormContainer>
          </Container>
        </CreateWrapper>
      </Spin>
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
`;

const StyledDatePicker = styled(DatePicker)`
  height: 48px;
  flex: 1;
  margin-top: 10px !important;
  width: 100%;
  border-radius: 8px !important;
  background: ${({ theme }) => theme.colors.neutral[50]} !important;

  .ant-picker-dropdown {
    max-width: 100vw;
    width: auto !important;
    padding: 8px;
    border-radius: 16px;
  }

  .ant-picker-panel {
    min-width: 280px;
    max-width: 100%;
  }

  .ant-picker-cell-inner {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .ant-picker-dropdown {
      bottom: 0 !important;
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
  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px;
  }
`;
