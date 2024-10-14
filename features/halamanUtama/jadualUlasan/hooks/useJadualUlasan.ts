
export const useJadualUlasan = () => {

    const fetchJadualUlasan = async () => {
        try {
            const res = await fetch('/api/ulasan');
            const data = await res.json();
            console.log('Jadual Ulasan:', data);
            return data;
        } catch (err) {
            console.error('Error fetching jadual ulasan:', err);
            return { error: 'Failed to fetch jadual ulasan' };
        }
    };


    return {fetchJadualUlasan};
}