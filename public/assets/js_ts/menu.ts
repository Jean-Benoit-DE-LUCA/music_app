const menu = {

    init: function() {

        menu.eventMenuDiv();
    },

    eventMenuDiv: function() {

        const menuDiv = (document.getElementsByClassName("menu--button--div")[0] as HTMLDivElement);

        menuDiv.addEventListener("click", menu.handleEventMenuDiv);
    },

    handleEventMenuDiv: function(e: Event) {

        const divMain = (document.getElementsByClassName("div--main")[0] as HTMLDivElement);
        const wrapBlurDiv = (document.getElementsByClassName('wrap--blur--div')[0] as HTMLDivElement);
        const backAnchor = (document.getElementsByClassName('back--anchor')[0] as HTMLAnchorElement);

        divMain.classList.toggle("active");
        wrapBlurDiv.classList.toggle('active');

        if (backAnchor !== undefined) {

            backAnchor.classList.toggle('active');
        }

        (e.currentTarget as HTMLDivElement).classList.toggle("active");
        
    }
};

window.addEventListener("DOMContentLoaded", menu.init);