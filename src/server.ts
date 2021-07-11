import app from './app';

app.listen(process.env.PORT, () => {
    console.log(`Server started in PORT: ${process.env.PORT}`);
})