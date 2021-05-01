-- @block
CREATE TABLE "Methods"(
  id SERIAL PRIMARY KEY NOT NULL,
  "ownerId" INT NOT NULL,
  "methodName" VARCHAR(255) NOT NULL,
  about TEXT,
  FOREIGN KEY ("ownerId") REFERENCES "Users"(id)
);

-- @block
CREATE INDEX "methodIndex" ON "Methods"("methodName");

-- @block
SELECT * FROM "Methods";