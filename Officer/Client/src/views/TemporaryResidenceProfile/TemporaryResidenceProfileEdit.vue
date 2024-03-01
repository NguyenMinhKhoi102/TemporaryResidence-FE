<template>
    <div v-if="temporaryResidenceProfile">
        <TemporaryResidenceProfileForm @rerender:temporaryResidenceProfile="getData"
            :temporaryResidenceProfile="temporaryResidenceProfile" />
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import TemporaryResidenceProfileForm from '../../components/TemporaryResidenceProfile/TemporaryResidenceProfileForm.vue';
import temporaryResidenceProfileService from '../../services/temporaryResidenceProfile.service';
import { usePropressCircular } from '../../stores/progressCircular';
export default defineComponent({
    components: {
        TemporaryResidenceProfileForm
    },
    props: {
        id: { type: String, required: true },
    },
    setup(props, context) {
        const temporaryResidenceProfile = ref(null);
        const progressCircular = usePropressCircular();
        const getData = async () => {
            try {
                progressCircular.setState(true);
                temporaryResidenceProfile.value = await temporaryResidenceProfileService.getById(props.id);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                temporaryResidenceProfile.value = await temporaryResidenceProfileService.getById(props.id);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        });
        return {
            temporaryResidenceProfile,
            getData,
        }
    }
});
</script>