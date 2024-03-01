<template>
    <div class="receive-result-component">
        <div class="form-group">
            <label>Hình thức nhận thông báo thay đổi hồ sơ <span class="not-null">(*)</span></label>
            <Field name="typeNotification" class="form-control" v-model="data2.typeNotificationId" as="select">
                <option value="" hidden>Hình thức nhận thông báo thay đổi hồ sơ </option>
                <option v-for="(e, i) in typeNotification" :key="i" :value="e.id">{{ e.name }}</option>
            </Field>
            <ErrorMessage name="typeNotification" class="error-feedback" />
        </div>
        <div class="form-group">
            <label>Hình thức nhận kết quả <span class="not-null">(*)</span></label>
            <Field name="receiveResult" class="form-control" v-model="data2.receiveResultId" as="select">
                <option value="" hidden>Hình thức nhận kết quả</option>
                <option v-for="(e, i) in receiveResult" :key="i" :value="e.id">{{ e.name }}</option>
            </Field>
            <ErrorMessage name="receiveResult" class="error-feedback" />
        </div>

    </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import { Field, ErrorMessage } from "vee-validate";
export default defineComponent({
    components: {
        Field,
        ErrorMessage,
    },
    props: {
        typeNotification: { type: Array, default: [] },
        receiveResult: { type: Array, default: [] },
    },
    emits: ["set:formData"],
    setup(props, context) {
        const data2 = ref({
            typeNotificationId: "",
            receiveResultId: "",
        });
        watch(data2.value, () => {
            // console.log(data2.value);
            context.emit("set:formData", data2.value);
        });
        return {
            data2,
        }
    }
});
</script>