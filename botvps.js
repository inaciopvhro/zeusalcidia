// BACKEND DA API
// BIBLIOTECAS UTILIZADAS PARA COMPOSIÇÃO DA API
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const fileUpload = require('express-fileupload');
const { body, validationResult } = require('express-validator');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const mysql = require('mysql2/promise');

// PORTA ONDE O SERVIÇO SERÁ INICIADO
const port = 3300;
const idClient = 'BotZeus';

// NUMEROS AUTORIZADOS
const permissaoBot = ["556992102573@c.us","556993405268@c.us","556992762113@c.us","556993003146@c.us"];

function delay(t, v) {
  return new Promise(function(resolve) {
      setTimeout(resolve.bind(null, v), t)
  });
};

const createConnection = async () => {
	return await mysql.createConnection({
		host: '141.136.42.73',
		user: 'root',
		password: 'Inacio@2628',
		database: 'BancoBot'
	});
};

const getUser = async (msgfom) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('SELECT contato FROM contatos WHERE contato = ?', [msgfom]);
  delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
		});
	});
	if (rows.length > 0) return true;
	return false;
};

const setUser = async (msgfom, nome) => {
	const connection = await createConnection();
	const [rows] = await connection.execute('INSERT INTO `contatos` (`id`, `contato`, `nome`) VALUES (NULL, ?, ?)', [msgfom, nome]);
  delay(1000).then(async function() {
		await connection.end();
		delay(500).then(async function() {
			connection.destroy();
		});
	});
	if (rows.length > 0) return rows[0].contato;
	return false;
};

// SERVIÇO EXPRESS
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
  debug: true}));
app.use("/", express.static(__dirname + "/"))

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname
  });
});

// PARÂMETROS DO CLIENT DO WPP
const client = new Client({
  authStrategy: new LocalAuth({ clientId: idClient }),
  puppeteer: { headless: true,
  //executablePath: '/usr/bin/google-chrome-stable',
  //executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  executablePath: '/usr/bin/chromium-browser',  
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ] }
});

// INITIALIZE DO CLIENT DO WPP
client.initialize();

// EVENTOS DE CONEXÃO EXPORTADOS PARA O INDEX.HTML VIA SOCKET
io.on('connection', function(socket) {
  socket.emit('message', '© BOT-Zeus - Iniciado');
  socket.emit('qr', './whatsappDesconetado.png');


client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', '© BOT-Zeus QRCode recebido, aponte a câmera do seu celular!');
    });
});

if (client.on('authenticated', (session) => {
    socket.emit('authenticated', '© BOT-Zeus Autenticado!');
    socket.emit('message', '© BOT-Zeus Autenticado!');
    console.log('© BOT-Zeus Autenticado');
}));

client.on('auth_failure', function() {
    socket.emit('message', '© BOT-Zeus Falha na autenticação, reiniciando...');
    console.error('© BOT-Zeus Falha na autenticação');
});

client.on('change_state', state => {
  console.log('© BOT-Zeus Status de conexão: ', state );
  socket.emit('message', '© BOT-Zeus Status de conexão: ', state);
});

client.on('disconnected', (reason) => {
  socket.emit('message', '© BOT-Zeus Cliente desconectado!');
  console.log('© BOT-Zeus Cliente desconectado', reason);
  
});
 (client.on('ready', async () => {
  socket.emit('ready', '© BOT-Zeus Dispositivo pronto!');
  socket.emit('message', '© BOT-Zeus Dispositivo pronto!');
  socket.emit('qr', './whatsappConectado.png');
  console.log('© BOT-Zeus Dispositivo pronto');
  const groups = await client.getChats()
  for (const group of groups){
    if(group.id.server.includes('g.us')){
      socket.emit('mesnome', group.name);
      socket.emit('mesid', group.id._serialized.split('@')[0]);
    }
  }
  socket.emit('var', '© BOT-Zeus Grupos atualizados!');
  }));
});

