<template>
    <v-dialog
        v-model="dialog_winner"
        width="auto"
        >
        <v-card class="h-75">
            <v-card-title align="right" class="pb-0">
                <v-btn
                    icon="mdi-close"
                    @click="dialog_winner = false"
                    density="compact"
                    variant="text"
                >
                </v-btn>
            </v-card-title>
            <v-card-text class="h-75">
                <v-img src="@/assets/winner.gif" height="200"></v-img>
                Félicitations à {{ winner_name }} qui gagne la partie !
            </v-card-text>
            <v-card-actions>
            <v-btn color="primary" @click="dialog_winner = false; $store.dispatch('initializeCricket')">Recommencer</v-btn>
            <v-btn color="primary" @click="dialog_winner = false; $router.push('/')">Nouveau jeu</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'WinnerDialog',
    data(){
        return {
            dialog_winner: false,
        }
    },
    props: [
        'winner_name',
        'dialog_winner_input'
    ],
    watch: {
        dialog_winner_input(){
            this.dialog_winner = this.dialog_winner_input;
        }
    }
}
</script>

<style>

</style>