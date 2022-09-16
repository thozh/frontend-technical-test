## Libraries used

- **[react-query](https://tanstack.com/query/v4) and [axios](https://axios-http.com/)** : Powerful asynchronous state management which handles fetching but also the caching of data from the server
- **[date-fns](https://date-fns.org/)** : Format JavaScript from timestamp to dates
- **[chakra-ui](https://chakra-ui.com/)** : Simple and accessible UI library for React

## Steps

Mapped all endpoints from `docs/api-swagger.yaml` to `src/api`
Created two pages `src/pages/index` for the conversations list and `src/pages/conversations/[id].tsx` for the conversation's messages
Added "lastMessageTimestamp" property from "Conversation" type
Creating a message from the incomplete documentation
