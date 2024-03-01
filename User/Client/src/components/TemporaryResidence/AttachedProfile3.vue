<template>
    <div class="attached-profile-component">
        <table class="table">
            <thead class="thead-light">
                <tr class="text-center">
                    <th scope="col">STT</th>
                    <th scope="col">Tên hồ sơ <span class="not-null">(*)</span></th>
                    <th scope="col">Hình thức <span class="not-null">(*)</span></th>
                    <th scope="col">File mẫu</th>
                    <th scope="col">Hồ sơ đính kèm <span class="not-null">(*)</span></th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e, i) in attached">
                    <th scope="col">{{ i + 1 }}</th>
                    <td>
                        {{ e.name }}
                    </td>
                    <td>
                        <div v-if="e.isCopy == 1">
                            Bản chính
                        </div>
                        <div v-else-if="e.isCopy == 0">
                            Bản sao
                        </div>
                        <div v-else>
                            Bản chụp
                        </div>
                    </td>
                    <td class="text-center">
                    </td>
                    <td>
                        {{ e.path }}
                    </td>
                    <td>
                        {{ e.note }}
                    </td>
                    <td class="text-center">
                    </td>
                </tr>
                <tr v-for="(e, i) in attachFiles">
                    <th scope="col">{{ i + 3 }}</th>
                    <td>
                        {{ e.name }}
                    </td>
                    <td>
                        <select class="form-control" v-model="e.isCopy" @change="changeData">
                            <option value="0">Bản chính</option>
                            <option value="1">Bản sao</option>
                            <option value="2">Bản chụp</option>
                        </select>
                    </td>
                    <td class="text-center">
                        <i v-if="e.sampleFile" style="cursor: pointer;" class="fas fa-paperclip" @click="downloadCT01"></i>
                    </td>
                    <td>
                        <div class="form-group">
                            <input type="file" class="form-control-file" @change="handleFile" :data-index="i">
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <textarea class="form-control" rows="1" v-model="e.note" @change="changeData"></textarea>
                        </div>
                    </td>
                    <td class="text-center">
                        <div v-if="e.action" class="form-group">
                            <button class="btn btn-danger py-1 px-2"><i class="fas fa-trash-alt"
                                    @click="deleteAttachFile(i)"></i></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <v-dialog transition="dialog-bottom-transition" v-model="dialog" center>
            <template v-slot:activator="{ props }">
                <button class="btn btn-outline-primary" type="button" v-bind="props">
                    <i class="fa fa-plus"></i> Thêm hồ sơ đính kèm
                </button>
            </template>
            <v-card width="700px" class="m-auto">
                <div class="h5 bg-primary text-center py-2">Thêm hồ sơ đính kèm</div>
                <div class="form-row m-4">
                    <div class="form-group col-6">
                        <label>Tên hồ sơ <span class="not-null">(*)</span></label>
                        <Field type="text" class="form-control" name="ap_name" v-model="dialogData.name" />
                    </div>
                    <div class="form-group col-6">
                        <label>Hình thức <span class="not-null">(*)</span></label>
                        <Field as="select" class="form-control" name="ap_isCopy" v-model="dialogData.isCopy">
                            <option value="0">Bản chính</option>
                            <option value="1">Bản sao</option>
                            <option value="2">Bản chụp</option>
                        </Field>
                    </div>
                    <div class="form-group col-12">
                        <label>Ghi chú</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"
                            v-model="dialogData.note"></textarea>
                    </div>
                </div>
                <div class="text-right mx-4 mb-3">
                    <button class="btn btn-primary mr-2" @click="toggleDialog(false)">Huỷ</button>
                    <button class="btn btn-primary" @click="addAttachProfile">Thêm</button>
                </div>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
import {
    defineComponent, ref, onMounted, watch
} from 'vue';
import { Field, ErrorMessage } from "vee-validate";
import { VDialog, VCard, VCardText, VBtn } from "vuetify/lib/components/index.mjs";
import { usePropressCircular } from '../../stores/progressCircular';
import { toast } from 'vue3-toastify';
import * as yup from "yup";
import reportService from "../../services/report.service";
import { saveAs } from 'file-saver';
import mammoth from 'mammoth';
export default defineComponent({
    components: {
        VDialog, VCard, VCardText, VBtn,
        Field, ErrorMessage
    },
    emits: ["set:formData"],
    props: {
        attached: { type: Array, default: [] },
    },
    setup(props, context) {
        const dialog = ref(false);
        const progressCircular = usePropressCircular();
        const toggleDialog = (status) => {
            dialog.value = status;
        }
        const attachFiles = ref([
        ]);

        const dialogData = ref({
            name: "",
            isCopy: 0,
            sampleFile: false,
            file: null,
            note: "",
            action: true,
        });
        const changeData = (index) => {
            context.emit("set:formData", {
                attachProfiles: attachFiles.value
            });
        }
        const addAttachProfile = async () => {
            try {
                progressCircular.setState(true);
                // console.log(dialogData);
                await attachedFileSchema.validate(dialogData.value, { abortEarly: false });
                attachFiles.value.push(dialogData.value);
                dialog.value = false;
                context.emit("set:formData", {
                    attachProfiles: attachFiles.value
                });
            } catch (error) {
                console.log(error);
                toast.error(error.errors[0], {
                    autoClose: 2000,
                });
            } finally {
                progressCircular.setState(false);
            }
        }
        const handleFile = (event) => {
            const files = event.target.files;
            const index = event.target.dataset.index;
            if (files.length > 0) {
                const file = files[0];
                attachFiles.value[index].file = file;
                console.log(attachFiles.value);
                context.emit("set:formData", {
                    attachProfiles: attachFiles.value
                });
            } else {
                attachFiles.value.file = null;
            }
        }
        const attachedFileSchema = yup.object().shape({
            name: yup.string().required("Tên hồ sơ không được để trống."),
            isCopy: yup.string().required("Hình thức không thể trống."),
        });
        const deleteAttachFile = (index) => {
            attachFiles.value.splice(index, 1);
            console.log(attachFiles.value, index)
            context.emit("set:formData", {
                attachProfiles: attachFiles.value
            });
        }
        const downloadCT01 = async () => {
            try {
                const response = await reportService.getCT01();
                console.log(response);
                const blob = new Blob([response], { type: 'application/msword' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                const dateTimeString = new Date().toISOString().replace(/[-:.]/g, '');
                link.download = `CT01 Tờ khai thay đổi thông tin cư trú_${dateTimeString}.doc`; // Tên file khi tải về
                link.click();
            } catch (error) {
                console.log(error);
            }

        }
        onMounted(() => {
            // console.log(attachFiles.value);
            context.emit("set:formData", {
                attachProfiles: attachFiles.value
            });
        })
        return {
            attachFiles,
            addAttachProfile,
            dialog, toggleDialog,
            dialogData, handleFile,
            changeData, deleteAttachFile, downloadCT01
        }
    }
});
</script>