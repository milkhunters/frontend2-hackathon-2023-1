import { getUnreadMessagesCount } from "./profile.js";

const INTERVAL_TIME = 5000;

let subscription = null;
let lastUpdatedMassage = null;
const callbacks = new Set();

export const subscribeToMessageCount = (userId, callback) => {
  if (subscription === null) {
    subscription = setInterval(async () => {
      const [error, unreadMessagesCount] = await getUnreadMessagesCount(userId);
      if (error) {
        console.error(error);
        return;
      }
      lastUpdatedMassage = unreadMessagesCount;
      callbacks.forEach((callback) => callback(unreadMessagesCount));
    }, INTERVAL_TIME);
  }

  callbacks.add(callback);
  if (lastUpdatedMassage) callback(lastUpdatedMassage);
};

export const unsubscribeFromMessageCount = (userId, callback) => {
  callbacks.delete(callback);

  if (callbacks.size === 0) {
    clearInterval(subscription);
    subscription = null;
    lastUpdatedMassage = null;
  }
};
