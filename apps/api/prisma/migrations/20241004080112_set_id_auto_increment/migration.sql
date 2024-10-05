-- Active: 1723605661265@@127.0.0.1@3306@finpro_prwa
/*
  Warnings:

  - You are about to alter the column `verified_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `transaction_items` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `transactions` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `users` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `verified_at` DATETIME NULL;
