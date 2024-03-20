import {fastify} from 'fastify'
import {DataBaseMemory} from './database-memory.js'

const server = fastify()

const database = new DataBaseMemory()


//Rotas
server.post('/videos', (request, reply) => {
const {title, description, duration} = request.body

    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})
server.get('/videos', () => {
    const videos = database.list()
    
    return videos
})
server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204)//resposta sucesso, mas vazia
})
server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

//porta para acesso localhost
server.listen({
    port:3333,
})