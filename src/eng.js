const formulario = document.querySelector('#formulario')
const cxRasultadoPaciente = document.querySelector('#resultado')
const btnCalcular = document.querySelector('#btn-calcular')
const cxResultadoPaciente = document.querySelector('#resultado')
const valorIMCPaciente = document.querySelector('#resutlado-imc')
const resultadoPaciente = document.querySelectorAll('.valores-resultado')

btnCalcular.addEventListener('click', (event) => {
    event.preventDefault(); 

    cxRasultadoPaciente.style.display = 'block';

    const sexoPaciente = formulario.sexo.value
    const pesoPaciente = Math.round((formulario.peso.value) / 2.205)
    const alturaPaciente = Math.round((formulario.altura.value) * 2.54)
    const idadePaciente = formulario.idade.value
    const convertValorAltura = alturaPaciente / 100
    let sitIMCPaciente = (pesoPaciente / (convertValorAltura * convertValorAltura)).toFixed(1)

    //exibir o valor do IMC 
    valorIMCPaciente.value = sitIMCPaciente

    let taxaBasal = calcularTaxaMetabolismoBasal(pesoPaciente, alturaPaciente, idadePaciente, sexoPaciente)
    let situacaoIMCPaciente = calcularIMC(sitIMCPaciente)


    let multNivelAtividade = {
        bmc: situacaoIMCPaciente,
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

    resultadoPaciente[0].textContent = multNivelAtividade.bmc
    resultadoPaciente[1].textContent = multNivelAtividade.metabolBasal
    resultadoPaciente[2].textContent = multNivelAtividade.sedentario
    resultadoPaciente[3].textContent = multNivelAtividade.exerLight
    resultadoPaciente[4].textContent = multNivelAtividade.exerModerado
    resultadoPaciente[5].textContent = multNivelAtividade.exerRegular
    resultadoPaciente[6].textContent = multNivelAtividade.exerIntenso
    resultadoPaciente[7].textContent = multNivelAtividade.ganharPeso() 
    resultadoPaciente[8].textContent = multNivelAtividade.perderPeso
})

function calcularIMC(imc) {
    let valorIMC = ''

    if (imc < 18.5) {
        valorIMC += 'Underweight'
    } else if (imc >= 18.5 && imc < 25.9) {
        valorIMC += 'Normal.'
    } else if (imc >= 25 && imc < 29.9) {
        valorIMC += 'Overweight'
    } else if (imc >= 30 && imc < 34.9) {
        valorIMC += 'Moderately Obese'
    } else if (imc >= 35 && imc < 39.9) {
        valorIMC += 'Severely Obese'
    } else if (imc >= 40) {
        valorIMC += 'Morbidly Obese'
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
