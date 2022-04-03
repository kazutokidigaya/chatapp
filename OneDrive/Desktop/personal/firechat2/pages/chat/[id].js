import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { Head } from "next/document";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getOtherEmail } from "../../utils/getOtherEmail";
import { useEffect, useRef, useState } from "react";
import Topbar from "../../components/Topbar";
import Bottombar from "../../components/Bottombar";

export default function Chat() {
  const router = useRouter();

  const { id } = router.query;

  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));

  const [messages] = useCollectionData(q);

  const [user] = useAuthState(auth);

  const [chat] = useDocumentData(doc(db, "chats", id));

  const bottomOfChat = useRef();

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-start" : "flex-end"}
          bg={sender ? "blue.100" : "green.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  useEffect(
    () =>
      setTimeout(
        bottomOfChat.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
        100
      ),
    [messages]
  );

  return (
    <Flex h="100vh">
      <Modal>
        <ModalHeader>
          <title>Chat App</title>
        </ModalHeader>
      </Modal>

      <Sidebar />

      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{ scrollbarWidth: "none" }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>
        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
