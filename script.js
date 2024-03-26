// 1. Möglichkeit
function init() {
    fetch('bundesland.json').then(() => { // Ruft die Datei 'bundesland.json' vom Server ab. then(() => { ... }, () => { ... }): Fügt zwei Rückruffunktionen hinzu, eine für den Erfolgsfall und eine für den Fehlerfall.
        console.log('Fertig'); // Gibt 'Fertig' in der Konsole aus, wenn der Abruf erfolgreich war.
    }, () => {
        console.log('Fehler aufgetreten'); // Gibt 'Fehler aufgetreten' in der Konsole aus, wenn ein Fehler beim Abruf aufgetreten ist.
    });
}


// 2. Möglichkeit
async function init() {
    try {
        await fetch('bundesland.json'); // Blockiert die Ausführung, bis die Datei 'bundesland.json' abgerufen wurde.
        console.log('Fertig'); // Wird ausgeführt, wenn der Abruf erfolgreich war.
    } catch (e) {
        console.log('Fehler aufgetreten'); // Wird ausgeführt, wenn ein Fehler beim Abruf aufgetreten ist.
    }
}


// 3. Möglichkeit
async function init() {
    await fetch('bundesland.json').catch(errorFunction); // Wie die vorherige Methode, jedoch wird der Fehler mit der Funktion errorFunction behandelt.
    console.log('Fertig'); // Wird ausgeführt, wenn der Abruf erfolgreich war.
}

function errorFunction() { // Wird aufgerufen, wenn ein Fehler beim Abruf aufgetreten ist und gibt 'Fehler aufgetreten' aus.
    console.log('Fehler aufgetreten');
}


// 4. Möglichkeit
async function init() {
    let [resp, err] = await resolve(fetch('bundesland.json')); // Ruft die resolve-Funktion auf und wartet, bis sie abgeschlossen ist. Es werden zwei Variablen zugewiesen: resp für die Antwort und err für den Fehler.
    if (resp) { // Wird ausgeführt, wenn die Antwort erfolgreich ist.
        console.log('Fertig');
    } 
    
    if(err){ // Wird ausgeführt, wenn ein Fehler aufgetreten ist.
        console.error('Fehler');
    }
}

async function resolve(p) { // Definiert eine asynchrone Funktion resolve, die ein Promise p entgegennimmt. Es versucht, das Promise zu lösen und gibt entweder die Antwort oder den Fehler zurück.
    try { // Versucht, das übergebene Promise p aufzulösen und fängt dabei Fehler ab.
        let response = await p; // Wartet auf die Auflösung des übergebenen Promises p.
        return [response, null]; // Gibt ein Array zurück, das die Antwort und null für den Fehler enthält, wenn keine aufgetreten ist.
    } catch (e) {
        return [null, e]; // Gibt ein Array zurück, das null für die Antwort und den Fehler e enthält, wenn ein Fehler aufgetreten ist.
    }
}