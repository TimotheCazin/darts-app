<template>
    <v-container>
        <circular-menu @process="processClickMenu($event)" :menuCount=2 :icon-class=iconsMenu :menu-url-list=listMenu backgroundColor="#1d3557"></circular-menu>
        <v-row style="height:7vh;" align="center">
            <v-col :cols="12-($store.state.players.length*Math.trunc(12/($store.state.players.length+1)))" align="center" class="pa-0">
                <v-btn v-if="this.$store.state.cricket_history.length > 0" @click="return_last()" size="small" color="grey-darken-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20 16l-5.5 5.5l-1.42-1.41L16.17 17H10.5a6.5 6.5 0 1 1 0-13H18v2h-7.5C8 6 6 8 6 10.5S8 15 10.5 15h5.67l-3.08-3.09l1.41-1.41L20 16Z"/></svg></v-btn>
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                :cols="Math.trunc(12/($store.state.players.length+1))"
                align="center"
                :class="'px-0 bg-'+colors[i]"
                style="height:100%;"
            >
                {{ player.name }}
            </v-col>
            <v-divider></v-divider>
        </v-row>
        <v-row
            v-for="(data, index) in points_available"
            :key="index"
            style="height:11vh;"
            align="center"
        >
            <v-col
                :cols="12-($store.state.players.length*Math.trunc(12/($store.state.players.length+1)))"
                align="center"
            >
                <v-avatar color="grey-lighten-2" class="text-black font-weight-bold">
                    {{ data["name"] }}
                </v-avatar>
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                :cols="Math.trunc(12/($store.state.players.length+1))"
                style="height:100%; position: relative;"
                :class="'pa-1 bg-'+colors[i]+'-lighten-3'"
                @click="handleClick(index, i, data)"
                align="center"
            >
                <svg v-if="typeof $store.state.cricket_closings[index] !== 'undefined'" viewBox="0 0 100 100" height="100%" width="100%">
                    <circle v-if="$store.state.cricket_closings[index][i] >= 3" cx="50%" cy="50%" r="40%" stroke="black" stroke-width="8%" fill="transparent" />
                    <line v-if="$store.state.cricket_closings[index][i] >= 1" x1="20%" y1="80%" x2="80%" y2="20%" stroke="black" stroke-width="8%" />
                    <line v-if="$store.state.cricket_closings[index][i] >= 2" x1="20%" y1="20%" x2="80%" y2="80%" stroke="black" stroke-width="8%" />
                </svg>
                <div style="position: absolute; bottom: 0; right: 2px; font-size: 0.7em;">{{ data["name"] }}</div>
            </v-col>
            <v-divider></v-divider>
        </v-row>
        <v-row style="height:7vh;">
            <v-col
                :cols="12-($store.state.players.length*Math.trunc(12/($store.state.players.length+1)))"
                align="center"
                class="font-weight-bold"
            >
                Points
            </v-col>
            <v-col
                v-for="(player, i) in $store.state.players"
                :key="i"
                :cols="Math.trunc(12/($store.state.players.length+1))"
                :class="'bg-'+colors[i]+'-lighten-2 text-black font-weight-bold'"
                align="center"
            >
                {{ $store.state.cricket_points[i] }}
            </v-col>
        </v-row>
        <v-row style="height:7vh;" align="center" justify="center">
            <v-chip v-if="$store.state.cricket_last_darts.length > 0" class="py-5">
                <span class="mr-1">Historique :</span>
                <v-chip-group style="display: block;">
                    <v-chip v-for="i in ($store.state.cricket_last_darts.length > 5 ? 5 : $store.state.cricket_last_darts.length)" :key="i" :class='"bg-"+colors[$store.state.cricket_last_darts[$store.state.cricket_last_darts.length-i].player]'>
                        {{ $store.state.cricket_last_darts[$store.state.cricket_last_darts.length-i].score }}
                    </v-chip>
                </v-chip-group>
            </v-chip>
        </v-row>
        <WinnerDialog :winner_name="winner_name" :dialog_winner_input="dialog_winner"></WinnerDialog>
    </v-container>
</template>
<script>
import CircularMenu from "@/components/CircularMenu.vue"
import WinnerDialog from "@/components/WinnerDialog.vue"
export default {
    name: 'CricketPage',
    components: {
        CircularMenu,
        WinnerDialog
    },
    data() {
        return {
            iconsMenu: ["mdi mdi-home", "mdi mdi-restart"],
            listMenu: [{isLink:true, url:"/"}, {isLink:false, function: this.restart}],
            points_available: [
                {value: 20, name: '20'},
                {value: 19, name: '19'},
                {value: 18, name: '18'},
                {value: 17, name: '17'},
                {value: 16, name: '16'},
                {value: 15, name: '15'},
                {value: 25, name: 'Bull'}
            ],
            colors: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'teal'],
            dialog_winner: false,
            winner_name: '',
        }
    },
    methods: {
        handleClick(index_points, i, points){
            this.$store.state.cricket_history.push({closings: this.$store.state.cricket_closings.map(x => x.map(y => y)), points: this.$store.state.cricket_points.map(x => x)})
            if(this.$store.state.cricket_closings[index_points][i] < 3)
                this.$store.state.cricket_closings[index_points][i] += 1;
            else{
                this.$store.state.players.forEach( function (_, i_player) {
                    if(this.$store.state.cricket_closings[index_points][i_player] < 3){
                        this.$store.state.cricket_points[i_player] += points['value']
                    }
                }, this)
            }
            if(this.$store.state.cricket_closings.every(x => x[i] == 3) && this.$store.state.cricket_points.every(x => (this.$store.state.cricket_points[i] <= x))){
                this.winner_name = this.$store.state.players[i].name
                this.dialog_winner = true
            }
            this.$store.state.cricket_last_darts.push({player: i, score: points['name']})
        },
        return_last(){
            if(this.$store.state.cricket_history.length > 0){
                const last_turn = this.$store.state.cricket_history.pop()
                this.$store.state.cricket_closings = last_turn.closings
                this.$store.state.cricket_points = last_turn.points
                this.$store.state.cricket_last_darts.pop()
            }
        },
        restart(){
            this.$store.dispatch('initializeCricket')
        },
        processClickMenu(e){
            (this.listMenu[e].function)()
        },
    },
    mounted(){
        this.$store.dispatch('initializeCricket')
    }
}
</script>