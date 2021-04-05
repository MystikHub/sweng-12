<template>
  <div class="w-100">
    <h5 id="selector-label">Showing data for:</h5>
    <el-select v-model="value" placeholder="Select a store" class="w-100" @change="onStoreChanged">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
  </div>
</template>

<script>
import constants from '../constants'
const axios = require('axios').default;

export default {
    name: "StoreSelector",
    data() {
        return {
            options: [],
            value: ''
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            // Get the list of stores
            let options = await axios.get(`${constants.api_server}/all_stores`)
                .then(function (response) {
                    let options = []
                    response.data.forEach(store => {
                        options.push({value: store, label: store})
                    })

                    console.log(options)

                    return options
                })
                .catch(function (error) {
                    console.log("Something went wrong!")
                    console.log(error)
                })
            this.options = options
            this.value = options[0].value
        },
        onStoreChanged(newStore) {
            this.$emit("storeChanged", newStore)
        }
    }
}
</script>

<style scoped>
#selector-label {
    margin-bottom: 10px;
}

.w-100 {
    width: 100%;
}
</style>