setInterval(() => {
  var dataAtual = new Date();
  var horas = dataAtual.getHours();
  var minutos = dataAtual.getMinutes();
//  console.log("Agora são " + horas + ":" + minutos + "h.");
  if (horas === 23 && minutos === 58) {
    confighora(1);
  } else if (horas === 6 && minutos === 58) {
    confighora(8);
  } else if (horas === 7 && minutos === 58) {
    confighora(9);
  } else if (horas === 8 && minutos === 58) {
    confighora(10);
  } else if (horas === 9 && minutos === 58) {
    confighora(11);
  } else if (horas === 10 && minutos === 58) {
    confighora(12);
  } else if (horas === 11 && minutos === 58) {
    confighora(13);
  } else if (horas === 12 && minutos === 58) {
    confighora(14);
  } else if (horas === 13 && minutos === 58) {
    confighora(15);
  } else if (horas === 14 && minutos === 58) {
    confighora(16);
  } else if (horas === 15 && minutos === 58) {
    confighora(17);
  } else if (horas === 16 && minutos === 58) {
    confighora(18);
  } else if (horas === 17 && minutos === 58) {
    confighora(19);
  } else if (horas === 18 && minutos === 58) {
    confighora(20);
  } else if (horas === 19 && minutos === 58) {
    confighora(21);
  } else if (horas === 20 && minutos === 58) {
    confighora(22);
  } else if (horas === 21 && minutos === 58) {
    confighora(23);
  } else if (horas === 22 && minutos === 58) {
    confighora(0);
  }
}, 50000);

