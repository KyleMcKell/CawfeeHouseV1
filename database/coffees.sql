-- @block
CREATE TABLE "Coffees"(
  id SERIAL PRIMARY KEY NOT NULL,
  "ownerId" INT NOT NULL, 
  "coffeeName" VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  notes VARCHAR(255),
  "roastType" VARCHAR(255),
  about TEXT,
  FOREIGN KEY ("ownerId") REFERENCES "Users"(id)
);

-- @block
CREATE INDEX "coffeeIndex" ON "Coffees"("coffeeName")

-- @block
SELECT * FROM "Coffees";