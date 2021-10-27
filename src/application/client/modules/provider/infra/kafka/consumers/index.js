const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'incidents-issuer',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
});

const topic = 'update-provider-reliability'
const consumer = kafka.consumer({ groupId: 'provider-reliability-update-group' })

module.exports = { consumer, topic }