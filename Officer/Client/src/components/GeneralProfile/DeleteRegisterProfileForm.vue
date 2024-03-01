<template>
    <div class="general-profile-component mb-5">
        <div class="row m-0 my-3 justify-content-between align-center">
            <h2 class="title">HỒ SƠ XOÁ ĐĂNG KÝ TẠM TRÚ</h2>
            <div v-if="generalProfile.status == 0">
                <button class="btn btn-primary mr-2" @click="accepted">Duyệt hồ sơ</button>
                <button class="btn btn-danger" @click="setDialog(true)">Từ chối hồ sơ</button>
            </div>
        </div>
        <div class="bg-white">
            <v-breadcrumbs :items="items">
                <template v-slot:title="{ item }">
                    {{ item.title.toUpperCase() }}
                </template>
            </v-breadcrumbs>
        </div>
        <v-tabs v-model="tab">
            <v-tab value="tab-1">
                Thông tin chung
            </v-tab>
            <v-tab value="tab-4">
                Hồ sơ đính kèm
            </v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item value="tab-1">
                <Form @submit="submitGeneralForm" :validation-schema="generalFormSchema">
                    <h6 class="title-2">Cơ quan quản lý</h6>
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label>Tỉnh/Thành phố <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" class="form-control" as="select" name="province"
                                v-model="generalData.provinceId" @change="setDistrict">
                                <option value="" hidden>-- Chọn --</option>
                                <option :value="e.code" v-for="(e, i) in provinceData.province" :key="i">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="province" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Quận/Huyện <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" class="form-control" as="select" name="district"
                                v-model="generalData.districtId" @change="setWard">
                                <option value="" hidden>-- Chọn --</option>
                                <option :value="e.code" v-for="(e, i) in provinceData.district" :key="i">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="district" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Phường xã <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" class="form-control" as="select" name="ward"
                                v-model="generalData.wardId" @change="setOrgan">
                                <option value="" hidden>-- Chọn --</option>
                                <option :value="e.code" v-for="(e, i) in provinceData.ward" :key="i">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="ward" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col-12">
                            <label>Cơ quan quản lý <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field class="form-control" name="organ" v-model="organ" placeholder="Cơ quan quản lý"
                                disabled />
                            <ErrorMessage name="organ" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <h6 class="title-2">Thủ tục hành chính</h6>
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label>Thủ tục <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field disabled class="form-control" name="typeProfileG" as="select"
                                v-model="generalData.typeProfileId">
                                <option value="" hidden>--Chọn--</option>
                                <option value="1">
                                    Đăng ký tạm trú
                                </option>
                                <option value="2">
                                    Gia hạn tạm trú
                                </option>
                                <option value="3">
                                    Xoá đăng ký tạm trú
                                </option>
                            </Field>
                            <ErrorMessage name="typeProfileG" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Trường hợp <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" class="form-control" name="caseProfileG" as="select"
                                v-model="generalData.caseProfile">
                                <option value="" hidden>--Chọn--</option>
                                <option value="Nhân khẩu do mất tích">Nhân khẩu do mất tích</option>
                            </Field>
                            <ErrorMessage name="caseProfileG" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col-12">
                            <label>Ý kiến của người khai báo</label>
                            <Field :disabled="statusForm" type="text" class="form-control" placeholder="Số điện thoại"
                                name="noteDeclarentG" v-model="generalData.noteDeclarent" />
                            <ErrorMessage name="noteDeclarentG" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <h6 class="title-2">Thông tin người dân</h6>
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label>Họ và tên <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" type="text" class="form-control" name="nameG"
                                placeholder="Họ và tên" v-model="generalData.name" />
                            <ErrorMessage name="nameG" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Ngày sinh <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" type="date" class="form-control" name="birthdayG"
                                v-model="generalData.birthday" />
                            <ErrorMessage name="birthdayG" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Giới tính <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" class="form-control" name="genderG" as="select"
                                v-model="generalData.gender">
                                <option value="" hidden>--Chọn--</option>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </Field>
                            <ErrorMessage name="genderG" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label>Số ĐDCN(CCCD)/CMND <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" type="text" class="form-control" name="cmndCccdG"
                                placeholder="Số ĐDCN(CCCD)/CMND" v-model="generalData.cmndCccd" />
                            <ErrorMessage name="cmndCccdG" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Số điện thoại <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" type="text" class="form-control" placeholder="Số điện thoại"
                                name="phoneG" v-model="generalData.phone" />
                            <ErrorMessage name="phoneG" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Email <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" type="email" class="form-control" name="emailG"
                                placeholder="Email" v-model="generalData.email" />
                            <ErrorMessage name="emailG" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label>Nghề nghiệp</label>
                            <Field :disabled="statusForm" type="text" class="form-control" name="jobG"
                                placeholder="Nghề nghiệp" v-model="generalData.job" />
                        </div>
                        <div class="form-group col">
                            <label>Nơi làm việc</label>
                            <Field :disabled="statusForm" type="text" class="form-control" name="wordspaceG"
                                placeholder="Nơi làm việc" v-model="generalData.workspace" />
                        </div>
                    </div>
                    <div class="form-row m-0">
                        <h6 class="col-12">Nơi thường trú <span class="text-danger font-weight-bold">(*)</span></h6>
                        <div class="form-group col">
                            <label>Tỉnh/Thành phố <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" as="select" class="form-control" name="permanentProvince"
                                v-model="permanentProvinceData.province" @change="setPermanentDistrict">
                                <option value="" hidden>--Chọn--</option>
                                <option :value="e.code" :key="i" v-for="(e, i) in permanentProvinceData.provinces">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="permanentProvince" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Quận/Huyện <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" as="select" class="form-control" name="permanentDistrict"
                                v-model="permanentProvinceData.district" @change="setPermanentWard">
                                <option value="" hidden>--Chọn--</option>
                                <option :value="e.code" :key="i" v-for="(e, i) in permanentProvinceData.districts">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="permanentDistrict" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Phường/Xã <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field :disabled="statusForm" as="select" class="form-control" name="permanentWard"
                                v-model="permanentProvinceData.ward">
                                <option value="" hidden>--Chọn--</option>
                                <option :value="e.code" :key="i" v-for="(e, i) in permanentProvinceData.wards">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="permanentWard" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <div class="form-row m-0">
                        <h6 class="col-12">Nơi ở hiện tại</h6>
                        <div class="form-group col">
                            <label>Tỉnh/Thành phố </label>
                            <Field :disabled="statusForm" as="select" class="form-control" name="currentProvince"
                                v-model="currentProvinceData.province" @change="setCurrentDistrict">
                                <option value="" hidden>--Chọn--</option>
                                <option :value="e.code" :key="i" v-for="(e, i) in currentProvinceData.provinces">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="currentProvince" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Quận/Huyện </label>
                            <Field :disabled="statusForm" as="select" class="form-control" name="currentDistrict"
                                v-model="currentProvinceData.district" @change="setCurrentWard">
                                <option value="" hidden>--Chọn--</option>
                                <option :value="e.code" :key="i" v-for="(e, i) in currentProvinceData.districts">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="currentDistrict" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Phường/Xã </label>
                            <Field :disabled="statusForm" as="select" class="form-control" name="currentWard"
                                v-model="currentProvinceData.ward">
                                <option value="" hidden>--Chọn--</option>
                                <option :value="e.code" :key="i" v-for="(e, i) in currentProvinceData.wards">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="currentWard" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <div class="form-row m-0">
                        <h6 class="col-12">Nơi tạm trú <span class="text-danger font-weight-bold">(*)</span></h6>
                        <div class="form-group col">
                            <label>Tỉnh/Thành phố <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field disabled class="form-control" as="select" name="province"
                                v-model="generalData.provinceId" @change="setDistrict">
                                <option value="" hidden>-- Chọn --</option>
                                <option :value="e.code" v-for="(e, i) in provinceData.province" :key="i">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="province" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Quận/Huyện <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field disabled class="form-control" as="select" name="district"
                                v-model="generalData.districtId" @change="setWard">
                                <option value="" hidden>-- Chọn --</option>
                                <option :value="e.code" v-for="(e, i) in provinceData.district" :key="i">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="district" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>Phường xã <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field disabled class="form-control" as="select" name="ward" v-model="generalData.wardId"
                                @change="setOrgan">
                                <option value="" hidden>-- Chọn --</option>
                                <option :value="e.code" v-for="(e, i) in provinceData.ward" :key="i">
                                    {{ e.fullName }}
                                </option>
                            </Field>
                            <ErrorMessage name="ward" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <div class="text-center mb-4" v-if="statusForm">
                        <button type="button" class="btn btn-primary mr-2">Trở về</button>
                        <button type="button" class="btn btn-outline-primary" @click="setStatusForm(false)"><i
                                class="fas fa-pencil"></i> Chỉnh
                            sửa</button>
                    </div>
                    <div class="text-center mb-4" v-else>
                        <button type="button" class="btn btn-primary mr-2" @click="setStatusForm(true)"><i
                                class="fas fa-lock"></i> Khoá</button>
                        <button type="reset" class="btn btn-outline-primary mr-2">Làm mới</button>
                        <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
                    </div>
                </Form>
            </v-window-item>
            <v-window-item value="tab-4">
                <h6 class="title-2">Thông tin hồ sơ đính kèm</h6>
                <Form @submit="attachedProfileSubmit" :validation-schema="attachedProfileValidate">
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label>Tên hồ sơ đính kèm <span class="text-danger font-weight-bold">(*)</span></label>
                            <Field placeholder="Tên hồ sơ đính kèm" type="text" class="form-control" name="nameApr"
                                v-model="attachedProfileData.name" />
                            <ErrorMessage name="nameApr" class="text-danger"></ErrorMessage>
                        </div>
                        <div class="form-group col">
                            <label>
                                Hình thức
                                <span class="text-danger font-weight-bold">(*)</span>
                            </label>
                            <Field class="form-control" as="select" name="isCopyApr" v-model="attachedProfileData.isCopy">
                                <option value="1">Bản sao</option>
                                <option value="0">Bản chính</option>
                                <option value="2">Bản chụp</option>
                            </Field>
                            <ErrorMessage name="isCopyApr" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <div class="form-row m-0">
                        <div class="form-group col">
                            <label>Ghi chú</label>
                            <textarea class="form-control" rows="3" v-model="attachedProfileData.note"
                                placeholder="Ghi chú"></textarea>
                        </div>
                        <div class="form-group col">
                            <label>Hồ sơ đính kèm</label>
                            <input type="file" name="file" class="form-control-file" @change="onFileChange">
                            <ErrorMessage name="file" class="text-danger"></ErrorMessage>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary mr-2">Tải lên</button>
                        <button type="reset" class="btn btn-outline-primary">Làm mới</button>
                    </div>
                </Form>

                <h6 class="title-2">Danh sách hồ sơ đính kèm</h6>
                <v-data-table :items-per-page="5" :headers="headers" :items="data">
                    <template v-slot:item.index="{ item }">
                        {{ item.index + 1 }}
                    </template>
                    <template v-slot:item.isCopy="{ item }">
                        <div v-if="item.raw.isCopy == 0">Bản chính</div>
                        <div v-else-if="item.raw.isCopy == 1">Bản sao</div>
                        <div v-else>Bản chụp</div>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <button class="btn btn-warning mr-2 py-0" @click="getAttachFile(item.raw.path)">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-danger py-0" @click="deleteItem(item)">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </template>
                </v-data-table>
            </v-window-item>
        </v-window>
        <v-dialog v-model="dialog">
            <v-card width="500px" class="m-auto py-4 px-4">
                <h4 class="text-center">Từ chối tiếp nhận, giải quyết hồ sơ</h4>
                <Form @submit="denied" :validation-schema="dialogValidation">
                    <div class="form-group">
                        <label for="">Lý do <span class="text-danger font-weight-bold">(*)</span></label>
                        <Field class="form-control" as="textarea" name="reason" v-model="dataDenied.reason"
                            placeholder="Lý do" col="2"></Field>
                        <ErrorMessage class="text-danger" name="reason"></ErrorMessage>
                    </div>
                    <div class="text-right">
                        <button type="button" class="btn btn-primary mr-2" @click="setDialog(false)"> Huỷ</button>
                        <button type="submit" class="btn btn-primary"><i class="fa fa-paper-plane"></i> Gửi đi</button>
                    </div>
                </Form>

            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted, reactive, computed } from 'vue';
