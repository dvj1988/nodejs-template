/**
 * @typedef {import('knex')} knex
 */

class OrderRepository {
  /**
   * constructor for Order Repository Class
   * @param  {knex} knexClient [Knex Client connection]
   */
  constructor(knexClient) {
    this.knexClient = knexClient;
  }

  getById(id) {
    return this.knexClient('orders')
      .select([
        'id',
        'user_id AS userId',
        'created_at AS createdAt',
        'updated_at AS updatedAt'
      ])
      .where('orders.id', id)
      .andWhere('deleted_at', null)
      .first();
  }

  getItemsByOrderId(orderId) {
    return this.knexClient('order_items')
      .select([
        'items.id AS id',
        'order_items.quantity AS quantity',
        'items.name',
        'items.description'
      ])
      .leftJoin('items', 'order_items.item_id', 'items.id')
      .where('order_items.order_id', orderId)
      .andWhere('order_items.deleted_at', null);
  }

  addItemToOrder(order_id, { itemId: item_id, quantity }) {
    return this.knexClient('order_items').insert({
      order_id,
      item_id,
      quantity
    });
  }

  updateItemOfOrder(order_id, { itemId: item_id, quantity }) {
    return this.knexClient('order_items')
      .update({
        quantity
      })
      .where('order_id', order_id)
      .andWhere('item_id', item_id);
  }

  list() {
    return this.knexClient
      .select([
        'id',
        'user_id AS userId',
        'created_at AS createdAt',
        'updated_at AS updatedAt'
      ])
      .from('orders')
      .where('deleted_at', null);
  }

  create({ userId: user_id }) {
    return this.knexClient('orders').insert({
      user_id
    });
  }

  deleteById(id) {
    return this.knexClient
      .update({
        deleted_at: new Date()
      })
      .into('orders')
      .where('id', id);
  }
}

module.exports = knexClient => new OrderRepository(knexClient);
