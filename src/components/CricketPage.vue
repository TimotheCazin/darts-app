<template>
    <v-container>
        <v-row
            v-for="n in 5"
            :key="n"
        >
            <v-col
                cols="3"
            >
                {{ 20-n }}
            </v-col>
            <v-col
                v-for="i in 3"
                :key="i"
                cols="3"
                style="background-color: blue;"
                
                @click="handleClick(n, i)"
            >
            <v-responsive :aspect-ratio="1 / 1">
                <svg v-if="typeof closingBoxes[n] !== 'undefined'" height="100%" width="100%">
                    <circle v-if="closingBoxes[n][i] >= 3" cx="50%" cy="50%" r="40%" stroke="black" stroke-width="8%" fill="transparent" />
                    <line v-if="closingBoxes[n][i] >= 1" x1="20%" y1="80%" x2="80%" y2="20%" stroke="black" stroke-width="8%" />
                    <line v-if="closingBoxes[n][i] >= 2" x1="20%" y1="20%" x2="80%" y2="80%" stroke="black" stroke-width="8%" />
                </svg>
            </v-responsive>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'CricketPage',
    data() {
        return {
            closingBoxes: new Array(5).fill(new Array(3).fill(0))
        }
    },
    methods: {
        handleClick(test, i){
            this.closingBoxes[test][i] += 1;
            console.log(test, i)
            console.log(this.closingBoxes)
        }
    }
}
</script>