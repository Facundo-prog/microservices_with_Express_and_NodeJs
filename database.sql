CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   name varchar(32) NOT NULL,
   username varchar(64) UNIQUE NOT NULL
);

CREATE TABLE auths(
   id SERIAL PRIMARY KEY,
   username varchar(64) UNIQUE NOT NULL,
   password varchar(64)  NOT NULL
);

CREATE TABLE posts(
   id SERIAL PRIMARY KEY,
   user_id varchar(32) NOT NULL,
   text TEXT NOT NULL
);

CREATE TABLE users_follow(
   id SERIAL PRIMARY KEY,
   user_from varchar(32) UNIQUE NOT NULL,
   user_to varchar(32) UNIQUE NOT NULL
);