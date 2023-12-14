import $ from 'jquery'
import VirtualKeyboard from './vk_loader'
export function initVk(className){
    let input_list=document.getElementsByTagName("input");
    for(let i=0; i<input_list.length; i++){
        if(input_list[i].className!=className){
            input_list[i].onfocus=function(){
                var thisId=input_list[i].id;
                if(thisId){
                    VirtualKeyboard.toggle(thisId, 'softkey');
                }
            };
            input_list[i].onblur=function(){
                var thisId=input_list[i].id;
                if(thisId){
                    VirtualKeyboard.toggle(thisId, 'softkey');
                }
            }
        }
    }
    let textarea_list=document.getElementsByTagName("textarea");
    for(let j=0; j<textarea_list.length;j++){
        textarea_list[j].onfocus=function(){
            let thisId=textarea_list[j].id;
            VirtualKeyboard.toggle(thisId, 'softkey');
        }
        textarea_list[j].onblur=function(){
            let thisId=textarea_list[j].id;
            VirtualKeyboard.toggle(thisId, 'softkey');
        }
    }
    $("#kb_langselector,#kb_mappingselector,#copyrights").css("display", "none");
}

