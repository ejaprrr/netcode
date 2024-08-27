import mongoose from 'mongoose';

const user = new mongoose.Schema(
	{
		name: {
			type: String,
			default: undefined
		},
		tag: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ versionKey: false }
);

export const User = mongoose.models.User ?? mongoose.model('User', user);
