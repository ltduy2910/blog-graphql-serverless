type Environment = {
  mongodb: {
    uri: string,
    user: string,
    password: string,
    dbName: string
  }

};

const environment: Environment = {
  mongodb: {
    uri: process.env.MONGODB_URI as string,
    user: process.env.MONGODB_USER as string,
    password: process.env.MONGODB_PASSWORD as string,
    dbName: process.env.MONGODB_DBNAME as string,
  }
};

export default environment
