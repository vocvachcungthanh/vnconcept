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
});
