class ImportHTML extends HTMLElement {
    get src() {
        return this.getAttribute('src') || ''
    }

    connectedCallback() {
        if (this.src) {
            this.innerHTML = `<iframe src="${this.src}"></iframe>`

            const frame = this.querySelector('iframe')
            frame.addEventListener('load', (evt) => {
                const children = [...frame.contentDocument.body.children]
                children.forEach((child) => this.before(child))
                frame.remove()
                this.remove()
            })
        }
    }
}

if ('customElements' in window) {
    customElements.define('import-html', ImportHTML)
}

export default ImportHTML
