import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
    res.json({
        message: 'Api route is working!',
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only update your account'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true});
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can delete only your account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        if (!req.user.isAdmin)
            res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
};

export const getUserListings = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can get only your listings'));
    }
    else 
    {
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        }
        catch (error) {
            next(error);
        }
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return next(errorHandler(404, 'User not found'));
        const {password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    }
    catch(error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin)
        return next(errorHandler(401, 'Access denied!'));
    try {
        const users = await User.find();
        const usersNoPw = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });
        
        const totalUsers = await User.countDocuments();

        const currentDate = new Date();
        const firstDayThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const firstDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);

        const newUsersLastMonth = await User.countDocuments({
            createdAt: { $gte: firstDayLastMonth, $lt: firstDayThisMonth }
        });

        const newUsersThisMonth = await User.countDocuments({
            createdAt: { $gte: firstDayThisMonth }
        });

        res.status(200).json({
            users: usersNoPw,
            totalUsers,
            newUsersLastMonth,
            newUsersThisMonth
        });
    }
    catch(error) {
        next(error);
    }
};