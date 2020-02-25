
drop table if exists "reimbursement";
drop table if exists "user";
drop table if exists "role";
drop table if exists "reimbursement_status";
drop table if exists "reimbursement_type";

create table "role" (
	id serial primary key,
	"name" varchar
);

create table "user" (
	id serial primary key,
	username varchar unique,
	"password" varchar ,
	first_name varchar,
	last_name varchar,
	email varchar,
	role_id int4 references "role"(id)
);

create table reimbursement_status (
	id serial primary key,
	status varchar
);

create table reimbursement_type(
	id serial primary key,
	"type" varchar
);

create table reimbursement (
	id serial primary key,
	author_id int4 references "user"(id),
	amount numeric,
	date_submitted date,
	date_resolved date,
	description varchar,
	resolver_id int4 references "user"(id),
	status_id int4 references reimbursement_status(id),
	"type" int4 references reimbursement_type(id)
)