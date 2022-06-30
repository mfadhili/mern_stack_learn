/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst config = {\n  env: \"development\" || 0,\n  // differentiate btwn dev and production modes\n  port: process.env.PORT || 3001,\n  //listing port of the server\n  jwtSecret: process.env.JWT_SECRET || \"Your_secret_key\",\n  mongoUri: process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject' // location of Mongodb instance\n\n};\nconst _default = config;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(config, \"config\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/config/config.js\");\n  reactHotLoader.register(_default, \"default\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/config/config.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./config/config.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../config/config */ \"./config/config.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n // had to import as per official documentation  as seen here\n\n // the post request recieves emaila dn password in req.body. \n\nconst signin = async (req, res) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n      \"email\": req.body.email\n    });\n\n    if (!user) {\n      return res.status(401).json({\n        error: \"User not found\"\n      });\n    } //authenticate method from userschema model (SUSPECTING Bug here)\n\n\n    if (!user.authenticate(req.body.password)) {\n      return res.status(401).send({\n        error: \"Email or PAssword dont match.\"\n      });\n    } // generate signed jwt using secrete key and users id value -jwt module\n\n\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n      _id: user_id\n    }, _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret);\n    res.cookie('t', token, {\n      expire: new Date() + 9999\n    }); // set token to cookie in response object , authorization header setting in client side \n    //return signed jwt to authenticated client along with user details. \n\n    return res.json({\n      token,\n      user: {\n        _id: user._id,\n        name: user.name,\n        email: user.emil\n      }\n    });\n  } catch (err) {\n    return res.status(401).json({\n      error: \"Could not sign in\"\n    });\n  }\n};\n\nconst signout = (req, res) => {\n  res.clearCookie('t'); // clears response cookie containing the signed jwt\n\n  return res.status('200').json({\n    message: 'signed out'\n  }); //not mandatory unless cookies are used\n}; // authentication: verify if token is valid authorisation, otherwise it throws and authentication error\n\n\nconst requireSignin = (0,express_jwt__WEBPACK_IMPORTED_MODULE_2__.expressjwt)({\n  secret: _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret,\n  useProperty: 'auth',\n  algorithms: ['RS256'] // had to add algorithms property in jwt constructor\n\n}); // checks authorisation\n\nconst hasAuthorization = (req, res, next) => {\n  const authorised = req.profile && req.auth && req.profile._id == req.auth._id; // req.auth is populated by express-jwt while req.profile is populated by userById function in user.controller.js\n\n  if (!authorised) {\n    return res.status('403').json({\n      error: \"User is not authorized\"\n    });\n  }\n\n  next();\n};\n\nconst _default = {\n  signin,\n  signout,\n  requireSignin,\n  hasAuthorization\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(signin, \"signin\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/auth.controller.js\");\n  reactHotLoader.register(signout, \"signout\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/auth.controller.js\");\n  reactHotLoader.register(requireSignin, \"requireSignin\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/auth.controller.js\");\n  reactHotLoader.register(hasAuthorization, \"hasAuthorization\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/auth.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/auth.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/error.controller.js":
/*!************************************************!*\
  !*** ./server/controllers/error.controller.js ***!
  \************************************************/
/***/ (() => {

eval("var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n//# sourceURL=webpack://mern-skeleton/./server/controllers/error.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _error_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error.controller */ \"./server/controllers/error.controller.js\");\n/* harmony import */ var _error_controller__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_error_controller__WEBPACK_IMPORTED_MODULE_2__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n // create new user within POST request , calls save() to mongoose db\n\nconst create = async (req, res) => {\n  const user = new _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n\n  try {\n    await user.save(); // updsyet db\n\n    return res.status(200).json({\n      message: 'Successfully signed up !'\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _error_controller__WEBPACK_IMPORTED_MODULE_2___default().getErrorMessage(err) // if it faild validations from mongo db \n\n    });\n  }\n}; // had a bug here, await must go in hand with async\n\n\nconst list = async (req, res) => {\n  try {\n    let users = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().select('name email udated created');\n    res.json(users);\n  } catch (err) {\n    return res.status(400).json({\n      error: _error_controller__WEBPACK_IMPORTED_MODULE_2___default().getErrorMessage(err)\n    });\n  }\n};\n\nconst userByID = async (req, res, next, id) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id);\n    if (!user) return res.status(400).json({\n      error: \"User not found\"\n    });\n    req.profile = user; // user object is appended in profile key if it is found\n\n    next(); // propagate to next relevant controller function\n  } catch (err) {\n    return res.status(400).json({\n      error: \"Could not retrieve user\"\n    });\n  }\n};\n\nconst read = (req, res) => {\n  //retrieves user details then removes sensitive information\n  req.profile.hashed_password = undefined;\n  req.profile.salt = undefined;\n  return res.json(req.profile);\n};\n\nconst update = async (req, res, next) => {\n  try {\n    let user = req.profile; // retrieve user details \n\n    user = lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(user, req.body); // lodash to extend and merge the changes\n\n    user.updated = Date.now(); // timestamp\n\n    await user.save();\n    user.hashed_password = undefined; // clean sensitive data before sending in response\n\n    user.salt = undefined;\n    res.json(user);\n  } catch (err) {\n    return res.status(400).json({\n      error: _error_controller__WEBPACK_IMPORTED_MODULE_2___default().getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res, next) => {\n  try {\n    let user = req.profile;\n    let deletedUser = await user.remove(); // uses remove() query\n\n    deletedUser.hashed_password = undefined;\n    deletedUser.salt = undefined;\n    res.json(deletedUser);\n  } catch (err) {\n    return res.status(400).json({\n      error: _error_controller__WEBPACK_IMPORTED_MODULE_2___default().getErrorMessage(err)\n    });\n  }\n};\n\nconst _default = {\n  create,\n  list,\n  userByID,\n  read,\n  update,\n  remove\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(create, \"create\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/user.controller.js\");\n  reactHotLoader.register(list, \"list\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/user.controller.js\");\n  reactHotLoader.register(userByID, \"userByID\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/user.controller.js\");\n  reactHotLoader.register(read, \"read\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/user.controller.js\");\n  reactHotLoader.register(update, \"update\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/user.controller.js\");\n  reactHotLoader.register(remove, \"remove\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/user.controller.js\");\n  reactHotLoader.register(_default, \"default\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/controllers/user.controller.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ \"../../node_modules/compression/index.js\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../template */ \"./template.js\");\n/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/user.routes */ \"./server/routes/user.routes.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/auth.routes */ \"./server/routes/auth.routes.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().urlencoded({\n  extended: true\n}));\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());\napp.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(helmet__WEBPACK_IMPORTED_MODULE_5___default()());\napp.use(cors__WEBPACK_IMPORTED_MODULE_4___default()()); //mount routes\n\napp.use('/', _routes_user_routes__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\napp.use('/', _routes_auth_routes__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\napp.get('/', (req, res) => {\n  res.status(200).send(Template());\n}); // added to catch errs from authrelated errors\n\napp.use((err, req, res, next) => {\n  //express-jwt throws error named 'UnathorizedError' when a token cannot be validated \n  if (err.name === 'UnauthorizedError') {\n    res.status(401).json({\n      \"error\": err.name + \": \" + err.message\n    });\n  } else if (err) {\n    // for any server side errors are caught\n    res.status(400).json({\n      \"error\": err.name + \": \" + err.message\n    });\n    console.log(err);\n  }\n});\nconst _default = app;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(app, \"app\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/express.js\");\n  reactHotLoader.register(_default, \"default\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/express.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./server/express.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  name: {\n    type: String,\n    trim: true,\n    required: 'Name is required'\n  },\n  email: {\n    type: String,\n    trim: true,\n    unique: 'Email already exists',\n    match: [/.+\\..+/, 'please fill a valid email address'],\n    required: 'Email is required'\n  },\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: Date,\n  hashed_password: {\n    type: String,\n    required: \"Password is required\"\n  },\n  salt: String\n}); // password not stored on user document but handled virtually along with the salt value\n\nUserSchema.virtual('password').set(function (password) {\n  this._password = password;\n  this.salt = this.makeSalt();\n  this.hashed_password = this.encryptPassword(password);\n}).get(function () {\n  return this._password;\n});\nUserSchema.methods = {\n  // Authenticate - verify signing atempts by matching userprovided Passwd with the hashed_passwd\n  authenticate: function (plainText) {\n    return this.encryptPassword(plainText) === this.hashed_password;\n  },\n  //generates an encrypted hash from thr plain-text password using a unique salt and crypto module from node\n  encryptPasswords: function (password) {\n    if (!password) return '';\n\n    try {\n      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');\n    } catch (err) {\n      return '';\n    }\n  },\n  //generates unique and random salt using time and math.random\n  makeSalt: function () {\n    return Math.round(new Date().valueOf() * Math.random()) + '';\n  }\n}; //custom validation before the password is stored on the mongodb\n\nUserSchema.path('hashed_password').validate(function (v) {\n  if (this._password && this._password.lenght < 6) {\n    this.invalidate('password', 'Password must be atleast 6 characters');\n  }\n\n  if (this.isNew && !this._password) {\n    this.invalidate('password', 'Password is required');\n  }\n}, null);\n\nconst _default = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', UserSchema);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(UserSchema, \"UserSchema\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/models/user.model.js\");\n  reactHotLoader.register(_default, \"default\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/models/user.model.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./server/models/user.model.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route('/auth/signin').post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signin);\nrouter.route('/auth/signout').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signout);\nconst _default = router;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(router, \"router\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/routes/auth.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/routes/auth.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router(); //define the relevant http methods and assign corresponding controller function \n\nrouter.route('/api/users').get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list).post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route('/api/users/:userId').get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.param('userId', _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userByID);\nconst _default = router;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(router, \"router\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/routes/user.routes.js\");\n  reactHotLoader.register(_default, \"default\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/routes/user.routes.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./server/routes/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./config/config.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./express */ \"./server/express.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n(mongoose__WEBPACK_IMPORTED_MODULE_2___default().Promise) = global.Promise; // uses native ES^ promises\n\nmongoose__WEBPACK_IMPORTED_MODULE_2___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mongoUri, {\n  useNewUrlParser: true\n}); // used this connection procedure after the former one had issues\n\nconst db = (mongoose__WEBPACK_IMPORTED_MODULE_2___default().connection);\ndb.once('open', _ => {\n  console.log('Databse connected: ', _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mongoUri);\n});\ndb.on('error', err => {\n  console.error('connection error: ', err);\n}); // mongoose.connect(config.mongoUri,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }) // handle connection to Database\n// //  mongoose.connection.on('error', ()=>{\n//      throw new Error(`unable to connect to database: ${config.mongoUrl}`)\n//  })\n\n_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port, err => {\n  if (err) {\n    console.log(err);\n  }\n\n  console.info(`Server started on http://localhost/${_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port}`);\n});\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(db, \"db\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/server/server.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\nconst _default = () => {\n  return `\n     <!doctype html>\n     <html lang=\"en\">\n         <head>\n             <meta charSet=\"utf-8\"></meta>\n             <title>MERN Kickstart</title>     \n        </head>\n        <body>\n            <div id=\"root\"></div>\n            <script type=\"text/javascript\" src=\"/dist/bundle.js\">\n                \n            </script>\n        </body>\n     </html>`;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default); // html template will be rendered in the browser from request on the root url\n//div element will contain react component\n\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"/home/mfadhili/Software/nodejs/mern-skeleton/mern-skeleton/template.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton/./template.js?");

/***/ }),

/***/ "../../node_modules/compressible/index.js":
/*!************************************************!*\
  !*** ../../node_modules/compressible/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/*!\n * compressible\n * Copyright(c) 2013 Jonathan Ong\n * Copyright(c) 2014 Jeremiah Senkpiel\n * Copyright(c) 2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar db = __webpack_require__(/*! mime-db */ \"mime-db\")\n\n/**\n * Module variables.\n * @private\n */\n\nvar COMPRESSIBLE_TYPE_REGEXP = /^text\\/|\\+(?:json|text|xml)$/i\nvar EXTRACT_TYPE_REGEXP = /^\\s*([^;\\s]*)(?:;|\\s|$)/\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = compressible\n\n/**\n * Checks if a type is compressible.\n *\n * @param {string} type\n * @return {Boolean} compressible\n * @public\n */\n\nfunction compressible (type) {\n  if (!type || typeof type !== 'string') {\n    return false\n  }\n\n  // strip parameters\n  var match = EXTRACT_TYPE_REGEXP.exec(type)\n  var mime = match && match[1].toLowerCase()\n  var data = db[mime]\n\n  // return database information\n  if (data && data.compressible !== undefined) {\n    return data.compressible\n  }\n\n  // fallback to regexp or unknown\n  return COMPRESSIBLE_TYPE_REGEXP.test(mime) || undefined\n}\n\n\n//# sourceURL=webpack://mern-skeleton/../../node_modules/compressible/index.js?");

/***/ }),

