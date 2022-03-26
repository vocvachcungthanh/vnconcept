$(document).ready(function () {
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

    function menuAdmin() {
        $(".control__show").on("click", function () {
            $(".control__children")
                .not($(this).children(".control__children"))
                .slideUp();
            $(".control__show").not($(this)).removeClass("active");
            $(this)
                .parents(".control__list")
                .children(".control__children")
                .slideToggle();
            $(this).toggleClass("active");
        });
    }
    menuAdmin();

    function selectAdmin() {
        $(".select-admin").customSelect();
    }
    selectAdmin();

    function fillSearchAdmin() {
        $(".option__search").on("click", function () {
            $(".search__box").slideToggle();
        });
    }
    fillSearchAdmin();
});
