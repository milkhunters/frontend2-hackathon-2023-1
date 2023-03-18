import { ref, watch } from "vue";

const useFormError = (fields) => {
  const error = ref(null);
  watch(fields, () => (error.value = null));
  return error;
};

export default useFormError;
