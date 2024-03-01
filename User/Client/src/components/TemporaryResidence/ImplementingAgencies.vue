<template>
    <div class="implementing-agencies-component">
        <div class="form-row">
            <div class="form-group col">
                <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                <Field name="province1" class="form-control" as="select" v-model="localOrgan.provinceCode"
                    @change="getDistricts" :disabled="formData.statusInfo">
                    <option value="" hidden>-- Chọn --</option>
                    <option v-for="(province, index) in provinces" :key="index" :value="province.code">
                        {{ province.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="province1" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Quận/Huyện <span class="not-null">(*)</span></label>
                <Field name="district1" class="form-control" as="select" v-model="localOrgan.districtCode"
                    @change="getWards" :disabled="formData.statusInfo">
                    <option value="" hidden>-- Chọn --</option>
                    <option v-for="(district, index) in localOrgan.districts" :key="index" :value="district.code">
                        {{ district.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="district1" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Phường/Xã <span class="not-null">(*)</span></label>
                <Field name="ward1" class="form-control" as="select" v-model="localOrgan.wardCode" @change="setOrgan"
                    :disabled="formData.statusInfo">
                    <option value="" hidden>-- Chọn --</option>
                    <option v-for="(ward, index) in localOrgan.wards" :key="index" :value="ward.code">
                        {{ ward.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="ward1" class="error-feedback" />
            </div>
        </div>

        <div class="form-group">
            <label>Cơ quan thực hiện <span class="not-null">(*)</span></label>
            <Field name="organ" type="text" class="form-control" placeholder="Cơ quan chức năng" disabled
                v-model="localOrgan.organ" />
            <ErrorMessage name="organ" class="error-feedback" />
        </div>

    </div>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import { Field, ErrorMessage } from "vee-validate";
import districtService from '@/services/district.service';
import wardService from '@/services/ward.service';
import { usePropressCircular } from '../../stores/progressCircular';
import temporaryResidenceProfileService from '../../services/temporaryResidenceProfile';
export default defineComponent({
    components: {
        Field,
        ErrorMessage,
    },
    props: {
        provinces: { type: Array, default: [] },
        formData: { type: Object, required: true },
    },
    emits: ["set:formData"],
    setup(props, context) {
        const proppressCircular = usePropressCircular();
        const localOrgan = ref({
            provinceCode: "",
            districtCode: "",
            wardCode: "",
            districts: [],
            wards: [],
            organ: "",
        });
        const getDistricts = async () => {
            try {
                proppressCircular.setState(true);
                localOrgan.value.districtCode = "";
                localOrgan.value.wardCode = "";
                localOrgan.value.organ = "";
                localOrgan.value.wards = [];
                localOrgan.value.districts = await districtService.getByProvinceCode(localOrgan.value.provinceCode);
                context.emit("set:formData", { wardId: "", districts: localOrgan.value.districts });

            } catch (error) {
                console.log(error);
            } finally {
                proppressCircular.setState(false);
            }
        }
        const getWards = async () => {
            try {
                proppressCircular.setState(true);
                localOrgan.value.wardCode = "";
                localOrgan.value.organ = "";
                localOrgan.value.wards = await wardService.getByDistrictCode(localOrgan.value.districtCode);
                context.emit("set:formData", { wardId: localOrgan.value.wardCode, wards: localOrgan.value.wards });
                // console.log(wards);
            } catch (error) {
                console.log(error);
            } finally {
                proppressCircular.setState(false);
            }
        }
        const setOrgan = async () => {
            try {
                proppressCircular.setState(true);
                const profile = await temporaryResidenceProfileService.getAllByWardCode(localOrgan.value.wardCode);
                // Ngày hiện tại
                const currentDate = new Date();
                // Ngày hết hạn tối thiểu (15 ngày trước)
                const minExpireDate = new Date();
                minExpireDate.setDate(currentDate.getDate() - 15);
                // Lọc các đối tượng trong mảng
                const filteredProfiles = profile.filter((item) => {
                    // Chuyển đổi chuỗi ngày hết hạn thành đối tượng ngày
                    const expireDate = new Date(item.temporaryResidenceExpiration);
                    // So sánh ngày hết hạn với ngày tối thiểu
                    return expireDate >= minExpireDate;
                });
                const temp = await wardService.getByCode(localOrgan.value.wardCode);
                context.emit("set:formData", {
                    "wardId": localOrgan.value.wardCode,
                    "profile": filteredProfiles,
                });
                localOrgan.value.organ = "Công an " + temp.fullName;
            } catch (error) {
                console.log(error);
            } finally {
                proppressCircular.setState(false);
            }
        }
        return {
            proppressCircular,
            localOrgan,
            getDistricts,
            getWards,
            setOrgan,
        }
    }
});

</script>