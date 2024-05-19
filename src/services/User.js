import Cookies from 'universal-cookie';

const URL_API = 'http://localhost:8088'
const cookies = new Cookies();

export const login = async (userData) => {
    try {

        const response = await fetch(`${URL_API}/api/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const token = await response.text();

        cookies.set("token", token);

        return response;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        cookies.remove("token");
    } catch (error) {
        console.error('Error logout:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${URL_API}/api/Auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const token = cookies.get('token');

        const response = await fetch('http://localhost:8088/api/v1/User', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getUserById = async (id) => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!token) {
        throw new Error('Token not found');
    }

    try {
        const response = await fetch(`${URL_API}/api/v1/User/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user by ID');
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const token = cookies.get('token');

        const response = await fetch(`${URL_API}/api/v1/User`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {

        const token = cookies.get('token');

        const response = await fetch(`${URL_API}/api/v1/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

export const deleteUser = async (id) => {
    try {
        const token = cookies.get('token');
        const response = await fetch(`${URL_API}/api/v1/User/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    } catch (error) {
        console.error('Error delete user:', error);
    }
};

export const changeStatusUser = async (id) => {
    try {
        const token = cookies.get('token');
        const response = await fetch(`${URL_API}/api/v1/User/ChangeStatus/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to change status user');
        }
    } catch (error) {
        console.error('Error change user:', error);
    }
};