const express =require('express');
const {createMovies, getAllMovie, getMovie, updateMovie, deleteMovie, movieListAggregation} = require('../controller/Movies');
const { authorization } = require('../Mallware/Auth');


const router =express.Router();

router.route('/create/movie').post(authorization ,createMovies);
router.route('/get/all/movie').get(authorization, getAllMovie);
router.route('/get/movie/:id').get(authorization, getMovie);
router.route('/update/movie/:id').put(authorization, updateMovie);
router.route('/delete/movie/:id').delete(authorization, deleteMovie);
router.route('/movie/aggregation').post(authorization, movieListAggregation)

module.exports= router;