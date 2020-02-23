import {Pool} from 'pg';

export const connectionPool:Pool = new Pool({
  host:process.env['PROJECT_0_HOST'],
  user:process.env['PROJECT_0_USER'],
  password:process.env['PROJECT_0_PASSWORD'],
  database:process.env['PROJECT_0_DB_NAME'],
  port:process.env['PROJECT_0_PORT'],
  max:5
})