import { app } from './server';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
process.on('SIGINT', () => {
    console.log('Stopping server...');
    process.exit();
});
