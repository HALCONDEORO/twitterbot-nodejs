var Twit = require('twit')

var arrayWords = [
    "Teniendo en cuenta que ya hay una película (Jazz y chistes, la película, el podcast), el Kikeverso, es ya oficialmente un Universo Cinematográfico Kike.","No descarto que en el Kikeverso haya un Kike relleno de nata y también sería un Kike, evidentemente.","Cuándo se cambia la hora, esto es inaguantable","Joder qué asco. Ya no digo nada más de esto hasta diciembre, perdonadme"]

var T = new Twit({
    consumer_key: 'd77X8QzbMz6y8qbgmdGGEczxf',
    consumer_secret: 'GmipG5l6PSsNRrU5I1D62kI4qzCMdNv1Mx36qPt3Obmg4DhFu7',
    access_token: '1345829866076327938-OZ7rU6jhp1IevsRrnJuFyLKWxpQzWs',
    access_token_secret: 'VoRQhBeQTo3HpomWi7t6NeHdN81A5X3Mvrw1YRbknlJtr'
})

//Verificamos las credenciales
T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
})

// Seteamos el stream y usamos la api statues/filter para estar escuchando las menciones a nuestro Bot (en mi caso BotBro)
var stream = T.stream('statuses/filter', { track: '@kikegdelarivaB1' });
// Ahora estamos observando todos los eventos relacionados al stream y en caso que pase algo ejecutamos la función tweetEvent que creamos nosotros
stream.on('tweet', tweetEvent);

//Función tweetEvent
function tweetEvent(tweet) {

    // Quién envió el Tweet?
    var name = tweet.user.screen_name;
    // Si queremos ver el texto del tweet
    // var txt = tweet.text;
    // Obtenemos el tweet id
    var nameID = tweet.id_str;

    // Si queremos eliminar la mención
    // var txt = txt.replace(/@myTwitterHandle/g, "");

    //Obtenemos un valor Random para buscar en el array
    var random = getRandomArbitrary(0, arrayWords.length);
    // Lo que hacemos es responder a ese tweet
    var reply = "@" + name + " " + arrayWords[random];
    var params = {
        status: reply,
        in_reply_to_status_id: nameID
    };

    T.post('statuses/update', params, function (err, data, response) {
        if (err !== undefined) {
            console.log(err);
        } else {
            console.log('Tweeted: ' + params.status);
        }
    })
};

//Funcion para obtener valor Random
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
