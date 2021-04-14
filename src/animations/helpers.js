export const View = {
	threshold: 0.25,
	triggerOnce: true,
}

export const animate = (InView) => {
	return InView ? 'animate' : ''
}
