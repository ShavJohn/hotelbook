<template>
    <div class="statistics-page-container">
        <div class="statistics-elements-container">
            <div class="statistics-btn-container">
                <select name="statistics-filter" @change="getStatistics()" class="statistics-filter" v-model="statisticFilter.filterType">
                    <option v-for="statisticOption in statisticsOption" :value="statisticOption.value">{{ statisticOption.name }}</option>
                </select>
            </div>
            <div class="statistics-widget-container">
                <div v-for="widget in widgets" class="statistics-widget">
                    <h2>{{ widget.name }}</h2>
                    <div class="statistics-data-container">
                        <font-awesome-icon :icon="`fa-solid ${widget.icon}`" />
                        <h3>
                            <template v-if="widget.data === 'visitors'">
                                {{ this.visitorsCount }}
                            </template>
                            <template v-if="widget.data === 'site-reloads'">
                                {{ this.pageReloadsCount }}
                            </template>
                            <template v-if="widget.data === 'guests'">
                                {{ this.guestsCount }}
                            </template>
                            <template v-if="widget.data === 'booking'">
                                {{ this.bookingsCount }}
                            </template>
                            <template v-if="widget.data === 'income'">
                                {{ this.incomeTotal }} $
                            </template>
                        </h3>
                    </div>
                </div>
            </div>
            <div class="statistics-chart-container">
                <line-chart :chartData="chartData" :options="chartOptions"></line-chart>
            </div>
        </div>
    </div>
</template>

<script>
import statisticsMixins from "../../../mixins/statistics-mixins"

export default {
    name: "statistics-component",
    mixins: [statisticsMixins],
    mounted() {
        this.getStatistics()
    }
}
</script>

<style scoped>

</style>