/***/ "../../node_modules/compression/index.js":
/*!***********************************************!*\
  !*** ../../node_modules/compression/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/*!\n * compression\n * Copyright(c) 2010 Sencha Inc.\n * Copyright(c) 2011 TJ Holowaychuk\n * Copyright(c) 2014 Jonathan Ong\n * Copyright(c) 2014-2015 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar accepts = __webpack_require__(/*! accepts */ \"accepts\")\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"safe-buffer\").Buffer)\nvar bytes = __webpack_require__(/*! bytes */ \"bytes\")\nvar compressible = __webpack_require__(/*! compressible */ \"../../node_modules/compressible/index.js\")\nvar debug = __webpack_require__(/*! debug */ \"debug\")('compression')\nvar onHeaders = __webpack_require__(/*! on-headers */ \"../../node_modules/on-headers/index.js\")\nvar vary = __webpack_require__(/*! vary */ \"vary\")\nvar zlib = __webpack_require__(/*! zlib */ \"zlib\")\n\n/**\n * Module exports.\n */\n\nmodule.exports = compression\nmodule.exports.filter = shouldCompress\n\n/**\n * Module variables.\n * @private\n */\n\nvar cacheControlNoTransformRegExp = /(?:^|,)\\s*?no-transform\\s*?(?:,|$)/\n\n/**\n * Compress response data with gzip / deflate.\n *\n * @param {Object} [options]\n * @return {Function} middleware\n * @public\n */\n\nfunction compression (options) {\n  var opts = options || {}\n\n  // options\n  var filter = opts.filter || shouldCompress\n  var threshold = bytes.parse(opts.threshold)\n\n  if (threshold == null) {\n    threshold = 1024\n  }\n\n  return function compression (req, res, next) {\n    var ended = false\n    var length\n    var listeners = []\n    var stream\n\n    var _end = res.end\n    var _on = res.on\n    var _write = res.write\n\n    // flush\n    res.flush = function flush () {\n      if (stream) {\n        stream.flush()\n      }\n    }\n\n    // proxy\n\n    res.write = function write (chunk, encoding) {\n      if (ended) {\n        return false\n      }\n\n      if (!this._header) {\n        this._implicitHeader()\n      }\n\n      return stream\n        ? stream.write(toBuffer(chunk, encoding))\n        : _write.call(this, chunk, encoding)\n    }\n\n    res.end = function end (chunk, encoding) {\n      if (ended) {\n        return false\n      }\n\n      if (!this._header) {\n        // estimate the length\n        if (!this.getHeader('Content-Length')) {\n          length = chunkLength(chunk, encoding)\n        }\n\n        this._implicitHeader()\n      }\n\n      if (!stream) {\n        return _end.call(this, chunk, encoding)\n      }\n\n      // mark ended\n      ended = true\n\n      // write Buffer for Node.js 0.8\n      return chunk\n        ? stream.end(toBuffer(chunk, encoding))\n        : stream.end()\n    }\n\n    res.on = function on (type, listener) {\n      if (!listeners || type !== 'drain') {\n        return _on.call(this, type, listener)\n      }\n\n      if (stream) {\n        return stream.on(type, listener)\n      }\n\n      // buffer listeners for future stream\n      listeners.push([type, listener])\n\n      return this\n    }\n\n    function nocompress (msg) {\n      debug('no compression: %s', msg)\n      addListeners(res, _on, listeners)\n      listeners = null\n    }\n\n    onHeaders(res, function onResponseHeaders () {\n      // determine if request is filtered\n      if (!filter(req, res)) {\n        nocompress('filtered')\n        return\n      }\n\n      // determine if the entity should be transformed\n      if (!shouldTransform(req, res)) {\n        nocompress('no transform')\n        return\n      }\n\n      // vary\n      vary(res, 'Accept-Encoding')\n\n      // content-length below threshold\n      if (Number(res.getHeader('Content-Length')) < threshold || length < threshold) {\n        nocompress('size below threshold')\n        return\n      }\n\n      var encoding = res.getHeader('Content-Encoding') || 'identity'\n\n      // already encoded\n      if (encoding !== 'identity') {\n        nocompress('already encoded')\n        return\n      }\n\n      // head\n      if (req.method === 'HEAD') {\n        nocompress('HEAD request')\n        return\n      }\n\n      // compression method\n      var accept = accepts(req)\n      var method = accept.encoding(['gzip', 'deflate', 'identity'])\n\n      // we really don't prefer deflate\n      if (method === 'deflate' && accept.encoding(['gzip'])) {\n        method = accept.encoding(['gzip', 'identity'])\n      }\n\n      // negotiation failed\n      if (!method || method === 'identity') {\n        nocompress('not acceptable')\n        return\n      }\n\n      // compression stream\n      debug('%s compression', method)\n      stream = method === 'gzip'\n        ? zlib.createGzip(opts)\n        : zlib.createDeflate(opts)\n\n      // add buffered listeners to stream\n      addListeners(stream, stream.on, listeners)\n\n      // header fields\n      res.setHeader('Content-Encoding', method)\n      res.removeHeader('Content-Length')\n\n      // compression\n      stream.on('data', function onStreamData (chunk) {\n        if (_write.call(res, chunk) === false) {\n          stream.pause()\n        }\n      })\n\n      stream.on('end', function onStreamEnd () {\n        _end.call(res)\n      })\n\n      _on.call(res, 'drain', function onResponseDrain () {\n        stream.resume()\n      })\n    })\n\n    next()\n  }\n}\n\n/**\n * Add bufferred listeners to stream\n * @private\n */\n\nfunction addListeners (stream, on, listeners) {\n  for (var i = 0; i < listeners.length; i++) {\n    on.apply(stream, listeners[i])\n  }\n}\n\n/**\n * Get the length of a given chunk\n */\n\nfunction chunkLength (chunk, encoding) {\n  if (!chunk) {\n    return 0\n  }\n\n  return !Buffer.isBuffer(chunk)\n    ? Buffer.byteLength(chunk, encoding)\n    : chunk.length\n}\n\n/**\n * Default filter function.\n * @private\n */\n\nfunction shouldCompress (req, res) {\n  var type = res.getHeader('Content-Type')\n\n  if (type === undefined || !compressible(type)) {\n    debug('%s not compressible', type)\n    return false\n  }\n\n  return true\n}\n\n/**\n * Determine if the entity should be transformed.\n * @private\n */\n\nfunction shouldTransform (req, res) {\n  var cacheControl = res.getHeader('Cache-Control')\n\n  // Don't compress for Cache-Control: no-transform\n  // https://tools.ietf.org/html/rfc7234#section-5.2.2.4\n  return !cacheControl ||\n    !cacheControlNoTransformRegExp.test(cacheControl)\n}\n\n/**\n * Coerce arguments to Buffer\n * @private\n */\n\nfunction toBuffer (chunk, encoding) {\n  return !Buffer.isBuffer(chunk)\n    ? Buffer.from(chunk, encoding)\n    : chunk\n}\n\n\n//# sourceURL=webpack://mern-skeleton/../../node_modules/compression/index.js?");

