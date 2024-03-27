var objectFitImages = function() {
    "use strict";

    function t(t, e, i) {
        var s, o, n = (s = e || 1, o = i || 0, "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + s + "' height='" + o + "'%3E%3C/svg%3E");
        p.call(t, "src") !== n && u.call(t, "src", n)
    }

    function e(t, i) {
        t.naturalWidth ? i(t) : setTimeout(e, 100, t, i)
    }

    function i(s) {
        var r, a, c = function(t) {
                for (var e, i = getComputedStyle(t).fontFamily, s = {}; null !== (e = n.exec(i));) s[e[1]] = e[2];
                return s
            }(s),
            h = s[o];
        if (c["object-fit"] = c["object-fit"] || "fill", h.img || "fill" !== c["object-fit"] && (h.skipTest || !l || c["object-position"])) {
            if (!h.img) {
                h.img = new Image(s.width, s.height), h.img.srcset = p.call(s, "data-ofi-srcset") || s.srcset, h.img.src = p.call(s, "data-ofi-src") || s.src, u.call(s, "data-ofi-src", s.src), s.srcset && u.call(s, "data-ofi-srcset", s.srcset), t(s, s.naturalWidth || s.width, s.naturalHeight || s.height), s.srcset && (s.srcset = "");
                try {
                    r = s, a = {
                        get: function(t) {
                            return r[o].img[t || "src"]
                        },
                        set: function(t, e) {
                            return r[o].img[e || "src"] = t, u.call(r, "data-ofi-" + e, t), i(r), t
                        }
                    }, Object.defineProperty(r, "src", a), Object.defineProperty(r, "currentSrc", {
                        get: function() {
                            return a.get("currentSrc")
                        }
                    }), Object.defineProperty(r, "srcset", {
                        get: function() {
                            return a.get("srcset")
                        },
                        set: function(t) {
                            return a.set(t, "srcset")
                        }
                    })
                } catch (f) {
                    window.console && console.warn("https://bit.ly/ofi-old-browser")
                }
            }(function(t) {
                if (t.srcset && !d && window.picturefill) {
                    var e = window.picturefill._;
                    t[e.ns] && t[e.ns].evaled || e.fillImg(t, {
                        reselect: !0
                    }), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, {
                        reselect: !0
                    })), t.currentSrc = t[e.ns].curSrc || t.src
                }
            })(h.img), s.style.backgroundImage = 'url("' + (h.img.currentSrc || h.img.src).replace(/"/g, '\\"') + '")', s.style.backgroundPosition = c["object-position"] || "center", s.style.backgroundRepeat = "no-repeat", s.style.backgroundOrigin = "content-box", /scale-down/.test(c["object-fit"]) ? e(h.img, function() {
                h.img.naturalWidth > s.width || h.img.naturalHeight > s.height ? s.style.backgroundSize = "contain" : s.style.backgroundSize = "auto"
            }) : s.style.backgroundSize = c["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), e(h.img, function(e) {
                t(s, e.naturalWidth, e.naturalHeight)
            })
        }
    }

    function s(t, e) {
        var n = !h && !t;
        if (e = e || {}, t = t || "img", a && !e.skipTest || !c) return !1;
        "img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]);
        for (var r = 0; r < t.length; r++) t[r][o] = t[r][o] || {
            skipTest: e.skipTest
        }, i(t[r]);
        n && (document.body.addEventListener("load", function(t) {
            "IMG" === t.target.tagName && s(t.target, {
                skipTest: e.skipTest
            })
        }, !0), h = !0, t = "img"), e.watchMQ && window.addEventListener("resize", s.bind(null, t, {
            skipTest: e.skipTest
        }))
    }
    var o = "bfred-it:object-fit-images",
        n = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,
        r = "undefined" == typeof Image ? {
            style: {
                "object-position": 1
            }
        } : new Image,
        l = "object-fit" in r.style,
        a = "object-position" in r.style,
        c = "background-size" in r.style,
        d = "string" == typeof r.currentSrc,
        p = r.getAttribute,
        u = r.setAttribute,
        h = !1;
    return s.supportsObjectFit = l, (s.supportsObjectPosition = a) || (HTMLImageElement.prototype.getAttribute = function(t) {
        return p.call(f(this, t), t)
    }, HTMLImageElement.prototype.setAttribute = function(t, e) {
        return u.call(f(this, t), t, String(e))
    }), s;

    function f(t, e) {
        return t[o] && t[o].img && ("src" === e || "srcset" === e) ? t[o].img : t
    }
}();
! function(t, e) {
    "function" == typeof define && define.amd ? define([], function() {
        return t.svg4everybody = e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.svg4everybody = e()
}(this, function() {
    function t(t, e, i) {
        if (i) {
            var s = document.createDocumentFragment(),
                o = !e.hasAttribute("viewBox") && i.getAttribute("viewBox");
            o && e.setAttribute("viewBox", o);
            for (var n = i.cloneNode(!0); n.childNodes.length;) s.appendChild(n.firstChild);
            t.appendChild(s)
        }
    }

    function e(e) {
        e.onreadystatechange = function() {
            if (4 === e.readyState) {
                var i = e._cachedDocument;
                i || ((i = e._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = e.responseText, e._cachedTarget = {}), e._embeds.splice(0).map(function(s) {
                    var o = e._cachedTarget[s.id];
                    o || (o = e._cachedTarget[s.id] = i.getElementById(s.id)), t(s.parent, s.svg, o)
                })
            }
        }, e.onreadystatechange()
    }

    function i(t) {
        for (var e = t;
            "svg" !== e.nodeName.toLowerCase() && (e = e.parentNode););
        return e
    }
    return function(s) {
        var o, n = Object(s),
            r = window.top !== window.self;
        o = "polyfill" in n ? n.polyfill : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) || (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 || (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537 || /\bEdge\/.(\d+)\b/.test(navigator.userAgent) && r;
        var l = {},
            a = window.requestAnimationFrame || setTimeout,
            c = document.getElementsByTagName("use"),
            d = 0;
        o && function s() {
            for (var r = 0; r < c.length;) {
                var p = c[r],
                    u = p.parentNode,
                    h = i(u),
                    f = p.getAttribute("xlink:href") || p.getAttribute("href");
                if (!f && n.attributeName && (f = p.getAttribute(n.attributeName)), h && f) {
                    if (o) {
                        if (!n.validate || n.validate(f, h, p)) {
                            u.removeChild(p);
                            var g = f.split("#"),
                                m = g.shift(),
                                v = g.join("#");
                            if (m.length) {
                                var $ = l[m];
                                $ || (($ = l[m] = new XMLHttpRequest).open("GET", m), $.send(), $._embeds = []), $._embeds.push({
                                    parent: u,
                                    svg: h,
                                    id: v
                                }), e($)
                            } else t(u, h, document.getElementById(v))
                        } else ++r, ++d
                    }
                } else ++r
            }(!c.length || 0 < c.length - d) && a(s, 67)
        }()
    }
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var e, i = window.Slick || {};
    (e = 0, i = function(i, s) {
        var o, n = this;
        n.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: t(i),
            appendDots: t(i),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(e, i) {
                return t('<button type="button" />').text(i + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, n.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, t.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = t(i), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, o = t(i).data("slick") || {}, n.options = t.extend({}, n.defaults, s, o), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = t.proxy(n.autoPlay, n), n.autoPlayClear = t.proxy(n.autoPlayClear, n), n.autoPlayIterator = t.proxy(n.autoPlayIterator, n), n.changeSlide = t.proxy(n.changeSlide, n), n.clickHandler = t.proxy(n.clickHandler, n), n.selectHandler = t.proxy(n.selectHandler, n), n.setPosition = t.proxy(n.setPosition, n), n.swipeHandler = t.proxy(n.swipeHandler, n), n.dragHandler = t.proxy(n.dragHandler, n), n.keyHandler = t.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, i.prototype.addSlide = i.prototype.slickAdd = function(e, i, s) {
        var o = this;
        if ("boolean" == typeof i) s = i, i = null;
        else if (i < 0 || i >= o.slideCount) return !1;
        o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : s ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : !0 === s ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, i.prototype.animateHeight = function() {
        if (1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical) {
            var t = this.$slides.eq(this.currentSlide).outerHeight(!0);
            this.$list.animate({
                height: t
            }, this.options.speed)
        }
    }, i.prototype.animateSlide = function(e, i) {
        var s = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: e
        }, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({
            top: e
        }, o.options.speed, o.options.easing, i) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), t({
            animStart: o.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(t) {
                t = Math.ceil(t), !1 === o.options.vertical ? s[o.animType] = "translate(" + t + "px, 0px)" : s[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(s)
            },
            complete: function() {
                i && i.call()
            }
        })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? s[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : s[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(s), i && setTimeout(function() {
            o.disableTransition(), i.call()
        }, o.options.speed))
    }, i.prototype.getNavTarget = function() {
        var e = this.options.asNavFor;
        return e && null !== e && (e = t(e).not(this.$slider)), e
    }, i.prototype.asNavFor = function(e) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, i.prototype.applyTransition = function(t) {
        var e = this,
            i = {};
        !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, i.prototype.autoPlay = function() {
        var t = this;
        t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, i.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }, i.prototype.autoPlayIterator = function() {
        var t = this,
            e = t.currentSlide + t.options.slidesToScroll;
        t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
    }, i.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, i.prototype.buildDots = function() {
        var e, i, s = this;
        if (!0 === s.options.dots) {
            for (s.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(s.options.dotsClass), e = 0; e <= s.getDotCount(); e += 1) i.append(t("<li />").append(s.options.customPaging.call(this, s, e)));
            s.$dots = i.appendTo(s.options.appendDots), s.$dots.find("li").first().addClass("slick-active")
        }
    }, i.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, i.prototype.buildRows = function() {
        var t, e, i, s, o, n, r;
        if (s = document.createDocumentFragment(), n = this.$slider.children(), 1 < this.options.rows) {
            for (r = this.options.slidesPerRow * this.options.rows, o = Math.ceil(n.length / r), t = 0; t < o; t++) {
                var l = document.createElement("div");
                for (e = 0; e < this.options.rows; e++) {
                    var a = document.createElement("div");
                    for (i = 0; i < this.options.slidesPerRow; i++) {
                        var c = t * r + (e * this.options.slidesPerRow + i);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    l.appendChild(a)
                }
                s.appendChild(l)
            }
            this.$slider.empty().append(s), this.$slider.children().children().children().css({
                width: 100 / this.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, i.prototype.checkResponsive = function(e, i) {
        var s, o, n, r = this,
            l = !1,
            a = r.$slider.width(),
            c = window.innerWidth || t(window).width();
        if ("window" === r.respondTo ? n = c : "slider" === r.respondTo ? n = a : "min" === r.respondTo && (n = Math.min(c, a)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            for (s in o = null, r.breakpoints) r.breakpoints.hasOwnProperty(s) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[s] && (o = r.breakpoints[s]) : n > r.breakpoints[s] && (o = r.breakpoints[s]));
            null !== o ? (null === r.activeBreakpoint || o !== r.activeBreakpoint || i) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = o), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, i.prototype.changeSlide = function(e, i) {
        var s, o, n = t(e.currentTarget);
        switch (n.is("a") && e.preventDefault(), n.is("li") || (n = n.closest("li")), s = this.slideCount % this.options.slidesToScroll != 0 ? 0 : (this.slideCount - this.currentSlide) % this.options.slidesToScroll, e.data.message) {
            case "previous":
                o = 0 == s ? this.options.slidesToScroll : this.options.slidesToShow - s, this.slideCount > this.options.slidesToShow && this.slideHandler(this.currentSlide - o, !1, i);
                break;
            case "next":
                o = 0 == s ? this.options.slidesToScroll : s, this.slideCount > this.options.slidesToShow && this.slideHandler(this.currentSlide + o, !1, i);
                break;
            case "index":
                var r = 0 === e.data.index ? 0 : e.data.index || n.index() * this.options.slidesToScroll;
                this.slideHandler(this.checkNavigable(r), !1, i), n.children().trigger("focus");
                break;
            default:
                return
        }
    }, i.prototype.checkNavigable = function(t) {
        var e, i;
        if (i = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
        else
            for (var s in e) {
                if (t < e[s]) {
                    t = i;
                    break
                }
                i = e[s]
            }
        return t
    }, i.prototype.cleanUpEvents = function() {
        this.options.dots && null !== this.$dots && (t("li", this.$dots).off("click.slick", this.changeSlide).off("mouseenter.slick", t.proxy(this.interrupt, this, !0)).off("mouseleave.slick", t.proxy(this.interrupt, this, !1)), !0 === this.options.accessibility && this.$dots.off("keydown.slick", this.keyHandler)), this.$slider.off("focus.slick blur.slick"), !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow && this.$prevArrow.off("click.slick", this.changeSlide), this.$nextArrow && this.$nextArrow.off("click.slick", this.changeSlide), !0 === this.options.accessibility && (this.$prevArrow && this.$prevArrow.off("keydown.slick", this.keyHandler), this.$nextArrow && this.$nextArrow.off("keydown.slick", this.keyHandler))), this.$list.off("touchstart.slick mousedown.slick", this.swipeHandler), this.$list.off("touchmove.slick mousemove.slick", this.swipeHandler), this.$list.off("touchend.slick mouseup.slick", this.swipeHandler), this.$list.off("touchcancel.slick mouseleave.slick", this.swipeHandler), this.$list.off("click.slick", this.clickHandler), t(document).off(this.visibilityChange, this.visibility), this.cleanUpSlideEvents(), !0 === this.options.accessibility && this.$list.off("keydown.slick", this.keyHandler), !0 === this.options.focusOnSelect && t(this.$slideTrack).children().off("click.slick", this.selectHandler), t(window).off("orientationchange.slick.slick-" + this.instanceUid, this.orientationChange), t(window).off("resize.slick.slick-" + this.instanceUid, this.resize), t("[draggable!=true]", this.$slideTrack).off("dragstart", this.preventDefault), t(window).off("load.slick.slick-" + this.instanceUid, this.setPosition)
    }, i.prototype.cleanUpSlideEvents = function() {
        this.$list.off("mouseenter.slick", t.proxy(this.interrupt, this, !0)), this.$list.off("mouseleave.slick", t.proxy(this.interrupt, this, !1))
    }, i.prototype.cleanUpRows = function() {
        var t;
        1 < this.options.rows && ((t = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(t))
    }, i.prototype.clickHandler = function(t) {
        !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, i.prototype.destroy = function(e) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            t(this).attr("style", t(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
    }, i.prototype.disableTransition = function(t) {
        var e = {};
        e[this.transitionType] = "", !1 === this.options.fade ? this.$slideTrack.css(e) : this.$slides.eq(t).css(e)
    }, i.prototype.fadeSlide = function(t, e) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(t).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(t).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function() {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, i.prototype.fadeSlideOut = function(t) {
        !1 === this.cssTransitions ? this.$slides.eq(t).animate({
            opacity: 0,
            zIndex: this.options.zIndex - 2
        }, this.options.speed, this.options.easing) : (this.applyTransition(t), this.$slides.eq(t).css({
            opacity: 0,
            zIndex: this.options.zIndex - 2
        }))
    }, i.prototype.filterSlides = i.prototype.slickFilter = function(t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, i.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var s = t(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = s.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, i.prototype.getCurrent = i.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, i.prototype.getDotCount = function() {
        var t = 0,
            e = 0,
            i = 0;
        if (!0 === this.options.infinite) {
            if (this.slideCount <= this.options.slidesToShow) ++i;
            else
                for (; t < this.slideCount;) ++i, t = e + this.options.slidesToScroll, e += this.options.slidesToScroll <= this.options.slidesToShow ? this.options.slidesToScroll : this.options.slidesToShow
        } else if (!0 === this.options.centerMode) i = this.slideCount;
        else if (this.options.asNavFor)
            for (; t < this.slideCount;) ++i, t = e + this.options.slidesToScroll, e += this.options.slidesToScroll <= this.options.slidesToShow ? this.options.slidesToScroll : this.options.slidesToShow;
        else i = 1 + Math.ceil((this.slideCount - this.options.slidesToShow) / this.options.slidesToScroll);
        return i - 1
    }, i.prototype.getLeft = function(t) {
        var e, i, s, o, n = this,
            r = 0;
        return n.slideOffset = 0, i = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = -(n.slideWidth * n.options.slidesToShow * 1), o = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? o = -1.5 : 1 === n.options.slidesToShow && (o = -2)), r = i * n.options.slidesToShow * o), n.slideCount % n.options.slidesToScroll != 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (r = t > n.slideCount ? (n.slideOffset = -((n.options.slidesToShow - (t - n.slideCount)) * n.slideWidth * 1), -((n.options.slidesToShow - (t - n.slideCount)) * i * 1)) : (n.slideOffset = -(n.slideCount % n.options.slidesToScroll * n.slideWidth * 1), -(n.slideCount % n.options.slidesToScroll * i * 1)))) : t + n.options.slidesToShow > n.slideCount && (n.slideOffset = (t + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (t + n.options.slidesToShow - n.slideCount) * i), n.slideCount <= n.options.slidesToShow && (r = n.slideOffset = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? -(t * n.slideWidth * 1) + n.slideOffset : -(t * i * 1) + r, !0 === n.options.variableWidth && (s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow), e = !0 === n.options.rtl ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, !0 === n.options.centerMode && (s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, e += (n.$list.width() - s.outerWidth()) / 2)), e
    }, i.prototype.getOption = i.prototype.slickGetOption = function(t) {
        return this.options[t]
    }, i.prototype.getNavigableIndexes = function() {
        var t, e = 0,
            i = 0,
            s = [];
        for (t = !1 === this.options.infinite ? this.slideCount : (e = -1 * this.options.slidesToScroll, i = -1 * this.options.slidesToScroll, 2 * this.slideCount); e < t;) s.push(e), e = i + this.options.slidesToScroll, i += this.options.slidesToScroll <= this.options.slidesToShow ? this.options.slidesToScroll : this.options.slidesToShow;
        return s
    }, i.prototype.getSlick = function() {
        return this
    }, i.prototype.getSlideCount = function() {
        var e, i, s = this;
        return i = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, !0 === s.options.swipeToSlide ? (s.$slideTrack.find(".slick-slide").each(function(o, n) {
            if (n.offsetLeft - i + t(n).outerWidth() / 2 > -1 * s.swipeLeft) return e = n, !1
        }), Math.abs(t(e).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
    }, i.prototype.goTo = i.prototype.slickGoTo = function(t, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(t)
            }
        }, e)
    }, i.prototype.init = function(e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
    }, i.prototype.initADA = function() {
        var e = this,
            i = Math.ceil(e.slideCount / e.options.slidesToShow),
            s = e.getNavigableIndexes().filter(function(t) {
                return 0 <= t && t < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
            var o = s.indexOf(i);
            t(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + i,
                tabindex: -1
            }), -1 !== o && t(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + o
            })
        }), e.$dots.attr("role", "tablist").find("li").each(function(o) {
            var n = s[o];
            t(this).attr({
                role: "presentation"
            }), t(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + o,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": o + 1 + " of " + i,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var o = e.currentSlide, n = o + e.options.slidesToShow; o < n; o++) e.$slides.eq(o).attr("tabindex", 0);
        e.activateADA()
    }, i.prototype.initArrowEvents = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, this.changeSlide), this.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, this.changeSlide), !0 === this.options.accessibility && (this.$prevArrow.on("keydown.slick", this.keyHandler), this.$nextArrow.on("keydown.slick", this.keyHandler)))
    }, i.prototype.initDotEvents = function() {
        !0 === this.options.dots && (t("li", this.$dots).on("click.slick", {
            message: "index"
        }, this.changeSlide), !0 === this.options.accessibility && this.$dots.on("keydown.slick", this.keyHandler)), !0 === this.options.dots && !0 === this.options.pauseOnDotsHover && t("li", this.$dots).on("mouseenter.slick", t.proxy(this.interrupt, this, !0)).on("mouseleave.slick", t.proxy(this.interrupt, this, !1))
    }, i.prototype.initSlideEvents = function() {
        this.options.pauseOnHover && (this.$list.on("mouseenter.slick", t.proxy(this.interrupt, this, !0)), this.$list.on("mouseleave.slick", t.proxy(this.interrupt, this, !1)))
    }, i.prototype.initializeEvents = function() {
        this.initArrowEvents(), this.initDotEvents(), this.initSlideEvents(), this.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, this.swipeHandler), this.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, this.swipeHandler), this.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, this.swipeHandler), this.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, this.swipeHandler), this.$list.on("click.slick", this.clickHandler), t(document).on(this.visibilityChange, t.proxy(this.visibility, this)), !0 === this.options.accessibility && this.$list.on("keydown.slick", this.keyHandler), !0 === this.options.focusOnSelect && t(this.$slideTrack).children().on("click.slick", this.selectHandler), t(window).on("orientationchange.slick.slick-" + this.instanceUid, t.proxy(this.orientationChange, this)), t(window).on("resize.slick.slick-" + this.instanceUid, t.proxy(this.resize, this)), t("[draggable!=true]", this.$slideTrack).on("dragstart", this.preventDefault), t(window).on("load.slick.slick-" + this.instanceUid, this.setPosition), t(this.setPosition)
    }, i.prototype.initUI = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.show(), this.$nextArrow.show()), !0 === this.options.dots && this.slideCount > this.options.slidesToShow && this.$dots.show()
    }, i.prototype.keyHandler = function(t) {
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === this.options.accessibility ? this.changeSlide({
            data: {
                message: !0 === this.options.rtl ? "next" : "previous"
            }
        }) : 39 === t.keyCode && !0 === this.options.accessibility && this.changeSlide({
            data: {
                message: !0 === this.options.rtl ? "previous" : "next"
            }
        }))
    }, i.prototype.lazyLoad = function() {
        function e(e) {
            t("img[data-lazy]", e).each(function() {
                var e = t(this),
                    i = t(this).attr("data-lazy"),
                    s = t(this).attr("data-srcset"),
                    o = t(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        s && (e.attr("srcset", s), o && e.attr("sizes", o)), e.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, e, i])
                    })
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, i])
                }, r.src = i
            })
        }
        var i, s, o, n = this;
        if (!0 === n.options.centerMode ? o = !0 === n.options.infinite ? (s = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (s = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = Math.ceil((s = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide) + n.options.slidesToShow), !0 === n.options.fade && (0 < s && s--, o <= n.slideCount && o++)), i = n.$slider.find(".slick-slide").slice(s, o), "anticipated" === n.options.lazyLoad)
            for (var r = s - 1, l = o, a = n.$slider.find(".slick-slide"), c = 0; c < n.options.slidesToScroll; c++) r < 0 && (r = n.slideCount - 1), i = (i = i.add(a.eq(r))).add(a.eq(l)), r--, l++;
        e(i), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, i.prototype.loadSlider = function() {
        this.setPosition(), this.$slideTrack.css({
            opacity: 1
        }), this.$slider.removeClass("slick-loading"), this.initUI(), "progressive" === this.options.lazyLoad && this.progressiveLazyLoad()
    }, i.prototype.next = i.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, i.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition()
    }, i.prototype.pause = i.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0
    }, i.prototype.play = i.prototype.slickPlay = function() {
        var t = this;
        t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
    }, i.prototype.postSlide = function(e) {
        var i = this;
        i.unslicked || (i.$slider.trigger("afterChange", [i, e]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange && t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
    }, i.prototype.prev = i.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, i.prototype.preventDefault = function(t) {
        t.preventDefault()
    }, i.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var i, s, o, n, r, l = this,
            a = t("img[data-lazy]", l.$slider);
        a.length ? (s = (i = a.first()).attr("data-lazy"), o = i.attr("data-srcset"), n = i.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            o && (i.attr("srcset", o), n && i.attr("sizes", n)), i.attr("src", s).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, i, s]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, i, s]), l.progressiveLazyLoad())
        }, r.src = s) : l.$slider.trigger("allImagesLoaded", [l])
    }, i.prototype.refresh = function(e) {
        var i, s, o = this;
        s = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > s && (o.currentSlide = s), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), i = o.currentSlide, o.destroy(!0), t.extend(o, o.initials, {
            currentSlide: i
        }), o.init(), e || o.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, i.prototype.registerBreakpoints = function() {
        var e, i, s, o = this,
            n = o.options.responsive || null;
        if ("array" === t.type(n) && n.length) {
            for (e in o.respondTo = o.options.respondTo || "window", n)
                if (s = o.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (i = n[e].breakpoint; 0 <= s;) o.breakpoints[s] && o.breakpoints[s] === i && o.breakpoints.splice(s, 1), s--;
                    o.breakpoints.push(i), o.breakpointSettings[i] = n[e].settings
                }
            o.breakpoints.sort(function(t, e) {
                return o.options.mobileFirst ? t - e : e - t
            })
        }
    }, i.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, i.prototype.resize = function() {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, i.prototype.removeSlide = i.prototype.slickRemove = function(t, e, i) {
        var s = this;
        if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : s.slideCount - 1 : !0 === e ? --t : t, s.slideCount < 1 || t < 0 || t > s.slideCount - 1) return !1;
        s.unload(), !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(t).remove(), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slidesCache = s.$slides, s.reinit()
    }, i.prototype.setCSS = function(t) {
        var e, i, s = this,
            o = {};
        !0 === s.options.rtl && (t = -t), e = "left" == s.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == s.positionProp ? Math.ceil(t) + "px" : "0px", o[s.positionProp] = t, !1 === s.transformsEnabled || ((o = {}, !1 === s.cssTransitions) ? o[s.animType] = "translate(" + e + ", " + i + ")" : o[s.animType] = "translate3d(" + e + ", " + i + ", 0px)"), s.$slideTrack.css(o)
    }, i.prototype.setDimensions = function() {
        var t = this;
        !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
            padding: "0px " + t.options.centerPadding
        }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
            padding: t.options.centerPadding + " 0px"
        })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, i.prototype.setFade = function() {
        var e, i = this;
        i.$slides.each(function(s, o) {
            e = -(i.slideWidth * s * 1), !0 === i.options.rtl ? t(o).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : t(o).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }, i.prototype.setHeight = function() {
        if (1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical) {
            var t = this.$slides.eq(this.currentSlide).outerHeight(!0);
            this.$list.css("height", t)
        }
    }, i.prototype.setOption = i.prototype.slickSetOption = function() {
        var e, i, s, o, n, r = this,
            l = !1;
        if ("object" === t.type(arguments[0]) ? (s = arguments[0], l = arguments[1], n = "multiple") : "string" === t.type(arguments[0]) && (s = arguments[0], o = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[s] = o;
        else if ("multiple" === n) t.each(s, function(t, e) {
            r.options[t] = e
        });
        else if ("responsive" === n)
            for (i in o)
                if ("array" !== t.type(r.options.responsive)) r.options.responsive = [o[i]];
                else {
                    for (e = r.options.responsive.length - 1; 0 <= e;) r.options.responsive[e].breakpoint === o[i].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(o[i])
                }
        l && (r.unload(), r.reinit())
    }, i.prototype.setPosition = function() {
        this.setDimensions(), this.setHeight(), !1 === this.options.fade ? this.setCSS(this.getLeft(this.currentSlide)) : this.setFade(), this.$slider.trigger("setPosition", [this])
    }, i.prototype.setProps = function() {
        var t = this,
            e = document.body.style;
        t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
    }, i.prototype.setSlideClasses = function(t) {
        var e, i, s, o;
        if (i = this.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), this.$slides.eq(t).addClass("slick-current"), !0 === this.options.centerMode) {
            var n = this.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(this.options.slidesToShow / 2), !0 === this.options.infinite && (e <= t && t <= this.slideCount - 1 - e ? this.$slides.slice(t - e + n, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = this.options.slidesToShow + t, i.slice(s - e + 1 + n, s + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - this.options.slidesToShow).addClass("slick-center") : t === this.slideCount - 1 && i.eq(this.options.slidesToShow).addClass("slick-center")), this.$slides.eq(t).addClass("slick-center")
        } else 0 <= t && t <= this.slideCount - this.options.slidesToShow ? this.$slides.slice(t, t + this.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= this.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = this.slideCount % this.options.slidesToShow, s = !0 === this.options.infinite ? this.options.slidesToShow + t : t, this.options.slidesToShow == this.options.slidesToScroll && this.slideCount - t < this.options.slidesToShow ? i.slice(s - (this.options.slidesToShow - o), s + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + this.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== this.options.lazyLoad && "anticipated" !== this.options.lazyLoad || this.lazyLoad()
    }, i.prototype.setupInfinite = function() {
        var e, i, s, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (i = null, o.slideCount > o.options.slidesToShow)) {
            for (s = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - s; e -= 1) i = e - 1, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < s + o.slideCount; e += 1) i = e, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                t(this).attr("id", "")
            })
        }
    }, i.prototype.interrupt = function(t) {
        t || this.autoPlay(), this.interrupted = t
    }, i.prototype.selectHandler = function(e) {
        var i = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
            s = parseInt(i.attr("data-slick-index"));
        s || (s = 0), this.slideCount <= this.options.slidesToShow ? this.slideHandler(s, !1, !0) : this.slideHandler(s)
    }, i.prototype.slideHandler = function(t, e, i) {
        var s, o, n, r, l, a = null,
            c = this;
        if (e = e || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t)) {
            if (!1 === e && c.asNavFor(t), s = t, a = c.getLeft(s), r = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? r : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (s = c.currentSlide, !0 !== i ? c.animateSlide(r, function() {
                c.postSlide(s)
            }) : c.postSlide(s));
            else if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (s = c.currentSlide, !0 !== i ? c.animateSlide(r, function() {
                c.postSlide(s)
            }) : c.postSlide(s));
            else {
                if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = s < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + s : s >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : s - c.slideCount : s, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), n = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (l = (l = c.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(n), c.fadeSlide(o, function() {
                    c.postSlide(o)
                })) : c.postSlide(o), void c.animateHeight();
                !0 !== i ? c.animateSlide(a, function() {
                    c.postSlide(o)
                }) : c.postSlide(o)
            }
        }
    }, i.prototype.startLoad = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.hide(), this.$nextArrow.hide()), !0 === this.options.dots && this.slideCount > this.options.slidesToShow && this.$dots.hide(), this.$slider.addClass("slick-loading")
    }, i.prototype.swipeDirection = function() {
        var t, e, i, s;
        return t = this.touchObject.startX - this.touchObject.curX, (s = Math.round(180 * (i = Math.atan2(e = this.touchObject.startY - this.touchObject.curY, t)) / Math.PI)) < 0 && (s = 360 - Math.abs(s)), s <= 45 && 0 <= s ? !1 === this.options.rtl ? "left" : "right" : s <= 360 && 315 <= s ? !1 === this.options.rtl ? "left" : "right" : 135 <= s && s <= 225 ? !1 === this.options.rtl ? "right" : "left" : !0 === this.options.verticalSwiping ? 35 <= s && s <= 135 ? "down" : "up" : "vertical"
    }, i.prototype.swipeEnd = function(t) {
        var e, i, s = this;
        if (s.dragging = !1, s.swiping = !1, s.scrolling) return s.scrolling = !1;
        if (s.interrupted = !1, s.shouldClick = !(10 < s.touchObject.swipeLength), void 0 === s.touchObject.curX) return !1;
        if (!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]), s.touchObject.swipeLength >= s.touchObject.minSwipe) {
            switch (i = s.swipeDirection()) {
                case "left":
                case "down":
                    e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount(), s.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount(), s.currentDirection = 1
            }
            "vertical" != i && (s.slideHandler(e), s.touchObject = {}, s.$slider.trigger("swipe", [s, i]))
        } else s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide), s.touchObject = {})
    }, i.prototype.swipeHandler = function(t) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case "start":
                e.swipeStart(t);
                break;
            case "move":
                e.swipeMove(t);
                break;
            case "end":
                e.swipeEnd(t)
        }
    }, i.prototype.swipeMove = function(t) {
        var e, i, s, o, n, r, l = this;
        return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), l.options.verticalSwiping || l.swiping || !(4 < r) ? (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), i = l.swipeDirection(), void 0 !== t.originalEvent && 4 < l.touchObject.swipeLength && (l.swiping = !0, t.preventDefault()), o = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (o = l.touchObject.curY > l.touchObject.startY ? 1 : -1), s = l.touchObject.swipeLength, (l.touchObject.edgeHit = !1) === l.options.infinite && (0 === l.currentSlide && "right" === i || l.currentSlide >= l.getDotCount() && "left" === i) && (s = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + s * o : l.swipeLeft = e + s * (l.$list.height() / l.listWidth) * o, !0 === l.options.verticalSwiping && (l.swipeLeft = e + s * o), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))) : (l.scrolling = !0, !1))
    }, i.prototype.swipeStart = function(t) {
        var e, i = this;
        if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
        void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, i.dragging = !0
    }, i.prototype.unfilterSlides = i.prototype.slickUnfilter = function() {
        null !== this.$slidesCache && (this.unload(), this.$slideTrack.children(this.options.slide).detach(), this.$slidesCache.appendTo(this.$slideTrack), this.reinit())
    }, i.prototype.unload = function() {
        t(".slick-cloned", this.$slider).remove(), this.$dots && this.$dots.remove(), this.$prevArrow && this.htmlExpr.test(this.options.prevArrow) && this.$prevArrow.remove(), this.$nextArrow && this.htmlExpr.test(this.options.nextArrow) && this.$nextArrow.remove(), this.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, i.prototype.unslick = function(t) {
        this.$slider.trigger("unslick", [this, t]), this.destroy()
    }, i.prototype.updateArrows = function() {
        this.options.slidesToShow, !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && !this.options.infinite && (this.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), this.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === this.currentSlide ? (this.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), this.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : this.currentSlide >= this.slideCount - this.options.slidesToShow && !1 === this.options.centerMode ? (this.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), this.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : this.currentSlide >= this.slideCount - 1 && !0 === this.options.centerMode && (this.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), this.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, i.prototype.updateDots = function() {
        null !== this.$dots && (this.$dots.find("li").removeClass("slick-active").end(), this.$dots.find("li").eq(Math.floor(this.currentSlide / this.options.slidesToScroll)).addClass("slick-active"))
    }, i.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
    }, t.fn.slick = function() {
        var t, e, s = this,
            o = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = s.length;
        for (t = 0; t < r; t++)
            if ("object" == typeof o || void 0 === o ? s[t].slick = new i(s[t], o) : e = s[t].slick[o].apply(s[t].slick, n), void 0 !== e) return e;
        return s
    }
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(t) {
    function e() {}

    function i(t, e) {
        c.ev.on("mfp" + t + y, e)
    }

    function s(e, i, s, o) {
        var n = document.createElement("div");
        return n.className = "mfp-" + e, s && (n.innerHTML = s), o ? i && i.appendChild(n) : (n = t(n), i && n.appendTo(i)), n
    }

    function o(e, i) {
        c.ev.triggerHandler("mfp" + e, i), c.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), c.st.callbacks[e] && c.st.callbacks[e].apply(c, t.isArray(i) ? i : [i]))
    }

    function n(e) {
        return e === f && c.currTemplate.closeBtn || (c.currTemplate.closeBtn = t(c.st.closeMarkup.replace("%title%", c.st.tClose)), f = e), c.currTemplate.closeBtn
    }

    function r() {
        t.magnificPopup.instance || ((c = new e).init(), t.magnificPopup.instance = c)
    }
    var l, a, c, d, p, u, h, f, g = "Close",
        m = "BeforeClose",
        v = "MarkupParse",
        $ = "Open",
        y = ".mfp",
        b = "mfp-ready",
        k = "mfp-removing",
        w = "mfp-prevent-close",
        _ = !!window.jQuery,
        S = t(window);

    function C() {
        O && (x.after(O.addClass(T)).detach(), O = null)
    }
    e.prototype = {
        constructor: e,
        init: function() {
            var e = navigator.appVersion;
            c.isLowIE = c.isIE8 = document.all && !document.addEventListener, c.isAndroid = /android/gi.test(e), c.isIOS = /iphone|ipad|ipod/gi.test(e), c.supportsTransition = function() {
                var t = document.createElement("p").style,
                    e = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== t.transition) return !0;
                for (; e.length;)
                    if (e.pop() + "Transition" in t) return !0;
                return !1
            }(), c.probablyMobile = c.isAndroid || c.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), p = t(document), c.popupsCache = {}
        },
        open: function(e) {
            var r;
            if (!1 === e.isObj) {
                c.items = e.items.toArray(), c.index = 0;
                var l, a = e.items;
                for (r = 0; r < a.length; r++)
                    if ((l = a[r]).parsed && (l = l.el[0]), l === e.el[0]) {
                        c.index = r;
                        break
                    }
            } else c.items = t.isArray(e.items) ? e.items : [e.items], c.index = e.index || 0;
            if (!c.isOpen) {
                c.types = [], h = "", e.mainEl && e.mainEl.length ? c.ev = e.mainEl.eq(0) : c.ev = p, e.key ? (c.popupsCache[e.key] || (c.popupsCache[e.key] = {}), c.currTemplate = c.popupsCache[e.key]) : c.currTemplate = {}, c.st = t.extend(!0, {}, t.magnificPopup.defaults, e), c.fixedContentPos = "auto" === c.st.fixedContentPos ? !c.probablyMobile : c.st.fixedContentPos, c.st.modal && (c.st.closeOnContentClick = !1, c.st.closeOnBgClick = !1, c.st.showCloseBtn = !1, c.st.enableEscapeKey = !1), c.bgOverlay || (c.bgOverlay = s("bg").on("click" + y, function() {
                    c.close()
                }), c.wrap = s("wrap").attr("tabindex", -1).on("click" + y, function(t) {
                    c._checkIfClose(t.target) && c.close()
                }), c.container = s("container", c.wrap)), c.contentContainer = s("content"), c.st.preloader && (c.preloader = s("preloader", c.container, c.st.tLoading));
                var d = t.magnificPopup.modules;
                for (r = 0; r < d.length; r++) {
                    var u = d[r];
                    c["init" + (u = u.charAt(0).toUpperCase() + u.slice(1))].call(c)
                }
                o("BeforeOpen"), c.st.showCloseBtn && (c.st.closeBtnInside ? (i(v, function(t, e, i, s) {
                    i.close_replaceWith = n(s.type)
                }), h += " mfp-close-btn-in") : c.wrap.append(n())), c.st.alignTop && (h += " mfp-align-top"), c.fixedContentPos ? c.wrap.css({
                    overflow: c.st.overflowY,
                    overflowX: "hidden",
                    overflowY: c.st.overflowY
                }) : c.wrap.css({
                    top: S.scrollTop(),
                    position: "absolute"
                }), !1 !== c.st.fixedBgPos && ("auto" !== c.st.fixedBgPos || c.fixedContentPos) || c.bgOverlay.css({
                    height: p.height(),
                    position: "absolute"
                }), c.st.enableEscapeKey && p.on("keyup" + y, function(t) {
                    27 === t.keyCode && c.close()
                }), S.on("resize" + y, function() {
                    c.updateSize()
                }), c.st.closeOnContentClick || (h += " mfp-auto-cursor"), h && c.wrap.addClass(h);
                var f = c.wH = S.height(),
                    g = {};
                if (c.fixedContentPos && c._hasScrollBar(f)) {
                    var m = c._getScrollbarSize();
                    m && (g.marginRight = m)
                }
                c.fixedContentPos && (c.isIE7 ? t("body, html").css("overflow", "hidden") : g.overflow = "hidden");
                var k = c.st.mainClass;
                return c.isIE7 && (k += " mfp-ie7"), k && c._addClassToMFP(k), c.updateItemHTML(), o("BuildControls"), t("html").css(g), c.bgOverlay.add(c.wrap).prependTo(c.st.prependTo || t(document.body)), c._lastFocusedEl = document.activeElement, setTimeout(function() {
                    c.content ? (c._addClassToMFP(b), c._setFocus()) : c.bgOverlay.addClass(b), p.on("focusin" + y, c._onFocusIn)
                }, 16), c.isOpen = !0, c.updateSize(f), o($), e
            }
            c.updateItemHTML()
        },
        close: function() {
            c.isOpen && (o(m), c.isOpen = !1, c.st.removalDelay && !c.isLowIE && c.supportsTransition ? (c._addClassToMFP(k), setTimeout(function() {
                c._close()
            }, c.st.removalDelay)) : c._close())
        },
        _close: function() {
            o(g);
            var e = k + " " + b + " ";
            if (c.bgOverlay.detach(), c.wrap.detach(), c.container.empty(), c.st.mainClass && (e += c.st.mainClass + " "), c._removeClassFromMFP(e), c.fixedContentPos) {
                var i = {
                    marginRight: ""
                };
                c.isIE7 ? t("body, html").css("overflow", "") : i.overflow = "", t("html").css(i)
            }
            p.off("keyup.mfp focusin" + y), c.ev.off(y), c.wrap.attr("class", "mfp-wrap").removeAttr("style"), c.bgOverlay.attr("class", "mfp-bg"), c.container.attr("class", "mfp-container"), !c.st.showCloseBtn || c.st.closeBtnInside && !0 !== c.currTemplate[c.currItem.type] || c.currTemplate.closeBtn && c.currTemplate.closeBtn.detach(), c.st.autoFocusLast && c._lastFocusedEl && t(c._lastFocusedEl).focus(), c.currItem = null, c.content = null, c.currTemplate = null, c.prevHeight = 0, o("AfterClose")
        },
        updateSize: function(t) {
            if (c.isIOS) {
                var e = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * e;
                c.wrap.css("height", i), c.wH = i
            } else c.wH = t || S.height();
            c.fixedContentPos || c.wrap.css("height", c.wH), o("Resize")
        },
        updateItemHTML: function() {
            var e = c.items[c.index];
            c.contentContainer.detach(), c.content && c.content.detach(), e.parsed || (e = c.parseEl(c.index));
            var i = e.type;
            if (o("BeforeChange", [c.currItem ? c.currItem.type : "", i]), c.currItem = e, !c.currTemplate[i]) {
                var s = !!c.st[i] && c.st[i].markup;
                o("FirstMarkupParse", s), c.currTemplate[i] = !s || t(s)
            }
            u && u !== e.type && c.container.removeClass("mfp-" + u + "-holder");
            var n = c["get" + i.charAt(0).toUpperCase() + i.slice(1)](e, c.currTemplate[i]);
            c.appendContent(n, i), e.preloaded = !0, o("Change", e), u = e.type, c.container.prepend(c.contentContainer), o("AfterChange")
        },
        appendContent: function(t, e) {
            (c.content = t) ? c.st.showCloseBtn && c.st.closeBtnInside && !0 === c.currTemplate[e] ? c.content.find(".mfp-close").length || c.content.append(n()) : c.content = t: c.content = "", o("BeforeAppend"), c.container.addClass("mfp-" + e + "-holder"), c.contentContainer.append(c.content)
        },
        parseEl: function(e) {
            var i, s = c.items[e];
            if ((s = s.tagName ? {
                    el: t(s)
                } : (i = s.type, {
                    data: s,
                    src: s.src
                })).el) {
                for (var n = c.types, r = 0; r < n.length; r++)
                    if (s.el.hasClass("mfp-" + n[r])) {
                        i = n[r];
                        break
                    }
                s.src = s.el.attr("data-mfp-src"), s.src || (s.src = s.el.attr("href"))
            }
            return s.type = i || c.st.type || "inline", s.index = e, s.parsed = !0, c.items[e] = s, o("ElementParse", s), c.items[e]
        },
        addGroup: function(t, e) {
            function i(i) {
                i.mfpEl = this, c._openClick(i, t, e)
            }
            e || (e = {});
            var s = "click.magnificPopup";
            e.mainEl = t, e.items ? (e.isObj = !0, t.off(s).on(s, i)) : (e.isObj = !1, e.delegate ? t.off(s).on(s, e.delegate, i) : (e.items = t).off(s).on(s, i))
        },
        _openClick: function(e, i, s) {
            if ((void 0 !== s.midClick ? s.midClick : t.magnificPopup.defaults.midClick) || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                var o = void 0 !== s.disableOn ? s.disableOn : t.magnificPopup.defaults.disableOn;
                if (o) {
                    if (t.isFunction(o)) {
                        if (!o.call(c)) return !0
                    } else if (S.width() < o) return !0
                }
                e.type && (e.preventDefault(), c.isOpen && e.stopPropagation()), s.el = t(e.mfpEl), s.delegate && (s.items = i.find(s.delegate)), c.open(s)
            }
        },
        updateStatus: function(t, e) {
            if (c.preloader) {
                d !== t && c.container.removeClass("mfp-s-" + d), e || "loading" !== t || (e = c.st.tLoading);
                var i = {
                    status: t,
                    text: e
                };
                o("UpdateStatus", i), t = i.status, e = i.text, c.preloader.html(e), c.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation()
                }), c.container.addClass("mfp-s-" + t), d = t
            }
        },
        _checkIfClose: function(e) {
            if (!t(e).hasClass(w)) {
                var i = c.st.closeOnContentClick,
                    s = c.st.closeOnBgClick;
                if (i && s || !c.content || t(e).hasClass("mfp-close") || c.preloader && e === c.preloader[0]) return !0;
                if (e === c.content[0] || t.contains(c.content[0], e)) {
                    if (i) return !0
                } else if (s && t.contains(document, e)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            c.bgOverlay.addClass(t), c.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), c.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (c.isIE7 ? p.height() : document.body.scrollHeight) > (t || S.height())
        },
        _setFocus: function() {
            (c.st.focus ? c.content.find(c.st.focus).eq(0) : c.wrap).focus()
        },
        _onFocusIn: function(e) {
            if (e.target !== c.wrap[0] && !t.contains(c.wrap[0], e.target)) return c._setFocus(), !1
        },
        _parseMarkup: function(e, i, s) {
            var n;
            s.data && (i = t.extend(s.data, i)), o(v, [e, i, s]), t.each(i, function(i, s) {
                if (void 0 === s || !1 === s) return !0;
                if (1 < (n = i.split("_")).length) {
                    var o = e.find(y + "-" + n[0]);
                    if (0 < o.length) {
                        var r = n[1];
                        "replaceWith" === r ? o[0] !== s[0] && o.replaceWith(s) : "img" === r ? o.is("img") ? o.attr("src", s) : o.replaceWith(t("<img>").attr("src", s).attr("class", o.attr("class"))) : o.attr(n[1], s)
                    }
                } else e.find(y + "-" + i).html(s)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === c.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), c.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return c.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: e.prototype,
        modules: [],
        open: function(e, i) {
            return r(), (e = e ? t.extend(!0, {}, e) : {}).isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function(e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, t.fn.magnificPopup = function(e) {
        r();
        var i = t(this);
        if ("string" == typeof e) {
            if ("open" === e) {
                var s, o = _ ? i.data("magnificPopup") : i[0].magnificPopup,
                    n = parseInt(arguments[1], 10) || 0;
                s = o.items ? o.items[n] : (s = i, o.delegate && (s = s.find(o.delegate)), s.eq(n)), c._openClick({
                    mfpEl: s
                }, i, o)
            } else c.isOpen && c[e].apply(c, Array.prototype.slice.call(arguments, 1))
        } else e = t.extend(!0, {}, e), _ ? i.data("magnificPopup", e) : i[0].magnificPopup = e, c.addGroup(i, e);
        return i
    };
    var T, x, O, E = "inline";

    function P() {
        I && t(document.body).removeClass(I)
    }

    function A() {
        P(), c.req && c.req.abort()
    }
    t.magnificPopup.registerModule(E, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                c.types.push(E), i(g + "." + E, function() {
                    C()
                })
            },
            getInline: function(e, i) {
                if (C(), e.src) {
                    var o = c.st.inline,
                        n = t(e.src);
                    if (n.length) {
                        var r = n[0].parentNode;
                        r && r.tagName && (x || (x = s(T = o.hiddenClass), T = "mfp-" + T), O = n.after(x).detach().removeClass(T)), c.updateStatus("ready")
                    } else c.updateStatus("error", o.tNotFound), n = t("<div>");
                    return e.inlineElement = n
                }
                return c.updateStatus("ready"), c._parseMarkup(i, {}, e), i
            }
        }
    });
    var I, z = "ajax";

    function H(t) {
        if (c.currTemplate[L]) {
            var e = c.currTemplate[L].find("iframe");
            e.length && (t || (e[0].src = "//about:blank"), c.isIE8 && e.css("display", t ? "block" : "none"))
        }
    }
    t.magnificPopup.registerModule(z, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                c.types.push(z), I = c.st.ajax.cursor, i(g + "." + z, A), i("BeforeChange." + z, A)
            },
            getAjax: function(e) {
                I && t(document.body).addClass(I), c.updateStatus("loading");
                var i = t.extend({
                    url: e.src,
                    success: function(i, s, n) {
                        var r = {
                            data: i,
                            xhr: n
                        };
                        o("ParseAjax", r), c.appendContent(t(r.data), z), e.finished = !0, P(), c._setFocus(), setTimeout(function() {
                            c.wrap.addClass(b)
                        }, 16), c.updateStatus("ready"), o("AjaxContentAdded")
                    },
                    error: function() {
                        P(), e.finished = e.loadError = !0, c.updateStatus("error", c.st.ajax.tError.replace("%url%", e.src))
                    }
                }, c.st.ajax.settings);
                return c.req = t.ajax(i), ""
            }
        }
    }), t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var e = c.st.image,
                    s = ".image";
                c.types.push("image"), i($ + s, function() {
                    "image" === c.currItem.type && e.cursor && t(document.body).addClass(e.cursor)
                }), i(g + s, function() {
                    e.cursor && t(document.body).removeClass(e.cursor), S.off("resize" + y)
                }), i("Resize" + s, c.resizeImage), c.isLowIE && i("AfterChange", c.resizeImage)
            },
            resizeImage: function() {
                var t = c.currItem;
                if (t && t.img && c.st.image.verticalFit) {
                    var e = 0;
                    c.isLowIE && (e = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", c.wH - e)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, l && clearInterval(l), t.isCheckingImgSize = !1, o("ImageHasSize", t), t.imgHidden && (c.content && c.content.removeClass("mfp-loading"), t.imgHidden = !1))
            },
            findImageSize: function(t) {
                var e = 0,
                    i = t.img[0],
                    s = function(o) {
                        l && clearInterval(l), l = setInterval(function() {
                            0 < i.naturalWidth ? c._onImageHasSize(t) : (200 < e && clearInterval(l), 3 == ++e ? s(10) : 40 === e ? s(50) : 100 === e && s(500))
                        }, o)
                    };
                s(1)
            },
            getImage: function(e, i) {
                var s = 0,
                    n = function() {
                        e && (e.img[0].complete ? (e.img.off(".mfploader"), e === c.currItem && (c._onImageHasSize(e), c.updateStatus("ready")), e.hasSize = !0, e.loaded = !0, o("ImageLoadComplete")) : ++s < 200 ? setTimeout(n, 100) : r())
                    },
                    r = function() {
                        e && (e.img.off(".mfploader"), e === c.currItem && (c._onImageHasSize(e), c.updateStatus("error", a.tError.replace("%url%", e.src))), e.hasSize = !0, e.loaded = !0, e.loadError = !0)
                    },
                    a = c.st.image,
                    d = i.find(".mfp-img");
                if (d.length) {
                    var p = document.createElement("img");
                    p.className = "mfp-img", e.el && e.el.find("img").length && (p.alt = e.el.find("img").attr("alt")), e.img = t(p).on("load.mfploader", n).on("error.mfploader", r), p.src = e.src, d.is("img") && (e.img = e.img.clone()), 0 < (p = e.img[0]).naturalWidth ? e.hasSize = !0 : p.width || (e.hasSize = !1)
                }
                return c._parseMarkup(i, {
                    title: function(e) {
                        if (e.data && void 0 !== e.data.title) return e.data.title;
                        var i = c.st.image.titleSrc;
                        if (i) {
                            if (t.isFunction(i)) return i.call(c, e);
                            if (e.el) return e.el.attr(i) || ""
                        }
                        return ""
                    }(e),
                    img_replaceWith: e.img
                }, e), c.resizeImage(), e.hasSize ? (l && clearInterval(l), e.loadError ? (i.addClass("mfp-loading"), c.updateStatus("error", a.tError.replace("%url%", e.src))) : (i.removeClass("mfp-loading"), c.updateStatus("ready"))) : (c.updateStatus("loading"), e.loading = !0, e.hasSize || (e.imgHidden = !0, i.addClass("mfp-loading"), c.findImageSize(e))), i
            }
        }
    }), t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var t, e = c.st.zoom,
                    s = ".zoom";
                if (e.enabled && c.supportsTransition) {
                    function n(t) {
                        var i = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            s = "all " + e.duration / 1e3 + "s " + e.easing,
                            o = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            },
                            n = "transition";
                        return o["-webkit-" + n] = o["-moz-" + n] = o["-o-" + n] = o[n] = s, i.css(o), i
                    }

                    function r() {
                        c.content.css("visibility", "visible")
                    }
                    var l, a, d = e.duration;
                    i("BuildControls" + s, function() {
                        if (c._allowZoom()) {
                            if (clearTimeout(l), c.content.css("visibility", "hidden"), !(t = c._getItemToZoom())) return void r();
                            (a = n(t)).css(c._getOffset()), c.wrap.append(a), l = setTimeout(function() {
                                a.css(c._getOffset(!0)), l = setTimeout(function() {
                                    r(), setTimeout(function() {
                                        a.remove(), t = a = null, o("ZoomAnimationEnded")
                                    }, 16)
                                }, d)
                            }, 16)
                        }
                    }), i(m + s, function() {
                        if (c._allowZoom()) {
                            if (clearTimeout(l), c.st.removalDelay = d, !t) {
                                if (!(t = c._getItemToZoom())) return;
                                a = n(t)
                            }
                            a.css(c._getOffset(!0)), c.wrap.append(a), c.content.css("visibility", "hidden"), setTimeout(function() {
                                a.css(c._getOffset())
                            }, 16)
                        }
                    }), i(g + s, function() {
                        c._allowZoom() && (r(), a && a.remove(), t = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === c.currItem.type
            },
            _getItemToZoom: function() {
                return !!c.currItem.hasSize && c.currItem.img
            },
            _getOffset: function(e) {
                var i, s = (i = e ? c.currItem.img : c.st.zoom.opener(c.currItem.el || c.currItem)).offset(),
                    o = parseInt(i.css("padding-top"), 10),
                    n = parseInt(i.css("padding-bottom"), 10);
                s.top -= t(window).scrollTop() - o;
                var r = {
                    width: i.width(),
                    height: (_ ? i.innerHeight() : i[0].offsetHeight) - n - o
                };
                return void 0 === a && (a = void 0 !== document.createElement("p").style.MozTransform), a ? r["-moz-transform"] = r.transform = "translate(" + s.left + "px," + s.top + "px)" : (r.left = s.left, r.top = s.top), r
            }
        }
    });
    var L = "iframe";

    function j(t) {
        var e = c.items.length;
        return e - 1 < t ? t - e : t < 0 ? e + t : t
    }

    function M(t, e, i) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
    }
    t.magnificPopup.registerModule(L, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                c.types.push(L), i("BeforeChange", function(t, e, i) {
                    e !== i && (e === L ? H() : i === L && H(!0))
                }), i(g + "." + L, function() {
                    H()
                })
            },
            getIframe: function(e, i) {
                var s = e.src,
                    o = c.st.iframe;
                t.each(o.patterns, function() {
                    if (-1 < s.indexOf(this.index)) return this.id && (s = "string" == typeof this.id ? s.substr(s.lastIndexOf(this.id) + this.id.length, s.length) : this.id.call(this, s)), s = this.src.replace("%id%", s), !1
                });
                var n = {};
                return o.srcAction && (n[o.srcAction] = s), c._parseMarkup(i, n, e), c.updateStatus("ready"), i
            }
        }
    }), t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var e = c.st.gallery,
                    s = ".mfp-gallery";
                if (c.direction = !0, !e || !e.enabled) return !1;
                h += " mfp-gallery", i($ + s, function() {
                    e.navigateByImgClick && c.wrap.on("click" + s, ".mfp-img", function() {
                        if (1 < c.items.length) return c.next(), !1
                    }), p.on("keydown" + s, function(t) {
                        37 === t.keyCode ? c.prev() : 39 === t.keyCode && c.next()
                    })
                }), i("UpdateStatus" + s, function(t, e) {
                    e.text && (e.text = M(e.text, c.currItem.index, c.items.length))
                }), i(v + s, function(t, i, s, o) {
                    var n = c.items.length;
                    s.counter = 1 < n ? M(e.tCounter, o.index, n) : ""
                }), i("BuildControls" + s, function() {
                    if (1 < c.items.length && e.arrows && !c.arrowLeft) {
                        var i = e.arrowMarkup,
                            s = c.arrowLeft = t(i.replace(/%title%/gi, e.tPrev).replace(/%dir%/gi, "left")).addClass(w),
                            o = c.arrowRight = t(i.replace(/%title%/gi, e.tNext).replace(/%dir%/gi, "right")).addClass(w);
                        s.click(function() {
                            c.prev()
                        }), o.click(function() {
                            c.next()
                        }), c.container.append(s.add(o))
                    }
                }), i("Change" + s, function() {
                    c._preloadTimeout && clearTimeout(c._preloadTimeout), c._preloadTimeout = setTimeout(function() {
                        c.preloadNearbyImages(), c._preloadTimeout = null
                    }, 16)
                }), i(g + s, function() {
                    p.off(s), c.wrap.off("click" + s), c.arrowRight = c.arrowLeft = null
                })
            },
            next: function() {
                c.direction = !0, c.index = j(c.index + 1), c.updateItemHTML()
            },
            prev: function() {
                c.direction = !1, c.index = j(c.index - 1), c.updateItemHTML()
            },
            goTo: function(t) {
                c.direction = t >= c.index, c.index = t, c.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, e = c.st.gallery.preload,
                    i = Math.min(e[0], c.items.length),
                    s = Math.min(e[1], c.items.length);
                for (t = 1; t <= (c.direction ? s : i); t++) c._preloadItem(c.index + t);
                for (t = 1; t <= (c.direction ? i : s); t++) c._preloadItem(c.index - t)
            },
            _preloadItem: function(e) {
                if (e = j(e), !c.items[e].preloaded) {
                    var i = c.items[e];
                    i.parsed || (i = c.parseEl(e)), o("LazyLoad", i), "image" === i.type && (i.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                        i.hasSize = !0
                    }).on("error.mfploader", function() {
                        i.hasSize = !0, i.loadError = !0, o("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var B = "retina";
    t.magnificPopup.registerModule(B, {
        options: {
            replaceSrc: function(t) {
                return t.src.replace(/\.\w+$/, function(t) {
                    return "@2x" + t
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (1 < window.devicePixelRatio) {
                    var t = c.st.retina,
                        e = t.ratio;
                    1 < (e = isNaN(e) ? e() : e) && (i("ImageHasSize." + B, function(t, i) {
                        i.img.css({
                            "max-width": i.img[0].naturalWidth / e,
                            width: "100%"
                        })
                    }), i("ElementParse." + B, function(i, s) {
                        s.src = t.replaceSrc(s, e)
                    }))
                }
            }
        }
    }), r()
}),
function(t, e) {
    if ("function" == typeof define && define.amd) define(["exports"], e);
    else if ("undefined" != typeof exports) e(exports);
    else {
        var i = {};
        e(i), t.bodyScrollLock = i
    }
}(this, function(t) {
    "use strict";

    function e(t) {
        if (Array.isArray(t)) {
            for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
            return i
        }
        return Array.from(t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = !1;
    if ("undefined" != typeof window) {
        var s = {
            get passive() {
                i = !0
            }
        };
        window.addEventListener("testPassive", null, s), window.removeEventListener("testPassive", null, s)
    }

    function o(t) {
        return a.some(function(e) {
            return !(!e.options.allowTouchMove || !e.options.allowTouchMove(t))
        })
    }

    function n(t) {
        var e = t || window.event;
        return !!o(e.target) || 1 < e.touches.length || (e.preventDefault && e.preventDefault(), !1)
    }

    function r() {
        setTimeout(function() {
            void 0 !== u && (document.body.style.paddingRight = u, u = void 0), void 0 !== p && (document.body.style.overflow = p, p = void 0)
        })
    }
    var l = "undefined" != typeof window && window.navigator && window.navigator.platform && /iP(ad|hone|od)/.test(window.navigator.platform),
        a = [],
        c = !1,
        d = -1,
        p = void 0,
        u = void 0;
    t.disableBodyScroll = function(t, s) {
        if (l) {
            if (!t) return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
            t && !a.some(function(e) {
                return e.targetElement === t
            }) && (a = [].concat(e(a), [{
                targetElement: t,
                options: s || {}
            }]), t.ontouchstart = function(t) {
                1 === t.targetTouches.length && (d = t.targetTouches[0].clientY)
            }, t.ontouchmove = function(e) {
                var i, s, r, l;
                1 === e.targetTouches.length && (i = e, s = t, r = i.targetTouches[0].clientY - d, o(i.target) || (s && 0 === s.scrollTop && 0 < r ? n(i) : (l = s) && l.scrollHeight - l.scrollTop <= l.clientHeight && r < 0 ? n(i) : i.stopPropagation()))
            }, c || (document.addEventListener("touchmove", n, i ? {
                passive: !1
            } : void 0), c = !0))
        } else {
            var r;
            r = s, setTimeout(function() {
                if (void 0 === u) {
                    var t = !!r && !0 === r.reserveScrollBarGap,
                        e = window.innerWidth - document.documentElement.clientWidth;
                    t && 0 < e && (u = document.body.style.paddingRight, document.body.style.paddingRight = e + "px")
                }
                void 0 === p && (p = document.body.style.overflow, document.body.style.overflow = "hidden")
            }), a = [].concat(e(a), [{
                targetElement: t,
                options: s || {}
            }])
        }
    }, t.clearAllBodyScrollLocks = function() {
        l ? (a.forEach(function(t) {
            t.targetElement.ontouchstart = null, t.targetElement.ontouchmove = null
        }), c && (document.removeEventListener("touchmove", n, i ? {
            passive: !1
        } : void 0), c = !1), a = [], d = -1) : (r(), a = [])
    }, t.enableBodyScroll = function(t) {
        if (l) {
            if (!t) return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
            t.ontouchstart = null, t.ontouchmove = null, a = a.filter(function(e) {
                return e.targetElement !== t
            }), c && 0 === a.length && (document.removeEventListener("touchmove", n, i ? {
                passive: !1
            } : void 0), c = !1)
        } else a = 1 === a.length && a[0].targetElement === t ? (r(), []) : a.filter(function(e) {
            return e.targetElement !== t
        })
    }
}),
function(t, e, i, s) {
    var o, n, r, l, a, c, d, p, u, h, f, g, m = "mPageScroll2id",
        v = "mPS2id",
        $ = {
            scrollSpeed: 1e3,
            autoScrollSpeed: !0,
            scrollEasing: "easeInOutQuint",
            scrollingEasing: "easeOutQuint",
            pageEndSmoothScroll: !0,
            layout: "vertical",
            offset: 0,
            highlightSelector: !1,
            clickedClass: v + "-clicked",
            targetClass: v + "-target",
            highlightClass: v + "-highlight",
            forceSingleHighlight: !1,
            keepHighlightUntilNext: !1,
            highlightByNextTarget: !1,
            disablePluginBelow: !1,
            clickEvents: !0,
            appendHash: !1,
            onStart: function() {},
            onComplete: function() {},
            defaultSelector: !1,
            live: !0,
            liveSelector: !1,
            excludeSelectors: !1
        },
        y = 0,
        b = {
            init: function(s) {
                if (s = t.extend(!0, {}, $, s), t(i).data(v, s), n = t(i).data(v), !this.selector) {
                    var c = "__" + v;
                    this.each(function() {
                        var e = t(this);
                        e.hasClass(c) || e.addClass(c)
                    }), this.selector = "." + c
                }
                n.liveSelector && (this.selector += "," + n.liveSelector), o = o ? o + "," + this.selector : this.selector, n.defaultSelector && ("object" == typeof t(o) && 0 !== t(o).length || (o = ".m_PageScroll2id,a[rel~='m_PageScroll2id'],.page-scroll-to-id,a[rel~='page-scroll-to-id'],._ps2id")), n.clickEvents && t(i).undelegate("." + v).delegate(o, "click." + v, function(e) {
                    if (k._isDisabled.call(null)) k._removeClasses.call(null);
                    else {
                        var i = t(this),
                            s = i.attr("href"),
                            o = i.prop("href").baseVal || i.prop("href");
                        n.excludeSelectors && i.is(n.excludeSelectors) || s && -1 !== s.indexOf("#/") || (k._reset.call(null), h = i.data("ps2id-offset") || 0, k._isValid.call(null, s, o) && k._findTarget.call(null, s) && (e.preventDefault(), l = "selector", a = i, k._setClasses.call(null, !0), k._scrollTo.call(null)))
                    }
                }), t(e).unbind("." + v).bind("scroll.mPS2id resize." + v, function() {
                    if (k._isDisabled.call(null)) k._removeClasses.call(null);
                    else {
                        var e = t("._mPS2id-t");
                        e.each(function(i) {
                            var s = t(this),
                                o = s.attr("id"),
                                n = k._findHighlight.call(null, o);
                            k._setClasses.call(null, !1, s, n), i == e.length - 1 && k._extendClasses.call(null)
                        })
                    }
                }), r = !0, k._setup.call(null), k._live.call(null)
            },
            scrollTo: function(e, i) {
                if (k._isDisabled.call(null)) k._removeClasses.call(null);
                else if (e && void 0 !== e) {
                    k._isInit.call(null);
                    var s = {
                        layout: n.layout,
                        offset: n.offset,
                        clicked: !1
                    };
                    i = t.extend(!0, {}, s, i), k._reset.call(null), p = i.layout, u = i.offset, e = -1 !== e.indexOf("#") ? e : "#" + e, k._isValid.call(null, e) && k._findTarget.call(null, e) && (l = "scrollTo", (a = i.clicked) && k._setClasses.call(null, !0), k._scrollTo.call(null))
                }
            },
            destroy: function() {
                t(e).unbind("." + v), t(i).undelegate("." + v).removeData(v), t("._mPS2id-t").removeData(v), k._removeClasses.call(null, !0)
            }
        },
        k = {
            _isDisabled: function() {
                var t = e,
                    s = "inner",
                    o = n.disablePluginBelow instanceof Array ? [n.disablePluginBelow[0] || 0, n.disablePluginBelow[1] || 0] : [n.disablePluginBelow || 0, 0];
                return "innerWidth" in e || (s = "client", t = i.documentElement || i.body), t[s + "Width"] <= o[0] || t[s + "Height"] <= o[1]
            },
            _isValid: function(t, i) {
                if (t) {
                    var s = -1 !== (i = i || t).indexOf("#/") ? i.split("#/")[0] : i.split("#")[0],
                        o = e.location.toString().split("#")[0];
                    return "#" !== t && -1 !== t.indexOf("#") && ("" === s || decodeURIComponent(s) === decodeURIComponent(o))
                }
            },
            _setup: function() {
                var e = k._highlightSelector(),
                    i = 1,
                    s = 0;
                return t(e).each(function() {
                    var o = t(this),
                        r = o.attr("href"),
                        l = o.prop("href").baseVal || o.prop("href");
                    if (k._isValid.call(null, r, l)) {
                        if (n.excludeSelectors && o.is(n.excludeSelectors)) return;
                        var a = -1 !== r.indexOf("#/") ? r.split("#/")[1] : r.split("#")[1],
                            c = t("#" + a);
                        if (0 < c.length) {
                            n.highlightByNextTarget && c !== s && (s ? s.data(v, {
                                tn: c
                            }) : c.data(v, {
                                tn: "0"
                            }), s = c), c.hasClass("_mPS2id-t") || c.addClass("_mPS2id-t"), c.data(v, {
                                i: i
                            }), o.hasClass("_mPS2id-h") || o.addClass("_mPS2id-h");
                            var d = k._findHighlight.call(null, a);
                            k._setClasses.call(null, !1, c, d), y = i, ++i == t(e).length && k._extendClasses.call(null)
                        }
                    }
                })
            },
            _highlightSelector: function() {
                return n.highlightSelector && "" !== n.highlightSelector ? n.highlightSelector : o
            },
            _findTarget: function(e) {
                var i = -1 !== e.indexOf("#/") ? e.split("#/")[1] : e.split("#")[1],
                    s = t("#" + i);
                if (s.length < 1 || "fixed" === s.css("position")) {
                    if ("top" !== i) return;
                    s = t("body")
                }
                return c = s, p || (p = n.layout), u = k._setOffset.call(null), (d = [(s.offset().top - u[0]).toString(), (s.offset().left - u[1]).toString()])[0] = d[0] < 0 ? 0 : d[0], d[1] = d[1] < 0 ? 0 : d[1], d
            },
            _setOffset: function() {
                var e, i, s, o;
                switch (u || (u = n.offset ? n.offset : 0), h && (u = h), typeof u) {
                    case "object":
                    case "string":
                        0 < (i = [(e = [u.y ? u.y : u, u.x ? u.x : u])[0] instanceof jQuery ? e[0] : t(e[0]), e[1] instanceof jQuery ? e[1] : t(e[1])])[0].length ? (s = i[0].height(), "fixed" === i[0].css("position") && (s += i[0][0].offsetTop)) : s = !isNaN(parseFloat(e[0])) && isFinite(e[0]) ? parseInt(e[0]) : 0, 0 < i[1].length ? (o = i[1].width(), "fixed" === i[1].css("position") && (o += i[1][0].offsetLeft)) : o = !isNaN(parseFloat(e[1])) && isFinite(e[1]) ? parseInt(e[1]) : 0;
                        break;
                    case "function":
                        (e = u.call(null)) instanceof Array ? (s = e[0], o = e[1]) : s = o = e;
                        break;
                    default:
                        s = o = parseInt(u)
                }
                return [s, o]
            },
            _findHighlight: function(i) {
                var s = e.location,
                    o = s.toString().split("#")[0],
                    n = s.pathname;
                return -1 !== o.indexOf("'") && (o = o.replace("'", "\\'")), -1 !== n.indexOf("'") && (n = n.replace("'", "\\'")), o = decodeURIComponent(o), n = decodeURIComponent(n), t("._mPS2id-h[href='#" + i + "'],._" + v + "-h[href='" + o + "#" + i + "'],._" + v + "-h[href='" + n + "#" + i + "'],._" + v + "-h[href='#/" + i + "'],._" + v + "-h[href='" + o + "#/" + i + "'],._" + v + "-h[href='" + n + "#/" + i + "']")
            },
            _setClasses: function(e, i, s) {
                var o = n.clickedClass,
                    r = n.targetClass,
                    l = n.highlightClass;
                e && o && "" !== o ? (t("." + o).removeClass(o), a.addClass(o)) : i && r && "" !== r && s && l && "" !== l && (k._currentTarget.call(null, i) ? (i.addClass(r), s.addClass(l)) : (!n.keepHighlightUntilNext || 1 < t("." + l).length) && (i.removeClass(r), s.removeClass(l)))
            },
            _extendClasses: function() {
                var e = n.targetClass,
                    i = n.highlightClass,
                    s = t("." + e),
                    o = t("." + i),
                    r = e + "-first",
                    l = e + "-last",
                    a = i + "-first",
                    c = i + "-last";
                t("._mPS2id-t").removeClass(r + " " + l), t("._mPS2id-h").removeClass(a + " " + c), n.forceSingleHighlight ? n.keepHighlightUntilNext && 1 < s.length ? (s.slice(0, 1).removeClass(e), o.slice(0, 1).removeClass(i)) : (s.slice(1).removeClass(e), o.slice(1).removeClass(i)) : (s.slice(0, 1).addClass(r).end().slice(-1).addClass(l), o.slice(0, 1).addClass(a).end().slice(-1).addClass(c))
            },
            _removeClasses: function(e) {
                t("." + n.clickedClass).removeClass(n.clickedClass), t("." + n.targetClass).removeClass(n.targetClass + " " + n.targetClass + "-first " + n.targetClass + "-last"), t("." + n.highlightClass).removeClass(n.highlightClass + " " + n.highlightClass + "-first " + n.highlightClass + "-last"), e && (t("._mPS2id-t").removeClass("_mPS2id-t"), t("._mPS2id-h").removeClass("_mPS2id-h"))
            },
            _currentTarget: function(i) {
                var s = n["target_" + i.data(v).i],
                    o = i.data("ps2id-target"),
                    r = o && t(o)[0] ? t(o)[0].getBoundingClientRect() : i[0].getBoundingClientRect();
                if (void 0 !== s) {
                    var l = i.offset().top,
                        a = i.offset().left,
                        c = s.from ? s.from + l : l,
                        d = s.to ? s.to + l : l,
                        p = s.fromX ? s.fromX + a : a,
                        u = s.toX ? s.toX + a : a;
                    return r.top >= d && r.top <= c && r.left >= u && r.left <= p
                }
                var h = t(e).height(),
                    f = t(e).width(),
                    g = o ? t(o).height() : i.height(),
                    m = o ? t(o).width() : i.width(),
                    $ = 1 + g / h,
                    y = 1 + m / f,
                    b = [r.top <= h / $, r.bottom >= h / (g < h ? h / g * $ : $), r.left <= f / y, r.right >= f / (m < f ? f / m * y : y)];
                if (n.highlightByNextTarget) {
                    var k = i.data(v).tn;
                    if (k) {
                        var w = k[0].getBoundingClientRect();
                        "vertical" === n.layout ? b = [r.top <= h / 2, w.top > h / 2, 1, 1] : "horizontal" === n.layout && (b = [1, 1, r.left <= f / 2, w.left > f / 2])
                    }
                }
                return b[0] && b[1] && b[2] && b[3]
            },
            _scrollTo: function() {
                g = k._scrollSpeed.call(null), d = n.pageEndSmoothScroll ? k._pageEndSmoothScroll.call(null) : d;
                var i, s = t("html,body"),
                    o = n.autoScrollSpeed ? k._autoScrollSpeed.call(null) : g,
                    r = s.is(":animated") ? n.scrollingEasing : n.scrollEasing,
                    l = t(e).scrollTop(),
                    a = t(e).scrollLeft();
                switch (p) {
                    case "horizontal":
                        a != d[1] && (k._callbacks.call(null, "onStart"), s.stop().animate({
                            scrollLeft: d[1]
                        }, o, r).promise().then(function() {
                            k._callbacks.call(null, "onComplete")
                        }));
                        break;
                    case "auto":
                        (l != d[0] || a != d[1]) && ((k._callbacks.call(null, "onStart"), navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) ? s.stop().animate({
                            pageYOffset: d[0],
                            pageXOffset: d[1]
                        }, {
                            duration: o,
                            easing: r,
                            step: function(t, s) {
                                "pageXOffset" == s.prop ? i = t : "pageYOffset" == s.prop && e.scrollTo(i, t)
                            }
                        }).promise().then(function() {
                            k._callbacks.call(null, "onComplete")
                        }) : s.stop().animate({
                            scrollTop: d[0],
                            scrollLeft: d[1]
                        }, o, r).promise().then(function() {
                            k._callbacks.call(null, "onComplete")
                        }));
                        break;
                    default:
                        l != d[0] && (k._callbacks.call(null, "onStart"), s.stop().animate({
                            scrollTop: d[0]
                        }, o, r).promise().then(function() {
                            k._callbacks.call(null, "onComplete")
                        }))
                }
            },
            _pageEndSmoothScroll: function() {
                var s = t(i).height(),
                    o = t(i).width(),
                    n = t(e).height(),
                    r = t(e).width();
                return [s - d[0] < n ? s - n : d[0], o - d[1] < r ? o - r : d[1]]
            },
            _scrollSpeed: function() {
                var e = n.scrollSpeed;
                return a && a.length && a.add(a.parent()).each(function() {
                    var i = t(this);
                    if (i.attr("class")) {
                        var s = i.attr("class").split(" ");
                        for (var o in s)
                            if (String(s[o]).match(/^ps2id-speed-\d+$/)) {
                                e = s[o].split("ps2id-speed-")[1];
                                break
                            }
                    }
                }), parseInt(e)
            },
            _autoScrollSpeed: function() {
                var s = t(e).scrollTop(),
                    o = t(e).scrollLeft(),
                    n = t(i).height(),
                    r = t(i).width(),
                    l = [g + g * Math.floor(Math.abs(d[0] - s) / n * 100) / 100, g + g * Math.floor(Math.abs(d[1] - o) / r * 100) / 100];
                return Math.max.apply(Math, l)
            },
            _callbacks: function(t) {
                if (n) switch (this[v] = {
                    trigger: l,
                    clicked: a,
                    target: c,
                    scrollTo: {
                        y: d[0],
                        x: d[1]
                    }
                }, t) {
                    case "onStart":
                        if (n.appendHash && e.history && e.history.pushState && a && a.length) {
                            var i = "#" + a.attr("href").split("#")[1];
                            i !== e.location.hash && history.pushState("", "", i)
                        }
                        n.onStart.call(null, this[v]);
                        break;
                    case "onComplete":
                        n.onComplete.call(null, this[v])
                }
            },
            _reset: function() {
                p = u = h = !1
            },
            _isInit: function() {
                r || b.init.apply(this)
            },
            _live: function() {
                f = setTimeout(function() {
                    n.live ? t(k._highlightSelector()).length !== y && k._setup.call(null) : f && clearTimeout(f), k._live.call(null)
                }, 1e3)
            },
            _easing: function() {
                function e(t) {
                    return t < .36363636363636365 ? 7.5625 * t * t : t < .7272727272727273 ? 7.5625 * (t -= .5454545454545454) * t + .75 : t < .9090909090909091 ? 7.5625 * (t -= .8181818181818182) * t + .9375 : 7.5625 * (t -= .9545454545454546) * t + .984375
                }
                t.easing.easeInQuad = t.easing.easeInQuad || function(t) {
                    return t * t
                }, t.easing.easeOutQuad = t.easing.easeOutQuad || function(t) {
                    return 1 - (1 - t) * (1 - t)
                }, t.easing.easeInOutQuad = t.easing.easeInOutQuad || function(t) {
                    return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
                }, t.easing.easeInCubic = t.easing.easeInCubic || function(t) {
                    return t * t * t
                }, t.easing.easeOutCubic = t.easing.easeOutCubic || function(t) {
                    return 1 - Math.pow(1 - t, 3)
                }, t.easing.easeInOutCubic = t.easing.easeInOutCubic || function(t) {
                    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                }, t.easing.easeInQuart = t.easing.easeInQuart || function(t) {
                    return t * t * t * t
                }, t.easing.easeOutQuart = t.easing.easeOutQuart || function(t) {
                    return 1 - Math.pow(1 - t, 4)
                }, t.easing.easeInOutQuart = t.easing.easeInOutQuart || function(t) {
                    return t < .5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
                }, t.easing.easeInQuint = t.easing.easeInQuint || function(t) {
                    return t * t * t * t * t
                }, t.easing.easeOutQuint = t.easing.easeOutQuint || function(t) {
                    return 1 - Math.pow(1 - t, 5)
                }, t.easing.easeInOutQuint = t.easing.easeInOutQuint || function(t) {
                    return t < .5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
                }, t.easing.easeInExpo = t.easing.easeInExpo || function(t) {
                    return 0 === t ? 0 : Math.pow(2, 10 * t - 10)
                }, t.easing.easeOutExpo = t.easing.easeOutExpo || function(t) {
                    return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                }, t.easing.easeInOutExpo = t.easing.easeInOutExpo || function(t) {
                    return 0 === t ? 0 : 1 === t ? 1 : t < .5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
                }, t.easing.easeInSine = t.easing.easeInSine || function(t) {
                    return 1 - Math.cos(t * Math.PI / 2)
                }, t.easing.easeOutSine = t.easing.easeOutSine || function(t) {
                    return Math.sin(t * Math.PI / 2)
                }, t.easing.easeInOutSine = t.easing.easeInOutSine || function(t) {
                    return -(Math.cos(Math.PI * t) - 1) / 2
                }, t.easing.easeInCirc = t.easing.easeInCirc || function(t) {
                    return 1 - Math.sqrt(1 - Math.pow(t, 2))
                }, t.easing.easeOutCirc = t.easing.easeOutCirc || function(t) {
                    return Math.sqrt(1 - Math.pow(t - 1, 2))
                }, t.easing.easeInOutCirc = t.easing.easeInOutCirc || function(t) {
                    return t < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
                }, t.easing.easeInElastic = t.easing.easeInElastic || function(t) {
                    return 0 === t ? 0 : 1 === t ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((10 * t - 10.75) * (2 * Math.PI / 3))
                }, t.easing.easeOutElastic = t.easing.easeOutElastic || function(t) {
                    return 0 === t ? 0 : 1 === t ? 1 : Math.pow(2, -10 * t) * Math.sin((10 * t - .75) * (2 * Math.PI / 3)) + 1
                }, t.easing.easeInOutElastic = t.easing.easeInOutElastic || function(t) {
                    return 0 === t ? 0 : 1 === t ? 1 : t < .5 ? -Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI / 4.5)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI / 4.5)) / 2 + 1
                }, t.easing.easeInBack = t.easing.easeInBack || function(t) {
                    return 2.70158 * t * t * t - 1.70158 * t * t
                }, t.easing.easeOutBack = t.easing.easeOutBack || function(t) {
                    return 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2)
                }, t.easing.easeInOutBack = t.easing.easeInOutBack || function(t) {
                    return t < .5 ? Math.pow(2 * t, 2) * (7.189819 * t - 2.5949095) / 2 : (Math.pow(2 * t - 2, 2) * (3.5949095 * (2 * t - 2) + 2.5949095) + 2) / 2
                }, t.easing.easeInBounce = t.easing.easeInBounce || function(t) {
                    return 1 - e(1 - t)
                }, t.easing.easeOutBounce = t.easing.easeOutBounce || e, t.easing.easeInOutBounce = t.easing.easeInOutBounce || function(t) {
                    return t < .5 ? (1 - e(1 - 2 * t)) / 2 : (1 + e(2 * t - 1)) / 2
                }
            }
        };
    k._easing.call(), t.fn[m] = function(e) {
        return b[e] ? b[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : b.init.apply(this, arguments)
    }, t[m] = function(e) {
        return b[e] ? b[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : b.init.apply(this, arguments)
    }, t[m].defaults = $
}(jQuery, window, document);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = function(e, i) {
        return void 0 === i && (i = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), t(i), i
    } : t(jQuery)
}(function(t) {
    return t.fn.tilt = function(e) {
        function i() {
            this.ticking || (requestAnimationFrame(c.bind(this)), this.ticking = !0)
        }

        function s() {
            var e = this;
            void 0 !== this.timeout && clearTimeout(this.timeout), t(this).css({
                transition: this.settings.speed + "ms " + this.settings.easing
            }), this.settings.glare && this.glareElement.css({
                transition: "opacity " + this.settings.speed + "ms " + this.settings.easing
            }), this.timeout = setTimeout(function() {
                t(e).css({
                    transition: ""
                }), e.settings.glare && e.glareElement.css({
                    transition: ""
                })
            }, this.settings.speed)
        }

        function o(e) {
            return void 0 === e && (e = {
                pageX: t(this).offset().left + t(this).outerWidth() / 2,
                pageY: t(this).offset().top + t(this).outerHeight() / 2
            }), {
                x: e.pageX,
                y: e.pageY
            }
        }

        function n() {
            var e = t(this).outerWidth(),
                i = t(this).outerHeight(),
                s = t(this).offset().left,
                o = t(this).offset().top,
                n = (this.mousePositions.x - s) / e,
                r = (this.mousePositions.y - o) / i;
            return {
                tiltX: (this.settings.maxTilt / 2 - n * this.settings.maxTilt).toFixed(2),
                tiltY: (r * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2),
                percentageX: 100 * n,
                percentageY: 100 * r,
                angle: Math.atan2(this.mousePositions.x - (s + e / 2), -(this.mousePositions.y - (o + i / 2))) * (180 / Math.PI)
            }
        }
        var r = function(e) {
                this.ticking = !1, t(this).css({
                    "will-change": "transform"
                }), s.call(this), t(this).trigger("tilt.mouseEnter")
            },
            l = function(t) {
                this.mousePositions = o(t), i.call(this)
            },
            a = function() {
                s.call(this), this.reset = !0, i.call(this), t(this).trigger("tilt.mouseLeave")
            },
            c = function() {
                return this.transforms = n.call(this), this.reset ? (this.reset = !1, t(this).css("transform", "perspective(" + this.settings.perspective + "px) rotateX(0deg) rotateY(0deg)"), void(this.settings.glare && (this.glareElement.css("transform", "rotate(180deg) translate(-50%, -50%)"), this.glareElement.css("opacity", "0")))) : (t(this).css("transform", "perspective(" + this.settings.perspective + "px) rotateX(" + ("x" === this.settings.disableAxis ? 0 : this.transforms.tiltY) + "deg) rotateY(" + ("y" === this.settings.disableAxis ? 0 : this.transforms.tiltX) + "deg) scale3d(" + this.settings.scale + "," + this.settings.scale + "," + this.settings.scale + ")"), this.settings.glare && (this.glareElement.css("transform", "rotate(" + this.transforms.angle + "deg) translate(-50%, -50%)"), this.glareElement.css("opacity", "" + this.transforms.percentageY * this.settings.maxGlare / 100)), t(this).trigger("change", [this.transforms]), void(this.ticking = !1))
            },
            d = function() {
                this.glareElement.css({
                    width: "" + 2 * t(this).outerWidth(),
                    height: "" + 2 * t(this).outerWidth()
                })
            };
        return t.fn.tilt.destroy = function() {
            t(this).each(function() {
                t(this).find(".js-tilt-glare").remove(), t(this).css({
                    "will-change": "",
                    transform: ""
                }), t(this).off("mousemove mouseenter mouseleave")
            })
        }, t.fn.tilt.getValues = function() {
            var e = [];
            return t(this).each(function() {
                this.mousePositions = o.call(this), e.push(n.call(this))
            }), e
        }, t.fn.tilt.reset = function() {
            t(this).each(function() {
                var e = this;
                this.mousePositions = o.call(this), this.settings = t(this).data("settings"), a.call(this), setTimeout(function() {
                    e.reset = !1
                }, this.settings.transition)
            })
        }, this.each(function() {
            var i = this;
            this.settings = t.extend({
                maxTilt: t(this).is("[data-tilt-max]") ? t(this).data("tilt-max") : 20,
                perspective: t(this).is("[data-tilt-perspective]") ? t(this).data("tilt-perspective") : 300,
                easing: t(this).is("[data-tilt-easing]") ? t(this).data("tilt-easing") : "cubic-bezier(.03,.98,.52,.99)",
                scale: t(this).is("[data-tilt-scale]") ? t(this).data("tilt-scale") : "1",
                speed: t(this).is("[data-tilt-speed]") ? t(this).data("tilt-speed") : "400",
                transition: !t(this).is("[data-tilt-transition]") || t(this).data("tilt-transition"),
                disableAxis: t(this).is("[data-tilt-disable-axis]") ? t(this).data("tilt-disable-axis") : null,
                axis: t(this).is("[data-tilt-axis]") ? t(this).data("tilt-axis") : null,
                reset: !t(this).is("[data-tilt-reset]") || t(this).data("tilt-reset"),
                glare: !!t(this).is("[data-tilt-glare]") && t(this).data("tilt-glare"),
                maxGlare: t(this).is("[data-tilt-maxglare]") ? t(this).data("tilt-maxglare") : 1
            }, e), null !== this.settings.axis && (console.warn("Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information"), this.settings.disableAxis = this.settings.axis), this.init = function() {
                t(i).data("settings", i.settings), i.settings.glare && (function() {
                    var e = this.settings.glarePrerender;
                    e || t(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'), this.glareElementWrapper = t(this).find(".js-tilt-glare"), this.glareElement = t(this).find(".js-tilt-glare-inner"), e || (this.glareElementWrapper.css({
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%"
                    }).css({
                        overflow: "hidden",
                        "pointer-events": "none"
                    }), this.glareElement.css({
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                        width: "" + 2 * t(this).outerWidth(),
                        height: "" + 2 * t(this).outerWidth(),
                        transform: "rotate(180deg) translate(-50%, -50%)",
                        "transform-origin": "0% 0%",
                        opacity: "0"
                    }))
                }).call(i), (function() {
                    t(this).on("mousemove", l), t(this).on("mouseenter", r), this.settings.reset && t(this).on("mouseleave", a), this.settings.glare && t(window).on("resize", d.bind(this))
                }).call(i)
            }, this.init()
        })
    }, t("[data-tilt]").tilt(), !0
}),
function(t, e) {
    "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.Rellax = e()
}("undefined" != typeof window ? window : global, function() {
    var t = function(e, i) {
        var s = Object.create(t.prototype),
            o = 0,
            n = 0,
            r = 0,
            l = 0,
            a = [],
            c = !0,
            d = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
                return setTimeout(t, 1e3 / 60)
            },
            p = null,
            u = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout,
            h = window.transformProp || function() {
                var t = document.createElement("div");
                if (null === t.style.transform) {
                    var e, i = ["Webkit", "Moz", "ms"];
                    for (e in i)
                        if (void 0 !== t.style[i[e] + "Transform"]) return i[e] + "Transform"
                }
                return "transform"
            }();
        s.options = {
            speed: -2,
            center: !1,
            wrapper: null,
            relativeToWrapper: !1,
            round: !0,
            vertical: !0,
            horizontal: !1,
            callback: function() {}
        }, i && Object.keys(i).forEach(function(t) {
            s.options[t] = i[t]
        }), e || (e = ".rellax");
        var f = "string" == typeof e ? document.querySelectorAll(e) : [e];
        if (0 < f.length) {
            if (s.elems = f, s.options.wrapper && !s.options.wrapper.nodeType) {
                if (!(f = document.querySelector(s.options.wrapper))) return void console.warn("Rellax: The wrapper you're trying to use doesn't exist.");
                s.options.wrapper = f
            }
            var g = function() {
                    for (var t = 0; t < a.length; t++) s.elems[t].style.cssText = a[t].style;
                    for (a = [], n = window.innerHeight, l = window.innerWidth, m(), t = 0; t < s.elems.length; t++) {
                        var e = s.elems[t],
                            i = e.getAttribute("data-rellax-percentage"),
                            o = e.getAttribute("data-rellax-speed"),
                            r = e.getAttribute("data-rellax-zindex") || 0,
                            d = e.getAttribute("data-rellax-min"),
                            p = e.getAttribute("data-rellax-max"),
                            u = s.options.wrapper ? s.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                        s.options.relativeToWrapper && (u = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) - s.options.wrapper.offsetTop);
                        var h = s.options.vertical && (i || s.options.center) ? u : 0,
                            f = s.options.horizontal && (i || s.options.center) ? s.options.wrapper ? s.options.wrapper.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0;
                        u = h + e.getBoundingClientRect().top;
                        var $ = e.clientHeight || e.offsetHeight || e.scrollHeight,
                            b = f + e.getBoundingClientRect().left,
                            k = e.clientWidth || e.offsetWidth || e.scrollWidth;
                        h = i || (h - u + n) / ($ + n), i = i || (f - b + l) / (k + l), s.options.center && (h = i = .5), i = v(i, h, o = o || s.options.speed), h = "", 0 <= (e = e.style.cssText).indexOf("transform") && (h = e.indexOf("transform"), h = (f = (h = e.slice(h)).indexOf(";")) ? " " + h.slice(11, f).replace(/\s/g, "") : " " + h.slice(11).replace(/\s/g, "")), a.push({
                            baseX: i.x,
                            baseY: i.y,
                            top: u,
                            left: b,
                            height: $,
                            width: k,
                            speed: o,
                            style: e,
                            transform: h,
                            zindex: r,
                            min: d,
                            max: p
                        })
                    }
                    c && (window.addEventListener("resize", g), c = !1), y()
                },
                m = function() {
                    var t = o,
                        e = r;
                    return o = s.options.wrapper ? s.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset, r = s.options.wrapper ? s.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset, s.options.relativeToWrapper && (o = ((document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset) - s.options.wrapper.offsetTop), !!(t != o && s.options.vertical || e != r && s.options.horizontal)
                },
                v = function(t, e, i) {
                    var o = {};
                    return t = 100 * i * (1 - t), e = 100 * i * (1 - e), o.x = s.options.round ? Math.round(t) : Math.round(100 * t) / 100, o.y = s.options.round ? Math.round(e) : Math.round(100 * e) / 100, o
                },
                $ = function() {
                    m() && !1 === c && y(), p = d($)
                },
                y = function() {
                    for (var t, e = 0; e < s.elems.length; e++) {
                        var i = (t = v((r - a[e].left + l) / (a[e].width + l), (o - a[e].top + n) / (a[e].height + n), a[e].speed)).y - a[e].baseY,
                            c = t.x - a[e].baseX;
                        null !== a[e].min && (s.options.vertical && !s.options.horizontal && (i = i <= a[e].min ? a[e].min : i), s.options.horizontal && !s.options.vertical && (c = c <= a[e].min ? a[e].min : c)), null !== a[e].max && (s.options.vertical && !s.options.horizontal && (i = i >= a[e].max ? a[e].max : i), s.options.horizontal && !s.options.vertical && (c = c >= a[e].max ? a[e].max : c)), s.elems[e].style[h] = "translate3d(" + (s.options.horizontal ? c : "0") + "px," + (s.options.vertical ? i : "0") + "px," + a[e].zindex + "px) " + a[e].transform
                    }
                    s.options.callback(t)
                };
            return s.destroy = function() {
                for (var t = 0; t < s.elems.length; t++) s.elems[t].style.cssText = a[t].style;
                c || (window.removeEventListener("resize", g), c = !0), u(p), p = null
            }, g(), $(), s.refresh = g, s
        }
        console.warn("Rellax: The elements you're trying to select don't exist.")
    };
    return t
}),
function(t, e) {
    if ("function" == typeof define && define.amd) define(["module", "exports"], e);
    else if ("undefined" != typeof exports) e(module, exports);
    else {
        var i = {
            exports: {}
        };
        e(i, i.exports), t.WOW = i.exports
    }
}(this, function(t, e) {
    "use strict";

    function i(t, e) {
        if (!(t instanceof e)) throw TypeError("Cannot call a class as a function")
    }

    function s(t, e) {
        return 0 <= e.indexOf(t)
    }

    function o(t, e, i) {
        null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
    }

    function n(t, e, i) {
        null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r, l, a = function(t, e, i) {
            return e && m(t.prototype, e), i && m(t, i), t
        },
        c = window.WeakMap || window.MozWeakMap || (a(g, [{
            key: "get",
            value: function(t) {
                for (var e = 0; e < this.keys.length; e++)
                    if (this.keys[e] === t) return this.values[e]
            }
        }, {
            key: "set",
            value: function(t, e) {
                for (var i = 0; i < this.keys.length; i++)
                    if (this.keys[i] === t) return this.values[i] = e, this;
                return this.keys.push(t), this.values.push(e), this
            }
        }]), g),
        d = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (a(f, [{
            key: "observe",
            value: function() {}
        }]), l = r = f, r.notSupported = !0, l),
        p = window.getComputedStyle || function(t) {
            var e = /(\-([a-z]){1})/g;
            return {
                getPropertyValue: function(i) {
                    "float" === i && (i = "styleFloat"), e.test(i) && i.replace(e, function(t, e) {
                        return e.toUpperCase()
                    });
                    var s = t.currentStyle;
                    return (null != s ? s[i] : void 0) || null
                }
            }
        },
        u = (a(h, [{
            key: "init",
            value: function() {
                this.element = window.document.documentElement, s(document.readyState, ["interactive", "complete"]) ? this.start() : o(document, "DOMContentLoaded", this.start), this.finished = []
            }
        }, {
            key: "start",
            value: function() {
                var t = this;
                if (this.stopped = !1, this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass)), this.all = this.boxes.slice(0), this.boxes.length) {
                    if (this.disabled()) this.resetStyle();
                    else
                        for (var e = 0; e < this.boxes.length; e++) {
                            var i = this.boxes[e];
                            this.applyStyle(i, !0)
                        }
                }
                this.disabled() || (o(this.config.scrollContainer || window, "scroll", this.scrollHandler), o(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live && new d(function(e) {
                    for (var i = 0; i < e.length; i++)
                        for (var s = e[i], o = 0; o < s.addedNodes.length; o++) {
                            var n = s.addedNodes[o];
                            t.doSync(n)
                        }
                }).observe(document.body, {
                    childList: !0,
                    subtree: !0
                })
            }
        }, {
            key: "stop",
            value: function() {
                this.stopped = !0, n(this.config.scrollContainer || window, "scroll", this.scrollHandler), n(window, "resize", this.scrollHandler), null != this.interval && clearInterval(this.interval)
            }
        }, {
            key: "sync",
            value: function() {
                d.notSupported && this.doSync(this.element)
            }
        }, {
            key: "doSync",
            value: function(t) {
                if (null != t || (t = this.element), 1 === t.nodeType)
                    for (var e = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass), i = 0; i < e.length; i++) {
                        var o = e[i];
                        s(o, this.all) || (this.boxes.push(o), this.all.push(o), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(o, !0), this.scrolled = !0)
                    }
            }
        }, {
            key: "show",
            value: function(t) {
                var e, i;
                return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), e = t, i = this.wowEvent, null != e.dispatchEvent ? e.dispatchEvent(i) : i in (null != e) ? e[i]() : "on" + i in (null != e) && e["on" + i](), o(t, "animationend", this.resetAnimation), o(t, "oanimationend", this.resetAnimation), o(t, "webkitAnimationEnd", this.resetAnimation), o(t, "MSAnimationEnd", this.resetAnimation), t
            }
        }, {
            key: "applyStyle",
            value: function(t, e) {
                var i = this,
                    s = t.getAttribute("data-wow-duration"),
                    o = t.getAttribute("data-wow-delay"),
                    n = t.getAttribute("data-wow-iteration");
                return this.animate(function() {
                    return i.customStyle(t, e, s, o, n)
                })
            }
        }, {
            key: "resetStyle",
            value: function() {
                for (var t = 0; t < this.boxes.length; t++) this.boxes[t].style.visibility = "visible"
            }
        }, {
            key: "resetAnimation",
            value: function(t) {
                if (0 <= t.type.toLowerCase().indexOf("animationend")) {
                    var e = t.target || t.srcElement;
                    e.className = e.className.replace(this.config.animateClass, "").trim()
                }
            }
        }, {
            key: "customStyle",
            value: function(t, e, i, s, o) {
                return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {
                    animationDuration: i
                }), s && this.vendorSet(t.style, {
                    animationDelay: s
                }), o && this.vendorSet(t.style, {
                    animationIterationCount: o
                }), this.vendorSet(t.style, {
                    animationName: e ? "none" : this.cachedAnimationName(t)
                }), t
            }
        }, {
            key: "vendorSet",
            value: function(t, e) {
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        var s = e[i];
                        t["" + i] = s;
                        for (var o = 0; o < this.vendors.length; o++) t["" + this.vendors[o] + i.charAt(0).toUpperCase() + i.substr(1)] = s
                    }
            }
        }, {
            key: "vendorCSS",
            value: function(t, e) {
                for (var i = p(t), s = i.getPropertyCSSValue(e), o = 0; o < this.vendors.length; o++) {
                    var n = this.vendors[o];
                    s = s || i.getPropertyCSSValue("-" + n + "-" + e)
                }
                return s
            }
        }, {
            key: "animationName",
            value: function(t) {
                var e = void 0;
                try {
                    e = this.vendorCSS(t, "animation-name").cssText
                } catch (i) {
                    e = p(t).getPropertyValue("animation-name")
                }
                return "none" === e ? "" : e
            }
        }, {
            key: "cacheAnimationName",
            value: function(t) {
                return this.animationNameCache.set(t, this.animationName(t))
            }
        }, {
            key: "cachedAnimationName",
            value: function(t) {
                return this.animationNameCache.get(t)
            }
        }, {
            key: "scrollHandler",
            value: function() {
                this.scrolled = !0
            }
        }, {
            key: "scrollCallback",
            value: function() {
                if (this.scrolled) {
                    this.scrolled = !1;
                    for (var t = [], e = 0; e < this.boxes.length; e++) {
                        var i = this.boxes[e];
                        if (i) {
                            if (this.isVisible(i)) {
                                this.show(i);
                                continue
                            }
                            t.push(i)
                        }
                    }
                    this.boxes = t, this.boxes.length || this.config.live || this.stop()
                }
            }
        }, {
            key: "offsetTop",
            value: function(t) {
                for (; void 0 === t.offsetTop;) t = t.parentNode;
                for (var e = t.offsetTop; t.offsetParent;) e += (t = t.offsetParent).offsetTop;
                return e
            }
        }, {
            key: "isVisible",
            value: function(t) {
                var e = t.getAttribute("data-wow-offset") || this.config.offset,
                    i = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset,
                    s = i + Math.min(this.element.clientHeight, "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight) - e,
                    o = this.offsetTop(t),
                    n = o + t.clientHeight;
                return o <= s && i <= n
            }
        }, {
            key: "disabled",
            value: function() {
                var t;
                return !this.config.mobile && (t = navigator.userAgent, /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t))
            }
        }]), h);

    function h() {
        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        i(this, h), this.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, this.animate = "requestAnimationFrame" in window ? function(t) {
            return window.requestAnimationFrame(t)
        } : function(t) {
            return t()
        }, this.vendors = ["moz", "webkit"], this.start = this.start.bind(this), this.resetAnimation = this.resetAnimation.bind(this), this.scrollHandler = this.scrollHandler.bind(this), this.scrollCallback = this.scrollCallback.bind(this), this.scrolled = !0, this.config = function(t, e) {
            for (var i in e)
                if (null == t[i]) {
                    var s = e[i];
                    t[i] = s
                }
            return t
        }(t, this.defaults), null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)), this.animationNameCache = new c, this.wowEvent = function(t) {
            var e = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
                i = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
                s = arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3],
                o = void 0;
            return null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(t, e, i, s) : null != document.createEventObject ? (o = document.createEventObject()).eventType = t : o.eventName = t, o
        }(this.config.boxClass)
    }

    function f() {
        i(this, f), "undefined" != typeof console && null !== console && (console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))
    }

    function g() {
        i(this, g), this.keys = [], this.values = []
    }

    function m(t, e) {
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
        }
    }
    e.default = u, t.exports = e.default
});