import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik, FormikErrors } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useHandleFBErrors } from "../../hooks/useHandleFBErrors";
import { useSignUp } from "../../hooks/useSignUp";
import { ErrorMessage } from "../error-message/ErrorMessage";

type SignUpValue = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[!-~]{10,}$/;
const validationScheme = Yup.object().shape({
  username: Yup.string()
    .required("必須です")
    .min(5, "5文字以上にしてください")
    .max(8, "12文字以下にしてください"),
  email: Yup.string()
    .email("正しい形式のemailを設定してください")
    .required("必須です"),
  password: Yup.string()
    .required("必須です")
    .min(8, "8文字以上にしてください")
    .max(24, "24文字以下にしてください")
    .matches(passwordRegex, {
      message: "大文字・小文字・数字を含むパスワードを指定してください",
    }),
  confirmPassword: Yup.string()
    .required("必須です")
    .min(8, "8文字以上にしてください")
    .max(24, "24文字以下にしてください")
    .matches(
      passwordRegex,
      'message: "大文字・小文字・数字を含むパスワードを指定してください'
    ),
});

const initialValues: SignUpValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp: React.VFC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const { handleErrorByCodes } = useHandleFBErrors();
  const { signUp } = useSignUp();
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const toSignInPage = () => {
    navigate("/signin");
  };
  const hasError = (errors: FormikErrors<SignUpValue>): boolean => {
    return (
      !!errors.confirmPassword ||
      !!errors.email ||
      !!errors.password ||
      !!errors.username
    );
  };
  const onSubmit = async (values: SignUpValue) => {
    await signUp(values.email, values.password)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        if (e.code && typeof e.code) {
          setSubmitError(handleErrorByCodes(e.code));
        }
        console.log(e);
      });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      // backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="2xl" color="purple.400" mb="32px">
          Create a Account
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationScheme}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              touched,
              errors,
              handleBlur,
            }) => (
              <Form>
                <Stack
                  spacing={6}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                  borderRadius="20px"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        value={values.username}
                        name="username"
                        placeholder="User name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        borderRadius="20px"
                      />
                    </InputGroup>
                    {touched.username && errors.username && (
                      <ErrorMessage message={errors.username} />
                    )}
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="email address"
                        borderRadius="20px"
                      />
                    </InputGroup>
                    {touched.email && errors.email && (
                      <ErrorMessage message={errors.email} />
                    )}
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        borderRadius="20px"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && touched.password && (
                      <ErrorMessage message={errors.password} />
                    )}
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        borderRadius="20px"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <ErrorMessage message={errors.confirmPassword} />
                    )}
                  </FormControl>
                  <Button
                    borderRadius="20px"
                    type="submit"
                    variant="solid"
                    disabled={hasError(errors)}
                    colorScheme="purple"
                    width="full"
                  >
                    Sign Up
                  </Button>
                  {submitError && <ErrorMessage message={submitError} />}
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
      <Box>
        You have a account ?{" "}
        <Button color="purple.500" onClick={toSignInPage} variant="link">
          Sign In
        </Button>
      </Box>
    </Flex>
  );
};
