import { Request, Response } from 'express';
import { Departamentos } from '../models/Departamentos';

const index = async (req: Request, res: Response) => {
  const departamentos = await Departamentos.findAll();
  res.render('departamento', {
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

const read = async (req: Request, res: Response) => {
  const { id } = req.params;

  const departamento = await Departamentos.findByPk(id);

  if (!departamento) {
    return res
      .status(404)
      .render('error', { message: 'Departamento não encontrado' });
  }

  const dadosDepartamento = {
    id: departamento.id,
    name: departamento.name,
    sigla: departamento.sigla,
  };

  res.render(`departamento/edit`, {
    departamento: dadosDepartamento,
    csrf: req.csrfToken(),
  });
};

const edit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, sigla } = req.body;

  try {
    const dadosDepartamento = {
      name,
      sigla,
    };

    await Departamentos.update(dadosDepartamento, { where: { id } });

    res.redirect('/departamento');
  } catch (error: any) {
    console.log(error);
    res.render('error', {
      message: 'Ocorreu um erro ao editar o departamento',
    });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const departamento = await Departamentos.findByPk(id);
    if (!departamento) {
      return res
        .status(404)
        .render('error', { message: 'Departamento não encontrado' });
    }

    await departamento.destroy();

    res.redirect('/departamento');
  } catch (error: any) {
    console.log(error);
    res.render('error', {
      message: 'Ocorreu um erro ao excluir o departamento',
    });
  }
};

export default { index, read, create, edit, remove };
