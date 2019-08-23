// This is a JavaScript file
var urlImage;
$(document).on("click", "#salvar", function(){
    /*var parametros = {
        "livro": $("#titulo").val(),
        "autor": $("#autor").val(),
        "ano": $("#ano").val()  
    }

    $.ajax({
        type: "post",
        url:"https://appmobile3ds2.000webhostapp.com/cadastra.php",
        data:parametros,
        success: function(data){
            navigator.notification.alert(data);
            $("#titulo").val(""),
            $("#autor").val(""),
            $("#ano").val("")
        },

        error: function(data){
            navigator.notification.alert(data);
        }
    });*/

    var prop = document.getElementById('caminho').files[0];
    var nome_imagem = prop.name;
    var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

     if(jQuery.inArray(extensao_imagem,['png','jpg','jpeg']) == -1){
        navigator.notification.alert("imagem invalida");
    }else{
      var form_data = new FormData();
      form_data.append("foto",prop);
      form_data.append("livro",$("#titulo").val());
      form_data.append("autor",$("#autor").val());
      form_data.append("ano",$("#ano").val());
      $.ajax({
        url:"https://appmobile3ds2.000webhostapp.com/cadastra.php",
        method:'POST',
        data:form_data,
        contentType:false,
        cache:false,
        processData:false,
        success:function(data){
          navigator.notification.alert(data);
          location.reload(); 
        }
      });
    }    
});

function habilita(){
    $("#titulo").prop("readonly", false);
    $("#autor").prop("readonly", false);
    $("#ano").prop("readonly", false);
}

function desabilita(){
    $("#titulo").prop("readonly", true);
    $("#autor").prop("readonly", true);
    $("#ano").prop("readonly", true);
}

$(document).on("click", "#novo", function(){
    habilita();
});

$(document).on("click", "#cancelar", function(){
    desabilita();
});

$(document).on("click", "#lista", function(){
    $(location).attr("href", "lista.html");
});

function preencherLista(){
    var itemLista = "";

    // invoncando método pra chamar o ajax
    $.ajax({
        type: "post", //tipo de io
        url:"https://appmobile3ds2.000webhostapp.com/lista.php", //host de acesso
        dataType:'json', //tipo codificação
        success: function(data){    
            $.each(data.livros, function(i, dados){
            itemLista+="<option value='"+dados.codigo+"'>"+dados.titulo+"</option>";
            });
            $("#listaLivros").html(itemLista);
        },
        error: function(data){
            navigator.notification.alert(data);
        }
    });
}

$(document).on("change", "#listaLivros", function(){
    var parametros ={
        "codigo":$("option:selected", ("#listaLivros")).val()
    }

    $.ajax({
        type: "post",
        url: "https://appmobile3ds2.000webhostapp.com/listarUm.php",
        data:parametros,
        dataType: 'json',
        success: function(data){
            $("#codigo").val(data.livro.codigo);
            $("#titulo").val(data.livro.titulo);
            $("#autor").val(data.livro.autor);
            $("#ano").val(data.livro.ano);
            $("#imagem").attr('src', "https://appmobile3ds2.000webhostapp.com/" + data.livro.imagem);
        },
        error: function(data){
            navigator.notification.alert(data);
        }
    });
});

$(document).on("click", "#editar", function(){
    habilita();
});

$(document).on("click", "#cancelar", function(){
    desabilita();
});

$(document).on("click", "#excluir", function(){
    var parametros = {
        "codigo":$("#codigo").val()
    }
    
    $.ajax({
        type: "post",
        url: "https://appmobile3ds2.000webhostapp.com/delete.php",
        data:parametros,
        success: function(data){
            navigator.notification.alert(data);
            location.reload();
        },
        error: function(data){
            navigator.notification.alert(data);
        }
    });
});


$(document).on("click", "#salvarAlteracao", function(){
    var prop = document.getElementById('caminho').files[0];
    var nome_imagem = prop.name;
    var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();

    if(jQuery.inArray(extensao_imagem,['png','jpg','jpeg']) == -1){
        navigator.notification.alert("imagem invalida");
    }
    else{
        var form_data = new FormData();
        form_data.append("foto1",prop);
        form_data.append("livro",$("#titulo").val());
        form_data.append("autor",$("#autor").val());
        form_data.append("ano",$("#ano").val());
        $.ajax({
            type: "post",
            url: "https://appmobile3ds2.000webhostapp.com/editar.php",
            data:form_data,
            contentType:false,
            cache:false,
            processData:false,
            success: function(data){
                navigator.notification.alert(data);
                location.reload();
            },
            error: function(data){
                navigator.notification.alert(data);
            }
        });
    }
});

$(document).on("click", "#foto", function(){
    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true,
        correctOrientation: true 
    });
    
    function onSuccess(imageURI) {
        navigator.notification.alert("imagem registrada com sucesso");
    }

    function onFail(message) {
        navigator.notification.alert("erro ao capturar imagem:" . message);
    }
});
    