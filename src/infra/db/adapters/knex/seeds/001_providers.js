exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('provider')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('provider').insert([
        {
          name: 'Steve Nash',
        },
        {
          name: 'Nate McMillan',
        },
        {
          name: 'Mike Budenholzer',
        },
      ]);
    });
};
