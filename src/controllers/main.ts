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

const createCookie = (req: Request, res: Response, next: NextFunction) => {
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

const departamento = (req: Request, res: Response) => {
  res.render('departamento/index');
};

export default { index, about, ui, createCookie, clearCookie, departamento };
