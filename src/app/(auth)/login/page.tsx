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
import { ONE_DAY_SECONDS } from "@/config";
import { CookieType } from "@/enums";
import { useLoginMutation } from "@/redux/api/auth";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = (data: any) => {
    login(data)
      .unwrap()
      .then((res) => {
        setCookie(CookieType.TOKEN, res.token, { maxAge: ONE_DAY_SECONDS });

        toast.success("Logged in successfully!");
        router.push("/admin-page");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  const handleWhatsAppRedirect = (message: string) => {
    const phoneNumber = "2348132272132"; // Replace with your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

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
              type="button"
              onClick={() =>
                handleWhatsAppRedirect("I forgot my password. Please assist.")
              }
            >
              Forgot Password?
            </FlatButton>
          </AuthPageFlexbox>
          <AuthPageButton isLoading={isLoading} text={"Login"} type="submit" />
        </InputsWrap>
        <Box>
          <AuthPageText>
            You have an issue?
            <FlatButton
              type="button"
              onClick={() =>
                handleWhatsAppRedirect("I am experiencing an issue. Please help.")
              }
            >
              Contact Support
            </FlatButton>
          </AuthPageText>
        </Box>
      </AuthPageContent>
    </AuthPageContainer>
  );
};
export default Login;
