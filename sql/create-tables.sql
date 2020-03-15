
drop table if exists "reimbursement";
drop table if exists "user";
drop table if exists "role";
drop table if exists "reimbursement_status";
drop table if exists "reimbursement_type";

create table "role" (
	id serial primary key,
	"name" varchar not null
);

create table "user" (
	id serial primary key,
	username varchar unique not null,
	"password" varchar not null,
	first_name varchar not null,
	last_name varchar not null,
	email varchar not null,
	role_id int4 references "role"(id) not null
);

create table reimbursement_status (
	id serial primary key,
	status varchar not null
);

create table reimbursement_type(
	id serial primary key,
	"type" varchar not null
);

create table reimbursement (
	id serial primary key,
	author_id int4 references "user"(id) not null,
	amount numeric not null,
	date_submitted int8 not null,
	date_resolved int8 not null,
	description varchar not null,
	resolver_id int4 references "user"(id),
	status_id int4 references reimbursement_status(id) not null,
	"type" int4 references reimbursement_type(id)
)