import {IncomingMessage, Server, ServerResponse, createServer} from "http";
import { writeFile } from 'fs';
const onGetForm = (res: ServerResponse) => {
    res.write('<html>');
    res.write('<head><title>Hello World!</title></head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    res.end();
}

const onSaveData = (req: IncomingMessage, res: ServerResponse) => {
    const body: Uint8Array[] = [];
    req.on('data', (chunck: Uint8Array) => {
        body.push(chunck)
    })

    return req.on('end', (err: Error) => {
        const message = Buffer.concat(body).toString().split('=')[1];

        writeFile('message.txt', message, (err) => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        })
    })
}
const routes = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    switch (url) {
        case '/':
            switch (method) {
                case 'GET':
                    onGetForm(res);
                    break;
                case 'PUT':
                    break;
                case 'POST':
                    break;
                case 'DELETE':
                    break;
            }
            break;
        case '/message':
            switch (method) {
                case 'GET':
                    break;
                case 'PUT':
                    break;
                case 'POST':
                    onSaveData(req, res);
                    break;
                case 'DELETE':
                    break;
            }
            break;
    }
}

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routes(req, res);
});

server.listen(3003)

