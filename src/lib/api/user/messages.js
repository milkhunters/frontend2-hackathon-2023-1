import { getUnreadMessagesCount } from "./profile.js";

const REQUEST_DELAY = 5000;

let subscription = null;
const callbacks = new Set();

const updateUnreadMessageCount = async () => {
  const unreadMessagesCount = await getUnreadMessagesCount();
  for (const callback of callbacks)
    callback(unreadMessagesCount);
};

const createUpdateInterval = () => {
  return setInterval(async () => {
    updateUnreadMessageCount();
  }, REQUEST_DELAY);
};

export const subscribeToMessageCount = (callback) => {
  subscription ??= createUpdateInterval()
  callbacks.add(callback);
};

export const unsubscribeFromMessageCount = (callback) => {
  callbacks.delete(callback);

  if (callbacks.size === 0) {
    clearInterval(subscription);
    subscription = null;
  }
};
