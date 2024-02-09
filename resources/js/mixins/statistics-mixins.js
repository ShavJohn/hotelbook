export default {
    data() {
        return {
            statisticFilter: {
                filterType: 'week'
            },
            statisticsOption: [
                {
                    name: 'Week',
                    value: 'week'
                },
                {
                    name: 'Month',
                    value: 'month'
                },
                {
                    name: 'Year',
                    value: 'year'
                },
                {
                    name: 'All Time',
                    value: 'all_time'
                },
            ],
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Visitors',
                        backgroundColor: '#a8e767',
                        data: [],
                        borderColor: '#a8e767',
                        borderWidth: 1
                    },
                    {
                        label: 'Double Visits',
                        backgroundColor: '#67b2e7',
                        data: [],
                        borderColor: '#67b2e7',
                        borderWidth: 1
                    },
                    {
                        label: 'Active Guest',
                        backgroundColor: '#f05e5e',
                        data: [],
                        borderColor: '#f05e5e',
                        borderWidth: 1
                    },
                    {
                        label: 'Bookings',
                        backgroundColor: '#C19B77',
                        data: [],
                        borderColor: '#C19B77',
                        borderWidth: 1
                    },
                    {
                        label: 'Income',
                        backgroundColor: '#05f509',
                        data: [],
                        borderColor: '#05f509',
                        borderWidth: 1
                    }
                ]
            },
            widgets: [
                {
                    name: 'Web Site Visitors',
                    icon: 'fa-eye',
                    data: 'visitors'
                },
                {
                    name: 'Web Site Reload',
                    icon: 'fa-eye',
                    data: 'site-reloads'
                },
                {
                    name: 'Current Guests',
                    icon: 'fa-user',
                    data: 'guests'
                },
                {
                    name: 'Bookings',
                    icon: 'fa-calendar-days',
                    data: 'booking'
                },
                {
                    name: 'Income',
                    icon: 'fa-money-bill',
                    data: 'income'
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
                        stepSize: 20,
                    }
                }
            };
        },
        visitors() {
            return this.$store.getters['statistics/getVisitors']
        },
        visitorsCount() {
            return this.$store.getters['statistics/getVisitorsCount']
        },
        pageReloads() {
            return this.$store.getters['statistics/getPageReloads']
        },
        pageReloadsCount() {
            return this.$store.getters['statistics/getPageReloadsCount']
        },
        guests() {
            return this.$store.getters['statistics/getGuests']
        },
        guestsCount() {
            return this.$store.getters['statistics/getGuestsCount']
        },
        bookings() {
            return this.$store.getters['statistics/getBookings']
        },
        bookingsCount() {
            return this.$store.getters['statistics/getBookingsCount']
        },
        income() {
            return this.$store.getters['statistics/getIncome']
        },
        incomeTotal() {
            return this.$store.getters['statistics/getIncomeTotal']
        },
    },
    methods: {
        getStatistics() {
            this.$store.dispatch('statistics/getStatistics', this.statisticFilter).then(res => {
                if(res.data.success) {
                    this.chartData.labels  = this.visitors.x
                    this.chartData.datasets[0].data = this.visitors.y
                    this.chartData.datasets[1].data = this.pageReloads.y
                    this.chartData.datasets[2].data = this.guests.y
                    this.chartData.datasets[3].data = this.bookings.y
                    this.chartData.datasets[4].data = this.income.y
                }
            })
        }
    }
}
