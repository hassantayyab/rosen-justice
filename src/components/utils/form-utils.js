import * as Yup from 'yup'

// Encode for Netlify
function encode(data) {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&')
}

// Schema for validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
export const Schema = Yup.object().shape({
	firstName: Yup.string()
		.min(3, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	lastName: Yup.string()
		.min(3, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	phone: Yup.string().matches(phoneRegExp, 'Invalid').required('Required'),
	message: Yup.string().required('Required'),
})

export function submitForm(values, setSubmitting, resetForm) {
	return new Promise((resolve, reject) => {
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': 'contact',
				...values,
			}),
		})
			.then(() => {
				resolve(true)
			})
			.catch(() => {
				reject(false)
			})
	})
}
