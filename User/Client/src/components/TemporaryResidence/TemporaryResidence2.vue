<template>
    <div class=" temporary-residence-component" v-if="data != {}">
        <h1 class="text-center title">BỔ SUNG ĐƠN ĐĂNG KÝ TẠM TRÚ</h1>
        <Form @submit="submitFrom">
            <v-list v-model:opened="opened">
                <v-list-group value="ReceiveResult">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">THÔNG TIN HỒ SƠ
                        </v-list-item>
                        <div class="mt-3"></div>
                        <div class="title-2">
                            Thông tin thủ tục
                        </div>
                        <div class="my-2">
                            <div>
                                <i class="fa-solid fa-city"></i>
                                <b> Cơ quan thực hiện: </b>Công an {{ data.ward.fullName }}
                            </div>
                            <div class="row">
                                <div class="col">
                                    <i class="fa-regular fa-clipboard"></i>
                                    <b> Loại hồ sơ: </b>{{ data.typeProfile.name }}
                                </div>
                                <div class="col">
                                    <i class="fa-regular fa-clipboard"></i>
                                    <b> Trường hợp: </b>{{ data.caseProfile }}
                                </div>
                            </div>

                        </div>
                        <div class="title-2">Thông tin cơ bản</div>
                        <div class="my-2">
                            <div class="row">
                                <div class="col">
                                    <i class="fas fa-user"></i>
                                    <b> Họ và tên: </b>{{ data.name }}
                                </div>
                                <div class="col">
                                    <i class="fa-regular fa-id-badge"></i>
                                    <b> Số ĐDCN(CCCD)/CMND: </b>{{ data.cmndCccd }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <i class="fa-regular fa-calendar-days"></i>
                                    <b> Ngày sinh: </b>{{ data.birthday }}
                                </div>
                                <div class="col">
                                    <i class="fa-solid fa-venus-mars"></i>
                                    <b> Giới tính: </b>{{ data.gender == 1 ? 'Nam' : 'Nữ' }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <i class="fa-regular fa-envelope"></i>
                                    <b> Email: </b>{{ data.email }}
                                </div>
                                <div class="col">
                                    <i class="fa-solid fa-phone"></i>
                                    <b> Số điện thoại: </b>{{ data.phone }}
                                </div>
                            </div>
                            <div>
                                <i class="fa-regular fa-address-card"></i>
                                <b> Địa chỉ tạm trú: </b>{{ data.temporaryAddress }}
                            </div>
                            <div>
                                <i class="fa-regular fa-calendar-days"></i>
                                <b> Thời hạn tạm trú đến ngày: </b>{{ data.temporaryResidenceExpiration }}
                            </div>
                            <div>
                                <i class="fa-regular fa-address-card"></i>
                                <b> Địa chỉ thường trú: </b>{{ data.permanentAddress }}
                            </div>
                            <div>
                                <i class="fa-regular fa-address-card"></i>
                                <b> Nơi ở hiện tại: </b>{{ data.currentAddress }}
                            </div>
                        </div>
                        <div class="title-2">
                            Thông tin thành viên cùng thay đổi
                        </div>
                        <div v-for="(e, i) in mems">
                            <div class="my-2">
                                <div class="row">
                                    <div class="col">
                                        <i class="fas fa-user"></i>
                                        <b> Họ và tên: </b>{{ e.name }}
                                    </div>
                                    <div class="col">
                                        <i class="fa-regular fa-id-badge"></i>
                                        <b> Số ĐDCN(CCCD)/CMND: </b>{{ e.cmndCccd }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <i class="fa-regular fa-calendar-days"></i>
                                        <b> Ngày sinh: </b>{{ e.birthday }}
                                    </div>
                                    <div class="col">
                                        <i class="fa-solid fa-venus-mars"></i>
                                        <b> Giới tính: </b>{{ e.gender == 1 ? 'Nam' : 'Nữ' }}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <i class="fa-regular fa-envelope"></i>
                                        <b> Email: </b>{{ e.email }}
                                    </div>
                                    <div class="col">
                                        <i class="fa-solid fa-phone"></i>
                                        <b> Số điện thoại: </b>{{ e.phone }}
                                    </div>
                                </div>
                                <div>
                                    <i class="fa-regular fa-address-card"></i>
                                    <b> Địa chỉ thường trú: </b>{{ e.permanentAddress }}
                                </div>
                                <div>
                                    <i class="fa-regular fa-address-card"></i>
                                    <b> Nơi ở hiện tại: </b>{{ e.currentAddress }}
                                </div>
                            </div>
                        </div>
                    </template>
                </v-list-group>
                <v-list-group value="AttachedProfile">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">HỒ SƠ ĐÍNH KÈM
                        </v-list-item>
                    </template>
                    <AttachedProfile3 :attached="attached" :formData="formData" @set:formData="setFormData"
                        class="card-body">
                    </AttachedProfile3>
                </v-list-group>
            </v-list>
            <div>
                <input type="checkbox" name="" class="mb-5"> Tôi xin chịu trách nhiệm trước pháp luật về lời khai trên
            </div>
            <div class="form-group text-center">
                <button type="reset" class="btn btn-primary mr-2"><i class="fas fa-rotate-left"></i> Làm mới</button>
                <button @click="setFormData({ isCopy: 0 })" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Lưu
                    và
                    gửi</button>
            </div>
        </Form>
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
import AttachedProfile3 from './AttachedProfile3.vue';
import MapGetCoordinate from '../Map/MapGetCoordinate.vue';
import { VList, VListItem, VListGroup, VDialog, VCard, } from "vuetify/lib/components/index.mjs";
import generalProfileService from "../../services/generalProfile.service";
import attachedProfileService from "../../services/attachedProfile.service";
import memberChangeTogetherService from "../../services/memberChangeTogether.service";
import { toast } from 'vue3-toastify';
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
        AttachedProfile3,
        VList, VListItem, VListGroup,
        MapGetCoordinate,
        VDialog, VCard,
    },
    props: {
        data: { type: Object, required: true },
        mems: { type: Array, default: [] },
        attached: { type: Array, default: [] },
    },
    setup(props, context) {
        const propressCircular = usePropressCircular();
        const opened = ref(["ReceiveResult", "AttachedProfile",]);
        const formData = reactive({
            "attachProfiles": [],
        });
        const setFormData = (data) => {
            formData.attachProfiles = data.attachProfiles ?? formData.attachProfiles;
            console.log(formData);
        }
        const attachedFileSchema = yup.object().shape({
            file: yup.string().required("Chưa có đủ hồ sơ đính kèm."),
        });
        const submitFrom = async () => {
            try {
                propressCircular.setState(true);
                if (formData.attachProfiles.length != 0) {
                    const tempData = formData;
                    for (const item of tempData.attachProfiles) {
                        await attachedFileSchema.validate(item, { abortEarly: false });
                    }
                    await generalProfileService.update(props.data.id, {
                        status: 0,
                    });
                    for (const item of tempData.attachProfiles) {
                        const tempFormData = new FormData();
                        tempFormData.append("name", item.name);
                        tempFormData.append("note", item.note);
                        tempFormData.append("file", item.file);
                        tempFormData.append("isCopy", item.isCopy);
                        tempFormData.append("generalProfileId", props.data.id);
                        await attachedProfileService.add(tempFormData);
                    }
                    toast.success("Đăng ký tạm trú thành công", {
                        autoClose: 1000,
                    });
                }
                else {
                    toast.warn("Vui lòng nhập thông tin thay đổi", {
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
        return {
            opened,
            formData,
            setFormData,
            submitFrom,
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

    .title-2 {
        font-size: 18px;
        border-left: 5px solid #cf0068;
        padding-left: 10px;
        font-weight: 600;
    }
}
</style>