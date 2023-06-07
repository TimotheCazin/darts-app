<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row justify="center">
                    <template v-for="(player, i) in players" :key="i">
                        <v-card class="big-border-bottom mt-2" :style="{ 'border-bottom-color': colors[i] }">
                        <v-card-item>
                            <v-card-title class="text-center text-h6">{{ player.name.slice(0,9) }}</v-card-title>
                            <v-card-subtitle class="text-center">Avg : 13</v-card-subtitle>
                        </v-card-item>
                        <v-card-text class="text-center">
                            <p class="text-h5 font-weight-bold">{{ player.score }}</p>
                        </v-card-text>
                        </v-card>
                    </template>
                </v-row>
                <v-row justify="center">
                    <v-col cols="8">
                        <v-card class="big-border-bottom mt-2" :style="{ 'border-bottom-color': colors[turn%this.players.length] }">
                            <v-card-item>
                                <v-card-title class="text-center text-h6">{{this.players[turn%this.players.length].name}}</v-card-title>
                                <v-card-subtitle class="text-center">{{ message(this.players[turn%this.players.length]) }}</v-card-subtitle>
                                <v-container>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-card variant="outlined">
                                                <v-card-title class="text-center font-weight-bold">{{ values_scored[0] }}</v-card-title>
                                            </v-card>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-card variant="outlined">
                                                <v-card-title class="text-center font-weight-bold">{{ values_scored[1] }}</v-card-title>
                                            </v-card>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-card variant="outlined">
                                                <v-card-title class="text-center font-weight-bold">{{ values_scored[2] }}</v-card-title>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer app fixed color="blue-grey-lighten-5">
        <v-container>
            <v-row>
                <v-col cols="auto"  class="my-auto"  v-if="this.turn !== 0">
                    Last : {{this.players[(turn-1)%this.players.length].name}} - {{ this.historic_values[this.historic_values.length-1].join('/') }}
                </v-col>
                <v-col cols="7"  class="my-auto"  v-else>
                </v-col>
                <v-col cols="auto" class="my-auto" v-if="(this.turn !==0) || (this.scores.length !==0) ">
                    <v-btn block @click="undo()">
                        UNDO
                    </v-btn>
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
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(1)">{{multi}}1</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(2)">{{multi}}2</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(3)">{{multi}}3</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(4)">{{multi}}4</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(5)">{{multi}}5</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(6)">{{multi}}6</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(7)">{{multi}}7</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(8)">{{multi}}8</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(9)">{{multi}}9</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(10)">{{multi}}10</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(11)">{{multi}}11</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(12)">{{multi}}12</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(13)">{{multi}}13</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(14)">{{multi}}14</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(15)">{{multi}}15</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(16)">{{multi}}16</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(17)">{{multi}}17</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(18)">{{multi}}18</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(19)">{{multi}}19</v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn block color="primary" @click="valueScored(20)">{{multi}}20</v-btn>
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
export default {
    name: 'X01Page',
    data() {
        return {
            players: this.$store.state.players,
            limit: this.$store.state.limit_x01,
            colors: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'teal'],
            turn:0,
            multi: "",
            values_scored: [],
            scores: [],
            historic_values : [],
            historic_scores : [],
        }
    },
    created() {
        this.initializeScores();
    },
    methods: {
        initializeScores() {
            this.players.forEach(player => {
                player.score = this.limit;
            });
        },
        valueScored(value) {
            if (this.scores.length < 3){
                if (this.multi == ""){
                this.values_scored.push(value.toString())
                this.scores.push(value)
                this.players[this.turn%this.players.length].score -= value
                }
                else if (this.multi == "D"){
                    this.values_scored.push('D'+value.toString())
                    this.scores.push(value*2)
                    this.players[this.turn%this.players.length].score -= value*2
                }
                else {
                    this.values_scored.push('T'+value.toString())
                    this.scores.push(value*3)
                    this.players[this.turn%this.players.length].score -= value*3
                }
                if (this.players[this.turn%this.players.length].score < 0) {
                    this.players[this.turn%this.players.length].score += this.scores.reduce((total, current) => total + current, 0)
                    while (this.values_scored.length < 3) {
                        this.values_scored.push("BUST");
                        this.scores.push(0)
                    }
                }
            }
            setTimeout(() => {
                if (this.values_scored.length == 3){
                this.historic_values.push(this.values_scored)
                this.historic_scores.push(this.scores)
                this.turn++
                this.scores = []
                this.values_scored = []
            }
            }, 2500);
        },
        message(player){
            if (player.score<0){
                return 'looser'
            }
        },
        undo(){
            if (this.values_scored.length ==0){
                if (this.historic_scores.length !== 0){
                    this.scores = this.historic_scores[this.historic_scores.length-1]
                    this.values_scored = this.historic_values[this.historic_values.length-1]
                }
                this.historic_scores.pop()
                this.historic_values.pop()
                this.turn--
            }
            this.values_scored.pop()
            let score_to_add = this.scores.pop()
            this.players[this.turn%this.players.length].score += score_to_add
        }
    },
    computed: {
    },
}
</script>

<style>
  .big-border-bottom {
    border-bottom: 5px solid;
  }
</style>