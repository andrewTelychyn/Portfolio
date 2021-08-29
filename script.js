var prevScrollpos = window.pageYOffset
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset
    let headerTimeline = new TimelineMax()

    if (prevScrollpos > currentScrollPos) {
        headerTimeline
            .to("#header", 1, { opacity: 1 })
            .to("#header", 1, { display: "flex" }, "-=1")
    } else {
        headerTimeline
            .to("#header", 1, { opacity: 0 })
            .to("#header", 1, { display: "none" }, "-=1")
    }

    prevScrollpos = currentScrollPos
}

let helloTimeline = new TimelineMax()
helloTimeline
    .to("#hello-p", { duration: 1.2, top: "0px", ease: "power1.out" })
    .to("#hello-p", 0.4, { top: "-300px" }, "+=1.2")
    .to("#hello-div", 0.1, { display: "none" })
    .fromTo(
        "#block-1-h2",
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "sine.out" }
    )
    .fromTo(
        "#image-1",
        { right: "min(-60vw, -1000px)" },
        { right: "0px", duration: 0.7, ease: "sine.out" },
        "-=0.6"
    )

let controller = new ScrollMagic.Controller()

let scene = new ScrollMagic.Scene({
    triggerElement: "#block-1",
    duration: "90%",
    triggerHook: 0,
})
    .setTween(
        new TimelineMax().fromTo(
            "#image-1",
            { top: "-32%" },
            { top: "18%", duration: 3 }
        )
    )
    .addTo(controller)
//.addIndicators()

let scene2 = new ScrollMagic.Scene({
    triggerElement: "#block-2",
    triggerHook: 1,
    offset: 950,
    duration: "150%",
})
    .setTween(
        new TimelineMax().fromTo(
            "#image-2",
            { top: "-53%" },
            { top: "00%", duration: 2 }
        )
    )
    .addTo(controller)
//.addIndicators()

let scene3 = new ScrollMagic.Scene({
    triggerElement: "#block-4",
    triggerHook: 1,
    offset: 200,
    duration: "50%",
})
    .setTween(
        new TimelineMax().fromTo(
            "#text-frame-1",
            { top: "-25%" },
            { top: "00%", duration: 5 }
        )
    )
    .addTo(controller)
//.addIndicators()

let scene4 = new ScrollMagic.Scene({
    triggerElement: "#block-5",
    triggerHook: 1,
    //offset: 700,
    duration: "100%",
})
    .setTween(
        new TimelineMax().fromTo(
            "#text-frame-2",
            { top: "0%" },
            { top: "-25%", duration: 5 }
        )
    )
    .addTo(controller)
//.addIndicators()

let scene5 = new ScrollMagic.Scene({
    triggerElement: "#block-6",
    triggerHook: 1,
    //offset: 700,
    duration: "100%",
})
    .setTween(
        new TimelineMax().fromTo(
            "#image-frame-3",
            { top: "-40%" },
            { top: "2%", duration: 5 }
        )
    )
    .addTo(controller)
//.addIndicators()

let block = document.getElementById("text-frame-1")
let halfsize = 200 / 2

let lastTimeValue = 0
let lastID

const onMouseMove = (e) => {
    let rect = block.getBoundingClientRect()

    if (lastID) {
        let circleTimelineStart = new TimelineMax()
        let clientx = e.clientX || e.touches[0].clientX
        let clienty = e.clientY || e.touches[0].clientY

        circleTimelineStart.to(`#${lastID}`, 0.8, {
            left: clientx - rect.left - halfsize + "px",
            top: clienty - rect.top - halfsize + "px",
        })
    }

    let timeValue = Math.round(Date.now() / 100)
    if (timeValue !== lastTimeValue) {
        lastTimeValue = timeValue

        let elem = document.createElement("div")

        let id = "circle" + timeValue
        elem.setAttribute("class", "circle")
        elem.setAttribute("id", id)

        let clientx = e.clientX || e.touches[0].clientX
        let clienty = e.clientY || e.touches[0].clientY

        elem.style.left = clientx - rect.left - halfsize + "px"
        elem.style.top = clienty - rect.top - halfsize + "px"

        let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        elem.style.backgroundColor = color
        elem.innerText = color.toUpperCase()

        block.appendChild(elem)

        lastID = id

        setTimeout(
            (objectId) => {
                let item = document.getElementById(objectId)

                if (item) {
                    let circleTimelineEnd = new TimelineMax({
                        onComplete: removeElement,
                        onCompleteParams: [item],
                    })

                    let y = Number(item.style.top.split("px")[0]) + halfsize
                    let x = Number(item.style.left.split("px")[0]) + halfsize

                    circleTimelineEnd
                        .to(`#${objectId}`, 0.8, {
                            height: "15px",
                            width: "15px",
                            top: y + "px",
                            left: x + "px",
                        })
                        .to(
                            `#${objectId}`,
                            0.3,
                            {
                                opacity: 0,
                            },
                            "-= 0.2"
                        )
                }
            },
            800,
            id
        )
    }
}

