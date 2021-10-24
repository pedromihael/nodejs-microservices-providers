const {
  CreateProviderUseCase,
  UpdateProviderUseCase,
  GetProviderByIdUseCase,
  ListAllProvidersUseCase,
  GetProviderByNameUseCase,
  DeleteProviderUseCase
} = require('../../useCases')

const { PostgresProviderRepository } = require('../../repositories/PostgresProviderRepository')
const repository = PostgresProviderRepository()

const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const listAllProvidersUseCase = ListAllProvidersUseCase(repository)
  const response = await listAllProvidersUseCase.execute()

  if (response.isApiError) res.status(response.code).send(response)
  
  else res.send(response)

  res.send(response)
})

router.get('/:id', async (req, res) => {
  const getProviderByIdUseCase = GetProviderByIdUseCase(repository)
  const response = await getProviderByIdUseCase.execute(req.params.id)

  if(!response) res.status(404).send({ok: false, message: 'not found'})

  if (response.isApiError) res.status(response.code).send(response)
  
  else res.send(response)
})

router.get('/name/:name', async (req, res) => {
  const getProviderByNameUseCase = GetProviderByNameUseCase(repository)
  const response = await getProviderByNameUseCase.execute(req.params.name)

  if(!response) res.status(404).send({ok: false, message: 'not found'})

  if (response.isApiError) res.status(response.code).send(response)
  
  else res.send(response)
})

router.post('/', async (req, res) => {
  const createProviderUseCase = CreateProviderUseCase(repository)
  const response = await createProviderUseCase.execute(req.body)

  if (response.isApiError) res.status(response.code).send(response)
  
  else res.send(response)
})

router.put('/:id', async (req, res) => {
  const data = req.body
  const updateProviderUseCase = UpdateProviderUseCase(repository)
  const response = await updateProviderUseCase.execute(req.params.id, data)

  if (response.isApiError) res.status(response.code).send(response)
  
  else res.send(response)})

router.delete('/:id', async (req, res) => {
  const deleteProviderUseCase = DeleteProviderUseCase(repository)
  const response = await deleteProviderUseCase.execute(req.params.id)

  res.send(response)
})

module.exports = router