<template>
    <div class="usercontrol-all">
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="Date" prop="date" />
            <el-table-column label="Name" prop="name" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        Edit
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
  tableData.splice(index,1)
  console.log(tableData);
}
let tableData = reactive([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'John',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Morgan',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },{
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles',
    },
])

</script>

<style lang="less" scoped>
.usercontrol-all{
    height: calc(100vh - 5rem);
    width: 100%;
    overflow:scroll;
}
</style>