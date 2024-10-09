// database/index.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'banco',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'senha',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT || '3306'), // Adicionando a porta como uma variável de ambiente
  }
);

// Testando a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conectado ao MySQL com sucesso!'))
  .catch(err => console.error('Erro ao conectar com MySQL:', err));

export default sequelize;
