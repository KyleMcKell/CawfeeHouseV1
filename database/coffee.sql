-- @block
CREATE TABLE "Coffee"(
  id SERIAL PRIMARY KEY NOT NULL,
  "ownerId" INT NOT NULL, 
  "coffeeName" VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  notes VARCHAR(255),
  "roastType" VARCHAR(255),
  about TEXT,
  FOREIGN KEY ("ownerId") REFERENCES "User"(id)
);

-- @block
CREATE INDEX "coffeeIndex" ON "Coffee"("coffeeName")

-- @block
SELECT * FROM "Coffee";