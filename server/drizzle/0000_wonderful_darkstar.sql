CREATE TABLE `cart_products` (
	`id` varchar(21) NOT NULL,
	`cart_id` varchar(21) NOT NULL,
	`product_id` varchar(21) NOT NULL,
	`quantity` int NOT NULL,
	`total_price` double(13,2) NOT NULL,
	CONSTRAINT `cart_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` varchar(21) NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` varchar(21) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(21) NOT NULL,
	`name` varchar(100) NOT NULL,
	`price` double(13,2) NOT NULL,
	`stocks` int NOT NULL,
	`product_description` text,
	`category_id` varchar(21) NOT NULL,
	`product_img` text,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `cart_products` ADD CONSTRAINT `cart_products_cart_id_carts_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cart_products` ADD CONSTRAINT `cart_products_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE cascade;