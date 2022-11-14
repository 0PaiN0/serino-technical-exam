import { DataTypes } from 'sequelize';
import {db} from "../utils/db";


export const Treasures = db.define('treasures', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    Latitude: {
        type:DataTypes.STRING,
        allowNull: true,
    },
    Longitude: {
        type:DataTypes.STRING,
        allowNull: true,
    },
    Name: {
        type:DataTypes.NUMBER,
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: 'treasures'
});