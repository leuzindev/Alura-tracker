<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>

    </section>
</template>


<script lang="ts">


import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ALTERAR_PROJETO } from '@/store/tipo-acoes';
import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import { CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import useNotificador from '@/hooks/notificador'

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String,
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(projeto => projeto.id === this.id)
            console.log(projeto)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto,
                }).then(() => this.lidarComSucesso())
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(() => this.lidarComSucesso())
            }
        },
        lidarComSucesso() {
            this.nomeDoProjeto = ''
            this.notificar(
                TipoDeNotificacao.SUCESSO,
                'Excelente !',
                'O projeto foi cadastrado com sucesso !'
            )
            this.$router.push('/projetos')
        }

    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar

        }
    }
})

</script>

<style scoped>
.label {
    color: var(--texto-primario);
}
</style>