import axios from 'axios';

export default class PostService {
    static async getAll() {
        try {
            const response = await axios.get('/posts.json');
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}
