// models/job.model.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../database'; // Certifique-se de que este caminho está correto
import Payment from './payment.model'; // Importar o modelo de Payment

class Job extends Model {
  public id!: number;
  public contractId!: number;
  public description!: string;
  public price!: number;
  public paid!: boolean;
}

// Inicializando o modelo Job
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

// Definindo o relacionamento com Payment
Job.hasMany(Payment, { foreignKey: 'jobId' });
Payment.belongsTo(Job, { foreignKey: 'jobId' });

export default Job;