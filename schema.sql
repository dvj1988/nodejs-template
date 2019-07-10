-- users orders, items, order_items
SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS nodejs_training;
CREATE DATABASE nodejs_training;
USE nodejs_training;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT UNSIGNED NOT NULL,
    name VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
    email VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS items;
CREATE TABLE items (
    id INT UNSIGNED NOT NULL,
    name VARCHAR(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
    description VARCHAR(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS order_items;
CREATE TABLE order_items (
    id INT UNSIGNED NOT NULL,
    order_id INT UNSIGNED NOT NULL,
    item_id INT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);
