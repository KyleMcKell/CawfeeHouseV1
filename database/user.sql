-- @block
CREATE TABLE "User"(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  admin BOOLEAN NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- @block
CREATE INDEX "emailIndex" ON "User"(email);
CREATE INDEX "usernameIndex" ON "User"(username);
CREATE INDEX "idIndex" ON "User"(id);

-- @block
SELECT * FROM "User";

-- @block
DROP TABLE "User";