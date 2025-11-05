/*
  Warnings:

  - You are about to drop the column `fileKey` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `scaleFactor` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Plan_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Plan" ("id", "projectId") SELECT "id", "projectId" FROM "Plan";
DROP TABLE "Plan";
ALTER TABLE "new_Plan" RENAME TO "Plan";
CREATE TABLE "new_ProjectMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectMember" ("id", "projectId", "role", "userId") SELECT "id", "projectId", "role", "userId" FROM "ProjectMember";
DROP TABLE "ProjectMember";
ALTER TABLE "new_ProjectMember" RENAME TO "ProjectMember";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
