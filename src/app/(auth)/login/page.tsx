"use client";
import {
  AuthPageButton,
  AuthPageContainer,
  AuthPageContent,
  AuthPageFlexbox,
  AuthPageHeader,
  AuthPageText,
  Box,
  CenteredDiv,
  ChekBoxWrap,
  FlatButton,
  InputsWrap,
  StyledCheckbox,
} from "@/app/(auth)/styled-components";
import { AppLogo } from "@/assets";
import { InputWithIcon, Input } from "@/components/input";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
      verifyme: true,
    },
    onSubmit: () => {},
  });
  return (
    <AuthPageContainer>
      <AuthPageContent>
        <CenteredDiv>
          <Image src={AppLogo} height={90} alt="App icon" width={190} />
        </CenteredDiv>
        <AuthPageHeader>Login</AuthPageHeader>
        <InputsWrap onSubmit={handleSubmit}>
          <Input
            label="Email address"
            name="email"
            value={values.email}
            onChange={handleChange("email")}
            required
          />
          <InputWithIcon
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange("password")}
            required
          />
          <AuthPageFlexbox>
            <ChekBoxWrap>
              <StyledCheckbox type="checkbox" />
              <AuthPageText>Remember me</AuthPageText>
            </ChekBoxWrap>

            <FlatButton
              onClick={(e) => {
                e.preventDefault();
                router.push("/forgot-password");
              }}>
              Forgot Password?
            </FlatButton>
          </AuthPageFlexbox>
          <AuthPageButton text={"Login"} type="submit" />
        </InputsWrap>
        <Box>
          <AuthPageText>
            You have an issue?
            <FlatButton>Contact Support</FlatButton>
          </AuthPageText>
        </Box>
      </AuthPageContent>
    </AuthPageContainer>
  );
};
export default Login;
