export default async () => ({
  uri: process.env.MONGO_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