const removeElement = (item) => block.removeChild(item)

block.addEventListener("mousemove", onMouseMove)
block.addEventListener("touchmove", onMouseMove)

let email = document.getElementById("email")
let hrTimeline = new TimelineMax()

const emailMouseOver = (e) => {
    hrTimeline.fromTo(
        "#hr-email",
        { opacity: 1 },
        { width: "100%", duration: 0.4 }
    )
}

const emailMouseOut = (e) => {
    hrTimeline
        .to("#hr-email", 0.4, { width: "0%" })
        .to("#hr-email", 0.2, { opacity: 0 }, "-=0.1")
}

email.addEventListener("mouseenter", emailMouseOver)
email.addEventListener("mouseleave", emailMouseOut)

let projectImages = document.getElementsByClassName("project-image")
let limits = {
    "project-image-1": { value: 11, name: "ChatApp" },
    "project-image-2": { value: 6, name: "SocialApp" },
    "project-image-3": { value: 3, name: "Skoda" },
    "project-image-4": { value: 2, name: "ToDoList" },
    "project-image-5": { value: 1, name: "Calculator" },
}

const onProjectPhotoClick = (e) => {
    let projectImage = e.target
    let rect = projectImage.getBoundingClientRect()
    let x = e.clientX - rect.left

    let style = projectImage.style.background
    let value
    if (style === "") value = 1
    else {
        let number = Number(style.match(/\d+/g)[0])
        if (rect.width / 2 > x) {
            number -= 1
            value = number >= 1 ? number : limits[projectImage.id].value
        } else {
            number += 1
            value = number <= limits[projectImage.id].value ? number : 1
        }
    }
    projectImage.style.background = `url(\"projects/${
        limits[projectImage.id].name
    }/${value}.jpg\") no-repeat`
    projectImage.style.backgroundSize = "contain"
}

Array.from(projectImages).forEach((elem) => {
    elem.addEventListener("click", onProjectPhotoClick)
})

let showMore = false
let showMoreTimeline = new TimelineMax()

let moresButton = document.getElementsByClassName("more-button")
let content = {
    "more-button-1":
        "<h3>What does this messenger is able to:</h3><ul><li><h5>the ability to search for a chat among active chats, contacts and other users in the database;</h5>" +
        "</li><li><h5>create groups with multiple members;</h5></li><li><h5>send photos in a chat as a message;</h5></li><li><h5>add a user to contacts;</h5></li><li>" +
        "<h5>the need to confirm a new chat, if the user is not among your contacts;</h5></li><li><h5>indicate the state of each message - whether it has been read or not;</h5>" +
        "</li><li><h5>nice design - Telegram Desktop is taken as a reference;</h5></li><li><h5>show info about chat - whether it is personal chat with a user or a group;</h5>" +
        "</li></ul><h3>What technologies was used:</h3><ul><li><h5>react, typeScript</h5></li><li><h5>redux</h5></li><li><h5>nodeJS, express</h5></li><li><h5>mongoDB, mongoose</h5></li>" +
        '<li><h5>react-spring</h5></li><li><h5>SCSS</h5></li></ul><a href="https://github.com/andrewTelychyn/ChatApp" target="_blank"><h3>GitHub</h3></a>',
    "more-button-2":
        "<h3>What does this app is able to:</h3><ul><li><h5>login/logout to the app;</h5></li><li><h5>edit Your personal info - such as photo/bio;</h5>" +
        "</li><li><h5>post any thought that You think might be interesting to hear;</h5></li><li><h5>subscribe to any user so that You can see his recent posts;</h5>" +
        "</li><li><h5>leave a comment on any post;</h5></li><li><h5>ability to like any post or comment;</h5></li><li><h5>trending posts among all users from recent week - the most popular will be the highest;</h5>" +
        "</li><li><h5>nice design;</h5></li></ul><h3>What technologies was used:</h3><ul><li><h5>asp.net core, c#;</h5></li><li><h5>ms sql server;</h5></li><li><h5>react, javaScript;</h5></li>" +
        "<li><h5>rest api;</h5></li><li><h5>jwt token authorization/authentication;</h5></li><li><h5>multilayer backend application;</h5></li></ul>" +
        '<a href="https://github.com/andrewTelychyn/SocialApp" target="_blank"><h3>GitHub</h3></a>',
}

