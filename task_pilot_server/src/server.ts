import app from './app';
import sequelize from './config/database';

const port = process.env.PORT ?? 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database connected and synchronized');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
