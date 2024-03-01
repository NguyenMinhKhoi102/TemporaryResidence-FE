<template>
    <TemporaryResidenceExtension :temporaryResidenceProfile="{}"></TemporaryResidenceExtension>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import TemporaryResidenceExtension from '@/components/TemporaryResidence/TemporaryResidenceExtension.vue';
import temporaryResidenceProfileService from "../../services/temporaryResidenceProfile";
export default defineComponent({
    components: {
        TemporaryResidenceExtension,
    },
    setup(props, context) {
    }
});
</script>