/***/ }),

/***/ "../../node_modules/on-headers/index.js":
/*!**********************************************!*\
  !*** ../../node_modules/on-headers/index.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
eval("/*!\n * on-headers\n * Copyright(c) 2014 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = onHeaders\n\n/**\n * Create a replacement writeHead method.\n *\n * @param {function} prevWriteHead\n * @param {function} listener\n * @private\n */\n\nfunction createWriteHead (prevWriteHead, listener) {\n  var fired = false\n\n  // return function with core name and argument list\n  return function writeHead (statusCode) {\n    // set headers from arguments\n    var args = setWriteHeadHeaders.apply(this, arguments)\n\n    // fire listener\n    if (!fired) {\n      fired = true\n      listener.call(this)\n\n      // pass-along an updated status code\n      if (typeof args[0] === 'number' && this.statusCode !== args[0]) {\n        args[0] = this.statusCode\n        args.length = 1\n      }\n    }\n\n    return prevWriteHead.apply(this, args)\n  }\n}\n\n/**\n * Execute a listener when a response is about to write headers.\n *\n * @param {object} res\n * @return {function} listener\n * @public\n */\n\nfunction onHeaders (res, listener) {\n  if (!res) {\n    throw new TypeError('argument res is required')\n  }\n\n  if (typeof listener !== 'function') {\n    throw new TypeError('argument listener must be a function')\n  }\n\n  res.writeHead = createWriteHead(res.writeHead, listener)\n}\n\n/**\n * Set headers contained in array on the response object.\n *\n * @param {object} res\n * @param {array} headers\n * @private\n */\n\nfunction setHeadersFromArray (res, headers) {\n  for (var i = 0; i < headers.length; i++) {\n    res.setHeader(headers[i][0], headers[i][1])\n  }\n}\n\n/**\n * Set headers contained in object on the response object.\n *\n * @param {object} res\n * @param {object} headers\n * @private\n */\n\nfunction setHeadersFromObject (res, headers) {\n  var keys = Object.keys(headers)\n  for (var i = 0; i < keys.length; i++) {\n    var k = keys[i]\n    if (k) res.setHeader(k, headers[k])\n  }\n}\n\n/**\n * Set headers and other properties on the response object.\n *\n * @param {number} statusCode\n * @private\n */\n\nfunction setWriteHeadHeaders (statusCode) {\n  var length = arguments.length\n  var headerIndex = length > 1 && typeof arguments[1] === 'string'\n    ? 2\n    : 1\n\n  var headers = length >= headerIndex + 1\n    ? arguments[headerIndex]\n    : undefined\n\n  this.statusCode = statusCode\n\n  if (Array.isArray(headers)) {\n    // handle array case\n    setHeadersFromArray(this, headers)\n  } else if (headers) {\n    // handle object case\n    setHeadersFromObject(this, headers)\n  }\n\n  // copy leading arguments\n  var args = new Array(Math.min(length, headerIndex))\n  for (var i = 0; i < args.length; i++) {\n    args[i] = arguments[i]\n  }\n\n  return args\n}\n\n\n//# sourceURL=webpack://mern-skeleton/../../node_modules/on-headers/index.js?");

/***/ }),

/***/ "accepts":
/*!**************************!*\
  !*** external "accepts" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("accepts");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "bytes":
/*!************************!*\
  !*** external "bytes" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("bytes");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("debug");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-jwt");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash/extend":
/*!********************************!*\
  !*** external "lodash/extend" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/extend");

/***/ }),

/***/ "mime-db":
/*!**************************!*\
  !*** external "mime-db" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mime-db");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "safe-buffer":
/*!******************************!*\
  !*** external "safe-buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("safe-buffer");

/***/ }),

/***/ "vary":
/*!***********************!*\
  !*** external "vary" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("vary");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;