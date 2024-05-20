import Cookies from 'universal-cookie';

const URL_API = 'http://localhost:8088'
const cookies = new Cookies();

export const getAllDevices = async () => {
    try {
        const token = cookies.get('token');

        const response = await fetch('http://localhost:8088/api/v1/Device', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch devices');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        throw error;
    }
};

export const getDeviceById = async (id) => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!token) {
        throw new Error('Token not found');
    }

    try {
        const response = await fetch(`${URL_API}/api/v1/Device/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch device by ID');
        }

        const deviceData = await response.json();
        return deviceData;
    } catch (error) {
        console.error('Error fetching device by ID:', error);
        throw error;
    }
};

export const createDevice = async (deviceData) => {
    try {
        const token = cookies.get('token');

        const response = await fetch(`${URL_API}/api/v1/Device`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            throw new Error('Failed to register device');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering device:', error);
        throw error;
    }
};

export const updateDevice = async (id, deviceData) => {
    try {

        const token = cookies.get('token');

        const response = await fetch(`${URL_API}/api/v1/Device/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            throw new Error('Failed to update device');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating device:', error);
    }
};

export const deleteDevice = async (id) => {
    try {
        const token = cookies.get('token');
        const response = await fetch(`${URL_API}/api/v1/Device/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete device');
        }
    } catch (error) {
        console.error('Error delete device:', error);
    }
};

export const changeStatusDevice = async (id) => {
    try {
        const token = cookies.get('token');
        const response = await fetch(`${URL_API}/api/v1/Device/ChangeStatus/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to change status device');
        }
    } catch (error) {
        console.error('Error change device:', error);
    }
};