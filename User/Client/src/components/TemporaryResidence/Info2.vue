<template>
    <div class="info-component">
        <div class="form-row">
            <div class="form-group col">
                <label>Họ và tên <span class="not-null">(*)</span></label>
                <Field name="name" class="form-control" v-model="data.name" type="text" placeholder="Họ và tên"
                    :disabled="data.statusInfo" @change="setFormData" />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Ngày sinh <span class="not-null">(*)</span></label>
                <Field name="birthday" class="form-control" v-model="data.birthday" type="date" @change="setFormData"
                    :disabled="data.statusInfo" />
                <ErrorMessage name="birthday" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Giới tính <span class="not-null">(*)</span></label>
                <Field name="gender" class="form-control" v-model="data.gender" as="select" @change="setFormData"
                    :disabled="data.statusInfo">
                    <option value="" hidden>-- Chọn --</option>
                    <option value="1">Giới tính nam</option>
                    <option value="0">Giới tính nữ</option>
                </Field>
                <ErrorMessage name="gender" class="error-feedback" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label>Số ĐDCN(CCCD)/CMND<span class="not-null">(*)</span></label>
                <Field name="cmndCccd" class="form-control" v-model="data.cmndCccd" type="text"
                    placeholder="Số ĐDCN(CCCD)/CMND" @change="setFormData" :disabled="data.statusInfo" />
                <ErrorMessage name="cmndCccd" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Số điện thoại <span class="not-null">(*)</span></label>
                <Field name="phone" class="form-control" v-model="data.phone" type="text" placeholder="Số điện thoại"
                    @change="setFormData" :disabled="data.statusInfo" />
                <ErrorMessage name="phone" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Email <span class="not-null">(*)</span></label>
                <Field name="email" class="form-control" v-model="data.email" type="email" placeholder="Email"
                    @change="setFormData" :disabled="data.statusInfo" />
                <ErrorMessage name="email" class="error-feedback" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label>Nghề nghiệp</label>
                <Field name="job" class="form-control" v-model="data.job" type="text" placeholder="Nghề nghiệp"
                    @change="setFormData" />
                <ErrorMessage name="job" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Nơi làm việc</label>
                <Field name="workspace" class="form-control" v-model="data.workspace" type="text" placeholder="Nơi làm việc"
                    @change="setFormData" />
                <ErrorMessage name="workspace" class="error-feedback" />
            </div>
        </div>
        <h6 class="font-weight-bold">Nơi thường trú <span class="not-null">(*)</span></h6>
        <div class="form-row">
            <div class="form-group col">
                <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                <Field class="form-control" name="pmnProvince" as="select" v-model="data.pmnProvince"
                    @change="setPmnDistrict" :disabled="data.statusInfo">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in provinces" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="pmnProvince" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Quận/Huyện <span class="not-null">(*)</span></label>
                <Field class="form-control" name="pmnDistrict" as="select" v-model="data.pmnDistrict" @change="setPmnWard"
                    :disabled="data.statusInfo">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in data.pmnDistricts" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="pmnDistrict" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Phường xã <span class="not-null">(*)</span></label>
                <Field class="form-control" name="pmnWard" as="select" v-model="data.pmnWard" :disabled="data.statusInfo">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in data.pmnWards" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="pmnWard" class="error-feedback" />
            </div>
        </div>
        <h6 class="font-weight-bold">Nơi ở hiện tại <span class="not-null">(*)</span></h6>
        <div class="form-row">
            <div class="form-group col">
                <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                <Field class="form-control" name="crProvince" as="select" v-model="data.crProvince" @change="setCrDistrict"
                    :disabled="data.statusInfo">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in provinces" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="crProvince" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Quận/Huyện <span class="not-null">(*)</span></label>
                <Field class="form-control" name="crDistrict" as="select" v-model="data.crDistrict" @change="setCrWard"
                    :disabled="data.statusInfo">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in data.crDistricts" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="crDistrict" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Phường/Xã <span class="not-null">(*)</span></label>
                <Field class="form-control" name="crWard" as="select" v-model="data.crWard" :disabled="data.statusInfo">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in data.crWards" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="crWard" class="error-feedback" />
            </div>
        </div>

    </div>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import { Field, ErrorMessage } from "vee-validate";
import districtService from "../../services/district.service";
import wardService from "../../services/ward.service";
import { usePropressCircular } from '../../stores/progressCircular';
export default defineComponent({
    components: {
        Field,
        ErrorMessage,
    },
    props: {
        formData: { type: Object, required: true },
        provinces: { type: Array, default: [] },
    },
    emits: ["set:formData"],
    setup(props, context) {
        const data = ref(props.formData);
        const progressCircular = usePropressCircular();
        const setPmnDistrict = async () => {
            try {
                progressCircular.setState(true);
                context.emit("set:formData", {
                    pmnWards: [],
                    pmnDistrict: "",
                    pmnWard: ""
                });
                const districts = await districtService.getByProvinceCode(data.value.pmnProvince);
                context.emit("set:formData", { pmnDistricts: districts });
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const setPmnWard = async () => {
            try {
                progressCircular.setState(true);
                context.emit("set:formData", {
                    pmnWard: ""
                });
                const wards = await wardService.getByDistrictCode(data.value.pmnDistrict);
                context.emit("set:formData", { pmnWards: wards });
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const setCrDistrict = async () => {
            try {
                progressCircular.setState(true);
                context.emit("set:formData", {
                    crWards: [],
                    crDistrict: "",
                    crWard: ""
                });
                const districts = await districtService.getByProvinceCode(data.value.crProvince);
                context.emit("set:formData", { crDistricts: districts });
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const setCrWard = async () => {
            try {
                progressCircular.setState(true);
                context.emit("set:formData", {
                    crWard: ""
                });
                const wards = await wardService.getByDistrictCode(data.value.crDistrict);
                context.emit("set:formData", { crWards: wards });
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const setFormData = () => {
            context.emit("set:formData", data.value);
        }
        return {
            data,
            setPmnDistrict, setPmnWard,
            setCrDistrict, setCrWard,
            setFormData,
        }
    }
});
</script>