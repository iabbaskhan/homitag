//routes.test.js
const request = require('supertest');
const server = require('../app.js');

const {NEW_GENRE, NEW_MOVIE, GENRE_UPDATES, MOVIE_UPDATES} = require("./testData");

var genreId, movieId;

beforeAll(async () => {
 console.log('Jest starting!');
});


afterAll(() => {
 server.close();
 console.log('server closed!');
});


//Genres routes tests
describe('Genre routes test', () => {

    test('Get all genres list GET /api/genres/all', async () => {
        const response = await request(server).get('/api/genres/all');
        expect(response.status).toEqual(201);
        expect(response.body.success).toEqual(true);
        });

    test('Add a genre POST /api/genres/add', async () => {
            const response = await (await request(server).post('/api/genres/add').send(NEW_GENRE));
            expect(response.status).toEqual(201);
            expect(response.body.success).toEqual(true);
            genreId = response.body.result._id;
            GENRE_UPDATES["genreId"] = genreId;
            });

    test('Get a specific genre info GET /api/genres/{genreId}', async () => {
        const response = await request(server).get(`/api/genres/${genreId}`);
        expect(response.status).toEqual(201);
        expect(response.body.success).toEqual(true);
        });

    test('Update a genre PUT /api/genres/', async () => {
        const response = await request(server).put('/api/genres/update').send(GENRE_UPDATES);
        expect(response.status).toEqual(201);
        expect(response.body.success).toEqual(true);
        });

    test('Delete a genre DELETE /api/genres/delete/{genreId}', async () => {
        const response = await request(server).del(`/api/genres/delete/${genreId}`);
        expect(response.status).toEqual(201);
        expect(response.body.success).toEqual(true);
        });
});

//Movies routes tests
describe('Movie routes test', () => {

    test('Get all movies list GET /api/movies/all', async () => {
        const response = await request(server).get('/api/movies/all');
        expect(response.status).toEqual(201);
        expect(response.body.success).toEqual(true);
        });

    test('Add a movie POST /api/movies/add', async () => {
            const response = await request(server).post('/api/movies/add').send(NEW_MOVIE);
            expect(response.status).toEqual(201);
            expect(response.body.success).toEqual(true);
            movieId = response.body.result._id;
            MOVIE_UPDATES["movieId"] = movieId;
            });

    test('Get a specific movie info GET /api/movies/{movieId}', async () => {
        const response = await request(server).get(`/api/movies/${movieId}`);
        expect(response.status).toEqual(201);
        expect(response.body.success).toEqual(true);
        });

    test('Update a movie PUT /api/movies/', async () => {
        const response = await request(server).put('/api/movies/update').send(MOVIE_UPDATES);
        expect(response.status).toEqual(201);
        expect(response.body.success).toEqual(true);
        });

    test('Delete a movie DELETE /api/movies/delete/{movieId}', async () => {
        const response = await request(server).del(`/api/movies/delete/${movieId}`);
        expect(response.status).toEqual(201);
        expect(response.body.success).toEqual(true);
        });
});