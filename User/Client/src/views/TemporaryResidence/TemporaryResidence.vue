<template>
    <div>
        <TemporaryResidence :provinces="provinces" :typeProfiles="typeProfiles" :typeNotification="typeNotification"
            :receiveResult="receiveResult">
        </TemporaryResidence>
    </div>
</template>
<script>
import { defineComponent, reactive, onMounted, ref } from 'vue';
import TemporaryResidence from '@/components/TemporaryResidence/TemporaryResidence.vue';
import provinceService from '@/services/province.service';
import typeProfileService from '@/services/typeProfile.service';
import receiveResultService from '@/services/receiveResult.service';
import typeNotificationService from '@/services/typeNotification.service';
import { usePropressCircular } from '@/stores/progressCircular';
export default defineComponent({
    components: {
        TemporaryResidence,
    },
    setup(props, context) {
        const proppressCircular = usePropressCircular();
        const provinces = ref([]);
        const typeProfiles = ref([]);
        const typeNotification = ref([]);
        const receiveResult = ref([]);
        onMounted(async () => {
            try {
                proppressCircular.setState(true);
                provinces.value = await provinceService.getAll();
                typeProfiles.value = await typeProfileService.getAll(true);
                typeNotification.value = await typeNotificationService.getAll(true);
                receiveResult.value = await receiveResultService.getAll(true);
                proppressCircular.setState(false);
            } catch (error) {
                console.log(error);
                proppressCircular.setState(false);
            }
        })

        return {
            proppressCircular,
            provinces,
            typeProfiles,
            typeNotification,
            receiveResult,
        }
    }
});

</script>