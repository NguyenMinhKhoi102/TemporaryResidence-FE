<template>
    <div class="administrative-procedures-component">
        <div class="form-row">
            <div class="form-group col">
                <label>Thủ tục <span class="not-null">(*)</span></label>
                <Field name="typeProfile" class="form-control" as="select" v-model="localProcedure.typeProfile"
                    @change="setFormData" disabled>
                    <option value="" hidden>-- Chọn --</option>
                    <option v-for="(typeProfile, index) in typeProfiles" :key="index" :value="typeProfile.id">
                        {{ typeProfile.name }}
                    </option>
                </Field>
                <ErrorMessage name="typeProfile" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Trường hợp <span class="not-null">(*)</span></label>
                <Field name="caseProfile" class="form-control" as="select" v-model="localProcedure.caseProfile"
                    @change="setFormData">
                    <option value="" hidden>-- Chọn --</option>
                    <option value="Nhân khẩu do chết">Nhân khẩu do chết</option>
                    <option value="Nhân khẩu do mất tích">Nhân khẩu do mất tích</option>
                    <option value="Nhân khẩu do vắng mặt từ 6 tháng trở lên">
                        Nhân khẩu do vắng mặt từ 6 tháng trở lên
                    </option>
                    <option value="Nhân khẩu do đăng ký thường trú tại nơi tạm trú">
                        Nhân khẩu do đăng ký thường trú tại nơi tạm trú</option>
                </Field>
                <ErrorMessage name="caseProfile" class="error-feedback" />
            </div>
            <div class="form-group col-12">
                <label>Ý kiến của người khai báo </label>
                <textarea name="noteDeclarent" class="form-control" v-model="localProcedure.noteDeclarent"
                    @change="setFormData" placeholder="Ý kiến của người khai báo">
                </textarea>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { Field, ErrorMessage } from "vee-validate";
export default defineComponent({
    components: {
        Field,
        ErrorMessage,
    },
    props: {
        typeProfiles: { type: Array, default: [] },
    },
    emits: ["set:formData"],
    setup(props, context) {

        const localProcedure = ref({
            typeProfile: 3,
            caseProfile: "",
        });
        const setFormData = () => {
            context.emit("set:formData", {
                typeProfileId: localProcedure.value.typeProfile,
                caseProfile: localProcedure.value.caseProfile,
            });
        }
        return {
            localProcedure,
            setFormData,
        }
    }
});
</script>