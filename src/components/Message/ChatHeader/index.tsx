import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Avatar, HStack, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface ChatHeaderProps {
  recipientNickname: string;
  userNickname: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({
  recipientNickname,
  userNickname,
}) => {
  const router = useRouter();

  return (
    <HStack width="100%" justify="space-between">
      <IconButton
        variant="unstyled"
        aria-label="back-button"
        icon={<ChevronLeftIcon boxSize="24px" />}
        onClick={() => router.push("/")}
      />

      <Text>{recipientNickname}</Text>

      <Avatar size="sm" name={userNickname} />
    </HStack>
  );
};

export default ChatHeader;
