import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

export const connect = async () => {
	await mongoose
		.connect(MONGODB_URI)
		.then(() => {
			console.log('connected to the database');
		})
		.catch((error) => {
			console.error('error connecting to the database:', error);
		});
};
