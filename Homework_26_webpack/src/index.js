import $ from 'jquery';
import './style_skeleton/normalize.css'
import './style_skeleton/skeleton.css'
import './style_skeleton/main_style.css'

import Controller from './mvc/controller/Controller';

new Controller($('#root'));
