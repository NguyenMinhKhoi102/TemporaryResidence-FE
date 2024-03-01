<template>
    <div class="implementing-agencies-component">
        <div class="form-row">
            <div class="form-group col">
                <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                <Field name="province1" class="form-control" as="select" v-model="data.province" @change="getDistricts"
                    :disabled="formData.statusInfo">
                    <option value="" hidden>-- Chọn --</option>
                    <option v-for="(province, index) in provinces" :key="index" :value="province.code">
                        {{ province.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="province1" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Quận/Huyện <span class="not-null">(*)</span></label>
                <Field name="district1" class="form-control" as="select" v-model="data.district" @change="getWards"
                    :disabled="formData.statusInfo">
                    <option value="" hidden>-- Chọn --</option>
                    <option v-for="(district, index) in data.districts" :key="index" :value="district.code">
                        {{ district.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="district1" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Phường/Xã <span class="not-null">(*)</span></label>
                <Field name="ward1" class="form-control" as="select" v-model="data.ward" @change="setOrgan"
                    :disabled="formData.statusInfo">
                    <option value="" hidden>-- Chọn --</option>
                    <option v-for="(ward, index) in data.wards" :key="index" :value="ward.code">
                        {{ ward.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="ward1" class="error-feedback" />
            </div>
        </div>

        <div class="form-group">
            <label>Cơ quan thực hiện <span class="not-null">(*)</span></label>
            <Field name="organ" type="text" class="form-control" placeholder="Cơ quan chức năng" disabled
                v-model="data.organ" />
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
        const data = ref(props.formData);
        const proppressCircular = usePropressCircular();
        const getDistricts = async () => {
            try {
                proppressCircular.setState(true);
                context.emit("set:formData", {
                    ward: [],
                    district: "",
                    ward: "",
                    organ: "",
                });
                const districts = await districtService.getByProvinceCode(data.value.province);
                context.emit("set:formData", { districts: districts });

            } catch (error) {
                console.log(error);
            } finally {
                proppressCircular.setState(false);
            }
        }
        const getWards = async () => {
            try {
                proppressCircular.setState(true);
                context.emit("set:formData", {
                    ward: "",
                    organ: "",
                });
                const wards = await wardService.getByDistrictCode(data.value.district);
                context.emit("set:formData", { wards: wards });
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
                const profile = await temporaryResidenceProfileService.getAllByWardCode(data.value.ward);
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
                const temp = await wardService.getByCode(data.value.ward);
                context.emit("set:formData", {
                    "wardId": data.value.ward,
                    "profile": filteredProfiles,
                    "organ": "Công an " + temp.fullName,
                });
            } catch (error) {
                console.log(error);
            } finally {
                proppressCircular.setState(false);
            }
        }
        return {
            proppressCircular,
            getDistricts,
            getWards,
            setOrgan,
            data,
        }
    }
});

</script>