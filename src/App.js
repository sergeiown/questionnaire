import React, { useState, useEffect } from 'react';
import './styles/App.css';
import PostListTitle from './components/PostlistTitle';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import MyFloatingButton from './components/UI/floatingButton/MyFloatingButton';
import { usePosts } from './hooks/usePosts';
import TitleService from './API/TitleService';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';

function App() {
    const newTitle = `Нове опитування від ${new Date().toLocaleDateString('uk-UA')} року`;
    const [title, setTitle] = useState({
        new: newTitle,
        query: '',
    });
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [baseImage, setBaseImage] = useState(true);

    useEffect(() => {
        document.title = `Questionnaire - ${posts.length} question(s)`;
    });

    useEffect(() => {
        fetchSavedPosts();
    }, []);

    useEffect(() => {
        fetchSavedTitle();
    }, []);

    const createPost = (newPost) => {
        setModal(false);
        setPosts([...posts, newPost]);
        localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
        localStorage.setItem('title', JSON.stringify(title.query || title.new));
        PostService.update(JSON.stringify([...posts, newPost]));
        TitleService.update(JSON.stringify(title.query || title.new));
        /* scroll to the post with maximum id */
        const maxId = Math.max(...posts.map((p) => p.id));
        const element = document.getElementById(maxId);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const removePost = (post) => {
        const filteredPosts = posts.filter((p) => p.id !== post.id);
        setPosts(filteredPosts);
        /* localStorage.setItem('posts', JSON.stringify(filteredPosts));
        localStorage.setItem('title', JSON.stringify(title.query || title.new));
        PostService.update(JSON.stringify(filteredPosts));
        TitleService.update(JSON.stringify(title.query || title.new)); */
    };

    const savePosts = () => {
        localStorage.setItem('posts', JSON.stringify(posts));
        localStorage.setItem('title', JSON.stringify(title.query || title.new));
        PostService.update(JSON.stringify(posts));
        TitleService.update(JSON.stringify(title.query || title.new));
    };

    const scrollToTop = () => {
        const element = document.getElementsByTagName('img')[0];
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    async function fetchSavedPosts() {
        setIsPostsLoading(true);
        setBaseImage(false);
        setTimeout(async () => {
            const localPosts = JSON.parse(localStorage.getItem('posts'));
            if (localPosts) {
                setPosts(localPosts);
            } else {
                const posts = await PostService.get();
                setPosts(posts);
            }
            setIsPostsLoading(false);
        }, 1000);
    }

    async function fetchNewPosts() {
        setIsPostsLoading(true);
        setBaseImage(true);
        setTimeout(async () => {
            const localNewPosts = JSON.parse(localStorage.getItem('newPosts'));
            if (localNewPosts) {
                setPosts(localNewPosts);
                setTitle({ new: newTitle, query: '' });
            } else {
                const posts = await PostService.getNew();
                setPosts(posts);
                setTitle({ new: newTitle, query: '' });
                localStorage.setItem('newPosts', JSON.stringify(posts));
            }
            setIsPostsLoading(false);
        }, 1000);
    }

    async function fetchSavedTitle() {
        const localTitle = JSON.parse(localStorage.getItem('title'));
        if (localTitle) {
            setTitle({ new: newTitle, query: localTitle });
        } else {
            const title = await TitleService.get();
            setTitle({ new: newTitle, query: title });
        }
    }

    return (
        <div className="App">
            <div className="controlPanel">
                <div className="controlPanel__Buttons">
                    <MyButton onClick={() => setModal(true)}>Додати питання</MyButton>

                    <MyButton onClick={() => fetchNewPosts()}>Нове опитування</MyButton>

                    <MyButton onClick={() => savePosts()}>Зберегти опитування</MyButton>
                </div>

                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm create={createPost} />
                </MyModal>

                <hr />

                <PostListTitle title={title} setTitle={setTitle} />

                <PostFilter filter={filter} setFilter={setFilter} />
            </div>

            {isPostsLoading ? (
                <Loader />
            ) : (
                <PostList
                    postListTitle={title}
                    title={'Перелік питань:'}
                    posts={sortedAndSearchedPosts}
                    remove={removePost}
                    baseImage={baseImage}
                />
            )}

            <MyFloatingButton onClick={() => scrollToTop()}>
                <strong>↑</strong>
            </MyFloatingButton>
        </div>
    );
}

export default App;
