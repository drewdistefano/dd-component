DROP TABLE if exists records;

CREATE TABLE records (
     review_id INT,
     product_id INT,
     username VARCHAR(50),
     body VARCHAR(500),
     score INT,
     prosconsReliability INT,
     prosconsDurability INT,
     prosconsLooks INT,
     performance INT,
     prosconsValue INT,
     likes INT,
     dislikes INT,
     PRIMARY KEY (review_id)
 );