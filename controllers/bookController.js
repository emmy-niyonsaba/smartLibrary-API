
import Book from "../models/Book.js";

export const createBook = async (req, res) => {
    try {
        const {
            title,
            isbn,
            author,
            publisher,
            publicationYear,
            category,
            language,
            description,
            coverImage
        } = req.body;

        // Check if ISBN already exists
        const existingBook = await Book.findOne({ where: { isbn } });
        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: "Book with this ISBN already exists"
            });
        }

        const book = await Book.create({
            title,
            isbn,
            author,
            publisher,
            publicationYear,
            category,
            language,
            description,
            coverImage
        });

        res.status(201).json({
            success: true,
            message: "Book Is successfully",
            data: book
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating book",
            error: error.message
        });
    }
};



// ✅ GET ALL BOOKS
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching books",
            error: error.message
        });
    }
};



// ✅ GET SINGLE BOOK
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            data: book
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching book",
            error: error.message
        });
    }
};



// ✅ UPDATE BOOK
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        await book.update(req.body);

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating book",
            error: error.message
        });
    }
};



// ✅ DELETE BOOK
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        await book.destroy();

        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting book",
            error: error.message
        });
    }
};