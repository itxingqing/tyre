drop database if exists tyre;
create database tyre with
  encoding = 'utf-8';


-- -----------------------------------------------------
-- 用户主页面banner图
-- -----------------------------------------------------
drop table if exists banner;
create table banner
(
	id serial primary key,
	img varchar(128) not null default '',
  ct_time timestamp default CURRENT_TIMESTAMP not null,
  mfy_time timestamp default CURRENT_TIMESTAMP not null
);

-- -----------------------------------------------------
-- 产品
-- -----------------------------------------------------
drop table if exists product;
create table product
(
	id serial primary key,
	p_name varchar(128) default '' null,
	p_img json null,
	ty_name varchar(128) default '' null,
	content text null,
	ct_user varchar(64) default '' null,
	ct_time timestamp default current_timestamp not null ,
	mfy_user varchar(64) default '' null,
	mfy_time timestamp default current_timestamp not null
);

-- -----------------------------------------------------
-- 类型
-- -----------------------------------------------------
drop table if exists type;
create table type
(
	id serial primary key,
	ty_name varchar(128) default '' null,
	ty_i18n json null,
	ct_user varchar(64) default '' null,
	ct_time timestamp default CURRENT_TIMESTAMP not null ,
	mfy_user varchar(64) default '' null,
	mfy_time timestamp default CURRENT_TIMESTAMP not null
);

-- -----------------------------------------------------
-- 用户
-- -----------------------------------------------------
drop table if exists users;
create table users
(
	id serial primary key,
	uname varchar(64) not null,
	passwd varchar(128) not null,
	ct_user varchar(64) default '' null,
	ct_time timestamp default CURRENT_TIMESTAMP not null ,
	mfy_user varchar(64) default '' null,
	mfy_time timestamp default CURRENT_TIMESTAMP not null,
	constraint users_uname unique (uname)
);




