create database if not exists tyre default charset utf8 collate utf8_unicode_ci;

use tyre;

-- -----------------------------------------------------
-- 用户主页面banner图
-- -----------------------------------------------------
drop table if exists banner;
create table banner
(
	id int auto_increment primary key,
	img varchar(128) not null default ''
) engine=InnoDB;

-- -----------------------------------------------------
-- 产品
-- -----------------------------------------------------
drop table if exists product;
create table product
(
	id int auto_increment primary key,
	p_name varchar(128) default '' null,
	p_img json null,
	ty_name varchar(128) default '' null,
	content longtext null,
	ct_user varchar(64) default '' null,
	ct_time datetime default CURRENT_TIMESTAMP not null ,
	mfy_user varchar(64) default '' null,
	mfy_time datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
) engine=InnoDB;

-- -----------------------------------------------------
-- 类型
-- -----------------------------------------------------
drop table if exists type;
create table type
(
	id int auto_increment primary key,
	ty_name varchar(128) default '' null,
	ty_i18n json null,
	ct_user varchar(64) default '' null,
	ct_time datetime default CURRENT_TIMESTAMP not null ,
	mfy_user varchar(64) default '' null,
	mfy_time datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null
) engine=InnoDB;

-- -----------------------------------------------------
-- 用户
-- -----------------------------------------------------
drop table if exists users;
create table users
(
	id int auto_increment primary key,
	uname varchar(64) not null,
	passwd varchar(128) not null,
	ct_user varchar(64) default '' null,
	ct_time datetime default CURRENT_TIMESTAMP not null ,
	mfy_user varchar(64) default '' null,
	mfy_time datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP not null,
	unique index `users_uname` (`uname`)
) engine=InnoDB;

