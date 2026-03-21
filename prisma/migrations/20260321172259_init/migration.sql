-- CreateTable
CREATE TABLE "auth_user" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fname" TEXT,
    "lname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "is_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "task" (
    "task_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT,
    "description" TEXT,
    "category" TEXT,
    "status" TEXT,
    "start_time" TIMETZ(6),
    "end_time" TIMETZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID,

    CONSTRAINT "task_pkey" PRIMARY KEY ("task_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_email_key" ON "auth_user"("email");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "auth_user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
