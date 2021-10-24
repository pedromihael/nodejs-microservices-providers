const ApiErrorFactory = require('../../../../../../shared/factories/ApiErrorFactory')

const apiErrorFactory = ApiErrorFactory()

function GetProviderByNameUseCase(repository) {
  const execute = async id => {
    if (id) {
      const response = await repository.findByName(name)
      return response
    } else {
      return apiErrorFactory.createError(
        'API Error',
        'GetProviderWithMissingName',
        400
      )
    }
  }

  return { execute }
}

module.exports = GetProviderByNameUseCase
