-- @block
CREATE TABLE Brews(
  id SERIAL,
  owner_id INT,
  method_id INT,
  coffee_id INT,
  ratio INT,
  brew_time INT,
  water_temp INT,
  flavorings VARCHAR(255),
  grind_size VARCHAR(255),
  is_favorite BOOLEAN,
  about text,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES Users(id),
  FOREIGN KEY (method_id) REFERENCES Methods(id),
  FOREIGN KEY (coffee_id) REFERENCES Coffees(id)
);

-- @block
ALTER TABLE brews
ADD COLUMN brew_name VARCHAR(255);

-- @block
INSERT INTO Brews (owner_id, method_id, coffee_id, ratio, brew_time, water_temp, flavorings, grind_size, is_favorite, about)
VALUES
  (1, 1, 1, 15, 120, 100, 'vanilla', 'medium fine', TRUE, 'Use this aeropress method for an easy morning brew');

-- @block
UPDATE brews
SET brew_name = 'vanilla aeropress ethiopian'
WHERE id = 1

-- @block
CREATE INDEX brew_index ON Brews(brew_name)

-- @block
SELECT * FROM brews;