import {createSelector} from 'reselect';

// Input selector: Extracts the messagesByConversation object from the state
const selectMessagesByConversation = state => state.chat.messagesByConversation;
const selectUserDetails = state => state.users.userDetails;

// Memoized selector: Retrieves messages for a specific conversation
export const selectMessagesForConversation = createSelector(
  [selectMessagesByConversation, (state, conversationId) => conversationId], // Input selectors
  (messagesByConversation, conversationId) => {
    return messagesByConversation[conversationId] || [];
  },
);

// Memoized selector: Retrieves inbox data with merged user details
export const selectInbox = createSelector(
  [selectMessagesByConversation, selectUserDetails],
  (messagesByConversation, userDetails) => {
    const inbox = [];

    for (const conversationId in messagesByConversation) {
      const messages = messagesByConversation[conversationId];

      if (messages.length > 0) {
        const latestMessage = messages[messages.length - 1];
        const user = userDetails[conversationId] || {
          name: 'Unknown',
          avatar: null,
        };

        inbox.push({
          conversationId,
          latestMessage,
          user,
          unreadCount: messages.filter(msg => !msg.isRead).length,
        });
      }
    }

    // Sort the inbox by the latest message timestamp (newest first)
    return inbox.sort(
      (a, b) => b.latestMessage.serverTime - a.latestMessage.serverTime,
    );
  },
);

// Memoized selector: Retrieves inbox data for the current user
// export const selectInbox = createSelector(
//   [selectMessagesByConversation],
//   messagesByConversation => {
//     const inbox = [];

//     // Iterate over all conversations
//     for (const conversationId in messagesByConversation) {
//       const messages = messagesByConversation[conversationId];

//       if (messages.length > 0) {
//         // Get the latest message in the conversation
//         const latestMessage = messages[messages.length - 1];

//         // Add the conversation to the inbox
//         inbox.push({
//           conversationId,
//           latestMessage,
//           unreadCount: messages.filter(msg => !msg.isRead).length, // Optional: Count unread messages
//         });
//       }
//     }

//     // Sort the inbox by the latest message timestamp (newest first)
//     return inbox.sort(
//       (a, b) => b.latestMessage.serverTime - a.latestMessage.serverTime,
//     );
//   },
// );

// export const selectMessagesForConversation = (state, conversationId) => {
//   return state.chat.messagesByConversation[conversationId] || [];
// };
