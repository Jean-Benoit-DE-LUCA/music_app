var menu = {
    init: function () {
        menu.eventMenuDiv();
    },
    eventMenuDiv: function () {
        var menuDiv = document.getElementsByClassName("menu--button--div")[0];
        menuDiv.addEventListener("click", menu.handleEventMenuDiv);
    },
    handleEventMenuDiv: function (e) {
        var divMain = document.getElementsByClassName("div--main")[0];
        var wrapBlurDiv = document.getElementsByClassName('wrap--blur--div')[0];
        var backAnchor = document.getElementsByClassName('back--anchor')[0];
        divMain.classList.toggle("active");
        wrapBlurDiv.classList.toggle('active');
        if (backAnchor !== undefined) {
            backAnchor.classList.toggle('active');
        }
        e.currentTarget.classList.toggle("active");
    }
};
window.addEventListener("DOMContentLoaded", menu.init);
