import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export class Payment extends Model {
  public id!: number;
  public jobId!: number;
  public paymentValue!: number;
  public operationDate!: Date;
}

Payment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentValue: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  operationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'payments',
  timestamps: false,
});

export default Payment;