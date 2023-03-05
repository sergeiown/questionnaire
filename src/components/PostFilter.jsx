import React from 'react';
import MyInput from './UI/input/MyInput';
import Myselect from './UI/select/Myselect';

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={(e) => setFilter({ ...filter, query: e.target.value })}
                placeholder="Пошук..."
            />

            <Myselect
                value={filter.sort}
                onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
                defaultValue="Сортувати..."
                options={[
                    { value: 'title', name: 'За текстом питання' },
                    { value: 'body', name: 'За типом питання' },
                    { value: 'id', name: 'Від старих до нових' },
                ]}
            />
        </div>
    );
};

export default PostFilter;
