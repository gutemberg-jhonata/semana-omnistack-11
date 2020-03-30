const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const { celebrate, Segments, Joi } = require('celebrate');
const router = express.Router();

router.post('/sessions', SessionController.create);

router.get('/ongs', OngController.index);
router.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().trim().regex(/^[0-9]{10,11}$/),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);
router.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);

router.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    })
}), IncidentController.index);
router.post('/incidents', IncidentController.create);
router.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

module.exports = router;