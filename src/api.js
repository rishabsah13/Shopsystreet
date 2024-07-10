import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shopsystreet-3.vercel.app/'
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);
export const createOrder = (order) => api.post('/orders', order);
export const createPaymentIntent = (items) => api.post('/payments/create-payment-intent', { items });
export const confirmPayment = (paymentIntentId, orderId) => api.post('/payments/confirm-payment', { paymentIntentId, orderId });




export default api;
