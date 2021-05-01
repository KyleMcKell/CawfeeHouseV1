-- @block
CREATE TABLE "Users"(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- @block
CREATE INDEX "emailIndex" ON "Users"(email);
CREATE INDEX "usernameIndex" ON "Users"(username);

-- @block
SELECT * FROM "Users"
