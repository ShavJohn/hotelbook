<template>
    <div class="responsive-background-image position-relative" :style="roomData.main_image?.length && `background-image: url(${imagePrefix}/${roomData.main_image})`">
        <div class="background-image-filter">
            <div class="header-text-for-price">
                <span>{{ roomPrice }} ₽</span>
                <span>/Per Night</span>
            </div>
        </div>
    </div>
</template>

<script>
import roomMixins from "../../mixins/room-mixin";

export default {
    name: "room-page-header",
    mixins: [roomMixins],
    computed: {
        roomPrice() {
            let price = 0;
            let currentDate = new Date(this.bookingDate.startDate); // Convert to Date object
            let defaultPrice = this.roomData[this.localeLang].adult_price;
            const endDate = new Date(this.bookingDate.endDate); // Convert to Date object

            while (currentDate < endDate) {
                let currentDateFromPriceList = null;

                if (this.roomData.selectedType.price_list && this.roomData.selectedType.price_list.length) {
                    currentDateFromPriceList = this.roomData.selectedType.price_list.find(item => {
                        const startDate = new Date(item.startDate); // Convert to Date object
                        const endDate = new Date(item.endDate); // Convert to Date object
                        return currentDate >= startDate && currentDate <= endDate;
                    });
                }

                if (currentDateFromPriceList) {
                    price += currentDateFromPriceList.price;
                } else {
                    price += defaultPrice;
                }

                // Move to the next day
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return price;
        }
    }
}
</script>

<style scoped>

</style>
