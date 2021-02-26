

const requestListener = function (req, res) {
    
    switch(req.url) {
        case "/books":
            res.writeHead(200);
            res.end(books)
            break;
        case "/authors":
            res.writeHead(200);
            res.end(authors);
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error: 'Resource not found'}));
    }
}

module.exports = requestListener;
