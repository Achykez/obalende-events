'use client';

import {
  AuthPageButton,
  AuthPageContainer,
  AuthPageContent,
  AuthPageHeader,
  AuthPageText,
  Box,
  FlatButton,
  InputsWrap,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ResendTokenFlexbox,
  ResendTokenText,
  Subtitle,
} from '@/app/(auth)/styled-components';
import { Input } from '@/components';

import { useFormik } from 'formik';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';

const TwoFactor = () => {
  // const user = useGetUser();
  // const router = useRouter();
  // const { mutateAsync, isLoading } = useVerifyTwoFactorMutation();
  // const { mutateAsync: resendTwoFactorAsync, isLoading: isResending } =
  //   useResendTwoFactorMutation();

  // const handleResendToken = () => {
  //   resendTwoFactorAsync({ userId: user?.id! })
  //     .then((res) => {
  //       toast.success(res.message);
  //     })
  //     .catch((err) => {
  //       toast.error(Array.isArray(err.message) ? err.message[0] : err.message);
  //     });
  // };

  // const onSubmit = (values: { token: string }) => {
  //   const payload = {
  //     userId: user?.id!,
  //     token: values.token,
  //   };
  //   mutateAsync(payload)
  //     .then((res) => {
  //       router.replace('/');
  //       toast.success(res.message);
  //     })
  //     .catch((err) => {
  //       toast.error(Array.isArray(err.message) ? err.message[0] : err.message);
  //     });
  // };

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      token: '',
    },
    // validationSchema: twoFactorValidation,
    onSubmit : () => {},
  });
  return (
    <AuthPageContainer>
      <AuthPageContent>
        <AuthPageHeader>Two-factor authentication</AuthPageHeader>
        <Subtitle>Enter the code that was sent to your email address</Subtitle>
        <InputsWrap onSubmit={handleSubmit}>
          <Input
            label="Enter OTP"
            value={values.token}
            onChange={handleChange('token')}
            errorMessage={touched.token ? errors.token : ''}
          />
          <ResendTokenText>
            Did not receive code?{' '}
            <span >
              {'Resend code'}
            </span>
          </ResendTokenText>
          <AuthPageButton text={'Submit'} type="submit"  />
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
export default TwoFactor;
