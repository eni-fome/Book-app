import Joi from "joi";

const bookSchema = Joi.object({
	title: Joi.string().required().max(100).trim(),
	author: Joi.string().required().max(50).trim(),
	publishYear: Joi.number()
		.integer()
		.min(1800)
		.max(new Date().getFullYear())
		.required(),
	synopsis: Joi.string().required().max(500).trim(),
});

export const validateBook = (req, res, next) => {
	const { error } = bookSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};
