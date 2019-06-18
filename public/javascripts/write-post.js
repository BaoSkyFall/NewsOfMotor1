$(document).ready(function () {
    $("#btn-submit").click(function () {
        console.log("OK");
        var data = CKEDITOR.instances.editor1.getData();
        console.log(data);
    })
    var now =moment(new(Date)).format("YYYY-MM-DD");
    $('#input_NgayViet').val(now);
    $('#input_NgayBinhLuan').val(now);
    
})