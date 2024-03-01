<template>
    <div class="member-change-together-component">
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ và Tên <span class="not-null">(*)</span></th>
                    <th scope="col">Ngày, tháng, năm sinh <span class="not-null">(*)</span></th>
                    <th scope="col">Giới tính <span class="not-null">(*)</span></th>
                    <th scope="col">Số ĐDCN(CCCD)/CMND</th>
                    <th scope="col">Nghề nghiệp</th>
                    <th scope="col">Nơi làm việc</th>
                    <th scope="col">Quan hệ với người thay đổi <span class="not-null">(*)</span></th>
                    <th scope="col">Quan hệ với chủ hộ <span class="not-null">(*)</span></th>
                    <th scope="col">Xoá</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="formData.memberChangeTogethers.length == 0">
                    <td colspan="10" class="text-center">Không có dữ liệu</td>
                </tr>
                <tr v-for="(mem, index) in formData.memberChangeTogethers">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ mem.name }}</td>
                    <td>{{ mem.birthday }}</td>
                    <td>{{ mem.gender }}</td>
                    <td>{{ mem.cmndCccd }}</td>
                    <td>{{ mem.job }}</td>
                    <td>{{ mem.workspace }}</td>
                    <td>{{ mem.relationshipDeclarent }}</td>
                    <td>{{ mem.relationshipHost }}</td>
                    <td><button @click="deleteMem(index)" type="button" class="btn btn-danger"><i
                                class="fas fa-trash-alt"></i></button></td>
                </tr>
            </tbody>
        </table>

        <button @click="setDialog(true)" class="btn btn-outline-primary add-mem" type="button">
            <i class="fas fa-user-plus"></i> Thêm thành viên cùng
            thay
            đổi
        </button>
    </div>
</template>
<script>
import { defineComponent, ref, reactive, watch } from 'vue';
import { VDialog, VCard, VCardText, VBtn } from "vuetify/lib/components/index.mjs";
import { Field, ErrorMessage } from "vee-validate";
import districtService from "../../services/district.service";
import wardService from "../../services/ward.service";
import { usePropressCircular } from '../../stores/progressCircular';
import * as yup from "yup";
import { toast } from 'vue3-toastify';
export default defineComponent({
    components: {
        VDialog, VCard, VCardText, VBtn,
        Field, ErrorMessage,
    },
    emits: ["set:formData", "delete:mems", "set:dialog"],
    props: {
        formData: { type: Object, default: [] },
        provinces: { type: Array, default: [] },
    },
    setup(props, context) {
        const deleteMem = (index) => {
            context.emit("delete:mems", index);
        }
        const setDialog = (status) => {
            context.emit("set:dialog", status);
        }
        return {
            deleteMem,
            setDialog,
        }
    }
});
</script>
<style>
.member-change-together-component {
    overflow-x: scroll;
    position: relative;

    .table {
        width: 1800px;
    }

    .add-mem {
        position: sticky;
        position: -webkit-sticky;
        bottom: 0;
        left: 0;
    }

}
</style>