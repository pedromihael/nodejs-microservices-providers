const knex = require('../../../../../infra/db/adapters/knex')
const ApiErrorFactory = require('../../../../../shared/factories/ApiErrorFactory')

const errorFactory = ApiErrorFactory()

function PostgresProviderRepository() {
  const create = async data => {
    try {
      const { name } = data
      await knex('provider').insert({ name });

      return { ok: true }
    } catch (error) {
      return errorFactory.createError(error, 'createProvider')
    }
   }
  
  const findAll = async () => {
    try {
      const results = await knex('provider').orderBy('id')
      return results
    } catch (error) {
      return errorFactory.createError(error, 'findAllProviders')
    }
   }
  
  const findById = async id => {
    try {
      const result = await knex('provider').where({ id })
      if (result.length) {
        return result[0]
      } else {
        return null
      }
    } catch (error) {
      return errorFactory.createError(error, 'findProviderById')
    }
  }

  const findByName = async (name) => {
    try {
      const result = await knex('provider').where({ name });
      return result[0];
    } catch (error) {
      return errorFactory.createError(error, 'findProviderByName')
    }
  };
  
  const remove = async id => {
    try {  
      await knex('provider').where({ id }).delete();

      return { ok: true };
    } catch (error) {
      return errorFactory.createError(error, 'deleteProvider');
    }
  }

  const save = async (id, data) => {
    try {
      const { field, value } = data
      await knex('provider')
        .update({ [`${field}`]: value })
        .where({ id });
  
      return { ok: true };
    } catch (error) {
      return errorFactory.createError(error, 'updateProvider');
    }
  }
  
  return {
    create,
    findAll,
    findById,
    findByName,
    remove,
    save
  }
}

module.exports = { PostgresProviderRepository }