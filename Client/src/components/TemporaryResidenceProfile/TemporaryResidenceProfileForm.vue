<template>
    <div class="temporary-residence-profile-form-component">
        <h2 class="title my-3">HỒ SƠ TẠM TRÚ</h2>
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
            <v-tab value="tab-2" :disabled="temporaryResidenceProfile.ward == null">
                Thông tin tạm trú
            </v-tab>
            <v-tab value="tab-3">
                Hồ sơ đính kèm
            </v-tab>
        </v-tabs>
        <div>
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
                            <div class="form-group col-12">
                                <label>Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc) <span
                                        class="text-danger font-weight-bold">(*)</span></label>
                                <Field :disabled="statusForm" class="form-control" name="permanentAddress"
                                    placeholder="Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc)"
                                    v-model="permanentProvinceData.address" />
                                <ErrorMessage name="permanentAddress" class="text-danger"></ErrorMessage>
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
                            <div class="form-group col-12">
                                <label>Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc)</label>
                                <Field :disabled="statusForm" class="form-control" name="currentAdress"
                                    placeholder="Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc)"
                                    v-model="currentProvinceData.address" />
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
                <v-window-item value="tab-2">
                    <h6 class="title-2">Thông tin tạm trú vật lý</h6>
                    <div class="form-row m-0">
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
                    <Form @submit="submitTemporaryForm" :validation-schema="temporaryFormSchema">
                        <div class="form-row m-0">
                            <div class="form-group col">
                                <label>Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc) <span
                                        class="text-danger font-weight-bold">(*)</span></label>
                                <Field :disabled="statusTemporary" class="form-control" name="temporaryAddress"
                                    placeholder="Địa chỉ(Số nhà, đường, ấp, xóm, khóm, thôn, sóc)"
                                    v-model="temporaryData.address" />
                                <ErrorMessage name="temporaryAddress" class="text-danger"></ErrorMessage>
                            </div>
                            <div class="form-group col">
                                <label>Thời gian tạm trú đến ngày <span
                                        class="text-danger font-weight-bold">(*)</span></label>
                                <Field :disabled="statusTemporary" type="date" class="form-control"
                                    name="temporaryResidenceExpiration"
                                    v-model="temporaryData.temporaryResidenceExpiration" />
                                <ErrorMessage name="temporaryResidenceExpiration" class="text-danger"></ErrorMessage>
                            </div>
                        </div>
                        <h6 class="title-2">Thông tin tạm trú số</h6>
                        <div class="mb-3" v-if="!statusTemporary"><i>Lưu ý <span
                                    class="text-danger font-weight-bold">(*)</span>: Chọn vị trí nơi
                                tạm
                                trú trên bản đồ để thiết lập địa chỉ số</i></div>
                        <div class="form-row m-0">
                            <div class="col map" v-if="temporaryResidenceProfile.ward != null">
                                <MapGetCoordinate v-if="!statusTemporary" :ward="temporaryResidenceProfile.ward"
                                    :temporaryAddress="temporaryAddress" :coordinate="coordinate"
                                    @set:coordinate="setCoordinate"></MapGetCoordinate>
                                <div v-else>
                                    <div class="map-title text-center">Vui lòng chọn chỉnh sửa phía dưới nếu muốn hiệu chỉnh
                                        địa chỉ số
                                    </div>
                                    <img class="img-fluid"
                                        src="https://i.pinimg.com/originals/2b/07/f6/2b07f62987e987d4e53e84aa8b963b83.gif"
                                        alt="">
                                </div>

                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label>Vĩ độ </label>
                                    <Field disabled name="latitude" class="form-control" v-model="coordinate.lat"
                                        placeholder="Vĩ độ" />
                                    <ErrorMessage name="latitude" class="text-danger"></ErrorMessage>
                                </div>
                                <div class="form-group">
                                    <label>Kinh độ</label>
                                    <Field disabled name="longitude" class="form-control" v-model="coordinate.lng"
                                        placeholder="Kinh độ" />
                                    <ErrorMessage name="longitude" class="text-danger"></ErrorMessage>
                                </div>
                                <div class="form-group">
                                    <label>Địa chỉ tạm trú trên bản đồ số</label>
                                    <Field disabled name="digitalAddress" class="form-control" v-model="coordinate.address"
                                        placeholder="Địa chỉ tạm trú số" />
                                    <ErrorMessage name="digitalAddress" class="text-danger"></ErrorMessage>
                                </div>
                            </div>
                        </div>
                        <h6 class="title-2">Thông tin chủ hộ và quan hệ với người khai báo</h6>
                        <div class="form-row m-0">
                            <div class="form-group col">
                                <label>Tên chủ hộ <span class="text-danger font-weight-bold">(*)</span></label>
                                <Field :disabled="statusTemporary" class="form-control" name="hostName"
                                    placeholder="Tên chủ hộ" v-model="temporaryData.hostName" />
                                <ErrorMessage name="hostName" class="text-danger"></ErrorMessage>
                            </div>
                            <div class="form-group col">
                                <label>
                                    Số ĐDCN(CCCD)/CMND của chủ hộ
                                    <span class="text-danger font-weight-bold">(*)</span>
                                </label>
                                <Field :disabled="statusTemporary" class="form-control" name="cmndCccdHost"
                                    placeholder="Số ĐDCN(CCCD)/CMND của chủ hộ" v-model="temporaryData.cmndCccdHost" />
                                <ErrorMessage name="cmndCccdHost" class="text-danger"></ErrorMessage>
                            </div>
                        </div>
                        <div class="form-row m-0">
                            <div class="form-group col">
                                <label>Quan hệ với chủ hộ <span class="text-danger font-weight-bold">(*)</span></label>
                                <Field :disabled="statusTemporary" class="form-control" name="relationshipHost"
                                    placeholder="Quan hệ với chủ hộ" v-model="temporaryData.relationshipHost" />
                                <ErrorMessage name="relationshipHost" class="text-danger"></ErrorMessage>
                            </div>
                            <div class="form-group col">
                                <label>Quan hệ với người khai báo <span
                                        class="text-danger font-weight-bold">(*)</span></label>
                                <Field :disabled="statusTemporary" class="form-control" name="relationshipDeclarent"
                                    placeholder="Quan hệ với người khai báo"
                                    v-model="temporaryData.relationshipDeclarent" />
                                <ErrorMessage name="relationshipDeclarent" class="text-danger"></ErrorMessage>
                            </div>
                        </div>
                        <div class="text-center my-4" v-if="statusTemporary">
                            <button type="button" class="btn btn-primary mr-2">Trở về</button>
                            <button type="button" class="btn btn-outline-primary" @click="setStatusTemporary(false)"><i
                                    class="fas fa-pencil"></i> Chỉnh
                                sửa</button>
                        </div>
                        <div class="text-center my-4" v-else>
                            <button type="button" class="btn btn-primary mr-2" @click="setStatusTemporary(true)"><i
                                    class="fas fa-lock"></i> Khoá</button>
                            <button type="reset" class="btn btn-outline-primary"><i class="fas fa-pencil"
                                    @click="setStatusTemporary(false)"></i> Làm mới</button>
                            <button type="submit" class="btn btn-primary ml-2"><i class="fas fa-save"></i> Lưu</button>
                        </div>
                    </Form>
                </v-window-item>
                <v-window-item value="tab-3">
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
                                <Field class="form-control" as="select" name="isCopyApr"
                                    v-model="attachedProfileData.isCopy">
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
                            <button class="btn btn-warning mr-2 py-0">
                                <i class="fas fa-download"></i>
                            </button>
                            <button class="btn btn-danger py-0" @click="deleteItem(item)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </template>
                    </v-data-table>
                </v-window-item>
            </v-window>
        </div>

    </div>
