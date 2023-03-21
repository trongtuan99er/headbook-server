import {check, validationResult} from 'express-validator'

export const validateRegister = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Tên người dùng không được để trống!')
    .bail()
    .isLength({min: 3})
    .withMessage('Yêu cầu tối thiểu 3 ký tự!')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Địa chỉ email không hợp lệ!')
    .bail(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Mật khẩu không được để trống!')
    .bail()
    .isLength({min: 3})
    .withMessage('Yêu cầu tối thiểu 3 ký tự!')
    .bail(),
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Tên không được để trống!')
    .bail()
    .isLength({min: 3})
    .withMessage('Yêu cầu tối thiểu 3 ký tự!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array()[0].msg
      return res.status(400).json(errorMessages);
    }  
    next();
  },
];


export const validateLogin = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Tên người dùng không được để trống!')
    .bail()
    .isLength({min: 3})
    .withMessage('Yêu cầu tối thiểu 3 ký tự!')
    .bail(),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Mật khẩu không được để trông!')
    .bail()
    .isLength({min: 3})
    .withMessage('Yêu cầu tối thiểu 3 ký tự!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array()[0].msg
      return res.status(400).json(errorMessages);
    }  
    next();
  },
];