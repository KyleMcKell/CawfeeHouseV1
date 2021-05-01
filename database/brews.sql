-- @block
CREATE TABLE "Brews"(
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
  FOREIGN KEY ("ownerId") REFERENCES "Users"(id),
  FOREIGN KEY ("methodId") REFERENCES "Methods"(id),
  FOREIGN KEY ("coffeeId") REFERENCES "Coffees"(id)
);

-- @block
CREATE INDEX "brewIndex" ON "Brews"("brewName")

-- @block
SELECT * FROM "Brews";