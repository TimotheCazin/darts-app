<template>
    <v-container>
        <v-row style="height:7vh;" align="center">
            <v-col :cols="12-($store.state.players.length*Math.trunc(12/($store.state.players.length+1)))" align="center" class="pa-0">
                <v-btn v-if="this.$store.state.cricket_history.length > 0" @click="return_last()" rounded="circle" color="primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20 16l-5.5 5.5l-1.42-1.41L16.17 17H10.5a6.5 6.5 0 1 1 0-13H18v2h-7.5C8 6 6 8 6 10.5S8 15 10.5 15h5.67l-3.08-3.09l1.41-1.41L20 16Z"/></svg></v-btn>
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                :cols="Math.trunc(12/($store.state.players.length+1))"
                align="center"
                :class="'px-0 bg-'+colors[i]"
                
            >
                {{ player.name }}
            </v-col>
            <v-divider></v-divider>
        </v-row>
        <v-row
            v-for="(data, index) in points_available"
            :key="index"
            style="height:12vh;"
             align="center"
        >
            <v-col
                :cols="12-($store.state.players.length*Math.trunc(12/($store.state.players.length+1)))"
                align="center"
            >
                {{ data["name"] }}
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                :cols="Math.trunc(12/($store.state.players.length+1))"
                style="height:100%;"
                :class="'pa-1 bg-'+colors[i]+'-lighten-3'"
                @click="handleClick(index, i, data['value'])"
                align="center"
            >
                <svg v-if="typeof $store.state.cricket_closings[index] !== 'undefined'" viewBox="0 0 100 100" height="100%" width="100%">
                    <circle v-if="$store.state.cricket_closings[index][i] >= 3" cx="50%" cy="50%" r="40%" stroke="black" stroke-width="8%" fill="transparent" />
                    <line v-if="$store.state.cricket_closings[index][i] >= 1" x1="20%" y1="80%" x2="80%" y2="20%" stroke="black" stroke-width="8%" />
                    <line v-if="$store.state.cricket_closings[index][i] >= 2" x1="20%" y1="20%" x2="80%" y2="80%" stroke="black" stroke-width="8%" />
                </svg>
            </v-col>
            <v-divider></v-divider>
        </v-row>
        <v-row style="height:7vh;">
            <v-col
                :cols="12-($store.state.players.length*Math.trunc(12/($store.state.players.length+1)))"
                align="center"
            >
                Points
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                :cols="Math.trunc(12/($store.state.players.length+1))"
                class="bg-brown"
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
            ],
            colors: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'teal']
        }
    },
    methods: {
        handleClick(index_points, i, points_to_add){
            this.$store.state.cricket_history.push({closings: this.$store.state.cricket_closings.map(x => x.map(y => y)), points: this.$store.state.cricket_points.map(x => x)})
            if(this.$store.state.cricket_closings[index_points][i] < 3)
                this.$store.state.cricket_closings[index_points][i] += 1;
            else{
                this.$store.state.players.forEach( function (_, i_player) {
                    if(this.$store.state.cricket_closings[index_points][i_player] < 3){
                        this.$store.state.cricket_points[i_player] += points_to_add
                    }
                }, this)
            }
        },
        return_last(){
            if(this.$store.state.cricket_history.length > 0){
                const last_turn = this.$store.state.cricket_history.pop()
                this.$store.state.cricket_closings = last_turn.closings
                this.$store.state.cricket_points = last_turn.points
            }
        }
    }
}
</script>