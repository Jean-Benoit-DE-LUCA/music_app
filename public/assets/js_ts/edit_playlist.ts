const edit_playlist = {

    init: function() {

        edit_playlist.setHeightSectionPlaylist();
        edit_playlist.eventDragDivSong();
        edit_playlist.eventDeleteSongPlaylist();
        edit_playlist.yesConfirm();
        edit_playlist.noConfirm();
    },

    idSongClicked: null,
    idSongClickedDelete: null,
    idSongClickedDeleteConfirm: null,
    protocolDomainName: 'http://localhost:8000',

    setHeightSectionPlaylist: function() {

        const oldSectionPlaylist = (document.getElementsByClassName('old--playlist--order')[0] as HTMLElement);

        if (oldSectionPlaylist !== undefined) {

            let matchScreen: MediaQueryList = window.matchMedia('(min-width: 1000px)');

            matchScreen.addEventListener('change', edit_playlist.handleChangeScreenWidth);

            if (matchScreen.matches) {

                document.documentElement.style.setProperty('--heightSection', (oldSectionPlaylist.children.length * 4.5) + 'rem');
            }

            else {

                document.documentElement.style.setProperty('--heightSection', (oldSectionPlaylist.children.length * 3.5) + 'rem');
            }
        }
    },

    handleChangeScreenWidth: function(e: any) {

        const oldSectionPlaylist = (document.getElementsByClassName('old--playlist--order')[0] as HTMLElement);

        if (e.matches) {

            document.documentElement.style.setProperty('--heightSection', (oldSectionPlaylist.children.length * 4.5) + 'rem');
        }

        else {

            document.documentElement.style.setProperty('--heightSection', (oldSectionPlaylist.children.length * 3.5) + 'rem');
        }
    },

    eventDragDivSong: function() {

        const songsCollection = (document.getElementsByClassName('block--div--song') as HTMLCollectionOf<HTMLDivElement>);

        const oldSectionPlaylist = (document.getElementsByClassName('old--playlist--order')[0] as HTMLElement);
        const headerNewSectionPlaylist = (document.getElementById('header--new--playlist--order') as HTMLHeadingElement);
        const headingNewSectionPlaylist = (document.getElementById('new--playlist--order--heading') as HTMLElement);
        const newSectionPlaylist = (document.getElementsByClassName('new--playlist--order')[0] as HTMLElement);

        if (oldSectionPlaylist !== undefined) {

            oldSectionPlaylist.addEventListener('drop', edit_playlist.handleEventDragDropDesktop);
            oldSectionPlaylist.addEventListener('dragover', edit_playlist.handleEventDragOverDesktop);

            headerNewSectionPlaylist.addEventListener('drop', edit_playlist.handleEventDragDropDesktop);
            headerNewSectionPlaylist.addEventListener('dragover', edit_playlist.handleEventDragOverDesktop);
            headingNewSectionPlaylist.addEventListener('drop', edit_playlist.handleEventDragDropDesktop);
            headingNewSectionPlaylist.addEventListener('dragover', edit_playlist.handleEventDragOverDesktop);

            newSectionPlaylist.addEventListener('drop', edit_playlist.handleEventDragDropDesktop);
            newSectionPlaylist.addEventListener('dragover', edit_playlist.handleEventDragOverDesktop);
                
            for (let i = 0; i < songsCollection.length; i++) {

                songsCollection[i].addEventListener('touchstart', edit_playlist.handleEventTouchStartDiv);

                songsCollection[i].addEventListener('touchmove', edit_playlist.handleEventDragDivSong);
                songsCollection[i].addEventListener('touchend', edit_playlist.handleEventDragDivSongEnd);
                
                songsCollection[i].addEventListener('dragstart', edit_playlist.handleEventDragDivSongDesktop);
            }
        }
    },

    handleEventTouchStartDiv: function(e: TouchEvent) {

        edit_playlist.idSongClickedDeleteConfirm = (e.currentTarget as any).id.replace('block--div--song--', '');
    },

    handleEventDragDivSong: function(e: TouchEvent) {

        const oldSectionPlaylist = (document.getElementsByClassName('old--playlist--order')[0] as HTMLElement);
        const newSectionPlaylist = (document.getElementsByClassName('new--playlist--order')[0] as HTMLElement);

        const divSongBlock = e.currentTarget as HTMLDivElement;

        divSongBlock.style.position = 'absolute';

        divSongBlock.style.left = e.targetTouches[0].pageX + 'px';
        divSongBlock.style.top = e.targetTouches[0].pageY + 'px';
    },

    handleEventDragDivSongEnd: function(e: TouchEvent) {

        edit_playlist.idSongClicked = (e.currentTarget as any).id;

        const oldSectionPlaylist = (document.getElementsByClassName('old--playlist--order')[0] as HTMLElement);
        const headerNewSectionPlaylist = (document.getElementById('header--new--playlist--order') as HTMLHeadingElement);
        const newSectionPlaylist = (document.getElementsByClassName('new--playlist--order')[0] as HTMLElement);

        const divSongBlock = e.currentTarget as HTMLDivElement;


        if (Number(divSongBlock.style.top.replace('px', '')) > Number(newSectionPlaylist.offsetTop) || 
            Number(divSongBlock.style.top.replace('px', '')) > Number(headerNewSectionPlaylist.offsetTop)) {

            divSongBlock.style.position = 'static';
            newSectionPlaylist.append(divSongBlock);
        }

        else if (Number(divSongBlock.style.top.replace('px', '')) < Number(headerNewSectionPlaylist.offsetTop)) {

            divSongBlock.style.position = 'static';
            oldSectionPlaylist.append(divSongBlock);
        }
    },

    handleEventDragDivSongDesktop: function(e: DragEvent) {

        e.dataTransfer?.setData('text', (e.target as HTMLDivElement).id);
    },

    handleEventDragDropDesktop: function(e: DragEvent) {

        e.preventDefault();
        const data = e.dataTransfer?.getData('text');


        
        if ((e.target as HTMLElement).id == 'old--playlist--order' || (e.target as HTMLElement).id == 'new--playlist--order') {

            (e.target as HTMLElement).append((document.getElementById(data as string) as HTMLElement));
        }

        else if ((e.target as HTMLElement).id == 'header--new--playlist--order' || (e.target as HTMLElement).id == 'new--playlist--order--heading') {

            const newSectionPlaylist = (document.getElementsByClassName('new--playlist--order')[0] as HTMLElement);
            newSectionPlaylist.append((document.getElementById(data as string) as HTMLElement));
        }
    },

    handleEventDragOverDesktop: function(e: DragEvent) {

        e.preventDefault();
    },





    eventDeleteSongPlaylist: function() {

        const imgCrossElements = (document.getElementsByClassName('block--div--song--cross') as HTMLCollectionOf<HTMLImageElement>);

        for (let i = 0; i < imgCrossElements.length; i++) {

            imgCrossElements[i].addEventListener('mousedown', edit_playlist.handleEventDeleteSongPlaylist);
        }
    },

    handleEventDeleteSongPlaylist: function(e: Event) {

        edit_playlist.idSongClickedDelete = (e.currentTarget as any).parentElement.getElementsByClassName('hidden--song--id')[0].value;
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        let flagOld = false;
        let indexChild = 0;

        const oldSectionPlaylist = (document.getElementsByClassName('old--playlist--order')[0] as HTMLElement);

        for (let i = 0; i < oldSectionPlaylist.children.length; i++) {

            if (oldSectionPlaylist.children[i] == (e.currentTarget as HTMLImageElement).parentElement) {

                flagOld = true;
                indexChild = i;
            }
        }



        let flagNew = false;
        let indexChildNew = 0;

        const newSectionPlaylist = (document.getElementsByClassName('new--playlist--order')[0] as HTMLElement);

        for (let i = 0; i < newSectionPlaylist.children.length; i++) {

            if (newSectionPlaylist.children[i] == (e.currentTarget as HTMLImageElement).parentElement) {

                flagNew = true;
                indexChildNew = i;
            }
        }




        const divError = (document.getElementsByClassName('error--div')[0] as HTMLDivElement);
        const spanError = (divError.getElementsByClassName('error--div--span')[0] as HTMLSpanElement);
        const divBoxConfirm = (document.getElementsByClassName('confirm--box--yes--no')[0] as HTMLDivElement);




        if (flagOld) {

            let elementClicked;

            try {

                elementClicked = document.getElementById(edit_playlist.idSongClicked as any);

                oldSectionPlaylist.insertBefore(elementClicked, oldSectionPlaylist.children[indexChild]);

                divError.classList.add('active_error');
                divBoxConfirm.classList.add('active');
                spanError.innerHTML = 'Are you sure to remove ' + elementClicked.getElementsByClassName('block--div--song--span')[0].textContent + ' from playlist ' + '<strong>' + (document.getElementsByClassName('hidden--name--playlist')[0] as HTMLInputElement).value + '</strong>';

                edit_playlist.idSongClicked = null;

            }

            catch (error) {

                elementClicked = document.getElementById((e.currentTarget as any).parentElement.id);

                divError.classList.add('active_error');
                divBoxConfirm.classList.add('active');
                spanError.innerHTML = 'Are you sure to remove ' + elementClicked.getElementsByClassName('block--div--song--span')[0].textContent + ' from playlist ' + '<strong>' + (document.getElementsByClassName('hidden--name--playlist')[0] as HTMLInputElement).value + '</strong>';
            }

        }



        else if (flagNew) {

            let elementClicked;

            try {

                elementClicked = document.getElementById(edit_playlist.idSongClicked as any);

                newSectionPlaylist.insertBefore(elementClicked, newSectionPlaylist.children[indexChildNew]);

                divError.classList.add('active_error');
                divBoxConfirm.classList.add('active');
                spanError.innerHTML = 'Are you sure to remove ' + elementClicked.getElementsByClassName('block--div--song--span')[0].textContent + ' from playlist ' + '<strong>' + (document.getElementsByClassName('hidden--name--playlist')[0] as HTMLInputElement).value + '</strong>';

                edit_playlist.idSongClicked = null;
            }

            catch (error) {

                elementClicked = document.getElementById((e.currentTarget as any).parentElement.id);

                divError.classList.add('active_error');
                divBoxConfirm.classList.add('active');
                spanError.innerHTML = 'Are you sure to remove ' + elementClicked.getElementsByClassName('block--div--song--span')[0].textContent + ' from playlist ' + '<strong>' + (document.getElementsByClassName('hidden--name--playlist')[0] as HTMLInputElement).value + '</strong>';
            }
        }

    },

    yesConfirm: function() {

        const yesConfirmSpan = (document.getElementsByClassName('yes--confirm')[0] as HTMLSpanElement);

        if (yesConfirmSpan !== undefined) {

            yesConfirmSpan.addEventListener('click', edit_playlist.handleYesConfirm);
        }
    },

    handleYesConfirm: async function(e: MouseEvent) {

        const jwt = (document.getElementsByClassName('hidden--jwt')[0] as HTMLInputElement);

        // YES CONFIRM DELETE PLAYLIST //

        if (window.location.href.replace(edit_playlist.protocolDomainName, '') == '/music/playlist') {

            const response = await fetch(`/api/music/playlist/delete/${delete_playlist.deletePlaylistNumber}`, {

                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-TOKEN': jwt.value
                }
            });

            const responseData = await response.json();

            const divError = (document.getElementsByClassName('error--div')[0] as HTMLDivElement);
            const spanError = (divError.getElementsByClassName('error--div--span')[0] as HTMLSpanElement);
            const divBoxConfirm = (document.getElementsByClassName('confirm--box--yes--no')[0] as HTMLDivElement);

            if (responseData.hasOwnProperty('flag')) {

                if (responseData.flag) {

                    divError.classList.remove('active_error');
                    divError.classList.add('active');
                    divBoxConfirm.classList.remove('active');
                    spanError.textContent= 'Playlist successfully removed';

                    const liElements = (document.getElementsByClassName('list--playlists--user--ul--li') as HTMLCollectionOf<HTMLLIElement>);

                    for (let i = 0; i < liElements.length; i++) {

                        if (liElements[i].getAttribute('data-playlist_id') == delete_playlist.deletePlaylistNumber) {

                            liElements[i].remove();
                        }
                    }

                    setTimeout(() => {

                        divError.classList.remove('active');
                    }, 1500);
                }

                else if (!responseData.flag) {

                    divBoxConfirm.classList.remove('active');
                    spanError.textContent= 'Authentication error, please sign in again';

                    setTimeout(() => {

                        divError.classList.remove('active_error');
                    }, 1500);
                }
            }
        }

        // YES CONFIRM DELETE MUSIC FROM PLAYLIST //

        else {

            const playlist_id = (document.getElementsByClassName('hidden--id--playlist')[0] as HTMLInputElement);
            const music_id = edit_playlist.idSongClickedDeleteConfirm;

            const response = await fetch(`/api/music/playlist/${playlist_id.value}/delete/${music_id}`, {

                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-TOKEN': jwt.value
                }
            });

            const responseData = await response.json();

            const divError = (document.getElementsByClassName('error--div')[0] as HTMLDivElement);
            const spanError = (divError.getElementsByClassName('error--div--span')[0] as HTMLSpanElement);

            if (responseData.hasOwnProperty('flag')) {

                if (responseData.flag) {

                    const divBoxConfirm = (document.getElementsByClassName('confirm--box--yes--no')[0] as HTMLDivElement);

                    divError.classList.remove('active_error');
                    divError.classList.add('active');
                    divBoxConfirm.classList.remove('active');
                    spanError.textContent= 'Song successfully removed from playlist';

                    const divBoxToRemove = (document.getElementById(`block--div--song--${music_id}`));
                    divBoxToRemove?.remove();

                    setTimeout(() => {

                        divError.classList.remove('active');
                    }, 1500);

                    //

                    const hiddenTotalSongs = (document.getElementsByClassName('hidden--total--song')[0] as HTMLInputElement);

                    hiddenTotalSongs.value = (Number(hiddenTotalSongs.value) - 1).toString();
                }
            }
        }
    },

    noConfirm: function() {

        const noConfirmSpan = (document.getElementsByClassName('no--confirm')[0] as HTMLSpanElement);

        if (noConfirmSpan !== undefined) {

            noConfirmSpan.addEventListener('click', edit_playlist.handleNoConfirm);
        }
    },

    handleNoConfirm: function(e: MouseEvent) {

        ((e.currentTarget as any).parentElement.parentElement as HTMLDivElement).classList.remove('active_error');
    }
};

window.addEventListener('DOMContentLoaded', edit_playlist.init);
