class HTMLIncludeElementHandler {
    constructor(origin) {
        this.origin = origin
    }

    async element(element) {
        const src = element.getAttribute('src')
        if (src) {
            try {
                const content = await this.fetchContents(src)
                if (content) {
                    element.before(content, { html: true })
                    element.remove()
                }
            } catch (err) {
                console.error('could not replace element', err)
            }
        }
    }

    async fetchContents(src) {
        const url = new URL(src, this.origin).toString()
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'user-agent': 'cloudflare'
            }
        })
        const content = await response.text()
        return content
    }
}

export default {
    async fetch(request, env) {
        const response = await env.ASSETS.fetch(request)
        const contentType = response.headers.get('Content-Type')

        if (!contentType || !contentType.startsWith('text/html')) {
            return response
        }

        const origin = new URL(request.url).origin
        const rewriter = new HTMLRewriter().on(
            'html-include',
            new HTMLIncludeElementHandler(origin)
        )

        return rewriter.transform(response)
    }
}
