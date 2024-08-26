import { model, Schema } from 'mongoose';

const user = new Schema({
	name: {
		type: String,
		default: () => (this as any).tag
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
});

model('User', user);
