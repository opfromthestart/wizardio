"use strict"
function combined() {
    movechar(direction())
    draw()
    if (canvas.width != innerWidth && canvas.height != innerHeight) {
        canvas.width = innerWidth
        canvas.height = innerHeight
        xChar = canvas.width / 2
        yChar = canvas.height / 2
    }
    spelList = updSpell(spelList)
    if (FstrCount) {
        Fcount++
        if (Fcount > 65) {
            Fcount = 0
            FstrCount = false
        }
        else {
            context.beginPath()
            context.fillStyle = "dodgerblue"
            context.fillRect(5, 5, 20, 65 - Fcount)
        }
    }
    if (WstrCount) {
        Wcount++
        if (Wcount > 65) {
            Wcount = 0
            WstrCount = false
        }
        else {
            context.beginPath()
            context.fillStyle = "black"
            context.fillRect(25, 5, 20, 65 - Wcount)
        }
    }
    var x = 39-xCanv % 39
    var y = 39-yCanv % 39
    canvas.style.backgroundPosition = x + "px " + y + "px"
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height, 18, 18);
    context.beginPath()
    context.arc(xChar, yChar, 10, 0, 2* Math.PI)
    context.fillStyle = "crimson"
    context.fill()
}
function updSpell(spel) {
    var retArr = []
    if (spel.length != 0) {
        spel.forEach(function (spl) {
            if (spl.sp == 87 || spl.sp == 81) {
                context.beginPath()
                context.arc(spl.xc - xCanv, spl.yc - yCanv, 3, 0, 2 * Math.PI)
                switch (spl.sp) {
                    case 87:
                        context.fillStyle = "dodgerblue"
                        break;
                    case 81:
                        context.fillStyle = "black"
                        break;
                }
                context.fill()
                if (spl.t < 166) {
                    retArr = retArr.concat({ xc: spl.xc + 15 * spl.dir.x, yc: spl.yc + 15 * spl.dir.y, dir: spl.dir, sp: spl.sp, t: spl.t + 1 })
                }
            }
        })
        return retArr
    }
    else {
        return []
        console.log("empty")
    }
}
function newSpell(key) {
    if (!FstrCount && key == 87) {
        FstrCount = true
        return { xc: xChar + xCanv, yc: yChar + yCanv, dir: direction(), sp: key, t: 0 }
    }
    if (!WstrCount && key == 81) {
        WstrCount = true
        return { xc: xChar + xCanv, yc: yChar + yCanv, dir: direction(), sp: key, t: 0 }
    }
    return []
}
function fl(num) {
    return Math.floor(num)
}
function dis(n1, n2) {
    return Math.sqrt(n1 * n1 + n2 * n2)
}
function direction() {
    var delX = xCor - xChar
    var delY = yCor - yChar
    var delta = dis(delX, delY)
    var dirX = delX / delta
    var dirY = delY / delta
    if (dis(xChar - xCor, yChar - yCor) < 2) {
        return {x:0,y:0}
    }
    return { x: dirX, y: dirY }
}
function movechar(dir) {
    var delX = xm - xChar
    var delY = ym - yChar
    var delta = dis(delX, delY)
    if (dis(xm - xChar, ym - yChar) < 40) {
        xChar += 4 * dir.x
        yChar += 4 * dir.y
    }
    else {
        xCanv += 4 * dir.x
        yCanv += 4 * dir.y
        xChar += delX / delta
        yChar += delY / delta
    }
}
var canvas = document.getElementById("playerCanvas")
var context = canvas.getContext('2d')
var xCor = 0
var yCor = 0
var xCanv = 100
var yCanv = 100
var Fcount = 0
var FstrCount = false
var Wcount = 0
var WstrCount = false
canvas.width = innerWidth
canvas.height = innerHeight
var xChar = canvas.width / 2
var yChar = canvas.height / 2
const xm = canvas.width / 2
const ym = canvas.height / 2
var spell = 0;
var spelList = [];
canvas.addEventListener("mousemove", function (e) { xCor = e.clientX; yCor = e.clientY; })
document.addEventListener("keydown", function (e) { spelList = spelList.concat(newSpell(e.keyCode)); })
document.addEventListener("keyup", function (e) { /*spell = 0;*/ })
function docload() { setInterval(combined,30) }
