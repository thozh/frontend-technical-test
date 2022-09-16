import { Divider, Link, Spinner, Stack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import conversationsService from "../../api/conversations";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import ConversationsListItem from "./ConversationsListItem";

import NextLink from "next/link";

const ConversationsList: FC = () => {
  const userId = getLoggedUserId();
  const { data, isLoading } = useQuery(["conversations", userId], () =>
    conversationsService.getConversations(userId)
  );
  const conversationsData = data?.data;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Stack
      spacing={["0.5rem", "1.5rem"]}
      width={["100vw", "300px"]}
      padding="1rem"
    >
      {conversationsData.map(
        ({ id, recipientNickname, lastMessageTimestamp }, idx) => {
          const isLast = conversationsData.length - 1 === idx;

          return (
            <>
              <NextLink
                key={id}
                href={`/conversations/${encodeURIComponent(id)}`}
                passHref
              >
                <Link _hover={{ textDecoration: "none" }}>
                  <ConversationsListItem
                    conversation={{ recipientNickname, lastMessageTimestamp }}
                  />
                </Link>
              </NextLink>

              {isLast ? null : <Divider />}
            </>
          );
        }
      )}
    </Stack>
  );
};

export default ConversationsList;