</template>
<script>
import { defineComponent, ref, onMounted, reactive, computed } from 'vue';
import { VCard, VBreadcrumbs, VTabs, VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import MapGetCoordinate from '../Map/MapGetCoordinate.vue';
import { VDataTable } from 'vuetify/lib/labs/VDataTable/index.mjs';
import attachedProfileService from "../../services/attachedProfile.service";
import { usePropressCircular } from '../../stores/progressCircular';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toast } from 'vue3-toastify';
import provinceSevice from "../../services/province.service";
import districtSevice from "../../services/district.service";
import wardService from "../../services/ward.service";
import temporaryResidenceProfileService from '../../services/temporaryResidenceProfile.service';
export default defineComponent({
    components: {
        VBreadcrumbs,
        VTabs, VTab, VWindow, VWindowItem, VCard,
        MapGetCoordinate,
        VDataTable,
        Form, Field, ErrorMessage,
    },
    props: {
        temporaryResidenceProfile: { type: Object, required: true }
    },
    emits: ["rerender:temporaryResidenceProfile"],
    setup(props, context) {
        const tab = ref("");
        const progressCircular = usePropressCircular();
        const data = ref([]);
        const coordinate = ref({
            lat: props.temporaryResidenceProfile?.temporaryLatitude ? props.temporaryResidenceProfile.temporaryLatitude : "",
            lng: props.temporaryResidenceProfile?.temporaryLongitude ? props.temporaryResidenceProfile.temporaryLongitude : "",
            address: props.temporaryResidenceProfile?.temporaryDigitalAddress ? props.temporaryResidenceProfile.temporaryDigitalAddress : "",
        });
        const temporaryAddress = ref("xã Long Hậu,huyện Lai Vung,tỉnh Đồng Tháp");
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
        const items = ref([
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            {
                title: 'Hồ sơ tạm trú',
                disabled: false,
                href: '/temporary-residence-profiles',
            },
            {
                title: 'Thêm hồ sơ',
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
            "temporaryResidenceProfileId": "",
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
                formData.append("temporaryResidenceProfileId", props.temporaryResidenceProfile.id);
                await attachedProfileService.add(formData);
                data.value = await attachedProfileService.getAllByTemporaryResidenceProfileId(props.temporaryResidenceProfile.id);
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

        const generalData = ref({
            "name": props.temporaryResidenceProfile?.name ? props.temporaryResidenceProfile.name : "",
            "birthday": props.temporaryResidenceProfile?.birthday ? props.temporaryResidenceProfile.birthday : "",
            "cmndCccd": props.temporaryResidenceProfile?.cmndCccd ? props.temporaryResidenceProfile.cmndCccd : "",
            "gender": props.temporaryResidenceProfile?.gender ? props.temporaryResidenceProfile.gender : "",
            "phone": props.temporaryResidenceProfile?.phone ? props.temporaryResidenceProfile.phone : "",
            "email": props.temporaryResidenceProfile?.email ? props.temporaryResidenceProfile.email : "",
            "permanentAddress": props.temporaryResidenceProfile?.permanentAddress ? props.temporaryResidenceProfile.permanentAddress : "",
            "currentAddress": props.temporaryResidenceProfile?.currentAddress ? props.temporaryResidenceProfile.currentAddress : "",
            "job": props.temporaryResidenceProfile?.job ? props.temporaryResidenceProfile.job : "",
            "workspace": props.temporaryResidenceProfile?.workspace ? props.temporaryResidenceProfile.workspace : "",
            "wardId": props.temporaryResidenceProfile?.ward ? props.temporaryResidenceProfile.ward.code : "",
            "districtId": props.temporaryResidenceProfile?.ward ? props.temporaryResidenceProfile.ward.district.code : "",
            "provinceId": props.temporaryResidenceProfile?.ward ? props.temporaryResidenceProfile.ward.district.province.code : "",
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

        const dataSource = reactive(props.temporaryResidenceProfile);
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
        const temporaryData = ref({
            address: props.temporaryResidenceProfile?.temperaryAddress ? props.temporaryResidenceProfile.temperaryAddress.split(",")[0] : "",
            hostName: props.temporaryResidenceProfile?.hostName ? props.temporaryResidenceProfile.hostName : "",
            cmndCccdHost: props.temporaryResidenceProfile?.cmndCccdHost ? props.temporaryResidenceProfile.cmndCccdHost : "",
            relationshipHost: props.temporaryResidenceProfile?.relationshipHost ? props.temporaryResidenceProfile.relationshipHost : "",
            relationshipDeclarent: props.temporaryResidenceProfile?.relationshipDeclarent ? props.temporaryResidenceProfile.relationshipDeclarent : "",
            temporaryResidenceExpiration: props.temporaryResidenceProfile?.temporaryResidenceExpiration ? props.temporaryResidenceProfile.temporaryResidenceExpiration : "",
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
                const temp = temporaryData.value.address + "," + props.temporaryResidenceProfile.ward.fullName + "," + props.temporaryResidenceProfile.ward.district.fullName + "," + props.temporaryResidenceProfile.ward.district.province.fullName;
                // console.log(temp);
                await temporaryResidenceProfileService.update(props.temporaryResidenceProfile.id, {
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
                context.emit("rerender:temporaryResidenceProfile");
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
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                data.value = await attachedProfileService.getAllByTemporaryResidenceProfileId(props.temporaryResidenceProfile.id);
                provinceData.value.province = await provinceSevice.getAll();
                permanentProvinceData.value.provinces = provinceData.value.province;
                currentProvinceData.value.provinces = provinceData.value.province;
                if (dataSource?.ward) {
                    provinceData.value.district = await districtSevice.getByProvinceCode(dataSource.ward.district.province.code);
                    provinceData.value.ward = await wardService.getByDistrictCode(dataSource.ward.district.code);
                }
                if (dataSource?.permanentAddress && dataSource.permanentAddress != "") {
                    const temp = dataSource.permanentAddress.split(",").map(word => word.trim()).reverse();
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
        });
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
            permanentAddress: yup
                .string()
                .required("Địa chỉ không thể trống."),
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
                await temporaryResidenceProfileService.update(props.temporaryResidenceProfile.id, {
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
                });
                context.emit("rerender:temporaryResidenceProfile");
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

        return {
            tab,
            items,
            coordinate, setCoordinate,
            temporaryAddress,
            headers, data,
            deleteItem, onFileChange, attachedProfileData,
            attachedProfileValidate, attachedProfileSubmit,
            generalData, provinceData, dataSource, organ, setOrgan,
            setDistrict, setWard, permanentProvinceData, currentProvinceData,
            setPermanentDistrict, setPermanentWard, setCurrentDistrict, setCurrentWard,
            statusForm, setStatusForm, submitGeneralForm, generalFormSchema,
            statusTemporary, submitTemporaryForm, temporaryData,
            statusTemporary, setStatusTemporary, temporaryFormSchema,
        }
    }
});
</script>
<style>
.temporary-residence-profile-form-component {
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