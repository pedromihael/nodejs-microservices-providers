const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const { consumer, topic } = require('../../application/client/modules/project/infra/kafka/consumers')
const routes = require('../../application/client/modules/provider/infra/http/routes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(logger('dev'))

app.get('/health-check', (req, res) => {
  res.status(200).send("Yes sir, providing all those things 💂")
})

app.use(routes)


const run = async () => {
  app.listen(process.env.PORT || 3003, () => {
    console.log('Providers service is ready ✅');
  });

  await consumer.connect()
  await consumer.subscribe({ topic })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)

      const payload = message.value;

      console.log('payload', payload)

      // atualizar reliability do provider
    },
  })
}

run().catch(err => console.error(err))
