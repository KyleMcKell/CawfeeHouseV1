-- @block
CREATE TABLE Methods(
  id SERIAL,
  owner_id INT,
  method_name VARCHAR(255),
  about TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @block
INSERT INTO Methods (owner_id, method_name, about)
VALUES 
  (1, 'Aeropress', 'Aeropress!'),
  (1, 'French Press', 'French Press!'),
  (1, 'Pour Over', 'Pour Over V60!');

-- @block
CREATE INDEX method_index ON Methods(method_name);

-- @block
SELECT * FROM Methods;