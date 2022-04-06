$(document).ready(function () {
    function menus() {
        $(".toggle__menu").on("click", function () {
            $(".menu__container").toggleClass("active");
            $("body").toggleClass("active-modal");
            let menusClass = $(".menu__addon");
            $(".menu__container").on("click", function (e) {
                if (
                    !menusClass.is(e.target) &&
                    menusClass.has(e.target).length === 0
                ) {
                    $(".menu__container").removeClass("active");
                    $("body").removeClass("active-modal");
                }
            });
        });
        appButton = () => {
            let has = $('.menu__addon li:has("ul")');
            return has
                ? has.append(
                      '<button class="btn btn__toggle w-6 h-6 z-10 text-white rounded bg-black absolute right-3 top-[10px] hidden"><span>+</span></button>'
                  )
                : "";
        };
        appButton();
        onMenu = () => {
            let button = $(".btn__toggle");

            button.on("click", function () {
                let __ = $(this).parent("li").children("ul");
                __.slideToggle();

                $(this).toggleClass("active");
            });
        };
        onMenu();
    }
    menus();
    function like() {
        $(".like").on("click", function () {
            $(this).toggleClass("active");
        });
    }
    like();

    function sidebar() {
        $(".sidebar__header").on("click", function () {
            $(this).parent(".sidebar__box").toggleClass("active");
        });
    }
    sidebar();

    function modal() {
        function open() {
            $("[modal-show='show']").click(function () {
                $($(this).attr("modal-data")).addClass("show-modal");
                $($(this).attr("modal-data"))
                    .find(".content-modal")
                    .addClass("show-modal");
                $("body").addClass("active-modal");
            });
        }

        open();

        function close() {
            $("[modal-show='close']").click(function () {
                setTimeout(function () {
                    $(".bs-modal").removeClass("show-modal");
                    $("body").removeClass("active-modal");
                }, 500);
                $(this)
                    .parents(".bs-modal")
                    .find(".content-modal")
                    .removeClass("show-modal");
            });
        }
        close();
        let showModal = $(".content-modal");
        $(".bs-modal").on("click", function (e) {
            if (
                !showModal.is(e.target) &&
                showModal.has(e.target).length === 0
            ) {
                $("body").removeClass("active-modal");
                $(".bs-modal").removeClass("show-modal");
            }
        });
    }

    modal();

    function viewPassword() {
        $(".view__password").on("click", function () {
            $(this).toggleClass("active");

            let hasClass = $(this).hasClass("active");
            $(this)
                .prev("input")
                .attr({ type: `${hasClass ? "text" : "password"}` });
        });
    }
    viewPassword();

    function forgotDisabled() {
        $(".forgotDisabled").on("change", function (e) {
            let value = e.target.value;

            if (value !== "") {
                $(".submit").attr({
                    disabled: false,
                });
                $(".submit").addClass("active");
            } else {
                $(".submit").attr({
                    disabled: true,
                });
                $(".submit").removeClass("active");
            }
        });
    }
    forgotDisabled();
    function TimeOtp() {
        let timeOtp = $(".set__time .time");
        let setTime = $(".set__time");
        let senOpt = $(".sen__opt");
        let timeNumber = 60;
        let intervalOpt = setInterval(function () {
            timeNumber--;
            if (timeNumber < 0) {
                senOpt.removeClass("hidden");
                setTime.addClass("hidden");
                clearInterval(intervalOpt);
            } else {
                timeNumber = timeNumber < 10 ? `0${timeNumber}` : timeNumber;
                timeOtp.text(timeNumber);
            }
        }, 1000);
    }
    TimeOtp();
});
