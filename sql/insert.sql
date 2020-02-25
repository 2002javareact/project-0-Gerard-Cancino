insert into "role" ("name") values ('admin'),('finance-manage'),('user');

insert into reimbursement_status (status) values ('Pending'),('Approved'),('Denied');

insert into reimbursement_type ("type") values ('Lodging'),('Travel'),('Food'),('Other');

insert into "user" (username,"password",first_name,last_name,email,role_id)
values ('username1','password','first first','last last','email@email.com',1),
	('username2','password','first2 first2','last2 last3','email2@email.com',2),
	('username3','password','first3 first3','last2 last3','email3@email.com',3),
	('username4','password','first3 first3','last4 last4','email4@email.com',3);
	
insert into reimbursement (author_id,amount,date_submitted ,date_resolved ,description ,resolver_id,status_id ,"type" ) values
													(3,30,'2020/06/14','2020/07/01','customer has problems with lalala', 2, 2,3),
													(3,20,'2020/07/03',null,'customer tried to buy other',null,3,1),
													(4,19.99,'2020/11/14',null,'customer tried to buy lodging',null,3,1);