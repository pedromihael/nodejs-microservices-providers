const { PostgresProviderRepository } = require('../../../../repositories/PostgresProviderRepository')

const UpdateProviderReliability = () => {
  const repository = PostgresProviderRepository()
  
  const execute = async (providerId, incidentSeverity) => {
    const provider = await repository.findById(providerId)
    
    if (provider && !provider.hasOwnProperty('isApiError')) {
      let newReliability = provider.reliability_percentage - ((provider.reliability_percentage / 100) * incidentSeverity)
      newReliability = newReliability <= 0 ? 0 : newReliability
      
      const res = await repository.save(providerId, { field: 'reliability_percentage', value: newReliability })
      
      return { ...res, newValue: newReliability };
    }

    return null
  }

  return { execute }
}

module.exports = { UpdateProviderReliability }