export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/nest_demo',
  },
  nodeEnv: process.env.NODE_ENV || 'development',
});