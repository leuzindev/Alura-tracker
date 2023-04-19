<template>
    <div class="notificacoes">
        <article 
            class="message" 
            v-for="noticacao in notificacoes" 
            :key="noticacao.id"
            :class="contexto[noticacao.tipo ]"
        >
            <div class="message-header">
                <p>{{ noticacao.titulo }}</p>
            </div>
            <div class="message-body">
                {{ noticacao.texto }}
            </div>
        </article>

    </div>
</template>


<script lang="ts">
import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'Notificacoes',
    data () {
        return{
            contexto :{
                [TipoDeNotificacao.SUCESSO]: 'is-success',
                [TipoDeNotificacao.ATENCAO]: 'is-warning',
                [TipoDeNotificacao.FALHA]: 'is-danger',
            }
        }
    },
    setup() {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>


<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 10;
}
</style>