<template>
    <v-app>
        <v-main>
            <circular-menu @process="processClickMenu($event)" :menuCount=2 :icon-class=iconsMenu :menu-url-list=listMenu backgroundColor="#1d3557"></circular-menu>
            <v-container>
                <v-row justify="center">
                    <template v-for="(player, i) in players" :key="i">
                        <v-card class="big-border-bottom mt-2" :style="{ 'border-bottom-color': colors[i] }">
                        <v-card-item>
                            <v-card-title class="text-center text-h6">{{ player.name.slice(0,9) }}</v-card-title>
                            <v-card-subtitle class="text-center">Avg : {{ player.avg }}</v-card-subtitle>
                        </v-card-item>
                        <v-card-text class="text-center">
                            <p class="text-h5 font-weight-bold">{{ player.score }}</p>
                        </v-card-text>
                        </v-card>
                    </template>
                </v-row>
                <v-row justify="center" v-if="this.nb_players > 0">
                    <v-col cols="8" v-if="!this.is_bust">
                        <v-card class="big-border-bottom mt-2" :style="{ 'border-bottom-color': colors[turn%this.nb_players] }">
                            <v-card-item>
                                <v-card-title class="text-center text-h6">{{this.players[turn%this.nb_players].name}}</v-card-title>
                                <v-container>
                                    <v-row>
                                        <v-col v-for="num in 3" :key="num" cols="4">
                                            <v-card variant="outlined">
                                                <v-card-title class="text-center font-weight-bold">{{ currentDarts[num-1] }}</v-card-title>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-item>
                        </v-card>
                    </v-col>
                    <v-col cols="8" v-else>
                        <v-card class="class-busted mt-2" :style="{ 'border-color': colors[(turn-1)%this.nb_players] }">
                            <v-card-item>
                                <v-card-title class="text-center text-h6">{{this.players[(turn-1)%this.nb_players].name}} busted !</v-card-title>
                                <v-card-subtitle class="text-center text-h6">
                                    Looooser <v-icon icon="mdi-skull-crossbones"></v-icon>
                                </v-card-subtitle>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer app fixed color="blue-grey-lighten-5">
            <v-container>
                <v-row>
                    <v-col cols="auto" class="my-auto" v-if="(this.turn !==0) || (this.num_dart !== 1)">
                        <v-btn @click="undo()" rounded="circle" color="primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m20 16l-5.5 5.5l-1.42-1.41L16.17 17H10.5a6.5 6.5 0 1 1 0-13H18v2h-7.5C8 6 6 8 6 10.5S8 15 10.5 15h5.67l-3.08-3.09l1.41-1.41L20 16Z"/></svg></v-btn>
                    </v-col>
                    <v-col cols="auto"  class="my-auto"  v-if="this.turn !== 0">
                        <p class="font-weight-bold">Last : {{this.players[(turn-1)%this.nb_players].name}} - {{ lastPlayerDarts.join('/') }}</p>
                    </v-col>
                    <v-col cols="7"  class="my-auto"  v-else>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10" class="my-auto mx-0">
                        <v-btn-toggle
                            v-model="multi"
                            divided
                            color="primary"
                            variant="outlined"
                            group
                            compact
                            mandatory
                        >
                            <v-btn value="">
                            Simple
                            </v-btn>
                            <v-btn value="D">
                            Double
                            </v-btn>
                            <v-btn value="T">
                            Triple
                            </v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col cols="2" class="my-auto">
                        <v-btn block color="primary" @click="valueScored(0)">0</v-btn>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col v-for="num in 20" :key="num" cols="2">
                        <v-btn block color="primary" @click="valueScored(num)">{{multi}}{{num}}</v-btn>
                    </v-col>
                    <v-col cols="2" v-if="multi==''">
                        <v-btn block color="primary" @click="valueScored(25)">25</v-btn>
                    </v-col>
                    <v-col cols="2" v-if="multi=='D'">
                        <v-btn block color="primary" @click="valueScored(25)">BULL</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </v-app>
