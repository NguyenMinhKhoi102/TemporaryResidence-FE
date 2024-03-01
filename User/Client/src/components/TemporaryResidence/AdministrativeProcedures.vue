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
                    <option value="Người ngoài tỉnh">Người ngoài tỉnh</option>
                    <option value="Người trong tỉnh">Người trong tỉnh</option>
                    <!-- <option v-for="(caseProfile, index) in caseProfiles" :key="index" :value="caseProfile.id">
                            {{ caseProfile.name }}
                        </option> -->
                </Field>
                <ErrorMessage name="caseProfile" class="error-feedback" />
            </div>
            <div class="form-group col">
                <label>Tạm trú đến ngày <span class="not-null">(*)</span></label>
                <Field name="temporaryResidenceExpiration" class="form-control"
                    v-model="localProcedure.temporaryResidenceExpiration" type="date" @change="setFormData">
                </Field>
                <ErrorMessage name="temporaryResidenceExpiration" class="error-feedback" />
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
import { defineComponent, watch, ref } from 'vue';
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
            typeProfile: 1,
            caseProfile: "",
            temporaryResidenceExpiration: ""
        });
        const setFormData = () => {
            context.emit("set:formData", {
                typeProfileId: localProcedure.value.typeProfile,
                caseProfile: localProcedure.value.caseProfile,
                temporaryResidenceExpiration: localProcedure.value.temporaryResidenceExpiration
            });
        }
        return {
            localProcedure,
            setFormData,
        }
    }
});
</script>