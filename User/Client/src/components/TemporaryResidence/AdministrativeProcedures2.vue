<template>
    <div class="administrative-procedures-component">
        <div class="form-row">
            <div class="form-group col">
                <label>Thủ tục <span class="not-null">(*)</span></label>
                <Field name="typeProfile" class="form-control" as="select" v-model="localProcedure.typeProfile" disabled
                    @change="setFormData">
                    <option value="" hidden>-- Chọn --</option>
                    <option v-for="(typeProfile, index) in typeProfiles" :key="index" :value="typeProfile.id">
                        {{ typeProfile.name }}
                    </option>
                </Field>
                <ErrorMessage name="typeProfile" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Trường hợp <span class="not-null">(*)</span></label>
                <Field name="caseProfile" class="form-control" as="select" v-model="localProcedure.caseProfile"
                    @change="setFormData">
                    <option value="" hidden>-- Chọn --</option>
                    <option value="Gia hạn tạm trú">Gia hạn tạm trú</option>
                    <!-- <option v-for="(caseProfile, index) in caseProfiles" :key="index" :value="caseProfile.id">
                            {{ caseProfile.name }}
                        </option> -->
                </Field>
                <ErrorMessage name="caseProfile" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Thời gian gia hạn đến ngày <span class="not-null">(*)</span></label>
                <Field name="temporaryResidenceExpiration" class="form-control"
                    v-model="localProcedure.temporaryResidenceExpiration" type="date" @change="setFormData" />
                <ErrorMessage name="temporaryResidenceExpiration" class="error-feedback" />
            </div>
            <div class="form-group col-12">
                <label>Ý kiến của người khai báo </label>
                <textarea name="noteDeclarent" class="form-control" v-model="localProcedure.noteDeclarent"
                    placeholder="Ý kiến của người khai báo" @change="setFormData">
                </textarea>
            </div>
            <div class="form-group col-12">
                <label>Hồ sơ đã đăng ký</label>
                <Field name="profileRegisted" class="form-control" as="select" v-model="profileId"
                    @change="autoSetFormData">
                    <option value="">-- Chưa chọn --</option>
                    <option v-for="(e, index) in formData.profile" :key="index" :value="e.id">
                        {{ e.id + " - " + e.name + " - " + e.cmndCccd }}
                    </option>
                </Field>
                <ErrorMessage name="profileRegisted" class="error-feedback" />
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import { Field, ErrorMessage } from "vee-validate";
import temporaryResidenceProfileService from '@/services/temporaryResidenceProfile';
import { usePropressCircular } from '@/stores/progressCircular';
import districtService from "@/services/district.service";
import wardService from "@/services/ward.service";
import provinceService from '@/services/province.service';
export default defineComponent({
    components: {
        Field,
        ErrorMessage,
    },
    props: {
        typeProfiles: { type: Array, default: [] },
        formData: { type: Object, required: true },
    },
    emits: ["set:formData"],
    setup(props, context) {
        const localProcedure = ref({
            typeProfile: 2,
            caseProfile: "",
            temporaryResidenceExpiration: "",
            noteDeclarent: "",
        });
        const setFormData = () => {
            context.emit("set:formData", {
                typeProfileId: localProcedure.value.typeProfile,
                caseProfile: localProcedure.value.caseProfile,
                temporaryResidenceExpiration: localProcedure.value.temporaryResidenceExpiration,
                noteDeclarent: localProcedure.value.noteDeclarent,
            });
        }
        const progressCircular = usePropressCircular();
        const profileId = ref("");
        const autoSetFormData = async () => {
            try {
                progressCircular.setState(true);
                // console.log(profileId.value);
                if (profileId.value != "") {
                    const rs = await temporaryResidenceProfileService.getById(profileId.value);
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
                    context.emit("set:formData", {
                        name: rs.name,
                        birthday: rs.birthday,
                        gender: rs.gender,
                        cmndCccd: rs.cmndCccd,
                        phone: rs.phone,
                        email: rs.email,
                        statusInfo: true,
                        pmnDistricts: districts1,
                        pmnWards: wards1,
                        pmnWard: ward1.code,
                        pmnDistrict: district1.code,
                        pmnProvince: province1.code,
                        crDistricts: districts2,
                        crWards: wards2,
                        crWard: ward2.code,
                        crDistrict: district2.code,
                        crProvince: province2.code,
                    });
                } else {
                    context.emit("set:formData", {
                        name: "",
                        birthday: "",
                        gender: "",
                        cmndCccd: "",
                        phone: "",
                        email: "",
                        statusInfo: false,
                        pmnDistricts: [],
                        pmnWards: [],
                        pmnWard: "",
                        pmnDistrict: "",
                        pmnProvince: "",
                        crDistricts: [],
                        crWards: [],
                        crWard: "",
                        crDistrict: "",
                        crProvince: "",
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        return {
            localProcedure,
            setFormData,
            autoSetFormData,
            profileId,
        }
    }
});
</script>