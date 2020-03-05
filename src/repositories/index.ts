import {Pool} from 'pg';

export const connectionPool:Pool = new Pool({
  host:process.env['REVATURE_HOST'],
  user:process.env['REVATURE_USER'],
  password:process.env['REVATURE_PASSWORD'],
  database:process.env['REVATURE_DATABASE'],
  port:+process.env['REVATURE_PORT'],
  // host:'localhost',
  // user:'postgres',
  // password:'',
  // database:'myTestDB',
  // port:5432,
  max:5
})