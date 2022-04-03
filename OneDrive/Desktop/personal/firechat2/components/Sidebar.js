import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Avatar, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection } from "firebase/firestore";
import { getOtherEmail } from "../utils/getOtherEmail";
import { useRouter } from "next/router";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Enter the Email Of the Recipient");
    if (!chatExists(input) && input != user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }
  };

  const chatlist = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((Chat) => (
        <Flex
          key={Math.random()}
          p={3}
          align="center"
          _hover={{ bgColor: "blackAlpha", cursor: "pointer" }}
          onClick={() => redirect(Chat.id)}
        >
          <Avatar src="" marginEnd={3} />
          <Text>{getOtherEmail(Chat.users, user)}</Text>
        </Flex>
      ));
  };
  return (
    <Flex
      h={"100%"}
      w="300px"
      borderEnd="1px solid "
      borderColor="blackAlpha.200"
      direction="column"
      height={"100vh"}
    >
      <Flex
        h="81px"
        w="100%"
        align={"center"}
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor={"blackAlpha.300"}
        p={3}
      >
        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text>{user.displayName}</Text>
        </Flex>

        <IconButton
          size={"sm"}
          isRound
          icon={<ArrowLeftIcon />}
          onClick={() => signOut(auth)}
        />
      </Flex>
      <Button m={5} p={4} onClick={() => newChat()}>
        New Chat
      </Button>

      <Flex
        direction="column"
        flex={1}
        overflowX={"scroll"}
        sx={{ scrollbarWidth: "none" }}
      >
        {chatlist()}
      </Flex>
    </Flex>
  );
}
