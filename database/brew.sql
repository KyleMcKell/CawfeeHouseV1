-- @block
CREATE TABLE "Brew"(
  id SERIAL PRIMARY KEY NOT NULL,
  "ownerId" INT NOT NULL,
  "methodId" INT NOT NULL,
  "coffeeId" INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  flavorings VARCHAR(255),
  favorite BOOLEAN,
  about TEXT,
  FOREIGN KEY ("ownerId") REFERENCES "User"(id),
  FOREIGN KEY ("methodId") REFERENCES "Method"(id),
  FOREIGN KEY ("coffeeId") REFERENCES "Coffee"(id)
);

-- @block
CREATE INDEX "brewIndex" ON "Brew"(name);

-- @block
SELECT * FROM "Brew";

-- @block
DROP TABLE "Brew";