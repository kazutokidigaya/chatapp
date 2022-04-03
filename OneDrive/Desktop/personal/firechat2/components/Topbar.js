import { Avatar, Flex, Heading } from "@chakra-ui/react";
import React from "react";

export default function Topbar({ email }) {
  return (
    <Flex bg={"blackAlpha.200"} h="81px" w={"100%"} align="center" p={5}>
      <Avatar src="" marginEnd={3} />
      <Heading size={"lg"}>{email}</Heading>
    </Flex>
  );
}
