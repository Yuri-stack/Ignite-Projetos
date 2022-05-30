import { createServer, Factory, Model, Response } from 'miragejs'
import faker from 'faker'

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

        // Gera fake datas em massa
        factories:{
            user: Factory.extend({
                name(i: number){
                    return `User ${i + 1}`
                },
                email(){
                    return faker.internet.email().toLocaleLowerCase()
                },
                createdAt(){
                    return faker.date.recent(10, new Date())
                }
            })
        },

        seeds(server){
            server.createList('user', 200)
        },

        routes(){
            this.namespace = 'api'  // Caminho que utilizamos para acessar as rotas. Ex: api/users
            this.timing = 750       // Setando um delay para testar carregamentos

            // Rotas

            this.get('/users', function (schema, request){  // Rota de Users com Paginação
                const { page = 1, per_page = 10 } = request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(page) - 1) * (Number(per_page))
                const pageEnd = pageStart + Number(per_page)

                const users = this.serialize(schema.all('user'))
                    .users.slice(pageStart, pageEnd)
                
                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                )

            })
            
            this.get('/users/:id')
            this.post('/users')
            
            // Reseta o namespace para não atrapalhar o api routing do Next
            this.namespace = '' 

            // Se a rota recebida não seja do Mirage, a app busca na api routing do Next
            this.passthrough()
        }
    })

    return server
}