import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Conversation } from "../../../types/conversation";
import { formatLastMessageTimestamp } from "../../../utils/formatLastMessageTimestamp";

interface ConversationsListItemProps {
  conversation: Pick<
    Conversation,
    "recipientNickname" | "lastMessageTimestamp"
  >;
}

const ConversationsListItem: FC<ConversationsListItemProps> = ({
  conversation: { lastMessageTimestamp, recipientNickname },
}) => {
  return (
    <HStack spacing="2rem">
      <Avatar name={recipientNickname} />

      <Stack>
        <Text fontSize="lg">{recipientNickname}</Text>

        <Text fontSize="sm" color="gray.500">
          {formatLastMessageTimestamp(lastMessageTimestamp)}
        </Text>
      </Stack>
    </HStack>
  );
};

export default ConversationsListItem;
