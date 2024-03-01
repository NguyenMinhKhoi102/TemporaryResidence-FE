<template>
    <div>
        <DataTable :data="dataSource" class="display" width="100%">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Class</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        data: { type: Array, default: [] },
    },
    setup(props, context) {
        const dataSource = props.data.map(obj => [obj.name, obj.age, obj.class])
        return {
            dataSource,
        }
    }
})
</script>
<style>
@import 'datatables.net-dt';
</style>