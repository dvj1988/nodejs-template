/**
 * @typedef {import('knex')} knex
 */

class ItemRepository {
  /**
   * constructor for Item Repository Class
   * @param  {knex} knexClient [Knex Client connection]
   */
  constructor(knexClient) {
    this.knexClient = knexClient;
  }

  getById(id) {
    return this.knexClient
      .select([
        'id',
        'name',
        'description',
        'created_at AS createdAt',
        'updated_at AS updatedAt'
      ])
      .from('items')
      .where('id', id)
      .andWhere('deleted_at', null)
      .first();
  }

  list() {
    return this.knexClient
      .select([
        'id',
        'name',
        'description',
        'created_at AS createdAt',
        'updated_at AS updatedAt'
      ])
      .from('items')
      .where('deleted_at', null);
  }

  create({ name, description }) {
    return this.knexClient('items').insert({
      name,
      description
    });
  }

  deleteById(id) {
    return this.knexClient
      .update({
        deleted_at: new Date()
      })
      .into('items')
      .where('id', id);
  }

  update(id, { name, description }) {
    return this.knexClient('items')
      .update({
        name,
        description
      })
      .where('id', id)
      .andWhere('deleted_at', null);
  }
}

module.exports = knexClient => new ItemRepository(knexClient);
