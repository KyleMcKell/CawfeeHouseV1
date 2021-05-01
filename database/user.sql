-- @block
CREATE TABLE "User"(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- @block
CREATE INDEX "emailIndex" ON "User"(email);
CREATE INDEX "usernameIndex" ON "User"(username);

-- @block
SELECT * FROM "User"
