import { message } from 'antd';

const fetcher = async (url: string, options?: RequestInit) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options?.headers || {}),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            message.error(errorData.message || 'An error occurred');
            throw new Error(errorData.message || 'An error occurred');
        }

        return await response.json();
    } catch (error) {
        message.error('Network error: ' + error.message);
        throw error;
    }
};

export default fetcher;