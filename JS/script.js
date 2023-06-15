$(document).ready(function(){

    $('#cpf').inputmask('999.999.999-99');
});
$('#cpf').keyup(verificarEnter);
function verificarEnter(e,funcao){
    if(e.key === "Enter"){
        validaCPF();
      }
}
function validaCPF(){

    const cpfFormatado = document.getElementById ("cpf").value;

    const cpf = limpaFormatacao(cpfFormatado);

    if (cpf.length !== 11){
        mostraResultado('CPF inválido! Deve conter 11 digitos','red','#F99494');
        return;
    }

    if(verificaDigitosRepetidos(cpf)){

        mostraResultado('CPF inválido! CPF não pode conter repetição do mesmo digito.', 'red','#F99494');
        return;
    }
    const digito1 = calcularDigitoVerificador(cpf,1);

    if (!digito1){
        mostraResultado('CPF inválido!', 'red','#F99494');
        return;
    }
    const digito2 = calcularDigitoVerificador(cpf,2);

    if (!digito2){
        mostraResultado('CPF inválido!' , 'red','#F99494');
        return;
    }

    else{
        mostraResultado('CPF válido!','green','lightgreen');
    }
    
}

function calcularDigitoVerificador(cpf, posicao){

    const sequencia = cpf.slice(0, 8 + posicao).split('');

    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia){
        soma += multiplicador * Number(numero);
        multiplicador --;
    }

    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;

}


function limpaFormatacao(cpf){
    cpf = cpf.replace(/\D/g,'');

    return cpf;

}

function mostraResultado(texto, cor , corFundo){
    const span = document.getElementById('resultado');
    span.innerHTML = texto;
    span.style.color = cor;
    span.style.backgroundColor = corFundo;
    span.style.borderColor = cor;
    
}

function verificaDigitosRepetidos(cpf){
    return cpf.split('').every((d) => d === cpf[0]);
}