<template>
    <v-container>
        <v-row justify="center">
            <template v-for="(player, i) in players" :key="i">
                <v-card class="mt-2">
                <v-card-item>
                    <v-card-title class="text-center text-h5">{{player.name}}</v-card-title>

                    <v-card-subtitle class="text-center">Avg : 13</v-card-subtitle>
                </v-card-item>

                <v-card-text class="text-center">
                    <p class="text-h4">301</p>
                </v-card-text>
                </v-card>
            </template>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'X01Page',
    data() {
        return {
            players: this.$store.state.players,
            limit: this.$store.state.limit_x01,
        }
    },
    methods: {
    },
    computed: {
    },
}
</script>