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
        $("[modal-show='show']").click(function () {
            $($(this).attr("modal-data")).addClass("show-modal");
            $($(this).attr("modal-data"))
                .find(".content-modal")
                .addClass("show-modal");
            $("body").addClass("active-modal");
        });
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
        let showModal = $(".content-modal");
        $(".bs-modal").on("click", function (e) {
            if (
                !showModal.is(e.target) &&
                showModal.has(e.target).length === 0
            ) {
                console.log("thanh");
                $("body").removeClass("active-modal");
                $(".bs-modal").removeClass("show-modal");
            }
        });
    }

    modal();
});
