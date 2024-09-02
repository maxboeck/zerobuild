export class HTMLIncludeElement extends HTMLElement {
    get src() {
        return this.getAttribute('src')
    }

    async connectedCallback() {
        if (this.src) {
            let text = ''
            try {
                const response = await fetch(this.src, { mode: 'cors' })
                if (!response.ok) {
                    throw new Error(
                        `html-include fetch failed: ${response.statusText}`
                    )
                }
                text = await response.text()
            } catch (e) {
                console.error(e)
            }

            this.replaceContent(text)
            this.dispatchEvent(new Event('load'))
        }
    }

    replaceContent(text) {
        const template = document.createElement('template')
        template.innerHTML = text
        this.before(template.content)
        this.remove()
    }
}

if ('customElements' in window) {
    customElements.define('html-include', HTMLIncludeElement)
}

export default HTMLIncludeElement
