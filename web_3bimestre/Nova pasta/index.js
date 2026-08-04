const readline = require('readline');
const mat = require('./mat'); 

const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
});

rl.question("Digite o primeiro número: ", function(a) {


    rl.question("Digite o segundo número: ", function(b) {
        if (isNaN(a) || isNaN(b)) { console.log("Por favor, forneça dois números como argumentos."); }
        a = Number(a);
        b = Number(b);


        console.log("\nMenu de operações:");

        console.log("1-Somar");
        console.log("2-Subtração");
        console.log("3-divisão");
        console.log("4-multiplicação");
        console.log("5-potencia");

        rl.question("\nEscolha a sua operação matematica (NUMERO Q ESTA NA FRENTE):", function (c){
       if(c === '1'){

            console.log("A soma de 'a' e 'b', nessa ordem é:", mat.somar(a,b));
       }
       
       if(c === '2'){
        console.log("A subtração de 'a' e 'b', nessa ordem é:", mat.sub(a,b));
       }
       
       if(c === '3'){
        console.log("A divisão de 'a' e 'b', nessa ordem é:", mat.div(a,b));
       }
       
       if(c === '4'){
        console.log("A multiplicação de 'a' e 'b' é:", mat.mul(a,b));
       }
       
       if(c === '5'){
        console.log("A potencia de 'a' e 'b', nessa ordem é:", mat.potencia(a,b));
       }
        rl.close(); 
        });
    });
});


