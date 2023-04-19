import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutations";
import INotificacao from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import api from "@/http";
import ITarefa from "@/interfaces/ITarefa";


interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        projetos: [],
        notificacoes: [],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto
            state.projetos
                .push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos
                .findIndex(projeto => projeto.id === projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes
                .push(novaNotificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes
                    .filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }) {
            api.get('projetos')
                .then(res => commit(DEFINIR_PROJETOS, res.data))
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
            return api.post('projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO] (conxtexo , projeto: IProjeto) {
            return api.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO] ({ commit }, id: string) {
            return api.delete(`projetos/${id}`).then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS] ({ commit }) {
            api.get('tarefas')
                .then(res => commit(DEFINIR_TAREFAS, res.data))
        },
    }
})


export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}