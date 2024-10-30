import avatar from '@assets/icons/header/avatar.svg';
import mailbox from '@assets/icons/header/mailbox.svg';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, database } from '../../firebase/config';
import styles from './ProfileCard.css';

const ProfileCard = () => {
    const [profileData, setProfileData] = useState(() => {
        const savedData = localStorage.getItem('profileData');
        return savedData
            ? JSON.parse(savedData)
            : {
                  nickname: '',
                  gender: '',
                  language: '',
                  status: '',
                  tags: [],
                  email: auth.currentUser ? auth.currentUser.email : '',
              };
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(!localStorage.getItem('profileData'));
    const [error, setError] = useState();

    const navigate = useNavigate();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchProfileData = async () => {
            if (user) {
                try {
                    const profileReference = doc(database, 'users', user.uid);
                    const profileSnap = await getDoc(profileReference);
                    if (profileSnap.exists()) {
                        const data = profileSnap.data();
                        setProfileData((previousData) => ({
                            ...previousData,
                            ...data,
                            tags: Array.isArray(data.tags) ? data.tags : [],
                        }));
                        localStorage.setItem('profileData', JSON.stringify(data));
                    } else {
                        console.warn('Profile does not exist. Initializing default values.');
                    }
                } catch (error) {
                    setError('Failed to load profile data. Please try again.');
                    console.error('Error loading profile:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProfileData();
    }, [user]);

    const fetchUpdatedTags = useCallback(async () => {
        if (user) {
            try {
                const profileReference = doc(database, 'users', user.uid);
                const profileSnap = await getDoc(profileReference);
                if (profileSnap.exists()) {
                    const data = profileSnap.data();
                    setProfileData((previousData) => ({
                        ...previousData,
                        tags: data.tags || [],
                    }));
                    localStorage.setItem('profileData', JSON.stringify(data));
                }
            } catch (error) {
                console.error('Error fetching updated tags:', error);
            }
        }
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (user) {
            const profileReference = doc(database, 'users', user.uid);
            try {
                await setDoc(profileReference, profileData, { merge: true });
                localStorage.setItem('profileData', JSON.stringify(profileData));
                setIsEditing(false);
                alert('Profile updated successfully!');
            } catch (error) {
                setError('Failed to save profile data. Please try again.');
                console.error('Error saving profile:', error);
            }
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
        setError(undefined);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchUpdatedTags();
        }, 5000);

        return () => clearInterval(interval);
    }, [user, fetchUpdatedTags]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('profileData');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.profileContent}>
            <div className={styles.profileCard}>
                <div className={styles.userInfo}>
                    <img src={avatar} alt="User Avatar" className={styles.userImage} />
                    <h2>{profileData.nickname || user.displayName || 'User'}</h2>
                    <button onClick={handleEditToggle} className={styles.editButton}>
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>

                <div className={styles.profileForm}>
                    <div className={styles.column}>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Nick Name</span>
                            <input
                                type="text"
                                placeholder="Nick Name"
                                name="nickname"
                                value={profileData.nickname}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Gender</span>
                            <select
                                name="gender"
                                value={profileData.gender}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styles.inputField}
                            >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                            </select>
                        </div>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Choose Language</span>
                            <select
                                name="language"
                                value={profileData.language}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styles.inputField}
                            >
                                <option value="">Choose Language</option>
                                <option value="English">English</option>
                                <option value="Ukrainian">Ukrainian</option>
                                <option value="Spanish">Spanish</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Status</span>
                            <input
                                type="text"
                                placeholder="Status"
                                name="status"
                                value={profileData.status}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Tags</span>
                            <div className={`${styles.inputField} ${styles.tagscont}`}>
                                {Array.isArray(profileData.tags) && profileData.tags.length > 0
                                    ? profileData.tags.join(', ')
                                    : 'No tags added.'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.usermaillog}>
                    <div className={styles.formRow}>
                        <span className={styles.label}>My email Address</span>
                        <img src={mailbox} alt="Mail Box" className={styles.mailimg} />
                        <p>{profileData.email}</p>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
