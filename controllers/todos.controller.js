const { validationResult } = require('express-validator');
const Todo = require('../models/todo.model');
const pagination = +process.env.DEFAULT_PAGINATION;
const defaultExcerption = require('../excerptions/default.excerption');

validation = (req, res) => {
    const valid = validationResult(req);

    if (!valid) {
        return res.status(400).json(valid);
    }
}

const fields = ['title', 'description', 'isCompleted'];

const index = async (req, res) => {
    validation(req, res);

    const paginate = {
        total: await Todo.countDocuments(),
        page: +req.query.page || 1,
    }

    const offset = (paginate.page - 1) * pagination;

    paginate.next = (!paginate.page || paginate.page === 1) && paginate.total / pagination > paginate.page ? paginate.page + 1 : null;
    paginate.prev = !paginate.page || paginate.page === 1 ? null : paginate.page - 1;

    return res.json({
        data: await Todo.find({ userId: req.user.id }).skip(offset).limit(pagination).select(fields.join(' ')),
        meta: paginate
    });
}

module.exports.index = index;

module.exports.show = async (req, res) => {
    try {
        const candidate = await Todo.findById(req.params.todo).select([...fields, 'comments'].join(' '));

        if (!candidate) await defaultExcerption(res, {}, 'Not found...', 404);

        res.json({
            data: candidate
        })
    } catch (error) {
        await defaultExcerption(res, error);
    }
}

module.exports.store = async (req, res) => {
    try {
        const todo = await new Todo({ ...req.body, userId: req.user.id });

        await todo.save();

        res.json({
            data: todo,
            meta: { message: 'Todo was created.' }
        }, 201);
    } catch (error) {
        await defaultExcerption(res, error);
    }
}

module.exports.update = async (req, res) => {
    try {
        validation(req, res);

        const candidate = await Todo.findById(req.params.todo);

        if (!candidate) await defaultExcerption(res, {}, 'Not found...', 404);

        await candidate.updateOne(req.body);
        await candidate.save();

        res.json({
            data: null,
            meta: { message: 'Todo was updated.' }
        }, 200);
    } catch (error) {
        await defaultExcerption(res, error);
    }
}

module.exports.destroy = async (req, res) => {
    try {
        validation(req, res);

        const candidate = await Todo.findById(req.params.todo);

        if (!candidate) await defaultExcerption(res, {}, 'Not found...', 404);

        await candidate.remove();

        return await index(req, res);
    } catch (error) {
        await defaultExcerption(res, error);
    }
}

module.exports.destroyMultiple = async (req, res) => {
    try {
        await Todo.deleteMany({_id: req.body.todos});

        res.json({
            data: null,
            meta: { message: `Todos with ID\'s ${req.body.todos.join(', ')} was deleted.` }
        }, 200);
    } catch(error) {
        await defaultExcerption(res, error);
    }
}