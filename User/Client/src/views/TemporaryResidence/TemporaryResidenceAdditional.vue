<template>
    <div v-if="data && mems && attached">
        <TemporaryResidence2 :data="data" :mems="mems" :attached="attached">
        </TemporaryResidence2>
    </div>
</template>
<script>
import { defineComponent, reactive, onMounted, ref } from 'vue';
import TemporaryResidence2 from '@/components/TemporaryResidence/TemporaryResidence2.vue';
import { usePropressCircular } from '@/stores/progressCircular';
import generalProfileService from "../../services/generalProfile.service";
import memberChangeTogetherService from '../../services/memberChangeTogether.service';
import attachedProfileService from '../../services/attachedProfile.service';
export default defineComponent({
    components: {
        TemporaryResidence2,
    },
    props: {
        id: { type: String, required: true }
    },
    setup(props, context) {
        const proppressCircular = usePropressCircular();
        const data = ref(null);
        const mems = ref([]);
        const attached = ref([]);
        onMounted(async () => {
            try {
                proppressCircular.setState(true);
                data.value = await generalProfileService.getById(props.id);
                mems.value = await memberChangeTogetherService.getAllByGeneralProfileId(props.id);
                attached.value = await attachedProfileService.getAllByGeneralProfileId(props.id);
                console.log(data.value)
                proppressCircular.setState(false);
            } catch (error) {
                console.log(error);
                proppressCircular.setState(false);
            }
        })

        return {
            data, mems, attached,
        }
    }
});

</script>