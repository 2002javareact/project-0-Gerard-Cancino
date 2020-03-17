insert into "role" ("name") values ('admin'),('finance-manager'),('user');

insert into reimbursement_status (status) values ('Pending'),('Approved'),('Denied');

insert into reimbursement_type ("type") values ('Lodging'),('Travel'),('Food'),('Other');

insert into "user" (username,"password",first_name,last_name,email,role_id)
values ('username1','$2b$10$Q8yGr0ZjeiQ7Bot2pFlpMOIk7fBRVxrkcR5tm75I8hfjfv.GZpI1.','first first','last last','email@email.com',1),
	('username2','$2b$10$Q8yGr0ZjeiQ7Bot2pFlpMOIk7fBRVxrkcR5tm75I8hfjfv.GZpI1.','first2 first2','last2 last3','email2@email.com',2),
	('username3','$2b$10$Q8yGr0ZjeiQ7Bot2pFlpMOIk7fBRVxrkcR5tm75I8hfjfv.GZpI1.','first3 first3','last2 last3','email3@email.com',3),
	('username4','$2b$10$Q8yGr0ZjeiQ7Bot2pFlpMOIk7fBRVxrkcR5tm75I8hfjfv.GZpI1.','first3 first3','last4 last4','email4@email.com',3);
	
insert into reimbursement (author_id,amount,date_submitted ,date_resolved ,description ,resolver_id,status_id ,"type" ) values
													(3,30,1594699200000,1596254400000,'customer has problems with lalala', 2, 2,3),
													(3,20,1596254400000,2696400000,'customer tried to buy other',null,3,1),
													(4,19.99,1607922000000,2696400000,'customer tried to buy lodging',null,3,1);

SELECT * FROM public.user JOIN public.role on public.user.role_id=public.role.id WHERE public.user.username="username";

SELECT R.id,author_id,amount,date_submitted,date_resolved,description,U.first_name,U.last_name ,RS.status,RT."type" FROM public.reimbursement AS R JOIN public.reimbursement_status AS RS ON RS.id=R.status_id JOIN public.reimbursement_type AS RT ON RT.id=R.type join public."user" as U on U.id=R.resolver_id WHERE author_id=3