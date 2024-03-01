<template>
    <div class="signin-container">
        <div class="signin shadow">
            <div class="signin-header">
                <img src="../assets/images/temporary-residence-darkblue.png" alt="">
                ĐĂNG NHẬP
            </div>
            <div class="signin-body">
                <Form @submit="submitSignIn" :validation-schema="signInFormSchema">
                    <div class="form-group">
                        <label for="username">Tài khoản <span class="text-danger font-weight-bold">(*)</span></label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <i class="fa-regular fa-id-badge"></i>
                                </div>
                            </div>
                            <Field name="username" type="text" class="form-control" v-model="signInLocal.username"
                                placeholder="Tài khoản" />
                        </div>
                        <ErrorMessage name="username" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password">Mật khẩu <span class="text-danger font-weight-bold">(*)</span></label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend" style="width: 40px;">
                                <div class="input-group-text">
                                    <i class="fa-solid fa-lock"></i>
                                </div>
                            </div>
                            <Field name="password" type="password" class="form-control" v-model="signInLocal.password"
                                placeholder="Mật khẩu" />
                        </div>
                        <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary w-100 mt-1">Đăng nhập</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>

import { defineComponent, reactive } from 'vue';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:signin"],
    setup(props, context) {
        const signInLocal = reactive({
            username: "",
            password: "",
        });

        const signInFormSchema = yup.object().shape({
            username: yup.string().required("Số ĐDCN(CCCD)/CMND không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
        });

        const submitSignIn = () => {
            console.log(signInLocal);
            context.emit("submit:signin", signInLocal);
        }

        return {
            signInLocal,
            signInFormSchema,
            submitSignIn,
        }
    }
});

</script>
<style scoped>
@import "@/assets/css/form.css";

.signin-container {
    height: 100vh;
    margin: auto;

    display: flex;
    justify-content: center;
    align-items: center;
}

.signin {
    width: 400px;
    font-size: 14px;
}

.signin-body {
    padding: 30px;
    padding-top: 20px;
}

.signin-header {
    padding-block: 15px;
    font-size: 24px;
    font-weight: 800;
    border-bottom: 1px solid rgba(220, 220, 220, 0.287);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 10px;
}

.signin-header img {
    width: 50px;
}

label {
    font-weight: 600;
}
</style>