<template>
    <div class="statistics-page-container">
        <div class="statistics-elements-container">
            <div class="statistics-btn-container">
                <select name="statistics-filter" class="statistics-filter">
                    <option v-for="statisticOption in statisticsOption" :value="statisticOption">{{ statisticOption }}</option>
                </select>
            </div>
            <div class="statistics-widget-container">
                <div v-for="widget in widgets" class="statistics-widget">
                    <h2>{{ widget.name }}</h2>
                    <div class="statistics-data-container">
                        <font-awesome-icon :icon="`fa-solid ${widget.icon}`" />
                        <h3>{{ widget.data }}</h3>
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
export default {
    name: "statistics-component",
    data() {
        return {
            statisticsOption: [
                'Week',
                'Month',
                'Year'

            ],
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Visitors',
                        backgroundColor: '#05f509',
                        data: [40, 39, 10, 50, 39, 80, 40],
                        borderColor: '#05f509',
                        borderWidth: 1
                    },
                    {
                        label: 'Guests',
                        backgroundColor: '#0534ef',
                        data: [30, 20, 10, 40, 39, 90, 50],
                        borderColor: '#0534ef',
                        borderWidth: 1
                    },
                    {
                        label: 'Bookings',
                        backgroundColor: '#e01e07',
                        data: [60, 20, 10, 60, 39, 90, 50],
                        borderColor: '#e01e07',
                        borderWidth: 1
                    },
                    {
                        label: 'Income',
                        backgroundColor: '#e5e306',
                        data: [50, 20, 10, 10, 39, 90, 50],
                        borderColor: '#e5e306',
                        borderWidth: 1
                    }
                ]
            },
            widgets: [
                {
                    name: 'Web Site Visitors',
                    icon: 'fa-eye',
                    data: 23
                },
                {
                    name: 'Current Guests',
                    icon: 'fa-user',
                    data: 20
                },
                {
                    name: 'Bookings',
                    icon: 'fa-calendar-days',
                    data: 10
                },
                {
                    name: 'Income',
                    icon: 'fa-money-bill',
                    data: 300
                },
            ]
        }
    },
    computed: {
        chartOptions() {
            return {
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 120,
                        stepSize: 20,
                    }
                }
            };
        }
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
