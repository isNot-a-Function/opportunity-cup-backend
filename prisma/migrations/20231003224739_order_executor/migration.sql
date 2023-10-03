-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_doneExecutorId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_executorId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "doneExecutorId" DROP NOT NULL,
ALTER COLUMN "executorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "ExecutorInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_doneExecutorId_fkey" FOREIGN KEY ("doneExecutorId") REFERENCES "ExecutorInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
