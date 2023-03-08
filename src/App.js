import React, { useState, useEffect } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import MyFloatingButton from './components/UI/floatingButton/MyFloatingButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    useEffect(() => {
        document.title = `Questionnaire - ${posts.length} question(s)`;
    });

    useEffect(() => {
        fetchSavedPosts();
    }, []);

    const createPost = (newPost) => {
        setModal(false);
        setPosts([...posts, newPost]);
        localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
        PostService.update(JSON.stringify([...posts, newPost]));
        /* scroll to the post with maximum id */
        const maxId = Math.max(...posts.map((p) => p.id));
        const element = document.getElementById(maxId);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const removePost = (post) => {
        const filteredPosts = posts.filter((p) => p.id !== post.id);
        setPosts(filteredPosts);
        localStorage.setItem('posts', JSON.stringify(filteredPosts));
        PostService.update(JSON.stringify(filteredPosts));
    };

    const savePosts = () => {
        localStorage.setItem('posts', JSON.stringify(posts));
        PostService.update(JSON.stringify(posts));
    };

    const scrollToTitle = () => {
        const element = document.getElementsByTagName('h1')[0];
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    async function fetchSavedPosts() {
        setIsPostsLoading(true);
        setTimeout(async () => {
            const localPosts = JSON.parse(localStorage.getItem('posts'));
            if (localPosts) {
                setPosts(localPosts);
            } else {
                PostService.get();
            }
            setIsPostsLoading(false);
        }, 1000);
    }

    async function fetchNewPosts() {
        setIsPostsLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getNew();
            setPosts(posts);
            setIsPostsLoading(false);
        }, 1000);
    }

    return (
        <div className="App">
            <div className="controlPanel">
                <div className="controlPanel__Buttons">
                    <MyButton onClick={() => setModal(true)}>Створити питання</MyButton>

                    <MyButton onClick={() => fetchNewPosts()}>Новий перелік</MyButton>

                    <MyButton onClick={() => savePosts()}>Зберегти перелік</MyButton>
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

            <MyFloatingButton onClick={() => scrollToTitle()}>
                <strong>↑</strong>
            </MyFloatingButton>
        </div>
    );
}

export default App;
