        var root = document.getElementsByTagName( 'html' )[0]; 
        var wrapper = document.getElementById('wrapper');

        document.addEventListener('click', function(e) {

            let elem_target = e.target;


            // if (elem_target.classList.contains('wrapper') && root.classList.contains('popup-show')) {
            //     if(wrapper.classList.contains('on')){
            //        wrapper.classList.remove('on');
            //     }
            //     let ememPopup =  document.querySelector('.modal_r_block.open') ||  document.querySelector('.modal_t_block.open') || document.querySelector('.modal_regist.open') || document.querySelector('.modal_l_block.open') ;
            //     if(ememPopup){
            //         ememPopup.classList.remove('open');
            //     }
            //     if (catMenu.classList.contains('menu_open')){
            //         catMenu.classList.remove('menu_open')
            //     }
            //     root.classList.remove('popup-show')
            // }
        })











        var menuLinkItem = document.querySelectorAll('.menu_js .drobd_js ');
       
        var menuMobArrows = document.querySelectorAll('.m_drob_js i');



        var toggleOpen = document.getElementById('toggle');
        var toggleClose = document.getElementById('toggle_close');
        


        if (toggleOpen) {
            toggleOpen.addEventListener('click', function(e) {
                e.preventDefault();
                if(!(wrapper.classList.contains("on"))) {
                    wrapper.classList.add('on');
                    root.classList.add('popup-show')
                }
            }); 
        }
        if (toggleClose) {
            toggleClose.addEventListener('click', function(e) {
                e.preventDefault();
                if(wrapper.classList.contains("on")) {
                    wrapper.classList.remove('on');
                    root.classList.remove('popup-show');
                    for (var i = 0; i < menuMobArrows.length;i++) {
                        if (menuMobArrows[i].closest('.m_drob_js').classList.contains('openes')) {
                            menuMobArrows[i].closest('.m_drob_js').classList.remove('openes');
                        }

                    }
                }
            }); 
        }



        var TopItemMouseEnter = function(elem, arrayList) {
            if(!(elem.classList.contains("openes"))) {
                for (var i = 0; i < arrayList.length; i++) {
                    elem.classList.remove('openes');
                }      
                elem.classList.add('openes');
            }
        }
        var TopItemMouseLeave =   function(elem) {
            if((elem.classList.contains("openes"))) {
                elem.classList.remove('openes');
            }
        }


        if ((window.innerWidth) > '1200'){
            for (var i = 0; i < menuLinkItem.length; i++) {
                let times;
                let timesVis;
                menuLinkItem[i].addEventListener('mouseenter', function(e){
                    clearTimeout(times);
                    timesVis = setTimeout(() => {
                        TopItemMouseEnter(this , menuLinkItem);
                    }, 300);
                });
              
                menuLinkItem[i].addEventListener('mouseleave', function(e) {
                    clearTimeout(timesVis);
                    times = setTimeout(() => {
                        TopItemMouseLeave(this);
                    }, 300);

                }); 
            }
        }
        else{
            for (var i = 0; i < menuLinkItem.length; i++) {
                menuLinkItem[i].removeEventListener('mouseenter', function(e){
                    TopItemMouseEnter(this);
                }, false);
                menuLinkItem[i].removeEventListener('mouseleave', function(e) {
                    TopItemMouseLeave(this);
                }, false);
            }
            for (var j = 0; j < menuMobArrows.length;j++) {
                menuMobArrows[j].addEventListener('click', function(e){
                    let itemDrobdMenu = this.closest('.m_drob_js');

                    if (!itemDrobdMenu.classList.contains('openes')) {
                        itemDrobdMenu.classList.add('openes');
                    } else{
                        itemDrobdMenu.classList.remove('openes');
                    }
                })
            }
        }

