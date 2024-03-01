<template>
    <AccountsList :data="dataCopy"></AccountsList>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { usePropressCircular } from '../../stores/progressCircular';
import accountService from '../../services/account.service';
import AccountsList from '../../components/Accounts/AccountsList.vue';
export default defineComponent({
    components: {
        AccountsList
    },
    setup(props, context) {
        let data = [];
        const dataCopy = ref([]);
        const progressCircular = usePropressCircular();

        onMounted(async () => {
            try {
                progressCircular.setState(true);
                data = await accountService.getAll();
                dataCopy.value = data;
                console.log(dataCopy.value);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        });
        return {
            dataCopy,
        }
    }
});
</script>