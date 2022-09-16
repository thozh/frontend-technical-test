import { Box, BoxProps, Text } from "@chakra-ui/react";
import { FC } from "react";

const MessageBubble: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      maxWidth={["80%", "320px"]}
      borderRadius="8px"
      padding="0.5rem"
      {...props}
    >
      {children}
    </Box>
  );
};

interface UserMessageProps {
  body: string;
  isRecipient: boolean;
  isLast: boolean;
  isSamePreviousAuthor: boolean;
}

const UserMessage: FC<UserMessageProps> = ({
  body,
  isRecipient,
  isLast,
  isSamePreviousAuthor,
}) => {
  return (
    <>
      {isRecipient ? (
        <MessageBubble background="blue.400" borderBottomLeftRadius="none">
          <Text color="white">{body}</Text>
        </MessageBubble>
      ) : (
        <MessageBubble
          background="blue.800"
          borderBottomRightRadius="none"
          alignSelf="flex-end"
        >
          <Text color="white">{body}</Text>
        </MessageBubble>
      )}

      {isLast ? null : (
        <Box paddingY={isSamePreviousAuthor ? "0.1rem" : "0.5rem"} />
      )}
    </>
  );
};

export default UserMessage;
