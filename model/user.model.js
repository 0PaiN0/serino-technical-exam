import { DataTypes } from 'sequelize';
import {db} from "../utils/db";


export const Users = db.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    name: {
        type:DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type:DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type:DataTypes.NUMBER,
        allowNull: true,
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type:DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 'users'
});