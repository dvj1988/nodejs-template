/**
 * @typedef {import('knex')} knex
 */

class UserRepository {
  /**
   * constructor for User Repository Class
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
        'email',
        'created_at AS createdAt',
        'updated_at AS updatedAt'
      ])
      .from('users')
      .where('id', id)
      .andWhere('deleted_at', null)
      .first();
  }

  list() {
    return this.knexClient
      .select([
        'id',
        'name',
        'email',
        'created_at AS createdAt',
        'updated_at AS updatedAt'
      ])
      .from('users')
      .where('deleted_at', null);
  }

  create({ name, email }) {
    return this.knexClient('users').insert({
      name,
      email
    });
  }

  deleteById(id) {
    return this.knexClient
      .update({
        deleted_at: new Date()
      })
      .into('users')
      .where('id', id);
  }

  update(id, { name, email }) {
    return this.knexClient('users')
      .update({
        name,
        email
      })
      .where('id', id)
      .andWhere('deleted_at', null);
  }
}

module.exports = knexClient => new UserRepository(knexClient);
