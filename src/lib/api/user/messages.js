import { getUnreadMessagesCount } from "./profile";

const INTERVAL_TIME = 5000;

let subscription = null;
const callbacks = new Set();

export const subscribeToMessageCount = (userId, callback) => {
  if (subscription === null) {
    subscription = setInterval(async () => {
      const unreadMessagesCount = await getUnreadMessagesCount(userId);
      callbacks.forEach((callback) => callback(unreadMessagesCount));
    }, INTERVAL_TIME);
  }

  callbacks.add(callback);   
};

export const unsubscribeFromMessageCount = (userId, callback) => {
  callbacks.delete(callback);

  if (callbacks.size === 0) {
    clearInterval(subscription);
    subscription = null;
  }
};
