export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  analyticsService: {
    baseUrl: process.env.ANALYTICS_SERVICE_URL ?? 'http://localhost:8000',
    apiKey: process.env.ANALYTICS_SERVICE_API_KEY,
  },
});
