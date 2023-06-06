<template>
    <v-container>
        <v-row>
            <v-col cols="3">
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                cols="3"
            >
                {{ player.name }}
            </v-col>
        </v-row>
        <v-row
            v-for="(data, index) in points_available"
            :key="index"
        >
            <v-col
                cols="3"
            >
                {{ data["name"] }}
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                cols="3"
                style="background-color: blue;"
                @click="handleClick(index, i, data['value'])"
            >
            <v-responsive :aspect-ratio="1 / 1">
                <svg v-if="typeof $store.state.cricket_closings[index] !== 'undefined'" height="100%" width="100%">
                    <circle v-if="$store.state.cricket_closings[index][i] >= 3" cx="50%" cy="50%" r="40%" stroke="black" stroke-width="8%" fill="transparent" />
                    <line v-if="$store.state.cricket_closings[index][i] >= 1" x1="20%" y1="80%" x2="80%" y2="20%" stroke="black" stroke-width="8%" />
                    <line v-if="$store.state.cricket_closings[index][i] >= 2" x1="20%" y1="20%" x2="80%" y2="80%" stroke="black" stroke-width="8%" />
                </svg>
            </v-responsive>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                cols="3"
            >
                Points
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                cols="3"
                style="background-color: red;"
            >
                {{ $store.state.cricket_points[i] }}
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'CricketPage',
    data() {
        return {
            points_available: [
                {value: 20, name: '20'},
                {value: 19, name: '19'},
                {value: 18, name: '18'},
                {value: 17, name: '17'},
                {value: 16, name: '16'},
                {value: 15, name: '15'},
                {value: 25, name: 'Bull'}
            ]
        }
    },
    methods: {
        handleClick(index_points, i, points_to_add){
            if(this.$store.state.cricket_closings[index_points][i] < 3)
                this.$store.state.cricket_closings[index_points][i] += 1;
            else{
                this.$store.state.players.forEach( function (_, i_player) {
                    if(this.$store.state.cricket_closings[index_points][i_player] < 3){
                        this.$store.state.cricket_points[i_player] += points_to_add
                    }
                }, this)
            }
        }
    }
}
</script>