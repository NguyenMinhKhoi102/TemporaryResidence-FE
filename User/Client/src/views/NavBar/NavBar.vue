<template>
    <div>
        <NavBar @signOut:signOut="signOut"></NavBar>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import NavBar from '../../components/NavBar/NavBar.vue';
import authService from "@/services/auth.service";
import { usePropressCircular } from '@/stores/progressCircular';
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        NavBar,
    },
    setup(props, context) {
        const progressCircular = usePropressCircular();
        const router = useRouter();
        const signOut = async () => {
            try {
                progressCircular.setState(true);
                await authService.signOut();
                window.localStorage.clear();
                router.push({ name: "signin" });
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        return {
            signOut,
        }
    }
})

</script>