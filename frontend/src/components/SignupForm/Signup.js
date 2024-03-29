import React, { useEffect, useState } from 'react';
import { SignUpSchema } from '../schemas/signupSchema';
import { useDispatch } from 'react-redux';
// import { setCredentials } from '../../../features/auth/authSlice';
import { useRegisterUserMutation } from '../../redux/api/Authapi';
import styles from './Signup.module.css';
import Logo from '../../assets/logo.png';
// import axios from "../../../api/axios";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import VerificationPage from '../VerificationPage/VerificationPage';
// const REGISTER_URL = "/auth/register";

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [verify, setVerify] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  // const handleRelease = () => setShow(false);

  // const validatePassword = (value) => {
  //   let error;
  //   if (!value) error = "Password is required";
  //   else if (value.length <= 6) {
  //     error = "Length should be greater than 6";
  //   }
  //   return error;
  // };
  const [register, { errorObj, isSuccess, isLoading, isError }] =
    useRegisterUserMutation();

  console.log(error, isSuccess, isLoading, isError);

  useEffect(() => {
    const el = document.querySelector(`.${styles.blurred}`);
    if (el) {
      if (isLoading === true) {
        el.style.display = 'block';
      }
      if (isLoading === false) el.style.display = 'none';
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setError(true);
    }

    let timerId = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isError]);

  useEffect(() => {
    let timeout;
    if (isSuccess) {
      setSuccess(true);
      timeout = setTimeout(() => {
        // navigate('/verfy');
        // history.pushState('');
        setVerify(true);
      }, 1500);
    }
    return () => {
      setSuccess(false);
      clearTimeout(timeout);
    };
  }, [isSuccess]);

  useEffect(() => {
    let timeout;
    if (isError) {
      timeout = setTimeout(() => {
        // setError([false, {}]);
        const el = document.querySelector(`.${styles.blurred}`);
        el.style.display = 'none';
        setError(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  // const registerHandler = () => {};

  const registerHandler = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const payload = {
      fullName: values.name,
      email: values.email,
      password: values.password,
    };
    resetForm();
    const data = register(payload).unwrap();
    console.log(data);
    setSubmitting(false);
  };

  return (
    <>
      {/* <div className={styles.slideshow}>slideshow</div> */}
      <div className={styles.form}>
        {verify ? (
          <VerificationPage setVerify={setVerify} setSuccess={setSuccess} />
        ) : (
          <>
            <div className={styles.verificationPopup}>
              <Box>
                {success ? (
                  <>
                    <div className={styles.toast}>
                      <Box>
                        <Text>Verify Email</Text>
                        <Text>Verification Code Sent to Email</Text>
                      </Box>
                    </div>
                  </>
                ) : null}
              </Box>
            </div>
            <div className={styles.blurred}></div>
            {error ? (
              <div className={styles.registererror}>
                <Box>
                  {errorObj ? <Text>Error occured</Text> : null}
                  <Text>Error occured</Text>
                </Box>
              </div>
            ) : null}
            {success ? (
              <div className={styles.success}>
                <Box>
                  <Text fontSize="18px">Account succesfully created!!</Text>
                  <Text fontSize="18px">Redirecting to login page..</Text>
                </Box>
              </div>
            ) : null}
            <Box
              w="100%"
              h="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                h="20%"
                display="flex"
                justifyContent="flex-end"
                flexDirection="column"
                alignItems="center"
                // mb={10}
              >
                <Box>
                  <img className={styles.logo} src={Logo} alt="Logo" />
                </Box>
                <Text
                  fontSize="3em"
                  // h="100%"
                  textAlign="center"
                  color="gray.700"
                  mb={2}
                >
                  Register
                </Text>
              </Box>
              <Box
                h="60%"
                w="100%"
                pr="10px"
                pl="10px"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                  }}
                  validationSchema={SignUpSchema}
                  // onSubmit={registerHandler}
                  onSubmit={registerHandler}
                >
                  {({
                    handleSubmit,
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <>
                      {isSubmitting || isLoading ? (
                        <div className={styles.isSubmitting}>
                          <Spinner
                            thickness="10px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="brand.500"
                            width="200px"
                            height="200px"
                          />
                        </div>
                      ) : null}
                      <form
                        className={styles.formContainer}
                        onSubmit={handleSubmit}
                      >
                        <Stack direction="column" spacing={4} w="100%">
                          <Box>
                            <FormControl
                              required
                              isInvalid={errors.name && touched.name}
                            >
                              <FormLabel
                                htmlFor="name"
                                fontSize="1.5em"
                                color="gray.600"
                              >
                                Full Name
                              </FormLabel>
                              <Input
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="name"
                                name="name"
                                required
                                focusBorderColor="brand.500"
                                type="text"
                                h="50px"
                                placeholder="Enter full name"
                              />
                              <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl
                              required
                              isInvalid={errors.email && touched.email}
                            >
                              <FormLabel
                                htmlFor="email"
                                fontSize="1.5em"
                                color="gray.600"
                              >
                                Email
                              </FormLabel>
                              <InputGroup>
                                <Field
                                  as={Input}
                                  id="email"
                                  name="email"
                                  focusBorderColor="brand.500"
                                  value={values.email}
                                  onChange={handleChange}
                                  type="email"
                                  h="50px"
                                  placeholder="Enter email"
                                />
                                <InputRightElement
                                  color="brand.500"
                                  fontSize="25px"
                                  h="100%"
                                  w="50px"
                                >
                                  <i className="fa-solid fa-at"></i>
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl
                              required
                              isInvalid={errors.password && touched.password}
                            >
                              <FormLabel
                                htmlFor="password"
                                fontSize="1.5em"
                                color="gray.600"
                              >
                                Password
                              </FormLabel>
                              <InputGroup size="md">
                                <Field
                                  as={Input}
                                  autoComplete="on"
                                  id="password"
                                  name="password"
                                  value={values.password}
                                  onChange={handleChange}
                                  h="50px"
                                  focusBorderColor="brand.500"
                                  pr="4.5rem"
                                  type={show ? 'text' : 'password'}
                                  placeholder="Enter password"
                                />
                                <InputRightElement
                                  color="brand.500"
                                  fontSize="25px"
                                  h="100%"
                                  w="50px"
                                  cursor="pointer"
                                  onClick={handleClick}
                                >
                                  {show ? (
                                    <i className="fa-solid fa-eye-slash"></i>
                                  ) : (
                                    <i className="fa-sharp fa-solid fa-eye"></i>
                                  )}
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          </Box>
                          <Box
                            // isLoading
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Button
                              h="50px"
                              fontSize="1.2em"
                              w="100%"
                              colorScheme="brand"
                              isLoading={isSubmitting}
                              type="submit"
                            >
                              Submit
                            </Button>
                          </Box>
                        </Stack>
                      </form>
                    </>
                  )}
                </Formik>
                <Text
                  display="inline"
                  align="center"
                  color="gray.500"
                  mt={2}
                  pb="5px"
                >
                  Already registered?{' '}
                  <span className={styles.login}>
                    {' '}
                    <Link to="/login">Login</Link>
                  </span>
                </Text>
              </Box>
            </Box>
          </>
        )}
      </div>
    </>
  );
};

export default Signup;