let chosenId
let keys = Object.keys(content)
const showMoreFunc = (e) => {
    if (!showMore) {
        chosenId = e.target.id

        e.target.id === keys[0]
            ? (document.getElementById("right-project-arrow").style.display =
                  "block")
            : (document.getElementById("left-project-arrow").style.display =
                  "block")

        document.getElementById("project-plus-info").innerHTML =
            content[e.target.id]

        showMoreTimeline.to("#inner-block", 2, {
            height: "max(1050px, 100vh)",
        })
        showMore = true
    } else {
        let currentArrow =
            chosenId === keys[0]
                ? "#right-project-arrow"
                : "#left-project-arrow"
        showMoreTimeline
            .to("#inner-block", 2, {
                height: "0px",
            })
            .to(currentArrow, 0.1, { display: "none" })
        showMore = false
    }
}

Array.from(moresButton).forEach((elem) => {
    elem.addEventListener("click", showMoreFunc)
})

let edges = document.getElementsByClassName("project-edge")

const onScrollFunc = (e) => {
    Array.from(edges).forEach((elem) => {
        elem.style.left = -e.target.scrollLeft + "px"
    })
}

document.getElementById("projects").addEventListener("scroll", onScrollFunc)

let projectInfoPlusTextTimeMax = new TimelineMax()
const projectInfoPlusText = (e) => {
    let chosenContent
    let arrows
    if (chosenId === keys[0]) {
        chosenContent = content[keys[1]]
        arrows = ["#right-project-arrow", "#left-project-arrow"]
        chosenId = keys[1]
    } else {
        chosenContent = content[keys[0]]
        arrows = ["#left-project-arrow", "#right-project-arrow"]
        chosenId = keys[0]
    }

    projectInfoPlusTextTimeMax
        .to("#project-plus-info", 1, { opacity: 0 })
        .to(arrows[0], 1, { opacity: 0 }, "-=1")
        .to(arrows[0], 0.1, { display: "none" })
        .to(arrows[1], 0.1, { opacity: 0, display: "block" })
        .to("#project-plus-info", 0.1, { innerHTML: chosenContent })
        .to("#project-plus-info", 1, { opacity: 1 })
        .to(arrows[1], 1, { opacity: 1 }, "-=1")
}

document
    .getElementById("right-project-arrow")
    .addEventListener("click", projectInfoPlusText)

document
    .getElementById("left-project-arrow")
    .addEventListener("click", projectInfoPlusText)

// var html = document.documentElement
// var body = document.body

// var scroller = {
//     target: document.querySelector("#main-section"),
//     ease: 0.05, // <= scroll speed
//     endY: 0,
//     y: 0,
//     resizeRequest: 1,
//     scrollRequest: 0,
// }

// var requestId = null
// TweenLite.set(scroller.target, {
//     rotation: 0.01,
//     force3D: true,
// })

// window.addEventListener("load", onLoad)
// function onLoad() {
//     updateScroller()
//     window.focus()
//     window.addEventListener("resize", onResize)
//     document.addEventListener("scroll", onScroll)
// }

// function updateScroller() {
//     var resized = scroller.resizeRequest > 0
//     if (resized) {
//         var height = scroller.target.clientHeight
//         body.style.height = height + "px"
//         scroller.resizeRequest = 0
//     }

//     var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0

//     scroller.endY = scrollY
//     scroller.y += (scrollY - scroller.y) * scroller.ease

//     if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
//         scroller.y = scrollY
//         scroller.scrollRequest = 0
//     }

//     TweenLite.set(scroller.target, {
//         y: -scroller.y,
//     })
//     requestId =
//         scroller.scrollRequest > 0
//             ? requestAnimationFrame(updateScroller)
//             : null
// }

// function onScroll() {
//     scroller.scrollRequest++
//     if (!requestId) {
//         requestId = requestAnimationFrame(updateScroller)
//     }
// }

// function onResize() {
//     scroller.resizeRequest++
//     if (!requestId) {
//         requestId = requestAnimationFrame(updateScroller)
//     }
// }
