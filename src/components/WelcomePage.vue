<template>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/target.svg')"
            contain
            height="200"
          />
        </v-col>

        
        <v-col cols="12" sm="6" md="4">
            <v-dialog
            v-model="dialog_x01"
            width="auto"
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
                        <v-row>
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
                        @click="dialog_x01 = false"
                    >
                        Valider
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-btn block rounded="lg" size="x-large">Cricket</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  
  export default {
    name: 'WelcomePage',
  
    data() {
        return {
            dialog_x01: false,
            limit: "301",
        }
  },
  }
  </script>
  