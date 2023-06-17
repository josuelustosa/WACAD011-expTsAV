import { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  res.render('main/index');
};

const about = (req: Request, res: Response) => {
  res.render('main/about');
};

const ui = (req: Request, res: Response) => {
  res.render('main/ui');
};

const departamento = (req: Request, res: Response) => {
  res.render('departamento/index');
};

export default { index, about, ui, departamento };
