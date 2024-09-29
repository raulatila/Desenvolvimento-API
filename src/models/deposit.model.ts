// deposit.model.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database'; // Ajuste o caminho se necessário

export class Deposit extends Model {
  public id!: number;
  public clientId!: number;
  public depositValue!: number;
  public operationDate!: Date;
}

Deposit.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  depositValue: {
    type: DataTypes.FLOAT, // Ou DECIMAL se preferir
    allowNull: false,
  },
  operationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'deposits',
  timestamps: false,
});

export default Deposit;
