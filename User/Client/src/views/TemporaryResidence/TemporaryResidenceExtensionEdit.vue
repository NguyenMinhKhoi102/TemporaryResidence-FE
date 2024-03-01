<template>
    <div v-if="data">
        <TemporaryResidenceExtension :temporaryResidenceProfile="data"></TemporaryResidenceExtension>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import TemporaryResidenceExtension from '@/components/TemporaryResidence/TemporaryResidenceExtension.vue';
import { usePropressCircular } from '@/stores/progressCircular';
import temporaryResidenceProfileService from "@/services/temporaryResidenceProfile";
import provinceService from '@/services/province.service';
import districtService from '@/services/district.service';
import wardService from '@/services/ward.service';
export default defineComponent({
    components: {
        TemporaryResidenceExtension,
    },
    props: {
        id: { type: String, required: true }
    },
    setup(props, context) {
        const progressCircular = usePropressCircular();
        const data = ref(null);
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                data.value = await temporaryResidenceProfileService.getById(props.id);
                const rs = await temporaryResidenceProfileService.getById(data.value.ward.district.province.code);
                const temp1 = rs.permanentAddress.split(",").reverse();
                const province1 = await provinceService.getByFullName(temp1[0].trim());
                const districts1 = await districtService.getByProvinceCode(province1.code);
                const district1 = districts1.find(e => e.fullName == temp1[1].trim());
                const wards1 = await wardService.getByDistrictCode(district1.code);
                const ward1 = wards1.find(e => e.fullName == temp1[2].trim());
                const temp2 = rs.currentAddress.split(",").reverse();
                const province2 = await provinceService.getByFullName(temp2[0].trim());
                const districts2 = await districtService.getByProvinceCode(province2.code);
                const district2 = districts2.find(e => e.fullName == temp2[1].trim());
                const wards2 = await wardService.getByDistrictCode(district2.code);
                const ward2 = wards2.find(e => e.fullName == temp2[2].trim());
                const temp3 = await districtService.getByProvinceCode(data.value.ward.district.province.code);
                const temp4 = await wardService.getByDistrictCode(data.value.ward.district.code);
                data.value.pmnDistricts = districts1;
                data.value.pmnWards = wards1;
                data.value.pmnWard = ward1.code;
                data.value.pmnDistrict = district1.code;
                data.value.pmnProvince = province1.code;
                data.value.crDistricts = districts2;
                data.value.crWards = wards2;
                data.value.crWard = ward2.code;
                data.value.crDistrict = district2.code;
                data.value.crProvince = province2.code;
                data.value.province = data.value.ward.district.province.code;
                data.value.district = data.value.ward.district.code;
                data.value.wardId = data.value.ward.code;
                data.value.organ = "Công an " + data.value.ward.fullName;
                data.value.ward = data.value.ward.code;
                data.value.districts = temp3;
                data.value.wards = temp4;

                data.value.statusInfo = true;
                console.log(data.value);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        });
        return {
            data,
        }
    }
});
</script>