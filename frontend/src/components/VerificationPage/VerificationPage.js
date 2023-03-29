import {
  Box,
  Text,
  PinInput,
  PinInputField,
  HStack,
  Button,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './Verification.module.css';
import { useVerifyEmailMutation } from '../../redux/api/Authapi';
import { useNavigate } from 'react-router-dom';
const VerificationPage = ({ pin, setVerify, setSuccess }) => {
  const [pinval, setPinval] = useState('');
  const [error, setError] = useState(false);
  const [verify, { isSuccess, isLoading, isError }] = useVerifyEmailMutation();
  console.log(isSuccess, isLoading, isError);
  const navigate = useNavigate();

  const onCompleteHandler = async e => {
    console.log(e);
    let payload = {
      verification: e,
    };
    console.log(payload);
    verify(payload);
    setPinval('');
  };

  useEffect(() => {
    if (isError) setError(true);
    let timeout = setTimeout(() => {
      setError(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

  return (
    <Box
      w="auto"
      height="100%"
      width="80%"
      pl="20px"
      display="flex"
      flexDirection="column"
      alignItems={['flex-start', 'center']}
      justifyContent="center"
    >
      <div className={styles.verificationBox}>
        <div className={styles.spinnerBox}>
          {isLoading ? (
            <Spinner
              thickness="10px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              width="100px"
              height="100px"
            />
          ) : null}
        </div>
        <div className={styles.verificationContent}>
          <Text
            w="100%"
            textAlign={['left', 'center']}
            p="10px 0"
            fontSize={'1.5rem'}
            color="brand.600"
          >
            Enter the PIN
          </Text>

          <HStack>
            <PinInput
              value={pinval}
              onChange={e => setPinval(e)}
              colorScheme="brand"
              focusBorderColor="brand.500"
              size={['md', 'lg']}
              otp
              onComplete={onCompleteHandler}
              isInvalid={error}
              isDisabled={isLoading}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          <Text
            w="100%"
            textAlign={['left', 'center']}
            pt="100px"
            fontSize={'1.5rem'}
            color="brand.600"
          >
            Go back to{' '}
            <Button
              variant="link"
              p="20px"
              colorScheme="pink"
              onClick={() => {
                setVerify(false);
                setSuccess(false);
              }}
            >
              Registration
            </Button>
          </Text>
        </div>
      </div>
    </Box>
  );
};

export default VerificationPage;
