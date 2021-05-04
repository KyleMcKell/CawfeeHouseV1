-- @block
CREATE TABLE "Brew"(
  id SERIAL PRIMARY KEY NOT NULL,
  "ownerId" INT NOT NULL,
  "methodId" INT NOT NULL,
  "coffeeId" INT NOT NULL,
  "brewName" VARCHAR(255) NOT NULL,
  ratio INT,
  "brewTime" INT,
  "waterTemp" INT,
  flavorings VARCHAR(255),
  "grindSize" VARCHAR(255),
  ingredients VARCHAR(255),
  "isFavorite" BOOLEAN DEFAULT FALSE NOT NULL ,
  about text,
  FOREIGN KEY ("ownerId") REFERENCES "User"(id),
  FOREIGN KEY ("methodId") REFERENCES "Method"(id),
  FOREIGN KEY ("coffeeId") REFERENCES "Coffee"(id)
);

-- @block
CREATE INDEX "brewIndex" ON "Brew"("brewName")

-- @block
SELECT * FROM "Brew";

-- @block
DROP TABLE "Brew";