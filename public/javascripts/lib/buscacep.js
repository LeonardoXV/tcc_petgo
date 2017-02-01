$(document).ready(function(){
  $("#cep").blur(function() {

    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {


            //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                if (!("erro" in dados)) {
                    var labelBairro = $("label[for='bairro']");
                    var labelCidade = $("label[for='cidade']");
                    var labelEstado = $("label[for='estado']");
                    var labelLogradouro = $("label[for='rua']");

                    labelLogradouro.addClass("active");
                    labelBairro.addClass("active");
                    labelCidade.addClass("active");
                    labelEstado.addClass("active");
                    //Atualiza os campos com os valores da consulta.

                    $("#rua").val(dados.logradouro);
                    $("#bairro").val(dados.bairro);
                    $("#cidade").val(dados.localidade);
                    $("#estado").val(dados.uf);
                } //end if.
                else {
                  $("#cep").addClass("invalid");
                }
            });
        } //end if.
        else {
            //cep é inválido.
            // limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        // limpa_formulário_cep();
    }
  });


});
