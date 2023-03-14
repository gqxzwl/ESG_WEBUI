if (typeof jQuery === "undefined") {
    throw new Error("Bootstrap's JavaScript requires jQuery")
}
+function (a) {
    var b = a.fn.jquery.split(" ")[0].split(".");
    if ((b[0] < 2 && b[1] < 9) || (b[0] == 1 && b[1] == 9 && b[2] < 1) || (b[0] > 3)) {
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
    }
}(jQuery);
+function (a) {
    function b() {
        var c = document.createElement("bootstrap");
        var e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var d in e) {
            if (c.style[d] !== undefined) {
                return {end: e[d]}
            }
        }
        return false
    }

    a.fn.emulateTransitionEnd = function (f) {
        var e = false;
        var c = this;
        a(this).one("bsTransitionEnd", function () {
            e = true
        });
        var d = function () {
            if (!e) {
                a(c).trigger(a.support.transition.end)
            }
        };
        setTimeout(d, f);
        return this
    };
    a(function () {
        a.support.transition = b();
        if (!a.support.transition) {
            return
        }
        a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (c) {
                if (a(c.target).is(this)) {
                    return c.handleObj.handler.apply(this, arguments)
                }
            }
        }
    })
}(jQuery);
+function (a) {
    var c = '[data-dismiss="alert"]';
    var b = function (f) {
        a(f).on("click", c, this.close)
    };
    b.VERSION = "3.3.7";
    b.TRANSITION_DURATION = 150;
    b.prototype.close = function (h) {
        var g = a(this);
        var j = g.attr("data-target");
        if (!j) {
            j = g.attr("href");
            j = j && j.replace(/.*(?=#[^\s]*$)/, "")
        }
        var f = a(j === "#" ? [] : j);
        if (h) {
            h.preventDefault()
        }
        if (!f.length) {
            f = g.closest(".alert")
        }
        f.trigger(h = a.Event("close.bs.alert"));
        if (h.isDefaultPrevented()) {
            return
        }
        f.removeClass("in");

        function i() {
            f.detach().trigger("closed.bs.alert").remove()
        }

        a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", i).emulateTransitionEnd(b.TRANSITION_DURATION) : i()
    };

    function e(f) {
        return this.each(function () {
            var g = a(this);
            var h = g.data("bs.alert");
            if (!h) {
                g.data("bs.alert", (h = new b(this)))
            }
            if (typeof f == "string") {
                h[f].call(g)
            }
        })
    }

    var d = a.fn.alert;
    a.fn.alert = e;
    a.fn.alert.Constructor = b;
    a.fn.alert.noConflict = function () {
        a.fn.alert = d;
        return this
    };
    a(document).on("click.bs.alert.data-api", c, b.prototype.close)
}(jQuery);
+function (a) {
    var b = function (e, f) {
        this.$element = a(e);
        this.options = a.extend({}, b.DEFAULTS, f);
        this.isLoading = false
    };
    b.VERSION = "3.3.7";
    b.DEFAULTS = {loadingText: "loading..."};
    b.prototype.setState = function (h) {
        var f = "disabled";
        var e = this.$element;
        var i = e.is("input") ? "val" : "html";
        var g = e.data();
        h += "Text";
        if (g.resetText == null) {
            e.data("resetText", e[i]())
        }
        setTimeout(a.proxy(function () {
            e[i](g[h] == null ? this.options[h] : g[h]);
            if (h == "loadingText") {
                this.isLoading = true;
                e.addClass(f).attr(f, f).prop(f, true)
            } else {
                if (this.isLoading) {
                    this.isLoading = false;
                    e.removeClass(f).removeAttr(f).prop(f, false)
                }
            }
        }, this), 0)
    };
    b.prototype.toggle = function () {
        var g = true;
        var f = this.$element.closest('[data-toggle="buttons"]');
        if (f.length) {
            var e = this.$element.find("input");
            if (e.prop("type") == "radio") {
                if (e.prop("checked")) {
                    g = false
                }
                f.find(".active").removeClass("active");
                this.$element.addClass("active")
            } else {
                if (e.prop("type") == "checkbox") {
                    if ((e.prop("checked")) !== this.$element.hasClass("active")) {
                        g = false
                    }
                    this.$element.toggleClass("active")
                }
            }
            e.prop("checked", this.$element.hasClass("active"));
            if (g) {
                e.trigger("change")
            }
        } else {
            this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            this.$element.toggleClass("active")
        }
    };

    function d(e) {
        return this.each(function () {
            var f = a(this);
            var g = f.data("bs.button");
            var h = typeof e == "object" && e;
            if (!g) {
                f.data("bs.button", (g = new b(this, h)))
            }
            if (e == "toggle") {
                g.toggle()
            } else {
                if (e) {
                    g.setState(e)
                }
            }
        })
    }

    var c = a.fn.button;
    a.fn.button = d;
    a.fn.button.Constructor = b;
    a.fn.button.noConflict = function () {
        a.fn.button = c;
        return this
    };
    a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (g) {
        var f = a(g.target).closest(".btn");
        d.call(f, "toggle");
        if (!(a(g.target).is('input[type="radio"], input[type="checkbox"]'))) {
            g.preventDefault();
            if (f.is("input,button")) {
                f.trigger("focus")
            } else {
                f.find("input:visible,button:visible").first().trigger("focus")
            }
        }
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (f) {
        a(f.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(f.type))
    })
}(jQuery);
+function (a) {
    var b = function (f, g) {
        this.$element = a(f);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = g;
        this.paused = null;
        this.sliding = null;
        this.interval = null;
        this.$active = null;
        this.$items = null;
        this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this));
        this.options.pause == "hover" && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    b.VERSION = "3.3.7";
    b.TRANSITION_DURATION = 600;
    b.DEFAULTS = {interval: 5000, pause: "hover", wrap: true, keyboard: true};
    b.prototype.keydown = function (f) {
        if (/input|textarea/i.test(f.target.tagName)) {
            return
        }
        switch (f.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        f.preventDefault()
    };
    b.prototype.cycle = function (f) {
        f || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval));
        return this
    };
    b.prototype.getItemIndex = function (f) {
        this.$items = f.parent().children(".item");
        return this.$items.index(f || this.$active)
    };
    b.prototype.getItemForDirection = function (i, f) {
        var g = this.getItemIndex(f);
        var k = (i == "prev" && g === 0) || (i == "next" && g == (this.$items.length - 1));
        if (k && !this.options.wrap) {
            return f
        }
        var h = i == "prev" ? -1 : 1;
        var j = (g + h) % this.$items.length;
        return this.$items.eq(j)
    };
    b.prototype.to = function (g) {
        var h = this;
        var f = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (g > (this.$items.length - 1) || g < 0) {
            return
        }
        if (this.sliding) {
            return this.$element.one("slid.bs.carousel", function () {
                h.to(g)
            })
        }
        if (f == g) {
            return this.pause().cycle()
        }
        return this.slide(g > f ? "next" : "prev", this.$items.eq(g))
    };
    b.prototype.pause = function (f) {
        f || (this.paused = true);
        if (this.$element.find(".next, .prev").length && a.support.transition) {
            this.$element.trigger(a.support.transition.end);
            this.cycle(true)
        }
        this.interval = clearInterval(this.interval);
        return this
    };
    b.prototype.next = function () {
        if (this.sliding) {
            return
        }
        return this.slide("next")
    };
    b.prototype.prev = function () {
        if (this.sliding) {
            return
        }
        return this.slide("prev")
    };
    b.prototype.slide = function (p, k) {
        var f = this.$element.find(".item.active");
        var g = k || this.getItemForDirection(p, f);
        var j = this.interval;
        var i = p == "next" ? "left" : "right";
        var o = this;
        if (g.hasClass("active")) {
            return (this.sliding = false)
        }
        var l = g[0];
        var m = a.Event("slide.bs.carousel", {relatedTarget: l, direction: i});
        this.$element.trigger(m);
        if (m.isDefaultPrevented()) {
            return
        }
        this.sliding = true;
        j && this.pause();
        if (this.$indicators.length) {
            this.$indicators.find(".active").removeClass("active");
            var h = a(this.$indicators.children()[this.getItemIndex(g)]);
            h && h.addClass("active")
        }
        var n = a.Event("slid.bs.carousel", {relatedTarget: l, direction: i});
        if (a.support.transition && this.$element.hasClass("slide")) {
            g.addClass(p);
            g[0].offsetWidth;
            f.addClass(i);
            g.addClass(i);
            f.one("bsTransitionEnd", function () {
                g.removeClass([p, i].join(" ")).addClass("active");
                f.removeClass(["active", i].join(" "));
                o.sliding = false;
                setTimeout(function () {
                    o.$element.trigger(n)
                }, 0)
            }).emulateTransitionEnd(b.TRANSITION_DURATION)
        } else {
            f.removeClass("active");
            g.addClass("active");
            this.sliding = false;
            this.$element.trigger(n)
        }
        j && this.cycle();
        return this
    };

    function e(f) {
        return this.each(function () {
            var g = a(this);
            var i = g.data("bs.carousel");
            var j = a.extend({}, b.DEFAULTS, g.data(), typeof f == "object" && f);
            var h = typeof f == "string" ? f : j.slide;
            if (!i) {
                g.data("bs.carousel", (i = new b(this, j)))
            }
            if (typeof f == "number") {
                i.to(f)
            } else {
                if (h) {
                    i[h]()
                } else {
                    if (j.interval) {
                        i.pause().cycle()
                    }
                }
            }
        })
    }

    var d = a.fn.carousel;
    a.fn.carousel = e;
    a.fn.carousel.Constructor = b;
    a.fn.carousel.noConflict = function () {
        a.fn.carousel = d;
        return this
    };
    var c = function (h) {
        var i;
        var g = a(this);
        var f = a(g.attr("data-target") || (i = g.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (!f.hasClass("carousel")) {
            return
        }
        var j = a.extend({}, f.data(), g.data());
        var k = g.attr("data-slide-to");
        if (k) {
            j.interval = false
        }
        e.call(f, j);
        if (k) {
            f.data("bs.carousel").to(k)
        }
        h.preventDefault()
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", c).on("click.bs.carousel.data-api", "[data-slide-to]", c);
    a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var f = a(this);
            e.call(f, f.data())
        })
    })
}(jQuery);
+function (a) {
    var b = function (f, g) {
        this.$element = a(f);
        this.options = a.extend({}, b.DEFAULTS, g);
        this.$trigger = a('[data-toggle="collapse"][href="#' + f.id + '"],[data-toggle="collapse"][data-target="#' + f.id + '"]');
        this.transitioning = null;
        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }
        if (this.options.toggle) {
            this.toggle()
        }
    };
    b.VERSION = "3.3.7";
    b.TRANSITION_DURATION = 350;
    b.DEFAULTS = {toggle: true};
    b.prototype.dimension = function () {
        var f = this.$element.hasClass("width");
        return f ? "width" : "height"
    };
    b.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass("in")) {
            return
        }
        var g;
        var f = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
        if (f && f.length) {
            g = f.data("bs.collapse");
            if (g && g.transitioning) {
                return
            }
        }
        var k = a.Event("show.bs.collapse");
        this.$element.trigger(k);
        if (k.isDefaultPrevented()) {
            return
        }
        if (f && f.length) {
            e.call(f, "hide");
            g || f.data("bs.collapse", null)
        }
        var i = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[i](0).attr("aria-expanded", true);
        this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
        this.transitioning = 1;
        var h = function () {
            this.$element.removeClass("collapsing").addClass("collapse in")[i]("");
            this.transitioning = 0;
            this.$element.trigger("shown.bs.collapse")
        };
        if (!a.support.transition) {
            return h.call(this)
        }
        var j = a.camelCase(["scroll", i].join("-"));
        this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(b.TRANSITION_DURATION)[i](this.$element[0][j])
    };
    b.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass("in")) {
            return
        }
        var h = a.Event("hide.bs.collapse");
        this.$element.trigger(h);
        if (h.isDefaultPrevented()) {
            return
        }
        var g = this.dimension();
        this.$element[g](this.$element[g]())[0].offsetHeight;
        this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
        this.$trigger.addClass("collapsed").attr("aria-expanded", false);
        this.transitioning = 1;
        var f = function () {
            this.transitioning = 0;
            this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        };
        if (!a.support.transition) {
            return f.call(this)
        }
        this.$element[g](0).one("bsTransitionEnd", a.proxy(f, this)).emulateTransitionEnd(b.TRANSITION_DURATION)
    };
    b.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    b.prototype.getParent = function () {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (h, g) {
            var f = a(g);
            this.addAriaAndCollapsedClass(c(f), f)
        }, this)).end()
    };
    b.prototype.addAriaAndCollapsedClass = function (f, g) {
        var h = f.hasClass("in");
        f.attr("aria-expanded", h);
        g.toggleClass("collapsed", !h).attr("aria-expanded", h)
    };

    function c(f) {
        var g;
        var h = f.attr("data-target") || (g = f.attr("href")) && g.replace(/.*(?=#[^\s]+$)/, "");
        return a(h)
    }

    function e(f) {
        return this.each(function () {
            var g = a(this);
            var h = g.data("bs.collapse");
            var i = a.extend({}, b.DEFAULTS, g.data(), typeof f == "object" && f);
            if (!h && i.toggle && /show|hide/.test(f)) {
                i.toggle = false
            }
            if (!h) {
                g.data("bs.collapse", (h = new b(this, i)))
            }
            if (typeof f == "string") {
                h[f]()
            }
        })
    }

    var d = a.fn.collapse;
    a.fn.collapse = e;
    a.fn.collapse.Constructor = b;
    a.fn.collapse.noConflict = function () {
        a.fn.collapse = d;
        return this
    };
    a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (i) {
        var g = a(this);
        if (!g.attr("data-target")) {
            i.preventDefault()
        }
        var f = c(g);
        var h = f.data("bs.collapse");
        var j = h ? "toggle" : g.data();
        e.call(f, j)
    })
}(jQuery);
+function (a) {
    var b = ".dropdown-backdrop";
    var h = '[data-toggle="dropdown"]';
    var d = function (i) {
        a(i).on("click.bs.dropdown", this.toggle)
    };
    d.VERSION = "3.3.7";

    function e(j) {
        var k = j.attr("data-target");
        if (!k) {
            k = j.attr("href");
            k = k && /#[A-Za-z]/.test(k) && k.replace(/.*(?=#[^\s]*$)/, "")
        }
        var i = k && a(k);
        return i && i.length ? i : j.parent()
    }

    function c(i) {
        if (i && i.which === 3) {
            return
        }
        a(b).remove();
        a(h).each(function () {
            var k = a(this);
            var j = e(k);
            var l = {relatedTarget: this};
            if (!j.hasClass("open")) {
                return
            }
            if (i && i.type == "click" && /input|textarea/i.test(i.target.tagName) && a.contains(j[0], i.target)) {
                return
            }
            j.trigger(i = a.Event("hide.bs.dropdown", l));
            if (i.isDefaultPrevented()) {
                return
            }
            k.attr("aria-expanded", "false");
            j.removeClass("open").trigger(a.Event("hidden.bs.dropdown", l))
        })
    }

    d.prototype.toggle = function (k) {
        var j = a(this);
        if (j.is(".disabled, :disabled")) {
            return
        }
        var i = e(j);
        var l = i.hasClass("open");
        c();
        if (!l) {
            if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length) {
                a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c)
            }
            var m = {relatedTarget: this};
            i.trigger(k = a.Event("show.bs.dropdown", m));
            if (k.isDefaultPrevented()) {
                return
            }
            j.trigger("focus").attr("aria-expanded", "true");
            i.toggleClass("open").trigger(a.Event("shown.bs.dropdown", m))
        }
        return false
    };
    d.prototype.keydown = function (m) {
        if (!/(38|40|27|32)/.test(m.which) || /input|textarea/i.test(m.target.tagName)) {
            return
        }
        var k = a(this);
        m.preventDefault();
        m.stopPropagation();
        if (k.is(".disabled, :disabled")) {
            return
        }
        var j = e(k);
        var o = j.hasClass("open");
        if (!o && m.which != 27 || o && m.which == 27) {
            if (m.which == 27) {
                j.find(h).trigger("focus")
            }
            return k.trigger("click")
        }
        var l = " li:not(.disabled):visible a";
        var i = j.find(".dropdown-menu" + l);
        if (!i.length) {
            return
        }
        var n = i.index(m.target);
        if (m.which == 38 && n > 0) {
            n--
        }
        if (m.which == 40 && n < i.length - 1) {
            n++
        }
        if (!~n) {
            n = 0
        }
        i.eq(n).trigger("focus")
    };

    function g(i) {
        return this.each(function () {
            var j = a(this);
            var k = j.data("bs.dropdown");
            if (!k) {
                j.data("bs.dropdown", (k = new d(this)))
            }
            if (typeof i == "string") {
                k[i].call(j)
            }
        })
    }

    var f = a.fn.dropdown;
    a.fn.dropdown = g;
    a.fn.dropdown.Constructor = d;
    a.fn.dropdown.noConflict = function () {
        a.fn.dropdown = f;
        return this
    };
    a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (i) {
        i.stopPropagation()
    }).on("click.bs.dropdown.data-api", h, d.prototype.toggle).on("keydown.bs.dropdown.data-api", h, d.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", d.prototype.keydown)
}(jQuery);
+function (a) {
    var b = function (e, f) {
        this.options = f;
        this.$body = a(document.body);
        this.$element = a(e);
        this.$dialog = this.$element.find(".modal-dialog");
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if (this.options.remote) {
            this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        }
    };
    b.VERSION = "3.3.7";
    b.TRANSITION_DURATION = 300;
    b.BACKDROP_TRANSITION_DURATION = 150;
    b.DEFAULTS = {backdrop: true, keyboard: true, show: true};
    b.prototype.toggle = function (e) {
        return this.isShown ? this.hide() : this.show(e)
    };
    b.prototype.show = function (f) {
        var h = this;
        var g = a.Event("show.bs.modal", {relatedTarget: f});
        this.$element.trigger(g);
        if (this.isShown || g.isDefaultPrevented()) {
            return
        }
        this.isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass("modal-open");
        this.escape();
        this.resize();
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this));
        this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            h.$element.one("mouseup.dismiss.bs.modal", function (i) {
                if (a(i.target).is(h.$element)) {
                    h.ignoreBackdropClick = true
                }
            })
        });
        this.backdrop(function () {
            var j = a.support.transition && h.$element.hasClass("fade");
            if (!h.$element.parent().length) {
                h.$element.appendTo(h.$body)
            }
            h.$element.show().scrollTop(0);
            h.adjustDialog();
            if (j) {
                h.$element[0].offsetWidth
            }
            h.$element.addClass("in");
            h.enforceFocus();
            var i = a.Event("shown.bs.modal", {relatedTarget: f});
            j ? h.$dialog.one("bsTransitionEnd", function () {
                h.$element.trigger("focus").trigger(i)
            }).emulateTransitionEnd(b.TRANSITION_DURATION) : h.$element.trigger("focus").trigger(i)
        })
    };
    b.prototype.hide = function (f) {
        if (f) {
            f.preventDefault()
        }
        f = a.Event("hide.bs.modal");
        this.$element.trigger(f);
        if (!this.isShown || f.isDefaultPrevented()) {
            return
        }
        this.isShown = false;
        this.escape();
        this.resize();
        a(document).off("focusin.bs.modal");
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
        this.$dialog.off("mousedown.dismiss.bs.modal");
        a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(b.TRANSITION_DURATION) : this.hideModal()
    };
    b.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (f) {
            if (document !== f.target && this.$element[0] !== f.target && !this.$element.has(f.target).length) {
                this.$element.trigger("focus")
            }
        }, this))
    };
    b.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (f) {
                f.which == 27 && this.hide()
            }, this))
        } else {
            if (!this.isShown) {
                this.$element.off("keydown.dismiss.bs.modal")
            }
        }
    };
    b.prototype.resize = function () {
        if (this.isShown) {
            a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this))
        } else {
            a(window).off("resize.bs.modal")
        }
    };
    b.prototype.hideModal = function () {
        var e = this;
        this.$element.hide();
        this.backdrop(function () {
            e.$body.removeClass("modal-open");
            e.resetAdjustments();
            e.resetScrollbar();
            e.$element.trigger("hidden.bs.modal")
        })
    };
    b.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    b.prototype.backdrop = function (f) {
        var i = this;
        var e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var h = a.support.transition && e;
            this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", a.proxy(function (j) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return
                }
                if (j.target !== j.currentTarget) {
                    return
                }
                this.options.backdrop == "static" ? this.$element[0].focus() : this.hide()
            }, this));
            if (h) {
                this.$backdrop[0].offsetWidth
            }
            this.$backdrop.addClass("in");
            if (!f) {
                return
            }
            h ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(b.BACKDROP_TRANSITION_DURATION) : f()
        } else {
            if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var g = function () {
                    i.removeBackdrop();
                    f && f()
                };
                a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(b.BACKDROP_TRANSITION_DURATION) : g()
            } else {
                if (f) {
                    f()
                }
            }
        }
    };
    b.prototype.handleUpdate = function () {
        this.adjustDialog()
    };
    b.prototype.adjustDialog = function () {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
        })
    };
    b.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    };
    b.prototype.checkScrollbar = function () {
        var f = window.innerWidth;
        if (!f) {
            var e = document.documentElement.getBoundingClientRect();
            f = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < f;
        this.scrollbarWidth = this.measureScrollbar()
    };
    b.prototype.setScrollbar = function () {
        var e = parseInt((this.$body.css("padding-right") || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        if (this.bodyIsOverflowing) {
            this.$body.css("padding-right", e + this.scrollbarWidth)
        }
    };
    b.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    };
    b.prototype.measureScrollbar = function () {
        var f = document.createElement("div");
        f.className = "modal-scrollbar-measure";
        this.$body.append(f);
        var e = f.offsetWidth - f.clientWidth;
        this.$body[0].removeChild(f);
        return e
    };

    function d(f, e) {
        return this.each(function () {
            var g = a(this);
            var h = g.data("bs.modal");
            var i = a.extend({}, b.DEFAULTS, g.data(), typeof f == "object" && f);
            if (!h) {
                g.data("bs.modal", (h = new b(this, i)))
            }
            if (typeof f == "string") {
                h[f](e)
            } else {
                if (i.show) {
                    h.show(e)
                }
            }
        })
    }

    var c = a.fn.modal;
    a.fn.modal = d;
    a.fn.modal.Constructor = b;
    a.fn.modal.noConflict = function () {
        a.fn.modal = c;
        return this
    };
    a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (h) {
        var g = a(this);
        var i = g.attr("href");
        var f = a(g.attr("data-target") || (i && i.replace(/.*(?=#[^\s]+$)/, "")));
        var j = f.data("bs.modal") ? "toggle" : a.extend({remote: !/#/.test(i) && i}, f.data(), g.data());
        if (g.is("a")) {
            h.preventDefault()
        }
        f.one("show.bs.modal", function (e) {
            if (e.isDefaultPrevented()) {
                return
            }
            f.one("hidden.bs.modal", function () {
                g.is(":visible") && g.trigger("focus")
            })
        });
        d.call(f, j, this)
    })
}(jQuery);
+function (a) {
    var d = function (e, f) {
        this.type = null;
        this.options = null;
        this.enabled = null;
        this.timeout = null;
        this.hoverState = null;
        this.$element = null;
        this.inState = null;
        this.init("tooltip", e, f)
    };
    d.VERSION = "3.3.7";
    d.TRANSITION_DURATION = 150;
    d.DEFAULTS = {
        animation: true,
        placement: "top",
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: false,
        container: false,
        viewport: {selector: "body", padding: 0}
    };
    d.prototype.init = function (m, e, j) {
        this.enabled = true;
        this.type = m;
        this.$element = a(e);
        this.options = this.getOptions(j);
        this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport));
        this.inState = {click: false, hover: false, focus: false};
        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!")
        }
        var l = this.options.trigger.split(" ");
        for (var h = l.length; h--;) {
            var k = l[h];
            if (k == "click") {
                this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this))
            } else {
                if (k != "manual") {
                    var f = k == "hover" ? "mouseenter" : "focusin";
                    var g = k == "hover" ? "mouseleave" : "focusout";
                    this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.enter, this));
                    this.$element.on(g + "." + this.type, this.options.selector, a.proxy(this.leave, this))
                }
            }
        }
        this.options.selector ? (this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        })) : this.fixTitle()
    };
    d.prototype.getDefaults = function () {
        return d.DEFAULTS
    };
    d.prototype.getOptions = function (e) {
        e = a.extend({}, this.getDefaults(), this.$element.data(), e);
        if (e.delay && typeof e.delay == "number") {
            e.delay = {show: e.delay, hide: e.delay}
        }
        return e
    };
    d.prototype.getDelegateOptions = function () {
        var f = {};
        var e = this.getDefaults();
        this._options && a.each(this._options, function (g, h) {
            if (e[g] != h) {
                f[g] = h
            }
        });
        return f
    };
    d.prototype.enter = function (e) {
        var f = e instanceof this.constructor ? e : a(e.currentTarget).data("bs." + this.type);
        if (!f) {
            f = new this.constructor(e.currentTarget, this.getDelegateOptions());
            a(e.currentTarget).data("bs." + this.type, f)
        }
        if (e instanceof a.Event) {
            f.inState[e.type == "focusin" ? "focus" : "hover"] = true
        }
        if (f.tip().hasClass("in") || f.hoverState == "in") {
            f.hoverState = "in";
            return
        }
        clearTimeout(f.timeout);
        f.hoverState = "in";
        if (!f.options.delay || !f.options.delay.show) {
            return f.show()
        }
        f.timeout = setTimeout(function () {
            if (f.hoverState == "in") {
                f.show()
            }
        }, f.options.delay.show)
    };
    d.prototype.isInStateTrue = function () {
        for (var e in this.inState) {
            if (this.inState[e]) {
                return true
            }
        }
        return false
    };
    d.prototype.leave = function (e) {
        var f = e instanceof this.constructor ? e : a(e.currentTarget).data("bs." + this.type);
        if (!f) {
            f = new this.constructor(e.currentTarget, this.getDelegateOptions());
            a(e.currentTarget).data("bs." + this.type, f)
        }
        if (e instanceof a.Event) {
            f.inState[e.type == "focusout" ? "focus" : "hover"] = false
        }
        if (f.isInStateTrue()) {
            return
        }
        clearTimeout(f.timeout);
        f.hoverState = "out";
        if (!f.options.delay || !f.options.delay.hide) {
            return f.hide()
        }
        f.timeout = setTimeout(function () {
            if (f.hoverState == "out") {
                f.hide()
            }
        }, f.options.delay.hide)
    };
    d.prototype.show = function () {
        var m = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(m);
            var n = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (m.isDefaultPrevented() || !n) {
                return
            }
            var r = this;
            var f = this.tip();
            var s = this.getUID(this.type);
            this.setContent();
            f.attr("id", s);
            this.$element.attr("aria-describedby", s);
            if (this.options.animation) {
                f.addClass("fade")
            }
            var p = typeof this.options.placement == "function" ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement;
            var j = /\s?auto?\s?/i;
            var i = j.test(p);
            if (i) {
                p = p.replace(j, "") || "top"
            }
            f.detach().css({top: 0, left: 0, display: "block"}).addClass(p).data("bs." + this.type, this);
            this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
            this.$element.trigger("inserted.bs." + this.type);
            var q = this.getPosition();
            var h = f[0].offsetWidth;
            var g = f[0].offsetHeight;
            if (i) {
                var o = p;
                var t = this.getPosition(this.$viewport);
                p = p == "bottom" && q.bottom + g > t.bottom ? "top" : p == "top" && q.top - g < t.top ? "bottom" : p == "right" && q.right + h > t.width ? "left" : p == "left" && q.left - h < t.left ? "right" : p;
                f.removeClass(o).addClass(p)
            }
            var k = this.getCalculatedOffset(p, q, h, g);
            this.applyPlacement(k, p);
            var l = function () {
                var e = r.hoverState;
                r.$element.trigger("shown.bs." + r.type);
                r.hoverState = null;
                if (e == "out") {
                    r.leave(r)
                }
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", l).emulateTransitionEnd(d.TRANSITION_DURATION) : l()
        }
    };
    d.prototype.applyPlacement = function (o, p) {
        var e = this.tip();
        var q = e[0].offsetWidth;
        var k = e[0].offsetHeight;
        var n = parseInt(e.css("margin-top"), 10);
        var m = parseInt(e.css("margin-left"), 10);
        if (isNaN(n)) {
            n = 0
        }
        if (isNaN(m)) {
            m = 0
        }
        o.top += n;
        o.left += m;
        a.offset.setOffset(e[0], a.extend({
            using: function (r) {
                e.css({top: Math.round(r.top), left: Math.round(r.left)})
            }
        }, o), 0);
        e.addClass("in");
        var g = e[0].offsetWidth;
        var f = e[0].offsetHeight;
        if (p == "top" && f != k) {
            o.top = o.top + k - f
        }
        var j = this.getViewportAdjustedDelta(p, o, g, f);
        if (j.left) {
            o.left += j.left
        } else {
            o.top += j.top
        }
        var l = /top|bottom/.test(p);
        var h = l ? j.left * 2 - q + g : j.top * 2 - k + f;
        var i = l ? "offsetWidth" : "offsetHeight";
        e.offset(o);
        this.replaceArrow(h, e[0][i], l)
    };
    d.prototype.replaceArrow = function (e, f, g) {
        this.arrow().css(g ? "left" : "top", 50 * (1 - e / f) + "%").css(g ? "top" : "left", "")
    };
    d.prototype.setContent = function () {
        var e = this.tip();
        var f = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](f);
        e.removeClass("fade in top bottom left right")
    };
    d.prototype.hide = function (g) {
        var j = this;
        var f = a(this.$tip);
        var i = a.Event("hide.bs." + this.type);

        function h() {
            if (j.hoverState != "in") {
                f.detach()
            }
            if (j.$element) {
                j.$element.removeAttr("aria-describedby").trigger("hidden.bs." + j.type)
            }
            g && g()
        }

        this.$element.trigger(i);
        if (i.isDefaultPrevented()) {
            return
        }
        f.removeClass("in");
        a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", h).emulateTransitionEnd(d.TRANSITION_DURATION) : h();
        this.hoverState = null;
        return this
    };
    d.prototype.fixTitle = function () {
        var e = this.$element;
        if (e.attr("title") || typeof e.attr("data-original-title") != "string") {
            e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        }
    };
    d.prototype.hasContent = function () {
        return this.getTitle()
    };
    d.prototype.getPosition = function (e) {
        e = e || this.$element;
        var f = e[0];
        var i = f.tagName == "BODY";
        var h = f.getBoundingClientRect();
        if (h.width == null) {
            h = a.extend({}, h, {width: h.right - h.left, height: h.bottom - h.top})
        }
        var j = window.SVGElement && f instanceof window.SVGElement;
        var g = i ? {top: 0, left: 0} : (j ? null : e.offset());
        var l = {scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()};
        var k = i ? {width: a(window).width(), height: a(window).height()} : null;
        return a.extend({}, h, l, k, g)
    };
    d.prototype.getCalculatedOffset = function (g, h, f, e) {
        return g == "bottom" ? {
            top: h.top + h.height,
            left: h.left + h.width / 2 - f / 2
        } : g == "top" ? {
            top: h.top - e,
            left: h.left + h.width / 2 - f / 2
        } : g == "left" ? {top: h.top + h.height / 2 - e / 2, left: h.left - f} : {
            top: h.top + h.height / 2 - e / 2,
            left: h.left + h.width
        }
    };
    d.prototype.getViewportAdjustedDelta = function (j, k, f, e) {
        var h = {top: 0, left: 0};
        if (!this.$viewport) {
            return h
        }
        var o = this.options.viewport && this.options.viewport.padding || 0;
        var n = this.getPosition(this.$viewport);
        if (/right|left/.test(j)) {
            var m = k.top - o - n.scroll;
            var g = k.top + o - n.scroll + e;
            if (m < n.top) {
                h.top = n.top - m
            } else {
                if (g > n.top + n.height) {
                    h.top = n.top + n.height - g
                }
            }
        } else {
            var i = k.left - o;
            var l = k.left + o + f;
            if (i < n.left) {
                h.left = n.left - i
            } else {
                if (l > n.right) {
                    h.left = n.left + n.width - l
                }
            }
        }
        return h
    };
    d.prototype.getTitle = function () {
        var g;
        var e = this.$element;
        var f = this.options;
        g = e.attr("data-original-title") || (typeof f.title == "function" ? f.title.call(e[0]) : f.title);
        return g
    };
    d.prototype.getUID = function (e) {
        do {
            e += ~~(Math.random() * 1000000)
        } while (document.getElementById(e));
        return e
    };
    d.prototype.tip = function () {
        if (!this.$tip) {
            this.$tip = a(this.options.template);
            if (this.$tip.length != 1) {
                throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!")
            }
        }
        return this.$tip
    };
    d.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"))
    };
    d.prototype.enable = function () {
        this.enabled = true
    };
    d.prototype.disable = function () {
        this.enabled = false
    };
    d.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    };
    d.prototype.toggle = function (f) {
        var g = this;
        if (f) {
            g = a(f.currentTarget).data("bs." + this.type);
            if (!g) {
                g = new this.constructor(f.currentTarget, this.getDelegateOptions());
                a(f.currentTarget).data("bs." + this.type, g)
            }
        }
        if (f) {
            g.inState.click = !g.inState.click;
            if (g.isInStateTrue()) {
                g.enter(g)
            } else {
                g.leave(g)
            }
        } else {
            g.tip().hasClass("in") ? g.leave(g) : g.enter(g)
        }
    };
    d.prototype.destroy = function () {
        var e = this;
        clearTimeout(this.timeout);
        this.hide(function () {
            e.$element.off("." + e.type).removeData("bs." + e.type);
            if (e.$tip) {
                e.$tip.detach()
            }
            e.$tip = null;
            e.$arrow = null;
            e.$viewport = null;
            e.$element = null
        })
    };

    function c(e) {
        return this.each(function () {
            var f = a(this);
            var g = f.data("bs.tooltip");
            var h = typeof e == "object" && e;
            if (!g && /destroy|hide/.test(e)) {
                return
            }
            if (!g) {
                f.data("bs.tooltip", (g = new d(this, h)))
            }
            if (typeof e == "string") {
                g[e]()
            }
        })
    }

    var b = a.fn.tooltip;
    a.fn.tooltip = c;
    a.fn.tooltip.Constructor = d;
    a.fn.tooltip.noConflict = function () {
        a.fn.tooltip = b;
        return this
    }
}(jQuery);
+function (a) {
    var d = function (e, f) {
        this.init("popover", e, f)
    };
    if (!a.fn.tooltip) {
        throw new Error("Popover requires tooltip.js")
    }
    d.VERSION = "3.3.7";
    d.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    d.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype);
    d.prototype.constructor = d;
    d.prototype.getDefaults = function () {
        return d.DEFAULTS
    };
    d.prototype.setContent = function () {
        var e = this.tip();
        var g = this.getTitle();
        var f = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](g);
        e.find(".popover-content").children().detach().end()[this.options.html ? (typeof f == "string" ? "html" : "append") : "text"](f);
        e.removeClass("fade top bottom left right in");
        if (!e.find(".popover-title").html()) {
            e.find(".popover-title").hide()
        }
    };
    d.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    d.prototype.getContent = function () {
        var e = this.$element;
        var f = this.options;
        return e.attr("data-content") || (typeof f.content == "function" ? f.content.call(e[0]) : f.content)
    };
    d.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"))
    };

    function c(e) {
        return this.each(function () {
            var f = a(this);
            var g = f.data("bs.popover");
            var h = typeof e == "object" && e;
            if (!g && /destroy|hide/.test(e)) {
                return
            }
            if (!g) {
                f.data("bs.popover", (g = new d(this, h)))
            }
            if (typeof e == "string") {
                g[e]()
            }
        })
    }

    var b = a.fn.popover;
    a.fn.popover = c;
    a.fn.popover.Constructor = d;
    a.fn.popover.noConflict = function () {
        a.fn.popover = b;
        return this
    }
}(jQuery);
+function (a) {
    function d(e, f) {
        this.$body = a(document.body);
        this.$scrollElement = a(e).is(document.body) ? a(window) : a(e);
        this.options = a.extend({}, d.DEFAULTS, f);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this));
        this.refresh();
        this.process()
    }

    d.VERSION = "3.3.7";
    d.DEFAULTS = {offset: 10};
    d.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    d.prototype.refresh = function () {
        var g = this;
        var f = "offset";
        var e = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        if (!a.isWindow(this.$scrollElement[0])) {
            f = "position";
            e = this.$scrollElement.scrollTop()
        }
        this.$body.find(this.selector).map(function () {
            var h = a(this);
            var j = h.data("target") || h.attr("href");
            var i = /^#./.test(j) && a(j);
            return (i && i.length && i.is(":visible") && [[i[f]().top + e, j]]) || null
        }).sort(function (h, i) {
            return h[0] - i[0]
        }).each(function () {
            g.offsets.push(this[0]);
            g.targets.push(this[1])
        })
    };
    d.prototype.process = function () {
        var k = this.$scrollElement.scrollTop() + this.options.offset;
        var j = this.getScrollHeight();
        var g = this.options.offset + j - this.$scrollElement.height();
        var h = this.offsets;
        var l = this.targets;
        var e = this.activeTarget;
        var f;
        if (this.scrollHeight != j) {
            this.refresh()
        }
        if (k >= g) {
            return e != (f = l[l.length - 1]) && this.activate(f)
        }
        if (e && k < h[0]) {
            this.activeTarget = null;
            return this.clear()
        }
        for (f = h.length; f--;) {
            e != l[f] && k >= h[f] && (h[f + 1] === undefined || k < h[f + 1]) && this.activate(l[f])
        }
    };
    d.prototype.activate = function (g) {
        this.activeTarget = g;
        this.clear();
        var f = this.selector + '[data-target="' + g + '"],' + this.selector + '[href="' + g + '"]';
        var e = a(f).parents("li").addClass("active");
        if (e.parent(".dropdown-menu").length) {
            e = e.closest("li.dropdown").addClass("active")
        }
        e.trigger("activate.bs.scrollspy")
    };
    d.prototype.clear = function () {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };

    function c(e) {
        return this.each(function () {
            var f = a(this);
            var g = f.data("bs.scrollspy");
            var h = typeof e == "object" && e;
            if (!g) {
                f.data("bs.scrollspy", (g = new d(this, h)))
            }
            if (typeof e == "string") {
                g[e]()
            }
        })
    }

    var b = a.fn.scrollspy;
    a.fn.scrollspy = c;
    a.fn.scrollspy.Constructor = d;
    a.fn.scrollspy.noConflict = function () {
        a.fn.scrollspy = b;
        return this
    };
    a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var e = a(this);
            c.call(e, e.data())
        })
    })
}(jQuery);
+function (a) {
    var e = function (f) {
        this.element = a(f)
    };
    e.VERSION = "3.3.7";
    e.TRANSITION_DURATION = 150;
    e.prototype.show = function () {
        var h = this.element;
        var i = h.closest("ul:not(.dropdown-menu)");
        var k = h.data("target");
        if (!k) {
            k = h.attr("href");
            k = k && k.replace(/.*(?=#[^\s]*$)/, "")
        }
        if (h.parent("li").hasClass("active")) {
            return
        }
        var f = i.find(".active:last a");
        var j = a.Event("hide.bs.tab", {relatedTarget: h[0]});
        var l = a.Event("show.bs.tab", {relatedTarget: f[0]});
        f.trigger(j);
        h.trigger(l);
        if (l.isDefaultPrevented() || j.isDefaultPrevented()) {
            return
        }
        var g = a(k);
        this.activate(h.closest("li"), i);
        this.activate(g, g.parent(), function () {
            f.trigger({type: "hidden.bs.tab", relatedTarget: h[0]});
            h.trigger({type: "shown.bs.tab", relatedTarget: f[0]})
        })
    };
    e.prototype.activate = function (i, h, g) {
        var f = h.find("> .active");
        var k = g && a.support.transition && (f.length && f.hasClass("fade") || !!h.find("> .fade").length);

        function j() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
            if (k) {
                i[0].offsetWidth;
                i.addClass("in")
            } else {
                i.removeClass("fade")
            }
            if (i.parent(".dropdown-menu").length) {
                i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true)
            }
            g && g()
        }

        f.length && k ? f.one("bsTransitionEnd", j).emulateTransitionEnd(e.TRANSITION_DURATION) : j();
        f.removeClass("in")
    };

    function d(f) {
        return this.each(function () {
            var g = a(this);
            var h = g.data("bs.tab");
            if (!h) {
                g.data("bs.tab", (h = new e(this)))
            }
            if (typeof f == "string") {
                h[f]()
            }
        })
    }

    var c = a.fn.tab;
    a.fn.tab = d;
    a.fn.tab.Constructor = e;
    a.fn.tab.noConflict = function () {
        a.fn.tab = c;
        return this
    };
    var b = function (f) {
        f.preventDefault();
        d.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', b).on("click.bs.tab.data-api", '[data-toggle="pill"]', b)
}(jQuery);
+function (a) {
    var b = function (e, f) {
        this.options = a.extend({}, b.DEFAULTS, f);
        this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this));
        this.$element = a(e);
        this.affixed = null;
        this.unpin = null;
        this.pinnedOffset = null;
        this.checkPosition()
    };
    b.VERSION = "3.3.7";
    b.RESET = "affix affix-top affix-bottom";
    b.DEFAULTS = {offset: 0, target: window};
    b.prototype.getState = function (l, g, j, i) {
        var m = this.$target.scrollTop();
        var k = this.$element.offset();
        var n = this.$target.height();
        if (j != null && this.affixed == "top") {
            return m < j ? "top" : false
        }
        if (this.affixed == "bottom") {
            if (j != null) {
                return (m + this.unpin <= k.top) ? false : "bottom"
            }
            return (m + n <= l - i) ? false : "bottom"
        }
        var h = this.affixed == null;
        var f = h ? m : k.top;
        var e = h ? n : g;
        if (j != null && m <= j) {
            return "top"
        }
        if (i != null && (f + e >= l - i)) {
            return "bottom"
        }
        return false
    };
    b.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) {
            return this.pinnedOffset
        }
        this.$element.removeClass(b.RESET).addClass("affix");
        var f = this.$target.scrollTop();
        var e = this.$element.offset();
        return (this.pinnedOffset = e.top - f)
    };
    b.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    };
    b.prototype.checkPosition = function () {
        if (!this.$element.is(":visible")) {
            return
        }
        var i = this.$element.height();
        var j = this.options.offset;
        var l = j.top;
        var k = j.bottom;
        var m = Math.max(a(document).height(), a(document.body).height());
        if (typeof j != "object") {
            k = l = j
        }
        if (typeof l == "function") {
            l = j.top(this.$element)
        }
        if (typeof k == "function") {
            k = j.bottom(this.$element)
        }
        var f = this.getState(m, i, l, k);
        if (this.affixed != f) {
            if (this.unpin != null) {
                this.$element.css("top", "")
            }
            var g = "affix" + (f ? "-" + f : "");
            var h = a.Event(g + ".bs.affix");
            this.$element.trigger(h);
            if (h.isDefaultPrevented()) {
                return
            }
            this.affixed = f;
            this.unpin = f == "bottom" ? this.getPinnedOffset() : null;
            this.$element.removeClass(b.RESET).addClass(g).trigger(g.replace("affix", "affixed") + ".bs.affix")
        }
        if (f == "bottom") {
            this.$element.offset({top: m - i - k})
        }
    };

    function d(e) {
        return this.each(function () {
            var f = a(this);
            var g = f.data("bs.affix");
            var h = typeof e == "object" && e;
            if (!g) {
                f.data("bs.affix", (g = new b(this, h)))
            }
            if (typeof e == "string") {
                g[e]()
            }
        })
    }

    var c = a.fn.affix;
    a.fn.affix = d;
    a.fn.affix.Constructor = b;
    a.fn.affix.noConflict = function () {
        a.fn.affix = c;
        return this
    };
    a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var e = a(this);
            var f = e.data();
            f.offset = f.offset || {};
            if (f.offsetBottom != null) {
                f.offset.bottom = f.offsetBottom
            }
            if (f.offsetTop != null) {
                f.offset.top = f.offsetTop
            }
            d.call(e, f)
        })
    })
}(jQuery);
