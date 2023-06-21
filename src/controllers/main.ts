import { NextFunction, Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  res.render('main/index');
};

const about = (req: Request, res: Response) => {
  res.render('main/about');
};

const ui = (req: Request, res: Response) => {
  res.render('main/ui');
};

const createCookie = (req: Request, res: Response) => {
  if (!req.cookies['nomeCookie']) {
    res.cookie('nomeCookie', 'valorCookie');
    res.send('Você nunca passou por aqui!');
  } else {
    res.send('Você já passou por aqui!');
  }
};

const clearCookie = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('nomeCookie');
  res.send('Cookie Apagado!');
};

const login = (req: Request, res: Response) => {
  if (req.route.methods.get) {
    res.render('main/login');
  } else {
    const { username, password } = req.body;

    if (username === 'user' && password === '12345') {
      res.cookie('logado', true);
      res.redirect('/');
    } else {
      res.render('main/login', {
        username,
        password,
        messageError: true,
      });
    }
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('logado');
  res.redirect('/');
};

const departamento = (req: Request, res: Response) => {
  res.render('departamento/index');
};

export default {
  index,
  about,
  ui,
  createCookie,
  clearCookie,
  login,
  logout,
  departamento,
};
