CREATE TABLE IF NOT EXISTS "cart_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"cart_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"total_price" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"price" double precision NOT NULL,
	"stocks" integer NOT NULL,
	"product_description" varchar(1000)
);
--> statement-breakpoint
DROP TABLE "todos";