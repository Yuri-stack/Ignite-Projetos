import { createServer, Model } from 'miragejs'

type User = {
    name: string
    email: string
    created_at: string
}

export function makeServer(){
    const server = createServer({
        models:{
            user: Model.extend<Partial<User>>({})
        },

        routes(){
            this.namespace = 'api'  // Caminho que utilizamos para acessar as rotas. Ex: api/users
            this.timing = 750   // setando um delay para testar carregamentos

            // rotas
            this.get('/users')
            this.post('/users')
            
            // Reseta o namespace para não atrapalhar o api routing do Next
            this.namespace = '' 

            // Se a rota recebida não seja do Mirage, a app busca na api routing do Next
            this.passthrough()
        }
    })

    return server
}