import React, { useState } from "react";
import { Steps, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Step } = Steps;

// Styled-components for custom styling
const StyledForm = styled(Form)`
  max-width: 500px;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const StepsContent = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  const next = async () => {
    try {
      const values = await form.validateFields();
      setUserDetails(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please complete the form correctly." + error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleUploadChange = (info: any) => {
    const newFileList = [...info.fileList];
    setFileList(newFileList);
  };

  const handleSubmit = () => {
    if (fileList.length === 0) {
      message.error("Please upload a screenshot before submitting.");
      return;
    }

    const payload = {
      ...userDetails,
      screenshot: fileList[0].originFileObj,
    };

    onSubmit(payload);
    message.success("Submission successful!");
  };

  return (
    <div>
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        <Step title="User Details" />
        <Step title="Upload Screenshot" />
      </Steps>

      {currentStep === 0 && (
        <StyledForm form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Alias"
            name="alias"
            rules={[{ required: true, message: "Please enter an alias" }]}
          >
            <Input placeholder="Enter your alias" />
          </Form.Item>

          <StyledButton type="primary" onClick={next}>
            Next
          </StyledButton>
        </StyledForm>
      )}

      {currentStep === 1 && (
        <div>
          <p><strong>Account Details:</strong></p>
          <p>Bank Name: Example Bank</p>
          <p>Account Number: 1234567890</p>
          <p>Account Name: John Doe</p>

          <Upload
            accept="image/*"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Disable automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload Screenshot</Button>
          </Upload>

          <div style={{ marginTop: 16 }}>
            <StyledButton type="default" onClick={prev} style={{ marginRight: 8 }}>
              Previous
            </StyledButton>
            <StyledButton type="primary" onClick={handleSubmit}>
              Submit
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepsContent;
