import * as dotenv from 'dotenv'
dotenv.config()

export const mysqlCredential = {
    HOST:  process.env.HOST,
    DB:  process.env.DB,
    USER:  process.env.USER,
    PASSWORD:  process.env.PASSWORD,
    DIALECT:  process.env.DIALECT,
}

export const APP_PORT = process.env.PORT;
export const jwtTokenKey = process.env.JWTKEY;