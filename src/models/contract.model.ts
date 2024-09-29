import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';  // Certifique-se de que este caminho está correto

export class Contract extends Model {
  public id!: number;
  public terms!: string;
  public clientId!: number;
  public contractorId!: number;
  public operationDate!: Date;
  public status!: string;
}

Contract.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  terms: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contractorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  operationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
}, {
  sequelize,  // Certifique-se de que o Sequelize está sendo passado corretamente aqui
  tableName: 'contracts',
  timestamps: false,
});

export default Contract;