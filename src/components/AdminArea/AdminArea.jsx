import React, { useState, useEffect } from 'react';
import PostListTitle from './PostlistTitle';
import PostListColor from './PostlistColor';
import PostListEmail from './PostlistEmail';
import PostList from './PostList';
import PostForm from './PostForm';
import PostFilter from './PostFilter';
import MyModal from '../UI/MyModal/MyModal';
import MyButton from '../UI/button/MyButton';
import MyFloatingButton from '../UI/floatingButton/MyFloatingButton';
import { usePosts } from '../../hooks/usePosts';
import TitleService from '../../API/TitleService';
import EmailService from '../../API/EmailService';
import ColorService from '../../API/ColorService';
import PostService from '../../API/PostService';
import Loader from '../UI/Loader/Loader';

function AdminArea({ onSave, currentEmail }) {
    const newTitle = `Нове опитування від ${new Date().toLocaleDateString('uk-UA')} року`;
    const [title, setTitle] = useState({
        new: newTitle,
        query: '',
    });
    const [email, setEmail] = useState({
        new: `${currentEmail}`,
        query: '',
    });
    const newColor = '#ff7f50';
    const [color, setColor] = useState({ new: newColor, query: '' });
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [baseImage, setBaseImage] = useState(false);

    useEffect(() => {
        document.title = `Questionnaire - ${posts.length} question(s)`;
    });

    useEffect(() => {
        fetchSavedPosts();
        fetchSavedTitle();
        fetchSavedEmail();
        fetchSavedColor();
    }, []);

    const createPost = (newPost) => {
        setModal(false);
        setPosts([...posts, newPost]);
        localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
        localStorage.setItem('title', JSON.stringify(title.query || title.new));
        localStorage.setItem('email', JSON.stringify(email.query || email.new));
        localStorage.setItem('color', JSON.stringify(color.query || color.new));
        PostService.update(JSON.stringify([...posts, newPost]));
        TitleService.update(JSON.stringify(title.query || title.new));
        EmailService.update(JSON.stringify(email.query || email.new));
        ColorService.update(JSON.stringify(color.query || color.new));
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
        localStorage.removeItem('posts');
        localStorage.removeItem('title');
        localStorage.removeItem('email');
        localStorage.removeItem('color');

        PostService.update(JSON.stringify(sortedAndSearchedPosts));
        TitleService.update(JSON.stringify(title.query || title.new));
        EmailService.update(JSON.stringify(email.query || email.new));
        ColorService.update(JSON.stringify(color.query || color.new));

        const fileName = `${new Date().toISOString().slice(0, 10)}_${new Date().toISOString().slice(11, 19)}_${(
            title.query || title.new
        ).replace(/\s/g, '_')}`;
        const questions = sortedAndSearchedPosts.map((p) => p.title);
        questions.unshift('Час');
        questions.unshift('Дата');
        onSave(fileName, questions);
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
                setEmail({ new: currentEmail, query: '' });
                setColor({ new: newColor, query: '' });
            } else {
                const posts = await PostService.getNew();
                setPosts(posts);
                setTitle({ new: newTitle, query: '' });
                setEmail({ new: currentEmail, query: '' });
                setColor({ new: newColor, query: '' });
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

    async function fetchSavedEmail() {
        const localEmail = JSON.parse(localStorage.getItem('email'));
        if (localEmail) {
            setEmail({ new: currentEmail, query: localEmail });
        } else {
            const email = await EmailService.get();
            setEmail({ new: currentEmail, query: email });
        }
    }

    async function fetchSavedColor() {
        const localColor = JSON.parse(localStorage.getItem('color'));
        if (localColor) {
            setColor({ new: newColor, query: localColor });
        } else {
            const color = await ColorService.get();
            setColor({ new: newColor, query: color });
        }
    }

    return (
        <div>
            <div className="controlPanel">
                <div className="controlPanel__Buttons">
                    <MyButton onClick={() => setModal(true)}>Додати питання</MyButton>

                    <MyButton onClick={() => fetchNewPosts()}>Нове опитування</MyButton>

                    <MyButton onClick={() => savePosts()}>Зберегти і вийти</MyButton>
                </div>

                <MyModal visible={modal} setVisible={setModal}>
                    <PostForm create={createPost} />
                </MyModal>

                <hr />
                <div className="controlPanel__Settings">
                    <PostListTitle title={title} setTitle={setTitle} />

                    <PostFilter filter={filter} setFilter={setFilter} />

                    <div>
                        <PostListEmail email={email} setEmail={setEmail} />

                        <PostListColor color={color} setColor={setColor} />
                    </div>
                </div>
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
                    color={color.query || color.new}
                />
            )}

            <MyFloatingButton onClick={() => scrollToTop()}>
                <strong>↑</strong>
            </MyFloatingButton>
        </div>
    );
}

export default AdminArea;
