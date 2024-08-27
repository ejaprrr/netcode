// tag creation validation
export const validateNewTag = async (tag: string) => {
	if (tag.length < 4) {
		return 'tag must be at least 4 characters';
	}
	if (tag.length > 24) {
		return 'tag must be at most 24 characters';
	}
	if (!/^[a-zA-Z0-9_]+$/.test(tag)) {
		return 'tag must only contain english letters, numbers, and underscores';
	}
};

// password creation validation
export const validateNewPassword = (password: string) => {
	if (password.length < 8) {
		return 'password must be at least 8 characters';
	}
	if (password.length > 64) {
		return 'password must be at most 64 characters';
	}
	if (password.includes(' ')) {
		return 'password must not contain spaces';
	}
	if (!/[a-z]/.test(password)) {
		return 'password must contain at least one lowercase letter';
	}
	if (!/[A-Z]/.test(password)) {
		return 'password must contain at least one uppercase letter';
	}
	if (!/[0-9]/.test(password)) {
		return 'password must contain at least one number';
	}
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		return 'password must contain at least one special character';
	}
};

export const validateTag = async (tag: string) => {
	if (tag.length == 0) {
		return 'tag is required';
	}
};

export const validatePassword = async (password: string) => {
	if (password.length == 0) {
		return 'password is required';
	}
};
