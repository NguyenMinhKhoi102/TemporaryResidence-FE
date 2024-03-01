<template>
    <div>
        <SignInForm @submit:signin="submitSignIn" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import SignInForm from '@/components/SignInForm.Vue';
import authService from "@/services/auth.service";
import { useStore } from "@/stores/store";
import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        SignInForm,
    },
    setup(props, context) {
        const message = ref("");
        const store = useStore();
        const router = useRouter();
        const submitSignIn = async (data) => {
            try {
                console.log("1231");
                const response = await authService.signIn(data);
                window.localStorage.setItem("token", response.accessToken);
                window.localStorage.setItem("roles", response.roles);
                store.setIsAuthenticated(true);
                console.log(response);
            } catch (error) {
                console.log(error);
                message.value = "Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại";
            }
        }

        return {
            message,
            store,
            submitSignIn
        }
    }
});

</script>