/*
  Warnings:

  - You are about to alter the column `postal_code` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `postal_code` VARCHAR(10) NOT NULL;
