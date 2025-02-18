-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PROJECT', 'ADMIN', 'SUPER_ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ProjectAprovalStatus" AS ENUM ('PENDING', 'REVIEWING', 'DECLINED', 'APPROVED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255),
    "userName" TEXT,
    "profileImage" TEXT,
    "referrerId" TEXT,
    "refferralId" TEXT,
    "companyName" TEXT,
    "companyWebsite" TEXT,
    "country" TEXT,
    "state" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectImage" TEXT,
    "projectLocation" TEXT,
    "projectAddress" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "category" TEXT NOT NULL,
    "fundingGoal" INTEGER NOT NULL DEFAULT 0,
    "MinimumInvestment" INTEGER NOT NULL DEFAULT 0,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "status" "ProjectAprovalStatus" NOT NULL DEFAULT 'PENDING',
    "projectDocument" TEXT[],
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "socials" TEXT[],
    "teamImage" TEXT,
    "projectId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_refferralId_key" ON "User"("refferralId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectAddress_key" ON "Project"("projectAddress");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("refferralId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
