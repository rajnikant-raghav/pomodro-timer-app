import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const email = user.email;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        navigate("/");
      } else {
        
        navigate("/timer");
      }
    });
  }, []);
  return (
    
    <Box
      bg={"lightblue"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Button
        w={"300px"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
        border={"1px solid gray"}
        onClick={signInWithGoogle}
        cursor={"pointer"}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Box>
  
  );
};

export default LoginWithGoogle;
