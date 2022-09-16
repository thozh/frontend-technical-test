import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import messagesService from "../../../api/messages";
import { getLoggedUserId } from "../../../utils/getLoggedUserId";

interface MessageInputProps {
  conversationId: string;
  isRecipientOrSender: boolean;
}

const MessageInput: FC<MessageInputProps> = ({
  conversationId,
  isRecipientOrSender,
}) => {
  const [messageBody, setMessageBody] = useState("");
  const toast = useToast();
  const queryClient = useQueryClient();
  const userId = getLoggedUserId();
  const sendMessageMutation = useMutation(() => {
    if (isRecipientOrSender) {
      return messagesService.sendMessage({
        authorId: userId,
        body: messageBody,
        conversationId: parseInt(conversationId, 10),
      });
    }

    toast({
      title: "Sorry, you are not a member of the conversation",
      status: "error",
      isClosable: true,
    });
  });

  if (!conversationId) {
    return null;
  }

  const onWriteMessage = (event: ChangeEvent<HTMLInputElement>) =>
    setMessageBody(event.target.value);
  const onSendMessage = () => {
    if (messageBody !== "") {
      sendMessageMutation.mutate(null, {
        onSuccess: () => {
          queryClient.invalidateQueries(["conversation", conversationId]);
          setMessageBody("");
        },
      });
    }
  };
  const onEnterPressed = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <InputGroup>
      <Input
        variant="filled"
        placeholder="Écrivez ici..."
        value={messageBody}
        onChange={onWriteMessage}
        onKeyDown={onEnterPressed}
        isDisabled={!isRecipientOrSender}
      />

      <InputRightElement>
        <IconButton
          variant="unstyled"
          aria-label="Envoyer message"
          icon={<ArrowUpIcon boxSize="24px" />}
          onClick={onSendMessage}
          isDisabled={!isRecipientOrSender}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default MessageInput;
