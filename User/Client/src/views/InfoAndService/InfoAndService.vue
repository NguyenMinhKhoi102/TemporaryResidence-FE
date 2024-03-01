<template>
    <InfoAndService></InfoAndService>
</template>
<script>
import { defineComponent } from 'vue';
import InfoAndService from '@/components/InfoAndService/InfoAndService.vue';
export default defineComponent({
    components: {
        InfoAndService,
    },
    setup(props, context) {
        return {
        }
    }
});

</script>