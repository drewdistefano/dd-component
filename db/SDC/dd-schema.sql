USE component;
DROP TABLE if exists records;

CREATE TABLE records (
     id INT AUTO_INCREMENT,
     username VARCHAR(15),
     body VARCHAR(35),
     score INT,
     prosconsReliability INT,
     prosconsDurability INT,
     prosconsLooks INT,
     performance INT,
     prosconsValue INT,
     likes INT,
     dislikes INT,
     PRIMARY KEY (id)
 );