import { DataTypes } from 'sequelize';
import {db} from "../utils/db";


export const MoneyValue = db.define('money_values', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    treasure_id: {
        type:DataTypes.STRING,
        allowNull: true,
    },
    amt: {
        type:DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'money_values'
});