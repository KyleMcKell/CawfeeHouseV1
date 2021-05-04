-- @block
CREATE TABLE "Method"(
  id SERIAL PRIMARY KEY NOT NULL,
  "ownerId" INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  equipment VARCHAR(255),
  ingredients VARCHAR(255),
  "brewTime" INT,
  temperature INT,
  "grindSize" VARCHAR(255),
  ratio INT,
  favorite BOOLEAN, 
  about TEXT,
  FOREIGN KEY ("ownerId") REFERENCES "User"(id)
);

-- @block
CREATE INDEX "methodIndex" ON "Method"(name);

-- @block
SELECT * FROM "Method";

-- @block
DROP TABLE "Method";