function confighora(horaenvio) {
  const texto1 = "*HORÁRIOS PAGANTES*\n"+
                 "Lembrando que são palpites.🎰\n\n"+
                 "* 🐮 FORTUNE OX 🐮 :*\n"+
                 horaenvio+":02  |  "+horaenvio+":07  |  "+horaenvio+":11  |  "+horaenvio+":17  |  "+horaenvio+":21  |  "+horaenvio+":29  |  "+horaenvio+":30  |  "+horaenvio+":31  |  "+horaenvio+":40  |  "+horaenvio+":42  |  "+horaenvio+":49  |\n\n"+
                 "* 🐯 FORTUNE TIGER 🐯 :*\n"+
                 horaenvio+":04  |  "+horaenvio+":09  |  "+horaenvio+":13  |  "+horaenvio+":17  |  "+horaenvio+":27  |  "+horaenvio+":29  |  "+horaenvio+":31  |  "+horaenvio+":33  |  "+horaenvio+":34  |  "+horaenvio+":51  |  "+horaenvio+":53  |\n\n"+
                "* 🐭 FORTUNE MOUSE 🐭 :*\n"+
                 horaenvio+":09  |  "+horaenvio+":11  |  "+horaenvio+":14  |  "+horaenvio+":21  |  "+horaenvio+":25  |  "+horaenvio+":27  |  "+horaenvio+":31  |  "+horaenvio+":45  |  "+horaenvio+":49  |  "+horaenvio+":54  |\n\n"+
                 "* 🐇 FORTUNE RABBIT 🐇 :*\n"+
                 horaenvio+":05  |  "+horaenvio+":19  |  "+horaenvio+":20  |  "+horaenvio+":23  |  "+horaenvio+":33  |  "+horaenvio+":36  |  "+horaenvio+":40  |  "+horaenvio+":49  |  "+horaenvio+":56  |\n\n"+
                 "* 👙 BIKINI 👙 :*\n"+
                 horaenvio+":02  |  "+horaenvio+":23  |  "+horaenvio+":25  |  "+horaenvio+":29  |  "+horaenvio+":33  |  "+horaenvio+":42  |  "+horaenvio+":53  |  "+horaenvio+":55  |  "+horaenvio+":59  |\n\n"+
                 "* 🐘 GANESHA GOLD 🐘 :*\n"+
                 horaenvio+":01  |  "+horaenvio+":03  |  "+horaenvio+":07  |  "+horaenvio+":11  |  "+horaenvio+":23  |  "+horaenvio+":33  |  "+horaenvio+":37  |  "+horaenvio+":39  |  "+horaenvio+":49  |  "+horaenvio+":57  |\n\n"+
                "* 🐉🐲 DRAGON TIGER LUCK 🐲🐉 :*\n"+
                 horaenvio+":14  |  "+horaenvio+":15  |  "+horaenvio+":25  |  "+horaenvio+":34  |  "+horaenvio+":35  |  "+horaenvio+":44  |  "+horaenvio+":54  |  "+horaenvio+":55  |\n\n"+
                 "* 🐒 WILD APE 🐒 :*\n"+
                 horaenvio+":05  |  "+horaenvio+":07  |  "+horaenvio+":15  |  "+horaenvio+":33  |  "+horaenvio+":43  |  "+horaenvio+":45  |  "+horaenvio+":47  |  "+horaenvio+":53  |  "+horaenvio+":57  |\n\n"+
                 "* 🐉 FORTUNE DRAGON 🐉 :*\n"+
                 horaenvio+":07  |  "+horaenvio+":11  |  "+horaenvio+":13  |  "+horaenvio+":17  |  "+horaenvio+":23  |  "+horaenvio+":27  |  "+horaenvio+":33  |  "+horaenvio+":41  |  "+horaenvio+":51  |  "+horaenvio+":53  |\n\n"+
                 "* 💰 CASH MANIA 💰 :*\n"+
                 horaenvio+":12  |  "+horaenvio+":28  |  "+horaenvio+":32  |  "+horaenvio+":38  |  "+horaenvio+":42  |  "+horaenvio+":52  |  "+horaenvio+":58  |\n\n"+
                "* 🐷 LUCKEY PIGGY 🐷 :*\n"+
                 horaenvio+":00  |  "+horaenvio+":03  |  "+horaenvio+":10  |  "+horaenvio+":21  |  "+horaenvio+":23  |  "+horaenvio+":33  |  "+horaenvio+":40  |  "+horaenvio+":41  |  "+horaenvio+":51  |\n\n"+
                 "* 🔥⚽ FUTEBOL FEVER ⚽🔥 :*\n"+
                 horaenvio+":00  |  "+horaenvio+":05  |  "+horaenvio+":10  |  "+horaenvio+":18  |  "+horaenvio+":25  |  "+horaenvio+":28  |  "+horaenvio+":35  |  "+horaenvio+":38  |  "+horaenvio+":40  |  "+horaenvio+":58  |\n\n"+
                 "* ⚡ GATES OF OLYMPUS ⚡ :*\n"+
                 horaenvio+":06  |  "+horaenvio+":08  |  "+horaenvio+":12  |  "+horaenvio+":26  |  "+horaenvio+":28  |  "+horaenvio+":32  |  "+horaenvio+":36  |  "+horaenvio+":38  |  "+horaenvio+":42  |  "+horaenvio+":58  |\n\n"+
                 "* 🤠 COWBOYS GOLD 🤠 :*\n"+
                 horaenvio+":04  |  "+horaenvio+":08  |  "+horaenvio+":14  |  "+horaenvio+":38  |  "+horaenvio+":44  |  "+horaenvio+":48  |  "+horaenvio+":54  |  "+horaenvio+":58  |\n\n"+
                "* 🐲 DRAGON HERO 🐲 :*\n"+
                 horaenvio+":07  |  "+horaenvio+":15  |  "+horaenvio+":17  |  "+horaenvio+":25  |  "+horaenvio+":27  |  "+horaenvio+":35  |  "+horaenvio+":45  |  "+horaenvio+":47  |  "+horaenvio+":55  |\n\n"+
                 "* 💎 ELEMENTAL GEMS 💎 :*\n"+
                 horaenvio+":02  |  "+horaenvio+":07  |  "+horaenvio+":22  |  "+horaenvio+":27  |  "+horaenvio+":37  |  "+horaenvio+":47  |  "+horaenvio+":57  |\n\n"+
                 "* ➿ DOUBLE FORTUNE ➿ :*\n"+
                 horaenvio+":03  |  "+horaenvio+":19  |  "+horaenvio+":23  |  "+horaenvio+":26  |  "+horaenvio+":33  |  "+horaenvio+":39  |  "+horaenvio+":46  |  "+horaenvio+":49  |  "+horaenvio+":53  |  "+horaenvio+":56  |\n\n"+
                 "*JOGUEM COM RESPONSABILIDADE.*";
  const texto2 = "*HORÁRIOS PAGANTES*\n"+
                 "Lembrando que são palpites.🎰\n\n"+
                 "* 🐮 FORTUNE OX 🐮 :*\n"+
                 horaenvio+":07  |  "+horaenvio+":10  |  "+horaenvio+":17  |  "+horaenvio+":19  |  "+horaenvio+":31  |  "+horaenvio+":32  |  "+horaenvio+":40  |  "+horaenvio+":42  |  "+horaenvio+":51  |\n\n"+
                 "* 🐯 FORTUNE TIGER 🐯 :*\n"+
                 horaenvio+":01  |  "+horaenvio+":04  |  "+horaenvio+":07  |  "+horaenvio+":19  |  "+horaenvio+":21  |  "+horaenvio+":23  |  "+horaenvio+":33  |  "+horaenvio+":34  |  "+horaenvio+":37  |  "+horaenvio+":49  |  "+horaenvio+":51  |  "+horaenvio+":53  |\n\n"+
                "* 🐭 FORTUNE MOUSE 🐭 :*\n"+
                 horaenvio+":04  |  "+horaenvio+":05  |  "+horaenvio+":09  |  "+horaenvio+":17  |  "+horaenvio+":21  |  "+horaenvio+":24  |  "+horaenvio+":29  |  "+horaenvio+":31  |  "+horaenvio+":35  |  "+horaenvio+":37  |  "+horaenvio+":51  |  "+horaenvio+":54  |\n\n"+
                 "* 🐇 FORTUNE RABBIT 🐇 :*\n"+
                 horaenvio+":00  |  "+horaenvio+":05  |  "+horaenvio+":10  |  "+horaenvio+":13  |  "+horaenvio+":19  |  "+horaenvio+":23  |  "+horaenvio+":25  |  "+horaenvio+":30  |  "+horaenvio+":39  |  "+horaenvio+":43  |  "+horaenvio+":56  |\n\n"+
                 "* 👙 BIKINI 👙 :*\n"+
                 horaenvio+":09  |  "+horaenvio+":12  |  "+horaenvio+":22  |  "+horaenvio+":23  |  "+horaenvio+":25  |  "+horaenvio+":32  |  "+horaenvio+":33  |  "+horaenvio+":35  |  "+horaenvio+":49  |  "+horaenvio+":55  |  "+horaenvio+":59  |\n\n"+
                 "* 🐘 GANESHA GOLD 🐘 :*\n"+
                 horaenvio+":01  |  "+horaenvio+":13  |  "+horaenvio+":17  |  "+horaenvio+":21  |  "+horaenvio+":27  |  "+horaenvio+":39  |  "+horaenvio+":43  |  "+horaenvio+":49  |  "+horaenvio+":51  |  "+horaenvio+":57  |  "+horaenvio+":59  |\n\n"+
                "* 🐉🐲 DRAGON TIGER LUCK 🐲🐉 :*\n"+
                 horaenvio+":04  |  "+horaenvio+":05  |  "+horaenvio+":15  |  "+horaenvio+":24  |  "+horaenvio+":25  |  "+horaenvio+":34  |  "+horaenvio+":35  |  "+horaenvio+":44  |  "+horaenvio+":54  |\n\n"+
                 "* 🐒 WILD APE 🐒 :*\n"+
                 horaenvio+":05  |  "+horaenvio+":13  |  "+horaenvio+":25  |  "+horaenvio+":27  |  "+horaenvio+":33  |  "+horaenvio+":45  |  "+horaenvio+":47  |  "+horaenvio+":55  |  "+horaenvio+":57  |\n\n"+
                 "* 🐉 FORTUNE DRAGON 🐉 :*\n"+
                 horaenvio+":07  |  "+horaenvio+":11  |  "+horaenvio+":13  |  "+horaenvio+":27  |  "+horaenvio+":31  |  "+horaenvio+":33  |  "+horaenvio+":41  |  "+horaenvio+":51  |  "+horaenvio+":57  |\n\n"+
                 "* 💰 CASH MANIA 💰 :*\n"+
                 horaenvio+":08  |  "+horaenvio+":12  |  "+horaenvio+":18  |  "+horaenvio+":22  |  "+horaenvio+":32  |  "+horaenvio+":42  |  "+horaenvio+":48  |  "+horaenvio+":52  |\n\n"+
                "* 🐷 LUCKEY PIGGY 🐷 :*\n"+
                 horaenvio+":00  |  "+horaenvio+":10  |  "+horaenvio+":11  |  "+horaenvio+":20  |  "+horaenvio+":21  |  "+horaenvio+":30  |  "+horaenvio+":33  |  "+horaenvio+":41  |  "+horaenvio+":43  |  "+horaenvio+":51  |  "+horaenvio+":53  |\n\n"+
                 "* 🔥⚽ FUTEBOL FEVER ⚽🔥 :*\n"+
                 horaenvio+":00  |  "+horaenvio+":08  |  "+horaenvio+":10  |  "+horaenvio+":15  |  "+horaenvio+":18  |  "+horaenvio+":25  |  "+horaenvio+":35  |  "+horaenvio+":38  |  "+horaenvio+":40  |  "+horaenvio+":45  |\n\n"+
                 "* ⚡ GATES OF OLYMPUS ⚡ :*\n"+
                 horaenvio+":08  |  "+horaenvio+":12  |  "+horaenvio+":16  |  "+horaenvio+":22  |  "+horaenvio+":26  |  "+horaenvio+":36  |  "+horaenvio+":38  |  "+horaenvio+":42  |  "+horaenvio+":56  |  "+horaenvio+":58  |\n\n"+
                 "* 🤠 COWBOYS GOLD 🤠 :*\n"+
                 horaenvio+":04  |  "+horaenvio+":24  |  "+horaenvio+":28  |  "+horaenvio+":34  |  "+horaenvio+":38  |  "+horaenvio+":48  |\n\n"+
                "* 🐲 DRAGON HERO 🐲 :*\n"+
                 horaenvio+":05  |  "+horaenvio+":07  |  "+horaenvio+":17  |  "+horaenvio+":27  |  "+horaenvio+":35  |  "+horaenvio+":45  |  "+horaenvio+":47  |  "+horaenvio+":55  |\n\n"+
                 "* 💎 ELEMENTAL GEMS 💎 :*\n"+
                 horaenvio+":12  |  "+horaenvio+":17  |  "+horaenvio+":27  |  "+horaenvio+":37  |  "+horaenvio+":42  |  "+horaenvio+":47  |  "+horaenvio+":52  |  "+horaenvio+":57  |\n\n"+
                 "* ➿ DOUBLE FORTUNE ➿ :*\n"+
                 horaenvio+":09  |  "+horaenvio+":13  |  "+horaenvio+":26  |  "+horaenvio+":29  |  "+horaenvio+":36  |  "+horaenvio+":43  |  "+horaenvio+":53  |  "+horaenvio+":56  |  "+horaenvio+":59  |\n\n"+
                 "*JOGUEM COM RESPONSABILIDADE.*";                 
    const texto3 = "*HORÁRIOS PAGANTES*\n"+
                 "Lembrando que são palpites.🎰\n\n"+
                 "* 🐮 FORTUNE OX 🐮 :*\n"+
                 horaenvio+":09  |  "+horaenvio+":10  |  "+horaenvio+":11  |  "+horaenvio+":17  |  "+horaenvio+":19  |  "+horaenvio+":21  |  "+horaenvio+":40  |  "+horaenvio+":42  |  "+horaenvio+":47  |  "+horaenvio+":52  |\n\n"+
                 "* 🐯 FORTUNE TIGER 🐯 :*\n"+
                 horaenvio+":03  |  "+horaenvio+":07  |  "+horaenvio+":11  |  "+horaenvio+":21  |  "+horaenvio+":33  |  "+horaenvio+":37  |  "+horaenvio+":44  |  "+horaenvio+":53  |  "+horaenvio+":59  |\n\n"+
                "* 🐭 FORTUNE MOUSE 🐭 :*\n"+
                 horaenvio+":04  |  "+horaenvio+":07  |  "+horaenvio+":11  |  "+horaenvio+":15  |  "+horaenvio+":19  |  "+horaenvio+":24  |  "+horaenvio+":25  |  "+horaenvio+":37  |  "+horaenvio+":44  |  "+horaenvio+":49  |  "+horaenvio+":51  |\n\n"+
                 "* 🐇 FORTUNE RABBIT 🐇 :*\n"+
                 horaenvio+":03  |  "+horaenvio+":06  |  "+horaenvio+":09  |  "+horaenvio+":10  |  "+horaenvio+":13  |  "+horaenvio+":25  |  "+horaenvio+":30  |  "+horaenvio+":43  |  "+horaenvio+":45  |  "+horaenvio+":56  |\n\n"+
                 "* 👙 BIKINI 👙 :*\n"+
                 horaenvio+":02  |  "+horaenvio+":09  |  "+horaenvio+":12  |  "+horaenvio+":23  |  "+horaenvio+":25  |  "+horaenvio+":35  |  "+horaenvio+":39  |  "+horaenvio+":42  |  "+horaenvio+":45  |  "+horaenvio+":49  |  "+horaenvio+":53  |\n\n"+
                 "* 🐘 GANESHA GOLD 🐘 :*\n"+
                 horaenvio+":09  |  "+horaenvio+":11  |  "+horaenvio+":21  |  "+horaenvio+":37  |  "+horaenvio+":43  |  "+horaenvio+":47  |  "+horaenvio+":49  |  "+horaenvio+":53  |\n\n"+
                "* 🐉🐲 DRAGON TIGER LUCK 🐲🐉 :*\n"+
                 horaenvio+":05  |  "+horaenvio+":14  |  "+horaenvio+":15  |  "+horaenvio+":35  |  "+horaenvio+":44  |  "+horaenvio+":45  |  "+horaenvio+":54  |  "+horaenvio+":55  |\n\n"+
                 "* 🐒 WILD APE 🐒 :*\n"+
                 horaenvio+":07  |  "+horaenvio+":13  |  "+horaenvio+":23  |  "+horaenvio+":25  |  "+horaenvio+":27  |  "+horaenvio+":47  |  "+horaenvio+":55  |\n\n"+
                 "* 🐉 FORTUNE DRAGON 🐉 :*\n"+
                 horaenvio+":01  |  "+horaenvio+":07  |  "+horaenvio+":11  |  "+horaenvio+":17  |  "+horaenvio+":23  |  "+horaenvio+":37  |  "+horaenvio+":43  |  "+horaenvio+":47  |  "+horaenvio+":51  |  "+horaenvio+":53  |\n\n"+
                 "* 💰 CASH MANIA 💰 :*\n"+
                 horaenvio+":02  |  "+horaenvio+":12  |  "+horaenvio+":18  |  "+horaenvio+":22  |  "+horaenvio+":28  |  "+horaenvio+":38  |  "+horaenvio+":42  |  "+horaenvio+":48  |  "+horaenvio+":52  |\n\n"+
                "* 🐷 LUCKEY PIGGY 🐷 :*\n"+
                 horaenvio+":00  |  "+horaenvio+":01  |  "+horaenvio+":03  |  "+horaenvio+":11  |  "+horaenvio+":13  |  "+horaenvio+":21  |  "+horaenvio+":30  |  "+horaenvio+":31  |  "+horaenvio+":33  |  "+horaenvio+":40  |  "+horaenvio+":43  |  "+horaenvio+":50  |\n\n"+
                 "* 🔥⚽ FUTEBOL FEVER ⚽🔥 :*\n"+
                 horaenvio+":00  |  "+horaenvio+":08  |  "+horaenvio+":25  |  "+horaenvio+":28  |  "+horaenvio+":35  |  "+horaenvio+":40  |  "+horaenvio+":45  |\n\n"+
                 "* ⚡ GATES OF OLYMPUS ⚡ :*\n"+
                 horaenvio+":02  |  "+horaenvio+":06  |  "+horaenvio+":08  |  "+horaenvio+":12  |  "+horaenvio+":22  |  "+horaenvio+":26  |  "+horaenvio+":32  |  "+horaenvio+":38  |  "+horaenvio+":46  |\n\n"+
                 "* 🤠 COWBOYS GOLD 🤠 :*\n"+
                 horaenvio+":08  |  "+horaenvio+":14  |  "+horaenvio+":18  |  "+horaenvio+":24  |  "+horaenvio+":38  |  "+horaenvio+":44  |  "+horaenvio+":48  |  "+horaenvio+":54  |  "+horaenvio+":58  |\n\n"+
                "* 🐲 DRAGON HERO 🐲 :*\n"+
                 horaenvio+":15  |  "+horaenvio+":17  |  "+horaenvio+":25  |  "+horaenvio+":27  |  "+horaenvio+":35  |  "+horaenvio+":37  |  "+horaenvio+":45  |  "+horaenvio+":47  |  "+horaenvio+":57  |\n\n"+
                 "* 💎 ELEMENTAL GEMS 💎 :*\n"+
                 horaenvio+":02  |  "+horaenvio+":12  |  "+horaenvio+":27  |  "+horaenvio+":37  |  "+horaenvio+":47  |  "+horaenvio+":52  |  "+horaenvio+":57  |\n\n"+
                 "* ➿ DOUBLE FORTUNE ➿ :*\n"+
                 horaenvio+":06  |  "+horaenvio+":09  |  "+horaenvio+":13  |  "+horaenvio+":16  |  "+horaenvio+":23  |  "+horaenvio+":26  |  "+horaenvio+":39  |  "+horaenvio+":43  |  "+horaenvio+":49  |  "+horaenvio+":53  |  "+horaenvio+":56  |\n\n"+
                 "*JOGUEM COM RESPONSABILIDADE.*";  
  const textos = [texto1, texto2, texto3];               
  const mensagemTexto = get_random(textos);               
  function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  }
  
  client.getChats().then(chats => {
    const groups = chats.filter(chat => chat.isGroup);
        if (groups.length == 0) {
        }
        else {
          groups.forEach((group, i) => {
            setTimeout(function() {
              try {
                group.sendMessage(mensagemTexto)
              } catch(e){
                console.log('erro ao enviar msg');
              }
            },1000 + Math.floor(Math.random() * 4000) * (i+1) )
         });
       }
      }); 
};