</template>
<script>
import CircularMenu from "@/components/CircularMenu.vue"
export default {
    name: 'X01Page',
    components: {
        CircularMenu,
    },
    data() {
        return {
            iconsMenu: ["mdi mdi-home", "mdi mdi-restart"],
            listMenu: [{isLink:true, url:"/"}, {isLink:false, function: this.restart}],
            players: this.$store.state.players,
            nb_players: 0,
            limit: this.$store.state.limit_x01,
            colors: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'teal'],
            turn: 0,
            multi: "",
            num_dart: 1,
            is_bust: false
        }
    },
    created() {
        this.initializeScores();
        this.initializeHistorics();
        this.initializeNbPlayers();
        this.initializeAvgs();
    },
    methods: {
        initializeScores() {
            this.players.forEach(player => {
                player.score = this.limit;
            });
        },
        initializeHistorics() {
            this.players.forEach(player => {
                player.historic = [];
            });
        },
        initializeNbPlayers() {
            this.nb_players = this.players.length;
        },
        initializeAvgs() {
            this.players.forEach(player => {
                player.avg = 0;
            });
        },
        valueScored(value) {
            let have_bust = 0
            if (this.num_dart < 4){
                let value_string = this.multi+value.toString()
                if (this.multi == "D"){
                    value = value*2
                }
                else if (this.multi == "T"){
                    value = value*3
                }
                this.players[this.turn%this.nb_players].score -= value
                let hist = this.players[this.turn%this.nb_players].historic
                let current_leg = Math.floor(this.turn/this.nb_players)+1
                if (this.players[this.turn%this.nb_players].score < 0) {
                    let leg_loop = current_leg
                    let i = hist.length
                    while (leg_loop == current_leg){
                        i = i-1
                        leg_loop = hist[i]['leg']
                    }
                    let score_last_leg = hist[i]['score_after']
                    this.players[this.turn%this.nb_players].score = score_last_leg
                    have_bust = 1
                }
                hist.push({
                    'leg': Math.floor(this.turn/this.nb_players)+1,
                    'dart_in_leg': this.num_dart,
                    'score_dart': value,
                    'value_dart': value_string,
                    'score_after': this.players[this.turn%this.nb_players].score
                })
                this.players[this.turn%this.nb_players].avg = this.getAvg(this.players[this.turn%this.nb_players])
                this.num_dart++
            }
            if (have_bust == 1){
                this.is_bust = true;
                setTimeout(() => {
                    this.is_bust = false
                }, 1500);
                this.turn++
                this.num_dart = 1
            }
            setTimeout(() => {
                if (this.num_dart == 4){
                this.turn++
                this.num_dart = 1
            }
            }, 1500);
        },
        undo(){
            if (this.num_dart == 1){ //Retour au joueur précédent
                this.turn = this.turn-1
            }
            let current_player = this.turn%this.nb_players
            let current_player_historic = this.players[current_player].historic
            current_player_historic.pop()
            if (current_player_historic.length - 1 >= 0){
                let last_score = current_player_historic[current_player_historic.length - 1]['score_after']
                this.players[current_player].score = last_score
            }
            else {
                this.players[current_player].score = this.limit
            }
            this.num_dart = this.num_dart - 1
            if (this.num_dart == 0){ 
                this.num_dart = 3
            }
            this.players[current_player].avg = this.getAvg(this.players[current_player])
        },
        getAvg(player){
            let hist = player.historic
            if (hist.length == 0){
                return 0
            }
            let listScores = hist.map(item => item.score_dart)
            let sumScores = listScores.reduce((acc, score) => acc + score, 0)
            let mean = sumScores / listScores.length
            let round = mean.toFixed(2)
            return parseFloat(round)
        },
        restart(){
            this.initializeScores()
            this.turn = 0
            this.multi = ""
            this.values_scored = []
            this.scores = []
            this.historic_values = []
            this.historic_scores = []
        },
        processClickMenu(e){
            (this.listMenu[e].function)()
        },
    },
    computed: {
        lastPlayerDarts(){
            let last_player = (this.turn-1)%this.nb_players
            let last_player_historic = this.players[last_player].historic
            let nb_darts = last_player_historic[last_player_historic.length - 1]['dart_in_leg']
            let last_darts = []
            for (let i = last_player_historic.length - nb_darts; i <= last_player_historic.length - 1; i++) {
                last_darts.push(last_player_historic[i]['value_dart'])
            }
            return last_darts
        },
        currentDarts(){
            let current_darts = []
            if (this.num_dart > 1){
                let current_player = this.turn%this.nb_players
                let current_player_historic = this.players[current_player].historic
                for (let i = current_player_historic.length - this.num_dart + 1; i <= current_player_historic.length - 1; i++) {
                    current_darts.push(current_player_historic[i]['value_dart'])
                }
            }
            return current_darts
        },
        currentScores(){
            let current_scores = []
            if (this.num_dart > 1){
                let current_player = this.turn%this.nb_players
                let current_player_historic = this.players[current_player].historic
                for (let i = current_player_historic.length - this.num_dart + 1; i <= current_player_historic.length - 1; i++) {
                    current_scores.push(current_player_historic[i]['score_dart'])
                }
            }
            return current_scores
        }
    },
}
</script>

<style>
  .big-border-bottom {
    border-bottom: 5px solid;
  }
  .class-busted {
    border: 5px solid;
    background-color: mistyrose;
  }
</style>