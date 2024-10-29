import deleteIcon from '@assets/icons/chat/delete.svg';
import send from '@assets/icons/chat/send.svg';
import avatar from '@assets/icons/header/avatar.svg';
import search from '@assets/icons/header/search.svg';
import React from 'react';

import styles from './ChatCard.css';

function Chat() {
    return (
        <div className={styles.chatContainer}>
            {/* Left Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.searchsection}>
                    <img src={search} alt="Search" />
                    <input type="text" placeholder="Search" />
                </div>
                <div className={styles.contacts}>
                    <div className={styles.contact}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                    <div className={`${styles.contact} ${styles.selected}`}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                    <div className={styles.contact}>
                        <div className={styles.contactAvatar} />
                        <div className={styles.userInfo}>
                            <img src={avatar}></img>
                            <h4>user</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className={styles.chatArea}>
                <div className={styles.messages}>
                    <div className={styles.message}>
                        <p>spme text</p>
                        <span>time</span>
                    </div>
                    <div className={styles.message}>
                        <p>some text</p>
                        <span>time</span>
                    </div>
                    <div className={`${styles.message} ${styles.outgoing}`}>
                        <p>some text</p>
                        <span>time</span>
                    </div>
                    <div className={`${styles.message} ${styles.outgoing}`}>
                        <p>some text</p>
                        <span>time</span>
                    </div>
                    <div className={`${styles.message} ${styles.outgoing}`}>
                        <p>some text</p>
                        <span>time</span>
                    </div>
                    <div className={`${styles.message} ${styles.outgoing}`}>
                        <p>some text</p>
                        <span>time</span>
                    </div>
                    <div className={`${styles.message} ${styles.outgoing}`}>
                        <p>some text</p>
                        <span>time</span>
                    </div>
                    <div className={`${styles.message} ${styles.outgoing}`}>
                        <p>some text</p>
                        <span>time</span>
                    </div>
                    <div className={`${styles.message} ${styles.outgoing}`}>
                        <p>some text</p>
                        <span>time</span>
                    </div>
                </div>
                <div className={styles.messageInput}>
                    <input type="text" placeholder="Write a message..." />
                    <img src={send} alt="Send" />
                </div>
            </div>

            {/* Profile Info */}
            <div className={styles.profile}>
                <div className={styles.profilePicture} />
                <img src={avatar}></img>
                <h3>user1</h3>
                <p>Статус</p>
                <p>#</p>
                <div className={styles.profiletags}>
                    <span>Tag 1</span>
                    <span>Tag 2</span>
                    <span>Tag 3</span>
                </div>
                <div className={styles.deleteblock}>
                    <img src={deleteIcon} alt="Delete" />
                    <button className={styles.blockBtn}>Block the user</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
