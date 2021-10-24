const ApiErrorFactory = require('../../../../../../shared/factories/ApiErrorFactory')

const apiErrorFactory = ApiErrorFactory()

function ListAllProvidersUseCase(repository) {
  const execute = async () => {
    try {
      const response = await repository.findAll()
      return response
    } catch (error) {
      return apiErrorFactory.createError(
        'API Error',
        'CannotListAllProviders',
        400
      )
    }
  }

  return { execute }
}

module.exports = ListAllProvidersUseCase