// EVENTO DE ESCUTA DE MENSAGENS RECEBIDAS PELA API
client.on('message', async msg => {
  if (msg.body === null) return;
  // REMOVER LINKS
  const chat = await client.getChatById(msg.id.remote);
  for (const participant of chat.participants) {
    if (participant.id._serialized === msg.author && participant.isAdmin) {
      return;
    }
    if ((participant.id._serialized === msg.author && !participant.isAdmin) &&
        (msg.body.toLowerCase().includes("www")
          || msg.body.toLowerCase().includes("http")
          || msg.body.toLowerCase().includes("https")
          || msg.body.toLowerCase().includes(".br")
          || msg.body.toLowerCase().includes("://")
          || msg.body.toLowerCase().includes(".com.br")
          || msg.body.toLowerCase().includes(".com"))){
      try{
        await msg.delete(true)
        await client.sendMessage(msg.from, "🤚🛑 link não autorizado 🛑🤚")
      } catch (e){
        console.log('© Inácio Informatica')
      }
    }
  }
});

// COMANDO BOT
client.on('message', async msg => {
  if (msg.body === null) return;
  // ENVIAR MSG COM TEMPO DETERMINADO 
  // if (msg.body.startsWith('!pdrs ') && msg.hasQuotedMsg) {
  //   if (!permissaoBot.includes(msg.author || msg.from)) return msg.reply("Você não pode enviar esse comando.");
  //   const quotedMsg = await msg.getQuotedMessage();
  //   const attachmentData = await quotedMsg.downloadMedia();
    
  //   nomemedia = setInterval(() => {
      
  //   }, 10000);
  //   console.log(nomemedia);
    
    // let temporizador = msg.body.slice(6);
    
    // client.getChats().then(chats => {
    //   const groups = chats.filter(chat => chat.isGroup);
    //   if (groups.length == 0) {
    //     msg.reply('Você não tem grupos.');
    //   }
    //   else {
    //     if (temporizador === 0) {
    //       clearInterval(idinterval);
    //     } else {          
    //       var idinterval = setInterval(() => {
    //         groups.forEach((group, i) => {
    //         setTimeout(function() {
    //           try{
                
    //             client.sendMessage(msg.from, attachmentData, { caption: quotedMsg.body });
                 
    //           } catch(e){
    //           }
    //         },1000 + Math.floor(Math.random() * 4000) * (i+1) )
    //         });
    //       }, temporizador);
    //     }
    //     console.log(idinterval)
    //   }
   // });
 // }   
  // MUDAR TITULO TODOS GRUPOS Q BOT FOR ADMIN
  if (msg.body.startsWith('!ass ')) {
    if (!permissaoBot.includes(msg.author || msg.from)) return msg.reply("Você não pode enviar esse comando.");
    let newSubject = msg.body.slice(5);
    client.getChats().then(chats => {
      const groups = chats.filter(chat => chat.isGroup);
      if (groups.length == 0) {
        msg.reply('Você não tem grupos.');
      }
      else {
        groups.forEach((group, i) => {
          setTimeout(function() {
            try{
              group.setSubject(newSubject);
              console.log('Assunto alterado para o grupo: ' + group.name);
            } catch(e){
              console.log('Erro ao alterar assunto do grupo: ' + group.name);
            }
          },1000 + Math.floor(Math.random() * 4000) * (i+1) )
        });
      }
    });
  }
  // ALTERAR DESCRIÇÃO TODOS GRUPOS Q BOT FOR ADMIN
  else if (msg.body.startsWith('!desc ')) {
    // MUDAR DESCRICAO DO GRUPO
    if (!permissaoBot.includes(msg.author || msg.from)) return msg.reply("Você não pode enviar esse comando.");
    let newDescription = msg.body.slice(6);
    client.getChats().then(chats => {
      const groups = chats.filter(chat => chat.isGroup);
      if (groups.length == 0) {
        msg.reply('Você não tem grupos.');
      }
      else {
        groups.forEach((group, i) => {
          setTimeout(function() {
            try{
              group.setDescription(newDescription);
              console.log('Descrição alterada para o grupo: ' + group.name);
            } catch(e){
              console.log('Erro ao alterar descrição do grupo: ' + group.name);
            }
          },1000 + Math.floor(Math.random() * 4000) * (i+1) )
        });
      }
    });
  }
  // FECHAR TODOS GRUPOS Q BOT FOR ADMIN
  else if (msg.body.startsWith('!fcgr')) {
    // FECHAR TODOS OS GRUPOS QUE O BOT É ADMIN;
    if (!permissaoBot.includes(msg.author || msg.from)) return msg.reply("Você não pode enviar esse comando.");
    client.getChats().then(chats => {
      const groups = chats.filter(chat => chat.isGroup);
      if (groups.length == 0) {
        msg.reply('Você não tem grupos.');
      }
      else {
        groups.forEach((group, i) => {
          setTimeout(function() {
            try {
              group.setMessagesAdminsOnly(true);
              console.log('Grupo fechado: ' + group.name);
            } catch(e){
              console.log('Erro ao fechar grupo: ' + group.name);
            }
          },1000 + Math.floor(Math.random() * 4000) * (i+1) )
        });
      }
    });
  }
  // ABRIR TODOS GRUPOS Q BOT FOR ADMIN
  else if (msg.body.startsWith('!abrgr')) {
  //ABRIR TODOS OS GRUPOS QUE O BOT É ADMIN;
  if (!permissaoBot.includes(msg.author || msg.from)) return msg.reply("Você não pode enviar esse comando.");
  client.getChats().then(chats => {
    const groups = chats.filter(chat => chat.isGroup);
      if (groups.length == 0) {
        msg.reply('Você não tem grupos.');
      }
      else {
        groups.forEach((group, i) => {
          setTimeout(function() {
            try {
              group.setMessagesAdminsOnly(false);
              console.log('Grupo aberto: ' + group.name);
            } catch(e){
              console.log('Erro ao abrir grupo: ' + group.name);
            }
          },1000 + Math.floor(Math.random() * 4000) * (i+1) )
        });
      }
    });
  }
});

