<template>
    <v-container>
        <circular-menu :menuCount=2 :icon-class=iconsMenu :menu-url-list=listMenu backgroundColor="#1d3557"></circular-menu>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/target.svg')"
            height="200"
          />
        </v-col>

        
        <v-col cols="12" sm="6" md="4">
            <v-dialog
            v-model="dialog_x01"
            width="auto"
            max-width="600px"
            >
                <template v-slot:activator="{ props }">
                    <v-btn block rounded="lg" size="x-large" v-bind="props">X01</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">Paramètres de la partie</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row justify="center">
                            <v-col>
                                <p class="text-h6">Limite :</p>
                            </v-col> 
                        </v-row>
                        <v-row class="text-center">
                            <v-col cols="12">
                                <v-btn-toggle
                                    v-model="limit"
                                    divided
                                    color="primary"
                                    variant="outlined"
                                    group
                                >
                                    <v-btn value="301">
                                    301
                                    </v-btn>
                                    <v-btn value="501">
                                    501
                                    </v-btn>
                                    <v-btn value="701">
                                    701
                                    </v-btn>
                                    <v-btn value="901">
                                    901
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col>
                                <p class="text-h6">Joueurs :</p>
                            </v-col> 
                        </v-row>
                        <v-row justify="center">
                            <template v-for="(player, i) in players" :key="i">
                                <v-chip
                                class="ma-1"
                                color="primary"
                                label
                                >
                                <v-icon start icon="mdi-account-circle-outline"></v-icon>
                                    {{ player.name }}
                                <v-icon end icon="mdi-close-circle-outline" @click="removePlayer(i)"></v-icon>
                                </v-chip>
                            </template>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="7">
                            <v-text-field
                                v-model="newPlayer"
                                density="compact"
                                variant="solo"
                                label="Nouveau"
                                append-inner-icon="mdi-plus-circle-outline"
                                single-line
                                hide-details
                                @keyup.enter="addPlayer"
                                @click:append-inner="addPlayer"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        @click="dialog_x01 = false"
                    >
                        Fermer
                    </v-btn>
                    <v-btn
                        color="blue-darken-1"
                        @click="launchGame"
                    >
                        Lancer partie
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-dialog
            v-model="dialog_cricket"
            width="auto"
            max-width="600px"
            >
                <template v-slot:activator="{ props }">
                    <v-btn block rounded="lg" size="x-large" v-bind="props">Cricket</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">Paramètres de la partie</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row justify="center">
                            <v-col>
                                <p class="text-h6">Joueurs :</p>
                            </v-col> 
                        </v-row>
                        <v-row justify="center">
                            <template v-for="(player, i) in players" :key="i">
                                <v-chip
                                class="ma-1"
                                color="primary"
                                label
                                >
                                <v-icon start icon="mdi-account-circle-outline"></v-icon>
                                    {{ player.name }}
                                <v-icon end icon="mdi-close-circle-outline" @click="removePlayer(i)"></v-icon>
                                </v-chip>
                            </template>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="7">
                            <v-text-field
                                v-model="newPlayer"
                                density="compact"
                                variant="solo"
                                label="Nouveau"
                                append-inner-icon="mdi-plus-circle-outline"
                                single-line
                                hide-details
                                @keyup.enter="addPlayer"
                                @click:append-inner="addPlayer"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        @click="dialog_cricket = false"
                    >
                        Fermer
                    </v-btn>
                    <v-btn
                        color="blue-darken-1"
                        @click="launchCricket"
                    >
                        Lancer partie
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import CircularMenu from "@/components/CircularMenu.vue"
  export default {
    name: 'WelcomePage',
    components: {
        CircularMenu,
    },
    data() {
        return {
            iconsMenu: ["mdi mdi-home", "mdi mdi-account"],
            listMenu: [{isLink:true, url:"/"}, {isLink:true, url: "/"}],
            dialog_x01: false,
            dialog_cricket: false,
            limit: "301",
            newPlayer: '',
            players: this.$store.state.players,
        }
    },
    methods: {
        addPlayer() {
            if (this.newPlayer.trim() !== '') {
                    this.players.push({ name: this.newPlayer })
                this.newPlayer = ''
            }
        },
        removePlayer(index) {
            this.players.splice(index, 1)
        },
        launchGame() {
            this.dialog_x01 = false
            this.$store.state.players = this.players
            this.$store.state.limit_x01 = this.limit
            this.$router.push('/x01')
        },
        launchCricket() {
            this.dialog_cricket = false
            this.$store.state.players = this.players
            this.$router.push('/cricket')
        }
    },
    computed: {
  }
  }
  </script>
  