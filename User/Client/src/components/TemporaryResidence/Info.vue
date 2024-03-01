<template>
    <div class="info-component">
        <div class="form-group">
            <input class="form-check-input" name="autoFill" type="checkbox" value="" id="autoFill" v-model="isCheck"
                @change="fillData">
            <label class="form-check-label" for="autoFill">
                Người khai báo là người thay đổi
            </label>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label>Họ và tên <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" name="name" class="form-control" v-model="data.name" type="text"
                    placeholder="Họ và tên" @change="setFormData" />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Ngày sinh <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" name="birthday" class="form-control" v-model="data.birthday" type="date"
                    @change="setFormData" />
                <ErrorMessage name="birthday" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Giới tính <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" name="gender" class="form-control" v-model="data.gender" as="select"
                    @change="setFormData">
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
                <Field :disabled="isAutoFill" name="cmndCccd" class="form-control" v-model="data.cmndCccd" type="text"
                    placeholder="Số ĐDCN(CCCD)/CMND" @change="setFormData" />
                <ErrorMessage name="cmndCccd" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Số điện thoại <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" name="phone" class="form-control" v-model="data.phone" type="text"
                    placeholder="Số điện thoại" @change="setFormData" />
                <ErrorMessage name="phone" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Email <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" name="email" class="form-control" v-model="data.email" type="email"
                    placeholder="Email" @change="setFormData" />
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
        <h6 class="font-weight-bold">Nơi thường trú</h6>
        <div class="form-row">
            <div class="form-group col">
                <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" class="form-control" name="pmnProvince" as="select"
                    v-model="pmnData.provinceCode" @change="setPmnDistrict">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in provinces" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="pmnProvince" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Quận/Huyện <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" class="form-control" name="pmnDistrict" as="select"
                    v-model="pmnData.districtCode" @change="setPmnWard">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in pmnData.districts" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="pmnDistrict" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Phường xã <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" class="form-control" name="pmnWard" as="select" v-model="pmnData.wardCode"
                    @change="setPermanentWardId">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in pmnData.wards" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="pmnWard" class="error-feedback" />
            </div>
            <div class="form-group col-12">
                <label>Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc) <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" name="pmnAddress" class="form-control" v-model="data.permanentAddress"
                    type="text" placeholder="Số nhà, đường, ấp, xóm, khóm, thôn, sóc" @change="setFormData" />
                <ErrorMessage name="pmnAddress" class="error-feedback" />
            </div>
        </div>
        <h6 class="font-weight-bold">Nơi ở hiện tại</h6>
        <div class="form-row">
            <div class="form-group col">
                <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" class="form-control" name="crProvince" as="select"
                    v-model="crData.provinceCode" @change="setCrDistrict">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in provinces" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="crProvince" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Quận/Huyện <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" class="form-control" name="crDistrict" as="select"
                    v-model="crData.districtCode" @change="setCrWard">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in crData.districts" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="crDistrict" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Phường/Xã <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" class="form-control" name="crWard" as="select" v-model="crData.wardCode"
                    @change="setCurrentWardId">
                    <option value="" hidden>--Chọn--</option>
                    <option :value="e.code" v-for="(e, i) in crData.wards" :key="i">
                        {{ e.fullName }}
                    </option>
                </Field>
                <ErrorMessage name="crWard" class="error-feedback" />
            </div>
            <div class="form-group col-12">
                <label>Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc) <span class="not-null">(*)</span></label>
                <Field :disabled="isAutoFill" name="crAddress" class="form-control" v-model="data.currentAddress"
                    type="text" placeholder="Số nhà, đường, ấp, xóm, khóm, thôn, sóc" @change="setFormData" />
                <ErrorMessage name="crAddress" class="error-feedback" />
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import { Field, ErrorMessage } from "vee-validate";
import districtService from "../../services/district.service";
import wardService from "../../services/ward.service";
import provinceService from "@/services/province.service";
import { usePropressCircular } from '../../stores/progressCircular';
export default defineComponent({
    components: {
        Field,
        ErrorMessage,
    },
    props: {
        formData: Object,
        provinces: { type: Array, default: [] },
    },
    emits: ["set:formData"],
    setup(props, context) {
        const data = ref(props.formData);
        const progressCircular = usePropressCircular();
        const pmnData = ref({
            districts: [],
            wards: [],
            wardCode: "",
            districtCode: "",
            provinceCode: "",
        });
        const setPmnDistrict = async () => {
            try {
                progressCircular.setState(true);
                pmnData.value.wardCode = "";
                pmnData.value.districtCode = "";
                context.emit("set:formData", { permanentWardId: "" });
                pmnData.value.districts = await districtService.getByProvinceCode(pmnData.value.provinceCode);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const setPmnWard = async () => {
            try {
                progressCircular.setState(true);
                pmnData.value.wardCode = "";
                context.emit("set:formData", { permanentWardId: "" });
                pmnData.value.wards = await wardService.getByDistrictCode(pmnData.value.districtCode);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const setPermanentWardId = () => {
            // console.log(pmnData.value.wardCode);
            context.emit("set:formData", {
                permanentWardId: pmnData.value.wardCode
            });
        }
        const crData = ref({
            districts: [],
            wards: [],
            wardCode: "",
            districtCode: "",
            provinceCode: "",
        });
        const setCrDistrict = async () => {
            try {
                progressCircular.setState(true);
                crData.value.wardCode = "";
                crData.value.districtCode = "";
                context.emit("set:formData", { currentWardId: "" });
                crData.value.districts = await districtService.getByProvinceCode(crData.value.provinceCode);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const setCrWard = async () => {
            try {
                progressCircular.setState(true);
                crData.value.wardCode = "";
                context.emit("set:formData", { currentWardId: "" });
                crData.value.wards = await wardService.getByDistrictCode(crData.value.districtCode);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const setCurrentWardId = () => {
            context.emit("set:formData", { currentWardId: crData.value.wardCode });
        }
        const setFormData = () => {
            context.emit("set:formData", data.value);
        }
        const isCheck = ref(false);
        const isAutoFill = ref(false);
        const fillData = async () => {
            try {
                if (isCheck.value) {
                    progressCircular.setState(true);
                    const temp1 = window.localStorage.getItem("address").split(",").reverse();
                    const province1 = await provinceService.getByFullName(temp1[0].trim());
                    pmnData.value.provinceCode = province1.code;
                    crData.value.provinceCode = province1.code;
                    pmnData.value.districts = await districtService.getByProvinceCode(province1.code);
                    crData.value.districts = pmnData.value.districts;
                    const district1 = pmnData.value.districts.find(e => e.fullName == temp1[1].trim());
                    pmnData.value.districtCode = district1.code;
                    crData.value.districtCode = district1.code;
                    pmnData.value.wards = await wardService.getByDistrictCode(district1.code);
                    crData.value.wards = pmnData.value.wards
                    const ward1 = pmnData.value.wards.find(e => e.fullName == temp1[2].trim());
                    pmnData.value.wardCode = ward1.code;
                    crData.value.wardCode = ward1.code;
                    data.value.permanentWardId = ward1.code;
                    data.value.currentWardId = ward1.code;
                    data.value.permanentAddress = temp1[3];
                    data.value.currentAddress = temp1[3];
                    data.value.name = window.localStorage.getItem("name");
                    const tempDate = new Date(window.localStorage.getItem("birthday"));
                    data.value.birthday = tempDate.toISOString().split('T')[0];
                    data.value.gender = window.localStorage.getItem("gender");
                    data.value.cmndCccd = window.localStorage.getItem("cccd");
                    data.value.phone = window.localStorage.getItem("phone");
                    data.value.email = window.localStorage.getItem("email");
                    isAutoFill.value = true
                } else {
                    data.value = {};
                    crData.value = {};
                    pmnData.value = {};
                    isAutoFill.value = false
                }
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        return {
            data,
            pmnData, setPmnDistrict, setPmnWard, setPermanentWardId,
            crData, setCrDistrict, setCrWard, setCurrentWardId, setFormData,
            isCheck, fillData, isAutoFill,
        }
    }
});
</script>