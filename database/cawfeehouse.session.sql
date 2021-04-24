-- @block
CREATE TABLE Users(
  id SERIAL,
  firstname VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
)

-- @block
INSERT INTO Users (firstname, email)
VALUES 
  ('helloworld', 'hello@world.com'),
  ('holdmunda', 'hola@munda.com'),
  ('bonjourmonde', 'bonjour@monde.com');

-- @block
SELECT * FROM Users
ORDER BY id DESC
LIMIT 2;

-- @block
CREATE INDEX email_index ON Users(email);

-- @block
CREATE TABLE Coffees(
  id SERIAL,
  owner_id INT NOT NULL,
  coffee_name VARCHAR(255),
  brand VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @block
INSERT INTO Coffees (owner_id, coffee_name, brand)
VALUES 
  (1, 'panama', 'bean cycle'),
  (1, 'ethiopia layyoo', 'harbinger'),
  (1, 'gross', 'folgers');