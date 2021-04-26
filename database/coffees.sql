-- @block
CREATE TABLE Coffees(
  id SERIAL,
  owner_id INT,
  coffee_name VARCHAR(255),
  brand VARCHAR(255),
  notes VARCHAR(255),
  about TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @block
ALTER TABLE Coffees
ADD COLUMN roast VARCHAR(255);

-- @block
INSERT INTO Coffees (owner_id, coffee_name, brand, notes, roast, about)
VALUES
  (1, 'Ethiopian', 'Consious', 'Coffee Cherries', 'light roast', 'This one is tasty and a light roast');

-- @block
SELECT * FROM Coffees;