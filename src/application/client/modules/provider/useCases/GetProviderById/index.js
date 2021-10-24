const ApiErrorFactory = require('../../../../../../shared/factories/ApiErrorFactory')

const apiErrorFactory = ApiErrorFactory()

function GetProviderByIdUseCase(repository) {
  const execute = async id => {
    if (id) {
      const response = await repository.findById(id)
      return response
    } else {
      return apiErrorFactory.createError(
        'API Error',
        'GetProviderWithMissingId',
        400
      )
    }
  }

  return { execute }
}

module.exports = GetProviderByIdUseCase
