const injectMakerWidgetScript = () => {
	function addJS() {
		const s = document.createElement(`script`)
		s.type = `text/javascript`
		s.src = 'https://scripts.iconnode.com/84616.js'
		document.getElementsByTagName(`head`)[0].appendChild(s)
	}
	addJS()
}

const loadPolyfills = () => {
	if (typeof window.IntersectionObserver === 'undefined') {
		import('intersection-observer')
	}
}

const addScript = (url) => {
	const script = document.createElement('script')
	script.src = url
	script.async = true
	document.body.appendChild(script)
}

exports.onClientEntry = (s) => {
	addScript(
		'https://localreviews.buzz/embed/v4/161843050721504/3/1234567935183'
	)
	injectMakerWidgetScript()

	loadPolyfills()
}
exports.onPreRouteUpdate = (s) => {
	addScript(
		'https://localreviews.buzz/embed/v4/161843050721504/3/1234567935183'
	)
	injectMakerWidgetScript()
}
