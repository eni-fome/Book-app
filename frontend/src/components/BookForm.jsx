// src/components/BookForm.jsx
import React, { useState } from "react";

const BookForm = ({ onSubmit, initialData = {} }) => {
	const [formData, setFormData] = useState({
		title: initialData.title || "",
		author: initialData.author || "",
		publishYear: initialData.publishYear || "",
		synopsis: initialData.synopsis || "",
		coverImage: null,
		rating: initialData.rating || 0,
	});
	const [previewUrl, setPreviewUrl] = useState(initialData.coverImage || "");
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prevData) => ({ ...prevData, coverImage: file }));
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const handleRatingChange = (newRating) => {
		setFormData((prevData) => ({ ...prevData, rating: newRating }));
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.title.trim()) newErrors.title = "Title is required";
		if (!formData.author.trim()) newErrors.author = "Author is required";
		if (!formData.publishYear)
			newErrors.publishYear = "Publish year is required";
		else if (
			formData.publishYear < 1800 ||
			formData.publishYear > new Date().getFullYear()
		) {
			newErrors.publishYear = "Invalid publish year";
		}
		if (!formData.synopsis.trim()) newErrors.synopsis = "Synopsis is required";
		else if (formData.synopsis.length > 500)
			newErrors.synopsis = "Synopsis must be 500 characters or less";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			const bookData = new FormData();
			for (const key in formData) {
				bookData.append(key, formData[key]);
			}
			onSubmit(bookData);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4">
			<div>
				<label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700">
					Title
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
				/>
				{errors.title && (
					<p className="mt-1 text-sm text-red-600">{errors.title}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="author"
					className="block text-sm font-medium text-gray-700">
					Author
				</label>
				<input
					type="text"
					id="author"
					name="author"
					value={formData.author}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
				/>
				{errors.author && (
					<p className="mt-1 text-sm text-red-600">{errors.author}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="publishYear"
					className="block text-sm font-medium text-gray-700">
					Publish Year
				</label>
				<input
					type="number"
					id="publishYear"
					name="publishYear"
					value={formData.publishYear}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
				/>
				{errors.publishYear && (
					<p className="mt-1 text-sm text-red-600">{errors.publishYear}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="synopsis"
					className="block text-sm font-medium text-gray-700">
					Synopsis
				</label>
				<textarea
					id="synopsis"
					name="synopsis"
					value={formData.synopsis}
					onChange={handleChange}
					rows={4}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
				/>
				{errors.synopsis && (
					<p className="mt-1 text-sm text-red-600">{errors.synopsis}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="coverImage"
					className="block text-sm font-medium text-gray-700">
					Cover Image
				</label>
				<input
					type="file"
					id="coverImage"
					name="coverImage"
					onChange={handleFileChange}
					accept="image/*"
					className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-amber-50 file:text-amber-700
            hover:file:bg-amber-100"
				/>
				{previewUrl && (
					<img
						src={previewUrl}
						alt="Book Cover Preview"
						className="mt-2 h-32 w-auto"
					/>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">
					Rating
				</label>
				<div className="flex items-center mt-1">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							onClick={() => handleRatingChange(star)}
							className={`text-2xl ${
								star <= formData.rating ? "text-yellow-400" : "text-gray-300"
							}`}>
							★
						</button>
					))}
				</div>
			</div>

			<div>
				<button
					type="submit"
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
					Save Book
				</button>
			</div>
		</form>
	);
};

export default BookForm;
