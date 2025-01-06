import Joi from "joi";

export const validateBook = (req, res, next) => {
	const schema = Joi.object({
		title: Joi.string().required(),
		author: Joi.string().required(),
		publishYear: Joi.number().required(),
		synopsis: Joi.string().required(), // Remove any length constraints
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};
