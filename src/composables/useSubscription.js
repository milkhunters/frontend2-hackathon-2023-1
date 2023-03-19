import { onMounted, onUnmounted, ref } from "vue";

const useSubscription = (subscribe, unsubscribe, init = null, callback = null) => {
  const value = ref(init);

  const changeValue = (newValue) => {
    value.value = newValue;
    callback?.apply(null, newValue);
  };

  onMounted(() => subscribe(changeValue));
  onUnmounted(() => unsubscribe(changeValue));

  return value;
};

export default useSubscription;
