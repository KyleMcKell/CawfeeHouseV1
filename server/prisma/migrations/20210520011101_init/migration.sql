-- CreateTable
CREATE TABLE "Brew" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "methodId" INTEGER NOT NULL,
    "coffeeId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "flavorings" VARCHAR(255),
    "favorite" BOOLEAN,
    "about" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coffee" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255),
    "notes" VARCHAR(255),
    "roast" VARCHAR(255),
    "favorite" BOOLEAN,
    "about" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Method" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "equipment" VARCHAR(255),
    "ingredients" VARCHAR(255),
    "brewTime" INTEGER,
    "temperature" INTEGER,
    "grindSize" VARCHAR(255),
    "ratio" INTEGER,
    "favorite" BOOLEAN,
    "about" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "brewIndex" ON "Brew"("name");

-- CreateIndex
CREATE INDEX "coffeeIndex" ON "Coffee"("name");

-- CreateIndex
CREATE INDEX "methodIndex" ON "Method"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE INDEX "emailIndex" ON "User"("email");

-- CreateIndex
CREATE INDEX "usernameIndex" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Brew" ADD FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD FOREIGN KEY ("methodId") REFERENCES "Method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Method" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coffee" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
