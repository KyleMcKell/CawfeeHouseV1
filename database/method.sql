-- @block
CREATE TABLE "Method"(
  id SERIAL PRIMARY KEY NOT NULL,
  "ownerId" INT NOT NULL,
  "methodName" VARCHAR(255) NOT NULL,
  about TEXT,
  FOREIGN KEY ("ownerId") REFERENCES "User"(id)
);

-- @block
CREATE INDEX "methodIndex" ON "Method"("methodName");

-- @block
SELECT * FROM "Method";

-- @block
DROP TABLE "Method";