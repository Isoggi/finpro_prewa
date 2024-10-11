-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lng` DOUBLE NOT NULL,
    `lat` DOUBLE NOT NULL,
    `province_id` INTEGER NOT NULL,
    `district_id` INTEGER NOT NULL,
    `detail` VARCHAR(255) NULL,

    INDEX `district_id`(`district_id`),
    INDEX `province_id`(`province_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `district` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `province_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `province_id`(`province_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `category_id` INTEGER NOT NULL,
    `address_id` INTEGER NOT NULL,
    `slug_address` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `properties_slug_address_key`(`slug_address`),
    INDEX `address_id`(`address_id`),
    INDEX `category_id`(`category_id`),
    INDEX `tenant_id`(`tenant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties_rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `property_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10, 0) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `image` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `property_id`(`property_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties_rooms_availability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `isCanceled` BOOLEAN NOT NULL DEFAULT false,

    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties_rooms_peakseasonrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `rates` INTEGER NOT NULL,
    `rateCategory` ENUM('every', 'once') NULL,

    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `province` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `property_id` INTEGER NOT NULL,
    `rating` INTEGER NULL,
    `comment` TEXT NULL,
    `prev_review_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `property_id`(`property_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tenants` (
    `id` INTEGER NOT NULL,
    `bankAccount` ENUM('BCA', 'Mandiri', 'BRI', 'BNI', 'BankJago', 'Jenius') NOT NULL,
    `accountNumber` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `total_price` DECIMAL(10, 0) NOT NULL,
    `status` ENUM('waitingpayment', 'confirmed', 'cancelled') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `room_id`(`room_id`),
    INDEX `transaction_id`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `invoice_number` VARCHAR(255) NULL,
    `amount` DECIMAL(10, 0) NOT NULL,
    `payment_method` ENUM('manual', 'doku', 'midtrans', 'other') NOT NULL,
    `payment_proof` VARCHAR(255) NULL,
    `status` ENUM('pending', 'completed', 'failed') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `role` ENUM('user', 'tenant') NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `verified_at` DATETIME NULL,
    `forget_password_token` TEXT NULL,
    `image` VARCHAR(255) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TenantsToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TenantsToUsers_AB_unique`(`A`, `B`),
    INDEX `_TenantsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `province`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_ibfk_2` FOREIGN KEY (`district_id`) REFERENCES `district`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `district` ADD CONSTRAINT `district_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `province`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `properties_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`tenant_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `properties_rooms` ADD CONSTRAINT `properties_rooms_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `properties_rooms_availability` ADD CONSTRAINT `properties_rooms_availability_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `properties_rooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `properties_rooms_peakseasonrate` ADD CONSTRAINT `properties_rooms_peakseasonrate_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `properties_rooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction_items` ADD CONSTRAINT `transactionitems_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction_items` ADD CONSTRAINT `transactionitems_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `properties_rooms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_TenantsToUsers` ADD CONSTRAINT `_TenantsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `tenants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TenantsToUsers` ADD CONSTRAINT `_TenantsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
