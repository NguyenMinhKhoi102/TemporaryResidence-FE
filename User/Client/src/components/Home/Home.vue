<template>
    <div class="home-component">
        <div class="input-group">
            <input type="text" class="form-control search" placeholder="Nhập từ khoá cần tìm kiếm"
                aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    components: {

    },
    setup(props, context) {

    }
});
</script>
<style>
.home-component {
    padding: 0 100px;

    .search {
        outline: none;
    }


}
</style>