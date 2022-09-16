import MessageInput from "../components/Message/MessageInput";
import { render, fireEvent } from "./test-utils";
import userEvent from "@testing-library/user-event";

describe("Message", () => {
  it("should be able to fill input", async () => {
    const conversationId = "__CONVERSATION_ID__";

    const { getByPlaceholderText, getByLabelText } = render(
      <MessageInput
        conversationId={conversationId}
        isRecipientOrSender={true}
      />
    );
    const messageInput = getByPlaceholderText("Écrivez ici...");
    const sendMessageButton = getByLabelText("Envoyer message");
    const message = "Hello";

    await userEvent.type(messageInput, message);

    expect(sendMessageButton).not.toBeDisabled();
    expect(messageInput).not.toBeDisabled();
    expect(messageInput).toHaveValue(message);
  });
  it("input and button should be disabled", () => {
    const conversationId = "__CONVERSATION_ID__";

    const { getByPlaceholderText, getByLabelText } = render(
      <MessageInput
        conversationId={conversationId}
        isRecipientOrSender={false}
      />
    );
    const messageInput = getByPlaceholderText("Écrivez ici...");
    const sendMessageButton = getByLabelText("Envoyer message");

    expect(messageInput).toBeDisabled();
    expect(sendMessageButton).toBeDisabled();
  });
});