import { VCard, VBreadcrumbs, VTabs, VTab, VWindow, VWindowItem, VDialog } from 'vuetify/lib/components/index.mjs';
import MapGetCoordinate from '@/components/Map/MapGetCoordinate.vue';
import { VDataTable } from 'vuetify/lib/labs/VDataTable/index.mjs';
import attachedProfileService from "../../services/attachedProfile.service";
import { usePropressCircular } from '../../stores/progressCircular';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toast } from 'vue3-toastify';
import provinceSevice from "../../services/province.service";
import districtSevice from "../../services/district.service";
import wardService from "../../services/ward.service";
import generalProfileService from '../../services/generalProfile.service';
import typeProfileService from "../../services/typeProfile.service";
import typeNotificationService from "../../services/typeNotification.service";
import receiveResultService from "../../services/receiveResult.service";
import memberChangeTogetherService from '../../services/memberChangeTogether.service';
import reportService from "../../services/report.service";
export default defineComponent({
    components: {
        VBreadcrumbs,
        VTabs, VTab, VWindow, VWindowItem, VCard,
        MapGetCoordinate,
        VDataTable,
        Form, Field, ErrorMessage,
        VDialog,
    },
    props: {
        generalProfile: { type: Object, required: true }
    },
    emits: ["rerender:generalProfile"],
    setup(props, context) {
        console.log(props.generalProfile);
    },
    setup(props, context) {
        const tab = ref("");
        const progressCircular = usePropressCircular();
        const data = ref([]);
        const items = ref([
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            {
                title: 'Hồ sơ xoá đăng ký tạm trú',
                disabled: false,
                href: '/general-profile',
            },
            {
                title: 'Chỉnh sửa hồ sơ',
                disabled: true,
                href: 'temporary-residence-profile',
            },
        ]);
        const headers = [
            {
                title: 'STT',
                align: 'start',
                sortable: false,
                key: 'index',
            },
            { title: 'Tên hồ sơ', key: 'name' },
            { title: 'Hình thức', key: 'isCopy' },
            { title: 'Tên file', key: 'path' },
            { title: 'Ghi chú', key: 'note' },
            { title: 'Thao tác', key: 'actions' },
        ];
        const deleteItem = async (item) => {
            try {
                progressCircular.setState(true);
                if (confirm("Bạn có chắc muốn xoá")) {
                    await attachedProfileService.delete(item.raw.id);
                    data.value = await attachedProfileService.getAll();
                }
                toast.success("Xoá thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error("Xoá thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const attachedProfileData = ref({
            "name": "",
            "isCopy": 1,
            "note": "",
            "file": null,
        });
        const attachedProfileValidate = yup.object().shape({
            nameApr: yup
                .string()
                .required("Tên phải có giá trị."),
            file: yup
                .mixed()
                .test("fileSize", "Kích thước hình ảnh phải nhỏ hơn 2MB.", (value) => {
                    if (!value) return true;
                    return value.size <= 2000000;
                }),
        });
        const onFileChange = (event) => {
            const files = event.target.files;
            if (files.length > 0) {
                const file = files[0];
                attachedProfileData.value.file = file;
                console.log(attachedProfileData.value.file);
            } else {
                attachedProfileData.value.file = null;
            }
        };
        const attachedProfileSubmit = async () => {
            try {
                progressCircular.setState(true);
                console.log(123);
                const formData = new FormData();
                formData.append("name", attachedProfileData.value.name);
                formData.append("note", attachedProfileData.value.note);
                formData.append("isCopy", attachedProfileData.value.isCopy);
                formData.append("file", attachedProfileData.value.file);
                formData.append("generalProfileId", props.generalProfile.id);
                await attachedProfileService.add(formData);
                data.value = await attachedProfileService.getAllByGeneralProfileId(props.generalProfile.id);
                data.value.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                toast.success("Thêm thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error("Thêm thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }

        //tab 1
        const generalData = ref({
            "name": props.generalProfile?.name ? props.generalProfile.name : "",
            "birthday": props.generalProfile?.birthday ? props.generalProfile.birthday : "",
            "cmndCccd": props.generalProfile?.cmndCccd ? props.generalProfile.cmndCccd : "",
            "gender": props.generalProfile?.gender ? props.generalProfile.gender : "",
            "phone": props.generalProfile?.phone ? props.generalProfile.phone : "",
            "email": props.generalProfile?.email ? props.generalProfile.email : "",
            "permanentAddress": props.generalProfile?.permanentAddress ? props.generalProfile.permanentAddress : "",
            "currentAddress": props.generalProfile?.currentAddress ? props.generalProfile.currentAddress : "",
            "job": props.generalProfile?.job ? props.generalProfile.job : "",
            "workspace": props.generalProfile?.workspace ? props.generalProfile.workspace : "",
            "wardId": props.generalProfile?.ward ? props.generalProfile.ward.code : "",
            "districtId": props.generalProfile?.ward ? props.generalProfile.ward.district.code : "",
            "provinceId": props.generalProfile?.ward ? props.generalProfile.ward.district.province.code : "",
            "typeProfileId": props.generalProfile?.typeProfile ? props.generalProfile.typeProfile.id : "",
            "caseProfile": props.generalProfile?.caseProfile ? props.generalProfile.caseProfile : "",
            "typeNotificationId": props.generalProfile?.typeNotification ? props.generalProfile.typeNotification.id : "",
            "receiveResultId": props.generalProfile?.receiveResult ? props.generalProfile.receiveResult.id : "",
            "noteDeclarent": props.generalProfile?.noteDeclarent ? props.generalProfile.noteDeclarent : "",
        });
        const diffData = ref({
            typeProfile: [],
            typeNotification: [],
            receiveResult: [],
        });
        const provinceData = ref({
            province: [],
            district: [],
            ward: [],
        });
        const permanentProvinceData = ref({
            provinces: [],
            districts: [],
            wards: [],
            province: "",
            district: "",
            ward: "",
            address: "",
        });
        const currentProvinceData = ref({
            provinces: [],
            districts: [],
            wards: [],
            province: "",
            district: "",
            ward: "",
            address: "",
        });
        const dataSource = reactive(props.generalProfile);
        console.log(dataSource);
        const organ = ref(dataSource?.ward ? "Công an " + dataSource.ward.fullName : "");
        const setDistrict = async () => {
            try {
                progressCircular.setState(true);
                provinceData.value.district = await districtSevice.getByProvinceCode(generalData.value.provinceId);
                generalData.value.districtId = "";
                generalData.value.wardId = "";
                organ.value = "";
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const setWard = async () => {
            try {
                progressCircular.setState(true);
                provinceData.value.ward = await wardService.getByDistrictCode(generalData.value.districtId);
                generalData.value.wardId = "";
                organ.value = "";
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const setOrgan = async () => {
            try {
                progressCircular.setState(true);
                const rs = await wardService.getByCode(generalData.value.wardId);
                organ.value = "Công an " + rs.fullName;
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const setPermanentDistrict = async () => {
            try {
                progressCircular.setState(true);
                permanentProvinceData.value.district = "";
                permanentProvinceData.value.ward = "";
                permanentProvinceData.value.districts = await districtSevice.getByProvinceCode(permanentProvinceData.value.province);
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const setPermanentWard = async () => {
            try {
                progressCircular.setState(true);
                permanentProvinceData.value.ward = "";
                permanentProvinceData.value.wards = await wardService.getByDistrictCode(permanentProvinceData.value.district);

            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const setCurrentDistrict = async () => {
            try {
                progressCircular.setState(true);
                currentProvinceData.value.district = "";
                currentProvinceData.value.ward = "";
                currentProvinceData.value.districts = await districtSevice.getByProvinceCode(currentProvinceData.value.province);
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const setCurrentWard = async () => {
            try {
                progressCircular.setState(true);
                currentProvinceData.value.wards = await wardService.getByDistrictCode(currentProvinceData.value.district);
                currentProvinceData.value.ward = "";
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const statusForm = ref(true);
        const setStatusForm = (status) => {
            statusForm.value = status;
        }
        const generalFormSchema = yup.object().shape({
            nameG: yup
                .string()
                .required("Tên không thể trống."),
            birthdayG: yup
                .string()
                .required("Vui lòng nhập ngày sinh."),
            genderG: yup
                .string()
                .required("Vui lòng nhập giới tính."),
            cmndCccdG: yup
                .string()
                .min(9, "ĐDCN(CCCD)/CMND phải là 9 hoặc 12 ký tự")
                .max(12, "ĐDCN(CCCD)/CMND phải là 9 hoặc 12 ký tự")
                .required("Vui lòng nhập ĐDCN(CCCD)/CMND."),
            phoneG: yup
                .string()
                .min(10, "Số điện thoại phải là 10 ký tự")
                .max(10, "Số điện thoại phải là 10 ký tự")
                .required("Vui lòng nhập số điện thoại."),
            emailG: yup
                .string()
                .required("Vui lòng nhập email.")
                .email("Email không đúng định dạng"),
            province: yup
                .string()
                .required("Tỉnh/thành phố không thể trống."),
            district: yup
                .string()
                .required("Quận/Huyện không thể trống."),
            ward: yup
                .string()
                .required("Phường/Xã không thể trống."),
            organ: yup
                .string()
                .required("Tên cơ quan không thể trống."),
            permanentProvince: yup
                .string()
                .required("Tỉnh/thành phố không thể trống."),
            permanentDistrict: yup
                .string()
                .required("Quận/huyện không thể trống"),
            permanentWard: yup
                .string()
                .required("Phường/Xã không thể trống"),
            typeProfileG: yup
                .string()
                .required("Thủ tục không thể trống."),
            caseProfileG: yup
                .string()
                .required("Trường hợp không thể trống."),
        });
        const submitGeneralForm = async () => {
            try {
                progressCircular.setState(true);
                const temp1 = await wardService.getByCode(permanentProvinceData.value.ward);
                generalData.value.permanentAddress = (permanentProvinceData.value.address == "" ? "" : permanentProvinceData.value.address + ",") + temp1.fullName + "," + temp1.district.fullName + "," + temp1.district.province.fullName;
                if (currentProvinceData.value.ward != "") {
                    const temp2 = await wardService.getByCode(currentProvinceData.value.ward);
                    generalData.value.currentAddress = (currentProvinceData.value.address == "" ? "" : currentProvinceData.value.address + ",") + temp2.fullName + "," + temp2.district.fullName + "," + temp2.district.province.fullName;
                }
                console.log(generalData.value);
                await generalProfileService.update(props.generalProfile.id, {
                    wardId: generalData.value.wardId,
                    name: generalData.value.name,
                    birthday: generalData.value.birthday,
                    gender: generalData.value.gender,
                    cmndCccd: generalData.value.cmndCccd,
                    phone: generalData.value.phone,
                    email: generalData.value.email,
                    job: generalData.value.job,
                    workspace: generalData.value.workspace,
                    permanentAddress: generalData.value.permanentAddress,
                    currentAddress: generalData.value.currentAddress,
                    typeProfileId: generalData.value.typeProfileId,
                    caseProfile: generalData.value.caseProfile,
                    receiveResultId: generalData.value.receiveResultId,
                    typeNotificationId: generalData.value.typeNotificationId,
                    noteDeclarent: generalData.value.noteDeclarent,
                });
                context.emit("rerender:generalProfile");
                statusForm.value = true;
                toast.success("Cập nhật thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error("Cập nhật thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        //tab2
        const coordinate = ref({
            lat: props.generalProfile?.temporaryLatitude ? props.generalProfile.temporaryLatitude : "",
            lng: props.generalProfile?.temporaryLongitude ? props.generalProfile.temporaryLongitude : "",
            address: props.generalProfile?.temporaryDigitalAddress ? props.generalProfile.temporaryDigitalAddress : "",
        });
        const setCoordinate = async (data) => {
            try {
                coordinate.value.lat = data.lat;
                coordinate.value.lng = data.lng;
                coordinate.value.address = data.address;
                console.log(coordinate.value);
            } catch (error) {
                console.log(error);
            }
        }
        const temporaryData = ref({
            address: props.generalProfile?.temporaryAddress ? props.generalProfile.temporaryAddress.split(",")[0] : "",
            hostName: props.generalProfile?.hostName ? props.generalProfile.hostName : "",
            cmndCccdHost: props.generalProfile?.cmndCccdHost ? props.generalProfile.cmndCccdHost : "",
            relationshipHost: props.generalProfile?.relationshipHost ? props.generalProfile.relationshipHost : "",
            relationshipDeclarent: props.generalProfile?.relationshipDeclarent ? props.generalProfile.relationshipDeclarent : "",
            temporaryResidenceExpiration: props.generalProfile?.temporaryResidenceExpiration ? props.generalProfile.temporaryResidenceExpiration : "",
        });
        const statusTemporary = ref(true);
        const setStatusTemporary = (status) => {
            statusTemporary.value = status;
        }
        const temporaryFormSchema = yup.object().shape({
            temporaryAddress: yup
                .string()
                .required("Địa chỉ tạm trú không thể trống."),
            temporaryResidenceExpiration: yup
                .string()
                .required("Thời hạn tạm trú không thể trống."),
            latitude: yup
                .string()
                .required("Vui lòng chọn vị trí nơi tạm trú trên bản đồ."),
            longitude: yup
                .string()
                .required("Vui lòng chọn vị trí nơi tạm trú trên bản đồ."),
            digitalAddress: yup
                .string()
                .required("Vui lòng chọn vị trí nơi tạm trú trên bản đồ."),
            hostName: yup
                .string()
                .required("Tên chủ hộ không thể trống."),
            cmndCccdHost: yup
                .string()
                .required("Số ĐDCN(CCCD)/CMND của chủ hộ không thể trống."),
            relationshipHost: yup
                .string()
                .required("Quan hệ với chủ hộ không thể trống."),
            relationshipDeclarent: yup
                .string()
                .required("Quan hệ với người khai báo không thể trống."),
        });
        const submitTemporaryForm = async () => {
            try {
                progressCircular.setState(true);
                console.log("temporaryData: ", temporaryData.value);
                console.log("coordinate: ", coordinate.value);
                const temp = temporaryData.value.address + "," + props.generalProfile.ward.fullName + "," + props.generalProfile.ward.district.fullName + "," + props.generalProfile.ward.district.province.fullName;
                // console.log(temp);
                await generalProfileService.update(props.generalProfile.id, {
                    temporaryAddress: temp,
                    hostName: temporaryData.value.hostName,
                    cmndCccdHost: temporaryData.value.cmndCccdHost,
                    relationshipHost: temporaryData.value.relationshipHost,
                    relationshipDeclarent: temporaryData.value.relationshipDeclarent,
                    temporaryDigitalAddress: coordinate.value.address,
                    temporaryResidenceExpiration: temporaryData.value.temporaryResidenceExpiration,
                    temporaryLatitude: coordinate.value.lat,
                    temporaryLongitude: coordinate.value.lng,
                });
                context.emit("rerender:generalProfile");
                toast.success("Cập nhật thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.success("Cập nhật thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }

        //tab 3
        const data2 = ref([]);
        const memFormStatus = ref(true);
        const setMemFormStatus = (status) => {
            memFormStatus.value = status;
        }
        const headers2 = [
            {
                title: 'STT',
                align: 'start',
                sortable: false,
                key: 'index',
            },
            { title: 'cmndCccd', key: 'cmndCccd' },
            { title: 'Họ tên', key: 'name' },
            { title: 'Ngày sinh', key: 'birthday' },
            { title: 'Giới tính', key: 'gender' },
            { title: 'Thao tác', key: 'actions' },
        ];
        const memData = ref({
            name: "",
            birthday: "",
            gender: 1,
            cmndCccd: "",
            phone: "",
            email: "",
            job: "",
            workspace: "",
            relationshipHost: "",
            relationshipDeclarent: "",
            permanentAddress: "",
            currentAddress: "",
        });
        const memPermanentAddress = ref({
            provinces: [],
            districts: [],
            wards: [],
            province: "",
            district: "",
            ward: "",
            address: "",
        });
        const setMemPermanentDistrict = async () => {
            try {
                progressCircular.setState(true);
                memPermanentAddress.value.district = "";
                memPermanentAddress.value.ward = "";
                memPermanentAddress.value.districts = await districtSevice.getByProvinceCode(memPermanentAddress.value.province);
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const setMemPermanentWard = async () => {
            try {
                progressCircular.setState(true);
                memPermanentAddress.value.ward = "";
                memPermanentAddress.value.wards = await wardService.getByDistrictCode(memPermanentAddress.value.district);
                console.log()
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const memCurrentAddress = ref({
            provinces: [],
            districts: [],
            wards: [],
            province: "",
            district: "",
            ward: "",
            address: "",
        });
        const setMemCurrentDistrict = async () => {
            try {
                progressCircular.setState(true);
                memCurrentAddress.value.district = "";
                memCurrentAddress.value.ward = "";
                memCurrentAddress.value.districts = await districtSevice.getByProvinceCode(memCurrentAddress.value.province);
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const setMemCurrentWard = async () => {
            try {
                progressCircular.setState(true);
                memCurrentAddress.value.ward = "";
                memCurrentAddress.value.wards = await wardService.getByDistrictCode(memCurrentAddress.value.district);
            } catch (error) {
                console.log(error);
                toast.error("Lấy dữ liệu thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const memFormSchema = yup.object().shape({
            nameM: yup
                .string()
                .required("Tên không thể trống."),
            birthdayM: yup
                .string()
                .required("Vui lòng nhập ngày sinh."),
            genderM: yup
                .string()
                .required("Vui lòng nhập giới tính."),
            cmndCccdM: yup
                .string()
                .min(9, "ĐDCN(CCCD)/CMND phải là 9 hoặc 12 ký tự")
                .max(12, "ĐDCN(CCCD)/CMND phải là 9 hoặc 12 ký tự")
                .required("Vui lòng nhập ĐDCN(CCCD)/CMND."),
            phoneM: yup
                .string()
                .min(10, "Số điện thoại phải là 10 ký tự")
                .max(10, "Số điện thoại phải là 10 ký tự")
                .required("Vui lòng nhập số điện thoại."),
            emailM: yup
                .string()
                .required("Vui lòng nhập email.")
                .email("Email không đúng định dạng"),
            permanentProvince: yup
                .string()
                .required("Tỉnh/thành phố không thể trống."),
            permanentDistrict: yup
                .string()
                .required("Quận/huyện không thể trống"),
            permanentWard: yup
                .string()
                .required("Phường/Xã không thể trống"),
            permanentAddress: yup
                .string()
                .required("Địa chỉ không thể trống."),
            relationshipHostM: yup
                .string()
                .required("Quan hệ với chủ hộ không thể trống."),
            relationshipDeclarentM: yup
                .string()
                .required("Quan hệ với người khai báo không thể trống."),
        });
        const submitMemForm = async () => {
            try {
                progressCircular.setState(true);
                const temp1 = await wardService.getByCode(memPermanentAddress.value.ward);
                memData.value.permanentAddress = (memPermanentAddress.value.address == "" ? "" : memPermanentAddress.value.address + ",") + temp1.fullName + "," + temp1.district.fullName + "," + temp1.district.province.fullName;
                if (memCurrentAddress.value.ward != "") {
                    const temp2 = await wardService.getByCode(memCurrentAddress.value.ward);
                    memData.value.currentAddress = (memCurrentAddress.value.address == "" ? "" : memCurrentAddress.value.address + ",") + temp2.fullName + "," + temp2.district.fullName + "," + temp2.district.province.fullName;
                }
                console.log("mem: ", memData.value);
                await memberChangeTogetherService.add({
                    name: memData.value.name,
                    birthday: memData.value.birthday,
                    cmndCccd: memData.value.cmndCccd,
                    gender: memData.value.gender,
                    phone: memData.value.phone,
                    email: memData.value.email,
                    permanentAddress: memData.value.permanentAddress,
                    currentAddress: memData.value.currentAddress,
                    job: memData.value.job,
                    workspace: memData.value.workspace,
                    relationshipHost: memData.value.relationshipHost,
                    relationshipDeclarent: memData.value.relationshipDeclarent,
                    generalProfileId: props.generalProfile.id,
                });
                data2.value = await memberChangeTogetherService.getAllByGeneralProfileId(props.generalProfile.id);
                data2.value.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                memFormStatus.value = false;
                toast.success("Thêm thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message, {
                    autoClose: 3000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const deleteMem = async (item) => {
            try {
                if (confirm("Bạn có chắc muốn xoá")) {
                    progressCircular.setState(true);
                    await memberChangeTogetherService.delete(item.raw.id)
                    data2.value = await memberChangeTogetherService.getAllByGeneralProfileId(props.generalProfile.id);
                    data2.value.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    toast.success("Xoá thành công", {
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Xoá thất bại", {
                    autoClose: 1000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const dialogInfoMem = ref(false);
        const setDialogInfoMem = (item) => {
            console.log(item);
            dialogData.value.name = item.raw.name;
            dialogData.value.birthday = item.raw.birthday;
            dialogData.value.gender = item.raw.gender;
            dialogData.value.cmndCccd = item.raw.cmndCccd;
            dialogData.value.email = item.raw.email;
            dialogData.value.phone = item.raw.phone;
            dialogData.value.permanentAddress = item.raw.permanentAddress;
            dialogData.value.currentAddress = item.raw.currentAddress;
            dialogData.value.relationshipHost = item.raw.relationshipHost;
            dialogData.value.relationshipDeclarent = item.raw.relationshipDeclarent;
            dialogData.value.workspace = item.raw.workspace;
            dialogData.value.job = item.raw.job;
            dialogInfoMem.value = true;
        }
        const closeDialogInfoMem = () => {
            dialogInfoMem.value = false;
        }
        const dialogData = ref({
            name: "",
            birthday: "",
            gender: "",
            cmndCccd: "",
            phone: "",
            email: "",
            job: "",
            workspace: "",
            relationshipHost: "",
            relationshipDeclarent: "",
            permanentAddress: "",
            currentAddress: "",
        });
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                console.log(props.generalProfile);
                data.value = await attachedProfileService.getAllByGeneralProfileId(props.generalProfile.id);
                data.value.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                data2.value = await memberChangeTogetherService.getAllByGeneralProfileId(props.generalProfile.id);
                data2.value.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                diffData.value.typeProfile = await typeProfileService.getAll(1);
                diffData.value.typeNotification = await typeNotificationService.getAll(1);
                diffData.value.receiveResult = await receiveResultService.getAll(1);
                provinceData.value.province = await provinceSevice.getAll();
                permanentProvinceData.value.provinces = provinceData.value.province;
                currentProvinceData.value.provinces = provinceData.value.province;
                memPermanentAddress.value.provinces = provinceData.value.province;
                memCurrentAddress.value.provinces = provinceData.value.province;
                if (dataSource?.ward) {
                    provinceData.value.district = await districtSevice.getByProvinceCode(dataSource.ward.district.province.code);
                    provinceData.value.ward = await wardService.getByDistrictCode(dataSource.ward.district.code);
                }
                if (dataSource?.permanentAddress && dataSource.permanentAddress != "") {
                    const temp = dataSource.permanentAddress.split(",").map(word => word.trim()).reverse();
                    // console.log("temp", temp);
                    const rs = await provinceSevice.getByFullName(temp[0]);
                    permanentProvinceData.value.province = rs.code;
                    permanentProvinceData.value.districts = await districtSevice.getByProvinceCode(permanentProvinceData.value.province);
                    permanentProvinceData.value.district = permanentProvinceData.value.districts.find(e => e.fullName == temp[1]).code;
                    permanentProvinceData.value.wards = await wardService.getByDistrictCode(permanentProvinceData.value.district);
                    permanentProvinceData.value.ward = permanentProvinceData.value.wards.find(e => e.fullName == temp[2]).code;
                    permanentProvinceData.value.address = temp[3] == undefined ? "" : temp[3];
                    // console.log(permanentProvinceData.value);
                }
                if (dataSource?.currentAddress && dataSource.currentAddress != "") {
                    const temp = dataSource.currentAddress.split(",").map(word => word.trim()).reverse();
                    const rs = await provinceSevice.getByFullName(temp[0]);
                    currentProvinceData.value.province = rs.code;
                    currentProvinceData.value.districts = await districtSevice.getByProvinceCode(currentProvinceData.value.province);
                    currentProvinceData.value.district = currentProvinceData.value.districts.find(e => e.fullName == temp[1]).code;
                    currentProvinceData.value.wards = await wardService.getByDistrictCode(currentProvinceData.value.district);
                    currentProvinceData.value.ward = currentProvinceData.value.wards.find(e => e.fullName == temp[2]).code;
                    currentProvinceData.value.address = temp[3] == undefined ? "" : temp[3];
                    // console.log(currentProvinceData.value);
                }
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        })
        const getAttachFile = async (name) => {
            try {
                progressCircular.setState(true);
                const response = await reportService.getAttachFile({
                    fileName: name,
                });
                const blob = new Blob([response]);
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                // const dateTimeString = new Date().toISOString().replace(/[-:.]/g, '');
                link.download = name; // Tên file khi tải về
                link.click();
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const dialog = ref(false);
        const setDialog = (status) => {
            dialog.value = status;
        }
        const dataDenied = ref({});
        const dialogValidation = yup.object().shape({
            reason: yup.string().required("Lý do không thể trống")
        });
        const accepted = async () => {
            try {
                progressCircular.setState(true);
                if (confirm("Bạn có chắc tiếp nhận hồ sơ này")) {
                    await generalProfileService.acceptedDelete(props.generalProfile.id);
                    context.emit("rerender:generalProfile");
                    toast.success("Tiếp nhận hồ sơ thành công", {
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Tiếp nhận hồ sơ thất bại", {
                    autoClose: 3000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const denied = async () => {
            try {
                progressCircular.setState(true);
                await generalProfileService.deniedDelete(props.generalProfile.id, dataDenied.value);
                context.emit("rerender:generalProfile");
                dialog.value = false;
                toast.success("Từ chối tiếp nhận, giải quyết hồ sơ thành công", {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error("Từ chối tiếp nhận, giải quyết hồ sơ thất bại", {
                    autoClose: 3000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        return {
            items, tab, headers, deleteItem, data,
            attachedProfileData, attachedProfileValidate,
            onFileChange, attachedProfileSubmit, generalData,
            provinceData, provinceData, permanentProvinceData, currentProvinceData,
            organ, setDistrict, setWard, setOrgan, setPermanentDistrict,
            setPermanentWard, setCurrentDistrict, setCurrentWard,
            statusForm, setStatusForm, generalFormSchema, submitGeneralForm, diffData,
            temporaryData, statusTemporary, setStatusTemporary, temporaryFormSchema,
            submitTemporaryForm, coordinate, setCoordinate,
            data2, headers2, memPermanentAddress, memCurrentAddress, memData,
            setMemCurrentWard, setMemCurrentDistrict, setMemPermanentWard, setMemPermanentDistrict, memFormStatus, setMemFormStatus, submitMemForm,
            memFormSchema, deleteMem, dialogInfoMem, setDialogInfoMem,
            dialogData, closeDialogInfoMem, getAttachFile,
            dialog, setDialog, dialogValidation, accepted,
            denied, dataDenied,
        }
    }
});
</script>
<style>
.general-profile-component {
    font-size: 14px;

    .title {
        font-size: 30px;
    }

    .v-tabs {
        border-bottom: 3px solid #920049;
        margin-bottom: 1rem;
    }

    .v-tab {
        font-size: 14px;
        text-transform: inherit;
    }

    .v-tab--selected {
        background: #cf0068;
        color: white;
    }

    .title-2 {
        margin-block: 1rem;
        padding-left: 0.5rem;
        border-left: 3px solid #cf0068;
        font-size: 18px;
    }

    .v-window {
        overflow-x: auto;
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