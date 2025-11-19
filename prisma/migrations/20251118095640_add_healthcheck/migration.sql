-- CreateTable
CREATE TABLE "healthcheck" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "healthcheck_pkey" PRIMARY KEY ("id")
);
