import {createSelector} from 'reselect';

// Input selector: Extracts the messagesByConversation object from the state
const selectMessagesByConversation = state => state.chat.messagesByConversation;

// Memoized selector: Retrieves messages for a specific conversation
export const selectMessagesForConversation = createSelector(
  [selectMessagesByConversation, (state, conversationId) => conversationId], // Input selectors
  (messagesByConversation, conversationId) => {
    return messagesByConversation[conversationId] || [];
  },
);

// export const selectMessagesForConversation = (state, conversationId) => {
//   return state.chat.messagesByConversation[conversationId] || [];
// };
