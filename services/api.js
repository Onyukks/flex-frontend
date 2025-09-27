export const fetchReviews = async () => {
    const response = await fetch('http://localhost:3000/api/reviews/hostaway');
    const data = await response.json();
    return data.result; 
};
