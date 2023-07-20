import { Request, Response } from 'express';
import { Departamentos } from '../models/Departamentos';

const index = async (req: Request, res: Response) => {
  const departamentos = await Departamentos.findAll();
  res.render('departamento/index', {
    departamentos: departamentos.map((dep) => dep.toJSON()),
  });
};

const create = async (req: Request, res: Response) => {
  if (req.route.methods.get) {
    res.render('departamento/create', {
      csrf: req.csrfToken(),
    });
  } else {
    const departamento = req.body;
    try {
      await Departamentos.create(departamento);
      res.redirect('/departamento');
    } catch (e: any) {
      console.log(e);
      res.render('departamento/create', {
        departamento,
        errors: e.errors,
        csrf: req.csrfToken(),
      });
    }
  }
};

const read = async (req: Request, res: Response) => {};

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log('ID do departamento a ser editado:', id);

  try {
    const departamento = await Departamentos.findByPk(id);

    if (!departamento) {
      return res
        .status(404)
        .render('error', { message: 'Departamento não encontrado' });
    }

    res.render(`departamento/edit`, {
      departamento,
      csrf: req.csrfToken(),
    });

    console.log('Departamento encontrado:', departamento);
  } catch (error: any) {
    console.log(error);
    res.render('error', {
      message: 'Ocorreu um erro ao editar o departamento',
    });
  }
};

const remove = async (req: Request, res: Response) => {};

export default { index, read, create, edit, remove };
