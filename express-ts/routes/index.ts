import express, { NextFunction, Request, Response, Router } from "express";
import path from "path";

const router: Router = express.Router();

router.get('/set', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'set.html'));
})

router.post('/set', (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Location', '/home');
    res.statusCode = 302;
    res.redirect('/home');
})

router.get('/home', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'))
})

export default router;