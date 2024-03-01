<template>
    <div class="temporary-residence-extension">
        <h1 class="text-center title">GIA HẠN TẠM TRÚ</h1>
        <Form @submit="localDataSumit" :validation-schema="localDataValidation">
            <v-list v-model:opened="opened">
                <v-list-group value="ImplementingAgencies">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">CƠ QUAN THỰC HIỆN
                        </v-list-item>
                    </template>
                    <ImplementingAgencies2 :formData="localData" @set:formData="setLocalData" class="card-body"
                        :provinces="provinces">
                    </ImplementingAgencies2>
                </v-list-group>
                <v-list-group value="AdministrativeProcedures">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">THỦ TỤC HÀNH CHÍNH YÊU CẦU
                        </v-list-item>
                    </template>
                    <AdministrativeProcedures2 :formData="localData" @set:formData="setLocalData" class="card-body"
                        :typeProfiles="typeProfiles">
                    </AdministrativeProcedures2>
                </v-list-group>
                <v-list-group value="Info">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props">TỜ KHAI THAY ĐỔI THÔNG TIN CƯ TRÚ
                        </v-list-item>
                    </template>
                    <Info2 :formData="localData" @set:formData="setLocalData" class="card-body" :provinces="provinces">
                    </Info2>
                </v-list-group>
            </v-list>
            <div>
                <input type="checkbox" name="" class="mb-5"> Tôi xin chịu trách nhiệm trước pháp luật về lời khai trên
            </div>
            <div class="text-center">
                <button type="reset" class="btn btn-primary mr-2">
                    <i class="fa fa-rotate-left"></i>
                    Làm mới
                </button>
                <button type="submit" @click="setFormData({ isCopy: 1 })" class="btn btn-primary mr-2">
                    <i class="fa fa-save"></i>
                    Lưu
                </button>
                <button type="submit" @click="setFormData({ isCopy: 0 })" class="btn btn-outline-primary">
                    <i class="fa fa-paper-plane"></i>
                    Lưu và gửi
                </button>
            </div>
        </Form>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import provinceService from "@/services/province.service";
