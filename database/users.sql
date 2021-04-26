-- @block
CREATE TABLE Users(
  id SERIAL,
  firstname VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_pw VARCHAR(255),
  PRIMARY KEY (id)
);

-- @block
INSERT INTO Users (firstname, email, hashed_pw)
VALUES
  ('Kyle', 'hello@world.com', 'password'),
  ('Kil', 'hell@underworld.com', 'password123');

-- @block
CREATE INDEX email_index ON Users(email)

-- @block
SELECT * FROM Users


