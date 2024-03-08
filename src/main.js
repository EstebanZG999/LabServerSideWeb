import express from 'express'
import { getAllPosts, createPost } from './db.js';


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bienvenido a la API del Blog');
  });
  

app.get('/posts', async (req, res) => {
    res.json({ message: "Endpoint de prueba" });
});


app.get('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await getPostById(postId);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { title, content, competition_name, category, competitor_name, top_squat, top_bench_press, top_deadlift } = req.body;
        const result = await createPost(title, content, competition_name, category, competitor_name, top_squat, top_bench_press, top_deadlift);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating the post');
    }
});


app.put('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { title, content, competition_name, category, competitor_name, top_squat, top_bench_press, top_deadlift } = req.body;
        const result = await updatePost(postId, title, content, competition_name, category, competitor_name, top_squat, top_bench_press, top_deadlift);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating the post');
    }
});


app.delete('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        await deletePost(postId);
        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting the post');
    }
});



const port = 5000;

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});