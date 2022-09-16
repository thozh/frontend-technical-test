import { Box, Center, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC } from "react";
import conversationsService from "../../api/conversations";
import messagesService from "../../api/messages";
import ChatHeader from "../../components/Message/ChatHeader";
import MessageInput from "../../components/Message/MessageInput";
import UserMessage from "../../components/Message/UserMessage";
import { getLoggedUserId } from "../../utils/getLoggedUserId";

const OneToOneChat: FC = () => {
  const router = useRouter();
  const conversationId = router.query.id as string;
  const userId = getLoggedUserId();

  const { data: messagesData, isLoading: messagesLoading } = useQuery(
    ["conversation", conversationId],
    () => messagesService.getMessages(conversationId),
    { refetchInterval: 1000 }
  );
  const { data: conversationData, isLoading: conversationLoading } = useQuery(
    ["user", userId],
    () => conversationsService.getConversations(userId)
  );

  if (messagesLoading || conversationLoading) {
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    );
  }

  const conversation = conversationData?.data.find(
    (conversation) => conversation.id === parseInt(conversationId, 10)
  );

  const isRecipient = conversation?.recipientId === userId;
  const isSender = conversation?.senderId === userId;
  const isRecipientOrSender = isRecipient || isSender;
  const recipientId = isSender
    ? conversation?.recipientId
    : conversation?.senderId;
  const recipientNickname = isSender
    ? conversation?.recipientNickname
    : conversation?.senderNickname;
  const userNickname = isSender
    ? conversation?.senderNickname
    : conversation?.recipientNickname;

  return (
    <Container paddingY="0.5rem" height="100vh">
      {!isRecipientOrSender ? (
        <Text>Oops, il semblerait que cette conversation soit privée.</Text>
      ) : (
        <Flex direction="column" height="100%" justifyContent="space-between">
          <ChatHeader
            recipientNickname={recipientNickname}
            userNickname={userNickname}
          />

          <Flex direction="column">
            {messagesData?.data.map(({ id, body, authorId }, index) => {
              const isRecipient = recipientId === authorId;
              const isLast = messagesData.data.length - 1 === index;
              const isSameAuthorNext =
                index + 1 < messagesData.data.length &&
                authorId === messagesData.data[index + 1].authorId;

              return (
                <UserMessage
                  key={id}
                  body={body}
                  isRecipient={isRecipient}
                  isLast={isLast}
                  isSamePreviousAuthor={isSameAuthorNext}
                />
              );
            })}

            <Box paddingY="1.5rem">
              <MessageInput
                conversationId={conversationId}
                isRecipientOrSender={isRecipientOrSender}
              />
            </Box>
          </Flex>
        </Flex>
      )}
    </Container>
  );
};

export default OneToOneChat;
