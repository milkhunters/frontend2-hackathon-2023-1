import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUserProfileInfo } from "../lib/api/user/profile";

const useUserProfile = () => {
  const router = useRouter();
  const user = ref(null);

  onMounted(async () => {
    const [error, userInfo] = await getCurrentUserProfileInfo();
    if (error) {
      router.push({ name: "login" });
    } else {
      user.value = userInfo;
    }
  });

  return user;
};

export default useUserProfile;
