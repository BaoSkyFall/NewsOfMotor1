$(document).ready(function () {
    $("#btn-submit").click(function()
{
    console.log("OK");
    var data = CKEDITOR.instances.editor1.getData();
    console.log(data);
})
})