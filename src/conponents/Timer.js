import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Button, ButtonGroup, Box, Text } from "@chakra-ui/react";

const Timer = () => {
  const [data, setData] = useState()
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const navigate = useNavigate();
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("Sign-out successful.");
        navigate("/");
      })
      .catch((error) => {
        alert("An error happened.: " + error);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        navigate("/");
      } else {
        navigate("/timer");
        setData(user.displayName)
      }
    });
  }, []);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer is done, reset it or implement Pomodoro cycles
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  if (minutes === 0) {
    setInterval(() => {
      setMinutes(25);
      setSeconds(0);
      setIsActive(true);
    }, [300000]);
  }
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"Center"}
    >
      <Box
        w={"300px"}
        margin={"auto"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text fontSize={"50px"} fontWeight={"bold"}>
          {minutes} : {seconds}
        </Text>
        <ButtonGroup gap="6">
          <Button
            backgroundColor={"#3385ff"}
            color={"white"}
            border={"none"}
            onClick={toggleTimer}
            padding={"10px 15px 10px 15px"}
            borderRadius={"4px"}
            cursor={"pointer"}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button
            backgroundColor=" #ff1a1a"
            color={"white"}
            border={"none"}
            onClick={resetTimer}
            padding={"10px 15px 10px 15px"}
            borderRadius={"4px"}
            cursor={"pointer"}
          >
            Reset
          </Button>
        </ButtonGroup>
      </Box>
      <Button
        bg="black"
        color={"white"}
        position={"absolute"}
        right={"30px"}
        top={"50px"}
        border={"none"}
        borderRadius={"5px"}
        padding={"10px 15px 10px 15px"}
        onClick={logout}
        cursor={"pointer"}
      >
        Logout
      </Button>
      <Text position={"absolute"} top={"0"} width={"100vw"} textAlign={'center'} padding={'5px'}>
        Hello, {data}
      </Text>
    </Box>
  );
};

export default Timer;
