$(document).ready()
{

    $('body').delegate('#btn-edit', "click", function () {
        console.log("OK");
        $('#name_input').val($(this).data('name'));
        var parts =$(this).data('birthday').split('-');
        var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
        
        $('.modal-title').text( "Edit User " + $(this).data('name'));
        $('#avatar_input').val($(this).data('avatar'));
        $('#id_input').val($(this).data('id'));

        $("#img_input").attr("src", $(this).data('avatar'));

        $('#date_input').val($(this).data('birthday'));
        $('#username_input').val($(this).data('username'));
        $('#password_input').val($(this).data('password'));
        $('#email_input').val($(this).data('email'));
        $('#role_input')
    .val($(this).data('phanhe').toString())
    .trigger('change');
        $('#btn-modal-save').html('Update');
        $('.btn-modal').trigger('click');
    })

}