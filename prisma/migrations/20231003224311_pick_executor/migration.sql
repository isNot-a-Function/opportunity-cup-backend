/*
  Warnings:

  - A unique constraint covering the columns `[orderId,executorId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doneExecutorId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `executorId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "doneExecutorId" TEXT NOT NULL,
ADD COLUMN     "executorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Response_orderId_executorId_key" ON "Response"("orderId", "executorId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "ExecutorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_doneExecutorId_fkey" FOREIGN KEY ("doneExecutorId") REFERENCES "ExecutorInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
