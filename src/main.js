const formulario = document.querySelector('#formulario')
const cxRasultadoPaciente = document.querySelector('#resultado')
const btnCalcular = document.querySelector('#btn-calcular')
const cxResultadoPaciente = document.querySelector('#resultado')
const valorIMCPaciente = document.querySelector('#resutlado-imc')
const resultadoPaciente = document.querySelectorAll('.valores-resultado')

btnCalcular.addEventListener('click', (event) => {
    event.preventDefault();  //evita o envio do formulario

    // exibir a caixa de resultado
    cxRasultadoPaciente.style.display = 'block';

    //pegar dados de entrada do usuario
    const sexoPaciente = formulario.sexo.value
    const pesoPaciente = formulario.peso.value
    const alturaPaciente = formulario.altura.value
    const idadePaciente = formulario.idade.value
    const convertValorAltura = alturaPaciente / 100
    let sitIMCPaciente = (pesoPaciente / (convertValorAltura * convertValorAltura)).toFixed(1)

    //exibir o valor do IMC 
    valorIMCPaciente.value = sitIMCPaciente

    let taxaBasal = calcularTaxaMetabolismoBasal(pesoPaciente, alturaPaciente, idadePaciente, sexoPaciente)

    //criar um obj para armazenar os valores
    let multNivelAtividade = {
        metabolBasal: taxaBasal[0],
        sedentario: taxaBasal[1],
        exerLight: taxaBasal[2],
        exerModerado: taxaBasal[3],
        exerRegular: taxaBasal[4],
        exerIntenso: taxaBasal[5],
        ganharPeso: function() {
            return Number(this.metabolBasal) + 600
        },
        perderPeso: taxaBasal[0] - 300,
    }

    //saida de dados 
    resultadoPaciente[0].textContent = multNivelAtividade.metabolBasal
    resultadoPaciente[1].textContent = multNivelAtividade.sedentario
    resultadoPaciente[2].textContent = multNivelAtividade.exerLight
    resultadoPaciente[3].textContent = multNivelAtividade.exerModerado
    resultadoPaciente[4].textContent = multNivelAtividade.exerRegular
    resultadoPaciente[5].textContent = multNivelAtividade.exerIntenso
    resultadoPaciente[6].textContent = multNivelAtividade.ganharPeso() 
    resultadoPaciente[7].textContent = multNivelAtividade.perderPeso
})

function calcularIMC(imc) {
    let valorIMC = ''

    if (imc < 18.5) {
        valorIMC += 'Abaixo do peso normal.'
    } else if (imc >= 18.5 && imc < 25.9) {
        valorIMC += 'Peso normal.'
    } else if (imc >= 25 && imc < 29.9) {
        valorIMC += 'Excesso de peso.'
    } else if (imc >= 30 && imc < 34.9) {
        valorIMC += 'Obesidade classe I'
    } else if (imc >= 35 && imc < 39.9) {
        valorIMC += 'Obesicade classe II'
    } else if (imc >= 40) {
        valorIMC += 'Obesidade classe III'
    }

    return valorIMC
}

function calcularTaxaMetabolismoBasal(peso, altura, idade, genero) {
    let metabolBasal = 0
    let sedent = 0
    let exercLigth = 0
    let exercMod = 0
    let exercReg = 0
    let exercInten = 0

    if (genero == 'masculino') {
        const calculaMetabBasalMasc = 10 * peso + 6.25 * altura - 5 * idade + 5
        metabolBasal += calculaMetabBasalMasc
        sedent += calculaMetabBasalMasc * 1.2
        exercLigth += calculaMetabBasalMasc * 1.375
        exercMod += calculaMetabBasalMasc * 1.55
        exercReg += calculaMetabBasalMasc * 1.725
        exercInten += calculaMetabBasalMasc * 1.9
    } else {
        const calculaMetabBasalFem = 10 * peso + 6.25 * altura - 5 * idade - 161
        metabolBasal += calculaMetabBasalFem
        sedent += calculaMetabBasalFem * 1.2
        exercLigth += calculaMetabBasalFem * 1.375
        exercMod += calculaMetabBasalFem * 1.55
        exercReg += calculaMetabBasalFem * 1.725
        exercInten += calculaMetabBasalFem * 1.9
    }

    return [metabolBasal.toFixed(1), sedent.toFixed(1), exercLigth.toFixed(1), exercMod.toFixed(1), exercReg.toFixed(1), exercInten.toFixed(1)]
}
