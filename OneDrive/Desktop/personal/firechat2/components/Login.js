import React from "react";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";

function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <>
      <Head>Login</Head>
      <Center h="100vh">
        <Stack
          align={"center"}
          bgColor="blackAlpha.700"
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="lg"
        >
          <Box
            bgColor="blue.500"
            w="fit-content"
            p={5}
            rounded="3xl"
            boxShadow="md"
          >
            <ChatIcon w="100px" h="100px" color="white" />
          </Box>
          <Button
            boxShadow="md"
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            Sign In With Google
          </Button>
        </Stack>
      </Center>
    </>
  );
}

export default Login;
