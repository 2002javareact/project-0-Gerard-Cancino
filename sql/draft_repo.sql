-- dao find USER 

SELECT * FROM public.user as U
JOIN public."role" as R on U.role_id = R.role_id; 

select * from public.user as U
join public."role" as R where "user".id=1