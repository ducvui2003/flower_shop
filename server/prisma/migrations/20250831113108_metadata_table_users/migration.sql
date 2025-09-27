/*
  Warnings:

  - Added the required column `created_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_by` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `created_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_by` VARCHAR(191) NOT NULL;
