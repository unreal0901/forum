import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import Logo from '../../assets/logo.png';
import {
  Box,
  Button,
  Checkbox,
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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../redux/api/Authapi';
import { LoginSchema } from '../schemas/loginSchema';

const Login = () => {
  const [success, setsuccess] = useState(false);
  const [show, setShow] = React.useState(false);
  const [errorflag, setErrorflag] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (selectCurrentToken) {
  //     navigate("/dashboard", { replace: true });
  //   }
  // });

  // const { setToken, verify } = Authuser();
  // const isVerfied = verify();
  // useEffect(() => {
  //   if (isVerfied) {
  //     navigate("/dashboard");
  //   }
  // });

  // const userRef = useRef();
  // const errRef = useRef();
  // const [success, setsuccess] = useState(false);

  const [login, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

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
      setErrorflag(true);
    }

    let timerId = setTimeout(() => {
      setErrorflag(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/app/profile');
    }
  });

  useEffect(() => {
    let timeout;
    if (isError) {
      timeout = setTimeout(() => {
        // setError([false, {}]);
        const el = document.querySelector(`.${styles.blurred}`);
        el.style.display = 'none';
        setErrorflag(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const el = document.querySelector(`.${styles.blurred}`);
  //   if (loading === true) el.style.display = "block";
  //   if (loading === false) el.style.display = "none";
  // }, [loading, error, isSuccess]);

  // useEffect(() => {
  //   let timeout;
  //   if (error[0]) {
  //     timeout = setTimeout(() => {
  //       setError([false, {}]);
  //       const el = document.querySelector(`.${styles.blurred}`);
  //       el.style.display = "none";
  //     }, 1500);
  //   }
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // });

  const handleClick = () => {
    setShow(!show);
  };

  const loginHandler = (values, { setSubmitting, resetForm }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    resetForm();
    const data = login(payload).unwrap();
    console.log(data);
    setSubmitting(false);
  };

  return (
    <>
      {/* <div className={styles.slideshow}>slideshow</div> */}
      <div className={styles.form}>
        <div className={styles.blurred}></div>
        {errorflag ? (
          <div className={styles.loginerror}>
            <Box>
              <Text>{JSON.stringify(error)}</Text>
              <Text>{JSON.stringify(error)}</Text>
            </Box>
          </div>
        ) : null}
        {isSuccess || loading || isLoading ? (
          <div className={styles.success}>
            <Box>
              <Spinner
                thickness="10px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#3ca237"
                width="200px"
                height="200px"
              />
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
              Login
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
                email: '',
                password: '',
                rememberMe: false,
              }}
              validationSchema={LoginSchema}
              onSubmit={loginHandler}
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
                  {isSubmitting ? (
                    <div className={styles.isSubmitting}>
                      <Spinner
                        thickness="10px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#3ca237"
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
                        <FormControl required>
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
                              validate={value => {
                                if (value.length <= 6) {
                                  return 'Passwords should be greater then 6';
                                }
                              }}
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
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                      </Box>
                      <Box>
                        <Checkbox
                          id="rememberMe"
                          name="rememberMe"
                          size="md"
                          value={values.rememberMe}
                          onChange={handleChange}
                          colorScheme="brand"
                        >
                          Remember me
                        </Checkbox>
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
                          // bg="brand.100"
                          // variant="solid"
                          // colorScheme="brand.100"
                          // isLoading={props.isSubmitting}
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
              Don't have an Account?{' '}
              <span className={styles.login}>
                {' '}
                <Link to="/register">Register</Link>
              </span>
            </Text>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Login;
