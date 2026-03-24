/*
  Warnings:

  - You are about to drop the column `category` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "category",
ADD COLUMN     "category_id" UUID;

-- CreateTable
CREATE TABLE "workTime" (
    "wt_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "day" INTEGER NOT NULL,
    "startTime" TIMETZ(6) NOT NULL,
    "endTime" TIMETZ(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workTime_pkey" PRIMARY KEY ("wt_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");

-- AddForeignKey
ALTER TABLE "workTime" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "auth_user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "fk_category" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
