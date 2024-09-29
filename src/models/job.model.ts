import { Model, DataTypes } from 'sequelize';
import sequelize from '../database'; // Certifique-se de que este caminho está correto

class Job extends Model {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public price!: number;
  public paid!: boolean;
}

Job.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  contractId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Job',
  tableName: 'jobs',
  timestamps: false,
});

export default Job;