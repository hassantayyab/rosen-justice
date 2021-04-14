export const size = {
	xs: 480, // mobile
	sm: 768, // larger mobile
	md: 1024, // tablet
	mdx: 1200, // laptop small
	lg: 1440, // laptop
	xl: 1441, // desktop
}

export const device = {
	xs: `(max-width: ${size.xs}px)`,
	sm: `(max-width: ${size.sm}px)`,
	md: `(max-width: ${size.md}px)`,
	mdx: `(max-width: ${size.mdx}px)`,
	lg: `(max-width: ${size.lg}px)`,
	xl: `(min-width: ${size.xl}px)`,
}
