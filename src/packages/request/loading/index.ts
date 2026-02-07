import './index.scss'

export interface LoadingOptions {
  text?: string
  /** 自定义遮罩层类名 */
  overlayClass?: string
  /** 自定义类名（内容区） */
  className?: string
}

const defaultOptions: Required<LoadingOptions> = {
  text: '加载中...',
  overlayClass: '',
  className: '',
}

const options: Required<LoadingOptions> = { ...defaultOptions }

function applyLoadingOptionsToDOM(): void {
  const el = Loading.instance.element
  if (!el) return
  const textEl = el.querySelector('.request-indicator-text')
  if (textEl) textEl.textContent = options.text
  const mask = el.querySelector('.request-indicator-mask')
  if (mask && options.overlayClass) {
    mask.classList.add(...options.overlayClass.trim().split(/\s+/).filter(Boolean))
  }
  const wrapper = el.querySelector('.request-indicator-wrapper')
  if (wrapper && options.className) {
    wrapper.classList.add(...options.className.trim().split(/\s+/).filter(Boolean))
  }
}

export function setLoadingOptions(o: LoadingOptions): void {
  if (o.text !== undefined) options.text = o.text
  if (o.overlayClass !== undefined) options.overlayClass = o.overlayClass
  if (o.className !== undefined) options.className = o.className
  applyLoadingOptionsToDOM()
}

class Loading {
  static instance: Loading
  element: HTMLElement | null = null

  createLoading(): void {
    const indicatorWrapper = document.createElement('div')
    indicatorWrapper.classList.add('request-indicator-wrapper')
    if (options.className) {
      indicatorWrapper.classList.add(...options.className.trim().split(/\s+/).filter(Boolean))
    }

    const spinnerWrapper = document.createElement('div')
    spinnerWrapper.classList.add('request-indicator-spin')

    const spinner = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    spinner.classList.add('request-spinner')
    spinner.setAttribute('viewBox', '0 0 50 50')
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', '25')
    circle.setAttribute('cy', '25')
    circle.setAttribute('r', '20')
    circle.setAttribute('fill', 'none')
    circle.setAttribute('stroke', 'currentColor')
    circle.setAttribute('stroke-width', '4')
    circle.setAttribute('stroke-linecap', 'round')
    circle.setAttribute('stroke-dasharray', '20 110')
    spinner.appendChild(circle)
    spinnerWrapper.appendChild(spinner)

    const text = document.createElement('span')
    text.classList.add('request-indicator-text')
    text.textContent = options.text

    indicatorWrapper.appendChild(spinnerWrapper)
    indicatorWrapper.appendChild(text)

    const indicator = document.createElement('div')
    indicator.classList.add('request-indicator')
    indicator.style.display = 'none'
    indicator.appendChild(indicatorWrapper)

    const mask = document.createElement('div')
    mask.classList.add('request-indicator-mask')
    if (options.overlayClass) {
      mask.classList.add(...options.overlayClass.trim().split(/\s+/).filter(Boolean))
    }

    indicator.appendChild(mask)

    this.element = indicator
    document.body.appendChild(this.element)
  }

  showLoading(): void {
    if (!this.element) {
      this.createLoading()
    }
    this.element!.style.display = 'block'
  }

  hideLoading(): void {
    if (this.element) {
      this.element.style.display = 'none'
    }
  }

  static open(): void {
    Loading.instance.showLoading()
  }

  static close(): void {
    Loading.instance.hideLoading()
  }
}

Loading.instance = new Loading()

let COUNT = 0

const loading = {
  show(): void {
    if (COUNT === 0) {
      Loading.open()
    }
    COUNT++
  },
  hide(): void {
    if (COUNT <= 0) return
    COUNT--
    if (COUNT === 0) Loading.close()
  },
}

export default loading
