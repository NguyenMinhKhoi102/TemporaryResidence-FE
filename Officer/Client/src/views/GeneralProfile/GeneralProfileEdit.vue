<template>
    <div v-if="generalProfile">
        <GeneralProfileForm @rerender:generalProfile="getData" :generalProfile="generalProfile">
        </GeneralProfileForm>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { usePropressCircular } from '../../stores/progressCircular';
import generalProfileService from '../../services/generalProfile.service';
import GeneralProfileForm from "@/components/GeneralProfile/GeneralProfileForm.vue";
export default defineComponent({
    components: {
        GeneralProfileForm,
    },
    props: {
        id: { type: String, required: true },
    },
    setup(props, context) {
        const generalProfile = ref(null);
        const progressCircular = usePropressCircular();
        const getData = async () => {
            try {
                progressCircular.setState(true);
                generalProfile.value = await generalProfileService.getById(props.id);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                generalProfile.value = await generalProfileService.getById(props.id);
                // console.log(generalProfile.value);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        });
        return {
            generalProfile,
            getData,
        }
    }
});
</script>