/*
 * copy_script.js
 *
 * TODO: for somre reason i cannot get this to work, sadface
 * deals with the copy button on the sidebar
 */

$(document).ready(function(){

    $('a.copy-tex').zclip({
        path:'ZeroClipboard.swf',
        copy:$("h2").text()
        // copy:$(this).parent().parent().parent().children('td').eq(1).text()
    });

    // The link with ID "copy-description" will copy
    // the text of the paragraph with ID "description"
    
});
