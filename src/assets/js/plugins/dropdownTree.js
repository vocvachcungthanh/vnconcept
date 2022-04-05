$(document).ready(function () {
    function dropdownTree() {
        $(".dropdownTree__checkbox").on("click", function () {
            let htmlFor = $(this).attr("for");
            let htmlText = $(this).children(".dropdownTree__name").text();
            let html = `<label for="${htmlFor}" class="removeHtml flex items-center gap-2 cursor-pointer">
								<span class="dropdownTree__name">
									${htmlText}
								</span>
								<svg width="10" height="10" viewbox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0.920898 9.44629C1.15332 9.68555 1.55664 9.67871 1.78906 9.44629L5.28906 5.93945L8.7959 9.44629C9.02832 9.67871 9.4248 9.68555 9.65723 9.44629C9.90332 9.20703 9.89648 8.81055 9.65723 8.57812L6.15723 5.07129L9.65723 1.57129C9.89648 1.33887 9.90332 0.935547 9.65723 0.703125C9.4248 0.463867 9.02832 0.470703 8.7959 0.703125L5.28906 4.20996L1.78906 0.703125C1.55664 0.470703 1.15332 0.463867 0.920898 0.703125C0.681641 0.935547 0.688477 1.33887 0.920898 1.57129L4.42773 5.07129L0.920898 8.57812C0.688477 8.81055 0.681641 9.20703 0.920898 9.44629Z" fill="#212529"/>
								</svg>

							</label>`;
            $(".dropdownTree__header").append(html);

            $(".removeHtml").on("click", function () {
                $(this).remove();
            });
        });
    }
    dropdownTree();
});
