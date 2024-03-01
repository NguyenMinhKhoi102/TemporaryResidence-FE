<template>
    <div class=" temporary-residence-component">
        <h1 class="text-center title">ĐĂNG KÝ TẠM TRÚ</h1>
        <Form @submit="submitFrom" :validation-schema="formSchema">
            <v-list v-model:opened="opened">
                <v-list-group value="ImplementingAgencies">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">CƠ QUAN THỰC HIỆN
                        </v-list-item>
                    </template>
                    <ImplementingAgencies :formData="formData" @set:formData="setFormData" class="card-body"
                        :provinces="provinces">
                    </ImplementingAgencies>
                </v-list-group>
                <v-list-group value="AdministrativeProcedures">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">THỦ TỤC HÀNH CHÍNH YÊU CẦU
                        </v-list-item>
                    </template>
                    <AdministrativeProcedures :formData="formData" @set:formData="setFormData" class="card-body"
                        :typeProfiles="typeProfiles">
                    </AdministrativeProcedures>
                </v-list-group>
                <v-list-group value="Info">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">TỜ KHAI THAY ĐỔI THÔNG TIN CƯ TRÚ
                        </v-list-item>
                    </template>
                    <Info :formData="formData" @set:formData="setFormData" class="card-body" :provinces="provinces">
                    </Info>
                </v-list-group>
                <v-list-group value="TemporaryResidenceRegistration">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">THÔNG TIN ĐĂNG KÝ TẠM TRÚ
                        </v-list-item>
                    </template>

                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                            <Field name="province1" class="form-control" as="select" disabled>
                                <option value="" hidden>-- Chọn --</option>
                                <option v-for="(province, index) in provinces" :key="index" :value="province.code">
                                    {{ province.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="province1" class="error-feedback" />
                        </div>
                        <div class="form-group col">
                            <label>Quận/Huyện <span class="not-null">(*)</span></label>
                            <Field name="district1" class="form-control" as="select" disabled>
                                <option value="" hidden>-- Chọn --</option>
                                <option v-for="(district, index) in formData.districts" :key="index" :value="district.code">
                                    {{ district.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="district1" class="error-feedback" />
                        </div>
                        <div class="form-group col">
                            <label>Phường/Xã <span class="not-null">(*)</span></label>
                            <Field name="ward1" class="form-control" as="select" disabled>
                                <option value="" hidden>-- Chọn --</option>
                                <option v-for="(ward, index) in formData.wards" :key="index" :value="ward.code">
                                    {{ ward.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="ward1" class="error-feedback" />
                        </div>
                        <div class="form-group col-12">
                            <label for="">Địa chỉ(Số nhà, đường, áp, xóm, khóm, thôn, sóc) <span
                                    class="not-null">(*)</span></label>
                            <Field type="text" class="form-control" name="temporaryResidenceAddress"
                                placeholder="Số nhà, đường, áp, xóm, khóm, thôn, sóc" v-model="formData.temperaryAddress" />
                            <ErrorMessage name="temporaryResidenceAddress" class="error-feedback" />
                        </div>
                        <div class="form-group col-6">
                            <label for="">Tên chủ hộ <span class="not-null">(*)</span></label>
                            <Field type="text" class="form-control" name="hostName" placeholder="Quan hệ với chủ hộ"
                                v-model="formData.hostName" />
                            <ErrorMessage name="hostName" class="error-feedback" />
                        </div>
                        <div class="form-group col-6">
                            <label for="">Số ĐDCN(CCCD)/CMND chủ hộ <span class="not-null">(*)</span></label>
                            <Field type="text" class="form-control" name="cmndCccdHost" placeholder="Quan hệ với chủ hộ"
                                v-model="formData.cmndCccdHost" />
                            <ErrorMessage name="cmndCccdHost" class="error-feedback" />
                        </div>
                        <div class="form-group col-6">
                            <label for="">Quan hệ với chủ hộ <span class="not-null">(*)</span></label>
                            <Field type="text" class="form-control" name="relationshipHost" placeholder="Quan hệ với chủ hộ"
                                v-model="formData.relationshipHost" />
                            <ErrorMessage name="relationshipHost" class="error-feedback" />
                        </div>
                        <div class="form-group col-6">
                            <label for="">Quan hệ với người khai báo <span class="not-null">(*)</span></label>
                            <Field type="text" class="form-control" name="relationshipDeclarent"
                                placeholder="Quan hệ với người khai báo" v-model="formData.relationshipDeclarent" />
                            <ErrorMessage name="relationshipDeclarent" class="error-feedback" />
                        </div>
                    </div>
                    <div class="mb-4" v-if="formData.wardId && formData.wardId != ''">
                        <i>
                            Lưu ý <span class=" not-null">(*)</span>:
                            Người dân chọn vị trí nơi tạm trú trên bản đồ để lấy địa chỉ số
                        </i>
                    </div>
                    <div class="form-row m-0">

                        <div class="col">
                            <div v-if="formData.wardId && formData.wardId != ''">
                                <MapGetCoordinate :wardId="formData.wardId" @set:formData="setFormData">
                                </MapGetCoordinate>
                            </div>
                            <div v-else>
                                <div class="map-title text-center">
                                    Vui lòng chọn thông tin cơ quan thực hiện trước khi hiệu chỉnh địa chỉ số
                                </div>
                                <img class="img-fluid"
                                    src="https://i.pinimg.com/originals/2b/07/f6/2b07f62987e987d4e53e84aa8b963b83.gif"
                                    alt="">
                            </div>
                        </div>
                        <div class="form-group col">
                            <label for="">Vĩ độ tạm trú số<span class="not-null">(*)</span></label>
                            <Field type="text" class="form-control" name="temporaryLatitude" placeholder="Vĩ độ tạm trú số"
                                v-model="formData.temporaryLatitude" disabled />
                            <ErrorMessage name="temporaryLatitude" class="error-feedback" />
                            <label for="">Kinh độ tạm trú số <span class="not-null">(*)</span></label>
                            <Field type="text" class="form-control" name="temporaryLongitude"
                                placeholder="Kinh độ tạm trú số" v-model="formData.temporaryLongitude" disabled />
                            <ErrorMessage name="temporaryLongitude" class="error-feedback" />
                            <label for="">Địa chỉ tạm trú số <span class="not-null">(*)</span></label>
                            <Field type="text" class="form-control" name="temporaryDigitalAddress"
                                placeholder="Địa chỉ tạm trú số" v-model="formData.temporaryDigitalAddress" disabled />
                            <ErrorMessage name="temporaryDigitalAddress" class="error-feedback" />
                        </div>
                    </div>

                </v-list-group>
                <v-list-group value="MemberChangeTogether">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">THÀNH VIÊN CÙNG THAY ĐỔI
                        </v-list-item>
                    </template>
                    <MemberChangeTogether :formData="formData" @set:formData="setFormData" class="card-body"
                        :provinces="provinces" @delete:mems="deleteMem" @set:dialog="setDialog">
                    </MemberChangeTogether>
                </v-list-group>
                <v-list-group value="AttachedProfile">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">HỒ SƠ ĐÍNH KÈM
                        </v-list-item>
                    </template>
                    <AttachedProfile :receiveResult="receiveResult" :typeNotification="typeNotification"
                        :formData="formData" @set:formData="setFormData" class="card-body" :typeProfiles="typeProfiles">
                    </AttachedProfile>
                </v-list-group>
                <v-list-group value="ReceiveResult">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">HÌNH THỨC NHẬN KẾT QUẢ
                        </v-list-item>
                    </template>
                    <ReceiveResult :receiveResult="receiveResult" :typeNotification="typeNotification" :formData="formData"
                        @set:formData="setFormData" class="card-body" :typeProfiles="typeProfiles">
                    </ReceiveResult>
                </v-list-group>
            </v-list>
            <div>
                <input type="checkbox" name="" class="mb-5"> Tôi xin chịu trách nhiệm trước pháp luật về lời khai trên
            </div>
            <div class="form-group text-center">
                <button type="reset" class="btn btn-primary mr-2"><i class="fas fa-rotate-left"></i> Làm mới</button>
                <button type="submit" @click="setFormData({ isCopy: 1 })" class="btn btn-outline-primary mr-2"><i
                        class="fas fa-save"></i>
                    Lưu lại</button>
                <button @click="setFormData({ isCopy: 0 })" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Lưu
                    và
                    gửi</button>
            </div>
        </Form>
        <v-dialog v-model="dialog">
            <v-card class="m-5">
                <Form @submit="setMems" :validation-schema="dialogValidate">
                    <v-card class="px-5 py-4">
                        <h4 class="text-center mb-4">Thông tin thành viên cùng thay đổi</h4>
                        <div class="form-row">
                            <div class="form-group col">
                                <label>Họ và tên <span class="not-null">(*)</span></label>
                                <Field name="name" class="form-control" v-model="tempInfo.name" type="text"
                                    placeholder="Họ và tên">
                                </Field>
                                <ErrorMessage name="name" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Ngày sinh <span class="not-null">(*)</span></label>
                                <Field name="birthday" class="form-control" v-model="tempInfo.birthday" type="date">
                                </Field>
                                <ErrorMessage name="birthday" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Giới tính <span class="not-null">(*)</span></label>
                                <Field name="gender" class="form-control" v-model="tempInfo.gender" as="select">
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
                                <Field name="cmndCccd" class="form-control" v-model="tempInfo.cmndCccd" type="text"
                                    placeholder="Số ĐDCN(CCCD)/CMND">
                                </Field>
                                <ErrorMessage name="cmndCccd" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Số điện thoại <span class="not-null">(*)</span></label>
                                <Field name="phone" class="form-control" v-model="tempInfo.phone" type="text"
                                    placeholder="Số điện thoại">
                                </Field>
                                <ErrorMessage name="phone" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Email <span class="not-null">(*)</span></label>
                                <Field name="email" class="form-control" v-model="tempInfo.email" type="email"
                                    placeholder="Email">
                                </Field>
                                <ErrorMessage name="email" class="error-feedback" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col">
                                <label>Nghề nghiệp</label>
                                <Field name="job" class="form-control" v-model="tempInfo.job" type="text"
                                    placeholder="Nghề nghiệp">
                                </Field>
                                <ErrorMessage name="job" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Nơi làm việc</label>
                                <Field name="workspace" class="form-control" v-model="tempInfo.workspace" type="text"
                                    placeholder="Nơi làm việc">
                                </Field>
                                <ErrorMessage name="workspace" class="error-feedback" />
                            </div>

                        </div>
                        <div class="form-row m-0">
                            <div class="form-group col">
                                <label>Quan hệ với chủ hộ <span class="not-null">(*)</span></label>
                                <Field name="relationshipHost" class="form-control" v-model="tempInfo.relationshipHost"
                                    type="text" placeholder="Quan hệ với chủ hộ">
                                </Field>
                                <ErrorMessage name="relationshipHost" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Quan hệ với người thay đổi <span class="not-null">(*)</span></label>
                                <Field name="relationshipDeclarent" class="form-control"
                                    v-model="tempInfo.relationshipDeclarent" type="text"
                                    placeholder="Quan hệ với người thay đổi">
                                </Field>
                                <ErrorMessage name="relationshipDeclarent" class="error-feedback" />
                            </div>
                        </div>
                        <div class="form-row m-0">
                            <div class="form-group col">
                                <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                                <Field name="pmnProvince" class="form-control" as="select" v-model="pmnData.provinceCode"
                                    @change="setPmnDistrict" rules="required">
                                    <option value="" hidden>--Chọn--</option>
                                    <option :value="e.code" v-for="(e, i) in provinces">
                                        {{ e.fullName }}
                                    </option>
                                </Field>
                                <ErrorMessage name="pmnProvince" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Quận/Huyện <span class="not-null">(*)</span></label>
                                <Field name="pmnDistrict" class="form-control" as="select" v-model="pmnData.districtCode"
                                    @change="setPmnWard">
                                    <option value="" hidden>--Chọn--</option>
                                    <option :value="e.code" v-for="(e, i) in pmnData.districts">
                                        {{ e.fullName }}
                                    </option>
                                </Field>
                                <ErrorMessage name="pmnDistrict" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Phường/Xã <span class="not-null">(*)</span></label>
                                <Field name="pmnWard" class="form-control" as="select" v-model="tempInfo.permanentWardId">
                                    <option value="" hidden>--Chọn--</option>
                                    <option :value="e.code" v-for="(e, i) in pmnData.wards">
                                        {{ e.fullName }}
                                    </option>
                                </Field>
                                <ErrorMessage name="pmnWard" class="error-feedback" />
                            </div>
                            <div class="form-group col-12">
                                <label>Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc) <span
                                        class="not-null">(*)</span></label>
                                <Field name="pmnAddress" class="form-control" v-model="tempInfo.permanentAddress"
                                    placeholder="Số nhà, đường, ấp, xóm, khóm, thôn, sóc" />
                                <ErrorMessage name="pmnAddress" class="error-feedback" />
                            </div>
                        </div>
                        <div class="form-row m-0">
                            <div class="form-group col">
                                <label>Tỉnh/Thành phố <span class="not-null">(*)</span></label>
                                <Field name="crProvince" class="form-control" as="select" v-model="crData.provinceCode"
                                    @change="setCrDistrict">
                                    <option value="" hidden>--Chọn--</option>
                                    <option :value="e.code" v-for="(e, i) in provinces">
                                        {{ e.fullName }}
                                    </option>
                                </Field>
                                <ErrorMessage name="crProvince" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Quận/Huyện <span class="not-null">(*)</span></label>
                                <Field name="crDistrict" class="form-control" as="select" v-model="crData.districtCode"
                                    @change="setCrWard">
                                    <option value="" hidden>--Chọn--</option>
                                    <option :value="e.code" v-for="(e, i) in crData.districts">
                                        {{ e.fullName }}
                                    </option>
                                </Field>
                                <ErrorMessage name="crDistrict" class="error-feedback" />
                            </div>
                            <div class="form-group col">
                                <label>Phường/Xã <span class="not-null">(*)</span></label>
                                <Field name="crWard" class="form-control" as="select" v-model="tempInfo.currentWardId">
                                    <option value="" hidden>--Chọn--</option>
                                    <option :value="e.code" v-for="(e, i) in crData.wards">
                                        {{ e.fullName }}
                                    </option>
                                </Field>
                                <ErrorMessage name="crWard" class="error-feedback" />
                            </div>
                            <div class="form-group col-12">
                                <label>Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc) <span
                                        class="not-null">(*)</span></label>
                                <Field name="crAddress" class="form-control" v-model="tempInfo.currentAddress"
                                    placeholder="Số nhà, đường, ấp, xóm, khóm, thôn, sóc" />
                                <ErrorMessage name="crAddress" class="error-feedback" />
                            </div>
                        </div>
                        <div class="text-right">
                            <button class="btn btn-primary px-3">
                                <i class="fa fa-save mr-2"></i>
                                Thêm
                            </button>
                            <div class="btn btn-danger px-4 ml-2" @click="setDialog(false)">Huỷ
                                bỏ</div>
                        </div>
                    </v-card>
                </Form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import districtService from '@/services/district.service';
import wardService from '@/services/ward.service';
import { usePropressCircular } from '../../stores/progressCircular';
import ImplementingAgencies from './implementingAgencies.vue';
import AdministrativeProcedures from './AdministrativeProcedures.vue';
import MemberChangeTogether from "./memberchangetogether.vue";
import ReceiveResult from './ReceiveResult.vue';
import Info from './Info.vue';
import AttachedProfile from './AttachedProfile.vue';
import MapGetCoordinate from '../Map/MapGetCoordinate.vue';
import { VList, VListItem, VListGroup, VDialog, VCard, } from "vuetify/lib/components/index.mjs";
import generalProfileService from "../../services/generalProfile.service";
import attachedProfileService from "../../services/attachedProfile.service";
import memberChangeTogetherService from "../../services/memberChangeTogether.service";
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import userService from "../../services/user.service";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
        ImplementingAgencies,
        AdministrativeProcedures,
        Info,
        MemberChangeTogether,
        ReceiveResult,
        AttachedProfile,
        VList, VListItem, VListGroup,
        MapGetCoordinate,
        VDialog, VCard,
    },
    props: {
        provinces: { type: Array, default: [] },
        typeProfiles: { type: Array, default: [] },
        typeNotification: { type: Array, default: [] },
        receiveResult: { type: Array, default: [] },
    },
    setup(props, context) {
        const propressCircular = usePropressCircular();
        const opened = ref(["ImplementingAgencies", "AdministrativeProcedures", "Info", "MemberChangeTogether", "ReceiveResult", "AttachedProfile", "TemporaryResidenceRegistration"]);
        const formData = reactive({
            "wards": [],
            "districts": [],
            "wardId": "",
            "isCopy": "",
            "name": "",
            "birthday": "",
            "cmndCccd": "",
            "gender": "",
            "phone": "",
            "email": "",
            "permanentAddress": "",
            "permanentWardId": "",
            "currentAddress": "",
            "currentWardId": "",
            "job": "",
            "workspace": "",
            "temperaryAddress": "",
            "temporaryResidenceExpiration": "",
            "temporaryDigitalAddress": "",
            "temporaryLatitude": "",
            "temporaryLongitude": "",
            "hostName": "",
            "cmndCccdHost": "",
            "relationshipHost": "",
            "relationshipDeclarent": "",
            "noteDeclarent": "",
            "typeProfileId": "",
            "caseProfile": "",
            "receiveResultId": "",
            "typeNotificationId": "",
            "memberChangeTogethers": [],
            "attachProfiles": [],
        });
        const setFormData = (data) => {
            formData.districts = data.districts ?? formData.districts;
            formData.wards = data.wards ?? formData.wards;
            formData.wardId = data.wardId ?? formData.wardId;
            formData.isCopy = data.isCopy ?? formData.isCopy;
            formData.name = data.name ?? formData.name;
            formData.birthday = data.birthday ?? formData.birthday;
            formData.cmndCccd = data.cmndCccd ?? formData.cmndCccd;
            formData.gender = data.gender ?? formData.gender;
            formData.phone = data.phone ?? formData.phone;
            formData.email = data.email ?? formData.email;
            formData.permanentAddress = data.permanentAddress ?? formData.permanentAddress;
            formData.permanentWardId = data.permanentWardId ?? formData.permanentWardId;
            formData.currentAddress = data.currentAddress ?? formData.currentAddress;
            formData.currentWardId = data.currentWardId ?? formData.currentWardId;
            formData.job = data.job ?? formData.job;
            formData.workspace = data.workspace ?? formData.workspace;
            formData.temperaryAddress = data.temperaryAddress ?? formData.temperaryAddress;
            formData.temporaryResidenceExpiration = data.temporaryResidenceExpiration ?? formData.temporaryResidenceExpiration;
            formData.temporaryDigitalAddress = data.temporaryDigitalAddress ?? formData.temporaryDigitalAddress;
            formData.temporaryLatitude = data.temporaryLatitude ?? formData.temporaryLatitude;
            formData.temporaryLongitude = data.temporaryLongitude ?? formData.temporaryLongitude;
            formData.hostName = data.hostName ?? formData.hostName;
            formData.cmndCccdHost = data.cmndCccdHost ?? formData.cmndCccdHost;
            formData.relationshipHost = data.relationshipHost ?? formData.relationshipHost;
            formData.relationshipDeclarent = data.relationshipDeclarent ?? formData.relationshipDeclarent;
            formData.noteDeclarent = data.noteDeclarent ?? formData.noteDeclarent;
            formData.typeProfileId = data.typeProfileId ?? formData.typeProfileId;
            formData.caseProfile = data.caseProfile ?? formData.caseProfile;
            formData.receiveResultId = data.receiveResultId ?? formData.receiveResultId;
            formData.typeNotificationId = data.typeNotificationId ?? formData.typeNotificationId;
            formData.memberChangeTogethers = data.memberChangeTogethers ?? formData.memberChangeTogethers;
            formData.attachProfiles = data.attachProfiles ?? formData.attachProfiles;
            console.log(formData);
        }
        const formSchema = yup.object().shape({
            province1: yup.string().required("Tỉnh/Thành phố không được để trống."),
            district1: yup.string().required("Quận/Huyện không được để trống."),
            ward1: yup.string().required("Xã/Phường không được để trống."),
            organ: yup.string().required("Cơ quan thực hiện không được để trống."),
            typeProfile: yup.string().required("Thủ tục không thể trống."),
            caseProfile: yup.string().required("Hình thức không được để trống."),
            temporaryResidenceExpiration: yup.string().required("Ngày hết hạn tạm trú không được để trống.").test('is-future-date', 'Tối thiểu sau hiện tại 30 ngày và tối đa 2 năm',
                (value) => {
                    const currentDate = new Date();
                    const expirationDate = new Date(value);
                    if (expirationDate <= currentDate) {
                        return false;
                    }
                    const minExpirationDate = new Date(currentDate);
                    minExpirationDate.setDate(currentDate.getDate() + 30);
                    const maxExpirationDate = new Date(currentDate);
                    maxExpirationDate.setFullYear(currentDate.getFullYear() + 2);
                    return expirationDate >= minExpirationDate && expirationDate <= maxExpirationDate;
                }),
            name: yup.string().required("Tên không được để trống."),
            birthday: yup.string().required("Ngày sinh không thể trống")
                .test('is-minimum-age', 'Công dân phải từ 18 tuổi trở lên', (value) => {
                    const birthDate = new Date(value);
                    const age = new Date().getFullYear() - birthDate.getFullYear();
                    return age >= 18;
                }),
            gender: yup.string().required("Giới tính không được để trống."),
            cmndCccd: yup.string().required("Số ĐDCN(CCCD)/CMND không thể trống")
                .test("is-valid-length", "Số ĐDCN(CCCD)/CMND phải là 9 hoặc 12 ký tự", (value) => {
                    const length = value.length;
                    return length === 9 || length === 12;
                }),
            phone: yup.string().required("Số điện thoại không được để trống.")
                .min(10, "Số điện thoại phải là 10 ký tự")
                .max(10, "Số điện thoại phải là 10 ký tự"),
            email: yup.string().required("Email không được để trống.")
                .email("Email không đúng định dạng"),
            pmnProvince: yup.string().required("Tỉnh/thành phố không được để trống."),
            pmnDistrict: yup.string().required("Quận/Huyện không được để trống."),
            pmnWard: yup.string().required("Phường/Xã không được để trống."),
            pmnAddress: yup.string().required("Địa chỉ không được để trống."),
            temporaryResidenceAddress: yup.string().required("Địa chỉ không được để trống."),
            hostName: yup.string().required("Tên chủ hộ không được để trống."),
            cmndCccdHost: yup.string().required("Số ĐDCN(CCCD)/CMND không thể trống")
                .test("is-valid-length", "Số ĐDCN(CCCD)/CMND phải là 9 hoặc 12 ký tự", (value) => {
                    const length = value.length;
                    return length === 9 || length === 12;
                }),
            relationshipDeclarent: yup.string().required("Quan hệ với người khai báo không được để trống."),
            relationshipHost: yup.string().required("Quan hệ với chủ hộ không được để trống."),
            temporaryLatitude: yup.string().required("Vĩ độ tạm trú không được để trống."),
            temporaryLongitude: yup.string().required("Kinh độ tạm trú không được để trống."),
            temporaryDigitalAddress: yup.string().required("Địa chỉ số không được để trống."),
            typeNotification: yup.string().required("Loại thông báo không được để trống."),
            receiveResult: yup.string().required("Hình thức nhận kết quả không được để trống."),
            crProvince: yup.string().required("Tỉnh/thành phố không được để trống."),
            crDistrict: yup.string().required("Quận/Huyện không được để trống."),
            crWard: yup.string().required("Phường/Xã không được để trống."),
            crAddress: yup.string().required("Địa chỉ không được để trống."),
        });
        const attachedFileSchema = yup.object().shape({
            file: yup.string().required("Chưa có đủ hồ sơ đính kèm."),
        });
        const router = useRouter()
        const submitFrom = async () => {
            try {
                propressCircular.setState(true);
                const tempData = formData;
                for (const item of tempData.attachProfiles) {
                    await attachedFileSchema.validate(item, { abortEarly: false });
                }
                if (await checkUser(tempData)) {
                    const rs1 = await wardService.getByCode(tempData.permanentWardId);
                    tempData.permanentAddress = tempData.permanentAddress + "," + rs1.fullName + "," + rs1.district.fullName + "," + rs1.district.province.fullName;
                    if (tempData.currentWardId != "") {
                        const rs2 = await wardService.getByCode(tempData.currentWardId);
                        tempData.currentAddress = tempData.currentAddress + "," + rs2.fullName + "," + rs2.district.fullName + "," + rs2.district.province.fullName;
                    }
                    const rs4 = await wardService.getByCode(tempData.wardId);
                    tempData.temperaryAddress = tempData.temperaryAddress + "," + rs4.fullName + "," + rs4.district.fullName + "," + rs4.district.province.fullName;
                    const rs3 = await generalProfileService.add({
                        wardId: tempData.wardId,
                        isCopy: tempData.isCopy,
                        name: tempData.name,
                        birthday: tempData.birthday,
                        cmndCccd: tempData.cmndCccd,
                        gender: tempData.gender,
                        phone: tempData.phone,
                        email: tempData.email,
                        permanentAddress: tempData.permanentAddress,
                        currentAddress: tempData.currentAddress,
                        job: tempData.job,
                        workspace: tempData.workspace,
                        temperaryAddress: tempData.temperaryAddress,
                        temporaryResidenceExpiration: tempData.temporaryResidenceExpiration,
                        temporaryDigitalAddress: tempData.temporaryDigitalAddress,
                        temporaryLatitude: tempData.temporaryLatitude,
                        temporaryLongitude: tempData.temporaryLongitude,
                        hostName: tempData.hostName,
                        cmndCccdHost: tempData.cmndCccdHost,
                        relationshipHost: tempData.relationshipHost,
                        relationshipDeclarent: tempData.relationshipDeclarent,
                        noteDeclarent: tempData.noteDeclarent,
                        typeProfileId: tempData.typeProfileId,
                        caseProfile: tempData.caseProfile,
                        receiveResultId: tempData.receiveResultId,
                        typeNotificationId: tempData.typeNotificationId,
                    });
                    for (const item of tempData.attachProfiles) {
                        const tempFormData = new FormData();
                        tempFormData.append("name", item.name);
                        tempFormData.append("note", item.note);
                        tempFormData.append("file", item.file);
                        tempFormData.append("isCopy", item.isCopy);
                        tempFormData.append("generalProfileId", rs3.id);
                        await attachedProfileService.add(tempFormData);
                    }
                    for (const item of tempData.memberChangeTogethers) {
                        await memberChangeTogetherService.add({
                            name: item.name,
                            birthday: item.birthday,
                            cmndCccd: item.cmndCccd,
                            gender: item.gender,
                            phone: item.phone,
                            email: item.email,
                            permanentAddress: item.permanentAddress,
                            currentAddress: item.currentAddress,
                            job: item.job,
                            workspace: item.workspace,
                            relationshipHost: item.relationshipHost,
                            relationshipDeclarent: item.relationshipDeclarent,
                            generalProfileId: rs3.id,
                        });
                    }
                    toast.success("Đăng ký tạm trú thành công", {
                        autoClose: 1000,
                    });
                    // router.push({ path: "/history" });
                } else {
                    toast.error("Thông tin người dân không có trong cơ sở dữ liệu dân cư", {
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.log(error);
                if (error?.errors)
                    toast.error(error.errors[0], {
                        autoClose: 2000,
                    });
                else
                    toast.error("Đăng ký tạm trú thất bại", {
                        autoClose: 2000,
                    });
            } finally {
                propressCircular.setState(false);
            }
        }
        const dialog = ref(false);
        const setDialog = (status) => {
            dialog.value = status;
            tempInfo.value.name = "";
            tempInfo.value.birthday = "";
            tempInfo.value.cmndCccd = "";
            tempInfo.value.gender = "";
            tempInfo.value.email = "";
            tempInfo.value.phone = "";
            tempInfo.value.job = "";
            tempInfo.value.workspace = "";
            tempInfo.value.permanentAddress = "";
            tempInfo.value.permanentWardId = "";
            tempInfo.value.currentAddress = "";
            tempInfo.value.currentWardId = "";
            tempInfo.value.relationshipDeclarent = "";
            tempInfo.value.relationshipHost = "";
            pmnData.value.districtCode = "";
            pmnData.value.provinceCode = "";
            pmnData.value.districts = [];
            pmnData.value.wards = [];
            crData.value.districtCode = "";
            crData.value.provinceCode = "";
            crData.value.districts = [];
            crData.value.wards = [];
        }
        const dialogValidate = yup.object().shape({
            name: yup.string().required("Tên không được trống"),
            birthday: yup.string().required("Ngày sinh không thể trống")
                .test('is-minimum-age', 'Công dân phải từ 14 tuổi trở lên', (value) => {
                    const birthDate = new Date(value);
                    const age = new Date().getFullYear() - birthDate.getFullYear();
                    return age >= 14;
                }),
            gender: yup.string().required("Giới tính không thể trống"),
            cmndCccd: yup.string().required("Số ĐDCN(CCCD)/CMND không thể trống")
                .test("is-valid-length", "Số ĐDCN(CCCD)/CMND phải là 9 hoặc 12 ký tự", (value) => {
                    const length = value.length;
                    return length === 9 || length === 12;
                }),
            phone: yup.string().required("Số điện thoại không thể trống").min(10, "Số điện thoại phải là 10 ký tự").max(10, "Số điện thoại phải là 10 ký tự"),
            email: yup.string().required("Email không thể trống").email("Email không đúng định dạng"),
            relationshipHost: yup.string().required("Quan hệ với chủ hộ không được trống"),
            relationshipDeclarent: yup.string().required("Tên không được trống"),
            pmnProvince: yup.string().required("Tỉnh/Thành phố không được trống"),
            pmnDistrict: yup.string().required("Quận/Huyện không được trống"),
            pmnWard: yup.string().required("Phường/Xã không được trống"),
            pmnAddress: yup.string().required("Địa chỉ không được trống"),
            crProvince: yup.string().required("Tỉnh/thành phố không được để trống."),
            crDistrict: yup.string().required("Quận/Huyện không được để trống."),
            crWard: yup.string().required("Phường/Xã không được để trống."),
            crAddress: yup.string().required("Địa chỉ không được để trống."),
        });
        const setMems = async () => {
            try {
                let tempData = tempInfo.value;
                if (await checkUser(tempData)) {
                    propressCircular.setState(true);
                    const rs1 = await wardService.getByCode(tempData.permanentWardId);
                    tempData.permanentAddress = tempData.permanentAddress + "," + rs1.fullName + "," + rs1.district.fullName + "," + rs1.district.province.fullName;
                    if (tempData.currentWardId != "") {
                        const rs2 = await wardService.getByCode(tempData.currentWardId);
                        tempData.currentAddress = tempData.currentAddress + "," + rs2.fullName + "," + rs2.district.fullName + "," + rs2.district.province.fullName;
                    }
                    formData.memberChangeTogethers.push(tempData);
                    dialog.value = false;
                } else {
                    toast.error("Thông tin người dân không có trong cơ sở dữ liệu dân cư", {
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                propressCircular.setState(false);
            }
        }
        const deleteMem = (index) => {
            formData.memberChangeTogethers.splice(index, 1);
        }
        const tempInfo = ref({
            name: "",
            birthday: "",
            cmndCccd: "",
            gender: "",
            email: "",
            phone: "",
            job: "",
            workspace: "",
            permanentAddress: "",
            permanentWardId: "",
            currentAddress: "",
            currentWardId: "",
            relationshipDeclarent: "",
            relationshipHost: "",
        });
        const pmnData = ref({
            districts: [],
            wards: [],
            districtCode: "",
            provinceCode: "",
        });
        const setPmnDistrict = async () => {
            try {
                propressCircular.setState(true);
                tempInfo.value.permanentWardId = "";
                pmnData.value.districtCode = "";
                pmnData.value.districts = await districtService.getByProvinceCode(pmnData.value.provinceCode);
            } catch (error) {
                console.log(error);
            } finally {
                propressCircular.setState(false);
            }
        }
        const setPmnWard = async () => {
            try {
                propressCircular.setState(true);
                tempInfo.value.permanentWardId = "";
                pmnData.value.wards = await wardService.getByDistrictCode(pmnData.value.districtCode);
            } catch (error) {
                console.log(error);
            } finally {
                propressCircular.setState(false);
            }
        }
        const crData = ref({
            districts: [],
            wards: [],
            districtCode: "",
            provinceCode: "",
        });
        const setCrDistrict = async () => {
            try {
                propressCircular.setState(true);
                tempInfo.value.currentWardId = "";
                crData.value.districtCode = "";
                crData.value.districts = await districtService.getByProvinceCode(crData.value.provinceCode);
            } catch (error) {
                console.log(error);
            } finally {
                propressCircular.setState(false);
            }
        }
        const setCrWard = async () => {
            try {
                propressCircular.setState(true);
                tempInfo.value.currentWardId = "";
                crData.value.wards = await wardService.getByDistrictCode(crData.value.districtCode);
            } catch (error) {
                console.log(error);
            } finally {
                propressCircular.setState(false);
            }
        }
        const checkUser = async (data) => {
            try {
                propressCircular.setState(true);
                const temp = await userService.getAll();
                console.log(temp);
                const filterTemp = temp.filter(e => {
                    const a = new Date(e.birthday);
                    const b = new Date(data.birthday);
                    console.log(a.toISOString().split('T')[0] == b.toISOString().split('T')[0])
                    return e.name == data.name &&
                        e.username == data.cmndCccd &&
                        e.gender == data.gender &&
                        a.toISOString().split('T')[0] == b.toISOString().split('T')[0]
                });
                if (filterTemp.length == 0)
                    return false;
                return true;
            } catch (error) {
                console.log(error);
            } finally {
                propressCircular.setState(false);
            }
        }
        return {
            opened,
            formSchema,
            formData,
            setFormData,
            submitFrom,
            dialog, setDialog,
            dialogValidate,
            tempInfo, setMems, deleteMem,
            pmnData, setPmnDistrict, setPmnWard,
            crData, setCrDistrict, setCrWard,
            checkUser,
        }
    }
});
</script>
<style>
@import "@/assets/css/form.css";

.temporary-residence-component {
    padding-inline: 100px;

    .title {
        font-size: 25px;
        font-weight: bold;
    }

    .v-list-item {
        border-bottom: 3px solid green;
        border-radius: 5px 5px 0 0;
        font-weight: 600;
        font-size: 18px;
    }

    .v-list-group {
        margin-bottom: 10px;
    }

    .map-title {
        position: absolute;
        width: 50%;
        font-size: 16px;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: bold;
    }
}
</style>