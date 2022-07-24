import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { useHandleFBErrors } from "../sign-in/useHandleFBErrors";
import { validationScheme } from "./schema";
import { useSignUp } from "./useSignUp";

type SignUpValue = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: SignUpValue = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const { handleErrorByCodes } = useHandleFBErrors();
  const { signUp } = useSignUp();
  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const hasError = (errors: FormikErrors<SignUpValue>): boolean => {
    return (
      !!errors.confirmPassword ||
      !!errors.email ||
      !!errors.password ||
      !!errors.userName
    );
  };
  const onSubmit = async (values: SignUpValue) => {
    await signUp({
      email: values.email,
      password: values.password,
      userName: values.userName,
    }).catch((e) => {
      if (e.code && typeof e.code) {
        setSubmitError(handleErrorByCodes(e.code));
      }
      console.error(e);
    });
    navigate("/");
  };
  const formikRef = useRef<FormikProps<SignUpValue>>(null);
  const submitOnEnter = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter") return;
    formikRef.current?.handleSubmit();
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
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
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={validationScheme}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, touched, errors, handleBlur }) => (
              <Form>
                <Stack spacing={6} p="1rem" boxShadow="2xl" borderRadius="20px">
                  <FormControl
                    isInvalid={!!errors.userName && !!touched.userName}
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        value={values.userName}
                        id="userName"
                        placeholder="User name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        borderRadius="20px"
                      />
                    </InputGroup>
                    {touched.userName && errors.userName && (
                      <FormErrorMessage>{errors.userName}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!(errors.email && touched.email)}>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="email address"
                        borderRadius="20px"
                      />
                    </InputGroup>
                    {touched.email && errors.email && (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={!!(errors.password && touched.password)}
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
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
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!(errors.confirmPassword && touched.confirmPassword)
                    }
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        borderRadius="20px"
                        onKeyDown={submitOnEnter}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
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
      <VStack>
        <Button
          color="purple.500"
          onClick={() => navigate("/signin")}
          variant="link"
        >
          Sign In
        </Button>
        <Box>Or</Box>
        <Button onClick={() => navigate("/")} variant="link">
          Use without account
        </Button>
      </VStack>
    </Flex>
  );
};
