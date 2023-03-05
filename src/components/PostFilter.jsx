import React from 'react';
import MyInput from './UI/input/MyInput';
import Myselect from './UI/select/Myselect';

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={(e) => setFilter({ ...filter, query: e.target.value })}
                placeholder="search..."
            />

            <Myselect
                value={filter.sort}
                onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
                defaultValue="Sort by"
                options={[
                    { value: 'title', name: 'by title' },
                    { value: 'body', name: 'by description' },
                ]}
            />
        </div>
    );
};

export default PostFilter;
