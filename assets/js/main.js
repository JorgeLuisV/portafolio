class Main{
    constructor() {
        this.sectionsTop = null
        this.isResizing = null
        this.isScrolling = null
        this.projects = null
        this.setInfo()
        this.initAOS()
        this.makeNavLinksSmooth()
        this.getSectionsTop()
        this.spyScrolling()
        this.resizeListener()
        this.menuToggle()
        this.initProjects()
        this.initOtherProjects()
        this.workLinks()
        this.setImgType()
        this.galleryListener()
    }

    static setInfo() {
        const currDate = new Date(),
            years = currDate.getFullYear() - 2015;
        
        document.querySelector('#about .years').innerHTML = years
        document.querySelector('.footer span:last-child').innerHTML = 'Copyright © 2020 Jorge Vásquez'
    }

    initAOS() {
        window.onload = () => {
            AOS.init({
                offset: 50,
                once: true
            })
        }
    }

    makeNavLinksSmooth() {
        const navLinks = document.querySelectorAll('.sscroll')

        for(let n in navLinks) {
            if (navLinks.hasOwnProperty(n)) {
                navLinks[n].addEventListener('click', e => {
                    e.preventDefault( )
                    
                    document.querySelector(navLinks[n].hash)
                    .scrollIntoView({
                        behavior: 'smooth'
                    })

                    let navbar = document.getElementsByClassName('navbar')

                    setTimeout(function(){
                        let menuBtn = document.getElementsByClassName('navicon-button')[0]

                        menuBtn.classList.remove('open')
                        navbar[0].classList.remove('expanded')
                    }, 100)
                })
            }
        }
    }

    workLinks() {
        let workLinks = document.querySelectorAll('span.link')

        workLinks.forEach(item => {
            item.addEventListener('click', e => {
                let link = e.currentTarget.getAttribute('data-link')

                window.open(link, '_blank')
            }) 
        })
    }

    solidNavheader(navsolid = false) {
        let scrollPos = document.documentElement.scrollTop || document.body.scrollTop,
            response = false

        if (scrollPos > 80) response = true;

        if (navsolid) {
            let navheader = document.getElementsByClassName('nav-header')[0]
            
            if (response) {
                if (!navheader.classList.contains('solid')) navheader.classList.add('solid')
            } else {
                if (navheader.classList.contains('solid')) navheader.classList.remove('solid')
            }
        }

        return response
    }

    getSectionsTop() {
        let sections = document.querySelectorAll('section')

        this.sectionsTop = []

        sections.forEach(section => {
            let item = {id: section.id, top: section.offsetTop - 200}

            this.sectionsTop.push(item)
        })
    }

    resizeListener() {
        window.onresize = () => {
            window.clearTimeout(this.isResizing)
            
            this.isResizing = setTimeout(() => {
                this.getSectionsTop()
            }, 400)

            this.setImgType()
        }
    }

    setImgType() {
        const setImages = (imgType = null) => {
            if (!imgType) imgType = ''
            
            this.images =  {
                type: imgType,
                data: [{
                            id: 'bgadmin',
                            src: `./assets/images/bgadmin_reservas${imgType}.png`,
                            thumb: `./assets/images/bgadmin_reservas${imgType}.png`,
                            subHtml: "<h4>Buscagol Admin</h4><p>En la plataforma se gestiona las principales áreas del negocio</p>"
                        }, {
                            id: 'bgadmin',
                            src: `./assets/images/bgadmin_estadisticas${imgType}.png`,
                            thumb: `./assets/images/bgadmin_estadisticas${imgType}.png`,
                            subHtml: "<h4>Buscagol Admin</h4><p>Las estadísticas de reservas, montos y clientes mejoran la toma de desiciones</p>"
                        },
                        {
                            id: 'sgdacp',
                            src: `./assets/images/sgd_login${imgType}.png`,
                            thumb: `./assets/images/sgd_login${imgType}.png`,
                            subHtml: "<h4>SGD ACP</h4><p>La plataforma aloja la documentación y utiliza un sistema de control de versiones</p>"
                        }, {
                            id: 'sgdacp',
                            src: `./assets/images/sgd_inicio${imgType}.png`,
                            thumb: `./assets/images/sgd_inicio${imgType}.png`,
                            subHtml: "<h4>SGD ACP</h4><p>La plataforma se hizo según las necesidades de la empresa y bajo la norma ISO 9001</p>"
                        }, {
                            id: 'mcp',
                            src: `./assets/images/full_size/mcp${imgType}.png`,
                            thumb: `./assets/images/mcp${imgType}.png`,
                            subHtml: "<h4>Presupuestos ACP</h4><p>Módulo que agiliza la elaboración y aprobación de presupuestos en Agrícola Cerro Prieto</p>"
                        }]
            }
        }
        
        if (document.documentElement.clientWidth < 768) {
            if (this.images && this.images.type === '_phone') return
            setImages('_phone')
        } else {
            if (this.images && this.images.type === '') return
            setImages()
        }
    }

    detectCurrentSection() {
        this.solidNavheader(true)

        let scrolly = window.scrollY,
            sectionId = null

        this.sectionsTop.forEach(section => {
            if (section.top < scrolly) sectionId = section.id
        })

        if (sectionId === 'skills') {
            let section = document.getElementById(sectionId)

            if (section.getAttribute('data-animation') === 'false') {
                section.setAttribute('data-animation', 'true')
                setTimeout(() => this.animateIndicators(), 2700)
            }
        }

        document.querySelector('.active').classList.remove('active')
        document.querySelector(`a[href*=${sectionId}]`).parentNode.classList.add('active')
    }

    spyScrolling() {
        this.detectCurrentSection()

        window.onscroll = () => {
            window.clearTimeout(this.isScrolling)

            this.isScrolling = setTimeout(() => this.detectCurrentSection(), 66)
        }
    }

    menuToggle() {
        let menuBtn = document.getElementsByClassName('navicon-button'),
            classToggle = (e) => {
                let menu = e.currentTarget,
                    navheader = document.getElementsByClassName('nav-header')[0],
                    navbar = document.getElementsByClassName('navbar')[0]

                if (menu.classList.contains('open')) {
                    if (this.solidNavheader()) navheader.classList.add('solid')

                    menu.classList.remove('open')
                    navbar.classList.remove('expanded')
                } else {
                    if (this.solidNavheader()) navheader.classList.remove('solid')

                    menu.classList.add('open')
                    navbar.classList.add('expanded')
                }
            }

        menuBtn[0].addEventListener('click', classToggle)
    }

    animateIndicators() {
        let displays = document.querySelectorAll('.donut')

        displays.forEach(display => {
            let percentage = parseInt(display.parentNode.getAttribute('data-percentage')),
                difference = 100 - percentage,
                progress   = display.querySelector('.donut-segment')
            
            progress.style.strokeDasharray = `${percentage} ${difference}`

            let number = display.querySelectorAll('text')[0],
                value  = number.getAttribute('data-count')

            let countUp = new CountUp(number, value, {suffix: '%'})
            if (!countUp.error) countUp.start()
        })
    }

    initProjects() {
        this.projects = new Glide('#projects')

        this.projects.mount()

        let slides = document.querySelectorAll('#projects .glide__slide'),
            pages = document.getElementsByClassName('pages')[0],
            total = document.getElementsByClassName('total')[0]

        slides.forEach((currentval, index, array) => {
            let number = document.createElement('li'),
                textnode = document.createTextNode(index+1)

            number.className = 'number'
            number.appendChild(textnode)

            pages.appendChild(number)
        })

        total.innerHTML = `/ ${slides.length}`

        this.projects.on('run', () => {
            let index   = this.projects.index,
                value   = index * 45,
                arrows  = document.getElementsByClassName('glide__arrows')[0],
                left    = arrows.querySelectorAll('button:first-child')[0],
                right   = arrows.querySelectorAll('button:last-child')[0],
                nslides = slides.length - 1
            
            if (index > 0 && index < nslides) {
                left.disabled = false
                right.disabled = false
            }

            if (index === 0) {
                right.disabled = false
                left.disabled = true
            }

            if (index === nslides) {
                left.disabled = false
                right.disabled = true
            }
            
            pages.style.transform = `translateY(-${value}px)`
        })
    }

    initOtherProjects() {
        this.otherProjects = new Glide('#otherProjects', {
                                startAt: 0,
                                perView: 4,
                                keyboard: false,
                                bound: true,
                                breakpoints: {
                                    992: {
                                      perView: 3
                                    },
                                    767: {
                                      perView: 1
                                    }
                                }
                            })
                            .mount()
    }

    galleryListener() {
        const workLinks = document.querySelectorAll('.gallery')

        workLinks.forEach(item => {
            item.addEventListener('click', e => {
                const element = e.currentTarget,
                    gallery = element.getAttribute('data-gallery')

                let data = this.images.data.filter(image => image.id === gallery),
                    lgUid = element.getAttribute('lg-uid')

                if (lgUid) window.lgData[lgUid].destroy(true)

                lightGallery(element, {
                    download: false,
                    zoom: true,
                    pager: true,
                    enableSwipe: true,
                    loop: false,
                    dynamic: true,
                    dynamicEl: data
                })
            }) 
        })
    }
}

(() => {
    const main = new Main()
    console.log(main)
})()