import conn from './conn.js';

export async function getAllPosts() {
    try {
        const [rows] = await conn.query('SELECT * FROM blog_posts');
        return rows;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; 
    }
}

export async function createPost(title, content, competition_name, category, competitor_name, top_squat, top_bench_press, top_deadlift) {
    const [result] = await conn.query('INSERT INTO blog_posts (title, content, competition_name, category, competitor_name, top_squat, top_bench_press, top_deadlift) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, content, competition_name, category, competitor_name, top_squat, top_bench_press, top_deadlift]);
    return result;
}