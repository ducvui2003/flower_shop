-- AlterTable
ALTER TABLE `users` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `created_by` VARCHAR(191) NULL,
    MODIFY `deleted_at` DATETIME(3) NULL,
    MODIFY `deleted_by` VARCHAR(191) NULL,
    MODIFY `updated_by` VARCHAR(191) NULL,
    MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;