import districtService from '@/services/district.service';
import wardService from '@/services/ward.service';
import { usePropressCircular } from '../../stores/progressCircular';
import MapGetCoordinate from '../Map/MapGetCoordinate.vue';
import ImplementingAgencies2 from './ImplementingAgencies2.vue';
import { VList, VListItem, VListGroup, VDialog, VCard, } from "vuetify/lib/components/index.mjs";
import AdministrativeProcedures2 from './AdministrativeProcedures2.vue';
import typeProfileService from "@/services/typeProfile.service";
import Info2 from './Info2.vue';
import generalProfileService from '@/services/generalProfile.service';
import temporaryResidenceProfileService from '@/services/temporaryResidenceProfile';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        Form, Field, ErrorMessage,
        VList, VListItem, VListGroup, VDialog, VCard,
        ImplementingAgencies2,
        AdministrativeProcedures2,
        Info2,
    },
    props: {
        temporaryResidenceProfile: { type: Object, required: true },
    },
    setup(props, context) {
        const progressCircular = usePropressCircular();
        const opened = ref(["ImplementingAgencies", "AdministrativeProcedures", "Info", "MemberChangeTogether", "ReceiveResult", "AttachedProfile", "TemporaryResidenceRegistration"]);
        const localData = ref(props.temporaryResidenceProfile);
        const setLocalData = (data) => {
            localData.value.wardId = data.wardId ?? localData.value.wardId;
            localData.value.profile = data.profile ?? localData.value.profile;
            localData.value.typeProfileId = data.typeProfileId ?? localData.value.typeProfileId;
            localData.value.caseProfile = data.caseProfile ?? localData.value.caseProfile;
            localData.value.temporaryResidenceExpiration = data.temporaryResidenceExpiration ?? localData.value.temporaryResidenceExpiration;
            localData.value.isCopy = localData.value.isCopy ?? localData.value.isCopy;
            localData.value.noteDeclarent = data.noteDeclarent ?? localData.value.noteDeclarent;
            localData.value.districts = data.districts ?? localData.value.districts;
            localData.value.wards = data.wards ?? localData.value.wards;
            localData.value.permanentWardId = data.permanentWardId ?? localData.value.permanentWardId;
            localData.value.currentWardId = data.currentWardId ?? localData.value.currentWardId;
            localData.value.temporaryResidenceWardId = data.temporaryResidenceWardId ?? localData.value.temporaryResidenceWardId;
            localData.value.name = data.name ?? localData.value.name;
            localData.value.birthday = data.birthday ?? localData.value.birthday;
            localData.value.gender = data.gender ?? localData.value.gender;
            localData.value.cmndCccd = data.cmndCccd ?? localData.value.cmndCccd;
            localData.value.phone = data.phone ?? localData.value.phone;
            localData.value.email = data.email ?? localData.value.email;
            localData.value.statusInfo = data.statusInfo ?? localData.value.statusInfo;
            localData.value.pmnDistricts = data.pmnDistricts ?? localData.value.pmnDistricts;
            localData.value.pmnWards = data.pmnWards ?? localData.value.pmnWards;
            localData.value.pmnDistrict = data.pmnDistrict ?? localData.value.pmnDistrict;
            localData.value.pmnProvince = data.pmnProvince ?? localData.value.pmnProvince;
            localData.value.pmnWard = data.pmnWard ?? localData.value.pmnWard;
            localData.value.crDistricts = data.crDistricts ?? localData.value.crDistricts;
            localData.value.crWards = data.crWards ?? localData.value.crWards;
            localData.value.crDistrict = data.crDistrict ?? localData.value.crDistrict;
            localData.value.crProvince = data.crProvince ?? localData.value.crProvince;
            localData.value.crWard = data.crWard ?? localData.value.crWard;
            localData.value.district = data.district ?? localData.value.district;
            localData.value.province = data.province ?? localData.value.province;
            localData.value.ward = data.ward ?? localData.value.ward;
            localData.value.organ = data.organ ?? localData.value.organ;
            console.log(localData.value);
        }
        const localDataValidation = yup.object().shape({
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
            crProvince: yup.string().required("Tỉnh/thành phố không được để trống."),
            crDistrict: yup.string().required("Quận/Huyện không được để trống."),
            crWard: yup.string().required("Phường/Xã không được để trống."),
        });
        const router = useRouter();
        const localDataSumit = async () => {
            try {
                progressCircular.setState(true);
                const temp = localData.value;
                if (checkUser(temp)) {
                    const rs1 = await wardService.getByCode(temp.pmnWard);
                    const rs2 = await wardService.getByCode(temp.crWard);
                    const pmnAddress = rs1.fullName + "," + rs1.district.fullName + "," + rs1.district.province.fullName;
                    const crAddress = rs2.fullName + "," + rs2.district.fullName + "," + rs2.district.province.fullName;
                    await generalProfileService.add({
                        wardId: temp.wardId,
                        isCopy: temp.isCopy,
                        name: temp.name,
                        birthday: temp.birthday,
                        cmndCccd: temp.cmndCccd,
                        gender: temp.gender,
                        phone: temp.phone,
                        email: temp.email,
                        permanentAddress: pmnAddress,
                        currentAddress: crAddress,
                        job: temp.job,
                        workspace: temp.workspace,
                        noteDeclarent: temp.noteDeclarent,
                        typeProfileId: temp.typeProfileId,
                        caseProfile: temp.caseProfile,
                        temporaryResidenceExpiration: temp.temporaryResidenceExpiration,
                    });
                    toast.success("Gửi yêu cầu gia hạn tạm trú thành công", {
                        autoClose: 1000,
                    });
                } else {
                    toast.error("Người dân chưa đăng ký tạm trú", {
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Gửi yêu cầu gia hạn tạm trú thất bại", {
                    autoClose: 3000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const checkUser = async (data) => {
            try {
                progressCircular.setState(true);
                const temp = await temporaryResidenceProfileService.getAll();
                console.log(temp);
                const filterTemp = temp.filter(e => {
                    const a = new Date(e.birthday);
                    const b = new Date(data.birthday);
                    // console.log(a.toISOString().split('T')[0] == b.toISOString().split('T')[0])
                    return e.name == data.name &&
                        e.cmndCccd == data.cmndCccd &&
                        e.gender == data.gender &&
                        a.toISOString().split('T')[0] == b.toISOString().split('T')[0]
                });
                if (filterTemp.length == 0)
                    return false;
                return true;
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        }
        const provinces = ref([]);
        const typeProfiles = ref([]);
        onMounted(async () => {
            try {
                progressCircular.setState(true);
                provinces.value = await provinceService.getAll();
                typeProfiles.value = await typeProfileService.getAll(1);
            } catch (error) {
                console.log(error);
            } finally {
                progressCircular.setState(false);
            }
        })
        return {
            localData,
            setLocalData,
            provinces, typeProfiles,
            opened, localDataValidation,
            localDataSumit, checkUser
        }
    }
});
</script>
<style>
@import "@/assets/css/form.css";

.temporary-residence-extension {
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
}
</style>