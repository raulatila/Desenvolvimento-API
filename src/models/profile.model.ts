import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Profile extends Model {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public profession!: string;
  public balance!: number;
  public status!: string;
}

Profile.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: true, // Pode ser nulo se não for obrigatório
  },
  balance: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true, // Pode ser nulo se não for obrigatório
  },
}, {
  sequelize,
  tableName: 'profiles',
  timestamps: false,  // Desativa timestamps
});

export default Profile;