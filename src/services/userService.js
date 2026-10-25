// User and Authentication Service for Veelana
// Handles Google Sign-In, Session Management, and Admin Users Directory

const USERS_STORAGE_KEY = 'veelana_registered_users_v1';
const CURRENT_USER_KEY = 'veelana_current_session_user_v1';
const GOOGLE_AUTH_CONFIG_KEY = 'veelana_google_auth_config_v1';

// Seed demo users so dashboard is immediately rich with realistic data
const DEFAULT_USERS = [
  {
    id: 'usr_g_101',
    name: 'Ayesha Khan',
    email: 'ayesha.khan789@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    provider: 'Google',
    joinedAt: '2026-09-12T14:22:00Z',
    lastLoginAt: '2026-10-14T11:45:00Z',
    orderCount: 2,
    reviewCount: 1,
    status: 'Active',
    verified: true
  },
  {
    id: 'usr_g_102',
    name: 'Muhammad Bilal',
    email: 'm.bilal.lahore@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    provider: 'Google',
    joinedAt: '2026-09-28T09:15:00Z',
    lastLoginAt: '2026-10-15T08:10:00Z',
    orderCount: 1,
    reviewCount: 0,
    status: 'Active',
    verified: true
  },
  {
    id: 'usr_g_103',
    name: 'Zainab Fatima',
    email: 'zainab.fatima99@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    provider: 'Google',
    joinedAt: '2026-10-02T18:40:00Z',
    lastLoginAt: '2026-10-13T16:20:00Z',
    orderCount: 3,
    reviewCount: 1,
    status: 'Active',
    verified: true
  }
];

function notifyUserChange(user) {
  try {
    window.dispatchEvent(new CustomEvent('veelana_user_changed', { detail: user }));
  } catch (e) {
    console.error(e);
  }
}

// 1. Get all registered users for Admin Dashboard
export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading registered users', e);
  }
  // Initialize with defaults if empty
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  } catch (e) {}
  return DEFAULT_USERS;
}

// 2. Save / update user in the registered users list
export function saveRegisteredUser(userData) {
  try {
    const users = getRegisteredUsers();
    const existingIndex = users.findIndex(
      u => (u.email && userData.email && u.email.toLowerCase() === userData.email.toLowerCase()) || u.id === userData.id
    );

    let updatedUsers;
    let savedUser;

    if (existingIndex > -1) {
      savedUser = {
        ...users[existingIndex],
        ...userData,
        lastLoginAt: new Date().toISOString()
      };
      updatedUsers = [...users];
      updatedUsers[existingIndex] = savedUser;
    } else {
      savedUser = {
        id: userData.id || `usr_g_${Date.now()}`,
        name: userData.name || 'Google User',
        email: userData.email,
        avatar: userData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name || 'U')}&backgroundColor=2D6A4F`,
        provider: userData.provider || 'Google',
        joinedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        orderCount: userData.orderCount || 0,
        reviewCount: userData.reviewCount || 0,
        status: 'Active',
        verified: true
      };
      updatedUsers = [savedUser, ...users];
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    return savedUser;
  } catch (e) {
    console.error('Error saving user to registry', e);
    return userData;
  }
}

// 3. Delete user from Admin Dashboard
export function deleteRegisteredUser(userId) {
  try {
    const users = getRegisteredUsers();
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));

    // If currently logged in user was deleted, logout
    const current = getCurrentUser();
    if (current && current.id === userId) {
      logoutCurrentUser();
    }
    return filtered;
  } catch (e) {
    console.error('Error deleting user', e);
    return getRegisteredUsers();
  }
}

// 4. Get Current Session User
export function getCurrentUser() {
  try {
    const session = sessionStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem(CURRENT_USER_KEY);
    if (session) return JSON.parse(session);
  } catch (e) {
    console.error('Error reading current user', e);
  }
  return null;
}

// 5. Log in user with Google Profile
export function loginGoogleUser(profile) {
  try {
    const registeredUser = saveRegisteredUser({
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar || profile.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name)}&backgroundColor=1B2E1E`,
      provider: 'Google',
    });

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(registeredUser));
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(registeredUser));
    notifyUserChange(registeredUser);
    return registeredUser;
  } catch (e) {
    console.error('Error logging in Google user', e);
    return null;
  }
}

// 6. Log out
export function logoutCurrentUser() {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    notifyUserChange(null);
  } catch (e) {
    console.error('Error logging out', e);
  }
}

// 7. Google Auth Client ID Config (for Google Cloud Console Client ID)
export function getGoogleAuthConfig() {
  try {
    const raw = localStorage.getItem(GOOGLE_AUTH_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    clientId: '',
    enabled: true
  };
}

export function saveGoogleAuthConfig(config) {
  try {
    localStorage.setItem(GOOGLE_AUTH_CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (e) {
    return false;
  }
}

// 8. Increment user order count
export function incrementUserOrderCount(email) {
  if (!email) return;
  try {
    const users = getRegisteredUsers();
    const updated = users.map(u => {
      if (u.email && u.email.toLowerCase() === email.toLowerCase()) {
        return { ...u, orderCount: (u.orderCount || 0) + 1 };
      }
      return u;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
}

// 9. Increment user review count
export function incrementUserReviewCount(email) {
  if (!email) return;
  try {
    const users = getRegisteredUsers();
    const updated = users.map(u => {
      if (u.email && u.email.toLowerCase() === email.toLowerCase()) {
        return { ...u, reviewCount: (u.reviewCount || 0) + 1 };
      }
      return u;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
}

// 10. Decrement user review count
export function decrementUserReviewCount(email) {
  if (!email) return;
  try {
    const users = getRegisteredUsers();
    const updated = users.map(u => {
      if (u.email && u.email.toLowerCase() === email.toLowerCase()) {
        return { ...u, reviewCount: Math.max(0, (u.reviewCount || 1) - 1) };
      }
      return u;
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
}

