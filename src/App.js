import React, { useState } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);

        /* scroll to the post with maximum id */
        const maxId = Math.max(...posts.map((p) => p.id));
        const element = document.getElementById(maxId);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    async function fetchPosts() {
        setIsPostsLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setPosts(posts);
            setIsPostsLoading(false);
        }, 1000);
    }

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    return (
        <div className="App">
            <div className="controlPanel">
                <div className="controlPanel__Buttons">
                    <MyButton onClick={() => setModal(true)}>Створити питання</MyButton>

                    <MyButton onClick={() => fetchPosts()}>Новий перелік</MyButton>

                    <MyButton>Зберегти перелік</MyButton>
                </div>

                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm create={createPost} />
                </MyModal>

                <hr />

                <PostFilter filter={filter} setFilter={setFilter} />
            </div>

            {isPostsLoading ? (
                <Loader />
            ) : (
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Перелік питань:'} />
            )}
        </div>
    );
}

export default App;
