import { onMounted, onUnmounted, ref } from "vue";
import { subscribeToMessageCount, unsubscribeFromMessageCount } from "../lib/api/user/messages";

const useUnreadMessagesCount = (userId) => {
  const count = ref(null);

  const updateCount = (newCount) => (count.value = newCount);
  onMounted(() => subscribeToMessageCount(userId, updateCount));
  onUnmounted(() => unsubscribeFromMessageCount(userId, updateCount));

  return count;
};

export default useUnreadMessagesCount;
