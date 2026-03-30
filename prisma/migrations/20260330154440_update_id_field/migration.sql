/*
  Warnings:

  - A unique constraint covering the columns `[wt_id,user_id]` on the table `workTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "workTime_wt_id_user_id_key" ON "workTime"("wt_id", "user_id");
