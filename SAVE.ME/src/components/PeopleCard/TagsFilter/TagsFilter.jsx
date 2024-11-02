import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from './Tags.css';

const TagSystem = ({ tags, userTags, onAddTag, onRemoveTag }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTags = tags
        .filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.usage - a.usage);

    return (
        <div className={styles.right}>
            <div className={styles.textcontainer}>
                <p>Filter by tags</p>
            </div>
            <div className={styles.filterArea}>
                <input
                    type="text"
                    placeholder="Search tags..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className={styles.alltag}>
                    {filteredTags.map((tag) => (
                        <div key={tag.id} className={styles.tag}>
                            <span>#{tag.name}</span>
                            <span className={styles.usage}>usage: {tag.usage || 0}</span>
                            {userTags.includes(tag.name) ? (
                                <button onClick={() => onRemoveTag(tag.id)} className={styles.removeBtn}>
                                    Remove
                                </button>
                            ) : (
                                <button onClick={() => onAddTag(tag.id)} className={styles.addBtn}>
                                    Add
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

TagSystem.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            usage: PropTypes.number,
        }),
    ).isRequired,
    userTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAddTag: PropTypes.func.isRequired,
    onRemoveTag: PropTypes.func.isRequired,
};

export default TagSystem;
