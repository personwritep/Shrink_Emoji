// ==UserScript==
// @name        Shrink Emoji ⭐
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        アメブロ絵文字のデータを軽くする　ショートカット「F2」
// @author        Ameba Blog User
// @match        https://blog.ameba.jp/ucs/entry/srventry*
// @exclude        https://blog.ameba.jp/ucs/entry/srventrylist.do*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @grant        none
// @updateURL        https://github.com/personwritep/Shrink_Emoji/raw/main/Shrink_Emoji.user.js
// @downloadURL        https://github.com/personwritep/Shrink_Emoji/raw/main/Shrink_Emoji.user.js
// ==/UserScript==

let retry=0;
let interval=setInterval(wait_target, 100);
function wait_target(){
    retry++;
    if(retry>10){ // リトライ制限 10回 1sec
        clearInterval(interval); }
    let target=document.getElementById('cke_1_contents'); // 監視 target
    if(target){
        clearInterval(interval);
        main(); }}

function main(){
    let editor_iframe;
    let iframe_doc;
    let iframe_body;

    let target=document.querySelector('#cke_1_contents');
    let monitor=new MutationObserver( catch_key );
    monitor.observe(target, {childList: true});
    catch_key();

    function catch_key(){
        editor_iframe=document.querySelector('.cke_wysiwyg_frame');
        if(editor_iframe){
            iframe_doc=editor_iframe.contentWindow.document;
            if(iframe_doc){
                iframe_doc.addEventListener('keydown', check_key);
                document.addEventListener('keydown', check_key);
                function check_key(event){
                    if(event.keyCode==113){ // ショートカット「F2」
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        shrink(iframe_doc);
                    }}}}}

    function shrink(iframe_doc){
        let emoji=iframe_doc.querySelectorAll('img[src*="blog/ucs/img/char/char"]');
        for(let k=0; k<emoji.length; k++){
            emoji[k].removeAttribute('alt');
            emoji[k].removeAttribute('draggable');
            emoji[k].removeAttribute('data-cke-saved-src');
            emoji[k].removeAttribute('alt');
            emoji[k].removeAttribute('alt');
            emoji[k].removeAttribute('alt'); }}
} // main()
