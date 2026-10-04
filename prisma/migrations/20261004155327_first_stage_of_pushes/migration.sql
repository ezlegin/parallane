/*
  Warnings:

  - The values [ACTIVE,DISABLED] on the enum `CouponStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [WEB_DESIGN,FRONTEND,BACKEND] on the enum `CourseCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [DRAFT,PUBLISHED] on the enum `CourseStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [FIXED,PERCENTAGE] on the enum `DiscountType` will be removed. If these variants are still used in the database, this will fail.
  - The values [VIDEO,DOCUMENT] on the enum `LessonType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MONTHLY,ANNUAL] on the enum `MembershipPeriod` will be removed. If these variants are still used in the database, this will fail.
  - The values [ACTIVE,EXPIRED] on the enum `MembershipStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,SUCCESS,FAILED] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [USER,TUTOR] on the enum `TutorMessageRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `certificateNumber` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Certificate` table. All the data in the column will be lost.
  - You are about to alter the column `discountAmount` on the `Coupon` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `discountAmount` on the `CouponUsage` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `lastWatchedAt` on the `CourseProgress` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `LessonProgress` table. All the data in the column will be lost.
  - You are about to drop the column `lastWatchedAt` on the `LessonProgress` table. All the data in the column will be lost.
  - You are about to drop the column `watchedSeconds` on the `LessonProgress` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Membership` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `totalAmount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `discountAmount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `paidAmount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[serial]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enrollmentId]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reviewId]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reference]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[membershipId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authority]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enrollmentId` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serial` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classroomId` to the `LessonProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `TutorConversation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TutorConversationStatus" AS ENUM ('replied', 'waiting');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('replied', 'waiting');

-- CreateEnum
CREATE TYPE "CourseProgressStatus" AS ENUM ('notStarted', 'inProgress', 'completed');

-- AlterEnum
BEGIN;
CREATE TYPE "CouponStatus_new" AS ENUM ('active', 'disabled');
ALTER TABLE "public"."Coupon" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Coupon" ALTER COLUMN "status" TYPE "CouponStatus_new" USING ("status"::text::"CouponStatus_new");
ALTER TYPE "CouponStatus" RENAME TO "CouponStatus_old";
ALTER TYPE "CouponStatus_new" RENAME TO "CouponStatus";
DROP TYPE "public"."CouponStatus_old";
ALTER TABLE "Coupon" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CourseCategory_new" AS ENUM ('webDesign', 'frontEnd', 'backEnd');
ALTER TABLE "Course" ALTER COLUMN "category" TYPE "CourseCategory_new" USING ("category"::text::"CourseCategory_new");
ALTER TYPE "CourseCategory" RENAME TO "CourseCategory_old";
ALTER TYPE "CourseCategory_new" RENAME TO "CourseCategory";
DROP TYPE "public"."CourseCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CourseStatus_new" AS ENUM ('draft', 'published');
ALTER TABLE "public"."Course" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Course" ALTER COLUMN "status" TYPE "CourseStatus_new" USING ("status"::text::"CourseStatus_new");
ALTER TYPE "CourseStatus" RENAME TO "CourseStatus_old";
ALTER TYPE "CourseStatus_new" RENAME TO "CourseStatus";
DROP TYPE "public"."CourseStatus_old";
ALTER TABLE "Course" ALTER COLUMN "status" SET DEFAULT 'draft';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "DiscountType_new" AS ENUM ('fixed', 'percentage');
ALTER TABLE "Payment" ALTER COLUMN "discountType" TYPE "DiscountType_new" USING ("discountType"::text::"DiscountType_new");
ALTER TABLE "Coupon" ALTER COLUMN "discountType" TYPE "DiscountType_new" USING ("discountType"::text::"DiscountType_new");
ALTER TYPE "DiscountType" RENAME TO "DiscountType_old";
ALTER TYPE "DiscountType_new" RENAME TO "DiscountType";
DROP TYPE "public"."DiscountType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LessonType_new" AS ENUM ('video', 'doc');
ALTER TABLE "Lesson" ALTER COLUMN "type" TYPE "LessonType_new" USING ("type"::text::"LessonType_new");
ALTER TYPE "LessonType" RENAME TO "LessonType_old";
ALTER TYPE "LessonType_new" RENAME TO "LessonType";
DROP TYPE "public"."LessonType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MembershipPeriod_new" AS ENUM ('monthly', 'annual');
ALTER TABLE "Membership" ALTER COLUMN "period" TYPE "MembershipPeriod_new" USING ("period"::text::"MembershipPeriod_new");
ALTER TYPE "MembershipPeriod" RENAME TO "MembershipPeriod_old";
ALTER TYPE "MembershipPeriod_new" RENAME TO "MembershipPeriod";
DROP TYPE "public"."MembershipPeriod_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MembershipStatus_new" AS ENUM ('active', 'inactive', 'expired');
ALTER TABLE "public"."Membership" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Membership" ALTER COLUMN "status" TYPE "MembershipStatus_new" USING ("status"::text::"MembershipStatus_new");
ALTER TYPE "MembershipStatus" RENAME TO "MembershipStatus_old";
ALTER TYPE "MembershipStatus_new" RENAME TO "MembershipStatus";
DROP TYPE "public"."MembershipStatus_old";
ALTER TABLE "Membership" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('pending', 'success', 'failed');
ALTER TABLE "public"."Payment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "public"."PaymentStatus_old";
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TutorMessageRole_new" AS ENUM ('user', 'tutor');
ALTER TABLE "TutorMessage" ALTER COLUMN "role" TYPE "TutorMessageRole_new" USING ("role"::text::"TutorMessageRole_new");
ALTER TYPE "TutorMessageRole" RENAME TO "TutorMessageRole_old";
ALTER TYPE "TutorMessageRole_new" RENAME TO "TutorMessageRole";
DROP TYPE "public"."TutorMessageRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_userId_fkey";

-- DropForeignKey
ALTER TABLE "CouponUsage" DROP CONSTRAINT "CouponUsage_userId_fkey";

-- DropForeignKey
ALTER TABLE "CourseProgress" DROP CONSTRAINT "CourseProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "LessonProgress" DROP CONSTRAINT "LessonProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_membershipId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "TutorConversation" DROP CONSTRAINT "TutorConversation_userId_fkey";

-- DropIndex
DROP INDEX "Certificate_certificateNumber_key";

-- DropIndex
DROP INDEX "Lesson_seasonId_idx";

-- DropIndex
DROP INDEX "Lesson_seasonId_order_key";

-- DropIndex
DROP INDEX "Membership_userId_key";

-- DropIndex
DROP INDEX "Season_courseId_idx";

-- DropIndex
DROP INDEX "Season_courseId_order_key";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "certificateNumber",
DROP COLUMN "url",
ADD COLUMN     "enrollmentId" TEXT NOT NULL,
ADD COLUMN     "reviewId" TEXT NOT NULL,
ADD COLUMN     "serial" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "summary" TEXT NOT NULL,
ALTER COLUMN "discountAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "status" SET DEFAULT 'active';

-- AlterTable
ALTER TABLE "CouponUsage" ALTER COLUMN "discountAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "learn" TEXT[],
ALTER COLUMN "status" SET DEFAULT 'draft';

-- AlterTable
ALTER TABLE "CourseProgress" DROP COLUMN "lastWatchedAt",
ADD COLUMN     "stats" "CourseProgressStatus" NOT NULL DEFAULT 'notStarted',
ALTER COLUMN "totalLessons" DROP DEFAULT,
ALTER COLUMN "percentage" SET DEFAULT 0,
ALTER COLUMN "percentage" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "reference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LessonProgress" DROP COLUMN "completed",
DROP COLUMN "lastWatchedAt",
DROP COLUMN "watchedSeconds",
ADD COLUMN     "classroomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "reference" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'active',
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "authority" TEXT,
ADD COLUMN     "reference" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "totalAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "discountAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "paidAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TutorConversation" ADD COLUMN     "status" "TutorConversationStatus" NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TutorMessage" ADD COLUMN     "lessonId" TEXT;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "phoneNumber" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "isOnboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "status" "ContactStatus" NOT NULL DEFAULT 'waiting',
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "responseMessage" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "conversationId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE INDEX "PasswordResetToken_expiresAt_idx" ON "PasswordResetToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Review_enrollmentId_key" ON "Review"("enrollmentId");

-- CreateIndex
CREATE INDEX "Review_courseId_idx" ON "Review"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_courseId_key" ON "Review"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_enrollmentId_key" ON "Classroom"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_conversationId_key" ON "Classroom"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_serial_key" ON "Certificate"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_enrollmentId_key" ON "Certificate"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_reviewId_key" ON "Certificate"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_reference_key" ON "Enrollment"("reference");

-- CreateIndex
CREATE INDEX "Lesson_seasonId_order_idx" ON "Lesson"("seasonId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_reference_key" ON "Membership"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reference_key" ON "Payment"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_membershipId_key" ON "Payment"("membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_authority_key" ON "Payment"("authority");

-- CreateIndex
CREATE INDEX "Season_courseId_order_idx" ON "Season"("courseId", "order");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponUsage" ADD CONSTRAINT "CouponUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "TutorConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorConversation" ADD CONSTRAINT "TutorConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorMessage" ADD CONSTRAINT "TutorMessage_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
