-- @block
CREATE TABLE "Coffee"(
  id SERIAL PRIMARY KEY NOT NULL,
  "ownerId" INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  notes VARCHAR(255),
  roast VARCHAR(255),
  favorite BOOLEAN,
  about TEXT,
  FOREIGN KEY ("ownerId") REFERENCES "User"(id)
);

-- @block
CREATE INDEX "coffeeIndex" ON "Coffee"(name);

-- @block
SELECT * FROM "Coffee";

-- @block
DROP TABLE "Coffee";