// ENVIAR MSG COM MENÇÃO AOS PARTICIPANTES
client.on('message_create', async msg => {
  if (msg.body === '!pdr'&& msg.hasQuotedMsg) {
    const chat = await client.getChatById(msg.id.remote);
    let mentions = [];
    for(let participant of chat.participants) {
      if (participant.id._serialized === msg.author && !participant.isAdmin) 
        return msg.reply("Você não pode enviar esse comando.");
      try{
        const contact = await client.getContactById(participant.id._serialized);
        mentions.push(contact);
        } catch (e)
          {console.log('© Bot Zeus: '+e);}
      }
      const quotedMsg = await msg.getQuotedMessage();  
      if (quotedMsg.hasMedia) {
        const attachmentData = await quotedMsg.downloadMedia();
        await client.sendMessage(msg.from, attachmentData, { caption: quotedMsg.body, mentions: mentions});
      }        
      
  }}); 

// EVENTO DE NOVO USUÁRIO EM GRUPO
client.on('group_join', async (notification) => {
  // LISTAR GRUPOS
  const groups = await client.getChats()
  console.log('-----------------------------\nBOT-Zeus Grupos atualizados:\n-----------------------------')
  try{
    for (const group of groups){
      if(group.id.server.includes('g.us')){
        console.log('Nome: ' + group.name + ' - ID: ' + group.id._serialized.replace(/\D/g,''))
      }
    }
  } catch (e){
    console.log('© Inacio Informatica')
  }

  // GRAVAR USUÁRIOS DO GRUPOS
  try{
    const contact = await client.getContactById(notification.id.participant)
    const nomeContato = (contact.pushname === undefined) ? contact.verifiedName : contact.pushname;
    const user = notification.id.participant.replace(/\D/g, '');
    const getUserFrom = await getUser(user);

    if (getUserFrom === false) {
      await setUser(user, nomeContato);
      console.log('Usuário armazenado: ' + user + ' - ' + nomeContato)
    }

    if (getUserFrom !== false) {
      console.log('Usuário já foi armazenado')
    }
  }
  catch(e){
    console.log('Não foi possível armazenar o usuário' + e)
  }  

  // MENSAGEM DE SAUDAÇÃO
  if (notification.id.remote) {
    const contact = await client.getContactById(notification.id.participant)
    const texto1 = ', tudo bem? Seja bem vindo ao grupo *DICAS DAS GAROTAS*🎰💕🍀\n\n👉 *Se vocês estão procurando um grupo que divulga plataformas confiáveis estão no lugar certo…*\n\n📌Aqui postamos plataformas com gerentes confiáveis, horários, link de porcentagem, dicas de estratégias e sorteios de bancas\n\nQuem não quiser participar pode estar saindo sem problemas 🫶🏼\n\n📌*O INTUITO AQUI É VÊ VOCÊS FAZENDO GRANDES GANHOS*🥰\n\n🔞 Proibido para menores de 18 anos\nJOGUE COM RESPONSABILIDADE\nBoa Sorte';
    const textos = [texto1];

    const mensagemTexto = `@${contact.number}!` + textos;
    const chat = await client.getChatById(notification.id.remote);

    console.log('Grupo: ' + notification.id.remote + ' - Mensagem: ' + mensagemTexto);

    delay(1000).then(async function() {
      try {
        chat.sendStateTyping();
      } catch(e){
        console.log('© Inacio Informatica: '+e)
      }
    });

    delay(5000).then(async function() {
      try{
        client.sendMessage(notification.id.remote, mensagemTexto, { mentions: [contact] });
        chat.clearState();
      } catch(e){
        console.log('© Inacio Informatica')
      }
    });
  }
});

// INITIALIZE DO SERVIÇO
server.listen(port, function() {
  console.log('© Bot Zeus - Aplicativo rodando na porta *: ' + port);
});
