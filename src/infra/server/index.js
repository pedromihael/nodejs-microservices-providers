const express = require('express')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const { consumer, topic } = require('../../application/client/modules/provider/infra/kafka/consumers')
const { UpdateProviderReliability } = require('../../application/client/modules/provider/infra/kafka/actions/UpdateProviderReliability')
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
    eachMessage: async ({ message }) => {

      const payload = { value: `${message.value}` }

      const provider = payload.value.split("::")[0]
      const severity = payload.value.split("::")[1]

      const updateProviderReliability = UpdateProviderReliability()
      const res = await updateProviderReliability.execute(provider, severity)

      if (res) {
        console.log("new reliability value: ", res.newValue)
      }
    },
  })
}

run().catch(err => console.error(err))
