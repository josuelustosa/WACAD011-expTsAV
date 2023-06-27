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

const update = async (req: Request, res: Response) => {
  if (req.route.methods.get) {
    res.render('departamento/edit', {
      csrf: req.csrfToken(),
    });
  } else {
    const departamento = req.body;
    const departamentoId = req.params.id;
    try {
      const updatedDepartamento = await Departamentos.findByPk(departamentoId);
      if (!updatedDepartamento) {
        return res
          .status(404)
          .render('error', { message: 'Departamento não encontrado' });
      }

      await updatedDepartamento.update(departamento);

      res.redirect('/departamento');
    } catch (error: any) {
      console.log(error);
      res.render(`departamento/edit`, {
        departamento,
        errors: error.errors,
        csrf: req.csrfToken(),
      });
    }
  }
};

const remove = async (req: Request, res: Response) => {};

export default { index, read, create, update, remove };
