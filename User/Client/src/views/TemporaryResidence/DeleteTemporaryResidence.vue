<template>
    <DeleteTemporaryResidence :temporaryResidenceProfile="{}"></DeleteTemporaryResidence>
</template>
<script>
import { defineComponent } from 'vue';
import DeleteTemporaryResidence from '@/components/TemporaryResidence/DeleteTemporaryResidence.vue';
export default defineComponent({
    components: {
        DeleteTemporaryResidence,
    },
    setup(props, context) {

    }
}); 
</script>