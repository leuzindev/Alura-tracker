import { TipoDeNotificacao } from "@/interfaces/INotificacao"
import { NOTIFICAR } from "@/store/mutations-types"
import { store } from "@/store"

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoDeNotificacao, titulo: string, texto: string) : void {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo,
            })
        }
    }
} 