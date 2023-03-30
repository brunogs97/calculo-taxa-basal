const formulario = document.querySelector('#formulario')
const cxRasultadoPaciente = document.querySelector('#resultado')
const btnCalcular = document.querySelector('#btn-calcular')
const cxResultadoPaciente = document.querySelector('#resultado')
const valorIMCPaciente = document.querySelector('#resutlado-imc')
const peso = document.querySelector('#peso')
const resultadoPaciente = document.querySelectorAll('.valores-resultado')


btnCalcular.addEventListener('click', (event) => {
    event.preventDefault();  //evita o envio do formulario

    // exibir a caixa de resultado
    cxRasultadoPaciente.style.display = 'block';

    const nomePaciente = formulario.nome.value
    const sexoPaciente = formulario.sexo.value
    const pesoPaciente = formulario.peso.value
    const alturaPaciente = formulario.altura.value
    const idadePaciente = formulario.idade.value
    let sitIMCPaciente = (pesoPaciente / (alturaPaciente * alturaPaciente)).toFixed(1)
    
    valorIMCPaciente.value = sitIMCPaciente

    let taxaBasal = calcularTaxaMetabolismoBasal(pesoPaciente, alturaPaciente, idadePaciente, sexoPaciente)
    resultadoPaciente[2].textContent = taxaBasal

})

function calcularIMC(imc) {
    let valorIMC = ''

    if(imc < 18.5) {
        valorIMC += 'Abaixo do peso normal.'
    } else if(imc >= 18.5 && imc < 25.9) {
        valorIMC += 'Peso normal.'
    } else if(imc >= 25 && imc < 29.9) {
        valorIMC += 'Excesso de peso.'
    } else if(imc >= 30 && imc < 34.9) {
        valorIMC += 'Obesidade classe I'
    } else if(imc >= 35 && imc < 39.9) {
        valorIMC += 'Obesicade classe II'
    } else if(imc >= 40) {
        valorIMC += 'Obesidade classe III'
    } 

    return valorIMC
}

function calcularTaxaMetabolismoBasal(peso, altura, idade, genero) {
    let calculaBasal = 0
    
    if(genero == 'masculino') {
        const calculaBasalMasc = (10 * peso) + (6.25 * altura) - (5 * idade) - 5
        calculaBasal += calculaBasalMasc 
    } else {
        const calculaBasalFem = (10 * peso) + (6.25 * altura) - (5 * idade) - 161
        calculaBasal += calculaBasalFem
    }

    return (calculaBasal.toFixed(1))
}