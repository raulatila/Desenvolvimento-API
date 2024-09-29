import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Profile extends Model {
  public id!: number;
  public name!: string;
  public balance!: number;
}

Profile.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'profiles',
  timestamps: false,  // Desativa timestamps
});

export default Profile;
